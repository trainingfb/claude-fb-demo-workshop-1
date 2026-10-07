import type { ReactNode } from "react";
import { AvatarExample } from "./components/Avatar/Avatar.example";
import { BadgeExample } from "./components/Badge/Badge.example";
import { ButtonExample } from "./components/Button/Button.example";
import { CalloutExample } from "./components/Callout/Callout.example";
import { StackExample } from "./components/Stack/Stack.example";
import { TooltipExample } from "./components/Tooltip/Tooltip.example";
import "./App.css";

interface Voce {
  nome: string;
  descrizione: string;
  esempio: ReactNode;
}

// La registrazione è a mano, di proposito: niente scoperta automatica degli esempi.
const COMPONENTI: Voce[] = [
  {
    nome: "Avatar",
    descrizione: "Le iniziali di una persona in un cerchio, in tre dimensioni.",
    esempio: <AvatarExample />,
  },
  {
    nome: "Badge",
    descrizione: "Un'etichetta breve, per stati e categorie.",
    esempio: <BadgeExample />,
  },
  {
    nome: "Button",
    descrizione: "Il bottone, in due varianti e due dimensioni.",
    esempio: <ButtonExample />,
  },
  {
    nome: "Callout",
    descrizione: "Un riquadro di avviso con un titolo.",
    esempio: <CalloutExample />,
  },
  {
    nome: "Stack",
    descrizione: "Impaginazione in riga o in colonna, con spaziatura uniforme.",
    esempio: <StackExample />,
  },
  {
    nome: "Tooltip",
    descrizione: "Un suggerimento che compare al passaggio del mouse o al focus.",
    esempio: <TooltipExample />,
  },
];

function App() {
  return (
    <main className="vetrina">
      <header className="vetrina__header">
        <h1>Hello Workshop</h1>
        <p>{COMPONENTI.length} componenti nella vetrina.</p>
      </header>

      {COMPONENTI.map((voce) => (
        <section key={voce.nome} className="vetrina__scheda">
          <h2>{voce.nome}</h2>
          <p>{voce.descrizione}</p>
          <div className="vetrina__esempio">{voce.esempio}</div>
        </section>
      ))}
    </main>
  );
}

export default App;
