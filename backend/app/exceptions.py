"""Custom exceptions for Chaveiro API."""
from fastapi import HTTPException


class APIError(HTTPException):
    """Custom API error with standardized format."""
    
    def __init__(self, error: str, detail: str, status_code: int):
        super().__init__(status_code=status_code, detail=detail)
        self.error = error
        self.error_detail = detail
        self.status_code = status_code
