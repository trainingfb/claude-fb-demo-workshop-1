import type { ReactNode } from "react";

export interface BadgeProps {
  tone?: "neutral" | "success" | "warning" | "danger";
  children: ReactNode;
}

/**
 * ✅ GIÀ FATTO — è il modello di riferimento per tutti gli altri.
 *
 * Guarda cosa NON c'è qui dentro: nessuna fetch, nessuna decisione di dominio,
 * nessuno stato. Riceve delle props e rende del markup. È tutto.
 */
export function Badge({ tone = "neutral", children }: BadgeProps) {
  const toni = {
    neutral: "bg-slate-100 text-slate-700 ring-slate-200",
    success: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    warning: "bg-amber-50 text-amber-800 ring-amber-200",
    danger: "bg-red-50 text-red-700 ring-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${toni[tone]}`}
    >
      {children}
    </span>
  );
}
