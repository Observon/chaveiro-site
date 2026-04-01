# Git Workflow

## Objetivo
Manter o histórico do projeto legível, com commits pequenos, semânticos e fácil de revisar.

## Branches
- `main`: sempre estável
- `feature/<assunto>`: novas funcionalidades
- `fix/<assunto>`: correções pontuais
- `docs/<assunto>`: documentação
- `test/<assunto>`: testes e ajustes de qualidade

## Commits semânticos
Formato sugerido:
- `feat: adiciona endpoint de catálogo`
- `fix: corrige teste de roteamento`
- `test: adiciona cenário de filtros`
- `docs: atualiza guia técnico`
- `chore: ajusta configuração do projeto`

Regras práticas:
- cada commit deve resolver um único objetivo
- evitar commits genéricos como `update` ou `fixes`
- preferir mensagens no imperativo e específicas
- commitar primeiro a base funcional, depois refinamentos

## Fluxo recomendado
1. Criar branch a partir de `main`.
2. Fazer alterações pequenas e coerentes.
3. Rodar testes antes do commit.
4. Commits semânticos com escopo claro.
5. Abrir PR com descrição objetiva e checklist.

## O que documentar no PR
- contexto da mudança
- o que foi feito
- como validar
- riscos ou pendências
- capturas de tela quando fizer sentido
