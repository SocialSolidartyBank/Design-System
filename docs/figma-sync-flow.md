# Figma ↔ Code 동기화 — PM 운영 매뉴얼

이 문서는 PM(비개발자)을 위한 1페이지 매뉴얼.

## 한 줄

**Figma는 시각 편집기, `design/tokens.json` 이 진실의 원천.** 디자이너가 Figma에서 값 바꿔도, "PR로 코드에 반영" 단계가 있어야 진짜로 변경된 것.

---

## Figma → Code (디자이너가 색·간격 바꿨을 때)

### 단계

1. **디자이너에게 확인**: "변경 다 끝났어요?" (미완성 상태로 가져오면 실수 PR 발생)

2. **Claude Code 열기** — 이 화면

3. **한국어 한 줄 입력**:
   ```
   Figma 변경 가져와줘
   ```
   또는:
   ```
   /sync-figma
   ```

4. **Claude가 자동 실행**:
   - Figma Variables 읽기 (MCP)
   - `design/tokens.json` 과 diff
   - 한국어 요약: "primary: #006CB7 → #0070C0, hero 콘트라스트 살짝 강해짐"
   - 룰 위반 감지 시 경고 (예: "sky-blue가 섹션 bg에 사용됨 — 룰 위반")

5. **PM이 결정**:
   - 문제 없으면: "PR 만들어줘" → 새 브랜치 + PR 생성
   - 의도와 다르면: "취소" → 아무것도 안 함

6. **PR 검수 후 머지** — CI가 자동으로 `tokens.css` / Tailwind preset / 컴포넌트 재빌드

---

## Code → Figma (개발자가 토큰 추가했을 때)

### 단계

1. 개발자가 `design/tokens.json` 수정 → PR 머지

2. 디자이너에게 알림: "신규 토큰 X 추가됐어요"

3. 디자이너 둘 중 하나 선택:

   **방법 A. Figma Make 사용 (Pro 플랜, 추천)**
   - Figma 파일 열기 → Make 호출
   - 프롬프트:
     ```
     GitHub의 design/tokens.json 을 읽어서
     이 파일의 Variables 컬렉션을 업데이트해줘
     ```
   - Make가 자동으로 신규 토큰 추가

   **방법 B. OSS 플러그인 사용**
   - "Design Tokens by Lukas Oppermann" 플러그인 실행
   - **Import** → `design/tokens.json` 선택
   - Variables 자동 갱신

   상세는 `design/SYNC-FIGMA.md` 참조.

---

## 자주 묻는 질문

### Q. 자동으로 sync 안 되나요?
A. **수동입니다.** PM이 명시적으로 트리거. 이유: 디자이너 작업 중 미완성 상태가 PR로 만들어지는 사고 방지. 6개월 운영 후 패턴 잡히면 cron 자동화 고려.

### Q. Figma에서 바꿨는데 코드에 반영 안 됐어요
A. PR 머지 됐는지 확인. 머지 후 CI가 `pnpm build` 실행해야 적용. Claude Code에서 "PR 상태 확인해줘".

### Q. 디자이너가 룰 위반(예: sky-blue 섹션 bg) 만들었어요
A. `/sync-figma` 시 Claude가 자동 감지하고 경고. PM이 거절하면 PR 안 만들어짐. 디자이너에게 룰 안내 후 재작업 요청.

### Q. 폰트도 동기화되나요?
A. Pretendard / Satoshi 토큰은 `tokens.json` 에 포함. 실제 폰트 파일 로딩(woff2)은 다음 PR에서 별도 처리.

### Q. 다른 사람도 같은 명령 쓸 수 있나요?
A. Claude Code가 깔린 누구든 `/sync-figma` 가능. 다만 GitHub push 권한이 있어야 PR 생성됨. 권한 없는 사람은 "diff만 보여줘" 사용.

---

## 트러블슈팅

### "Figma MCP 에러"
- Figma MCP가 활성화돼 있는지 확인 — Claude Code 시작 시 시스템 메시지에 `mcp__Figma__*` 도구가 보여야 함
- Figma 데스크톱 앱이 열려 있고, 작업 파일에 접근 가능한지 확인

### "PR이 빈 채로 만들어짐"
- diff가 0건일 때는 PR 만들지 않도록 명령이 설계됨. PR이 생겼다는 건 변경이 있다는 뜻.

### "토큰 빌드가 실패함"
- `design/tokens.json` 이 valid JSON 인지 확인: `node -e "JSON.parse(require('fs').readFileSync('design/tokens.json'))"`
- 참조 (`{color.primary}`) 가 존재하는 경로인지 확인

---

## 다음 단계 (미래)

- GitHub Actions cron 자동 sync (현재는 수동)
- Slack 알림: PR 생성 시 디자이너 자동 멘션
- Figma Webhook (Org 플랜 업그레이드 시)
