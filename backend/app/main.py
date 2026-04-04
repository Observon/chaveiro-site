from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from starlette.exceptions import HTTPException as StarletteHTTPException
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.responses import JSONResponse

from .exceptions import APIError
from .rate_limiter import limiter
from .routes import router as catalog_router

app = FastAPI(
    title="Chaveiro API",
    version="0.1.0",
    description="Base API para catalogo e orcamentos.",
)

app.state.limiter = limiter


def _error_payload(error: str, detail: str | list[dict], status_code: int) -> dict:
    return {
        "error": error,
        "detail": detail,
        "status_code": status_code,
    }


@app.exception_handler(APIError)
async def api_error_handler(request: Request, exc: APIError):
    """Handle custom API errors with standardized format."""
    return JSONResponse(
        status_code=exc.status_code,
        content=_error_payload(exc.error, exc.error_detail, exc.status_code),
    )


@app.exception_handler(RequestValidationError)
async def request_validation_error_handler(request: Request, exc: RequestValidationError):
    """Handle FastAPI request validation errors in standardized format."""
    return JSONResponse(
        status_code=422,
        content=_error_payload("validation_error", exc.errors(), 422),
    )


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Handle Starlette/FastAPI HTTP errors (404/405/etc.) in standardized format."""
    detail = exc.detail if exc.detail else "HTTP error"
    return JSONResponse(
        status_code=exc.status_code,
        content=_error_payload("http_error", detail, exc.status_code),
    )


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    """Handle rate limit exceeded errors."""
    return JSONResponse(
        status_code=429,
        content=_error_payload(
            "rate_limit_exceeded",
            "Too many requests. Please try again later.",
            429,
        ),
    )


app.add_middleware(SlowAPIMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(catalog_router)
