import type { ReactNode } from "react";
import "./Badge.css";

export interface BadgeProps {
  tone?: "neutral" | "success" | "warning";
  children: ReactNode;
}

export function Badge({ tone = "neutral", children }: BadgeProps) {
  return (
    <span data-ui="badge" className={`ui-badge ui-badge--${tone}`}>
      {children}
    </span>
  );
}
