---
name: new-component
description: Aggiunge un componente alla libreria toccando tutti e cinque i file di CLAUDE.md. Usala quando l'utente vuole un componente nuovo. Trigger: crea un componente, nuovo componente, mi serve un componente, aggiungi alla libreria.
allowed-tools: Read, Write, Edit, Glob, Bash(npm run:*)
---

# Un componente nuovo, tutto intero

Il nome arriva da `$ARGUMENTS` o dalla richiesta. Se manca, chiedilo prima di
toccare qualsiasi file. Modello: `src/components/Badge/`.

1. `src/components/<Nome>/<Nome>.tsx` — export nominale `<Nome>`,
   `export interface <Nome>Props`, contenuto da `children`, default delle props
   nella firma. Importa `./<Nome>.css`.
2. `src/components/<Nome>/<Nome>.css` — classi `ui-<nome>`, niente stile inline.
3. `src/components/<Nome>/<Nome>.example.tsx` — esporta `<Nome>Example` e mostra
   tutte le varianti.
4. `src/components/index.ts` — due righe: il componente e `<Nome>Props`.
5. `src/App.tsx` — importa l'esempio e aggiungi una voce `{ nome, descrizione, esempio }`
   all'array `COMPONENTI`, in ordine alfabetico.
6. `docs/componenti.md` — una riga nella tabella: nome, descrizione, props.

## Cosa non fare

- Non toccare gli altri componenti.
- Non aggiungere dipendenze.
- Non far scoprire gli esempi in automatico: la registrazione in `App.tsx` è a mano.

## Chiusura

Lancia `npm run check` e riporta i file toccati, poi **verde** oppure l'errore
così com'è.
