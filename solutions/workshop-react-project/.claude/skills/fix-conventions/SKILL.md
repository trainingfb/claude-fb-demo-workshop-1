---
name: fix-conventions
description: Sistema i componenti che non rispettano i cinque file, le convenzioni o le regole del progetto, creando quello che manca. Usala dopo check-conventions, quando c'è qualcosa da sistemare. Trigger: sistema Callout, completa il componente, metti a posto le convenzioni, allinea la libreria.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash(npm run:*)
---

# Sistema quello che manca

Perimetro: `$ARGUMENTS`, un componente (`Callout`) o una cartella (`src/components`).
Se è vuoto, tutto `src/components/`.

1. **Cosa controllare.** Leggi `.claude/skills/check-conventions/regole.md`:
   è l'unica fonte, non ripeterla qui.
2. **Trova cosa manca**, componente per componente, dentro il perimetro.
3. **Sistema**, solo quello che manca:
   - l'esempio `<Nome>.example.tsx`, sul modello degli altri `.example.tsx`
     già presenti, con tutte le varianti;
   - la voce in `COMPONENTI` di `src/App.tsx`, con l'import dell'esempio;
   - la riga in `docs/componenti.md`;
   - gli export in `src/components/index.ts`, componente e tipo di props;
   - un attributo sull'elemento esterno, se una regola lo chiede.
4. **Controlla**: lancia `npm run check`.

## Cosa non fare

- Non cambiare le props né l'elemento esterno di un componente. Se servirebbe,
  fermati e chiedi.
- Non toccare `CLAUDE.md` né `.claude/rules/`.
- Non uscire dal perimetro.
- Non aggiungere dipendenze.

## Output

Una riga per file toccato: `<file> — <cosa hai fatto>`.
Poi l'esito di `npm run check`. Se non c'era niente da fare, dillo e basta.
