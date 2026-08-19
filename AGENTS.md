# Agent notes for this repo

## What this is
A small single-page React app: a personal progress tracker for a 12-month
FinTech career plan (weekday study habits, open-source tracking, IELTS,
CSE Diploma progress). No backend — all state is saved to the browser's
`localStorage`.

## Stack
- React 18, plain inline styles (no CSS framework)
- Vite for dev/build
- Deployed as a static site to GitHub Pages via `.github/workflows/deploy.yml`

## Where things live
- `src/App.jsx` — the entire app: components, state, styling tokens at the top (`TOKENS`)
- `src/main.jsx` — React entry point, do not add logic here
- `src/index.css` — minimal global reset only
- `vite.config.js` — has a `base` path that MUST match the GitHub repo name for Pages to work

## Conventions
- Keep everything in inline `style={{}}` objects, matching the existing pattern — don't introduce a CSS framework or CSS modules unless asked.
- Color/spacing values should reuse the `TOKENS` object at the top of `App.jsx` rather than hardcoding new hex values.
- State is one flat object persisted via `loadState()` / `saveState()` in `App.jsx`, backed by `localStorage`. Keep new persisted fields inside that same object and add sensible defaults to `DEFAULT_STATE`.
- No external UI libraries — keep the app dependency-light (only `react` and `react-dom` at runtime).

## Testing changes
There is no test suite yet. Verify by running:
```
npm install
npm run dev
```
and checking the app in a browser. If you add non-trivial logic, adding a
lightweight test setup (e.g. Vitest) is welcome, but keep it minimal.

## Things to avoid
- Don't use `window.storage` (that API only exists inside Claude.ai artifacts, not in a real browser) — this app intentionally uses `localStorage` instead.
- Don't remove the "Reset all progress" confirmation dialog.
- Don't hardcode a GitHub repo name into `vite.config.js` other than as the documented placeholder — leave that to the human to set for their own repo.
