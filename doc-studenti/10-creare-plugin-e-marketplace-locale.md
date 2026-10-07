> **Passo 10 · 15 minuti · da solo**
> ← [09 · Un plugin da GitHub](09-marketplace-su-github.md) · [indice](../README.md) · [11 · Il plugin su GitHub](11-plugin-su-github.md) →

# Il tuo primo plugin

Nella sezione precedente hai installato un plugin creato da me (Fabio Biondi). 

Adesso ne fai uno tuo: lo costruisci, lo installi sul tuo computer, lo provi in un altro progetto. Metterlo su GitHub, come ho fatto io con il mio, è il passo dopo.

Dentro ci va una skill nuova, `folder-info`, che analizza e fornisce un report di una cartella qualsiasi. Non una di quelle del progetto: infatti `new-component`, `check-conventions` e `fix-conventions` parlano di `src/components/` e dei cinque file, e fuori da questa libreria non vogliono dire niente. 

**In un plugin ci va quello che può funzionare ovunque**; le skills specifichedi un progetto restano invece dove sono, in `.claude/skills/`.

---

## 1. Costruisci il plugin

Un plugin è una cartella: due file di configurazione, e dentro le skill che vuoi portarti dietro. **Non va dentro `hello-workshop`**: non è codice di quel progetto, è roba tua che vale ovunque. Mettiti nella cartella che contiene `hello-workshop` — quella dove tieni i progetti — e crea lì, accanto, questa struttura:


Non devi creare cartelle dentro `hello-workshop`, altrimenti poi `git:commit` le prende. La struttura che ti ho dato è pensata per stare fuori da qualunque repo di codice: in questo esercizio la consideriamo così.
Quindi crea una nuova cartella `mariorossi-plugins` altrove, cosi strutturata:

> TIP: puoi utilizzare il tuo nome invece di `mariorossi`

```
mariorossi-plugins/
├── .claude-plugin/
│   ├── plugin.json           ← come si chiama il plugin
│   └── marketplace.json      ← l'elenco da cui si installa
└── skills/
    └── folder-info/
        └── SKILL.md          ← la skill, qui sotto
```

Tre file da scrivere. Sostituisci `mariorossi` con il tuo utente GitHub e `Mario Rossi` con il tuo nome, in tutti e tre.

**`mariorossi-plugins/.claude-plugin/plugin.json`** — come si chiama il plugin e chi l'ha fatto:

```json
{
  "name": "dev-tools",
  "description": "Skill di utilità che valgono in qualunque progetto.",
  "version": "1.0.0",
  "author": { "name": "Mario Rossi" }
}
```

**`mariorossi-plugins/.claude-plugin/marketplace.json`** — l'elenco da cui si installa. Per ora contiene un plugin solo:

```json
{
  "name": "mariorossi-plugins",
  "description": "I plugin di Mario Rossi.",
  "owner": { "name": "Mario Rossi" },
  "plugins": [
    { "name": "dev-tools", "source": "./", "description": "Skill di utilità." }
  ]
}
```

Tieni a mente i due nomi, perché tra poco li usi insieme come al passo 9: **`dev-tools`** è il plugin, **`mariorossi-plugins`** è il marketplace. La cartella si chiama come il marketplace, e al punto 5 diventerà anche il nome del repo, `mariorossi/mariorossi-plugins`: un nome solo per tre cose, e dice subito di chi è.

**`mariorossi-plugins/skills/folder-info/SKILL.md`** — la skill. Copiala così com'è:

INIZIO SKILL:

````md
---
name: folder-info
description: Misura una cartella e riporta quanti file ci sono per tipo, quanto pesano, e quali sono i più grandi e i più recenti. Usala per capire com'è fatto un progetto che non conosci. Trigger: info sulla cartella, quanti file ci sono, quanto pesa il progetto, com'è fatta questa cartella, folder info.
allowed-tools: Bash(find:*), Bash(du:*), Bash(wc:*), Bash(ls:*), Bash(sort:*), Bash(awk:*), Bash(sed:*), Bash(xargs:*), Bash(head:*), Bash(uniq:*)
---

# Com'è fatta questa cartella

Cartella da misurare: `$ARGUMENTS`. Se è vuoto, la cartella corrente.
Ignora sempre `node_modules`, `.git`, `dist` e `build`.

## Cosa misurare

1. **File per tipo** — conta i file raggruppati per estensione e somma le
   dimensioni di ogni gruppo:
   `find <dir> -type f -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' -not -path '*/build/*' -print0 | xargs -0 du -k | awk '{ n=split($2,a,"."); ext=(n>1)?a[n]:"(nessuna)"; c[ext]++; s[ext]+=$1 } END { for (e in c) printf "%s\t%d\t%d\n", e, c[e], s[e] }' | sort -k2 -rn`
2. **Totale** — file totali, cartelle totali, dimensione complessiva (`du -sk <dir>`).
3. **I cinque file più grandi** — `find ... -type f -print0 | xargs -0 du -k | sort -rn | head -5`.
4. **I cinque file modificati più di recente** — `find ... -type f -print0 | xargs -0 ls -lt | head -5`.

## Cosa non fare

- Non leggere il contenuto dei file: si contano, non si aprono.
- Non modificare niente: questa skill guarda e basta.
- Non entrare in `node_modules`, `.git`, `dist`, `build`.

## Output

Solo questo, senza commenti intorno:

| Tipo | File | KB |
|---|---|---|
| (una riga per estensione, dalla più numerosa) |

Poi tre righe: `Totale: N file, M cartelle, X KB`, i cinque più grandi
(percorso e KB), i cinque più recenti (percorso e data).
````

FINE SKILL




Leggila prima di andare avanti: ha la stessa forma delle skill dei passi 5 e 6 — `description` con i trigger, `$ARGUMENTS` con il caso vuoto, cosa non fare, output fisso. La differenza è che non nomina nessun file di questo progetto: per questo può vivere in un plugin.

## 2. Controlla che sia valido

Apri il terminale nella cartella parent di `/mariorossi-plugins` e verifica il plugin:

```bash
claude plugin validate ./mariorossi-plugins --strict
```

Deve dire **Validation passed**. Se dice altro, ti indica il file e il campo sbagliato: sistemalo prima di andare avanti.

> `--strict` è più severo del necessario per farlo funzionare. È quello che vuoi prima di dare una cosa ad altri.

## 3. Installalo

Gli stessi due comandi del passo 9, ma il marketplace è una cartella locale invece di un repo. Qui senza `--scope project`: un marketplace che punta a una cartella del tuo disco non ha senso committato per gli altri.

Sempre dalla stessa cartella parent installa il plugin globalmente (user):

```bash
claude plugin marketplace add ./mariorossi-plugins     # add marketplace
claude plugin install dev-tools@mariorossi-plugins   # install tools
claude plugin list | grep -A3 "dev-tools@".       # verifica che sia visible
```

> NON FARLO: **Per toglierlo**, nell'ordine inverso — prima il plugin, poi il marketplace. Ti serve se sbagli un nome e vuoi ripartire pulito, o al punto 5 quando passi alla versione su GitHub:
>
> ```bash
> claude plugin uninstall dev-tools@mariorossi-plugins
> claude plugin marketplace remove mariorossi-plugins
> ```

## 4. Provalo in un progetto

Il plugin è installato a livello utente, quindi vale in qualunque cartella. Torna in `hello-workshop`, riavvia `claude` (le skill si caricano all'avvio), e chiedi con una frase normale:

**Prompt:**

```
quanti file ci sono in questa cartella e quanto pesano?
```

Se parte `Skill(folder-info)` e ti torna la tabella, il plugin funziona. Puoi anche chiamarla per nome, con il prefisso del plugin, e passarle una cartella:

```
/dev-tools:folder-info src
```

oppure

```
/folder-info src
```

> Se modifichi una skill del plugin, la sessione aperta **non** se ne accorge: serve `/reload-plugins`. Senza saperlo si perdono dieci minuti a credere che sia rotta.

**Verifica**

- [ ] `claude plugin validate ./mariorossi-plugins --strict` dice **Validation passed**
- [ ] `claude plugin list` mostra `dev-tools@mariorossi-plugins` (con il tuo nome)
- [ ] in `hello-workshop` `folder-info` parte da una frase normale

---

## Fatto

- [ ] `mariorossi-plugins/` valido e installato
- [ ] `folder-info` parte in `hello-workshop` da una frase normale
- [ ] `claude plugin list` mostra `dev-tools@mariorossi-plugins`
