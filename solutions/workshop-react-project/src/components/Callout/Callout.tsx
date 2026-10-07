import type { ReactNode } from "react";
import "./Callout.css";

export interface CalloutProps {
  title: string;
  tone?: "info" | "warning";
  children: ReactNode;
}

export function Callout({ title, tone = "info", children }: CalloutProps) {
  return (
    <div data-ui="callout" className={`ui-callout ui-callout--${tone}`}>
      <p className="ui-callout__title">{title}</p>
      <div className="ui-callout__body">{children}</div>
    </div>
  );
}
