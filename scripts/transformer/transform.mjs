#!/usr/bin/env node
// transform.mjs — raw 21st.dev/shadcn TSX → 우리 토큰 치환 TSX
// usage: cat raw.tsx | node scripts/transformer/transform.mjs > out.tsx
//        node scripts/transformer/transform.mjs raw.tsx out.tsx

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MAP = JSON.parse(readFileSync(resolve(__dirname, "token-map.json"), "utf8"));

function loadInput() {
  const [, , inPath] = process.argv;
  if (inPath) return readFileSync(inPath, "utf8");
  // stdin
  return readFileSync(0, "utf8");
}

function writeOutput(content) {
  const outPath = process.argv[3];
  if (outPath) writeFileSync(outPath, content);
  else process.stdout.write(content);
}

const FOCAL_GROUPS = ["color", "radius", "shadow"];

/** Replace class tokens within className="…" / clsx(…) string literals. */
function transformClasses(src) {
  return src.replace(/(className\s*=\s*["'`])([^"'`]+)(["'`])/g, (_, pre, body, post) => {
    const tokens = body.split(/\s+/).filter(Boolean);
    const out = [];
    for (const tok of tokens) {
      if (MAP.remove.includes(tok)) continue; // border etc.
      let mapped = tok;
      for (const group of FOCAL_GROUPS) {
        const table = MAP[group];
        if (table && table[tok] !== undefined) {
          const target = table[tok];
          if (target === "__REMOVE__") { mapped = null; break; }
          if (target === "__KEEP__") { mapped = tok; break; }
          mapped = target;
          break;
        }
      }
      if (mapped) out.push(mapped);
    }
    return pre + out.join(" ") + post;
  });
}

const input = loadInput();
const output = transformClasses(input);
writeOutput(output);

if (process.argv[3]) {
  console.error(`✓ transformed → ${process.argv[3]}`);
}
