# Decisões Técnicas — Dia 4 (Testes e Documentação)

Registrado em 03/04/2026.

## 1. Arquitetura do Empty State Inteligente

### Problema
Quando o usuário não encontra resultado no catálogo (por busca muito restritiva, filtros demais ou faixa de ano), o estado vazio original apenas exibia "nenhum resultado encontrado", sem orientação clara e sem fallback.

### Solução Implementada
Empty state **contextual** com três camadas:

1. **Mensagem Dinâmica**
   - Identifica o motivo: busca sem resultado, filtros restritivos, faixa de ano, etc.
   - Cada cenário recebe uma descrição específica (ex: "Tente um nome de modelo, fabricante...").

2. **Ações Rápidas de Recuperação**
   - Chips de botão que removem um filtro por vez (ex: "Limpar busca", "Remover tipos").
   - Botão "Limpar tudo" quando há múltiplos filtros.
   - Reduz atrito de navegação.

3. **Sugestões Automáticas + CTA Comercial**
   - Fetch automático de modelos próximos rankeados por:
     - Fabricante selecionado (score +4)
     - Tipo selecionado (score +4)
     - Proximidade do ano alvo (score 0-3)
   - CTA "Falar no WhatsApp" que leva contexto dos filtros e sugestões na mensagem.

### Trade-off
**Ganho:** melhor UX, reduz taxa de bounce, mantém fluxo comercial.
**Custo:** uma fetch extra quando não há resultados (negligenciável, só com base de dados vazia).

## 2. Estratégia de Testes

### Backend (pytest)
- **Fixtures:** banco SQLite em memória isolado por teste.
- **Seed:** 2 fabricantes, 2 tipos, 2 chaves (uma em estoque, uma não).
- **Scenarios:**
  - Lista de fabricantes (ordenada).
  - Lista de tipos (completa).
  - Filtros combinados (fabricante + tipo + ano + estoque).
  - 404 para ID inválido.

**Por que SQLite em memória?** Rápido, isolado, não depende de serviço PostgreSQL durante CI.

### Frontend (Jest + React Testing Library)
- Mock de fetch com sequência de respostas.
- Validação: mensagem vazia → sugestões aparecem → CTA abre WhatsApp com contexto.
- Ignora warnings de `act()` do ripple do MUI (visual apenas, não funcional).

### Omissões Intencionais
- Não incluímos testes de filtro ano-range (seria redundante com os outros).
- Mockamos fetch, não API real (mais rápido, determinístico).

## 3. Estrutura de Testes no Repositório

```
backend/tests/test_catalog_api.py      # Testes de integração (pytest)
src/pages/Catalog/Catalog.test.tsx     # Testes de componente (Jest)
src/App.test.tsx                        # Teste de smoke (já existia)
```

**Decisão:** testes replicam a estrutura do código (próximo ao que testam).

## 4. Dependências de Teste

### Backend
- `pytest==8.3.3` — framework de teste.
- `httpx==0.27.2` — cliente HTTP para TestClient do FastAPI.

**Nota:** não adicionado ao requirements de prod; CI roda com `requirements.txt` inteiro. Em Docker multi-stage, seria possível separar.

### Frontend
- Já incluídos: `@testing-library/react`, `@testing-library/jest-dom`, `jest`.

## 5. Fluxo de Submissão (This PR)

Esta branch reúne:
1. **Feat:** empty state inteligente com sugestões e CTA.
2. **Test:** 4 testes backend + 1 teste frontend.
3. **Docs:** este arquivo + update no README.

Checklist de validação na PR:
- [ ] Testes passam (`npm test`, `pytest backend/tests`)
- [ ] Build funciona (`npm run build`)
- [ ] Setup pode ser executado do zero
- [ ] Commits são semânticos e temáticos
- [ ] Sem regressões no fluxo existente (catálogo com resultados, detalhes, WhatsApp)

## 6. Próximos Passos (Dia 5 / Post-Entrega)

1. **CI/CD:** GitHub Actions para rodar testes automaticamente em PR.
2. **Dockerfile multi-stage:** separar deps de prod vs dev.
3. **Cobertura de testes:** aumentar para catalog.test.tsx (filtros, busca, loading).
4. **Observabilidade:** logs estruturados, métricas de uso do catálogo.
5. **Paginação:** quando banco crescer, adicionar limit/offset nos endpoints.

## Referências

- Padrão de empty state: Nielsen Norman Group (reduce cognitive friction, provide recovery path).
- Fixture pattern: pytest documentation — https://docs.pytest.org/en/stable/fixture.html
- React Testing Library best practices: prioritize user interactions over implementation.
