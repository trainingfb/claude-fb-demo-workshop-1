#!/usr/bin/env bash
# Pubblica il percorso dei partecipanti nel wiki di claude-fb-workshop-claudepress.
# Uso:  ./sync-wiki.sh
set -euo pipefail

WIKI_URL="https://github.com/trainingfb/claude-fb-workshop-claudepress.wiki.git"
SRC="$(cd "$(dirname "$0")/partecipanti" && pwd)"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

echo "→ clono il wiki"
git clone -q "$WIKI_URL" "$TMP/wiki"

echo "→ preparo le pagine"
mkdir -p "$TMP/pages"
cp "$SRC"/percorso/*.md "$TMP/pages/"
cp "$SRC"/02-se-qualcosa-va-storto.md "$TMP/pages/"

python3 - "$TMP/pages" <<'PY'
import io, re, sys, glob, os
d = sys.argv[1]

def target(m):
    """](qualsiasi/percorso/pagina.md) -> ](pagina)"""
    path = m.group(1)
    if path.startswith(("http://", "https://", "#")):
        return m.group(0)
    return "](" + os.path.basename(path)[:-3] + ")"

def etichetta(m):
    """[`qualsiasi/percorso/pagina.md`] -> [`pagina`]"""
    return "[`" + os.path.basename(m.group(1)) + "`]"

for p in glob.glob(os.path.join(d, "*.md")):
    s = io.open(p, encoding="utf-8").read()
    s = re.sub(r"\]\(([^)]+?\.md)\)", target, s)
    s = re.sub(r"\[`([^`]+?)\.md`\]", etichetta, s)
    s = s.replace("> [← indice](README)", "> [← indice](Home)")
    io.open(p, "w", encoding="utf-8").write(s)
PY

# Home e sidebar: generate qui, non esistono fra i sorgenti
cp "$(dirname "$0")/wiki/Home.md" "$TMP/pages/Home.md"
cp "$(dirname "$0")/wiki/_Sidebar.md" "$TMP/pages/_Sidebar.md"

cp "$TMP/pages"/*.md "$TMP/wiki/"

cd "$TMP/wiki"
if git diff --quiet && git diff --cached --quiet && [ -z "$(git status --porcelain)" ]; then
  echo "✓ il wiki è già aggiornato"
  exit 0
fi
git add -A
git status --short
git commit -q -m "docs: aggiorna il percorso dal materiale del workshop"
git push -q origin HEAD
echo "✓ wiki aggiornato → https://github.com/trainingfb/claude-fb-workshop-claudepress/wiki"
