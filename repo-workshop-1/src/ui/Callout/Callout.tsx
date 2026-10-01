import type { ReactNode } from "react";

export interface CalloutProps {
  tone?: "info" | "warning";
  title: string;
  children: ReactNode;
}

/**
 * ⚠️ INCOMPLETO — di proposito.
 *
 * Questo componente esiste ed è corretto, ma gli manca qualcosa rispetto a
 * tutti gli altri. Scoprire **cosa** gli manca è l'esercizio del passo 4.
 * Non sistemarlo a mano prima di arrivarci.
 */
export function Callout({ tone = "info", title, children }: CalloutProps) {
  const toni = {
    info: "border-brand-500 bg-brand-50 text-brand-700",
    warning: "border-amber-400 bg-amber-50 text-amber-900",
  };

  return (
    <div className={`rounded-lg border-l-4 px-4 py-3 ${toni[tone]}`}>
      <p className="text-sm font-semibold">{title}</p>
      <div className="mt-1 text-sm opacity-90">{children}</div>
    </div>
  );
}
