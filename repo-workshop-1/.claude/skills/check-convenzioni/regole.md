# Cosa controllare, nel dettaglio

Questo file non viene letto a ogni sessione: lo carica la skill solo quando
serve davvero. È il motivo per cui `SKILL.md` può restare corto.

## I cinque file da toccare

| # | Dove | Cosa deve esserci |
|---|---|---|
| 1 | `src/ui/<Nome>/<Nome>.tsx` | il componente, con export nominale `<Nome>` |
| 2 | `src/ui/<Nome>/<Nome>.example.tsx` | export nominale `<Nome>Example` |
| 3 | `src/index.ts` | due export: il componente e `<Nome>Props` |
| 4 | `src/gallery/Gallery.tsx` | l'import dell'esempio e una voce in `COMPONENTI` |
| 5 | `docs/componenti.md` | una riga nella tabella |

Il file più spesso mancante è il terzo. Il quarto e il quinto non rompono
niente, quindi passano inosservati per settimane.

## Le convenzioni di CLAUDE.md

| Controllo | Come si verifica |
|---|---|
| Export nominali, mai `default` | nel file non compare `export default` |
| Props tipizzate ed esportate | c'è `export interface <Nome>Props` |
| Niente `any` | non compaiono `any`, `@ts-ignore`, disattivazioni del linter |
| Niente fetch e niente dominio | non compaiono `fetch`, `useEffect`, chiamate di rete |
| Classi Tailwind in mappe | le classi variabili stanno in oggetti, non composte con i template string dentro `className` |

## Una nota sull'ultimo controllo

Questo è sbagliato, perché Tailwind non vede mai la stringa `text-red-500`
intera nel sorgente e quindi non la genera:

```tsx
className={`text-${colore}-500`}
```

Questo è giusto:

```tsx
const colori = { rosso: "text-red-500", blu: "text-blue-500" };
className={colori[colore]}
```

È una trappola che non dà errore: il componente funziona, ma senza colore.
