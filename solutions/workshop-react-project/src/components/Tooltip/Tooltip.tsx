import type { ReactNode } from "react";
import "./Tooltip.css";

export interface TooltipProps {
  tip: ReactNode;
  position?: "top" | "bottom";
  children: ReactNode;
}

// Si apre al passaggio del mouse e al focus, solo con il CSS: nessuno stato.
export function Tooltip({ tip, position = "top", children }: TooltipProps) {
  return (
    <span data-ui="tooltip" className="ui-tooltip">
      {children}
      <span role="tooltip" className={`ui-tooltip__tip ui-tooltip__tip--${position}`}>
        {tip}
      </span>
    </span>
  );
}
