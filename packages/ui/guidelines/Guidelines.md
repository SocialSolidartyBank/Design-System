# @bss-ds/ui — Guidelines

함세상 디자인 시스템의 UI 컴포넌트. Radix 기반으로 확장될 예정 (Dialog/Popover/Tabs 등은 `npx shadcn add`로 흡수).

## 설치

```bash
pnpm add @bss-ds/ui @bss-ds/tokens
```

`@bss-ds/tokens`의 CSS와 `@bss-ds/ui`의 styles.css를 한 번 주입:
```ts
import "@bss-ds/tokens/tokens.css";
import "@bss-ds/ui/styles.css";
```

## 컴포넌트 (v0.1)

### Button
```tsx
<Button variant="primary">신청하기</Button>
<Button variant="dark">자세히 보기</Button>
<Button variant="sky">취소</Button>
<Button variant="white">로그인</Button>
```
- variant: `'primary' | 'dark' | 'sky' | 'white'` (default `primary`)
- **사이즈 prop 없음** (룰: 사이즈 분기 금지)
- radius `xl 24` 고정, padding `md xl` 고정

### Fieldset
```tsx
<Fieldset legend="신청 정보">
  <Field label="이름"><Input /></Field>
  <Field label="이메일"><Input type="email" /></Field>
</Fieldset>
```

### Field
- label + control + (helper | error) 묶음
- 자동으로 `<label htmlFor>` 연결, `aria-describedby`/`aria-invalid` 자동
- error 있으면 helper 안 보임 (둘 동시 표시 안 함)

### Input / Checkbox / CheckGroup / ErrorText
- Input: 테두리 없음, bg `light-grey`, focus 시 primary outline
- Checkbox: 네이티브 input + 가짜 박스
- CheckGroup: `orientation: 'vertical' | 'horizontal'`
- ErrorText: `role="alert"`, negative 색

## 사용 룰

### Do
- 항상 `Fieldset > Field > 컨트롤` 구조 사용
- label은 **Field가 자동 처리** — 직접 `<label>` 쓰지 말 것
- 에러 표시는 **ErrorText만** — Input에 red border 만들지 말 것 (테두리 없음 룰)
- 폼 제출 버튼은 Button `variant="primary"` (Hero) 또는 `variant="dark"` (보조)

### Don't
- 사이즈 prop 만들지 말 것 (룰: 사이즈 분기 금지)
- border / outline prop 만들지 말 것 (룰: 테두리 없음)
- variant `'sky'`는 title이 primary일 때만 — title이 ink-deep이면 primary 사용

## 새 컴포넌트 추가 (Radix/21st.dev 등)

이번 v0.1은 form 7개만. 다음 컴포넌트 추가 시:

```bash
# 21st.dev 또는 shadcn registry에서:
npx shadcn add <url>

# 또는 raw 소스를 가져왔다면 transformer로 토큰 치환:
node scripts/transformer/transform.mjs < raw-dialog.tsx > packages/ui/src/overlay/Dialog.tsx
```

자동으로:
- `bg-white` → `bg-canvas`
- `rounded-lg` → `rounded-xl`
- `border border-zinc-200` → 제거 (테두리 없음 룰)
- 등 매핑 적용 (`scripts/transformer/token-map.json` 참조)

추가 후 `src/index.ts`에 export, Storybook stories 작성.

## Radix vs React Aria

기본은 **Radix** (shadcn/21st.dev 호환). 특정 컴포넌트가 더 깊은 a11y 필요(복잡한 Combobox, DateRangePicker 등) 시 React Aria 기반 직접 구현으로 fork.
