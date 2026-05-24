import type { ReactNode } from "react";
import { cn } from "./internal/cn";

export interface FullCardSectionProps {
  /** 큰 타이틀 (h2급, 56px). */
  title: ReactNode;
  /** 타이틀 안에서 강조할 부분 — sky-blue로 색 입혀짐. title보다 우선 렌더. */
  emphasis?: ReactNode;
  /** 본문 (선택). light-grey 색. */
  children?: ReactNode;
  className?: string;
}

/**
 * ink-deep 라운드박스를 white 섹션 안에 띄우는 패턴.
 * 디자인 시스템 v6의 "Full-Card" 시그니처.
 * 강한 lift 그림자 + 큰 max-width 1200.
 */
export function FullCardSection({
  title,
  emphasis,
  children,
  className,
}: FullCardSectionProps) {
  return (
    <section className={cn("bss-full-card", className)}>
      <div className="bss-full-card-inner">
        <h2 className="bss-full-card-title">
          {emphasis && (
            <>
              <span className="bss-full-card-emphasis">{emphasis}</span>{" "}
            </>
          )}
          {title}
        </h2>
        {children && <p className="bss-full-card-body">{children}</p>}
      </div>
    </section>
  );
}
