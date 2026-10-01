> **Passo 12 · 10 minuti · da solo**
> ← [11 · Il plugin su GitHub](11-plugin-su-github.md) · [indice](../README.md)

# Un hook che non si può ignorare

In `CLAUDE.md`, sotto «Cosa non fare», c'è scritto: *non aggiungere dipendenze senza chiedere*. È una regola: Claude la legge e decide di rispettarla. Quasi sempre lo fa, ma resta una sua decisione. Una regola si chiede.

Un **hook** si impone. È un comando tuo che Claude Code lancia da solo prima o dopo un'azione, e che può fermarla. Non passa dal modello: succede sempre.

**Dove arrivi:** un hook che blocca `npm install <pacchetto>` prima che parta, e Claude che te lo chiede invece di farlo.

## 1. Lo script

Un hook riceve su stdin un JSON con quello che Claude sta per fare e risponde con il codice di uscita: `0` lascia fare, `2` blocca. Quello che scrive su stderr arriva a Claude come motivo.

Crea `.claude/hooks/niente-dipendenze.mjs`. È in Node perché ce l'hai già, e va uguale su Mac, Linux e Windows:

```js
import { readFileSync } from "node:fs";

// Claude Code passa i dati dell'evento come JSON su stdin.
const { tool_input } = JSON.parse(readFileSync(0, "utf8"));
const comando = tool_input?.command ?? "";

// `npm install`, `npm i` o `npm add` seguiti da almeno un pacchetto.
// `npm install` da solo, che reinstalla quello che c'è già, passa.
const trovato = comando.match(/\bnpm\s+(?:install|i|add)\b(.*)/);
const pacchetti = trovato
  ? trovato[1].trim().split(/\s+/).filter((parola) => parola && !parola.startsWith("-"))
  : [];

if (pacchetti.length === 0) process.exit(0);

// Quello che scrivi su stderr arriva a Claude come motivazione.
console.error(
  `Bloccato: \`${comando}\` aggiunge ${pacchetti.join(", ")} al progetto. ` +
    "Qui le dipendenze non si aggiungono senza chiedere: proponila alla persona e spiega a cosa serve.",
);
process.exit(2);
```

Provalo a mano, senza Claude, con lo stesso JSON che gli passerebbe Claude Code:

Vai nella root del progetto dal tuo terminale:

```bash
# Simula Claude che lancia "npm install clsx": lo script lo riconosce, stampa il
# motivo su stderr e finisce con 2 — "bloccato". echo $? mostra quel codice.
echo '{"tool_input":{"command":"npm install clsx"}}' | node .claude/hooks/niente-dipendenze.mjs; echo $?
```


```bash
# Stesso hook, ma con un comando innocuo: npm run check non installa niente,
# quindi lo script non stampa nulla e finisce con 0 — "via libera". È il caso
# di gran lunga più frequente: l'hook parte a OGNI comando Bash, e quasi sempre
# deve lasciar passare senza fiatare.
echo '{"tool_input":{"command":"npm run check"}}' | node .claude/hooks/niente-dipendenze.mjs; echo $?
```


Il primo stampa il messaggio e finisce con `2`, il secondo non stampa niente e finisce con `0`. Se non è così, sistemalo prima di andare avanti: un hook rotto blocca tutto o non blocca niente, e non te lo dice.

> Su PowerShell `echo $?` stampa `True` o `False`: il numero lo dà `echo $LASTEXITCODE`.

## 2. Registralo

Gli hook si dichiarano in `.claude/settings.json`. Il file esiste già: l'ha creato il passo 9 con `--scope project`, e dentro c'è il plugin. Non sostituirlo — **aggiungi** la chiave `hooks` accanto a quelle che ci sono:

```json
{
  "...": "quello che c'è già resta com'è",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/niente-dipendenze.mjs"
          }
        ]
      }
    ]
  }
}
```

Tre cose da sapere, e sono tutte qui:

- **`PreToolUse` è l'evento**: prima che Claude usi uno strumento. Altri: `PostToolUse` dopo, `Stop` quando finisce di rispondere, `SessionStart` all'apertura. La lista è nella [guida agli hook](https://code.claude.com/docs/en/hooks-guide).
- **`matcher` è lo strumento**: `Bash` sono i comandi da terminale, `Edit|Write` le modifiche ai file. Distingue maiuscole e minuscole.
- **`$CLAUDE_PROJECT_DIR` è la radice del progetto**, perché Claude può lanciare comandi da una sottocartella.

`settings.json` si committa, come già fatto al passo 9: l'hook vale per chiunque cloni il repo, esattamente come il plugin. Per un hook solo tuo c'è `settings.local.json`, ignorato da git.

Per controllare che sia stato letto, nella sessione scrivi `/hooks`: deve elencare `PreToolUse`. Se non compare, chiudi e riapri Claude Code.

## 3. Provalo

Apri Claude e digita questo prompt:

```bash
installa clsx e usalo in Button per comporre le classi
```

Claude prova `npm install clsx`, il comando non parte, e Claude riceve il messaggio del tuo script. Con quello sopra ti dice che non può, e ti chiede se vuoi aggiungerla. Non ha obbedito: **non ha potuto**.

È la differenza con la regola che hai scritto al passo 2, «non aggiungere dipendenze senza chiedere». Lì, insistendo, la dipendenza l'avrebbe aggiunta. Qui no, finché l'hook c'è.

> Un hook che blocca vale anche con i permessi disattivati e per i subagent. È per le cose che non devono succedere **mai**. Per le preferenze restano le regole.

## 4. Se vuoi: il linter su ogni file toccato

L'altro uso tipico è silenzioso: non blocca, fa. Dopo ogni modifica lancia il linter sul file toccato. Se è pulito, niente. Se no, l'errore arriva a Claude subito, e lo sistema al volo invece che alla fine con `npm run check`.

Script `.claude/hooks/lint-del-file.mjs`. Rispetto al primo ha una riga in più, e conta: **scrive una traccia in un file di log** a ogni esecuzione. Un hook che non blocca non si vede, e senza una traccia non sai mai se è partito.

```js
import { readFileSync, appendFileSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const radice = process.env.CLAUDE_PROJECT_DIR ?? ".";
const { tool_input } = JSON.parse(readFileSync(0, "utf8"));
const file = tool_input?.file_path ?? "";
if (!/\.tsx?$/.test(file)) process.exit(0);

// Lancia l'oxlint del progetto con lo stesso Node che sta eseguendo l'hook.
const oxlint = join(radice, "node_modules/oxlint/bin/oxlint");
const esito = spawnSync(process.execPath, [oxlint, "--deny-warnings", file], { encoding: "utf8" });

// La traccia: una riga per esecuzione, con data, file e codice di uscita.
appendFileSync(join(radice, ".claude/hooks/hook.log"), `${new Date().toISOString()} lint ${file} → ${esito.status}\n`);

if (esito.status === 0) process.exit(0);
console.error(esito.stdout + esito.stderr);
process.exit(2);
```

Il log non va committato: aggiungi `.claude/hooks/hook.log` al `.gitignore`.

**Prova Manuale**
Puoi anche provarlo a mano come il primo, passandogli un file vero:

```bash
# Un file pulito: nessun output, esce con 0, e nel log compare una riga.
echo '{"tool_input":{"file_path":"src/components/Badge/Badge.tsx"}}' | CLAUDE_PROJECT_DIR=. node .claude/hooks/lint-del-file.mjs; echo $?
cat .claude/hooks/hook.log
```

Poi registralo in `settings.json`, dentro `hooks`, accanto a `PreToolUse`:

```json
"PostToolUse": [
  {
    "matcher": "Edit|Write",
    "hooks": [
      {
        "type": "command",
        "command": "node \"$CLAUDE_PROJECT_DIR\"/.claude/hooks/lint-del-file.mjs"
      }
    ]
  }
]
```

Riavvia `claude` e provalo con una modifica che il linter non accetta:

**Prompt:**

```
Aggiungi in cima a src/components/Badge/Badge.tsx una costante DEBUG = true, senza usarla.
```

Claude ti risponderà qualcosa — che l'ha aggiunta, che il check non passa, che la toglie. **Quel testo non ti dice se l'hook è partito.** Lo dice il log:

```bash
cat .claude/hooks/hook.log
```

Se c'è una riga nuova con `Badge.tsx → 2`, l'hook è scattato subito dopo la modifica e ha passato a Claude l'avviso di oxlint. Spesso lo dice anche Claude — «dopo la modifica è scattato l'hook di lint e ha dato questo avviso: …», con il messaggio del linter riportato pari pari — ed è un buon segno, ma la conferma resta il log. Che poi lasci la costante o la tolga dipende da come glielo chiedi: qui gliel'hai chiesta non usata, quindi la lascia e ti spiega perché. Se l'ultima riga è ancora quella del test a mano, l'hook non è partito: controlla `/hooks`, e che `settings.json` sia un JSON valido.

Alla fine rimetti a posto `Badge.tsx` — `git checkout src/components/Badge/Badge.tsx` — e committa hook e `settings.json`.

`PostToolUse` arriva a modifica già fatta: può segnalare, non impedire. Per impedire serve `PreToolUse`.

## Fatto

- [ ] `.claude/settings.json` ha un hook `PreToolUse` con matcher `Bash`
- [ ] provato a mano con `echo | node`: `npm install clsx` risponde `2`, `npm run check` risponde `0`
- [ ] provato con Claude: gli chiedi di installare `clsx` e non ci riesce
- [ ] (se hai fatto il punto 4) nel log c'è la riga `Badge.tsx → 2`
- [ ] committato

## Regola, skill, agente o hook?

Sono i quattro modi di dire a Claude come lavorare in un progetto, e ora li hai usati tutti. Il segnale per scegliere:

| | Quando agisce | Chi decide |
|---|---|---|
| **Regola** | sempre, sta nel contesto | Claude, che la legge e la applica |
| **Skill** | quando serve, per un lavoro che si ripete | Claude dalla `description`, o tu con `/` |
| **Subagent** | per un lavoro isolato, con un contesto suo | Claude, o tu che glielo chiedi |
| **Hook** | a un evento preciso, prima o dopo un'azione | nessuno: succede |

Se la frase comincia con «Claude non deve mai», è un hook. Se comincia con «Claude dovrebbe», è una regola. Se comincia con «prima fai X, poi Y», è una skill.

## Hai finito

Il percorso è chiuso. Porta in aula il portatile con questo progetto e il plugin del passo 9 installato: in aula si parte da lì, e non si rispiega niente di quello che c'è qui.
