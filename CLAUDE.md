# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 한 줄 요약

함세상 디자인 시스템 모노레포. `@bss-ds/tokens` (값) + `@bss-ds/ui` (컴포넌트) + `@bss-ds/recipes` (조립 패턴). pnpm workspaces · tsup · React 18 peer · shadcn registry 호환 · Figma 양방향.

**전체 사용 룰은 `AGENTS.md` 참조.** 이 파일은 Claude Code 특화 운영 가이드.

## 빌드 커맨드

| 명령 | 동작 |
|---|---|
| `pnpm install` | 의존성 설치 |
| `pnpm tokens` | `design/tokens.json` → CSS/Tailwind preset/TS 상수 재생성 |
| `pnpm build` | 전체 빌드 (tokens → packages → registry) |
| `pnpm sb` | Storybook 띄우기 (`localhost:6006`) |
| `pnpm sb:build` | Storybook 정적 빌드 (PR 미리보기용) |

## 토큰 변경 워크플로우 (6단계)

1. `design/tokens.json` 수정 (DTCG 포맷, `{a.b}` 참조 지원)
2. `pnpm tokens` 실행
3. 산출물 검증:
   - `packages/tokens/src/tokens.css` 에 `--color-*` 갱신 확인
   - `packages/tokens/tailwind.preset.cjs` require 가능한지 확인
   - `packages/tokens/src/index.ts` TS 컴파일 통과 확인
4. `pnpm -r build` → ui/recipes 재빌드
5. `pnpm sb` 띄워서 시각 변화 확인
6. 커밋 + PR

## Figma MCP 사용

다음 도구들이 MCP로 노출됨 (deferred — 호출 전 `ToolSearch`로 schema 로드):

- `mcp__Figma__get_variable_defs` — 선택한 Figma 파일/노드의 Variables 읽기
- `mcp__Figma__get_design_context` — 디자인 컨텍스트 (선택 영역의 토큰 사용 정보)
- `mcp__Figma__get_metadata` — 라이브러리/모드 메타
- `mcp__Figma__get_screenshot` — 캡처
- `mcp__Figma__get_code_connect_map` / `add_code_connect_map` — 코드↔컴포넌트 매핑

### Figma 변경 가져오기 (단축)

PM 또는 사용자가 "Figma 변경 가져와줘" / `/sync-figma` 입력 시:

1. `mcp__Figma__get_variable_defs` 호출
2. `design/tokens.json` Read
3. Diff 계산, 한국어 요약
4. 룰 위반 감지 (sky-blue 섹션 bg, 한글 weight 900, 어중간한 사이즈)
5. `design/tokens.json` 의 leaf `$value` 만 patch
6. `pnpm tokens` 실행 검증
7. 새 브랜치 `figma-sync/YYYYMMDD-HHmm` + PR 생성

상세 절차: `.claude/commands/sync-figma.md`.

## 새 컴포넌트 추가 (외부 흡수)

21st.dev / shadcn 컴포넌트는 transformer로 토큰 치환 후 흡수:

```bash
# raw 소스 받아오기 (curl 또는 사용자가 붙여넣음)
node scripts/transformer/transform.mjs raw-dialog.tsx packages/ui/src/overlay/Dialog.tsx

# 의존 Radix primitive 설치
pnpm --filter @bss-ds/ui add @radix-ui/react-dialog

# index.ts 에 export 추가
# Storybook stories 작성
pnpm build
```

매핑 테이블: `scripts/transformer/token-map.json`. 새 외부 클래스 발견 시 매핑 추가.

## OMC 에이전트 라우팅

- **executor** (sonnet/opus) — 다중 파일 변경, 컴포넌트 추가, recipe 작성
- **document-specialist** — Radix/shadcn API 사용법 확인
- **code-reviewer** — 룰 위반 검수 (테두리 사용·sky-blue bg·사이즈 분기)
- **verifier** — 빌드/Storybook 검증

복잡한 작업은 executor 위임, 검증은 별도 lane.

## 디자인 룰 (요약)

전체는 `AGENTS.md` + `design/DESIGN-SYSTEM.md` 참조.

**금지 (코드/PR에서 자동 차단할 것)**:
- `border: 1px solid` 사용
- Eyebrow 라벨 (`"OUR PROGRAM"` 등)
- Sky-blue 섹션 bg
- 한글 weight 900
- 어중간한 사이즈 (13/15/17 등)
- 그라데이션

**필수**:
- 5종 섹션 배경 매트릭스 준수
- 한글 자간 -2%
- 사이즈는 토큰 enum만 (임의 px 거부)
- 본문 강조는 weight 600

## 산출물 위치

- 빌드 산출물: `packages/*/dist/`
- 생성된 토큰: `packages/tokens/src/tokens.css`, `tailwind.preset.cjs`, `src/index.ts` (gitignored)
- shadcn registry: `registry/*.json` (gitignored)
- Storybook 정적: `apps/storybook/storybook-static/` (gitignored)
