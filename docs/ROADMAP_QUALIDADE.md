# Roadmap de Qualidade - Chaveiro Site

Data de referencia: 05/04/2026
Horizonte: 8 semanas
Objetivo: aumentar confiabilidade, previsibilidade de entrega e seguranca sem bloquear evolucao de produto.

## Visao geral por fase

- Fase 1 (Semana 1-2): Fundacao de qualidade (CI, lint, format, contratos minimos)
- Fase 2 (Semana 3-5): Confiabilidade tecnica (testes robustos, seguranca, observabilidade)
- Fase 3 (Semana 6-8): Evolucao sustentavel (migracoes, performance, DX e governanca)

## Indicadores de sucesso (KPIs)

- Build e testes obrigatorios em PR: 100% dos PRs
- Taxa de regressao em producao: tendencia de queda
- Tempo medio para detectar falha em PR: menor que 10 minutos
- Cobertura de testes backend: >= 85%
- Cobertura de testes frontend: >= 75%
- Vulnerabilidades criticas abertas em dependencias: 0

## Fase 1 - Fundacao (Semana 1-2)

### 1. CI obrigatoria por Pull Request
Prioridade: Alta
Impacto: Alto
Esforco: Medio

Escopo:
- Criar workflow de CI no GitHub Actions para frontend e backend
- Executar: install, testes, build e validacoes de qualidade
- Bloquear merge quando checks falharem

Criterios de aceite:
- Todo PR executa pipeline automaticamente
- Falha em teste ou build impede merge
- Badge de status no README

### 2. Contrato de qualidade local e no CI
Prioridade: Alta
Impacto: Alto
Esforco: Medio

Escopo:
- Frontend: scripts de lint, format check e type-check
- Backend: padrao com ruff, black, isort e mypy (ou equivalente inicial com ruff + black)
- Comando unico de validacao para rodar tudo antes do PR

Criterios de aceite:
- Existe comando unico para validacao full
- Regras documentadas no README
- Equipe consegue reproduzir falhas localmente

### 3. Padronizacao de ambiente e secrets
Prioridade: Alta
Impacto: Medio
Esforco: Baixo

Escopo:
- Revisar variaveis obrigatorias e defaults inseguros
- Fail fast quando variavel critica ausente
- Checklist de configuracao por ambiente (dev/test/prod)

Criterios de aceite:
- Config invalida falha no startup com mensagem clara
- Arquivos de exemplo de ambiente atualizados

## Fase 2 - Confiabilidade (Semana 3-5)

### 4. Expansao da estrategia de testes
Prioridade: Alta
Impacto: Alto
Esforco: Medio

Escopo:
- Backend: aumentar cobertura em filtros, erros, limites e ordenacao
- Frontend: testes de fluxos criticos de catalogo e estados de falha
- Introduzir relatorio de cobertura no CI com threshold

Criterios de aceite:
- Cobertura minima aplicada por pipeline
- Cenarios criticos mapeados com testes automatizados

### 5. Seguranca de dependencias e imagem
Prioridade: Alta
Impacto: Alto
Esforco: Medio

Escopo:
- Auditoria automatica de dependencias no CI
- Endurecimento de container backend (usuario nao-root, healthcheck)
- Politica de atualizacao de dependencias (cadencia quinzenal)

Criterios de aceite:
- Relatorio de vulnerabilidades gerado por PR
- Nenhuma vulnerabilidade critica aprovada sem excecao formal

### 6. Observabilidade minima de producao
Prioridade: Media
Impacto: Alto
Esforco: Medio

Escopo:
- Logs estruturados (JSON) com correlation/request id
- Metricas basicas: latencia, taxa de erro e volume
- Readiness check com dependencia do banco

Criterios de aceite:
- Erros rastreaveis por request id
- Dashboard minimo com 3 metricas principais

## Fase 3 - Evolucao sustentavel (Semana 6-8)

### 7. Governanca de banco com migracoes versionadas
Prioridade: Alta
Impacto: Alto
Esforco: Medio

Escopo:
- Adotar fluxo de migracoes (ex.: Alembic)
- Definir estrategia de upgrade/downgrade
- Integrar migracoes ao deploy

Criterios de aceite:
- Mudancas de schema sem SQL manual ad-hoc
- Historico de schema reproduzivel em qualquer ambiente

### 8. Performance e UX de resiliencia
Prioridade: Media
Impacto: Medio
Esforco: Medio

Escopo:
- Definir budgets de performance (ex.: LCP, bundle size)
- Melhorar estados de loading, erro e vazio com consistencia
- Verificar acessibilidade basica (teclado, contraste, labels)

Criterios de aceite:
- Metricas de performance acompanhadas por release
- Checklist de acessibilidade aplicado nas telas principais

### 9. Planejamento de modernizacao frontend
Prioridade: Media
Impacto: Medio
Esforco: Medio/Alto

Escopo:
- Estudo de migracao de build tooling para Vite
- Prova de conceito em branch isolada
- Plano de corte sem quebrar testes atuais

Criterios de aceite:
- Documento de decisao tecnica com riscos, ganhos e plano
- POC executando build e testes com sucesso

## Plano de execucao semanal (resumo)

- Semana 1: CI base + scripts de qualidade + documentacao
- Semana 2: padronizacao de ambiente + ajustes de pipeline
- Semana 3: cobertura backend + thresholds
- Semana 4: cobertura frontend + testes de fluxo
- Semana 5: seguranca de dependencias + hardening de container
- Semana 6: logs estruturados + readiness + metricas
- Semana 7: migracoes versionadas + processo de release
- Semana 8: performance/acessibilidade + POC de modernizacao frontend

## Riscos e mitigacoes

- Risco: aumento inicial de atrito no desenvolvimento
Mitigacao: introduzir regras gradualmente (modo warning -> erro)

- Risco: tempo de pipeline alto
Mitigacao: cache de dependencias e jobs em paralelo

- Risco: cobertura artificial sem qualidade
Mitigacao: focar testes em cenarios de negocio e regressao historica

## Definicao de pronto (DoD) por item

- Codigo implementado com testes
- Documentacao atualizada
- Checks de CI verdes
- Sem vulnerabilidade critica nova
- Revisao de PR aprovada

## Backlog de alto ROI (ordem sugerida)

1. CI obrigatoria em PR
2. Scripts de qualidade padronizados
3. Threshold de cobertura com relatorio
4. Hardening de container backend
5. Logs estruturados com request id
6. Migracoes versionadas de banco
