# Chaveiro Site

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-Local-2496ED?logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20evolucao-orange)

Projeto full stack em evolucao para catalogo de chaves automotivas e atendimento de orcamentos.

Objetivo tecnico atual:
- consolidar base de engenharia para portfolio junior;
- evoluir frontend React para consumo de API real;
- estruturar backend com FastAPI + PostgreSQL + testes.

## Stack

Frontend:
- React + TypeScript
- Material UI
- React Router
- React Testing Library + Jest

Backend:
- Python 3.11+
- FastAPI
- SQLAlchemy
- PostgreSQL
- Docker Compose

## Estrutura do projeto

- `src/`: frontend React
- `public/`: assets estaticos
- `backend/app/`: backend FastAPI
- `backend/sql/`: schema e seed do banco
- `docker-compose.yml`: ambiente local de API + PostgreSQL
- `docs/`: guias internos (workflow Git, etc.)

## Como rodar

### 1) Frontend

```bash
npm install
npm start
```

App: http://localhost:3000

### 2) Backend com Docker (recomendado)

Defina `POSTGRES_PASSWORD` antes de subir os containers.

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

API: http://localhost:8000

Swagger: http://localhost:8000/docs

Healthcheck: http://localhost:8000/health

### 3) Backend sem Docker (opcional)

Consulte `backend/README.md`.

## Testes e build

```bash
npm test -- --watchAll=false
npm run build
```

## Workflow Git

Padrao atual:
- commits semanticos (`feat:`, `fix:`, `docs:`, `test:`, `chore:`)
- branch por entrega (`feature/<assunto>`)
- PR com template em `.github/PULL_REQUEST_TEMPLATE.md`

Guia rapido: `docs/GIT_WORKFLOW.md`

## Status atual

Concluido no Dia 1:
- base backend FastAPI + healthcheck;
- schema e seed iniciais do PostgreSQL;
- compose com ajustes de seguranca para ambiente local;
- estabilizacao de testes do frontend.

Proximo passo (Dia 2):
- implementar endpoints REST de catalogo com filtros;
- preparar integracao frontend com dados vindos da API.
