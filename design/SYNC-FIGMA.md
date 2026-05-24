---
title: Figma Variables 동기화 가이드
created: 2026-05-24
type: ops-guide
---

# Figma ↔ 코드 토큰 양방향 sync (무료, OSS 도구만)

`tokens.json` 이 SSOT. Figma Variables는 시각 작업용 미러. **Tokens Studio Pro 사용 안 함** ($12/mo 비용 0).

## 방법 1: OSS 플러그인 사용 (권장)

### 추천 플러그인 (둘 중 하나, 모두 무료)

#### A. **Design Tokens** by Lukas Oppermann (DTCG 표준)
- Figma Community: <https://www.figma.com/community/plugin/888356646278934516/Design-Tokens>
- `tokens.json` (DTCG 포맷) 직접 import 가능
- 우리 `tokens.json` 이 이미 DTCG 표준 (`$value`, `$type` 필드) 이므로 바로 호환

#### B. **Variables Import Export** by Reza Mohammadkhani
- Figma Community: <https://www.figma.com/community/plugin/1253571037276959291/Variables-Import-Export-JSON>
- 더 단순한 JSON 포맷 (flat hex). 변환 한 번 필요 — `tokens-figma-flat.json` 사용

### 절차

#### 코드 → Figma (import)
1. Figma에서 새 파일 생성 (또는 기존 파일 열기)
2. 플러그인 실행 → **Import**
3. `design/tokens.json` (DTCG) 또는 `design/tokens-figma-flat.json` (flat) 선택
4. 5개 컬렉션 자동 생성: Colors · Typography · Spacing · Radius · Elevation
5. **Library publish** (오른쪽 패널 Assets → Publish library)
6. 다른 프로젝트가 이 라이브러리 구독 가능

#### Figma → 코드 (export)
1. Figma에서 Variables 값 수정 (디자이너 작업)
2. 플러그인 실행 → **Export**
3. 다운로드된 JSON → `design/tokens.json` 자리에 교체
4. Git PR 생성
5. CI에서 Style Dictionary 빌드 → `web/styles/tokens.css` 자동 갱신

## 방법 2: 수동 (Figma AI Make 활용)

플러그인 설치 안 하고 싶을 때:

1. Figma에서 직접 Variables 컬렉션 5개 생성
2. `design/DESIGN-SYSTEM.md` 의 컬러·타이포·spacing 테이블 보면서 값 입력
3. **Figma Make**에 프롬프트:
   > 첨부한 `tokens.json` 의 모든 컬러를 Figma Variables의 `Colors` 컬렉션으로 만들어줘. mode는 light/dark 두 개.
4. Make가 컨텍스트 읽고 Variables 생성 시도 (실험적, 결과 검수 필요)

## Figma Variables 구조 (5 컬렉션)

| 컬렉션 | 토큰 수 | 예시 |
|---|---|---|
| **Colors** | 19 | `primary`, `dark-blue`, `sky-blue`, `light-grey`, `ink-deep` 등 |
| **Typography** | 8 (ko) + 7 (en) | `h1`, `h2`, `body`, `caption` ··· lang 분기 |
| **Spacing** | 11 | `xs 4` ~ `7xl 160` |
| **Radius** | 5 | `md 12 · lg 16 · xl 24 · 2xl 32 · pill 9999` |
| **Elevation** | 4 | `none · card-soft · card-hero · full-card` |

## 양방향 sync 시나리오

### 디자이너 작업
1. Figma 열고 Variables 사용해 디자인
2. 컬러 톤 미세 조정 (예: `primary` 변경 시도)
3. 플러그인 Export → JSON 다운로드
4. GitHub repo `design/tokens.json` 자리에 교체 (PR)
5. 개발자 리뷰 후 머지 → CI가 `tokens.css` 재생성

### 개발자 작업
1. `tokens.json` 직접 수정 (예: 신규 컬러 추가)
2. Git push
3. 다음 디자인 세션에서 디자이너가 플러그인 Import 실행
4. Figma Variables 자동 갱신

## 비용 비교

| 도구 | 비용 | 양방향 자동화 | 추천 |
|---|---|---|---|
| **OSS 플러그인 (위 A/B안)** | $0 | 수동 import/export | ✅ |
| Tokens Studio Free | $0 | 단방향 (Figma → JSON만) | △ |
| Tokens Studio Pro | $12/mo | 완전 자동 (GitHub sync) | 불필요 |

이번 프로젝트는 **OSS 플러그인 + git PR 워크플로우**로 충분.

## Troubleshooting

### "값이 import 안 됨"
- `tokens.json` 이 valid JSON인지 확인: `python3 -c "import json; json.load(open('design/tokens.json'))"`
- DTCG 포맷이면 Design Tokens 플러그인 / flat hex면 Variables Import Export 플러그인 사용

### "Modes 설정 어떻게?"
- Figma Free plan: 1 mode만 (Light)
- Pro plan: 다중 mode (Light/Dark 가능)
- 우리는 light 단일 mode부터 시작

### "Library 구독이 안 됨"
- 라이브러리는 **publish** 되어야 함 (오른쪽 패널 Assets → Publish)
- 같은 organization 내 파일끼리만 구독 가능 (개인 Figma는 같은 계정 안 파일만)

## 참고 파일

- `design/tokens.json` — SSOT (DTCG 포맷)
- `design/tokens-figma-flat.json` — Variables Import Export 플러그인용 (flat 포맷)
- `design/DESIGN-SYSTEM.md` — 인간 가독 명세
- `design/preview.html` — 시각 검수 페이지 (Figma 작업 시 같이 보기)
