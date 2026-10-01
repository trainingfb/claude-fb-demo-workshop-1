---
name: check-convenzioni
description: Controlla che un componente rispetti le convenzioni di CLAUDE.md e sia presente in tutti e cinque i file previsti, e chiude con un verdetto. Usala prima di committare un componente. Trigger:controlla le convenzioni, check convenzioni, questo componente è a posto, posso committare il componente, cosa manca a Callout.
allowed-tools: Read, Grep, Glob, Bash(npm run:*)
---

# Il componente è a posto?

Controllo da un minuto, da fare **prima di committare**. Serve a trovare adesso
le due cose che altrimenti si scoprono molto dopo: uno dei cinque file saltato,
o una convenzione non rispettata.

Se il componente da controllare non è stato detto, controllali tutti.

## Passo 1 — i cinque file

Per ogni componente in `src/ui/`, verifica che esista e sia registrato in tutti
e cinque i file elencati in `CLAUDE.md`. L'elenco preciso di cosa cercare in
ognuno sta in [regole.md](regole.md): leggilo, non andare a memoria.

## Passo 2 — le convenzioni

Sempre da [regole.md](regole.md), la seconda tabella. Sono cinque controlli che
si fanno leggendo il file del componente.

## Passo 3 — il compilatore

Lancia `npm run check`. Se è rosso, riporta l'errore così com'è, senza
interpretarlo al ribasso.

## Cosa non fare

- **Non sistemare niente.** Questa skill guarda e riferisce, non ripara. Se
  trovi un problema lo dici, e chi ha scritto il codice decide.
- Non segnalare come problema una scelta che `CLAUDE.md` non vieta: le
  preferenze personali non sono convenzioni.
- Non fermarti al primo problema: fai tutti i controlli e riferisci insieme.

## Output

Una riga per componente controllato, in questa forma:

```
<Nome>   ✅  oppure  ⚠️ <cosa manca, in una riga>
```

Poi, per ogni problema trovato, tre righe:

```
<file>:<riga> — <cosa non va>
Regola: <la riga di CLAUDE.md che non è rispettata>
Come si sistema: <una riga>
```

Chiudi con **committabile** oppure **da sistemare prima**.
