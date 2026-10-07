---
paths:
  - "src/components/**/*.tsx"
---

# Regole dei componenti

- **L'elemento più esterno di ogni componente ha `data-ui="<nome>"`**, con il nome del componente in minuscolo: `<span data-ui="badge" …>`. I file `.example.tsx` no: sono vetrina, non componenti. Serve a riconoscere nel DOM cosa arriva dalla libreria.
