from pydantic import BaseModel


class ErrorResponse(BaseModel):
    """Standardized error response format."""
    error: str
    detail: str
    status_code: int


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
