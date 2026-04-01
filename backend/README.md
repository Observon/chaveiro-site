# Backend - Chaveiro API

## Requisitos
- Python 3.11+
- Docker (opcional, recomendado)

## Subir com Docker Compose (raiz do projeto)
```bash
docker compose up --build
```

O Compose sobe com valores padrao, sem exigir `backend/.env` no primeiro bootstrap.

Se quiser sobrescrever variaveis localmente, crie `backend/.env` com base em `backend/.env.example`.

Servicos:
- API: http://localhost:8000
- Healthcheck: http://localhost:8000/health
- Swagger: http://localhost:8000/docs
- PostgreSQL: localhost:5432

## Rodar local sem Docker
### Windows (PowerShell)
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### macOS / Linux (POSIX shell)
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
