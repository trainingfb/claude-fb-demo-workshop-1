import type { ReactNode } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}

/**
 * ✅ GIÀ FATTO.
 *
 * Lo stato disabilitato si deve **vedere**, non solo non funzionare: un
 * bottone che sembra premibile e non lo è fa perdere dieci secondi a tutti.
 */
export function Button({
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  onClick,
  children,
}: ButtonProps) {
  const varianti = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    secondary: "bg-white text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50",
    ghost: "text-slate-700 hover:bg-slate-100",
  };

  const dimensioni = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${varianti[variant]} ${dimensioni[size]}`}
    >
      {children}
    </button>
  );
}
