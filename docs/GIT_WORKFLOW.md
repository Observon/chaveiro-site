# Git Workflow

## Objetivo
Manter o historico do projeto legivel, com commits pequenos, semanticos e facil de revisar.

## Branches
- `main`: sempre estavel
- `feature/<assunto>`: novas funcionalidades
- `fix/<assunto>`: correcoes pontuais
- `docs/<assunto>`: documentacao
- `test/<assunto>`: testes e ajustes de qualidade

## Commits semanticos
Formato sugerido:
- `feat: adiciona endpoint de catalogo`
- `fix: corrige teste de roteamento`
- `test: adiciona cenario de filtros`
- `docs: atualiza guia tecnico`
- `chore: ajusta configuracao do projeto`

Regras praticas:
- cada commit deve resolver um unico objetivo
- evitar commits genericos como `update` ou `fixes`
- preferir mensagens no imperativo e especificas
- commitar primeiro a base funcional, depois refinamentos

## Fluxo recomendado
1. Criar branch a partir de `main`.
2. Fazer alteracoes pequenas e coerentes.
3. Rodar testes antes do commit.
4. Commits semanticos com escopo claro.
5. Abrir PR com descricao objetiva e checklist.

## O que documentar no PR
- contexto da mudanca
- o que foi feito
- como validar
- riscos ou pendencias
- capturas de tela quando fizer sentido
