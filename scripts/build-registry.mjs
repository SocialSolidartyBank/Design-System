#!/usr/bin/env node
// build-registry.mjs — packages/{ui,recipes}/src/**/*.tsx → registry/*.json (shadcn schema)

import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, basename, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "registry");

mkdirSync(OUT, { recursive: true });

/** Recursively collect .tsx files (skip index, internal/, lib/). */
function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    if (entry === "internal" || entry === "lib" || entry.startsWith(".")) continue;
    const p = resolve(dir, entry);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (extname(p) === ".tsx" && basename(p) !== "index.tsx") out.push(p);
  }
  return out;
}

/** Scan imports to derive dependencies. */
function detectDeps(src) {
  const deps = new Set();
  const registryDeps = new Set();
  const re = /from\s+["']([^"']+)["']/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const spec = m[1];
    if (spec.startsWith(".") || spec.startsWith("/")) continue;
    if (spec === "react" || spec === "react-dom") continue;
    if (spec === "@bss-ds/ui") registryDeps.add("button"); // soft fallback; recipes depend on ui index
    else if (spec.startsWith("@bss-ds/")) registryDeps.add(spec.replace("@bss-ds/", ""));
    else deps.add(spec.split("/")[0].startsWith("@") ? spec.split("/").slice(0, 2).join("/") : spec.split("/")[0]);
  }
  return { deps: [...deps], registryDeps: [...registryDeps] };
}

function pkgFor(file) {
  if (file.includes("/packages/ui/")) return { name: "ui", root: resolve(ROOT, "packages/ui/src") };
  if (file.includes("/packages/recipes/")) return { name: "recipes", root: resolve(ROOT, "packages/recipes/src") };
  return null;
}

function toRegistryName(file) {
  const base = basename(file, ".tsx");
  return base.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

const entries = [
  ...walk(resolve(ROOT, "packages/ui/src")),
  ...walk(resolve(ROOT, "packages/recipes/src")),
];

const index = [];

for (const file of entries) {
  const pkg = pkgFor(file);
  if (!pkg) continue;
  const src = readFileSync(file, "utf8");
  const rel = relative(pkg.root, file);
  const name = toRegistryName(file);
  const { deps, registryDeps } = detectDeps(src);

  const item = {
    name,
    type: pkg.name === "recipes" ? "registry:block" : "registry:ui",
    dependencies: deps,
    registryDependencies: registryDeps,
    files: [
      {
        path: `${pkg.name}/${rel}`,
        content: src,
        type: pkg.name === "recipes" ? "registry:block" : "registry:ui",
      },
    ],
    tailwind: { config: {} },
    cssVars: {},
  };

  writeFileSync(resolve(OUT, `${name}.json`), JSON.stringify(item, null, 2) + "\n");
  index.push({ name, type: item.type });
}

writeFileSync(
  resolve(OUT, "index.json"),
  JSON.stringify({ name: "@bss/design-system", items: index }, null, 2) + "\n"
);

console.log(`✓ ${index.length} registry items → ${OUT}`);
for (const i of index) console.log(`  - ${i.name} (${i.type})`);
