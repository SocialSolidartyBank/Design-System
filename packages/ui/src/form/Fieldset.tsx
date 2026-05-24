import { forwardRef, type FieldsetHTMLAttributes, type ReactNode } from "react";
import { cn } from "../lib/cn";

export interface FieldsetProps extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  legend?: ReactNode;
}

export const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ legend, className, children, ...rest }, ref) => (
    <fieldset ref={ref} className={cn("bss-fieldset", className)} {...rest}>
      {legend != null && <legend className="bss-fieldset-legend">{legend}</legend>}
      {children}
    </fieldset>
  )
);
Fieldset.displayName = "Fieldset";
