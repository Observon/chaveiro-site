# Guia Tecnico Junior - Projeto Chaveiro Site

## 1) Objetivo
Transformar este projeto em um case de nivel Junior com evidencias praticas dos fundamentos cobrados:
- logica de programacao
- Git e colaboracao
- SQL
- APIs REST
- linguagem principal
- testes automatizados
- documentacao
- mentalidade de problem solver
- fluxo comercial simples que leva o cliente ao WhatsApp com base de preco e triagem humana

Prazo alvo: ate dia 5

---

## 2) Stack Atual (Estado Inicial)
- Frontend: React + TypeScript + Material UI
- Build: react-scripts (Create React App)
- Roteamento: react-router-dom
- Testes front: testing-library + jest (ativos e passando no fluxo principal)

Status funcional em 03/04/2026:
- backend com endpoints de catalogo implementados (`GET /health`, `GET /api/keys`, `GET /api/keys/{id}`, `GET /api/manufacturers`, `GET /api/key-types`)
- frontend integrado com API real no catalogo
- testes backend e frontend executando com cenarios principais
- fluxo principal de negocio focado em WhatsApp, com preco-base exibido no catalogo e triagem humana antes do fechamento

---

## 3) Stack Alvo (Versao Ideal)
- Frontend: React + TypeScript
- Backend: Python 3.11+ + FastAPI
- Banco: PostgreSQL
- ORM: SQLAlchemy (ou SQLModel)
- Validacao: Pydantic
- Testes backend: pytest + httpx (TestClient)
- Testes frontend: React Testing Library
- API docs: Swagger/OpenAPI (gerado pelo FastAPI)
- DevOps local: docker-compose para subir API + DB

---

## 4) Arquitetura Alvo
### 4.1 Monorepo
- /src (frontend)
- /backend (FastAPI)
- /database (scripts SQL opcionais)
- /docs (documentacao)

### 4.2 Fluxo
1. Usuario aplica filtros no frontend.
2. Front chama API GET /api/keys com query params.
3. Backend consulta PostgreSQL e retorna os itens do catalogo com preco-base.
4. Usuario seleciona a chave que mais se aproxima da necessidade.
5. Front abre WhatsApp com a chave selecionada, o preco de referencia e dados iniciais de triagem.
6. Atendimento humano confirma com o cliente os detalhes tecnicos, o servico necessario e o valor final.

### 4.3 Entidades minimas
- manufacturers
  - id, name
- key_types
  - id, name
- automotive_keys
  - id, title, manufacturer_id, key_type_id, year, year_range, price, in_stock, image_url
- quotes
  - id, automotive_key_id, customer_name, customer_phone, notes, created_at

---

## 5) Endpoints REST Minimos
- GET /health
- GET /api/keys
  - filtros: search, manufacturer, key_type, year_from, year_to, in_stock
- GET /api/keys/{id}
- GET /api/manufacturers
- GET /api/key-types

Criterios de qualidade:
- status codes corretos
- validacoes de entrada
- mensagens de erro claras
- contrato de resposta consistente

---

## 6) SQL (Base)
### 6.1 Competencias SQL esperadas
- SELECT com WHERE, ORDER BY, LIMIT
- JOIN entre tabelas
- filtros combinados
- agregacoes simples
- indices basicos

### 6.2 Queries que voce deve dominar neste projeto
- listar chaves por fabricante
- filtrar por faixa de ano
- filtrar por tipo + estoque
- buscar por termo (modelo/fabricante)
- apoiar atendimento com informacoes tecnicas da chave mais provavel

---

## 7) Testes Automatizados (Meta)
### 7.1 Backend
- testes de endpoint com sucesso e erro
- testes de validacao de payload
- testes de filtros combinados

### 7.2 Frontend
- render das paginas principais
- fluxo de filtro do catalogo
- chamada de API mockada
- estado de loading/erro/vazio

### 7.3 Qualidade minima
- build verde
- testes verdes no CI local
- sem testes flaky

---

## 8) Git Workflow (Colaboracao)
Padrao sugerido:
- main: branch estavel
- feature/backend-fastapi
- feature/postgres-schema
- feature/frontend-api-integration
- feature/tests-and-docs

Commits semanticos:
- feat: adiciona endpoint de catalogo com filtros
- fix: corrige teste de roteamento no frontend
- test: adiciona cenarios de filtros combinados
- docs: atualiza arquitetura e setup local

Checklist:
- commits pequenos e tematicos
- mensagens claras
- PR com contexto e validacao

---

## 9) Cronograma Intensivo 
## Dia 1 - Fundacao tecnica
- corrigir testes front quebrados
- criar backend FastAPI base
- criar schema PostgreSQL inicial
- subir ambiente local (preferencia com docker-compose)

Entregaveis do dia:
- frontend testando novamente
- backend respondendo /health
- banco com tabelas criadas

## Dia 2 - API de negocio
- implementar GET /api/keys com filtros
- implementar GET /api/keys/{id}
- implementar GET /api/manufacturers e /api/key-types
- popular banco com seed inicial

Entregaveis do dia:
- API funcional com dados reais
- filtros operando no backend

## Dia 3 - Integracao front + API 
- trocar dados hardcoded por chamadas REST
- tratar loading, erro e vazio
- ajustar UX dos filtros

Entregaveis do dia:
- catalogo consumindo API
- fluxo de consulta totalmente funcional

## Dia 4 - Testes + Documentacao 
- testes backend (pytest)
- testes frontend (fluxos essenciais)
- README tecnico completo
- secao de decisoes tecnicas + roteiro de entrevista

Entregaveis do dia:
- projeto defendivel em entrevista junior
- documentacao pronta para recrutador

## Dia 5 - Candidatura e apresentacao 
- revisar README e links
- validar comandos de setup do zero
- preparar pitch de 2 minutos
- preparar respostas sobre uso de IA

---

## 10) Roteiro (Prioridade)
### Prioridade alta
- FastAPI: rotas, models, validacao, status codes
- PostgreSQL: joins, filtros, indices simples
- testes com pytest e testing-library
- boas praticas de REST

### Prioridade media
- SQLAlchemy/SQLModel
- paginacao e ordenacao de API
- docker-compose para dev local

### Prioridade complementar
- CI simples (GitHub Actions)
- observabilidade basica (logs estruturados)

---

## 11) Checklist Final
- [x] build frontend ok
- [x] testes frontend ok
- [x] testes backend ok
- [x] API docs disponiveis
- [x] README tecnico completo
- [x] comandos de setup funcionam do zero
- [x] historico Git organizado
- [x] fluxo principal leva o cliente ao WhatsApp com preco-base e triagem

Fim.?
