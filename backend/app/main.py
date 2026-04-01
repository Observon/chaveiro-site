from fastapi import FastAPI

app = FastAPI(
    title="Chaveiro API",
    version="0.1.0",
    description="Base API para catalogo e orcamentos.",
)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
