# Deployment

- Local: `python3 -m http.server 4173 -d prototype`
- Vercel: repository root uses `vercel.json` to redirect `/` to `/prototype/`.
- The app is static and does not require build output or environment variables.
- Production deployment must use HTTPS for service worker support.
