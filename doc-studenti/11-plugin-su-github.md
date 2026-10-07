> **Passo 11 · 15 minuti · da solo · facoltativo**
> ← [10 · Il tuo primo plugin](10-creare-plugin-e-marketplace-locale.md) · [indice](../README.md) · [12 · Un hook](12-gli-hook.md) →

# Il plugin su GitHub

Questo step è Facoltativo. 
Probabilmente non riuscirai a completarlo nelle 2 ore di worshop ma puoi provarlo nei giorni seguenti.

Questa procedura serve quando vuoi dare il tuo plugin a qualcun altro, o averlo su un altro computer senza copiare cartelle.  

> **Prima di cominciare, togli la versione locale** del passo 10: ha lo stesso `name` di quella che stai per installare da GitHub, e le due si pesterebbero i piedi.
>
> ```bash
> claude plugin uninstall dev-tools@mariorossi-plugins
> claude plugin marketplace remove mariorossi-plugins
> ```


Servono `git`, un account GitHub, e la CLI `gh` già autenticata. Per controllare quest'ultima:

```bash
gh auth status
```

Se non lo sei, `gh auth login` e segui le domande. Senza `gh` si fa lo stesso, lo vedi al punto 3.

## 1. Un repo pulito

La cartella `mariorossi-plugins/` diventa un repo a sé. La struttura non cambia: `.claude-plugin/marketplace.json` resta nella radice, che è dove Claude Code va a cercarlo.

> TIP: Prima del primo commit, creerei un file `.gitignore` con dentro almeno `.DS_Store`. Sembra una sciocchezza, ma i file finiscono nel repo e poi lo vedono tutti quelli che lo installano. Poi:

```bash
cd mariorossi-plugins
git init
git add .
git commit -m "feat: marketplace with my first plugin"
```

## 2. Valida prima di pubblicare

```bash
claude plugin validate . --strict
```

Con `--strict` fallisce anche sui dettagli che il runtime perdonerebbe, tipo un autore mancante. È quello che vuoi prima che lo installi qualcun altro, perché un errore nel JSON lo scopre chi lo installa al momento dell'`add`, non tu.

Un vincolo che scopri solo qui: il `name` del marketplace non può iniziare con `claude`. Claude Code lo rifiuta perché sembra un marketplace ufficiale. Il mio repo si chiamava inizialmente `claude-marketplace-workshop` e l'ho dovuto rinominare.

## 3. Crea il repo su GitHub e collegalo

Da CLI, un comando solo, dalla cartella del repo:

```bash
gh repo create mariorossi-plugins --public --source=. --remote=origin
```

Crea il repo remoto e aggiunge `origin` al repo locale. Non pusha ancora.

### Alternativa: via interfaccia web

Se preferisci farlo dal sito, crea il repo `mariorossi-plugins` vuoto da github.com, **senza** README e senza `.gitignore` generati da GitHub, e poi:

```bash
git remote add origin git@github.com:<tuo-utente>/mariorossi-plugins.git
```

> **Repo privato o pubblico?** Il repo può essere Pubblico ed è la scelta più semplice per iniziare: chi lo installa non ha bisogno di credenziali. Può essere anche privato, Claude Code usa le credenziali git che hai già, ma allora ogni persona che lo installa deve avere accesso al repo. Se usi HTTPS e non SSH, prima lancia `gh auth setup-git`, una volta sola.

## 4. Pusha

```bash
git push -u origin main
```

Se il tuo branch si chiama `master` invece di `main`, o lo rinomini prima con `git branch -M main`, o pushi `master`. Claude Code non ha preferenze: usa il branch di default del repo.

## 5. Provalo dal remoto, non dal percorso locale

Il test onesto è installarlo come farebbe un altro: dal repo, non dalla cartella. La versione locale l'hai già tolta all'inizio; se non l'hai fatto, fallo adesso con i due comandi in cima alla pagina. Poi:

```bash
claude plugin marketplace add <tuo-utente>/mariorossi-plugins
claude plugin install dev-tools@mariorossi-plugins
claude plugin list | grep -A3 "dev-tools@"
```

Se `dev-tools@mariorossi-plugins` compare in lista e la fonte del marketplace è GitHub, il repo è a posto. Poi apri Claude Code in un altro progetto e chiedi quanti file ci sono.

## 6. Verifica che il ciclo di aggiornamento funzioni

Quando cambi una skill, committa e pusha. Un push non arriva a nessuno finché non lo tira giù. Fallo tu per primo:

```bash
claude plugin marketplace update mariorossi-plugins
claude plugin update dev-tools@mariorossi-plugins
```

Poi `/reload-plugins` nella sessione aperta, o riavvia Claude Code. Se non segnala errori, il giro push → update funziona. È la stessa cosa che farai con il mio plugin quando lo aggiorno: lì il repo è il mio, qui è il tuo.

---


## Fatto

- [ ] il repo `mariorossi-plugins` è su GitHub, con `.claude-plugin/marketplace.json` nella radice
- [ ] `claude plugin list` mostra `dev-tools@mariorossi-plugins` con fonte GitHub, non il percorso locale
- [ ] il giro push → `marketplace update` → `plugin update` funziona
