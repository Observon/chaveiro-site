# Chaveiro Site

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql&logoColor=white)
![Docker Compose](https://img.shields.io/badge/Docker_Compose-Local-2496ED?logo=docker&logoColor=white)
![Status](https://img.shields.io/badge/Status-Em%20evolucao-orange)

Projeto full stack em evolucao para catalogo de chaves automotivas com precos-base e triagem de atendimento humano via WhatsApp.

Objetivo tecnico atual:
- estudar e consolidar fundamentos de engenharia de software;
- evoluir frontend React para consumo de API real;
- apresentar catalogo com base de precos e conduzir o cliente ao WhatsApp para triagem humana;
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

Windows (PowerShell):

```bash
npm install
Copy-Item .env.example .env
npm start
```

macOS / Linux:

```bash
npm install
cp .env.example .env
npm start
```

App: http://localhost:3000

Variavel de ambiente do frontend:
- `REACT_APP_API_BASE_URL` (ex.: `http://127.0.0.1:8000/api` em desenvolvimento)
- Em producao, aponte para a URL publica da API (ex.: `https://api.seudominio.com/api`)

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

Opcional para deploy/ambiente remoto:
- setup com Supabase em `backend/SUPABASE_SETUP.md`

## Testes e build

```bash
npm test -- --watchAll=false
npm run build
```

Testes do backend:
- veja os comandos em `backend/README.md`

## Workflow Git

Padrao atual:
- commits semanticos (`feat:`, `fix:`, `docs:`, `test:`, `chore:`)
- branch por entrega (`feature/<assunto>`)
- PR com template em `.github/PULL_REQUEST_TEMPLATE.md`

Guia rapido: `docs/GIT_WORKFLOW.md`

## Status atual (03/04/2026)

Concluido no Dia 1:
- base backend FastAPI + healthcheck;
- schema e seed iniciais do PostgreSQL;
- compose com ajustes de seguranca para ambiente local;
- estabilizacao de testes do frontend.

Concluido no Dia 2:
- endpoints REST de catalogo implementados (`/api/keys`, `/api/keys/{id}`, `/api/manufacturers`, `/api/key-types`);
- filtros operando no backend com dados reais.

Concluido no Dia 3 (parcial):
- catalogo frontend consumindo API real;
- fluxo com loading, erro e atualizacao por filtros;
- busca com debounce e sincronizacao de filtros com query params da API.

Resta para fechar o Dia 3:
- validar fluxo ponta a ponta com ambiente limpo (subir backend + frontend do zero e executar cenario de consulta completo);
- revisar UX final dos filtros em mobile (expansao/colapso e legibilidade dos chips de selecao);
- padronizar tratamento de estado vazio com mensagem orientativa ao usuario quando nenhum item for encontrado.

Concluido no Dia 4:
- testes backend com pytest (fixtures, seed, 4 cenarios de teste);
- testes frontend para fluxo de empty state inteligente com sugestoes;

Pendente para fechar 100% do escopo planejado:
- nenhum bloqueio funcional para o fluxo principal de atendimento; o fechamento do valor acontece no WhatsApp com validacao dos dados com o cliente.

Status final:
- ✓ Build frontend funciona
- ✓ Testes frontend passam
- ✓ Testes backend passam
- ✓ API docs disponiveis em `/docs` (Swagger)
- ✓ README tecnico completo com workflow Git e setup 
- ✓ Comandos de setup
- ✓ Historico Git organizado com commits semanticos
- ✓ Fluxo principal orienta o cliente ao WhatsApp com preco-base e triagem humana para fechamento do atendimento
