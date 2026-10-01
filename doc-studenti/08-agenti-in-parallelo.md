> **Passo 8 · 10 minuti · da solo**

> ← [07 · Il tuo agente](07-il-tuo-agente.md) · [indice](../README.md) · [09 · Un plugin da GitHub](09-marketplace-su-github.md) →

# Due agenti in parallelo

Gli agenti si possono lanciare **insieme**. Se due lavori non dipendono l'uno dall'altro, il tempo è quello del più lento, non la somma.

Ma «non dipendono l'uno dall'altro» è una frase da guardare bene. È l'esercizio.

---

## Lanciali

Parti da un repo pulito (`git status`), poi nel terminale di Claude, una frase sola:

**Prompt:**

```
Lancia due agenti in parallelo: uno aggiunge il componente Avatar alla libreria,
l'altro aggiunge Tooltip. Ognuno tocca tutti e cinque i file.
```

Guardali partire insieme: due `Agent(…)` uno sotto l'altro, che lavorano nello stesso momento.

---

## Controlla

Non a occhio: con gli strumenti che hai costruito.

**Controllo visuale**
Apri la vetrina nel browser (http://localhost:5173): `Avatar` e `Tooltip` devono esserci tutti e due.

**Controllo automatico**

```bash
npm run check
```

Poi, a Claude:

**Prompt:**

```
/check-convenzioni
```

Un report tipico:

```
Avatar   ✅
Badge    ✅
Button   ✅
Callout  ✅
Stack    ✅
Tooltip  ⚠️  l'elemento più esterno è uno <span>, non rispetta la regola di ui.md
```

Quattro esiti possibili:

- **Tutto verde, tutti e due in vetrina.** È l'esito più probabile, e non è fortuna: ogni agente ha riletto i file condivisi un attimo prima di scrivere. Ha funzionato perché erano due righe ciascuno.

- **Uno dei due manca dalla vetrina, o `check-convenzioni` dice che gli manca una registrazione.** Due agenti hanno scritto lo stesso file nello stesso momento, e uno ha sovrascritto l'altro. Sistemalo con `/fix-conventions`, che è nato per questo.

- **`npm run check` è rosso.** Stessa causa, in forma più rumorosa: un export doppio, un import rotto. Incolla l'errore a Claude e fallo sistemare.

- **Un componente nuovo non rispetta una regola di `.claude/rules/`**, come il `Tooltip` qui sopra. Non è una collisione: è l'agente che ha scritto il file senza aver letto la regola — una regola con `paths` si carica quando Claude *apre* un file che corrisponde, e chi crea un file da zero può non aprirne nessuno. Qui `/fix-conventions Tooltip` non basta: cambiare l'elemento esterno è fuori dal suo confine, quindi si ferma e ti chiede. Fallo tu, con un prompt diretto:

  **Prompt:**

  ```
  Tooltip non rispetta la regola in .claude/rules/ui.md: sistemalo. Non cambiare altro.
  ```

  Poi `/check-convenzioni Tooltip` deve dire committabile.

Il punto non è quale esito hai avuto. È che i due lavori erano indipendenti **nel contenuto** ma non **nei file**: `src/components/index.ts`, `src/App.tsx` e `docs/componenti.md` li hanno toccati tutti e due. Due mani sullo stesso file, nello stesso momento, non possono sapere l'una dell'altra.

Quando è tutto a posto:

```bash
git add -A && git commit -m "feat: Avatar e Tooltip, in parallelo"
```

---

## Fatto

- [ ] `Avatar` e `Tooltip` sono tutti e due in vetrina
- [ ] `npm run check` passa e `check-convenzioni` dice committabile per tutti, `Avatar` e `Tooltip` compresi
- [ ] sai quali sono i tre file che entrambi gli agenti hanno toccato
- [ ] committato
