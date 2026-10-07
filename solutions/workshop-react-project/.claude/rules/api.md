# API dei componenti

- **Il testo visibile di un componente arriva da `children`.** Niente prop `text`, `label` o `content` per il contenuto: si scrive `<Badge>Nuovo</Badge>`, non `<Badge text="Nuovo" />`. Così ogni componente si usa allo stesso modo, e dentro ci può stare anche altro markup.
