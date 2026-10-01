DURATA: 10 minuti

> **Passo 4 · 10 minuti · da solo**
> ← [03 · Le regole](03-le-regole.md) · [indice](../README.md) · [05 · Leggere una skill](05-leggere-una-skill.md) →

# Pensare prima di scrivere

C'è una modalità in cui Claude **non tocca niente**: legge, ragiona, e ti propone un piano. Approvi tu, e solo allora scrive.

Si entra con `/plan`, oppure premendo **shift+tab** finché non compare `plan mode`.

## Provalo sulla cosa sbagliata

Chiedi, **senza** plan mode:

> Aggiungi un sistema di temi alla libreria, chiaro e scuro.

È probabile che inizi a farti qualche domanda per ragionare sul problema insieme a te.
Guarda cosa comincia a fare per un paio di minuti e fagli scrivere qualche file.

Poi ad un certo punto **fermalo** con esc, e annulla l'operazione.

**Elimina le modifiche effettuate**

Assicurati di eliminare tutte le modifiche che potrebe già aver effettuato e tornare al punto di partenza:

```bash
git checkout . && git clean -fd
```

---

## Adesso con il Plan Mode

Entra in plan mode e chiedi la stessa identica cosa.

Stavolta ottieni un piano da leggere prima che esista una riga di codice. 
Leggi cosa aveva capito (puoi scrollare il terminale di Claude per vederlo tutto) e cosa aveva deciso da solo.


**Non approvarlo.** Esci e basta: il tema non ci serve.

## Quando serve davvero

Non sempre. Per aggiungere un `Badge` è tempo perso.

Serve quando la cosa da fare tocca più file, o quando non sei sicuro di aver spiegato bene cosa vuoi. Il piano è il posto più economico dove scoprire che vi eravate capiti male: cambiarlo costa una frase, cambiare il codice costa mezz'ora.


> Il plan mode è anche utile per ragionare insieme all'AI, fargli domande e discutere su uno specifico problema.
> Per esempio, potresti chiedergli quali sono i pro e i contro di ogni approccio, o quali sono i rischi associati a ciascuna soluzione.



## Fatto

- [ ] hai visto la stessa richiesta con e senza piano
- [ ] il repo è pulito: `git status` non mostra niente




**Elimina le modifiche effettuate**

Il Plan mode non scrive su disco ma qualora lo avessi approvato, assicurati di eliminare tutte le modifiche che potrebe già aver effettuato e tornare al punto di partenza:

```bash
git checkout . && git clean -fd
```