> **Passo 1 · 15 minuti · da solo**
> ← [00 · Perché questo workshop](00-intro.md) · [indice](../README.md) · prossimo → [02 · Configurare il progetto](02-configurare-il-progetto.md)

# Un progetto da zero, e il primo prompt

Prima di lavorare sul progetto del workshop, ne crei uno tuo, vuoto, e ci fai fare a Claude la prima cosa. Serve a due cose: verificare che sulla tua macchina tutto parta, e vedere come si comporta Claude quando gli chiedi di **togliere** codice invece di aggiungerlo.

> **È il progetto di tutto il percorso.** Si chiama `hello-workshop`, lo crei adesso in una cartella tua, e ci lavori fino all'ultimo passo: al passo 3 diventa una libreria di componenti, e da lì cresce.

---

## Passo 1 · Cosa ti serve

Quattro comandi, e devono rispondere tutti e quattro:

```bash
node -v          # 22 o superiore
npm -v           # 8 o superiore 
claude --version # 2.1.280
gh --version     # GitHub CLI (serve nei prossimi workshop, per il fork e le PR)
```

| Se manca | Cosa fare |
|---|---|
| Node | installalo da [nodejs.org](https://nodejs.org), versione LTS |
| `claude` | `npm install -g @anthropic-ai/claude-code`, poi `claude` una volta per fare login |
| `gh` | installalo da [cli.github.com](https://cli.github.com), poi `gh auth login` |

Serve anche un editor — VS Code, Cursor, WebStorm, quello che usi.

**Verifica**

- [ ] `node -v` dice 22 o superiore
- [ ] `claude --version` risponde 2.1.280
- [ ] `gh --version` risponde (serve nei prossimi workshop)

---

## Passo 2 · Crea il progetto

Mettiti nella cartella dove tieni i tuoi progetti e crea un nuovo progetto React.

```bash
npm create vite@latest hello-workshop -- --template react-ts
```

Vite ti fa due domande:

- **Use Oxlint?** → sì. È il linter, e più avanti ti serve.
- **Install with npm and start now?** → sì: equivale a `cd hello-workshop && npm install && npm run dev`. Se rispondi no, quei tre comandi li dai tu.

Apri <http://localhost:5173>: vedi la pagina di esempio di Vite, con i due loghi e il contatore che si incrementa.

> Se la porta 5173 è occupata Vite ne sceglie un'altra da solo e te la scrive nel terminale. Usa quella segnalata nel terminale.

**Poi mettilo sotto git, subito.** Vite non lo fa per te, e al passo 4 ti serve un punto di partenza da cui misurare cosa cambia. 

In un **altro** terminale, dentro `hello-workshop`:

```bash
git init
git add -A
git commit -m "progetto vuoto"
```

**Verifica**

- [ ] il progetto gira e vedi il contatore di Vite
- [ ] `git status` dice che non c'è niente da committare: il punto di partenza è salvato

---

## Passo 3 · Apri l'editor, e apri Claude

Killare il processo `npm run dev` con CTRL / CMD + C.

Accedere alla cartella del workshop con `cd hello-workshop` dal tuo editor preferito, ad esempio:

```bash
code .        # visual studio code
webstorm .    # webstorm
agy-ide .     # Antigravity
```

Da qui in avanti lavori **dentro l'editor**: ti serve l'albero dei file a sinistra, per vedere cosa cambia, e il terminale integrato (*Terminal → New Terminal*), da cui lanci Claude senza saltare da una finestra all'altra.

1. Apri un terminale dal tuo editor e avvia di nuovo `npm run dev`. 
Questo processo non dovrai mai chiuderlo per poter vedere la preview del progetto.

2. Apri un **secondo** terminale e avvia Claude Code:

```bash
claude
```

Se ti chiede se puoi fidarti del workspace, rispondi di sì.


Da qui in poi ti servono due terminali, sempre:

| | Cosa ci gira | Quanto resta aperto |
|---|---|---|
| **1** | `npm run dev` | tutto il percorso, non lo tocchi più |
| **2** | `claude` | tutto il percorso — lo riavvii solo quando un passo te lo dice |


**Verifica**

- [ ] il progetto è aperto nell'editor
- [ ] `claude` è partito e aspetta un messaggio

---

## Passo 4 · Il primo prompt

Adesso la pagina di esempio di Vite la butti via, e al suo posto ci va una riga sola. Non farlo a mano: chiedilo a Claude.

**Prompt:**

Scrivi il seguente prompt all'interno di Claude Code (puoi fare copia incolla):

```
Apri @src/App.tsx: togli tutto il contenuto di esempio di Vite — i due loghi,
il contatore, lo stato, i link — e lascia solo un <h1>Hello Workshop</h1>.

Togli gli import e le regole CSS che restano inutilizzati.
Non toccare src/main.tsx.
```

La `@` davanti al file non è decorazione: è il modo per dire a Claude *quale* file guardare, invece di lasciarglielo cercare.

**Mentre Claudelavora, guarda lo schermo invece di aspettare.** Vedi tre cose:

1. **quali file apre** — dovrebbero essere `App.tsx`, `App.css` e nient'altro
2. **il diff che propone**, in rosso e verde, prima di scrivere qualsiasi cosa
3. **la richiesta di conferma**, che tu accetti o rifiuti

Se propone di toccare file che non c'entrano, di' di no.

**Verifica**

- [ ] il browser si è ricaricato aggiornando l'applicazione che ora  mostra «Hello Workshop»
- [ ] in `src/App.tsx` non è rimasto niente della pagina di default che conteneva un contatore

---

## Passo 5 · Il terzo terminale

La pagina sembra corretta, ma non basta. Verifica ciò che hai modificato prima di pushare tutto sul repo.
Apri un terzo terminale dei comandi:

```bash
git diff --stat
```

Ti dice **quanti file ha toccato e quante righe**. Dovrebbe essere `src/App.tsx`, forse anche `src/App.css`, e quasi tutte righe tolte.

Ad esempio, un risultato simile al seguente ti dice che ha modificato un file, 1 riga inserita e 118 cancellate.
Non vedete modifiche al file `App.css` che invece, almeno nel mio caso, è stato interamente cancellato.

```bash
 1 file changed, 1 insertion(+), 118 deletions(-)
 ```

> per uscire dalla modalità `diff` premere il pulsante `Q` (quit) nel terminale.

 Qui `git diff` basta perché i file esistevano già nel commit di partenza: quando Claude ne crea di nuovi, `git diff` non li vede e serve `git status`. Lo incontri al passo dopo.
Digita `Q` (quit) per uscire.

Poi guarda il diff per intero:

```bash
git diff
```

Se trova roba che non ti aspettavi, adesempio un `main.tsx` modificato, un file di configurazione ecc, quello è il momento per accorgersene, non  fra N giorni.

> **È la sola abitudine che ti porti dietro per tutto il percorso.** Claude sbaglia come sbaglia un collega veloce: raramente, ma mai dove guardi. Il `git diff` richiede cinque secondi ed è utilissimo.

Se il diff ti convince, salvalo:

```bash
git add -A
git commit -m "hello workshop"
```

**Verifica**

- [ ] `git diff --stat` mostra `App.tsx`, al massimo anche `App.css`, e nient'altro
- [ ] hai letto il diff prima di committare
- [ ] il commit c'è

---

## Fatto

- [ ] Node e `claude` rispondono sulla tua macchina
- [ ] `hello-workshop` gira e mostra «Hello Workshop»
- [ ] hai visto il diff prima di accettarlo
- [ ] il lavoro è committato

Al passo dopo resti qui: adesso gli scrivi le regole. Avanti: [`02-configurare-il-progetto.md`](02-configurare-il-progetto.md).
