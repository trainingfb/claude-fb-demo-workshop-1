import type { ReactNode } from "react";
import "./Stack.css";

export interface StackProps {
  direction?: "row" | "column";
  gap?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Stack({ direction = "column", gap = "md", children }: StackProps) {
  return (
    <div data-ui="stack" className={`ui-stack ui-stack--${direction} ui-stack--gap-${gap}`}>
      {children}
    </div>
  );
}
