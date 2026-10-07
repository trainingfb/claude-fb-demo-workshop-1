import type { ReactNode } from "react";
import "./Avatar.css";

export interface AvatarProps {
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Avatar({ size = "md", children }: AvatarProps) {
  return (
    <span data-ui="avatar" className={`ui-avatar ui-avatar--${size}`}>
      {children}
    </span>
  );
}
