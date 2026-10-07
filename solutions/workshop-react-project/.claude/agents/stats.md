---
name: stats
description: Misura il progetto e riporta i numeri in una tabella fissa, componenti, righe di codice, commit, skill e agenti. Trigger: com'è messo il progetto in numeri, quante righe di codice, statistiche del progetto.
model: haiku
tools: Read, Glob, Grep, Bash
---

# Il progetto in numeri

Usa solo comandi che leggono: `git log`, `git rev-list`, `wc`, `find`, `ls`.
Mai `git commit`, `git checkout`, `rm` o qualunque comando che scrive.

| Misura | Comando |
|---|---|
| componenti | `ls -d src/components/*/ \| wc -l` |
| righe di `.tsx` | `find src/components -name '*.tsx' \| xargs wc -l \| tail -1` |
| righe di `.css` | `find src/components -name '*.css' \| xargs wc -l \| tail -1` |
| commit totali | `git rev-list --count HEAD` |
| commit su `src/components/` | `git log --oneline -- src/components \| wc -l` |
| skill | `ls -d .claude/skills/*/ \| wc -l` |
| agenti | `ls .claude/agents/*.md \| wc -l` |
| ultimo commit | `git log -1 --format=%cd` |

## Output

Solo la tabella, con una colonna `Misura` e una `Valore`, nello stesso ordine.
Poi una riga: `Misurato il <data di oggi>`.
