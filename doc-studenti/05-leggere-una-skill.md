> **Passo 5 · 20 minuti · da solo**
> ← [04 · Plan mode](04-plan-mode.md) · [indice](../README.md) · [06 · La tua skill](06-la-tua-skill.md) →

# Leggere una skill

Una skill è una cartella con dentro un `SKILL.md`. Nient'altro.

```
.claude/skills/nome-della-skill/SKILL.md
```

E dentro, nella sua forma più semplice, troverai una struttura simile.
(non serve che tu la faccia davvero ma dagli un'occhiata)

```markdown
---
name: check
description: Lancia typecheck e lint e riporta gli errori senza correggerli. Usala prima di un commit. Trigger: fai il check, è tutto verde, controlla che compili.
---

# Il progetto compila?

1. Lancia `npm run check`.
2. Se è rosso, riporta ogni errore come `file:riga — messaggio`.
3. Non correggere niente: chi ha scritto il codice decide.
```



Un frontmatter con due campi e tre passi. Tutto qui. Questa è solo per far vedere la forma: le due che scrivi adesso fanno di più.

Tre cose da sapere, e la seconda è quella che sbagliano tutti:

1. **La cartella dà il nome** alla skill.
2. **La `description` decide quando parte.** Non le istruzioni: la description. Se una skill non si attiva mai, il problema è sempre lì.
3. **Le istruzioni sono passi concreti su questa codebase**, con nomi di file veri, non consigli generici.

In questo passo ne fai scrivere due a Claude, e le leggi. Al passo dopo ne scrivi una tu.

---

## La prima skill: `new-component`

Al passo 3 hai chiesto due volte «aggiungi un componente», e due volte Claude ha dovuto rileggere `CLAUDE.md`, ritrovare i cinque file, decidere l'ordine. È un lavoro che si ripete uguale: è una skill.

**Soluzione / Prompt:**

Non serve scrivere a mano skills, regole o agenti. Puoi chiedere a Claude farlo (e successivamente rifinirle qualora non andassero bene).

Ad esempio, apri Claude, e chiedigli di creare la seguente skill:

```
Scrivi .claude/skills/new-component/SKILL.md: una skill che aggiunge un
componente alla libreria.

Frontmatter: name, description e allowed-tools (Read, Write, Edit, Glob, Bash(npm run:*)).
La description dice QUANDO usarla, con le frasi che direi io: "crea un componente",
"nuovo componente", "mi serve un componente", "aggiungi alla libreria".

Le istruzioni sono una procedura numerata sui cinque file di @CLAUDE.md, un
passo per file, con i percorsi veri di questo progetto e un componente già
esistente come modello.
Chiude lanciando npm run check e riportando il risultato.

Dice anche cosa non fare: non toccare gli altri componenti, non aggiungere
dipendenze, non far scoprire gli esempi in automatico.

Massimo quaranta righe. Procedura, non descrizione.
```

> **Cos'è `allowed-tools`.** È l'elenco degli strumenti che Claude può usare **senza chiederti il permesso** mentre la skill gira. Ogni voce è uno strumento di Claude Code: `Read` legge un file, `Write` ne crea uno, `Edit` lo modifica, `Glob` cerca file per nome, `Grep` cerca testo dentro i file, `Bash` esegue comandi. `Bash(npm run:*)` vuol dire «comandi da terminale, ma solo quelli che cominciano con `npm run`» — è la stessa sintassi dei permessi in `settings.json`.
>
> È un'autorizzazione, non un muro: uno strumento fuori dalla lista Claude può ancora usarlo, ma deve chiedertelo. Per questo `check-convenzioni`, che farei subito dopo, non avrà né `Write` né `Edit`: deve guardare e riferire, e se provasse a sistemare qualcosa ti comparirebbe una richiesta di permesso — il segnale che sta uscendo dal suo compito. Il muro vero lo incontri al passo 7, con `tools:` di un subagent.

Ad ogni modo apri la skill appena creata in `.claude/skills/new-component/SKILL.md`  e leggila tutta.
 Poi **fermati sul frontmatter in cima** e rileggi la `description` ad alta voce.

Nota che dice **quando** usarla e con quali parole. 
E nota che elenca delle frasi vere, quelle che una persona scriverebbe davvero. Se Claude ha scritto una description che descrive la skill invece di dire quando parte, correggila tu: è la riga che conta di più.

### Provala sul serio

Le skill si caricano all'avvio: riavvia `claude` oppure usando il comando `/reload-skills`.
Poi scrivi una frase normale:

**Prompt**
```bash
Mi serve un componente Avatar nella libreria
```

**Non scrivere `/new-component`.** Il punto è vedere se parte da sola.

All'inizio delle operazioni di Claude dovresti vedere qualcosa di simile:
🟢 Skill(new-component)  


Guarda il report di CLaude per capire cosa ha fatto: dovrebbe aver creato il nuovo componente Avatar e modificato i file `index.ts`, `App.tsx`, `docs/componenti.md` come stabilito dalla skill.

Se non è partita, il problema è la `description`. Riscrivila, riavvia, riprova.

---

## Invocare una skill

La frase normale è il modo in cui la userai il più delle volte, ma una skill si può anche lanciare **esplicitamente**, con il nome della cartella preceduto da `/`. Provalo su un secondo componente:

```
/new-component Tooltip
```

Il risultato è simile al precedente.
 
Cambia solo chi decide che la skill parte — prima Claude, dalla `description`; adesso tu. 
Usa la `/` quando sai già cosa vuoi e non vuoi lasciare margine: è più veloce e non dipende da come è scritta la `description`.

> Digitando `/` in Claude Code compare l'elenco di tutte le skill disponibili, con la loro `description`: è il modo più rapido per vedere cosa c'è nel progetto.

La skill resta, `Avatar` e `Tooltip` no: **Prima** committa la skill, **poi** butta via il resto — nell'ordine inverso `git clean` cancellerebbe anche la skill, che git non conosce ancora:

```bash
git add .claude/skills && git commit -m "chore: skill new-component"
git checkout . && git clean -fd
```

**Verifica**

- [ ] `.claude/skills/new-component/SKILL.md` esiste ed è sotto le quaranta righe
- [ ] la `description` contiene frasi che diresti tu
- [ ] è partita da sola, senza `/`
- [ ] l'hai lanciata anche con `/new-component`
- [ ] committata

---

## La seconda skill, e la progressive disclosure

La seconda serve a **controllare** un componente prima di committarlo: _ha creato il componente e ha modificato i file corretti? Le convenzioni sono rispettate?_

Questa skill però ha una forma diversa: **due file** nella stessa cartella.

 `SKILL.md` resta corto, e i dettagli dei controlli stanno in `regole.md`, che Claude carica solo quando arriva al passo che lo cita. È il modo di tenere una skill leggera senza tenerla superficiale: si chiama *progressive disclosure*.

**Soluzione / Prompt:**

Copia tutto e invia il prompt a Claude:

```
Scrivi la skill .claude/skills/check-convenzioni/ in DUE file.

SKILL.md, massimo trenta righe:
- frontmatter con name, description e allowed-tools (Read, Grep, Glob, Bash(npm run:*))
- description con i trigger: "controlla le convenzioni", "questo componente è a posto",
  "posso committare il componente", "cosa manca a"
- tre passi: (1) per ogni componente in src/components/ verifica i cinque file,
  leggendo l'elenco preciso da regole.md; (2) verifica le convenzioni di CLAUDE.md
  E le regole in .claude/rules/*.md, sempre da regole.md; (3) lancia npm run check
  e riporta l'errore così com'è
- cosa non fare: non sistemare niente, solo riferire; non fermarsi al primo problema
- output: una riga per componente (nome, ✅ o ⚠️ con cosa manca), poi per ogni
  problema file:riga, la regola violata, come si sistema. Chiude con "committabile"
  oppure "da sistemare prima".

regole.md, senza frontmatter:
- una tabella dei cinque file di @CLAUDE.md con, per ognuno, cosa deve esserci
  dentro (nome dell'export, la voce in COMPONENTI, la riga nella tabella...)
- una tabella delle sette convenzioni con, per ognuna, come si verifica leggendo
  il file (cosa cercare con grep)
- una terza tabella con le regole di .claude/rules/api.md e .claude/rules/ui.md,
  stessa forma: regola, come si verifica
```

Aprila. Guarda quanto è corto `SKILL.md`, e dove rimanda a `regole.md`. Quella riga è la progressive disclosure: il file grosso non entra nel contesto finché non serve.

### Cosa devi ritrovarci

I tuoi due file non saranno uguali a quelli di nessun altro: non c'è una versione giusta da confrontare. Ci sono però cinque cose che devono esserci, e se una manca la chiedi a Claude prima di andare avanti.

| Dove | Cosa cerchi |
|---|---|
| `SKILL.md`, frontmatter | `allowed-tools` **senza** `Write` né `Edit`: questa skill guarda e riferisce, non ripara |
| `SKILL.md`, frontmatter | nella `description` almeno una frase che diresti tu, tipo «posso committare il componente» |
| `SKILL.md`, istruzioni | un rimando esplicito a `regole.md` — è quello che tiene corto il file |
| `SKILL.md`, in fondo | l'output con **committabile** / **da sistemare prima**, così la risposta è una riga e non un saggio |
| `regole.md` | tre tabelle: i cinque file, le sette convenzioni, le regole di `.claude/rules/` |

Due file nella stessa cartella: il primo corto, il secondo con i dettagli. È la progressive disclosure. 

Committala:

```bash
git add .claude/skills && git commit -m "chore: skill check-convenzioni"
```

---

### Provala su un componente a metà

Per provare questa skill serve qualcosa di rotto. In ogni repo vero c'è un componente che qualcuno ha cominciato e non ha finito: fattene uno.

**Prompt:**

Apri Claude e crea volutamente un componente "rotto":

```
Crea il componente Callout, un riquadro di avviso con prop title e
tone: "info" | "warning", contenuto da children.

Crea SOLO Callout.tsx, Callout.css e l'export in src/components/index.ts.
NON creare l'esempio, NON registrarlo in App.tsx, NON toccare docs/componenti.md:
lo voglio incompleto di proposito.
```

Committalo così com'è: è il tuo componente rotto, e ti serve anche al passo dopo.

```bash
git add -A && git commit -m "feat: Callout, incompleto di proposito"
```

Adesso riavvia `claude` e prova la skill con una frase normale:

> controlla se i componenti rispettano le convenzioni

Riceverai un'analisi relativamente dettagliata ma soprattutto dovresti vedere un report component per componente in un formato simile (come richiesto dalla skill):

```bash
Ho controllato tutti e quattro i componenti: tre sono a posto, a Callout mancano tre dei cinque file.

  - Badge ✅
  - Button ✅
  - Stack ✅
  - Callout ⚠️  manca l'esempio, la registrazione in vetrina e la riga nella documentazione
```

> **IMPORTANTE: NON FIXARE I PROBLEMI**. Ne parliamo al prossimo step.


### Conclusione

Il report sarà **più lungo di quanto ti aspetti**, ed è normale: la skill passa tutti i componenti contro tutte le regole, e chiude con un verdetto solo. Dentro ci trovi tre tipi di cose:

- **Quello che cerchi:** a `Callout` mancano l'esempio, la voce in `COMPONENTI` e la riga in `docs/componenti.md`. Sono i tre file che hai saltato apposta. **Segnati cosa manca**: è l'esercizio del passo prossimo.

- **Quello che non ti aspettavi:** se al passo 3 hai saltato l'allineamento, o hai scritto una regola più stretta di quanto pensavi, `Badge`, `Button` e `Stack` compaiono anche loro. Non è un errore della skill: è la regola che sta facendo il suo lavoro. Se ti sembra giusta, allinea i componenti; se ti sembra sbagliata, riscrivi la regola. Una regola che segnala cose che non ti interessano è una regola da stringere.
- **Una domanda per te:** a volte la skill si ferma su un caso limite e non decide — per esempio la prop `title` di `Callout`, che è testo visibile passato come prop mentre `api.md` dice «il contenuto arriva da `children`». Sta a te: qui `title` è un titolo, non il contenuto, e va bene così. Ma è il segno che la regola potrebbe dirlo esplicitamente.

Quello che **non** deve fare è toccare i file: ha `Read`, `Grep` e `Glob`, non `Write`. Se il verdetto è «da sistemare prima» e i file sono intatti, ha fatto esattamente il suo lavoro.

**Verifica**

- [ ] `.claude/skills/check-convenzioni/` ha due file, `SKILL.md` e `regole.md`
- [ ] `SKILL.md` è sotto le trenta righe e rimanda a `regole.md`
- [ ] `Callout` è committato, incompleto
- [ ] la skill è partita da una frase normale e ha segnalato cosa manca a `Callout`
- [ ] non ha modificato nessun file: `git status` mostra solo quello che c'era prima

---

## Fatto

- [ ] due skill in `.claude/skills/`, tutte e due committate
- [ ] tutte e due partono da una frase normale
- [ ] hai capito perché `check-convenzioni` è in due file e `new-component` in uno
- [ ] `Callout` è nel repo, a metà, e sai cosa gli manca
