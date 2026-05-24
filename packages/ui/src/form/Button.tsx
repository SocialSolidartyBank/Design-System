import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export type ButtonVariant = "primary" | "dark" | "sky" | "white";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, type = "button", ...rest }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn("bss-btn", `bss-btn-${variant}`, className)}
      {...rest}
    />
  )
);
Button.displayName = "Button";
