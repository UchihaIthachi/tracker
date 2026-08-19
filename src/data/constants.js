export const TOKENS = {
  sand: "#F2EAD8",
  ink: "#2B2320",
  teal: "#1F5C54",
  tealDeep: "#123B36",
  palm: "#3E7C59",
  gold: "#D9A441",
  brown: "#6B4226",
  coral: "#D9744F",
  cardBg: "#FFFDF8",
  line: "#E4D9BE",
};

export const PRIORITIES = [
  { key: "job", label: "CAL job performance", note: "Never sacrificed for anything below." },
  { key: "domain", label: "FinTech domain knowledge", note: "Unit Trusts, NAV, capital markets." },
  { key: "cse", label: "CSE Diploma", note: "Weekend deep-work anchor." },
  { key: "ielts", label: "English / IELTS", note: "High priority — but okay if it slips a little." },
  { key: "oss", label: "Open source", note: "One serious project beats five applications." },
  { key: "aws", label: "AWS certification", note: "Starts Month 7." },
  { key: "cka", label: "CKA (Kubernetes)", note: "Final month push." },
];

export const OSS_STAGES = ["Not started", "Exploring", "Applied", "Accepted", "Contributing", "PR merged"];

export const TREE_STAGES = ["🌰", "🌱", "🌿", "🌴", "🌴🥥"];

export const PLAN_START_DATE = new Date("2026-09-01T00:00:00");
export const PLAN_DURATION_DAYS = 365;

export const DEFAULT_WEEKLY_HABITS = [
  {
    id: "fintech_dsa1",
    day: 1, // Monday
    label: "FinTech",
    detail: "15m FinTech + 30m DSA",
    category: "domain",
    estimatedMinutes: 45,
    active: true,
  },
  {
    id: "fintech_sys",
    day: 2, // Tuesday
    label: "FinTech",
    detail: "15m FinTech + 30m System design",
    category: "domain",
    estimatedMinutes: 45,
    active: true,
  },
  {
    id: "backend",
    day: 3, // Wednesday
    label: "Backend",
    detail: "Backend engineering (45m)",
    category: "domain",
    estimatedMinutes: 45,
    active: true,
  },
  {
    id: "fintech_dsa2",
    day: 4, // Thursday
    label: "FinTech",
    detail: "15m FinTech + 30m DSA",
    category: "domain",
    estimatedMinutes: 45,
    active: true,
  },
  {
    id: "ielts",
    day: 5, // Friday
    label: "IELTS",
    detail: "IELTS practice (20-30m) + review",
    category: "ielts",
    estimatedMinutes: 45,
    active: true,
  },
];
