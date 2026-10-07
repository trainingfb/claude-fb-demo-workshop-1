import type { ReactNode } from "react";
import "./Button.css";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  onClick?: () => void;
  children: ReactNode;
}

export function Button({ variant = "primary", size = "md", onClick, children }: ButtonProps) {
  return (
    <button
      data-ui="button"
      type="button"
      className={`ui-button ui-button--${variant} ui-button--${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
