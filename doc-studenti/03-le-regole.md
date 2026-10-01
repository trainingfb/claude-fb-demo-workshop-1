DURATA 10 MINUTI

> **Passo 3 · 25 minuti · da solo**
> ← [02 · Configurare il progetto](02-configurare-il-progetto.md) · [indice](../README.md) · [04 · Plan mode](04-plan-mode.md) →

# Le regole del progetto

Fin qui `hello-workshop` era una pagina con una riga. Adesso diventa una **piccola libreria di componenti**, con una vetrina che li mostra: è il progetto su cui lavorerai da qui alla fine, e lo costruisce Claude, adesso, seguendo regole che scrivi tu prima.

**Dove arrivi:** una libreria con tre componenti e una vetrina, un `CLAUDE.md` con le convenzioni, due regole scritte da te, e la prova che Claude le rispetta senza che tu gliele ricordi.

---

## Prima le regole, poi il codice

Se le convenzioni sono scritte **prima** che esista il codice, il codice nasce già conforme. 
Se le scrivi dopo, passi il pomeriggio a sistemare.

Apri `CLAUDE.md` — quello del passo 2, con le sezioni «Regole» e «Non fare mai» — e **sostituisci tutto il contenuto** con questo. Le sei righe del passo 2 ci sono ancora, riordinate; in più ci sono i cinque file, le convenzioni della libreria, e un divieto nuovo in fondo:

```markdown
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
```
La riga sotto il titolo è l'unica descrizione che si concede: una frase, per chi apre il file senza sapere cos'è il progetto. Non di più.

Poi committalo, per lo stesso motivo del passo 2: fra poco guardi cosa ha fatto Claude, e il `CLAUDE.md` non deve stare in mezzo.

```bash
git add CLAUDE.md
git commit -m "docs: i cinque file e le convenzioni"
```

**Verifica**

- [ ] `CLAUDE.md` ha le sezioni «I cinque file da toccare», «Convenzioni» e «Non fare mai»
- [ ] è sotto le quaranta righe
- [ ] committato: `git status` è pulito

---

## Fai costruire la libreria

Riavvia `claude` (`/exit`, poi `claude`), così rilegge il `CLAUDE.md`. Poi un prompt solo — lungo, perché sta descrivendo un progetto:

**Prompt:**

```
Trasforma questo progetto in una piccola libreria di componenti con una vetrina.
Le convenzioni e i cinque file sono in @CLAUDE.md: seguili alla lettera.

Crea tre componenti in src/components/, ognuno con .tsx, .css e .example.tsx:
- Badge, con prop tone: "neutral" | "success" | "warning"
- Button, con prop variant: "primary" | "secondary" e size: "sm" | "md"
- Stack, con prop direction: "row" | "column" e gap: "sm" | "md" | "lg"
Il contenuto arriva sempre da children. Ogni .example.tsx mostra tutte le varianti.

src/components/index.ts esporta ogni componente e il suo tipo di props.

src/App.tsx diventa la vetrina: un array COMPONENTI di oggetti { nome, descrizione, esempio },
e un rendering a schede con titolo, descrizione e l'esempio. Togli il Greeting del
passo precedente: non serve più. Metti lo stile della vetrina in App.css.

docs/componenti.md: una tabella con nome, descrizione e props di ogni componente.

In package.json aggiungi lo script "check": "tsc -b && npm run lint" (lo script lint c'è già).

Niente dipendenze nuove. Non toccare src/main.tsx.
```

**Controlla il lavoro eseguito**

Mentre lavora guarda i file che crea: dovrebbero essere esattamente quelli della lista, tre volte, più `index.ts`, `App.tsx`, `App.css` e `docs/componenti.md`.

Quando ha finito, in un altro terminale:

```bash
npm run check
```

Se è rosso, incolla l'errore a Claude e fallo sistemare. Poi guarda il browser: la vetrina con `Badge`, `Button` e `Stack`, ognuno con le sue varianti.

Apri `src/components/Badge/Badge.tsx` e guarda cosa **non** c'è dentro: nessuna chiamata di rete, nessuno stato, nessuna decisione che non sia «come si mostra un badge». Riceve props e rende markup.

**Preview**
Apri http://localhost:5173/ e vedrai la preview dei componenti

Se qualcosa non ti convince — un nome, un colore, la forma della vetrina — chiedi la modifica adesso. È il tuo progetto.

Poi salva:

```bash
git add -A
git commit -m "feat: libreria di componenti con vetrina"
```

**Verifica**

- [ ] la vetrina mostra tre componenti, ognuno con più varianti
- [ ] `npm run check` passa
- [ ] `src/components/Badge/` contiene `Badge.tsx`, `Badge.css`, `Badge.example.tsx`
- [ ] `git status` è pulito — serve fra poco, perché adesso Claude scrive componenti che poi butti via con git

---

## Guarda Claude rispettare regole che non gli hai detto

Adesso la parte che conta. Chiedi, esattamente così:

> Aggiungi un componente Spinner alla libreria.

Una riga, nessun dettaglio. Quando ha finito, apri i file che ha scritto e controlla queste quattro cose. **Nessuna delle quattro era nella tua richiesta:**

| Dove guardare | Cosa trovi |
|---|---|
| `src/components/Spinner/Spinner.tsx` | `export function Spinner`, non `export default` |
| lo stesso file | una `interface SpinnerProps` esportata |
| `src/components/Spinner/Spinner.css` | classi `ui-spinner…`, e nel `.tsx` nessuno `style={{` |
| i file toccati | tutti e cinque quelli di `CLAUDE.md`, `src/components/index.ts` compreso |

Tre di queste quattro stanno in «Convenzioni», quasi parola per parola. La quarta sta in «I cinque file da toccare».

È tutto qui il meccanismo: **quello che è scritto in `CLAUDE.md`, Claude lo fa senza che tu lo chieda.** Non serve nessun'altra configurazione.

Lo `Spinner` ha finito il suo lavoro. **Prima di buttarlo, riguardalo un'ultima volta**: dentro ci sono anche decisioni che Claude ha preso da solo, perché nessuno gliele aveva scritte — come si passa il contenuto, quali default hanno le props, cosa mostra l'esempio. Segnati quella che avresti voluto decidere tu: ti serve fra due sezioni.

Poi buttalo:

```bash
git checkout . && git clean -fd
```

---

## TIP: Cosa rende una regola una regola

Rileggi le sette righe di «Convenzioni» e fai caso a come sono scritte. Nessuna dice «scrivi bene»: ognuna descrive una cosa precisa che nel codice o c'è o non c'è.

È questa la differenza tra una regola che Claude rispetta e una che ignora:

**Esempi di regole che non servono a niente:**

- Scrivi codice pulito
- Tipizza bene
- Segui le best practice

**Esempi di regole che funzionano:**

- Export nominali, mai `default`
- Le props stanno in una `interface <Nome>Props` esportata
- Lo stile sta in `<Nome>.css`, niente `style` inline

I due elenchi vogliono dire più o meno la stessa cosa. Il secondo però si può **verificare**: apri il codice di un componente e in dieci secondi sai se la regola è rispettata. C'è un `export default`? Sì oppure no.

Il primo non si può verificare: «pulito» secondo chi? Ogni volta si apre una discussione, e Claude farà quello che a lui sembra pulito, non quello che intendevi tu.

Da qui in poi il test è sempre lo stesso: **guardando il codice, questa regola mi fa rispondere sì oppure no?** Se no, non è una regola. È un auspicio.

---

## Dove vanno le tue regole

Non in `CLAUDE.md`. Vanno nella cartella `.claude/rules/`, che adesso non esiste: la crei tu, e dentro ci metti un file `.md` per argomento. Fra poco ne crei due.

Claude carica **tutti** i file `.md` che trova in `.claude/rules/`, all'avvio di ogni sessione, e li tratta esattamente come `CLAUDE.md`: stessa priorità, nessun import da dichiarare, nessuna configurazione. Aggiungi un file e vale.

Perché non scrivere tutto in `CLAUDE.md`, allora? Perché quel file lavora meglio se resta corto: chi lo apre, persona o Claude, ci trova i cinque file e le convenzioni che valgono ovunque. Le regole più specifiche crescono col tempo, e in `.claude/rules/` le tieni **un file per argomento** senza gonfiare la mappa: `testing.md`, `naming.md`, `git.md`. Nel workshop ne scrivi due.

Un file di regole può anche valere **solo per una parte del progetto**. Basta un'intestazione in cima, tra due righe di `---`, con i percorsi a cui si applica:

```md
---
paths:
  - "src/components/**/*.tsx"
---
```

Un file così Claude non lo carica all'avvio: lo carica quando apre un file che corrisponde a uno di quei percorsi, e prima no. Le regole dei componenti restano fuori dal contesto mentre stai toccando la documentazione o la vetrina, e non occupano posto per niente.

Una cosa in più, che qui non usi ma è bene sapere: la stessa cartella esiste anche a livello personale (globale), `~/.claude/rules/`, e quello che ci metti vale in **tutti** i progetti sulla tua macchina. È il posto per le preferenze che sono tue e non del progetto.

---

## Scrivine due

Due regole, due file, tutti e due scritti **a mano nell'editor**, non con un prompt: sono una riga l'una, e il punto è che la forma la decidi tu.

### Regola 1 · `api.md`, vale in tutto il progetto

**Cosa ci va.** La decisione che ti sei segnato guardando lo `Spinner`: quella che Claude ha preso da solo e che avresti preferito trovare già scritta. Se non te ne sei segnata nessuna, scegline una di queste — sono esempi del taglio giusto, non le copiare parola per parola:

- Il contenuto passa sempre dalla prop `children`, mai da una prop `text` o `label`.
- Ogni prop opzionale ha un valore di default, dichiarato nella firma della funzione.
- Ogni file `.example.tsx` mostra tutte le varianti del componente, non una sola.

**Come si fa.** Crea la cartella e il file. Si chiama `api.md` perché le regole di questo tipo — come si passa il contenuto, come si dichiarano i default — riguardano l'API dei componenti, cioè come si usano da fuori:

```bash
mkdir -p .claude/rules
touch .claude/rules/api.md
```

Aprilo nell'editor e scrivici la tua regola in questa forma — regola in grassetto, poi mezza frase che dice perché. Questo è un esempio scritto per bene, sul primo dei tre di sopra:



```md
# API dei componenti

- **Il testo visibile di un componente arriva da `children`.** Niente prop `text`, `label` o `content` per il contenuto: si scrive `<Badge>Nuovo</Badge>`, non `<Badge text="Nuovo" />`. Così ogni componente si usa allo stesso modo, e dentro ci può stare anche altro markup.
```



Se la tua regola è un'altra, cambia la riga ma tieni la forma: una frase che guardando il codice si verifica con un sì o un no, e il perché in coda. È la stessa forma delle righe di «Convenzioni» nel `CLAUDE.md`. Niente frontmatter: questo file vale ovunque.



### Regola 2 · `ui.md`, vale solo dentro `src/components/`

**Cosa ci va.** Una regola che ha senso dentro un componente e da nessun'altra parte. Se non ti viene in mente niente, prendi questa: *l'elemento più esterno di ogni componente ha l'attributo `data-ui` con il nome del componente in minuscolo*. Non cambia il markup né lo stile, si verifica con un grep, e nel DOM dice cosa arriva dalla libreria. La forma però la scrivi tu.

**Come si fa.** Un secondo file, `.claude/rules/ui.md`, con in cima l'intestazione dei `paths` fra due righe di `---`, poi la regola nella stessa forma di prima:



```md
---
paths:
  - "src/components/**/*.tsx"
---

# Regole dei componenti

- **L'elemento più esterno di ogni componente ha `data-ui="<nome>"`**, con il nome del componente in minuscolo: `<span data-ui="badge" …>`. I file `.example.tsx` no: sono vetrina, non componenti. Serve a riconoscere nel DOM cosa arriva dalla libreria.
```




Grazie ai `paths` Claude carica questo file solo quando apre un `.tsx` dentro `src/components/`: mentre lavori sulla vetrina o sulla documentazione non è nel contesto.

**Verifica**

- [ ] `.claude/rules/ui.md` esiste, comincia con `---` e ha `paths` in cima

### Committale

Tra poco torni indietro con git un'altra volta, e le regole devono sopravvivere:

```bash
git add .claude/rules && git commit -m "docs: le mie regole"
```

---

## Provala

Riavvia `claude`, così carica le regole nuove. Poi chiedi un componente, **senza** nominarle:

> Aggiungi un componente Kbd alla libreria, per mostrare un tasto della tastiera.

Dovresti vedere qualcosa di simile:

```ts
export interface KbdProps {
  children: ReactNode
}

export function Kbd({ children }: KbdProps) {
  return <kbd className="ui-kbd">{children}</kbd>
}
```

**Verifica**

Ha rispettato le regole?
In particolar modo la regola che deve usare una classe `ui-nome-del-componente` e l'utilizzo di `children`.

Quando hai finito butta via anche il `Kbd`. Le tue regole restano, perché le hai committate:

```bash
git checkout . && git clean -fd
```

### Le regole valgono anche per il codice che c'era prima

`Badge`, `Button` e `Stack` sono nati prima delle tue due regole, quindi quasi certamente non le rispettano: una regola scritta oggi non riscrive il codice di ieri. Succede in ogni progetto vero, e la risposta è sempre la stessa — un giro di allineamento, una volta sola:

Non lo fai a mano: lo chiedi a Claude, che le regole le ha già lette. Nel terminale di Claude:

**Prompt:**

```
Allinea Badge, Button e Stack alle regole in .claude/rules/. Non cambiare altro.
```

Cosa deve succedere, se le tue regole sono quelle degli esempi: in ognuno dei tre `.tsx` l'elemento più esterno riceve `data-ui="badge"`, `data-ui="button"`, `data-ui="stack"` (regola di `ui.md`); sulla regola di `api.md` non dovrebbe toccare niente, perché i tre componenti prendono già il contenuto da `children`. Se le tue regole sono diverse, il diff è diverso — ma sempre piccolo.

Controlla che sia andata così, nel terminale dei comandi:

```bash
git diff --stat
```

Tre file, poche righe. Se ha toccato anche `App.tsx`, i `.css` o `CLAUDE.md`, ha fatto più di quanto chiesto: `git checkout .` e riprova con un prompt più stretto. Se è a posto:

```bash
npm run check
git add -A && git commit -m "refactor: componenti allineati alle regole"
```

Da qui in avanti ogni componente nuovo nasce già a norma, e quelli vecchi lo sono diventati. Al passo 5 scrivi una skill che lo controlla.

---

## Fatto

- [ ] `CLAUDE.md` ha i cinque file e le sette convenzioni
- [ ] la libreria è committata: tre componenti, vetrina, `index.ts`, `docs/componenti.md`, `npm run check`
- [ ] lo `Spinner` ha rispettato quattro cose che non gli avevi chiesto
- [ ] `.claude/rules/api.md` ha almeno una regola tua
- [ ] `.claude/rules/ui.md` ha i `paths` in cima e almeno una regola
- [ ] il `Kbd` le ha rispettate
- [ ] `Badge`, `Button` e `Stack` sono allineati alle regole, e committati

---

## Una regola o una skill?

Te lo chiederai sul tuo repo, quindi tanto vale saperlo adesso.

Una **regola** vale sempre, per qualunque cosa chiedi, e non la lanci mai: sta nel contesto di ogni sessione, quindi occupa posto e deve valerne la pena.

Una **skill** vale quando serve, per un lavoro che si ripete uguale, e porta con sé dei passi da eseguire. La faremo dopo.

## BONUS TIP: HOOKS
E c'è un terzo caso. Una regola, Claude la legge e decide di rispettarla: quasi sempre lo fa, ma resta una sua decisione. Se la frase comincia con «non deve succedere mai», non basta una regola. Serve un **hook**, un comando tuo che scatta prima dell'azione e la blocca senza chiedere niente al modello. Lo fai al passo 12, ed è corto.
