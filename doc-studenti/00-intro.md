> **Passo 0 · 3 minuti · da leggere**
> [indice](../README.md) · prossimo → [01 · Il progetto](01-il-progetto.md)

# Perché questo workshop

Claude Code sa scrivere codice. Quello che non sa è **come si lavora nel tuo progetto**: quali file si toccano, cosa non si fa mai, cosa si ripete uguale ogni volta. Questo workshop serve a insegnarglielo una volta sola, invece di ripeterglielo a ogni richiesta.

Lo fai su una piccola libreria di componenti React **che costruisci tu**, partendo da un progetto vuoto, in una decina di passi da dieci o venti minuti. Ogni passo aggiunge un pezzo, e alla fine il progetto lavora con Claude meglio di quanto faccia adesso: non perché Claude è cambiato, ma perché gli hai spiegato il progetto nel modo in cui lo capisce.

## Le quattro cose che imparerai a usare

Sono i quattro modi di dire a Claude come lavorare in un progetto. Alla fine del percorso li avrai usati tutti, e saprai quale scegliere:

| | Quando agisce | Chi decide |
|---|---|---|
| **Regola** | sempre, sta nel contesto | Claude, che la legge e la applica |
| **Skill** | quando serve, per un lavoro che si ripete | Claude dalla `description`, o tu con `/` |
| **Subagent** | per un lavoro isolato, con un contesto suo | Claude, o tu che glielo chiedi |
| **Hook** | a un evento preciso, prima o dopo un'azione | nessuno: succede |

Poi c'è il **plugin**, che non è un quinto modo: è la scatola in cui metti skill e agenti per portarli in ogni tuo repo, e per darli agli altri.

## Come si fa

In ordine, dal passo 1. Ogni passo dice in testa quanto dura e dove arrivi, e in fondo ha una lista di cose da spuntare per sapere di averlo finito. Non serve fare tutto in una volta: ogni passo chiude con un commit, e da lì riprendi.

# Da dove partiamo
Al **passo 1** crei un progetto React vuoto. Al **2** gli scrivi il `CLAUDE.md`. Al **3** Claude ci costruisce dentro una libreria di componenti, seguendo regole tue. Da lì in avanti è quello il progetto, e cresce a ogni passo: non scarichi niente, tutto quello che c'è dentro l'hai fatto tu.

Il passo 3 è quello da cui si capisce tutto il resto: guardi Claude rispettare regole che non gli hai detto, perché erano scritte in un file. Da lì in poi è sempre la stessa idea, in forme diverse.
