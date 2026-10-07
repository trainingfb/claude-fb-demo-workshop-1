> **Passo 2 · 15 minuti · da solo**
> ← [01 · Il progetto](01-il-progetto.md) · [indice](../README.md) · prossimo → [03 · Le regole](03-le-regole.md)

# Configurare il progetto: il `CLAUDE.md`

Al passo prima hai dovuto scrivere «non toccare `src/main.tsx`» dentro il prompt. Se non lo scrivevi, poteva toccarlo. E se domani gli chiedi un'altra modifica, devi riscriverlo di nuovo.

Il `CLAUDE.md` serve esattamente a questo: è un file che Claude legge **da solo**, all'inizio di ogni sessione aperta in quella cartella. Quello che c'è scritto lì vale per tutti i messaggi, senza che tu lo ripeta.

Restiamo su `hello-workshop`, lo stesso progetto del passo prima.

---

## Passo 1 · Fallo scrivere a Claude

Nel terminale dove gira `claude`:

Cancella lo storico della sessione corrente:

```
/clear
```

E poi digita il comando `init`:

```
/init
```

Claude legge il progetto — `package.json`, la struttura delle cartelle, gli script — e scrive un `CLAUDE.md` alla radice.

Aprilo e leggilo tutto. Ci mette trenta secondi.

**Verifica**

- [ ] il file `CLAUDE.md` esiste nella radice del progetto
- [ ] l'hai letto

---

## Passo 2 · Adesso togli

Quello che ha scritto `/init` è un **punto di partenza, non un risultato**. È quasi sempre troppo lungo, e la maggior parte è descrizione del progetto: com'è fatto, cosa contiene, quali script ci sono.

Quella roba **non serve**. Claude il progetto lo sa già leggere: gli bastano i file. Il `CLAUDE.md` non è la documentazione del progetto.

> ### La regola che vale per tutto il resto del percorso
>
> Nel `CLAUDE.md` ci vanno solo **le cose che Claude non può dedurre guardando il codice**, e che se non gli dici sbaglia.
>
> In pratica tre categorie:
>
> | | Esempio |
> |---|---|
> | **Regole** — come si fa qui | «i componenti stanno in `src/components/`, uno per file» |
> | **Divieti** — cosa non si fa mai | «non modificare `src/main.tsx`» |
> | **Forzature** — decisioni già prese, non ridiscutibili | «niente librerie di UI, si scrive a mano» |
>
> Tutto il resto è rumore. E il rumore costa: più il file è lungo, meno peso ha ogni singola riga, e più è probabile che quella che ti serviva venga ignorata.

### Cosa tagliare

Apri `CLAUDE.md` nell'editor e cancella, riga per riga, tutto quello che rientra in queste categorie:

| Via | Perché |
|---|---|
| «Questo è un progetto React con Vite e TypeScript» | lo vede dal `package.json` |
| l'elenco delle cartelle e cosa contengono | lo vede da solo |
| «per avviare: `npm run dev`», «per il lint: `npm run lint`» | sono già negli script |
| «scrivi codice pulito e leggibile», «segui le best practice» | non vuol dire niente, quindi non cambia niente |
| la spiegazione di cosa fa React, Vite o TypeScript | lo sa meglio di te |

Per ogni riga che resta fatti la domanda: *se la cancello, Claude sbaglia qualcosa?* Se la risposta è no, cancella anche quella.

Alla fine del taglio resta poco o niente. **È giusto così**: quello che serve lo scrivi adesso.

### Cosa scrivere

Le regole si scrivono all'imperativo e al presente — «i componenti stanno in», non «si dovrebbe cercare di mettere». Una regola scritta come un consiglio viene trattata come un consiglio.

Sono tre gruppi: come si fa qui, cosa non si fa mai, cosa è già deciso. Scrivi le tue, oppure parti da questa e adattala.

### Soluzione

Sostituisci **tutto** il contenuto di `CLAUDE.md` con questo. Sono sei righe di regole, e sono tutte e sei della forma «altrimenti sbaglia». Le intestazioni «Regole» e «Non fare mai» tienile come sono: al passo 3 ci si aggancia.

```markdown
# hello-workshop

## Regole

- I componenti stanno in `src/components/`, uno per file, con lo stesso nome del file.
- Ogni componente esporta anche il tipo delle sue props.
- Niente `any`: se un tipo non torna, sistemalo, non zittirlo.

## Non fare mai

- Non modificare `src/main.tsx`.
- Non aggiungere dipendenze senza chiedere prima.
- Non installare librerie di componenti: la UI si scrive a mano.
```



Quando ti convince, **committalo**. Serve adesso: al passo dopo guardi `git status` per vedere cosa ha fatto Claude, e il `CLAUDE.md` non deve mescolarsi con quel risultato.

```bash
git add CLAUDE.md
git commit -m "docs: regole di progetto"
```

**Verifica**

- [ ] il `CLAUDE.md` è sotto le venti righe
- [ ] non contiene nessuna descrizione del progetto
- [ ] ogni riga risponde sì alla domanda «se la tolgo, sbaglia?»
- [ ] committato: `git status` è pulito

---

## Passo 3 · Provalo

Una regola scritta e mai verificata è una regola che non sai se funziona.

Chiudi Claude (`/exit`) e riaprilo digitando `claude` nel terminale: 
il `CLAUDE.md` lo rilegge all'avvio.

**Prompt** — nota quello che **non** stai dicendo: né dove va il file, né come si scrive:

```
Aggiungi un componente Greeting che riceve una prop name e mostra
"Ciao, {name}". Usalo in App.tsx al posto dell'h1.
```

Adesso controlla, ed è qui che si capisce se le regole funzionano:

```bash
git status --short -u
```

### Result
M src/App.tsx
?? src/components/Greeting.tsx

Ti aspetti due righe: `?? src/components/Greeting.tsx` (file nuovo) e ` M src/App.tsx` (modificato). Il `-u` serve a vedere il file dentro la cartella nuova: senza, git ti mostra solo `?? src/components/`. Se compare anche `?? CLAUDE.md`, ti sei perso il commit del passo 2: fallo adesso e ricontrolla. Serve `git status` e non `git diff`, perché `git diff` mostra solo i file che git già conosce: il `Greeting.tsx` appena creato non ci comparirebbe, e vedresti solo le tre righe cambiate in `App.tsx`.

```bash
git add -A
git commit -m "feat: Greeting"
```

**Verifica**

- [ ] il componente è finito dove dice il `CLAUDE.md`
- [ ] `main.tsx` è intatto
- [ ] committato

---

## Fatto

- [ ] `hello-workshop` ha un `CLAUDE.md` corto, fatto di regole, divieti e forzature
- [ ] l'hai verificato con un prompt che non ripeteva le regole
- [ ] hai committato
- [ ] sai rispondere alla domanda «se tolgo questa riga, Claude sbaglia?» per ogni riga del file

Avanti: [`03-le-regole.md`](03-le-regole.md).


