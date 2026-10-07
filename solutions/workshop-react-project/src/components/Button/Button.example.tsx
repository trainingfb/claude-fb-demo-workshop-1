import { Button } from "./Button";

export function ButtonExample() {
  return (
    <div className="vetrina-riga">
      <Button>Salva</Button>
      <Button variant="secondary">Annulla</Button>
      <Button size="sm">Piccolo</Button>
      <Button variant="secondary" size="sm">
        Piccolo secondario
      </Button>
    </div>
  );
}
