from fastapi import FastAPI

from .routes import router as catalog_router

app = FastAPI(
    title="Chaveiro API",
    version="0.1.0",
    description="Base API para catalogo e orcamentos.",
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


app.include_router(catalog_router)
