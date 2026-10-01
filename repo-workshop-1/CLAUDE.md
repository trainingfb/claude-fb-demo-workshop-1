# UI Kit — istruzioni per Claude

Una piccola libreria di componenti React. Serve a imparare come si lavora con
Claude Code: regole di progetto, skill e plugin.

## La mappa

```
src/ui/<Nome>/       il componente e il suo esempio
src/index.ts         gli export della libreria
src/gallery/         la vetrina che mostra gli esempi
docs/componenti.md   la tabella dei componenti
.claude/skills/      le skill di questo progetto
.claude/rules/       le regole aggiunte da chi lavora qui
workshop/            le istruzioni del percorso — per la persona, non per te
```

`workshop/` non è codice di questo progetto: sono gli esercizi che la persona
sta facendo. **Non aprirli e non citarli** se non te lo chiede esplicitamente.
Se ti chiede «a che punto sono», la risposta è `npm run verifica`, non la
lettura degli esercizi.

## I cinque file da toccare

Aggiungere un componente tocca **cinque** file, sempre gli stessi:

1. `src/ui/<Nome>/<Nome>.tsx` — il componente
2. `src/ui/<Nome>/<Nome>.example.tsx` — l'esempio, che esporta `<Nome>Example`
3. `src/index.ts` — l'export del componente **e** del suo tipo di props
4. `src/gallery/Gallery.tsx` — la registrazione nella vetrina
5. `docs/componenti.md` — una riga nella tabella

Se ne salti uno il progetto compila lo stesso, ed è proprio questo il problema:
te ne accorgi dopo. Il più dimenticato è il terzo.

## Convenzioni

- **Export nominali, mai `default`.** Un export di default si può rinominare a ogni import, e il nome smette di voler dire qualcosa.
- **Le props sono tipizzate in una `interface <Nome>Props` esportata.** Serve a chi usa la libreria da fuori.
- **Niente `any`.** Se non sai tipizzare qualcosa, dillo invece di zittire il compilatore. Nessun `@ts-ignore` e nessun commento per disattivare il linter senza chiedere.
- **Nessuna fetch e nessuna logica di dominio dentro un componente.** Riceve props, rende markup. Se ti serve un dato, lo riceve chi lo usa.
- **Cartella e file hanno lo stesso nome del componente**, con la maiuscola.
- **Le classi Tailwind stanno in mappe**, non costruite al volo con i template string: Tailwind legge i nomi di classe interi nel sorgente, e una classe composta a runtime non finisce nel CSS.
- **Italiano** per i testi visibili e i commenti, **inglese** per nomi di variabili, funzioni e file.

## Comandi

```bash
npm run dev        # la vetrina su http://localhost:5173
npm run check      # typecheck + lint — prima di ogni commit
npm run verifica   # a che punto sei del percorso
```

## Cosa non fare

- Non aggiungere dipendenze senza chiedere. Quello che serve c'è già.
- Non far scoprire gli esempi alla vetrina in automatico: la registrazione a
  mano è voluta, è l'esercizio.
- Non sistemare il componente `Callout`, che è incompleto di proposito.
- Non riformattare file che non stai modificando.
- Non anticipare i passi del percorso leggendo `workshop/`. Se la persona ti
  chiede qualcosa che sta in un esercizio, rispondi alla domanda che ti ha
  fatto, non a quella che l'esercizio le sta facendo.
