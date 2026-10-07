import { Button } from "../Button/Button";
import { Tooltip } from "./Tooltip";

export function TooltipExample() {
  return (
    <div className="vetrina-riga">
      <Tooltip tip="Salva le modifiche">
        <Button>Sopra</Button>
      </Tooltip>
      <Tooltip tip="Torna indietro" position="bottom">
        <Button variant="secondary">Sotto</Button>
      </Tooltip>
    </div>
  );
}
