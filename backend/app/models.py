from sqlalchemy import Boolean, ForeignKey, Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class Manufacturer(Base):
    __tablename__ = "manufacturers"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)


class KeyType(Base):
    __tablename__ = "key_types"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)


class AutomotiveKey(Base):
    __tablename__ = "automotive_keys"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(140), nullable=False)
    manufacturer_id: Mapped[int] = mapped_column(ForeignKey("manufacturers.id"), nullable=False)
    key_type_id: Mapped[int] = mapped_column(ForeignKey("key_types.id"), nullable=False)
    year: Mapped[int] = mapped_column(Integer, nullable=False)
    year_range: Mapped[str] = mapped_column(String(30), nullable=False)
    price: Mapped[float] = mapped_column(Numeric(10, 2), nullable=False)
    in_stock: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    image_url: Mapped[str] = mapped_column(Text, nullable=False)

    manufacturer: Mapped[Manufacturer] = relationship()
    key_type: Mapped[KeyType] = relationship()
