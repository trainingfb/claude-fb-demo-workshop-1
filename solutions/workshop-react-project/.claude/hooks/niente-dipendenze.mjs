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
