import { Badge } from "./Badge";

/**
 * L'esempio serve a due cose: si vede nella vetrina, e dice a chi legge
 * quali props esistono davvero senza aprire il componente.
 */
export function BadgeExample() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge>neutro</Badge>
      <Badge tone="success">pubblicato</Badge>
      <Badge tone="warning">bozza</Badge>
      <Badge tone="danger">errore</Badge>
    </div>
  );
}
