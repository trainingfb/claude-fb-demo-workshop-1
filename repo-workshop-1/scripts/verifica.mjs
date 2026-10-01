#!/usr/bin/env node
/**
 * A che punto sei del percorso.
 *
 * Non c'è nessuno a cui chiedere "è giusto?", quindi lo chiedi a questo
 * script: guarda lo stato del repo e ti dice cosa risulta fatto e cosa no.
 *
 * Quello che NON può controllare è l'unica cosa che conta davvero, cioè se la
 * tua skill parte da sola. Quello resta da provare a mano, e te lo ricorda in
 * fondo.
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const VERDE = "\x1b[32m";
const ROSSO = "\x1b[31m";
const GIALLO = "\x1b[33m";
const GRIGIO = "\x1b[90m";
const FORTE = "\x1b[1m";
const FINE = "\x1b[0m";

/** Le skill e gli agenti che il progetto ha già in partenza. */
const SKILL_DI_BASE = ["nuovo-componente", "check-convenzioni"];
const AGENTI_DI_BASE = ["auditor"];
/** I due che nascono dagli agenti in parallelo del passo 8. */
const COMPONENTI_DEL_PASSO_8 = ["Avatar", "Tooltip"];

const leggi = (percorso) => (existsSync(percorso) ? readFileSync(percorso, "utf8") : "");

const cartelle = (percorso) =>
  existsSync(percorso)
    ? readdirSync(percorso, { withFileTypes: true })
        .filter((voce) => voce.isDirectory())
        .map((voce) => voce.name)
    : [];

/** I cinque file, per un componente. Torna l'elenco di quelli mancanti. */
function fileMancanti(nome) {
  const indice = leggi("src/index.ts");
  const vetrina = leggi("src/gallery/Gallery.tsx");
  const documentazione = leggi("docs/componenti.md");

  const controlli = [
    [`src/ui/${nome}/${nome}.tsx`, existsSync(join("src/ui", nome, `${nome}.tsx`))],
    [
      `src/ui/${nome}/${nome}.example.tsx`,
      existsSync(join("src/ui", nome, `${nome}.example.tsx`)),
    ],
    ["l'export in src/index.ts", indice.includes(`/${nome}/${nome}"`)],
    ["la registrazione in Gallery.tsx", vetrina.includes(`${nome}Example`)],
    ["la riga in docs/componenti.md", documentazione.includes(`\`${nome}\``)],
  ];

  return controlli.filter(([, presente]) => !presente).map(([file]) => file);
}

/**
 * Il validatore vero di Claude Code. Torna true, false, oppure null se la CLI
 * non è raggiungibile: meglio dire "non lo so" che dare un falso verde.
 */
function validaConClaude(percorso) {
  if (!existsSync(percorso)) return false;
  try {
    execSync(`claude plugin validate ${percorso} --strict`, { stdio: "pipe" });
    return true;
  } catch (errore) {
    const uscita = String(errore.stdout ?? "");
    return uscita.includes("Validating") ? false : null;
  }
}

const passi = [];

/* ---- Passo 3 — due regole nuove in .claude/rules/ ----------------------- */
{
  const PERCORSO = ".claude/rules/mie-regole.md";
  const conta = (testo) => testo.split("\n").filter((riga) => riga.startsWith("- ")).length;
  const regole = conta(leggi(PERCORSO));

  /** Gli altri file di regole con i `paths` in cima e almeno una regola dentro. */
  const conPaths = existsSync(".claude/rules")
    ? readdirSync(".claude/rules")
        .filter((nome) => nome.endsWith(".md") && nome !== "mie-regole.md")
        .filter((nome) => {
          const testo = leggi(join(".claude/rules", nome));
          return testo.startsWith("---") && /^paths:/m.test(testo) && conta(testo) > 0;
        })
    : [];

  passi.push([
    3,
    regole > 0 && conPaths.length > 0,
    regole === 0
      ? `${PERCORSO} non ha ancora nessuna regola`
      : conPaths.length === 0
        ? "manca un file in .claude/rules/ con i `paths` in cima e almeno una regola"
        : `${regole === 1 ? "una regola" : `${regole} regole`} in ${PERCORSO}, e ${conPaths.join(", ")} con i suoi paths`,
  ]);
}

/* ---- Passi 3 e 4 — plan mode e la lettura di una skill ------------------- */
passi.push([4, null, "si prova e basta: lo verifichi tu, in fondo"]);
passi.push([5, null, "è un passo di lettura: lo verifichi tu, in fondo"]);

/* ---- Passo 6 — la tua skill, e Callout completo ------------------------- */
{
  const tue = cartelle(".claude/skills").filter((nome) => !SKILL_DI_BASE.includes(nome));
  const valide = validaConClaude(".claude/skills");
  const mancantiCallout = fileMancanti("Callout");

  if (tue.length === 0) {
    passi.push([6, false, "nessuna skill tua in .claude/skills/"]);
  } else if (valide === false) {
    passi.push([6, false, `${tue.join(", ")}: il frontmatter non passa la validazione`]);
  } else if (mancantiCallout.length > 0) {
    passi.push([6, false, `skill c'è, ma a Callout manca ancora: ${mancantiCallout.join(", ")}`]);
  } else {
    passi.push([6, true, `${tue.join(", ")}, e Callout è completo`]);
  }
}

/* ---- Passo 7 — un agente tuo -------------------------------------------- */
{
  const agenti = existsSync(".claude/agents")
    ? readdirSync(".claude/agents")
        .filter((file) => file.endsWith(".md"))
        .map((file) => file.replace(/\.md$/, ""))
        .filter((nome) => !AGENTI_DI_BASE.includes(nome))
    : [];

  const valido = validaConClaude(".claude/agents");

  if (agenti.length === 0) {
    passi.push([7, false, "nessun agente tuo in .claude/agents/"]);
  } else if (valido === false) {
    passi.push([7, false, `${agenti.join(", ")}: il frontmatter non passa la validazione`]);
  } else {
    passi.push([7, true, `${agenti.join(", ")}, oltre all'auditor`]);
  }
}

/* ---- Passo 8 — i due componenti nati in parallelo ------------------------ */
{
  const esiti = COMPONENTI_DEL_PASSO_8.map((nome) => [nome, fileMancanti(nome)]);
  const rotti = esiti.filter(([, mancanti]) => mancanti.length > 0);

  passi.push(
    rotti.length === 0
      ? [8, true, `${COMPONENTI_DEL_PASSO_8.join(" e ")} completi tutti e due`]
      : [
          8,
          false,
          rotti
            .map(([nome, m]) =>
              m.length === 5 ? `${nome} non c'è` : `a ${nome} manca: ${m.join(", ")}`,
            )
            .join(" · "),
        ],
  );
}

/* ---- Passo 9 — il plugin e il marketplace ------------------------------- */
{
  const manifest = leggi("mio-plugin/.claude-plugin/plugin.json");
  const mercato = leggi("mio-plugin/.claude-plugin/marketplace.json");

  let esito = [9, false, "manca mio-plugin/.claude-plugin/plugin.json"];

  const validato = validaConClaude("./mio-plugin");
  if (validato === false && manifest) {
    esito = [9, false, "claude plugin validate ./mio-plugin --strict non passa"];
  } else if (manifest) {
    try {
      const dati = JSON.parse(manifest);
      if (!dati.name || !dati.description) {
        esito = [9, false, "plugin.json c'è ma gli manca name oppure description"];
      } else if (!mercato) {
        esito = [9, false, `plugin "${dati.name}" valido, manca il marketplace.json`];
      } else {
        const elencato = JSON.parse(mercato).plugins?.some((voce) => voce.name === dati.name);
        esito = elencato
          ? [9, true, `plugin "${dati.name}" valido ed elencato nel marketplace`]
          : [9, false, `il marketplace non elenca il plugin "${dati.name}"`];
      }
    } catch {
      esito = [9, false, "c'è un JSON non valido dentro mio-plugin/.claude-plugin/"];
    }
  }

  passi.push(esito);
}

/* ---- Passo 10 — il plugin da GitHub ------------------------------------- */
passi.push([10, null, "si installa e basta: se /commit parte, è fatto"]);

/* ---- Passo 11 — l'hook che blocca npm install --------------------------- */
{
  const PERCORSO = ".claude/settings.json";
  const testo = leggi(PERCORSO);
  let esito = [11, false, `manca ${PERCORSO}`];

  if (testo) {
    try {
      /** I comandi degli hook PreToolUse il cui matcher prende Bash. */
      const comandi = (JSON.parse(testo).hooks?.PreToolUse ?? [])
        .filter((gruppo) => !gruppo.matcher || new RegExp(`^(${gruppo.matcher})$`).test("Bash"))
        .flatMap((gruppo) => gruppo.hooks ?? [])
        .filter((hook) => hook.type === "command" && hook.command)
        .map((hook) => hook.command);

      if (comandi.length === 0) {
        esito = [11, false, `${PERCORSO} c'è, ma nessun hook PreToolUse con matcher Bash`];
      } else {
        // Lo lancia davvero, con lo stesso JSON che gli darebbe Claude Code.
        const prova = JSON.stringify({
          hook_event_name: "PreToolUse",
          tool_name: "Bash",
          tool_input: { command: "npm install clsx" },
        });
        const blocca = comandi.some((comando) => {
          try {
            execSync(comando, {
              input: prova,
              stdio: "pipe",
              env: { ...process.env, CLAUDE_PROJECT_DIR: process.cwd() },
            });
            return false;
          } catch (errore) {
            return errore.status === 2;
          }
        });
        esito = blocca
          ? [11, true, "l'hook PreToolUse su Bash blocca `npm install clsx` con exit 2"]
          : [11, false, "l'hook c'è ma non blocca `npm install clsx`: provalo a mano con echo | node"];
      }
    } catch {
      esito = [11, false, `${PERCORSO} non è un JSON valido`];
    }
  }

  passi.push(esito);
}

/* ---- Il compilatore ------------------------------------------------------ */
let checkVerde = true;
let checkErrore = "";
try {
  execSync("npm run check", { stdio: "pipe" });
} catch (errore) {
  checkVerde = false;
  checkErrore = String(errore.stdout ?? errore.message)
    .split("\n")
    .filter(Boolean)
    .slice(-3)
    .join(" | ");
}

/* ---- Il resoconto -------------------------------------------------------- */
const TITOLI = {
  3: "Le regole del progetto",
  4: "Pensare prima di scrivere",
  5: "Leggere una skill già fatta",
  6: "La tua prima skill",
  7: "Il tuo primo subagent",
  8: "Due agenti in parallelo",
  9: "Il tuo primo plugin",
  10: "Un plugin da GitHub",
  11: "Un hook che non si può ignorare",
};

console.log(`\n${FORTE}A che punto sei${FINE}\n`);

for (const [numero, esito, dettaglio] of passi) {
  const segno = esito === null ? `${GIALLO}—${FINE}` : esito ? `${VERDE}✓${FINE}` : `${ROSSO}✗${FINE}`;
  console.log(` ${segno} ${FORTE}Passo ${numero}${FINE} · ${TITOLI[numero]}`);
  console.log(`   ${GRIGIO}${dettaglio}${FINE}`);
}

console.log(
  `\n ${checkVerde ? `${VERDE}✓${FINE}` : `${ROSSO}✗${FINE}`} ${FORTE}npm run check${FINE}`,
);
if (!checkVerde) console.log(`   ${GRIGIO}${checkErrore}${FINE}`);

const fatti = passi.filter(([, esito]) => esito === true).length;
const verificabili = passi.filter(([, esito]) => esito !== null).length;

console.log(`\n${FORTE}${fatti} passi su ${verificabili}${FINE} risultano fatti.`);
console.log(
  `${GRIGIO}Questo script non può vedere se le tue skill e i tuoi agenti partono da soli\n` +
    `da una frase normale. Quello provalo a mano, in una sessione nuova: è la\n` +
    `cosa che conta di più, e l'unica che ti dice se la description è scritta bene.${FINE}\n`,
);

process.exit(fatti === verificabili && checkVerde ? 0 : 1);
