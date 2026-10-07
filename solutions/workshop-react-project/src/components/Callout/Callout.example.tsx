import { Callout } from "./Callout";

export function CalloutExample() {
  return (
    <div className="vetrina-colonna">
      <Callout title="Da sapere">Le modifiche si salvano da sole.</Callout>
      <Callout title="Attenzione" tone="warning">
        Questa operazione non si può annullare.
      </Callout>
    </div>
  );
}
