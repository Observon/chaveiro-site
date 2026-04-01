# Backend - Chaveiro API

## Requisitos
- Python 3.11+
- Docker (opcional, recomendado)

## Subir com Docker Compose (raiz do projeto)
```bash
docker compose up --build
```

Servicos:
- API: http://localhost:8000
- Healthcheck: http://localhost:8000/health
- Swagger: http://localhost:8000/docs
- PostgreSQL: localhost:5432

## Rodar local sem Docker
1. Entrar na pasta backend
2. Criar e ativar ambiente virtual
3. Instalar dependencias
4. Copiar .env.example para .env e ajustar se necessario
5. Subir API

Comandos:
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
