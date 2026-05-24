# AGENTS.md — 함세상 Design System

이 파일은 모든 에이전트(Claude, Codex, Cursor, v0 등) 진입점. 시스템 사용·확장 룰을 한 곳에 요약.

## 한 줄 정의

`@bss-ds/tokens` (값) + `@bss-ds/ui` (Radix 기반 컴포넌트) + `@bss-ds/recipes` (조립 패턴). shadcn registry 호환, Figma 양방향, Figma Make 격리 환경 호환.

## 패키지 토폴로지

```
@bss-ds/tokens      (값 — React 의존 0)
       ↑
@bss-ds/ui          (컴포넌트 — Radix 기반 확장)
       ↑
@bss-ds/recipes     (조립 패턴)
```

## 사용 예 (한 줄 import)

```ts
// CSS 한 번 주입
import "@bss-ds/tokens/tokens.css";
import "@bss-ds/ui/styles.css";
import "@bss-ds/recipes/styles.css";

// 컴포넌트
import { Button, Field, Input, Checkbox, Fieldset } from "@bss-ds/ui";
import { HeroApplyCard, FullCardSection } from "@bss-ds/recipes";

// 토큰 값 (필요 시)
import { tokens } from "@bss-ds/tokens";
tokens.color.primary;          // "#006CB7"
tokens.spacing["2xl"];         // "32px"
```

## 5종 섹션 배경 매트릭스

테두리 없이 배경색만으로 위계. **sky-blue 섹션 bg 금지** — accent text 전용.

| bg | title | subtitle | body | emphasis | 권장 버튼 |
|---|---|---|---|---|---|
| canvas (white) | primary | ink-deep | ink | primary | dark + sky |
| light-grey | primary | ink-deep | ink | primary | dark + sky |
| primary | white | sky-blue-light | white | sky-blue | white + dark |
| dark-blue | white | white | white | sky-blue | white + primary |
| ink-deep | white | white | light-grey | sky-blue | white + primary |

연속 같은 색 섹션 금지. White→Primary→Light-Grey 로테이션 권장.

## 디자인 룰

### Do
1. 섹션 배경 5종만 사용.
2. Hero title은 ink-deep + 버튼은 primary+sky.
3. 다른 섹션 title은 primary (light bg) / white (dark bg).
4. 한글 자간 -2% 통일.
5. 카드 위 step-circle ↔ h4 ↔ body 간격 16px 고정.
6. 본문 사이즈 분기 금지. 강조는 weight 600으로만.
7. 이미지는 4 컬러박스 중 섹션과 어울리는 것 선택.
8. radius `xl 24` 가 버튼·카드 시그니처.

### Don't
1. `border: 1px solid` 사용 금지 — 모든 분리는 컬러 블록 대비로.
2. Eyebrow 라벨 (`"OUR PROGRAM"`) 금지.
3. Sky-blue 섹션 bg 금지 (text/icon 한정).
4. 한글 weight 900 금지 (800까지).
5. 사이즈 분기 (13/15/17 같은 어중간한 값) 금지.
6. 그라데이션 금지 — 단색 컬러박스만.

## 새 컴포넌트 추가

### 외부 (21st.dev / shadcn registry)
```bash
# 1. shadcn 공식 CLI 사용
npx shadcn add https://21st.dev/r/<component>

# 2. 또는 raw 소스를 transformer 통과
node scripts/transformer/transform.mjs raw.tsx packages/ui/src/<category>/<Name>.tsx
```

Transformer 자동 적용:
- `bg-white` → `bg-canvas`
- `rounded-lg`/`rounded-md` → `rounded-xl`
- `border border-zinc-200` → 제거 (테두리 없음 룰)
- `shadow-md` → `shadow-card-soft`

매핑 테이블: `scripts/transformer/token-map.json`.

추가 후:
1. `packages/ui/src/index.ts` 에 export 추가
2. Storybook stories 작성 (`apps/storybook/stories/<category>/<Name>.stories.tsx`)
3. `pnpm build` 검증

### 자체 작성 (recipes)
`design/DESIGN-SYSTEM.md` 명세된 패턴만 recipe로. 명세에 없으면 디자이너 합의 먼저. 추가 절차는 `packages/recipes/guidelines/Guidelines.md` 참조.

## Figma 양방향 동기화

**`tokens.json` 이 SSOT**. Figma는 시각 편집기 + 미러.

### Figma → Code (디자이너 변경 가져오기)
- Claude Code 자연어: "Figma 변경 가져와줘"
- 또는 슬래시: `/sync-figma`
- 자동으로 `mcp__Figma__get_variable_defs` → diff → PR 생성

자세한 절차: `docs/figma-sync-flow.md`

### Code → Figma (개발자 변경 반영)
- `design/tokens.json` 수정 → PR → 머지
- 디자이너가 Figma Make에 프롬프트: "GitHub의 `tokens.json` 을 읽어서 이 파일의 Variables 컬렉션 갱신해줘"
- 또는 OSS 플러그인 (Design Tokens by Lukas Oppermann) Import — `design/SYNC-FIGMA.md` 참조

## 빌드 커맨드

| 명령 | 동작 |
|---|---|
| `pnpm install` | 의존성 설치 |
| `pnpm tokens` | tokens.json → 3종 산출물 재생성 |
| `pnpm build` | 전체 빌드 (tokens → packages → registry) |
| `pnpm sb` | Storybook 띄우기 (http://localhost:6006) |
| `pnpm sb:build` | Storybook 정적 빌드 |
| `pnpm sync:figma` | Figma sync placeholder (실제는 Claude MCP 권장) |

## SSOT 위치

- 디자인 명세: `design/DESIGN-SYSTEM.md`
- 토큰 값: `design/tokens.json`
- Figma sync 절차: `design/SYNC-FIGMA.md`
- PM 운영 매뉴얼: `docs/figma-sync-flow.md`
- 패키지별 사용 룰: `packages/{tokens,ui,recipes}/guidelines/Guidelines.md`
