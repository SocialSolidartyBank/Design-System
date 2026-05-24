---
description: Figma Variables의 변경을 가져와 design/tokens.json에 반영하는 PR을 생성합니다.
---

당신은 함세상 디자인 시스템 레포에서 Figma → 코드 sync를 수행합니다.

## 절차

1. **Figma Variables 읽기**
   - `mcp__Figma__get_variable_defs` (또는 `mcp__plugin_design_figma__*`) 사용
   - 현재 작업 중인 Figma 파일이 모호하면 사용자에게 어느 파일인지 묻기

2. **현재 SSOT 읽기**
   - `design/tokens.json` Read
   - DTCG 포맷 — `color.*`, `spacing.*`, `radius.*`, `elevation.*`, `typography.*` 등

3. **Diff 계산**
   - Figma Variables 값 vs `tokens.json` 의 leaf `$value`
   - kebab-case ↔ Figma 네이밍 정규화 필요할 수 있음
   - 추가/변경/삭제 분류

4. **변경 요약 한국어로 작성**
   - 예: `"primary: #006CB7 → #0070C0 (hero apply-card 콘트라스트 +3%)"`
   - 디자인 시스템 v6 룰 위반 감지 시 경고:
     - sky-blue 가 섹션 bg 후보로 등장했는지
     - 한글 weight 900 등장했는지
     - 어중간한 사이즈 (13/15/17 등) 등장했는지
   - 위반 발견 시 PR 생성 전에 사용자에게 확인

5. **변경 적용**
   - `design/tokens.json` 의 해당 leaf `$value` 만 patch (구조 유지)
   - 다른 필드는 절대 건드리지 말 것

6. **빌드 검증**
   - `pnpm tokens` 실행
   - 산출물 3종 (tokens.css / tailwind.preset.cjs / index.ts) 재생성 확인

7. **PR 생성**
   - 새 브랜치: `figma-sync/YYYYMMDD-HHmm`
   - 커밋 메시지: `figma sync: <간단 요약>`
   - PR 본문:
     ```
     ## Figma → Code 동기화

     ### 변경 요약
     - …

     ### 룰 검증
     - [ ] 5종 섹션 매트릭스 유지
     - [ ] sky-blue 섹션 bg 사용 없음
     - [ ] 한글 weight 800 이하
     - [ ] 사이즈 분기 없음

     🤖 /sync-figma 자동 생성
     ```
   - `gh pr create --base main` 으로 push + PR 생성

## 변경 사항이 없을 때

조용히 "변경 없음" 한 줄 출력하고 종료. 빈 PR 만들지 말 것.

## 사용자가 변경을 거절할 때

PR을 만들지 말고 변경 요약만 보여준 뒤 종료.
