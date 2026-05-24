import type { FormEvent, ReactNode } from "react";
import { Button, Fieldset } from "@bss-ds/ui";
import { cn } from "./internal/cn";

export interface HeroApplyCardProps {
  /** 카드 상단 타이틀 (h3급, 27px). */
  title: ReactNode;
  /** 타이틀 아래 설명 한 줄. */
  description?: ReactNode;
  /** Field들이 들어가는 슬롯 (Fieldset 안에 자동으로 들어감). */
  children: ReactNode;
  /** 폼 제출 핸들러. preventDefault는 내부에서 호출됨. */
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** 제출 버튼 라벨. default `"신청하기"`. */
  submitLabel?: ReactNode;
  /** Fieldset legend는 보통 생략 (title이 그 역할). */
  legend?: ReactNode;
  className?: string;
}

/**
 * Hero 시그니처 카드. light-grey 섹션 위에 흰 카드 + card-hero 그림자.
 * 디자인 시스템 v6의 `apply-card` 패턴.
 */
export function HeroApplyCard({
  title,
  description,
  children,
  onSubmit,
  submitLabel = "신청하기",
  legend,
  className,
}: HeroApplyCardProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <section className={cn("bss-hero-apply", className)}>
      <form className="bss-hero-apply-inner" onSubmit={handleSubmit} noValidate>
        <h2 className="bss-hero-apply-title">{title}</h2>
        {description && <p className="bss-hero-apply-desc">{description}</p>}
        <Fieldset legend={legend}>{children}</Fieldset>
        <Button variant="primary" type="submit" className="bss-hero-apply-submit">
          {submitLabel}
        </Button>
      </form>
    </section>
  );
}
