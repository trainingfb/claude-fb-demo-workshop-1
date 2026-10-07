---
name: check-conventions
description: Controlla che i componenti della libreria rispettino i cinque file, le convenzioni di CLAUDE.md e le regole di .claude/rules/, e chiude con un verdetto. Usala prima di committare un componente. Trigger: controlla le convenzioni, questo componente è a posto, posso committare il componente, cosa manca a Callout.
allowed-tools: Read, Grep, Glob, Bash(npm run:*)
---

# Il componente è a posto?

Perimetro: il componente in `$ARGUMENTS`; se è vuoto, tutti quelli in `src/components/`.

1. **I cinque file.** Per ogni componente verifica i cinque file: cosa cercare
   in ognuno sta in [regole.md](regole.md), prima tabella.
2. **Convenzioni e regole.** Verifica le convenzioni di `CLAUDE.md` e le regole
   di `.claude/rules/*.md`: seconda e terza tabella di [regole.md](regole.md).
3. **Il compilatore.** Lancia `npm run check` e riporta l'errore così com'è.

## Cosa non fare

- Non sistemare niente: guarda e riferisci. Per riparare c'è `fix-conventions`.
- Non fermarti al primo problema: fai tutti i controlli, poi riferisci.

## Output

Una riga per componente: `<Nome> ✅` oppure `<Nome> ⚠️ <cosa manca>`.
Poi, per ogni problema: `file:riga`, la regola violata, come si sistema.
Chiudi con **committabile** oppure **da sistemare prima**.
