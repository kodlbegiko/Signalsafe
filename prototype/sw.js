const CACHE_NAME = "signalsafe-v0.2.3-r1-hotfix3";
const ASSETS = [
  "./",
  "./index.html",
  "./compat.mjs",
  "./bootstrap.mjs",
  "./questions.mjs",
  "./scoring.mjs",
  "./storage.mjs",
  "./manifest.webmanifest",
  "./icon.svg",
  "./styles/01.css",
  "./styles/02.css",
  "./app-parts/app-core.js",
  "./app-parts/app-home.js",
  "./app-parts/app-quick.js",
  "./app-parts/app-assessment.js",
  "./app-parts/app-insights.js",
  "./app-parts/app-runtime.js",
  "./question-data/shared.mjs",
  "./question-data/pre-a.mjs",
  "./question-data/pre-b.mjs",
  "./question-data/training-a.mjs",
  "./question-data/training-b.mjs",
  "./question-data/post-a.mjs",
  "./question-data/post-b.mjs"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy)).catch(() => {});
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match("./index.html"))),
  );
});
