from decimal import Decimal

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import and_, or_, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from .database import get_db
from .models import AutomotiveKey, KeyType, Manufacturer
from .schemas import KeyListItem, KeyOption

router = APIRouter(prefix="/api", tags=["catalog"])


def _format_brl(value: Decimal | float) -> str:
    amount = float(value)
    formatted = f"{amount:,.2f}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"R$ {formatted}"


@router.get("/manufacturers", response_model=list[KeyOption])
def list_manufacturers(db: Session = Depends(get_db)):
    try:
        query = select(Manufacturer).order_by(Manufacturer.name.asc())
        return [KeyOption(id=item.id, name=item.name) for item in db.scalars(query).all()]
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail="Database unavailable") from exc


@router.get("/key-types", response_model=list[KeyOption])
def list_key_types(db: Session = Depends(get_db)):
    try:
        query = select(KeyType).order_by(KeyType.name.asc())
        return [KeyOption(id=item.id, name=item.name) for item in db.scalars(query).all()]
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail="Database unavailable") from exc


@router.get("/keys", response_model=list[KeyListItem])
def list_keys(
    search: str | None = None,
    manufacturer: list[str] = Query(default=[]),
    key_type: list[str] = Query(default=[]),
    year_from: int | None = None,
    year_to: int | None = None,
    in_stock: bool | None = None,
    db: Session = Depends(get_db),
):
    query = (
        select(AutomotiveKey)
        .join(AutomotiveKey.manufacturer)
        .join(AutomotiveKey.key_type)
        .order_by(AutomotiveKey.title.asc())
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

    if in_stock is not None:
        conditions.append(AutomotiveKey.in_stock.is_(in_stock))

    if conditions:
        query = query.where(and_(*conditions))

    try:
        results = db.scalars(query).all()
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail="Database unavailable") from exc

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
def get_key(key_id: int, db: Session = Depends(get_db)):
    query = (
        select(AutomotiveKey)
        .join(AutomotiveKey.manufacturer)
        .join(AutomotiveKey.key_type)
        .where(AutomotiveKey.id == key_id)
    )
    try:
        item = db.scalars(query).first()
    except SQLAlchemyError as exc:
        raise HTTPException(status_code=503, detail="Database unavailable") from exc

    if item is None:
        raise HTTPException(status_code=404, detail="Key not found")

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
