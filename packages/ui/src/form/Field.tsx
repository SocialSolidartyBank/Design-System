import { useId, type ReactElement, type ReactNode, cloneElement, isValidElement } from "react";
import { cn } from "../lib/cn";
import { ErrorText } from "./ErrorText";

export interface FieldProps {
  label?: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  className?: string;
  /** Field wraps a single control (Input/Checkbox/etc.) and wires up id/aria. */
  children: ReactElement;
}

export function Field({ label, helper, error, required, className, children }: FieldProps) {
  const autoId = useId();
  const childId =
    isValidElement(children) && typeof children.props === "object" && children.props !== null
      ? (children.props as { id?: string }).id
      : undefined;
  const id = childId ?? autoId;
  const helperId = helper ? `${id}-helper` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const control = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        required,
      })
    : children;

  return (
    <div className={cn("bss-field", className)}>
      {label != null && (
        <label htmlFor={id} className="bss-field-label">
          {label}
          {required && <span aria-hidden style={{ color: "var(--color-negative)" }}> *</span>}
        </label>
      )}
      {control}
      {helper && !error && (
        <span id={helperId} className="bss-field-helper">{helper}</span>
      )}
      {error && <ErrorText id={errorId}>{error}</ErrorText>}
    </div>
  );
}
