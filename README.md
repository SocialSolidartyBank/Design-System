# 함세상 Design System

사회연대은행 함세상의 웹 디자인 시스템. v6 명세 기반.

## 빠른 시작

```bash
pnpm install
pnpm build           # 토큰 → 패키지 → registry 전부 빌드
pnpm sb              # Storybook 열기 (http://localhost:6006)
```

## 패키지

- **`@bss-ds/tokens`** — 색·간격·타이포·radius·elevation 값
- **`@bss-ds/ui`** — Button, Input, Field, Checkbox, … (Radix 기반 확장 예정)
- **`@bss-ds/recipes`** — HeroApplyCard, FullCardSection 등 조립 패턴

## 주요 문서

- [`AGENTS.md`](./AGENTS.md) — 모든 에이전트(Claude/Codex/Cursor) 진입점
- [`CLAUDE.md`](./CLAUDE.md) — Claude Code 운영 매뉴얼
- [`design/DESIGN-SYSTEM.md`](./design/DESIGN-SYSTEM.md) — v6 명세 (SSOT)
- [`design/SYNC-FIGMA.md`](./design/SYNC-FIGMA.md) — Figma 동기화 절차
- [`docs/figma-sync-flow.md`](./docs/figma-sync-flow.md) — PM 1페이지 매뉴얼

## 핵심 룰

테두리 없음 · 그라데이션 없음 · 5종 섹션 배경 · sky-blue 섹션 bg 금지 · 한글 자간 -2% · weight 900 금지 · 사이즈 분기 금지.

자세한 내용은 [`design/DESIGN-SYSTEM.md`](./design/DESIGN-SYSTEM.md) 참조.
