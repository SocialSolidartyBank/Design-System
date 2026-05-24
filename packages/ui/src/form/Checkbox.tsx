import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...rest }, ref) => (
    <label className={cn("bss-checkbox-wrap", className)} htmlFor={id}>
      <input ref={ref} type="checkbox" id={id} className="bss-checkbox-input" {...rest} />
      <span className="bss-checkbox-box" aria-hidden />
      {label != null && <span>{label}</span>}
    </label>
  )
);
Checkbox.displayName = "Checkbox";
