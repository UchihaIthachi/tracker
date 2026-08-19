const STORAGE_KEY = "fintech-career-os";
const OLD_STORAGE_KEY = "fintech-tracker-state-v1";
const STORAGE_VERSION = 2;

export const DEFAULT_STATE = {
  version: STORAGE_VERSION,
  plan: {
    totalChecks: 0,
  },
  habits: {}, // "YYYY-MM-DD" -> { habitId: true/false }
  weeks: {}, // keep for custom notes per week "plan-week-001" -> { notes: "" }
  resumeEngine: {
    numericImpact: [],
    fintechStandards: [],
    jvmOptimizations: [],
    scaleMetrics: [],
    architectureWins: [],
    achievements: [],
    resumeBullets: [],
    interviewPrep: {}, // achievementId -> { questionId: true/false }
  },
  oss: [
    { name: "LFX Mentorship", stage: 0 },
    { name: "Summer of Bitcoin", stage: 0 },
  ],
  ielts: { targetBand: "7.5", sessions: 0, sat: false },
  cse: { modulesDone: 0, modulesTotal: 12 },
  settings: {},
};

export function loadState() {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);

    // Migration from very old app version if no new data exists
    if (!raw) {
        const veryOldRaw = localStorage.getItem(OLD_STORAGE_KEY);
        if (veryOldRaw) {
            console.log("Migrating from very old v1 state...");
            const oldState = JSON.parse(veryOldRaw);
            const newState = { ...DEFAULT_STATE };
            newState.oss = oldState.oss || newState.oss;
            newState.ielts = oldState.ielts || newState.ielts;
            newState.cse = oldState.cse || newState.cse;
            newState.plan.totalChecks = oldState.totalChecks || 0;
            // Old weeks data is incompatible (used calendar weeks and Mon/Tue keys),
            // skipping habit migration to avoid data corruption, start fresh on habits.
            return newState;
        }
        return DEFAULT_STATE;
    }

    const parsed = JSON.parse(raw);

    // Migration from v1 of the new app (if any existed before versioning)
    if (!parsed.version || parsed.version < STORAGE_VERSION) {
      console.log(`Migrating state to version ${STORAGE_VERSION}...`);
      const newState = { ...DEFAULT_STATE, ...parsed, version: STORAGE_VERSION };

      // Ensure nested objects exist
      newState.resumeEngine = { ...DEFAULT_STATE.resumeEngine, ...(parsed.resumeEngine || {}) };
      newState.plan = { ...DEFAULT_STATE.plan, ...(parsed.plan || {}) };
      if (typeof parsed.totalChecks === 'number') {
        newState.plan.totalChecks = parsed.totalChecks;
        delete newState.totalChecks;
      }

      return newState;
    }

    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.warn("Could not load saved progress, starting fresh.", e);
    return DEFAULT_STATE;
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Could not save progress.", e);
  }
}

export function exportData(state) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", `fintech-career-os-backup-${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

export function importData(jsonData) {
    try {
        const parsed = JSON.parse(jsonData);
        if(!parsed.version) throw new Error("Invalid format: missing version");
        // Could add more validation here
        saveState(parsed);
        return true;
    } catch(e) {
        console.error("Failed to import data", e);
        return false;
    }
}
