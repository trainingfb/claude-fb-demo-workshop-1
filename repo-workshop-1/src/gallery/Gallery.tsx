import type { ReactNode } from "react";
import { BadgeExample } from "../ui/Badge/Badge.example";
import { ButtonExample } from "../ui/Button/Button.example";
import { StackExample } from "../ui/Stack/Stack.example";

/**
 * La vetrina: mostra un esempio per componente.
 *
 * La registrazione è a mano, e resta a mano di proposito. Si potrebbe scoprire
 * gli esempi da soli con `import.meta.glob`, ma allora questo passo sparirebbe
 * e con lui metà del motivo per cui esiste questo progetto.
 */
const COMPONENTI: { nome: string; descrizione: string; esempio: ReactNode }[] = [
  {
    nome: "Badge",
    descrizione: "Un'etichetta breve, per stati e categorie.",
    esempio: <BadgeExample />,
  },
  {
    nome: "Button",
    descrizione: "Il bottone, in tre varianti e due dimensioni.",
    esempio: <ButtonExample />,
  },
  {
    nome: "Stack",
    descrizione: "Impaginazione in riga o in colonna, con spaziatura uniforme.",
    esempio: <StackExample />,
  },
];

export function Gallery() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <header className="border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight">UI Kit</h1>
        <p className="mt-1 text-sm text-slate-500">
          {COMPONENTI.length} componenti nella vetrina. Se ne hai appena aggiunto uno e non lo
          vedi qui, non l&apos;hai registrato.
        </p>
      </header>

      <div className="mt-8 space-y-6">
        {COMPONENTI.map((componente) => (
          <section
            key={componente.nome}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <h2 className="font-mono text-sm font-semibold text-brand-700">{componente.nome}</h2>
            <p className="mt-0.5 text-sm text-slate-500">{componente.descrizione}</p>
            <div className="mt-5 rounded-lg bg-slate-50 p-5">{componente.esempio}</div>
          </section>
        ))}
      </div>
    </div>
  );
}
