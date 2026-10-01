# I componenti della libreria

Una riga per componente. Si aggiorna a mano quando ne arriva uno nuovo.

| Componente | A cosa serve | Props principali |
|---|---|---|
| `Badge` | Un'etichetta breve, per stati e categorie | `tone`, `children` |
| `Button` | Il bottone, in tre varianti | `variant`, `size`, `disabled`, `onClick` |
| `Callout` | Un riquadro di avviso con titolo | `tone`, `title`, `children` |
| `Stack` | Impaginazione in riga o colonna | `direction`, `gap`, `align` |

> Questa tabella è il quinto dei cinque file da toccare quando aggiungi un
> componente. Gli altri quattro sono il componente stesso, il suo esempio,
> l'export in `src/index.ts` e la registrazione in `src/gallery/Gallery.tsx`.
