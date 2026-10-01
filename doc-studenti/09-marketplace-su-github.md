> **Passo 9 · 10 minuti · da solo**
> ← [08 · Agenti in parallelo](08-agenti-in-parallelo.md) · [indice](../README.md) · [10 · Il tuo primo plugin](10-creare-plugin-e-marketplace-locale.md) →

# Un plugin da GitHub

Le tue skill e i tuoi agenti vivono dentro **questo** progetto. Fuori da qui non esistono, e nessun altro li ha.

| Dove sta | Chi la vede |
|---|---|
| `~/.claude/skills/` | solo tu, in tutti i tuoi progetti |
| `.claude/skills/` nel repo | chi clona il repo |
| in un **plugin** | chiunque lo installi, in ogni progetto |

Un plugin è una cartella con skill e agenti dentro, e un **marketplace** è l'elenco da cui si installa. Può stare su GitHub: allora lo installa chiunque, con due comandi. In questo passo ne installi uno fatto da me. Nel prossimo ne costruisci uno tuo.

---

## Installa il plugin del workshop

Nel repo `claude-fb-marketplace-demo-workshop` (https://github.com/trainingfb/claude-fb-workshop-claudepress), c'è un marketplace già pronto con un plugin, `git`, e due skill:

| Skill | Cosa fa |
|---|---|
| `commit` | lancia check, lint o test e si ferma se falliscono, scrive il messaggio leggendo il diff, committa |
| `pr` | commit, push e pull request in draft, con una descrizione a quattro sezioni |

Hai digitato `git add -A && git commit -m "…"` una quindicina di volte da stamattina: da qui in poi lo fa `commit`, e prima controlla che il progetto sia sano.

Un marketplace su GitHub si aggiunge con l'URL del repo, o con la forma corta `utente/repo`. Nel terminale dei comandi:

In un terminale (non da Claude Code):
```bash
claude plugin marketplace add trainingfb/claude-fb-marketplace-demo-workshop --scope project
claude plugin install git@claude-fb-marketplace-demo-workshop --scope project
```

`--scope project` lo installa **per questo progetto**, e lo scrive in `.claude/settings.json`: un file che si committa. Chi clona il repo si ritrova il plugin senza fare niente — è quello che vuoi in un team, ed è il motivo per cui in aula funzionerà per tutti e tre. Senza `--scope`, il default è `user`: vale per te su tutti i progetti, e non arriva a nessun altro.

Il secondo comando si legge «il plugin `git` dal marketplace `claude-fb-marketplace-demo-workshop`». Sono i `name` scritti nei JSON del mio repo, non i nomi delle cartelle. Qui il marketplace si chiama come il repo su GitHub, ma è una scelta mia, non una regola: quello che scrivi dopo la `@` è sempre il `name` del `marketplace.json`.

Per controllare che sia andata:

```bash
claude plugin list
```

Deve mostrare `git@claude-fb-marketplace-demo-workshop`, con `Scope: project`. La lista non ha un filtro suo, e se hai già molti plugin è lunga: passala a `grep`, che tiene la riga trovata e le tre sotto (versione, scope, stato):

```bash
claude plugin list | grep -A3 "git@"                # nome intero del plugin
claude plugin list | grep -iA3 "demo-workshop"      # un pezzo del nome, maiuscole ignorate
```

---

## Usalo

Le skill di un plugin si chiamano come le tue: con una frase normale, oppure per nome con il prefisso del plugin 
* `/git:commit`
* `/git:pr`.

C'è sicuramente qualcosa da committare (verificalo con `git status`) e in caso contrario cambia qualche file (ad es. un testo o aggiungi commento).

Riavvia `claude` (oppure usa il comando `/reload-plugins`), poi:

**Prompt:**

```
/git:commit
```

Guarda cosa fa prima di committare: lancia `npm run check`, legge il diff, scrive il messaggio. Se il check fallisce si ferma, e ti dice perché.

Il comando `/git:pr` crea una pull request con un certo template.
Lo userai nel workshop successivo.

---

# Tips

## Disinstallare plugin e rimuovere il marketplace

Per rimuovere il marketplace e il plugin da Claude Code :

```bash
claude plugin uninstall git@claude-fb-marketplace-demo-workshop --scope project
claude plugin marketplace remove claude-fb-marketplace-demo-workshop --scope project
```

Poi `/reload-plugins` nella sessione aperta, o riavvia `claude`.


## Aggiornare, e togliere

Può capitare che il proprietario di una skill che hai installato la aggiorni di tanto in tanto: 
tu non vedi niente finché non tiri giù l'aggiornamento.

```bash
claude plugin marketplace update claude-fb-marketplace-demo-workshop   # scarica il catalogo nuovo
claude plugin update git@claude-fb-marketplace-demo-workshop            # aggiorna il plugin
```

Poi `/reload-plugins` nella sessione aperta, o riavvia `claude`.

Tutti e due scrivono in `.claude/settings.json`, quindi dopo c'è un diff da committare. Non farlo adesso: il plugin ti serve fino alla fine. Sappi solo dove sono i comandi.

---

## Fatto

- [ ] `claude plugin list` mostra `git@claude-fb-marketplace-demo-workshop`
- [ ] `/git:commit` è partito e ha committato
- [ ] sai cosa scrivere dopo la `@`: il `name` del `marketplace.json`
- [ ] `.claude/settings.json` esiste, con il plugin dentro, ed è committato

Adesso che hai visto com'è fatto da fuori, ne costruisci uno tuo.
