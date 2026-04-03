# Backend - Chaveiro API

## Requisitos
- Python 3.11+
- Docker (opcional, recomendado)

## Subir com Docker Compose (raiz do projeto)
Defina a variavel `POSTGRES_PASSWORD` antes de subir os containers.

Windows (PowerShell):
```bash
$env:POSTGRES_PASSWORD="troque-esta-senha"
docker compose up --build
```

macOS / Linux:
```bash
export POSTGRES_PASSWORD="troque-esta-senha"
docker compose up --build
```

Opcional: voce pode criar um arquivo `.env` na raiz do projeto com essas variaveis para nao exportar a cada execucao.

```bash
POSTGRES_PASSWORD=troque-esta-senha
# opcionais
# POSTGRES_DB=chaveiro_db
# POSTGRES_USER=postgres
# POSTGRES_PORT=5432
```

O Compose sobe com valores padrao, mas exige `POSTGRES_PASSWORD` por seguranca.
Se quiser customizar o Postgres, defina `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD` e `POSTGRES_PORT` no ambiente local ou em um arquivo `.env` na raiz do projeto.

Se quiser sobrescrever variaveis localmente, crie `backend/.env` com base em `backend/.env.example`.

Servicos:
- API: http://localhost:8000
- Healthcheck: http://localhost:8000/health
- Swagger: http://localhost:8000/docs
- PostgreSQL: localhost:5432

Fluxo comercial principal:
- o catalogo mostra preco-base de referencia;
- a triagem e a confirmacao do valor final acontecem no WhatsApp com atendimento humano.

## Endpoints atuais
- GET /health
- GET /api/manufacturers
- GET /api/key-types
- GET /api/keys
	- filtros: `search`, `manufacturer`, `key_type`, `year_from`, `year_to`, `in_stock`
- GET /api/keys/{key_id}

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

## Rodar testes (desenvolvimento)
### Windows (PowerShell)
```bash
cd backend
# Ativar venv se não estiver ativo
.venv\Scripts\Activate.ps1
# Instalar dependências de dev (inclui pytest, httpx)
pip install -r requirements-dev.txt
# Rodar testes
pytest tests -q
```

Se houver bloqueio de script no PowerShell, execute antes:

```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

### macOS / Linux (POSIX shell)
```bash
cd backend
source .venv/bin/activate
pip install -r requirements-dev.txt
pytest tests -q
```

**Note:** `requirements-dev.txt` inclui todas as dependências de produção (`requirements.txt`) mais as de teste (pytest, httpx). Use este arquivo apenas em ambientes de desenvolvimento e CI.
