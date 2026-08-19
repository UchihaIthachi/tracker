import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: change "REPO_NAME" below to your actual GitHub repository name.
// If your repo is github.com/yourname/fintech-tracker, base should be "/fintech-tracker/".
// This is required for GitHub Pages to load assets from the correct sub-path.
export default defineConfig({
  plugins: [react()],
  base: "/REPO_NAME/",
});
