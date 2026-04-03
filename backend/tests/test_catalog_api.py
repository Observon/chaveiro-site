from decimal import Decimal
from pathlib import Path
import sys

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
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

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    app.dependency_overrides.clear()
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
    assert response.json()["detail"] == "Key not found"
