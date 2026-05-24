---
title: 함세상 디자인 시스템 v6
created: 2026-05-23
updated: 2026-05-24
type: design-system
status: final-v6
based_on: WISE platform · 사회연대은행 함세상 키트 · Toss 한글 패턴
---

## Overview

함세상(사회연대은행 · 함께만드는세상) 웹 디자인 시스템 — 회사 기존 브랜드 자산(blue · Pretendard)을 웹용으로 정리해 명세화한 SSOT.

세 출처가 한 시스템으로 합쳐졌다:
- **구조는 WISE**: 24px rounded · 시원한 여백 · hero split layout · 섹션 로테이션
- **값은 함세상**: blue `#006CB7` · dark-blue · ink · Pretendard
- **위계는 Toss**: 한글 본문 18 · LH 170% · 자간 -2%

### 8가지 디자인 원칙
1. **테두리 없음** — 모든 분리는 컬러 블록 대비로.
2. **5종 섹션 배경** — white · light-grey · primary · dark-blue · ink-deep. **sky-blue는 accent text 한정**.
3. **3가지 핵심 대비 쌍** — Primary↔White · Dark-Blue↔Sky-Blue · White↔Light-Grey.
4. **타이틀이 Primary면 버튼은 sky/dark** (primary 중복 금지). Hero처럼 타이틀이 Ink-Deep이면 버튼 Primary OK.
5. **Primary bg 위 텍스트는 white + sky-blue-light + sky-blue 3색 mix**.
6. **시원한 여백** — 섹션 5xl(96) · Hero 7xl(160) · 카드 2xl(32) · apply-card 3xl(48).
7. **그라데이션 최소화** — 단색 컬러박스로.
8. **"꼭 필요한가?"** — eyebrow / 부가 라벨 / 사이즈 분기 의심하고 제거.

---

## Section Background Matrix

| bg | Title | Subtitle | Body | Body Mute | Emphasis | 권장 버튼 |
|---|---|---|---|---|---|---|
| **white** | primary (또는 ink-deep) | ink-deep | ink | grey | primary | dark + sky (또는 primary+sky 시 title=ink-deep) |
| **light-grey** | primary | ink-deep | ink | grey | primary | dark + sky |
| **primary** | white | sky-blue-light | white | sky-blue-light | sky-blue | white + dark |
| **dark-blue** | white | white | white | light-grey | sky-blue | white + primary |
| **ink-deep** | white (또는 sky-blue) | white | light-grey | grey | sky-blue | white + primary / sky |

---

## Colors

### Brand
| 토큰 | Hex | 역할 |
|---|---|---|
| `primary` | `#006CB7` | 메인 CTA · 섹션 bg 옵션 · accent text |
| `primary-active` | `#338BC9` | 호버 |
| `dark-blue` | `#26257C` | 보조 CTA · 강조 · 섹션 bg 옵션 |
| `dark-blue-active` | `#3D3CA0` | 호버 |
| `ink-deep` | `#0A1E33` | Second 타이틀 · 가장 어두운 섹션 bg · Hero title |
| `ink` | `#1A1B1F` | 본문 |

### Surface
| 토큰 | Hex | 역할 |
|---|---|---|
| `canvas` | `#FFFFFF` | 기본 섹션 bg |
| `light-grey` | `#ECF0F3` | 서브 섹션 bg · input bg · dark 위 본문 강조 |

### Text
| 토큰 | Hex | 역할 |
|---|---|---|
| `body` | `#454745` | 2차 본문 |
| `grey` | `#7B7875` | secondary · caption |

### Accent (text-only)
| 토큰 | Hex | 역할 |
|---|---|---|
| `sky-blue` | `#58C5FF` | accent · button-sky · 강조 |
| `sky-blue-light` | `#CDEAFF` | primary bg 위 subtitle/body-mute (sky-blue → white 65% mix) |

### Semantic
positive `#00A775` · warning `#FAA41A` · negative `#F16A26`

---

## Typography — H1~H4 semantic

한글 Pretendard / 영문 Satoshi (Fontshare). lang 분기로 자동 전환.

| Token | 한글 (Pretendard) | 영문 (Satoshi) | weight (ko/en) | LH (ko/en) | LS (ko/en) | 용도 |
|---|---|---|---|---|---|---|
| `h1` | **64px** | **80px** | 800 / **700** | 115% / 108% | -2% / -3% | Hero (페이지당 1) |
| `h2` | **56px** | **64px** | 700 | 118% / 110% | -2% / -2.5% | 섹션 타이틀 |
| `h3` | **40px** | **40px** | 700 | 125% / 120% | -2% / -1.5% | 서브 섹션 / 큰 카드 |
| `h4` | **27px** | **30px** | 700 / 600 | 135% / 130% | -2% / -1% | 카드 · portrait |
| `body` | **18px** | **20px** | 400 | 170% / 160% | -2% / 0 | 본문 통일 |
| `body-strong` | 18px | 20px | 600 | 170% / 160% | -2% / 0 | 강조 (사이즈 동일, weight만) |
| `caption` | **16px** | **15px** | 400 | 160% / 155% | -2% / 0 | 최소 — 카피라이트/주석 |
| `button` | 16px | 16px | 600 | 150% | -2% / 0 | 버튼 |

### Typography 원칙
- 한글 hero 64px 천장 · weight 900 금지 (800까지).
- 한글 자간 **-2%** 통일 (Pretendard 가독성 sweet spot).
- 본문 사이즈 분기 금지 — 강조는 weight 600으로만.
- 영문 H1만 weight 700 (Satoshi 800은 80px에서 과중).
- Eyebrow 라벨("OUR PROGRAM" 등) 사용 금지 — AI-style 안티패턴.

---

## Layout — WISE-style 시원한 여백

### Spacing scale (4px base)
`xs 4 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · 3xl 48 · 4xl 64 · 5xl 96 · 6xl 128 · 7xl 160`

### 권장 사용
| 컨텍스트 | 값 |
|---|---|
| 섹션 padding (vertical) | 5xl–6xl (96–128) |
| Hero padding (vertical) | 7xl (160) |
| Apply-card padding | 3xl (48) |
| 일반 카드 padding | 2xl (32) |
| Full-card 섹션 padding | 5xl (96) outer · 4xl/5xl (64/96) inner |
| Card grid gap | 2xl (32) |
| Section title → body | lg (16) |
| Section title → card grid | 5xl (96) |
| 카드 내부 step-circle ↔ h4 ↔ body | **lg (16) 고정** |

### Grid
- Desktop (≥1024): 12 col · 24 gutter · max 1200px
- Tablet (≥768): 2-up
- Mobile (<768): 1-up

### Hero Layout
- Desktop: split `1.15fr / 1fr` · gap 5xl 96
- Tablet/Mobile: 스택 · gap 3xl 48
- Apply-card에 그림자 (shadow-card-hero) — light bg 위 떠 있는 느낌

---

## Elevation

| Token | Value | Use |
|---|---|---|
| `none` | none | 기본 |
| `card-soft` | `0 2px 8px rgba(10,30,51,0.04)` | 미세 |
| `card-hero` | `0 4px 16px rgba(10,30,51,0.08), 0 24px 64px rgba(10,30,51,0.12)` | hero apply-card 전용 |
| `full-card` | `0 8px 32px rgba(10,30,51,0.18)` | ink-deep 풀-라운드박스 카드 |

---

## Shapes

### Border Radius
| Token | Value | Use |
|---|---|---|
| `md` | 12 | input |
| `lg` | 16 | 작은 카드 |
| **`xl`** | **24** | 버튼 / 카드 시그니처 |
| `2xl` | 32 | 이미지 placeholder · full-card |
| `pill` | 9999 | step-circle · badge |

---

## Components

### Buttons (4 변형 · 테두리 없음)
| 토큰 | bg | text | 용도 |
|---|---|---|---|
| `button-primary` | primary | white | 기본 CTA |
| `button-dark` | dark-blue | white | 보조 (sky-blue와 함께) |
| `button-sky` | sky-blue | ink-deep | title=primary 때 보조 옵션 |
| `button-white` | white | primary | primary/dark 섹션 위 역상 |

모두 padding `md xl` · radius `xl` 24 · font button (16/600).

### Cards (5 변형 · padding 2xl 32)
- `card-default` (white · ink)
- `card-soft` (light-grey · ink)
- `card-primary` (primary · white)
- `card-dark-blue` (dark-blue · white)
- `card-ink` (ink-deep · white)

### Apply Card (Hero 시그니처)
- bg: canvas (흰색)
- padding: 3xl 48
- radius: xl 24
- shadow: card-hero
- 내부 input bg: light-grey
- 내부 submit: button-primary

### Step Circle (48×48)
- 원형 · primary bg · white 텍스트
- Inter font · 24px · weight 700
- 다크 카드 안에서 자동 반전 (white 원 + primary 텍스트)

### Text Input
- 테두리 없음 · light-grey bg
- padding lg xl · radius md 12
- focus: 2px primary outline

### Image Placeholder
- 단색 컬러박스 (그라데이션 없음) · radius 2xl 32
- 4 변형: `img-sky` · `img-primary` · `img-dark` · `img-soft`
- 3 비율: 16:9 · 4:3 · 1:1

### Full-Card (ink-deep 라운드박스 섹션)
- 외부 섹션 bg: white
- 카드 bg: ink-deep · max-width 1200
- padding: 5xl 4xl (96 64) inner
- radius: 2xl 32
- shadow: full-card (강한 lift)
- title: white · emphasis: sky-blue · body: light-grey

### Nav (sticky)
- `position: sticky; top: 0; z-index: 50`
- background: `rgba(255,255,255,0.92)` + `backdrop-filter: blur(12px)`
- 하단 1px ink-deep@6% divider
- 스크롤 시 항상 visible

### Footer
- bg ink-deep · text light-grey · padding 5xl xl · typography caption

---

## Section Order (AI Onboarding 적용 예시)

| # | 섹션 | bg | 핵심 콘텐츠 |
|---|---|---|---|
| 0 | Nav | white (sticky blur) | 브랜드 + 3 링크 |
| 1 | Hero | white | title ink-deep · apply-card 흰색+그림자 · btn primary+sky |
| 2 | Program | primary | 흰 카드 3장 · step-circle 48px |
| 3 | Curriculum | light-grey | 2-up 텍스트+이미지박스 (img-sky) |
| 4 | Instructors | white | 1:1 portrait (img-primary/dark/sky) |
| 5 | Impact | light-grey | 통계 3장 (primary/dark-blue/ink) · num 100px |
| 5.5 | Full-Card | white | ink-deep 라운드박스 · "AI는 동료" 메시지 |
| 6 | CTA | primary | white+dark 버튼 · text 3색 mix |
| 7 | Footer | ink-deep | caption 한 줄 |

### 핵심 룰: White → Primary → Light-Grey → White 로테이션
연속 같은 색 섹션 금지 (white 두 번 연속 등). 5.5 Full-Card 같은 ink-deep 카드는 white 섹션 안에 두어 변주.

---

## Do's

- 섹션 배경 5종만. **sky-blue 섹션 bg 금지**.
- Hero title은 ink-deep · 버튼은 primary+sky.
- 다른 섹션 title은 primary (light bg) / white (dark bg).
- 한글 자간 -2% 통일.
- 카드 위 step-circle ↔ h4 ↔ body 간격 16px 고정.
- 본문 사이즈 분기 금지, weight 600으로만 강조.
- 이미지 자리는 4 컬러박스 중 섹션과 어울리는 것 선택. **그라데이션 사용 금지**.

## Don'ts

- 테두리 (`border: 1px solid`) 사용 금지.
- Eyebrow 라벨 (`"OUR PROGRAM"`) 금지.
- Sky-blue 섹션 bg 금지.
- 한글 weight 900 금지.
- 사이즈 분기 (13/15/17 등 어중간한 값) 금지.
- Inter / General Sans 사용 금지 — Satoshi 통일.
- 그라데이션 사용 금지 (단색만).

---

## 다음 단계 (Phase 2 이후)

1. Style Dictionary 설치 → `tokens.json` → `web/styles/tokens.css` 자동 생성
2. OSS Figma 플러그인으로 `tokens.json` → Figma Variables import (`SYNC-FIGMA.md` 참조)
3. AI Onboarding 적용 — `web/app/page.tsx` / `apply/ApplyForm.tsx` 토큰 적용
4. 다른 프로젝트 이식 가이드 (`PORTING.md`)
