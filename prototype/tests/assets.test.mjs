import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const required = [
  "index.html",
  "bootstrap.mjs",
  "questions.mjs",
  "scoring.mjs",
  "storage.mjs",
  "manifest.webmanifest",
  "icon.svg",
  "sw.js",
  "styles/01.css",
  "styles/02.css",
  "app-parts/app-core.js",
  "app-parts/app-home.js",
  "app-parts/app-quick.js",
  "app-parts/app-assessment.js",
  "app-parts/app-insights.js",
  "app-parts/app-runtime.js",
];

test("all prototype entry assets exist", async () => {
  await Promise.all(required.map((file) => access(path.join(root, file))));
});

test("index uses modular bootstrap and styles", async () => {
  const html = await readFile(path.join(root, "index.html"), "utf8");
  assert.match(html, /bootstrap\.mjs/);
  assert.match(html, /styles\/01\.css/);
  assert.match(html, /styles\/02\.css/);
  assert.doesNotMatch(html, /src="\.\/app\.js"/);
  assert.doesNotMatch(html, /href="\.\/styles\.css"/);
});

test("service worker precaches the modular entry files", async () => {
  const worker = await readFile(path.join(root, "sw.js"), "utf8");
  for (const asset of ["bootstrap.mjs", "styles/01.css", "styles/02.css", "app-parts/app-runtime.js"]) {
    assert.ok(worker.includes(asset), `${asset} should be precached`);
  }
});
