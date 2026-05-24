import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...rest }, ref) => (
    <input ref={ref} type={type} className={cn("bss-input", className)} {...rest} />
  )
);
Input.displayName = "Input";
