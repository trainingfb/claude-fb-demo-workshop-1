import { Badge } from "./Badge";

export function BadgeExample() {
  return (
    <div className="vetrina-riga">
      <Badge>neutro</Badge>
      <Badge tone="success">pubblicato</Badge>
      <Badge tone="warning">bozza</Badge>
    </div>
  );
}
