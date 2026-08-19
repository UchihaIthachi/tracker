# FinTech Career Tracker

A small personal progress tracker for a 12-month FinTech career plan —
weekday habit checklist, open-source progress, IELTS tracking, CSE
Diploma progress, and a coconut tree that grows as you log progress.
Everything is saved locally in your browser (`localStorage`) — no
account, no server, no data leaves your machine.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`).

---

## 2. Put it on GitHub

```bash
cd fintech-tracker
git init
git add .
git commit -m "Initial commit"
```

Create a new **empty** repository on GitHub (no README/license, since you
already have files), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy for free on GitHub Pages

This repo already includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds and deploys automatically on
every push to `main`. You just need two one-time steps:

1. **Set the base path.** Open `vite.config.js` and change:
   ```js
   base: "/REPO_NAME/",
   ```
   to your actual repo name, e.g. `base: "/fintech-tracker/"`.
   Commit and push that change.

2. **Turn on Pages in GitHub Actions mode.** On GitHub: go to your repo →
   **Settings → Pages** → under "Build and deployment", set **Source** to
   **GitHub Actions**.

That's it. After the next push, check the **Actions** tab for the deploy
run. Once it's green, your app is live at:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

This is a completely free domain — no billing, no custom domain required
(though you can add one later in the same Pages settings if you want).

---

## 4. Handing this off to Jules for further improvements

[Jules](https://jules.google) is Google's autonomous coding agent — you
give it a task in plain English, it works in a cloud VM against your
GitHub repo, and opens a pull request for you to review.

Steps:

1. Go to **jules.google.com** and sign in with a Google account.
2. Click **Connect to GitHub account** and authorize it for this repo
   (you can restrict it to just this one repo).
3. Select this repo and the `main` branch.
4. Write a clear, specific task, for example:
   - *"Add a monthly summary tab that totals habit checks per calendar month."*
   - *"Add dark mode with a toggle, keeping the existing color tokens as the light theme."*
   - *"Export/import progress as a JSON file so it can be backed up."*
5. Jules will read `AGENTS.md` (already included in this repo) to
   understand the project conventions, propose a plan, and — once you
   approve it — open a pull request with the changes.
6. Review the PR like any teammate's: check the diff, run `npm run dev`
   locally if you want to eyeball it, then merge. The GitHub Actions
   workflow will redeploy automatically once it lands on `main`.

You can also assign tasks to Jules directly from a GitHub issue by adding
the `jules` label, if you'd rather work from your issue tracker.

---

## Project structure

```
fintech-tracker/
├── AGENTS.md              ← read by Jules automatically
├── index.html
├── package.json
├── vite.config.js         ← set your repo name here for Pages
├── .github/workflows/
│   └── deploy.yml         ← auto-deploy to GitHub Pages
└── src/
    ├── main.jsx
    ├── App.jsx            ← the whole app lives here
    └── index.css
```
