---
target: Legado Digital landing page
total_score: 18
max_score: 36
na_heuristics: 7
p0_count: 2
p1_count: 2
timestamp: 2026-09-21T06-17-51Z
slug: src-app-page-tsx
---
Method: dual-agent (A: a581b206a8662d1b3 · B: a7a5df81612135fde)

# Critica de Design — Legado Digital (Landing Page)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 2 | CTAs de WhatsApp nao dao confirmacao in-page |
| 2 | Match System / Real World | 2 | Copy calorosa, visual generico de SaaS |
| 3 | User Control and Freedom | 2 | Sem reassurance ao abrir WhatsApp |
| 4 | Consistency and Standards | 3 | 6 verbos de CTA para 2 acoes reais |
| 5 | Error Prevention | 1 | Bug de preco no card Entrega Autonoma |
| 6 | Recognition Rather Than Recall | 2 | 5 planos sem tabela de diferencas |
| 7 | Flexibility and Efficiency | n/a | Pagina de marketing |
| 8 | Aesthetic and Minimalist Design | 2 | Cards numerados vazios na SolutionSection |
| 9 | Error Recovery | 2 | Sem loading/fallback nas imagens da Demo |
| 10 | Help and Documentation | 2 | Reassurances isoladas na FAQ, longe do CTA |
| Total | | 18/36 | Acceptable (50%) |

## Design Specificity Verdict
Template generico de SaaS/consultoria com copy pt-BR de familia. Nenhuma foto real, arvore, timeline ou textura de papel/arquivo. Detector mecanico: 0 findings (exit 0) — problemas sao de especificidade e hierarquia, nao anti-padroes tecnicos.

## Priority Issues
- [P0] Bug de exibicao de preco no plano Entrega Autonoma (PlansSection.tsx:43-47)
- [P0] Decisao de 5 planos sem guia, alto custo cognitivo (PlansSection.tsx)
- [P1] Nenhuma prova social/emocional na pagina inteira
- [P1] Inconsistencia de rotulos de CTA (6 verbos para 2 acoes)
- [P2] Cards numerados vazios na SolutionSection (linhas 54-60)

## Persona Red Flags
- Jordan: trava na PlansSection, sem CTA header no mobile
- Casey: sem CTA persistente no header mobile (hidden md:inline-block)
- Riley: encontra o bug de preco e perde confianca nos outros numeros

## Minor Observations
- Footer sem mailto/wa.me links
- Sem focus states customizados
- Gap vertical grande entre Demo e Plans (mobile)
- Header sticky cria costura visual sobre footer escuro
- Dourado subutilizado
- Sem skeleton de loading nas imagens da Demo

## Questions
1. PlansSection com quiz de dimensionamento em vez de 5 cards crus?
2. Hero com arvore/livro real em vez de mockup de dashboard?
