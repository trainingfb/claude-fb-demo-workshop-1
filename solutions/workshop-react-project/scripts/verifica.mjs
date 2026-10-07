#!/usr/bin/env node
/**
 * A che punto sei del percorso.
 *
 * Non c'è nessuno a cui chiedere "è giusto?", quindi lo chiedi a questo
 * script: guarda lo stato del repo e ti dice cosa risulta fatto e cosa no.
 *
 * Quello che NON può controllare è l'unica cosa che conta davvero, cioè se le
 * tue skill e i tuoi agenti partono da soli. Quello resta da provare a mano, e
 * te lo ricorda in fondo.
 */

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const VERDE = "\x1b[32m";
const ROSSO = "\x1b[31m";
const GIALLO = "\x1b[33m";
const GRIGIO = "\x1b[90m";
const FORTE = "\x1b[1m";
const FINE = "\x1b[0m";

/** I tre componenti costruiti al passo 3. */
const COMPONENTI_DEL_PASSO_3 = ["Badge", "Button", "Stack"];
/** I due che nascono dagli agenti in parallelo del passo 8. */
const COMPONENTI_DEL_PASSO_8 = ["Avatar", "Tooltip"];
/** Il plugin installato dal passo 9. */
const PLUGIN_DEL_PASSO_9 = "git@claude-fb-marketplace-demo-workshop";

const leggi = (percorso) => (existsSync(percorso) ? readFileSync(percorso, "utf8") : "");

/** Il frontmatter di un file .md, come testo. Vuoto se non c'è. */
const frontmatter = (testo) => testo.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";

/** Le righe di regole (quelle che cominciano con "- ") di un file .md. */
const contaRegole = (testo) => testo.split("\n").filter((riga) => riga.startsWith("- ")).length;

/** I cinque file, per un componente. Torna l'elenco di quelli mancanti. */
function fileMancanti(nome) {
  const cartella = join("src/components", nome);
  const indice = leggi("src/components/index.ts");
  const vetrina = leggi("src/App.tsx");
  const documentazione = leggi("docs/componenti.md");

  const controlli = [
    [
      `${nome}.tsx e ${nome}.css`,
      existsSync(join(cartella, `${nome}.tsx`)) && existsSync(join(cartella, `${nome}.css`)),
    ],
    [`${nome}.example.tsx`, existsSync(join(cartella, `${nome}.example.tsx`))],
    [
      "gli export in src/components/index.ts",
      indice.includes(`/${nome}/${nome}"`) && indice.includes(`${nome}Props`),
    ],
    ["la voce in COMPONENTI di App.tsx", vetrina.includes(`${nome}Example`)],
    ["la riga in docs/componenti.md", documentazione.includes(`\`${nome}\``)],
  ];

  return controlli.filter(([, presente]) => !presente).map(([file]) => file);
}

/** Una frase per i componenti incompleti, oppure "" se sono tutti a posto. */
function componentiIncompleti(nomi) {
  return nomi
    .map((nome) => [nome, fileMancanti(nome)])
    .filter(([, mancanti]) => mancanti.length > 0)
    .map(([nome, m]) => (m.length === 5 ? `${nome} non c'è` : `a ${nome} manca: ${m.join(", ")}`))
    .join(" · ");
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

/* ---- Passo 3 — CLAUDE.md, le due regole, la libreria --------------------- */
{
  const claude = leggi("CLAUDE.md");
  const sezioni = ["## I cinque file da toccare", "## Convenzioni", "## Non fare mai"];
  const sezioniMancanti = sezioni.filter((sezione) => !claude.includes(sezione));
  const api = leggi(".claude/rules/api.md");
  const ui = leggi(".claude/rules/ui.md");
  const incompleti = componentiIncompleti(COMPONENTI_DEL_PASSO_3);

  let esito = [3, true, "CLAUDE.md, api.md, ui.md con i paths, e Badge, Button, Stack completi"];
  if (sezioniMancanti.length > 0) {
    esito = [3, false, `a CLAUDE.md manca: ${sezioniMancanti.join(", ")}`];
  } else if (contaRegole(api) === 0) {
    esito = [3, false, ".claude/rules/api.md non c'è o non ha ancora nessuna regola"];
  } else if (!/^paths:/m.test(frontmatter(ui)) || contaRegole(ui) === 0) {
    esito = [3, false, ".claude/rules/ui.md deve avere i `paths` in cima e almeno una regola"];
  } else if (incompleti) {
    esito = [3, false, incompleti];
  }
  passi.push(esito);
}

/* ---- Passo 4 — plan mode ------------------------------------------------- */
passi.push([4, null, "si prova e basta: lo verifichi tu, in fondo"]);

/* ---- Passo 5 — new-component e check-conventions, e Callout a metà ------- */
{
  const mancanti = [
    ".claude/skills/new-component/SKILL.md",
    ".claude/skills/check-conventions/SKILL.md",
    ".claude/skills/check-conventions/regole.md",
  ].filter((percorso) => !existsSync(percorso));
  const strumenti = frontmatter(leggi(".claude/skills/check-conventions/SKILL.md"));

  if (mancanti.length > 0) {
    passi.push([5, false, `manca ${mancanti.join(", ")}`]);
  } else if (/\b(Write|Edit)\b/.test(strumenti)) {
    passi.push([5, false, "check-conventions ha Write o Edit negli allowed-tools: deve solo guardare"]);
  } else if (validaConClaude(".claude/skills") === false) {
    passi.push([5, false, "il frontmatter di una skill non passa la validazione"]);
  } else if (!existsSync("src/components/Callout/Callout.tsx")) {
    passi.push([5, false, "le due skill ci sono, manca il Callout da controllare"]);
  } else {
    passi.push([5, true, "new-component, check-conventions in due file, e il Callout"]);
  }
}

/* ---- Passo 6 — fix-conventions, e Callout completo ----------------------- */
{
  const skill = leggi(".claude/skills/fix-conventions/SKILL.md");
  const mancantiCallout = fileMancanti("Callout");

  if (!skill) {
    passi.push([6, false, "manca .claude/skills/fix-conventions/SKILL.md"]);
  } else if (!skill.includes("$ARGUMENTS")) {
    passi.push([6, false, "fix-conventions non usa $ARGUMENTS"]);
  } else if (mancantiCallout.length > 0) {
    passi.push([6, false, `la skill c'è, ma a Callout manca ancora: ${mancantiCallout.join(", ")}`]);
  } else {
    passi.push([6, true, "fix-conventions, e Callout è completo"]);
  }
}

/* ---- Passo 7 — auditor e stats ------------------------------------------- */
{
  const auditor = frontmatter(leggi(".claude/agents/auditor.md"));
  const stats = frontmatter(leggi(".claude/agents/stats.md"));
  const strumentiAuditor = auditor.match(/^tools:(.*)$/m)?.[1] ?? "";
  const strumentiStats = stats.match(/^tools:(.*)$/m)?.[1] ?? "";

  if (!auditor || !stats) {
    const mancanti = [!auditor && "auditor.md", !stats && "stats.md"].filter(Boolean);
    passi.push([7, false, `manca in .claude/agents/: ${mancanti.join(", ")}`]);
  } else if (/\b(Write|Edit|Bash)\b/.test(strumentiAuditor)) {
    passi.push([7, false, "l'auditor deve avere solo Read, Glob, Grep: non deve poter scrivere"]);
  } else if (!/\bBash\b/.test(strumentiStats)) {
    passi.push([7, false, "stats ha bisogno di Bash nei tools, per git log e wc"]);
  } else if (validaConClaude(".claude/agents") === false) {
    passi.push([7, false, "il frontmatter di un agente non passa la validazione"]);
  } else {
    passi.push([7, true, "auditor in sola lettura, stats con Bash"]);
  }
}

/* ---- Passo 8 — i due componenti nati in parallelo ------------------------ */
{
  const incompleti = componentiIncompleti(COMPONENTI_DEL_PASSO_8);
  passi.push(
    incompleti
      ? [8, false, incompleti]
      : [8, true, `${COMPONENTI_DEL_PASSO_8.join(" e ")} completi tutti e due`],
  );
}

/* ---- Passo 9 — il plugin da GitHub, in settings.json --------------------- */
{
  const testo = leggi(".claude/settings.json");
  let esito = [9, false, "manca .claude/settings.json: installa il plugin con --scope project"];

  if (testo) {
    try {
      const attivo = JSON.parse(testo).enabledPlugins?.[PLUGIN_DEL_PASSO_9] === true;
      esito = attivo
        ? [9, true, `${PLUGIN_DEL_PASSO_9} attivo per il progetto`]
        : [9, false, `${PLUGIN_DEL_PASSO_9} non è in enabledPlugins`];
    } catch {
      esito = [9, false, ".claude/settings.json non è un JSON valido"];
    }
  }
  passi.push(esito);
}

/* ---- Passi 10 e 11 — il tuo plugin, fuori da questo repo ----------------- */
passi.push([10, null, "sta fuori dal repo: claude plugin validate ./<nome>-plugins --strict"]);
passi.push([11, null, "facoltativo: claude plugin list deve mostrarlo con fonte GitHub"]);

/* ---- Passo 12 — l'hook che blocca npm install ---------------------------- */
{
  const PERCORSO = ".claude/settings.json";
  const testo = leggi(PERCORSO);
  let esito = [12, false, `manca ${PERCORSO}`];

  if (testo) {
    try {
      /** I comandi degli hook PreToolUse il cui matcher prende Bash. */
      const comandi = (JSON.parse(testo).hooks?.PreToolUse ?? [])
        .filter((gruppo) => !gruppo.matcher || new RegExp(`^(${gruppo.matcher})$`).test("Bash"))
        .flatMap((gruppo) => gruppo.hooks ?? [])
        .filter((hook) => hook.type === "command" && hook.command)
        .map((hook) => hook.command);

      if (comandi.length === 0) {
        esito = [12, false, `${PERCORSO} c'è, ma nessun hook PreToolUse con matcher Bash`];
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
          ? [12, true, "l'hook PreToolUse su Bash blocca `npm install clsx` con exit 2"]
          : [12, false, "l'hook c'è ma non blocca `npm install clsx`: provalo a mano con echo | node"];
      }
    } catch {
      esito = [12, false, `${PERCORSO} non è un JSON valido`];
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
  5: "La tua prima skill: check-conventions",
  6: "La skill fix-conventions",
  7: "Il tuo primo subagent",
  8: "Due agenti in parallelo",
  9: "Un plugin da GitHub",
  10: "Il tuo primo plugin",
  11: "Il plugin su GitHub (facoltativo)",
  12: "Un hook che non si può ignorare",
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
