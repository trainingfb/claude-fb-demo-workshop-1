import { Button } from "./Button";

export function ButtonExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button>Salva</Button>
      <Button variant="secondary">Annulla</Button>
      <Button variant="ghost">Ignora</Button>
      <Button size="sm">Piccolo</Button>
      <Button disabled>Non disponibile</Button>
    </div>
  );
}
