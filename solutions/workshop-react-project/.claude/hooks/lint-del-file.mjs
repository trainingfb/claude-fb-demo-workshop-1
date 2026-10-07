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
