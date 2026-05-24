import type { HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ErrorTextProps = HTMLAttributes<HTMLSpanElement>;

export function ErrorText({ className, children, ...rest }: ErrorTextProps) {
  return (
    <span role="alert" className={cn("bss-error-text", className)} {...rest}>
      {children}
    </span>
  );
}
