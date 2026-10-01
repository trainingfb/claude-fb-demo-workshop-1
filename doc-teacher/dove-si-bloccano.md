> **Solo per te** · non va distribuito

# Dove si bloccano, e cosa rispondere

Il percorso è in autonomia, ma tu sei raggiungibile. Questa è la lista di quello
che arriverà, passo per passo, con la risposta pronta.

La regola generale: **non dare la soluzione al primo messaggio.** Quasi tutte le
domande qui sotto si risolvono con una controdomanda, e il percorso funziona
solo se ci arrivano loro.

## Passo 1 — il componente a mano

**«Ho finito ma `npm run verifica` dice che manca qualcosa.»**
È il caso normale, capita a otto su dieci. Non dirgli cosa manca: lo script
glielo dice già. Rispondi «rileggi la riga rossa». Nove volte su dieci è
l'export in `src/index.ts`.

**«Perché devo farlo a mano se poi c'è la skill?»**
Perché al passo 4 la skill gli sembrerà una bella notizia invece di una
funzionalità qualsiasi. Se glielo spieghi prima, il passo 1 diventa un compito.

## Passo 2 — le regole

**«La mia regola va bene?»**
Rimandagli la domanda: «se ti mando un diff, quella regola ti dice sì o no senza
che tu debba pensarci?». Se la risposta è no, la riscrivono da soli.

**«Claude ha ignorato la regola.»**
Quasi sempre `CLAUDE.md` non è stato riletto perché la sessione era già aperta.
Basta una sessione nuova. È un ottimo momento per dirlo, perché se lo ricordano.

## Passo 3 — plan mode

Poche domande. Se arriva qualcosa è **«e adesso come esco?»**: esc, oppure
shift+tab fino a uscire dalla modalità.

## Passi 4 e 5 — le skill

Qui arriva il grosso dei messaggi, ed è **sempre la stessa cosa**.

**«La mia skill non parte.»**
La risposta è una sola, e non cambia mai: **il problema è la `description`, mai
le istruzioni.** Chiedigli di incollarti la description e la frase che ha
provato. Nel novanta per cento dei casi la description descrive *cosa fa* invece
di *quando si usa*, e non contiene nessuna delle parole che uno scriverebbe
davvero.

**«Parte sempre, anche quando non voglio.»**
Il problema opposto, stessa causa: description troppo vaga. Deve nominare
questo progetto e queste cose, non «componenti» in astratto.

**«L'ho modificata ma non cambia niente.»**
Sessione nuova. Le skill di progetto si ricaricano, ma se la sessione ha già
deciso di non usarla non ci ripensa.

## Passo 6 — il subagent

**«Ma che differenza c'è con una skill?»**
È la domanda giusta, e vale la pena rispondere bene. Una skill sono istruzioni
dentro la tua sessione: vedi tutto quello che succede, e tutto quello che legge
finisce nel tuo contesto. Un subagent lavora per conto suo e ti torna solo la
conclusione. La domanda da farsi: **mi serve vedere i passaggi, o solo la
risposta?**

**«Il mio agente modifica i file anche se gli ho detto di no.»**
Non è questione di istruzioni: è `tools` nel frontmatter. Se non gli dai `Write`
e `Edit`, non può, punto.

## Passo 7 — gli agenti in parallelo

**«Si sono pestati i piedi, ho sbagliato qualcosa?»**
No, ed è il punto dell'esercizio. Rispondi così e basta: «è voluto, leggi la
sezione dopo». Se glielo anticipi, l'esercizio non funziona.

**«È andato tutto liscio, quindi il passo non serve?»**
Con i modelli attuali è l'esito più probabile: provato il 13 settembre 2026,
diff perfetto. Il passo lo prevede. Rimandalo al secondo esito nel testo, e
fagli notare che ha funzionato perché erano due righe in ordine alfabetico.
La domanda da fargli: «e con quattro persone su una funzione intera?»

**«Ne è partito uno solo.»**
Capita se la richiesta non è esplicita. Deve dire «lancia due agenti in
parallelo» in una frase sola, non due richieste di fila.

## Passo 8 — il tuo plugin

**«`marketplace add` non trova niente.»**
Percorso sbagliato, quasi sempre relativo alla cartella da cui hanno lanciato
Claude. Fagli lanciare `claude plugin validate ./mio-plugin --strict` prima:
dice tutto.

**«Ho modificato la skill nel plugin e non cambia niente.»**
`/reload-plugins`. È scritto nell'esercizio ma nessuno lo legge finché non
succede.

## Passo 9 — il plugin da GitHub

**«`marketplace add` dice che esiste già.»**
Hanno pubblicato il loro plugin su GitHub e lo stanno aggiungendo sullo stesso
computer dove c'è la versione locale, con lo stesso `name`. Prima
`claude plugin marketplace remove mio-marketplace`, poi di nuovo `add`.

**«`install` non trova `git`.»**
Hanno scritto `workshop` o `git` dopo la chiocciola, oppure hanno sbagliato a
copiare il nome lungo. Il marketplace si chiama
`claude-fb-marketplace-demo-workshop`, come nel `marketplace.json`: fagli
lanciare `claude plugin marketplace list` e copiare da lì.

## Passo 10 — l'hook

**«L'ho registrato e non blocca niente.»**
Nell'ordine: `/hooks` nella sessione, deve elencare `PreToolUse`. Se non c'è,
quasi sempre è il JSON: una virgola in coda o un commento, che `settings.json`
non accetta. Se c'è ma non scatta, il `matcher` è scritto `bash` invece di
`Bash`, o il file sta in `~/.claude/` invece che in `.claude/` del progetto.

**«Dice "hook error" e Claude va avanti lo stesso.»**
Lo script è andato in errore per conto suo, non ha bloccato. Fagli lanciare a
mano `echo '{"tool_input":{"command":"npm install clsx"}}' | node
.claude/hooks/niente-dipendenze.mjs` e leggere l'errore: di solito un `import`
sbagliato o il file salvato con estensione `.js` in un progetto senza
`"type": "module"`.

**«Ha bloccato anche `npm install` da solo.»**
Ha copiato male il filtro sui pacchetti. Lo script dell'esercizio lascia
passare `npm install` senza argomenti: glielo faccio confrontare riga per
riga con quello nell'esercizio.

**«Claude ha aggiunto la dipendenza modificando package.json a mano.»**
Vero, l'hook guarda solo i comandi Bash. È una buona domanda, non un bug: la
risposta è un secondo `matcher` su `Edit|Write` che rifiuta `package.json`. Se
c'è tempo, glielo faccio aggiungere; è la stessa forma.

## Se uno si arena davvero

Il percorso è propedeutico, non selettivo. Se dopo venti minuti è ancora fermo,
digli di saltare al passo dopo e di segnarsi dove. In aula recuperi in cinque
minuti, e nel frattempo non perde le due ore.

L'unico passo che **non** può saltare è il 9: senza il plugin installato, in aula
non ha `commit` e `pr`, e le userà parecchio.
