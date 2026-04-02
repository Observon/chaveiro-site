# Configuração Supabase

## Informações da Conexão

```
Host: db.qcolywtabiamgeizdocb.supabase.co
Port: 5432
Database: postgres
User: postgres
```

## 1. Configurar `.env`

Crie ou atualize `backend/.env` com a connection string:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.qcolywtabiamgeizdocb.supabase.co:5432/postgres
```

**Importante:** Substitua `[YOUR-PASSWORD]` pela senha fornecida pelo Supabase.

## 2. Executar Migrations (Schema)

### Opção A: Via Supabase Dashboard (Mais Fácil)

1. Vá em **Supabase Dashboard** → **SQL Editor**
2. Clique em **New Query**
3. Copie o conteúdo de `backend/sql/schema.sql`
4. Cole na query e execute

### Opção B: Via Terminal (psql)

```powershell
# Instalar psql (PostgreSQL client) se não tiver
# No Windows: usar WSL ou PostgreSQL installer

# Executar schema
psql -h db.qcolywtabiamgeizdocb.supabase.co -p 5432 -U postgres -d postgres -f backend\sql\schema.sql
```

## 3. Executar Seed (Dados Iniciais)

### Opção A: Via Supabase Dashboard (Recomendado)

1. Vá em **SQL Editor**
2. Clique em **New Query**
3. Copie o conteúdo de `backend/sql/seed.sql`
4. Cole na query e execute

### Opção B: Via Terminal (psql)

```powershell
psql -h db.qcolywtabiamgeizdocb.supabase.co -p 5432 -U postgres -d postgres -f backend\sql\seed.sql
```

## 4. Testar Conexão

Com a `DATABASE_URL` configurada em `.env`, execute:

```powershell
cd backend
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000
```

Teste um endpoint:

```powershell
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/manufacturers"
```

Deve retornar a lista de fabricantes (200 OK, não 503).

## 5. Verificar no Dashboard

Acesse **Supabase Dashboard** → **Table Editor** para confirmar que as tabelas e dados foram criados:
- `manufacturers`
- `key_types`
- `automotive_keys`
- `quotes` (opcional)

---

**Próximas Etapas:**
- Testar todos os endpoints com dados reais
- Conectar frontend aos endpoints
- Deploy da API em produção (Railway, Render, Fly.io, etc)
