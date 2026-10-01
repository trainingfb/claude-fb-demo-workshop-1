# Workshop 1 — Le basi di Claude Code

Un percorso da fare **da solo**, con i tuoi tempi, durante il primo workshop in aula.

Alla fine saprai scrivere le regole di un progetto, costruire una skill che
parte quando serve, delegare a un subagent, lanciarne due in parallelo, e
impacchettare tutto in un plugin da usare in ogni tuo repo, e imporre con un
hook le cose che non devono succedere mai.

In aula si parte da lì. Il **workshop 2** è una simulazione di lavoro in team di
due ore su una codebase vera, e lì il tempo si spende a consegnare, non a
spiegare le fondamenta.

## Prima di cominciare

Non c'è niente da scaricare. Il progetto lo crei tu al passo 1, da zero, con
Vite; al passo 3 Claude ci costruisce dentro una piccola libreria di
componenti, e da lì in avanti tutto quello che c'è dentro l'hai fatto tu.

Ti servono **Node 20 o superiore** e **Claude Code** installato (`npm install
-g @anthropic-ai/claude-code`, poi `claude` una volta per fare login). Il
passo 1 lo verifica.

> **Resta su Sonnet.** Tutti gli esercizi sono tarati per finire in fretta e
> non ti serve altro. Se bruci i limiti di utilizzo qui, arrivi in aula senza.

## Il percorso

| # | Passo | Durata | |
|---|---|---|---|
| 0 | Perché questo workshop | 3′ | [00-intro.md](esercizi/00-intro.md) |
| 1 | Il progetto, e il primo prompt | 15′ | [01-il-progetto.md](esercizi/01-il-progetto.md) |
| 2 | Configurare il progetto: il `CLAUDE.md` | 15′ | [02-configurare-il-progetto.md](esercizi/02-configurare-il-progetto.md) |
| 3 | Le regole del progetto | 25′ | [03-le-regole.md](esercizi/03-le-regole.md) |
| 4 | Pensare prima di scrivere | 10′ | [04-plan-mode.md](esercizi/04-plan-mode.md) |
| 5 | Leggere una skill | 20′ | [05-leggere-una-skill.md](esercizi/05-leggere-una-skill.md) |
| 6 | La tua prima skill | 15′ | [06-la-tua-skill.md](esercizi/06-la-tua-skill.md) |
| 7 | Il tuo primo subagent | 20′ | [07-il-tuo-agente.md](esercizi/07-il-tuo-agente.md) |
| 8 | Due agenti in parallelo | 10′ | [08-agenti-in-parallelo.md](esercizi/08-agenti-in-parallelo.md) |
| 9 | Un plugin da GitHub | 10′ | [09-marketplace-su-github.md](esercizi/09-marketplace-su-github.md) |
| 10 | Il tuo primo plugin | 15′ | [10-creare-plugin-e-marketplace-locale.md](esercizi/10-creare-plugin-e-marketplace-locale.md) |
| 11 | Il plugin su GitHub (facoltativo) | 15′ | [11-plugin-su-github.md](esercizi/11-plugin-su-github.md) |
| 12 | Un hook che non si può ignorare | 10′ | [12-gli-hook.md](esercizi/12-gli-hook.md) |

Falli in ordine: ognuno dà per scontato quello che hai fatto nel precedente.

Il passo 8 può finire male, ed è previsto. Non è un errore tuo.

## Come sai di aver finito un passo

Ogni passo finisce con una lista **Fatto**: caselle da spuntare, e un commit.
Se le caselle sono tutte spuntate e `git status` è pulito, il passo è chiuso.

La casella che conta di più è sempre la stessa: le tue skill e i tuoi agenti
**partono da soli** quando scrivi una frase normale, senza digitare il nome.
Non c'è modo di verificarla se non provandola, e ogni passo te lo fa fare.

## Se ti blocchi

Nessun passo dovrebbe portarti via più di dieci minuti oltre la sua durata.

Se sfori, **scrivimi**: sono raggiungibile mentre lo fate. Dimmi a quale passo
sei e incolla quello che vedi.

Se non rispondo subito, salta al passo dopo e segnati dove ti sei arenato: in
aula c'è tempo per riprenderlo, e sapere dove ti sei bloccato è già metà del
lavoro.


# Riassunto Requisiti

Di seguito i requisiti per il workshop Claude della prossima settimana.

1. Il partecipante deve utilizzare il proprio laptop con la possibilità di utilizzare i seguenti strumenti:

```bash
node -v          # 22 o superiore, megloi 
npm -v           # 8 o superiore 
claude --version # 2.1.280
gh --version     # GitHub CLI 
```

Nel caso mancasse qualche tool:

- Node e npm: installazione da (https://nodejs.org, versione LTS oppure usare Version Managers come NVM.
- `claude`: `npm install -g @anthropic-ai/claude-code`, poi `claude` una volta per fare login 
- `gh`: si puo scaricare da https://cli.github.com, e autenticazione tramite `gh auth login` 

Dopo aver effettuato l'installazione riprovare i comandi precedenti.


2. Il partecipante deve avere la possibilità di creare e forkare repository su GitHub.
Quindi ogni studente dovrebbe avere un proprio account GitHub con cui poter avviare comandi come clone, push e PR.

3. Dovrà installare pacchetti da NPM 

4. Deve avere un editor / IDE installato, ad esempio Visual Studio Code o Antigravity

5. Abbonamento (o simile) a Claude Code PRO: useremo modelli sonnet e opus