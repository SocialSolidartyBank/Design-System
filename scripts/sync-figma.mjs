#!/usr/bin/env node
// sync-figma.mjs — Figma Variables ↔ design/tokens.json sync placeholder.
//
// 현재는 권장 메시지만 출력. 실제 동기화는 Claude Code의 Figma MCP가 더 잘 수행함.
// 향후 GitHub Actions cron에서 자동 실행할 자리.

console.log(`
[sync-figma] 이 스크립트는 자리 잡기용 placeholder 입니다.

권장 흐름 (수동, Claude Code 자연어):

  1. Claude Code 열기
  2. 다음 중 한 문장 입력:
       "Figma 변경 가져와줘"
       또는: /sync-figma

  3. Claude가 자동 수행:
       a. mcp__Figma__get_variable_defs 호출
       b. design/tokens.json 과 diff
       c. 변경 요약 + 새 브랜치 + PR 생성

  4. PM이 PR 검수 후 머지 → CI가 tokens 재빌드

자세한 운영 매뉴얼: docs/figma-sync-flow.md

자동화가 필요해지면 이 파일에:
  - Figma REST API (Variables read; Pro 가능, write는 Enterprise)
  - design/tokens.json diff + 새 브랜치 + gh pr create
  를 구현. 현재는 Claude MCP 경로가 더 빠름.
`);
