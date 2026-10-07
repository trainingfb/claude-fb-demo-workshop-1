# hello-workshop — la soluzione finale

Com'è `hello-workshop` alla fine del workshop 1, dopo tutti i passi di
[`doc-studenti/`](../../doc-studenti/). Serve per confrontare il proprio progetto,
o per ripartire da un punto noto se qualcosa si è rotto.

Il percorso **non parte da qui**: al passo 1 gli studenti creano il progetto da
zero con `npm create vite@latest hello-workshop -- --template react-ts`.

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | la vetrina dei componenti su http://localhost:5173 |
| `npm run check` | typecheck + lint |
| `npm run verifica` | controlla passo per passo cosa risulta fatto |

## Cosa c'è, e da quale passo arriva

| Passo | Dove |
|---|---|
| 1 | il progetto Vite, `src/App.tsx` ridotto all'osso |
| 2–3 | `CLAUDE.md` con i cinque file, le sette convenzioni e «Non fare mai» |
| 3 | la libreria in `src/components/` (`Badge`, `Button`, `Stack`), la vetrina in `src/App.tsx`, `docs/componenti.md` |
| 3 | `.claude/rules/api.md` e `.claude/rules/ui.md`, con i `paths` |
| 5 | le skill `new-component` e `check-conventions` (in due file, `SKILL.md` e `regole.md`), e `Callout` |
| 6 | la skill `fix-conventions`, e `Callout` completato |
| 7 | gli agenti `auditor` (sola lettura) e `stats` (con `Bash`, modello `haiku`) |
| 8 | `Avatar` e `Tooltip`, nati da due agenti in parallelo |
| 9 | il plugin `git@claude-fb-marketplace-demo-workshop` in `.claude/settings.json` |
| 10–11 | il plugin `dev-tools` sta **fuori** da questo repo: [`../mariorossi-plugins/`](../mariorossi-plugins/) |
| 12 | gli hook in `.claude/hooks/`, registrati in `.claude/settings.json` |

Lo `Spinner` e il `Kbd` del passo 3, il tema del passo 4 e la costante `DEBUG`
del passo 12 non ci sono: le dispense li fanno buttare via.

## Le regole del progetto

I cinque file da toccare e le convenzioni stanno in [`CLAUDE.md`](CLAUDE.md),
le regole aggiunte in [`.claude/rules/`](.claude/rules/).
