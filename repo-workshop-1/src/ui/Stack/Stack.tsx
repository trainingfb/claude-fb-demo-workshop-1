import type { ReactNode } from "react";

export interface StackProps {
  direction?: "row" | "column";
  gap?: "sm" | "md" | "lg";
  align?: "start" | "center" | "end";
  children: ReactNode;
}

/**
 * ✅ GIÀ FATTO — una primitiva di impaginazione.
 *
 * Le classi stanno in mappe e non costruite al volo con i template string:
 * Tailwind legge i nomi di classe **interi** nel sorgente, quindi una classe
 * composta a runtime non finisce nel CSS generato.
 */
export function Stack({ direction = "column", gap = "md", align, children }: StackProps) {
  const direzioni = {
    row: "flex-row",
    column: "flex-col",
  };

  const spazi = {
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-8",
  };

  const allineamenti = {
    start: "items-start",
    center: "items-center",
    end: "items-end",
  };

  return (
    <div
      className={`flex ${direzioni[direction]} ${spazi[gap]} ${align ? allineamenti[align] : ""}`}
    >
      {children}
    </div>
  );
}
