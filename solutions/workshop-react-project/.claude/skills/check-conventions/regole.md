# Cosa controllare

## I cinque file

| # | File | Cosa deve esserci |
|---|---|---|
| 1 | `src/components/<Nome>/<Nome>.tsx` e `<Nome>.css` | `export function <Nome>`, e il `.css` accanto importato con `import "./<Nome>.css"` |
| 2 | `src/components/<Nome>/<Nome>.example.tsx` | `export function <Nome>Example` |
| 3 | `src/components/index.ts` | `export { <Nome> }` **e** `export type { <Nome>Props }` |
| 4 | `src/App.tsx` | l'import di `<Nome>Example` e una voce `{ nome: "<Nome>", descrizione, esempio }` in `COMPONENTI` |
| 5 | `docs/componenti.md` | una riga della tabella con `` `<Nome>` ``, descrizione e props |

## Le sette convenzioni di CLAUDE.md

| Convenzione | Come si verifica |
|---|---|
| Export nominali, mai `default` | `grep "export default"` nella cartella del componente: nessun risultato |
| Props in una `interface <Nome>Props` esportata | `grep "export interface <Nome>Props"` in `<Nome>.tsx` |
| Niente `any` | `grep -E ": any\b\|as any\|@ts-ignore\|oxlint-disable\|eslint-disable"`: nessun risultato |
| Nessuna fetch, nessuna logica di dominio | `grep -E "fetch\(\|axios\|useEffect"` in `<Nome>.tsx`: nessun risultato |
| Cartella e file con il nome del componente | `src/components/<Nome>/<Nome>.tsx`, con la maiuscola |
| Stile in `<Nome>.css`, classi `ui-<nome>`, niente inline | il `.css` esiste; le classi cominciano con `ui-<nome>`; `grep "style={{"`: nessun risultato |
| Italiano nei testi, inglese nei nomi | testi visibili e commenti in italiano; nomi di variabili, funzioni e file in inglese |

## Le regole di `.claude/rules/`

| Regola | Come si verifica |
|---|---|
| `api.md` — il testo visibile arriva da `children` | nell'interfaccia delle props non ci sono `text`, `label` o `content`; il componente rende `{children}` |
| `ui.md` — l'elemento più esterno ha `data-ui="<nome>"` | `grep 'data-ui="<nome>"'` in `<Nome>.tsx`, sull'elemento restituito dal `return`; i `.example.tsx` non lo hanno |
