---
name: nuovo-componente
description: Crea un componente nuovo nella libreria toccando tutti e cinque i file previsti, esempio, export, vetrina e documentazione compresi. Usala quando serve aggiungere un componente al UI Kit. Trigger:nuovo componente, aggiungi un componente, crea un componente, aggiungi Card alla libreria, mi serve un componente nuovo.
allowed-tools: Read, Write, Edit, Bash(npm run:*)
---

# Un componente nuovo, tutto intero

Aggiungere un componente **a mano** richiede circa tre minuti e finisce quasi
sempre con l'export dimenticato. Questa skill fa gli stessi cinque passi senza
saltarne nessuno.

Se il nome del componente non è stato detto, chiedilo prima di toccare qualsiasi
file. Deve iniziare con la maiuscola.

## Passo 1 — il componente

Crea `src/ui/<Nome>/<Nome>.tsx` prendendo come modello
`src/ui/Badge/Badge.tsx`, che è il riferimento del progetto.

Rispetta le convenzioni di `CLAUDE.md`: export nominale, `interface <Nome>Props`
esportata, niente `any`, nessuna fetch e nessuna logica di dominio dentro, e le
classi Tailwind in mappe e non costruite con i template string.

## Passo 2 — l'esempio

Crea `src/ui/<Nome>/<Nome>.example.tsx` che esporta `<Nome>Example`.

Deve mostrare **ogni variante** delle props, non solo il caso base: l'esempio è
la documentazione vera, quella che si guarda davvero.

## Passo 3 — l'export

In `src/index.ts` aggiungi **due** righe, il componente e il suo tipo di props,
tenendo l'ordine alfabetico dei blocchi già presenti.

È il passo che si dimentica: il progetto compila lo stesso e te ne accorgi
giorni dopo, quando qualcuno prova a importarlo da fuori.

## Passo 4 — la vetrina

In `src/gallery/Gallery.tsx` importa l'esempio e aggiungi una voce a
`COMPONENTI` con `nome`, `descrizione` e `esempio`.

## Passo 5 — la documentazione

In `docs/componenti.md` aggiungi una riga alla tabella, in ordine alfabetico,
con le props principali.

## Cosa non fare

- Non toccare i componenti che già esistono.
- Non aggiungere dipendenze.
- Non far scoprire l'esempio alla vetrina in automatico: la registrazione a mano
  è voluta.
- Non sistemare `Callout`, che è incompleto di proposito.

## Output

Chiudi lanciando `npm run check` e riporta una tabella con i cinque file e cosa
hai scritto in ognuno, poi una riga sola: **verde** oppure **da sistemare**, con
l'errore così com'è.
