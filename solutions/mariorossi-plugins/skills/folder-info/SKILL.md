---
name: folder-info
description: Misura una cartella e riporta quanti file ci sono per tipo, quanto pesano, e quali sono i più grandi e i più recenti. Usala per capire com'è fatto un progetto che non conosci. Trigger: info sulla cartella, quanti file ci sono, quanto pesa il progetto, com'è fatta questa cartella, folder info.
allowed-tools: Bash(find:*), Bash(du:*), Bash(wc:*), Bash(ls:*), Bash(sort:*), Bash(awk:*), Bash(sed:*), Bash(xargs:*), Bash(head:*), Bash(uniq:*)
---

# Com'è fatta questa cartella

Cartella da misurare: `$ARGUMENTS`. Se è vuoto, la cartella corrente.
Ignora sempre `node_modules`, `.git`, `dist` e `build`.

## Cosa misurare

1. **File per tipo** — conta i file raggruppati per estensione e somma le
   dimensioni di ogni gruppo:
   `find <dir> -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/build/*' -print0 | xargs -0 du -k | awk '{ n=split($2,a,"."); ext=(n>1)?a[n]:"(nessuna)"; c[ext]++; s[ext]+=$1 } END { for (e in c) printf "%s\t%d\t%d\n", e, c[e], s[e] }' | sort -k2 -rn`
2. **Totale** — file totali, cartelle totali, dimensione complessiva (`du -sk <dir>`).
3. **I cinque file più grandi** — `find ... -type f -print0 | xargs -0 du -k | sort -rn | head -5`.
4. **I cinque file modificati più di recente** — `find ... -type f -print0 | xargs -0 ls -lt | head -5`.

## Cosa non fare

- Non leggere il contenuto dei file: si contano, non si aprono.
- Non modificare niente: questa skill guarda e basta.
- Non entrare in `node_modules`, `.git`, `dist`, `build`.

## Output

Solo questo, senza commenti intorno:

| Tipo | File | KB |
|---|---|---|
| (una riga per estensione, dalla più numerosa) |

Poi tre righe: `Totale: N file, M cartelle, X KB`, i cinque più grandi
(percorso e KB), i cinque più recenti (percorso e data).
