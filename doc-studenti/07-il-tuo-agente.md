> **Passo 7 · 20 minuti · da solo**
> ← [06 · La skill fix-conventions](06-la-skill-fix-conventions.md) · [indice](../README.md) · [08 · Agenti in parallelo](08-agenti-in-parallelo.md) →

# Il tuo primo subagent

Una skill è un insieme di istruzioni che entra nella **tua** sessione. Un subagent è qualcun altro: ha il suo contesto, fa il lavoro per conto suo, e ti riporta solo la conclusione.

La differenza conta quando il lavoro richiede di **leggere e/o analizzare molti contenuti**.

---

## Il primo lo scrive Claude

Un agente è un file solo, con un frontmatter e delle istruzioni: identico a una skill nella forma, diverso in tre punti che vedi subito.

**Prompt:**

```
Scrivi .claude/agents/auditor.md: un subagent che passa in rassegna tutta la
libreria in src/components/ e riferisce com'è messa rispetto a @CLAUDE.md.

Frontmatter: name, description con le frasi che direi io ("com'è messa la
libreria", "passa in rassegna i componenti", "fammi un audit"), model: sonnet,
tools: Read, Glob, Grep. Nient'altro: non deve poter scrivere.

Istruzioni: legge ogni componente, controlla i cinque file e le convenzioni,
e riferisce in massimo quindici righe: una per componente, poi i problemi.
Non sistema niente. Massimo trenta righe in tutto.
```

Aprilo (`.claude/agents/auditor.md`). Il frontmatter dovrebbe essere così:

```yaml
name: auditor
description: ...        # quando usarlo
model: sonnet           # può avere un modello suo
tools: Read, Glob, Grep # e soprattutto: solo questi
```

Guarda `tools`: l'auditor **non ha Write né Edit**. Non è una raccomandazione nelle istruzioni, è che non ne dispone. Un agente che deve solo guardare non deve poter toccare. Se Claude gli ha dato anche `Write` o `Bash`, toglili tu.

---

## Provalo

Riavvia `claude`, poi:

**Prompt**

```bash
passa in rassegna tutta la libreria e dimmi com'è messa
```

Attendi un minutino.  Nel frattempo lui ha letto una quindicina di file, ma quei file **non sono finiti nel tuo contesto**: è arrivata solo la conclusione.

È questo il motivo per cui esiste. Una skill che facesse la stessa cosa ti riempirebbe la sessione del contenuto di quei quindici file, e dopo tre giri saresti a corto di spazio.

---

## Skill o subagent?

| | |
|---|---|
| **Skill** | istruzioni per te, nel tuo contesto, vedi tutto quello che succede |
| **Subagent** | lavoro delegato, contesto separato, ti torna solo il risultato |

La domanda da farsi è una sola: **mi serve vedere i passaggi, o solo la risposta?**

---

## L'agente `stats`

Crea `.claude/agents/stats.md`: un agente che misura il progetto e riporta i numeri in una tabella — quanti componenti, quante righe di codice, quanti commit, e simili.

Copia la forma dall'auditor e cambia il mestiere. Ma stavolta c'è una differenza che conta.

### I tool: stavolta serve `Bash`

Per contare i commit serve `git log`, per contare le righe serve `wc`: l'agente deve poter lanciare comandi. Quindi `tools: Read, Glob, Grep, Bash`.

`Bash` però è largo: con quello un agente può anche committare o cancellare. L'auditor aveva il confine nel campo `tools` — niente `Write`, e basta. Qui il tool serve, e allora **il confine va scritto nelle istruzioni**: «usa solo comandi che leggono — `git log`, `git rev-list`, `wc`, `find`, `ls`. Mai `git commit`, `git checkout`, `rm`». Sono i due modi di limitare un agente, e li hai visti tutti e due.

Un dettaglio in più: contare non richiede un modello grande. Mettigli `model: haiku` — è più veloce, costa meno, e vedi che il campo serve a qualcosa.

### Cosa deve riportare

Una tabella fissa, sempre la stessa, così si confronta da una volta all'altra:

| Misura | Come |
|---|---|
| componenti | cartelle in `src/components/` — `ls -d src/components/*/ \| wc -l` |
| righe di `.tsx` e di `.css` in `src/components/` | `wc -l` |
| commit totali | `git rev-list --count HEAD` |
| commit che toccano `src/components/` | `git log --oneline -- src/components \| wc -l` |
| ultimo commit | `git log -1 --format=%cd` |
| skill e agenti in `.claude/` | cartelle e file |

Le due cose da non sbagliare restano le stesse:

- **`tools`**: quello che serve, e il confine nelle istruzioni dove il tool è largo.
- **`description`**: è quella che decide quando parte. Frasi vere: «com'è messo il progetto in numeri», «quante righe di codice», «statistiche del progetto».

### Soluzione / Prompt

Il prompt, se preferisci farlo scrivere a Claude e poi correggerlo:

```
Scrivi .claude/agents/stats.md, modello @.claude/agents/auditor.md: un subagent che
misura il progetto e riporta una tabella con componenti, righe di .tsx e di .css in
src/components/, commit totali, commit che toccano src/components/, data dell'ultimo
commit, skill e agenti in .claude/.

Frontmatter: name, description con le frasi che direi io ("com'è messo il progetto
in numeri", "quante righe di codice", "statistiche del progetto"), model: haiku,
tools: Read, Glob, Grep, Bash.

Nelle istruzioni: usa solo comandi che leggono — git log, git rev-list, wc, find, ls.
Mai git commit, git checkout, rm o qualunque comando che scrive. Per ogni misura
indica il comando da usare. Output: solo la tabella, poi una riga con la data.
Massimo trenta righe.
```

Quando lo apri, cerca quattro cose: `tools` con `Bash` dentro, `model: haiku`, la riga che vieta i comandi che scrivono, e una `description` con le tue frasi. Se una manca, aggiungila tu.

### Provalo, e verifica due numeri

Riavvia `claude` e chiedi con una frase normale, senza nominarlo:

**Prompt:**

```
com'è messo il progetto in numeri?
```

Ci metterà un minutino o due.
Ti torna la tabella. Nel frattempo lui ha letto tutti i file e tutta la storia git, e nel tuo contesto è arrivata solo la tabella.

I numeri di un agente si verificano. Due li controlli a mano, nel terminale dei comandi:

```bash
git rev-list --count HEAD           # commit totali
ls -d src/components/*/ | wc -l     # Totale componenti, ovvero le cartelle in src/components (index.ts escluso)
```

Devono essere identici ai dati della tabella (Commit Totali e Componenti). 
Se non tornano, l'agente ha contato male: guarda cosa ha lanciato e stringi le istruzioni.

Poi committa tutti e due:

```bash
git add .claude/agents && git commit -m "chore: agenti auditor e stats"
```

---

## Fatto

- [ ] `.claude/agents/auditor.md` ha `tools: Read, Glob, Grep` e niente altro
- [ ] `.claude/agents/stats.md` ha `Bash` nei `tools` e il confine sui comandi nelle istruzioni
- [ ] tutti e due partono da una frase normale
- [ ] i due numeri verificati a mano tornano
- [ ] committati
