from pydantic import BaseModel


class KeyListItem(BaseModel):
    id: int
    title: str
    manufacturer: str
    type: str
    year: int
    yearRange: str
    price: float
    formattedPrice: str
    image: str
    inStock: bool


class KeyOption(BaseModel):
    id: int
    name: str
