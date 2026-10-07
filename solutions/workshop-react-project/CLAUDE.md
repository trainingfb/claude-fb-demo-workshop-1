# hello-workshop

Una piccola libreria di componenti React con una vetrina che li mostra.

## I cinque file da toccare

Aggiungere un componente tocca **cinque** file, sempre gli stessi:

1. `src/components/<Nome>/<Nome>.tsx` — il componente, e accanto il suo `<Nome>.css`
2. `src/components/<Nome>/<Nome>.example.tsx` — l'esempio, che esporta `<Nome>Example`
3. `src/components/index.ts` — l'export del componente **e** del suo tipo di props
4. `src/App.tsx` — la registrazione nella vetrina, nell'array `COMPONENTI`
5. `docs/componenti.md` — una riga nella tabella

Se ne salti uno il progetto compila lo stesso, ed è proprio questo il problema: te ne accorgi dopo. Il più dimenticato è il terzo.

## Convenzioni

- **Export nominali, mai `default`.** Un export di default si può rinominare a ogni import, e il nome smette di voler dire qualcosa.
- **Le props sono tipizzate in una `interface <Nome>Props` esportata.** Serve a chi usa la libreria da fuori.
- **Niente `any`.** Se non sai tipizzare qualcosa, dillo invece di zittire il compilatore. Nessun `@ts-ignore` e nessun commento per disattivare il linter.
- **Nessuna fetch e nessuna logica di dominio dentro un componente.** Riceve props, rende markup. Se serve un dato, lo riceve chi lo usa.
- **Cartella e file hanno lo stesso nome del componente**, con la maiuscola.
- **Lo stile sta in `<Nome>.css` accanto al componente**, importato dal componente. Le classi hanno il prefisso `ui-<nome>` in minuscolo. Niente `style={{ }}` inline.
- **Italiano** per i testi visibili e i commenti, **inglese** per nomi di variabili, funzioni e file.

## Non fare mai

- Non modificare `src/main.tsx`.
- Non aggiungere dipendenze senza chiedere prima.
- Non installare librerie di componenti: la UI si scrive a mano.
- Non far scoprire gli esempi alla vetrina in automatico: la registrazione a mano in `App.tsx` è voluta.
