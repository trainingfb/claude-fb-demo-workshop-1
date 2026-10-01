# UI Kit

Una piccola libreria di componenti React. Il dominio non conta niente: conta
che aggiungere un componente tocchi **cinque file sempre uguali**, che è
esattamente il genere di noia su cui si impara a costruire una skill.

> **Le istruzioni del percorso stanno in [`workshop/`](workshop/).**
> Si parte da [`workshop/README.md`](workshop/README.md) e si va in ordine:
> circa due ore, da fare da soli, prima del workshop 2 in aula.

## Prerequisiti

Node 22 o superiore, git, Claude Code con un account Pro o Max.

## Partenza

```bash
npm install
npm run dev        # la vetrina su http://localhost:5173
```

## Comandi

| Comando | Cosa fa |
|---|---|
| `npm run dev` | la vetrina dei componenti |
| `npm run check` | typecheck + lint — **prima di ogni commit** |
| `npm run verifica` | a che punto sei del percorso |

## Cosa c'è già

- tre componenti finiti, `Badge`, `Button` e `Stack`, con il loro esempio
- un quarto componente, `Callout`, **incompleto di proposito**
- due skill di esempio in `.claude/skills/` e un subagent in `.claude/agents/`
- `.claude/rules/mie-regole.md`, vuoto: è il posto per le regole tue

## I cinque file da toccare

Aggiungere un componente ne tocca cinque, sempre gli stessi:

```
1. src/ui/<Nome>/<Nome>.tsx           il componente
2. src/ui/<Nome>/<Nome>.example.tsx   l'esempio
3. src/index.ts                       l'export
4. src/gallery/Gallery.tsx            la vetrina
5. docs/componenti.md                 la tabella
```

Se ne salti uno il progetto compila lo stesso, ed è proprio questo il problema.
Il più dimenticato è il terzo.

Le regole del progetto stanno in [`CLAUDE.md`](CLAUDE.md). Le tue le aggiungi
in [`.claude/rules/mie-regole.md`](.claude/rules/mie-regole.md): Claude carica
da solo tutto quello che sta in `.claude/rules/`, senza bisogno di importarlo.
