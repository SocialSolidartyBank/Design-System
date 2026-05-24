import type { ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CheckGroupProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
  children: ReactNode;
}

export function CheckGroup({ orientation = "vertical", className, children }: CheckGroupProps) {
  return (
    <div
      role="group"
      className={cn("bss-check-group", `bss-check-group-${orientation}`, className)}
    >
      {children}
    </div>
  );
}
