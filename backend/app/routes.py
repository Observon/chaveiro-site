from decimal import Decimal
from typing import Literal

from fastapi import APIRouter, Depends, Query, Response, Request
from sqlalchemy import and_, func, or_, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db
from .exceptions import APIError
from .rate_limiter import limiter
from .models import AutomotiveKey, KeyType, Manufacturer
from .schemas import KeyListItem, KeyOption

router = APIRouter(prefix="/api", tags=["catalog"])


def _format_brl(value: Decimal | float) -> str:
    amount = float(value)
    formatted = f"{amount:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {formatted}"


@router.get("/manufacturers", response_model=list[KeyOption])
@limiter.limit("30/minute")
def list_manufacturers(request: Request, db: Session = Depends(get_db)):
    try:
        query = select(Manufacturer).order_by(Manufacturer.name.asc())
        return [KeyOption(id=item.id, name=item.name) for item in db.scalars(query).all()]
    except SQLAlchemyError as exc:
        raise APIError("database_error", "Database unavailable", 503) from exc


@router.get("/key-types", response_model=list[KeyOption])
@limiter.limit("30/minute")
def list_key_types(request: Request, db: Session = Depends(get_db)):
    try:
        query = select(KeyType).order_by(KeyType.name.asc())
        return [KeyOption(id=item.id, name=item.name) for item in db.scalars(query).all()]
    except SQLAlchemyError as exc:
        raise APIError("database_error", "Database unavailable", 503) from exc


@router.get("/keys", response_model=list[KeyListItem])
@limiter.limit("60/minute")
def list_keys(
    request: Request,
    search: str | None = None,
    manufacturer: list[str] = Query(default=[]),
    key_type: list[str] = Query(default=[]),
    year_from: int | None = None,
    year_to: int | None = None,
    price_from: float | None = None,
    price_to: float | None = None,
    in_stock: bool | None = None,
    page: int = Query(default=1, ge=1),
    page_size: int = Query(default=12, ge=1, le=100),
    sort_by: Literal["title", "price", "year"] = Query(default="title"),
    sort_dir: Literal["asc", "desc"] = Query(default="asc"),
    response: Response = None,
    db: Session = Depends(get_db),
):
    query = (
        select(AutomotiveKey)
        .join(AutomotiveKey.manufacturer)
        .join(AutomotiveKey.key_type)
    )

    conditions = []

    if search:
        search_like = f"%{search.strip()}%"
        conditions.append(
            or_(
                AutomotiveKey.title.ilike(search_like),
                Manufacturer.name.ilike(search_like),
            )
        )

    if manufacturer:
        conditions.append(Manufacturer.name.in_(manufacturer))

    if key_type:
        conditions.append(KeyType.name.in_(key_type))

    if year_from is not None:
        conditions.append(AutomotiveKey.year >= year_from)

    if year_to is not None:
        conditions.append(AutomotiveKey.year <= year_to)

    if price_from is not None:
        conditions.append(AutomotiveKey.price >= price_from)

    if price_to is not None:
        conditions.append(AutomotiveKey.price <= price_to)

    if in_stock is not None:
        conditions.append(AutomotiveKey.in_stock.is_(in_stock))

    if conditions:
        query = query.where(and_(*conditions))

    sort_columns = {
        "title": AutomotiveKey.title,
        "price": AutomotiveKey.price,
        "year": AutomotiveKey.year,
    }
    sort_column = sort_columns[sort_by]

    if sort_dir == "desc":
        query = query.order_by(sort_column.desc(), AutomotiveKey.id.asc())
    else:
        query = query.order_by(sort_column.asc(), AutomotiveKey.id.asc())

    count_query = (
        select(func.count())
        .select_from(AutomotiveKey)
        .join(AutomotiveKey.manufacturer)
        .join(AutomotiveKey.key_type)
    )

    if conditions:
        count_query = count_query.where(and_(*conditions))

    query = query.offset((page - 1) * page_size).limit(page_size)

    try:
        total_items = db.scalar(count_query) or 0
        results = db.scalars(query).all()
    except SQLAlchemyError as exc:
        raise APIError("database_error", "Database unavailable", 503) from exc

    if response is not None:
        total_pages = max(1, (total_items + page_size - 1) // page_size)
        response.headers["X-Total-Count"] = str(total_items)
        response.headers["X-Page"] = str(page)
        response.headers["X-Page-Size"] = str(page_size)
        response.headers["X-Total-Pages"] = str(total_pages)
        response.headers["X-Sort-By"] = sort_by
        response.headers["X-Sort-Dir"] = sort_dir

    return [
        KeyListItem(
            id=item.id,
            title=item.title,
            manufacturer=item.manufacturer.name,
            type=item.key_type.name,
            year=item.year,
            yearRange=item.year_range,
            price=float(item.price),
            formattedPrice=_format_brl(item.price),
            image=item.image_url,
            inStock=item.in_stock,
        )
        for item in results
    ]


@router.get("/keys/{key_id}", response_model=KeyListItem)
@limiter.limit("60/minute")
def get_key(key_id: int, request: Request, db: Session = Depends(get_db)):
    query = (
        select(AutomotiveKey)
        .join(AutomotiveKey.manufacturer)
        .join(AutomotiveKey.key_type)
        .where(AutomotiveKey.id == key_id)
    )
    try:
        item = db.scalars(query).first()
    except SQLAlchemyError as exc:
        raise APIError("database_error", "Database unavailable", 503) from exc

    if item is None:
        raise APIError("not_found", "Key not found", 404)

    return KeyListItem(
        id=item.id,
        title=item.title,
        manufacturer=item.manufacturer.name,
        type=item.key_type.name,
        year=item.year,
        yearRange=item.year_range,
        price=float(item.price),
        formattedPrice=_format_brl(item.price),
        image=item.image_url,
        inStock=item.in_stock,
    )
