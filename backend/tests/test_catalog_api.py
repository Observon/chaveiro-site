from decimal import Decimal
from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, select
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.database import Base, get_db
from app.main import app
from app.models import AutomotiveKey, KeyType, Manufacturer


def _seed_data(db: Session) -> None:
    gm = Manufacturer(name="GM")
    vw = Manufacturer(name="Volkswagen")

    canivete = KeyType(name="Chave com telecomando canivete")
    simples = KeyType(name="Chave simples (sem telecomando)")

    db.add_all([gm, vw, canivete, simples])
    db.flush()

    db.add_all(
        [
            AutomotiveKey(
                title="Chave Cruze 2018",
                manufacturer_id=gm.id,
                key_type_id=canivete.id,
                year=2018,
                year_range="2017-2019",
                price=Decimal("380.00"),
                in_stock=True,
                image_url="/images/chaves/automotivas/cruze.png",
            ),
            AutomotiveKey(
                title="Chave Gol G5",
                manufacturer_id=vw.id,
                key_type_id=simples.id,
                year=2012,
                year_range="2008-2013",
                price=Decimal("120.00"),
                in_stock=False,
                image_url="/images/chaves/automotivas/gol-g5.png",
            ),
        ]
    )
    db.commit()


@pytest.fixture
def client() -> TestClient:
    engine = create_engine(
        "sqlite+pysqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
        future=True,
    )
    testing_session_local = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)

    Base.metadata.create_all(bind=engine)

    with testing_session_local() as db:
        _seed_data(db)

    def override_get_db():
        db = testing_session_local()
        try:
            yield db
        finally:
            db.close()

    had_previous_override = get_db in app.dependency_overrides
    previous_override = app.dependency_overrides.get(get_db) if had_previous_override else None
    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    if had_previous_override:
        app.dependency_overrides[get_db] = previous_override
    else:
        app.dependency_overrides.pop(get_db, None)
    Base.metadata.drop_all(bind=engine)


def test_list_manufacturers(client: TestClient) -> None:
    response = client.get("/api/manufacturers")

    assert response.status_code == 200
    payload = response.json()
    assert [item["name"] for item in payload] == ["GM", "Volkswagen"]


def test_list_key_types(client: TestClient) -> None:
    response = client.get("/api/key-types")

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 2
    assert {item["name"] for item in payload} == {
        "Chave com telecomando canivete",
        "Chave simples (sem telecomando)",
    }


def test_list_keys_with_filters(client: TestClient) -> None:
    response = client.get(
        "/api/keys",
        params={
            "manufacturer": "GM",
            "key_type": "Chave com telecomando canivete",
            "year_from": 2017,
            "year_to": 2019,
            "in_stock": True,
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    assert payload[0]["title"] == "Chave Cruze 2018"
    assert payload[0]["formattedPrice"] == "R$ 380,00"


def test_get_key_returns_404_for_unknown_id(client: TestClient) -> None:
    response = client.get("/api/keys/9999")

    assert response.status_code == 404
    error_response = response.json()
    assert error_response["error"] == "not_found"
    assert error_response["detail"] == "Key not found"
    assert error_response["status_code"] == 404


def test_list_keys_supports_pagination_with_metadata_headers(client: TestClient) -> None:
    response = client.get("/api/keys", params={"page": 1, "page_size": 1})

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    assert response.headers["x-total-count"] == "2"
    assert response.headers["x-page"] == "1"
    assert response.headers["x-page-size"] == "1"
    assert response.headers["x-total-pages"] == "2"


def test_list_keys_supports_sorting_by_price_desc(client: TestClient) -> None:
    response = client.get("/api/keys", params={"sort_by": "price", "sort_dir": "desc"})

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 2
    assert payload[0]["title"] == "Chave Cruze 2018"
    assert payload[1]["title"] == "Chave Gol G5"


def test_list_keys_supports_price_range_filters(client: TestClient) -> None:
    """Test filtering by price range (price_from and price_to)."""
    # Only high-price items
    response = client.get("/api/keys", params={"price_from": 350})
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    assert payload[0]["title"] == "Chave Cruze 2018"
    
    # Only low-price items
    response = client.get("/api/keys", params={"price_to": 150})
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    assert payload[0]["title"] == "Chave Gol G5"
    
    # Price range in the middle (no items)
    response = client.get("/api/keys", params={"price_from": 200, "price_to": 300})
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 0


def test_list_keys_with_combined_filters(client: TestClient) -> None:
    """Test using multiple filters together."""
    response = client.get(
        "/api/keys",
        params={
            "manufacturer": "GM",
            "in_stock": True,
            "price_from": 300,
            "sort_by": "price",
            "sort_dir": "asc",
        },
    )
    
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    assert payload[0]["title"] == "Chave Cruze 2018"


def test_list_keys_sorting_by_title(client: TestClient) -> None:
    """Test sorting by title in ascending order."""
    response = client.get("/api/keys", params={"sort_by": "title", "sort_dir": "asc"})
    
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 2
    # Chave Cruze comes before Chave Gol
    assert payload[0]["title"] == "Chave Cruze 2018"
    assert payload[1]["title"] == "Chave Gol G5"


def test_list_keys_sorting_by_year_asc(client: TestClient) -> None:
    """Test sorting by year in ascending order."""
    response = client.get("/api/keys", params={"sort_by": "year", "sort_dir": "asc"})
    
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 2
    # 2012 comes before 2018
    assert payload[0]["year"] == 2012
    assert payload[1]["year"] == 2018


def test_secondary_sort_by_id_provides_stability(client: TestClient) -> None:
    """Test that secondary sorting by ID provides stable results when primary sort value is identical."""
    db_provider = app.dependency_overrides.get(get_db, get_db)
    db_gen = db_provider()
    db = next(db_gen)

    try:
        template_key = db.scalars(select(AutomotiveKey).limit(1)).first()
        assert template_key is not None

        tied_price = Decimal("250.00")
        first_key = AutomotiveKey(
            title="Chave Empate Preco A",
            manufacturer_id=template_key.manufacturer_id,
            key_type_id=template_key.key_type_id,
            year=template_key.year,
            year_range=template_key.year_range,
            price=tied_price,
            in_stock=template_key.in_stock,
            image_url=template_key.image_url,
        )
        second_key = AutomotiveKey(
            title="Chave Empate Preco B",
            manufacturer_id=template_key.manufacturer_id,
            key_type_id=template_key.key_type_id,
            year=template_key.year,
            year_range=template_key.year_range,
            price=tied_price,
            in_stock=template_key.in_stock,
            image_url=template_key.image_url,
        )
        db.add_all([first_key, second_key])
        db.commit()
        db.refresh(first_key)
        db.refresh(second_key)
    finally:
        db.close()
        try:
            next(db_gen)
        except StopIteration:
            pass

    response = client.get("/api/keys", params={"sort_by": "price", "sort_dir": "asc"})

    assert response.status_code == 200
    payload = response.json()
    assert len(payload) >= 4

    tied_ids = {first_key.id, second_key.id}
    tied_items = [item for item in payload if item["id"] in tied_ids]

    assert len(tied_items) == 2
    assert tied_items[0]["price"] == tied_items[1]["price"]
    assert [item["id"] for item in tied_items] == sorted(tied_ids)


def test_list_keys_search_with_no_matching_term(client: TestClient) -> None:
    """Test searching with a plain term that does not match any seeded items."""
    # Search for a regular term that is absent from the test data.
    response = client.get("/api/keys", params={"search": "x"})
    
    assert response.status_code == 200
    payload = response.json()
    # Searching for 'x' should not match any items in our test data.
    assert len(payload) == 0


def test_list_keys_pagination_max_page_size_limit(client: TestClient) -> None:
    """Test that page_size above the maximum limit is rejected with validation error."""
    # Request more than the max allowed by the route constraint (le=100)
    response = client.get("/api/keys", params={"page_size": 200})

    assert response.status_code == 422
    payload = response.json()
    assert payload["error"] == "validation_error"
    assert isinstance(payload["detail"], list)
    assert payload["status_code"] == 422


def test_list_keys_pagination_edge_case_first_page(client: TestClient) -> None:
    """Test pagination edge case: requesting first page with small page size."""
    response = client.get("/api/keys", params={"page": 1, "page_size": 1})
    
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 1
    # Verify it's actually the first item (by ID or guaranteed order)
    assert "id" in payload[0]


def test_list_keys_empty_result_set(client: TestClient) -> None:
    """Test behavior when filters result in no matches."""
    response = client.get(
        "/api/keys",
        params={
            "manufacturer": "Tesla",  # Non-existent manufacturer
        },
    )
    
    assert response.status_code == 200
    payload = response.json()
    assert len(payload) == 0
    assert response.headers["x-total-count"] == "0"
    assert response.headers["x-total-pages"] == "1"


def test_unknown_route_returns_standardized_http_error(client: TestClient) -> None:
    response = client.get("/rota-inexistente")

    assert response.status_code == 404
    payload = response.json()
    assert payload["error"] == "http_error"
    assert payload["detail"] == "Not Found"
    assert payload["status_code"] == 404
