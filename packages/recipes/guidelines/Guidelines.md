# @bss-ds/recipes — Guidelines

함세상 디자인 시스템의 **조립 패턴**. 원자 컴포넌트(`@bss-ds/ui`)를 모아서 v6 명세의 시그니처 모양을 한 줄에 만들어 줌. 에이전트가 이걸 가져다 변형만 하도록.

## v0.1 (이번 PR)

### HeroApplyCard
Hero 섹션의 시그니처 — light-grey bg 위에 흰 카드 + card-hero 그림자 + Primary 제출 버튼.

```tsx
<HeroApplyCard
  title="AI 동료와 함께 시작하기"
  description="2025년 하반기 모집 중"
  onSubmit={(e) => console.log(new FormData(e.currentTarget))}
>
  <Field label="이름" required><Input name="name" /></Field>
  <Field label="이메일" required><Input name="email" type="email" /></Field>
</HeroApplyCard>
```

### FullCardSection
White 섹션 안에 ink-deep 라운드박스를 띄우는 패턴 — 강조 메시지용.

```tsx
<FullCardSection
  emphasis="AI는"
  title="동료입니다"
>
  대체재가 아니라 함께 일하는 동료. 이 프로그램이 그 협업을 가르칩니다.
</FullCardSection>
```

## 사용 룰

- Recipe는 **그대로 가져다 쓰는 게 기본**. 색·spacing 변형이 필요하면 className으로 override보다 **새 recipe 추가**가 정답.
- Recipe 안의 색 결정은 5종 섹션 매트릭스를 따른 결과 — 함부로 바꾸지 말 것.
- Recipe가 너무 prop이 많아지면 → **2개로 쪼개기**. 한 recipe가 모든 케이스를 다루지 않아도 됨.

## 다음 추가 예정 (다음 PR)

- `ProgramCards` — primary bg + 흰 카드 3장 + step-circle 48px
- `ImpactStats` — light-grey bg + 통계 3장 (primary/dark-blue/ink)
- `SectionFlow` — white→primary→light-grey 자동 로테이션 wrapper
- `Hero` (split layout, headline + apply card)
- `Nav` (sticky blur)
- `Footer` (ink-deep)

## 새 recipe 작성 가이드

1. `design/DESIGN-SYSTEM.md`에서 명세된 패턴인지 확인 — 명세에 없으면 디자이너와 합의 먼저.
2. `src/<Name>.tsx`에 작성 — props 4개 이하 권장.
3. `src/styles.css`에 `.bss-<name>` 클래스로 스타일.
4. `src/index.ts`에 export.
5. Storybook에 default + 1~2 variants.
