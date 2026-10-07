> **Passo 6 · 15 minuti · da solo**
> ← [05 · La tua prima skill: check-conventions](05-la-tua-prima-skill-check-conventions.md) · [indice](../README.md) · [07 · Il tuo agente](07-il-tuo-agente.md) →

# La skill fix-conventions

`check-conventions` trova cosa manca e si ferma. Adesso scrivi la skill che **sistema**: `fix-conventions`. 
Accetta il nome di un componente; senza, passa tutta la libreria.

```
/fix-conventions Callout    → sistema solo Callout
/fix-conventions            → passa tutti i componenti in src/components/
```

---

## 1. Scrivi la skill

Chiedi a Claude `.claude/skills/fix-conventions/SKILL.md`, massimo cinquanta righe, modello `@.claude/skills/new-component/SKILL.md`. Il goal è chiedere quanto segue:

1. **quando** parte — la `description`, con le frasi che diresti tu
2. **cosa controlla** — rilegge `regole.md` di `check-conventions`: una fonte per le due skill
3. **l'argomento** — `$ARGUMENTS` è il componente da sistemare; vuoto = tutto `src/components/`
4. **cosa non fa** — crea file e registrazioni mancanti, **non cambia props né elemento esterno**; se servirebbe, si ferma e chiede
5. **come chiude** — `npm run check` e una riga per file toccato

Il punto 4 è quello che conta: al passo 5 hai visto proporre un `div` attorno a `Badge`. Una skill che ripara senza confine rompe più di quanto sistema.


### Soluzione

Un prompt che copre le 5 casistiche precedenti:

```
Scrivi .claude/skills/fix-conventions/SKILL.md, modello @.claude/skills/new-component/SKILL.md,
massimo cinquanta righe.

Sistema un componente che non rispetta i cinque file, le convenzioni o le regole.
Trigger nella description: "sistema Callout", "completa il componente",
"metti a posto le convenzioni", "allinea la libreria".

Il perimetro è $ARGUMENTS: un componente o una cartella; se vuoto, tutto src/components/.

Cosa controllare lo legge da .claude/skills/check-conventions/regole.md, non lo ripete.

Cosa fa: crea l'esempio mancante sul modello degli altri .example.tsx già presenti, aggiunge la voce in
COMPONENTI di App.tsx, la riga in docs/componenti.md, gli export in index.ts. Se una
regola chiede un attributo sull'elemento esterno lo aggiunge.

Cosa non fa: non cambia le props né l'elemento esterno di un componente (se servirebbe,
si ferma e chiede), non tocca CLAUDE.md né .claude/rules/, non esce dal perimetro,
non aggiunge dipendenze.

Chiude con npm run check e una riga per file toccato. Se non c'era niente da fare lo dice.
```

### Studia la skill

Quando la apri, cerca queste cose — sono le stesse cinque, e se una manca la chiedi:

| Dove | Cosa |
|---|---|
| `description` | le tue frasi, e «usala dopo check-conventions» |
| prima riga delle istruzioni | `$ARGUMENTS`, con il caso vuoto spiegato |
| passo 1 | il rimando a `regole.md` di `check-conventions` |
| «Cosa non fare» | props ed elemento esterno intoccabili, `CLAUDE.md` e `.claude/rules/` intoccabili |
| in fondo | `npm run check` e l'output file per file |

Su `Callout` deve produrre `Callout.example.tsx`, la voce in `COMPONENTI` e la riga in `docs/componenti.md` — e lasciare stare `Callout.tsx`, `Callout.css` e `index.ts`, che c'erano già.

---

## 2. Provala

Due giri: prima su un componente solo, poi su tutta la libreria. Ogni giro è la stessa sequenza — lanci, guardi `git status`, chiedi il verdetto a `check-conventions`, committi.

### a. Committa la skill

Nel terminale dei comandi, così fra poco `git status` mostra solo quello che fa la skill:

```bash
git add .claude/skills && git commit -m "chore: skill fix-conventions"
```

Poi riavvia `claude` (`/exit`, poi di nuovo `claude`): le skill si caricano all'avvio.
Oppure usare il comando `/reload-skills`.


### b. Primo giro: `Callout`

Nel terminale di Claude, una frase normale, senza nominare la skill:

**Prompt:**

```
sistema Callout
```

All'inizio della risposta dovresti vedere `Skill(fix-conventions)`.

 Se non compare, la skill non è partita: il problema è la `description`. Aggiungi la frase che hai usato, riavvia, riprova.

Quando ha finito, nel terminale dei comandi:

```bash
git status --short -u
```

Dovresti vedere tre righe:

```bash
 M docs/componenti.md
 M src/App.tsx
?? src/components/Callout/Callout.example.tsx
```

Se compare anche `Callout.tsx`, la skill ha toccato il componente: il «cosa non fare» non è scritto abbastanza chiaro.

Adesso la controprova, con la skill del passo 5. Al passo 5 ti aveva detto che a `Callout` mancavano tre cose: rilanciala sullo stesso componente e guarda se è cambiato qualcosa.

**Prompt:**

```
/check-conventions Callout
```

Stavolta deve dire **committabile**, e non elencare più niente su `Callout`. È il giro completo: una skill trova, l'altra sistema, la prima conferma. Se segnala ancora qualcosa, è quello che `fix-conventions` non ha fatto — aggiungilo alle sue istruzioni e rilanciala.

Se è committabile:

```bash
git add -A && git commit -m "feat: Callout completo"
```

### c. Secondo giro: tutta la libreria

Stesso giro, ma sul resto. Prima il report completo, per vedere se è rimasto qualcosa fuori da `Callout`:

**Prompt:**

```
/check-conventions
```

Avrai due possibilità di risultato:

1. Se dice **committabile** per tutti, hai finito: salta al commit qui sotto.

2. Se elenca ancora qualcosa su `Badge`, `Button` o `Stack` — succede se al passo 3 hai saltato l'allineamento — stavolta lo sistemi passando una **cartella** come argomento, invece di un componente:

**Prompt:**

```
/fix-conventions src/components
```

È la stessa skill: `$ARGUMENTS` vale `src/components`, e il perimetro diventa tutto quello che c'è dentro. `/fix-conventions` senza niente farebbe lo stesso, perché il caso vuoto è definito così; la cartella esplicita serve quando ne vuoi una sola, o quando vuoi che si veda cosa stai chiedendo.

Poi guarda il diff prima di fidarti:

```bash
git diff --stat
```

Deve essere vuoto (se non ha cambiato nulla) oppure molto piccolo con i componenti modificati e corretti. 
Se ha cambiato props o markup di un componente, non committare: `git checkout .`, riscrivi il «cosa non fare», riprova.

Ultima controprova, e chiusura:

**Prompt:**

```
/check-conventions
```

Tutti **committabile**. Allora vai sul terminale e lancia i seguenti comandi:

```bash
npm run check
git add -A && git commit -m "chore: libreria allineata"
```

---

## Fatto

- [ ] `fix-conventions/SKILL.md` c'è, sotto le cinquanta righe, con `$ARGUMENTS`
- [ ] parte da una frase normale
- [ ] su `Callout` tocca tre file, non `Callout.tsx`, e `check-conventions` dice committabile
- [ ] su `src/components` ha sistemato il resto senza sforare, e `check-conventions` dice committabile per tutti
- [ ] committato
