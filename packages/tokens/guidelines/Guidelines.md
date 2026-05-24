# @bss-ds/tokens — Guidelines

함세상 디자인 시스템의 모든 값(색·간격·타이포·radius·elevation)을 담는 SSOT 미러 패키지. `design/tokens.json`이 진짜 원본이고 이 패키지는 빌드 산출물.

## 사용법

### CSS 변수 주입
```ts
import "@bss-ds/tokens/tokens.css";
```
모든 토큰이 `:root`에 CSS 변수로 노출됨 (`--color-primary`, `--space-2xl`, `--radius-xl` 등).

### Tailwind preset
```js
// tailwind.config.cjs
module.exports = {
  presets: [require("@bss-ds/tokens/tailwind-preset")],
  content: ["./src/**/*.{ts,tsx}"],
};
```
이후 `bg-primary`, `p-2xl`, `rounded-xl`, `text-h1` 같은 클래스 그대로 사용.

### TypeScript 상수
```ts
import { tokens } from "@bss-ds/tokens";
tokens.color.primary;        // "#006CB7"
tokens.spacing["2xl"];       // "32px"
tokens.typography.h1;        // composite
```

## 5종 섹션 배경 매트릭스

테두리 없이 배경색만으로 위계. **sky-blue 섹션 bg 금지** — accent text 전용.

| bg | title | subtitle | body | emphasis | 버튼 |
|---|---|---|---|---|---|
| `canvas` (white) | primary | ink-deep | ink | primary | dark + sky |
| `light-grey` | primary | ink-deep | ink | primary | dark + sky |
| `primary` | white | sky-blue-light | white | sky-blue | white + dark |
| `dark-blue` | white | white | white | sky-blue | white + primary |
| `ink-deep` | white | white | light-grey | sky-blue | white + primary |

## Do's

- 섹션 색은 위 5종만. 연속 같은 색 금지 (white→primary→light-grey 로테이션).
- 타이틀이 primary일 때 버튼은 sky/dark (primary 중복 금지).
- 한글 자간 -2% 통일 (Pretendard 가독성 sweet spot).
- 본문은 18px 고정. 강조는 weight 600으로만.

## Don'ts

- 테두리(`border: 1px solid`) 사용 금지 — 모든 분리는 컬러 블록 대비로.
- Eyebrow 라벨(`"OUR PROGRAM"`) 금지 — AI-style 안티패턴.
- Sky-blue 섹션 bg 금지 (accent text 한정).
- 한글 weight 900 금지 (800까지).
- 사이즈 분기 (13/15/17 등 어중간한 값) 금지.
- 그라데이션 금지 — 단색 컬러박스만.

## 토큰 변경 절차

1. `design/tokens.json` 수정 (또는 Figma에서 변경 → `/sync-figma`)
2. `pnpm tokens` 실행 → CSS/preset/TS 재생성
3. `pnpm -r build` → 의존 패키지 재빌드
