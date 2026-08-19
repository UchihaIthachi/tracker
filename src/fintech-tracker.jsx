import { useEffect, useMemo, useState } from "react";

// ============================================================
// FINTECH CAREER OS — 1 YEAR PLAN
// ============================================================

const TOKENS = {
  sand: "#F5F0E6",
  cream: "#FFFDF8",
  ink: "#292421",
  muted: "#766E62",
  teal: "#1F5C54",
  tealDeep: "#123B36",
  palm: "#4B8460",
  gold: "#D9A441",
  coral: "#D9744F",
  line: "#E4D9BE",
  softTeal: "#E8F1EE",
  softGold: "#FBF3DF",
  softCoral: "#F8E9E2",
  white: "#FFFFFF",
};

const MONTHS = [
  {
    id: 1,
    name: "Month 1",
    title: "Foundation",
    theme: "Build the system",
    color: TOKENS.teal,
    goals: [
      "Establish weekday learning routine",
      "Understand FinTech fundamentals",
      "Start CSE Diploma strongly",
      "Begin IELTS baseline assessment",
    ],
  },
  {
    id: 2,
    name: "Month 2",
    title: "FinTech Core",
    theme: "Understand the business",
    color: TOKENS.teal,
    goals: [
      "Learn Unit Trust fundamentals",
      "Understand NAV calculation",
      "Study capital-market terminology",
      "Maintain CSE momentum",
    ],
  },
  {
    id: 3,
    name: "Month 3",
    title: "Engineering Depth",
    theme: "Become stronger technically",
    color: TOKENS.palm,
    goals: [
      "Strengthen backend engineering",
      "Practice DSA consistently",
      "Start system-design fundamentals",
      "Build one small technical project",
    ],
  },
  {
    id: 4,
    name: "Month 4",
    title: "Open Source",
    theme: "Become visible",
    color: TOKENS.palm,
    goals: [
      "Research serious OSS projects",
      "Choose one primary project",
      "Make first meaningful contribution",
      "Continue CSE + IELTS",
    ],
  },
  {
    id: 5,
    name: "Month 5",
    title: "Contribution",
    theme: "Ship something real",
    color: TOKENS.palm,
    goals: [
      "Open useful OSS issues/PRs",
      "Improve GitHub portfolio",
      "Deepen backend knowledge",
      "Keep FinTech learning active",
    ],
  },
  {
    id: 6,
    name: "Month 6",
    title: "Half-Year Review",
    theme: "Measure and adjust",
    color: TOKENS.gold,
    goals: [
      "Review first 6 months",
      "Complete major CSE milestone",
      "Assess IELTS readiness",
      "Decide AWS preparation path",
    ],
  },
  {
    id: 7,
    name: "Month 7",
    title: "AWS Start",
    theme: "Cloud fundamentals",
    color: TOKENS.gold,
    goals: [
      "Begin AWS certification study",
      "Learn core AWS services",
      "Build one cloud-backed project",
      "Maintain OSS contribution",
    ],
  },
  {
    id: 8,
    name: "Month 8",
    title: "AWS Build",
    theme: "Apply cloud knowledge",
    color: TOKENS.gold,
    goals: [
      "Deepen AWS architecture",
      "Practice exam questions",
      "Deploy a real project",
      "Continue CSE completion",
    ],
  },
  {
    id: 9,
    name: "Month 9",
    title: "Cloud + FinTech",
    theme: "Connect both worlds",
    color: TOKENS.teal,
    goals: [
      "Combine cloud and FinTech knowledge",
      "Study financial-system architecture",
      "Improve system-design skills",
      "Target AWS certification",
    ],
  },
  {
    id: 10,
    name: "Month 10",
    title: "Kubernetes",
    theme: "Start CKA preparation",
    color: TOKENS.coral,
    goals: [
      "Begin Kubernetes fundamentals",
      "Practice kubectl daily",
      "Learn cluster architecture",
      "Maintain AWS knowledge",
    ],
  },
  {
    id: 11,
    name: "Month 11",
    title: "CKA Deep Work",
    theme: "Hands-on Kubernetes",
    color: TOKENS.coral,
    goals: [
      "Intensive Kubernetes labs",
      "Practice troubleshooting",
      "Complete mock exams",
      "Finish remaining CSE work",
    ],
  },
  {
    id: 12,
    name: "Month 12",
    title: "Proof of Work",
    theme: "Finish the year strong",
    color: TOKENS.tealDeep,
    goals: [
      "Push for CKA",
      "Complete CSE Diploma",
      "Finalize OSS portfolio",
      "Review entire career year",
    ],
  },
];

const PRIORITIES = [
  {
    key: "job",
    rank: 1,
    label: "CAL job performance",
    short: "Protect your main career",
    note: "Never sacrifice this for lower priorities.",
  },
  {
    key: "domain",
    rank: 2,
    label: "FinTech domain",
    short: "Become technically + financially fluent",
    note: "Unit Trusts, NAV, capital markets and financial systems.",
  },
  {
    key: "cse",
    rank: 3,
    label: "CSE Diploma",
    short: "Build formal technical depth",
    note: "Weekend deep-work anchor.",
  },
  {
    key: "ielts",
    rank: 4,
    label: "English / IELTS",
    short: "Improve communication",
    note: "Target 7.5, but don't sacrifice core career progress.",
  },
  {
    key: "oss",
    rank: 5,
    label: "Open source",
    short: "Build public proof of work",
    note: "One serious contribution beats five shallow applications.",
  },
  {
    key: "aws",
    rank: 6,
    label: "AWS",
    short: "Cloud credibility",
    note: "Main focus from Month 7.",
  },
  {
    key: "cka",
    rank: 7,
    label: "CKA",
    short: "Kubernetes specialization",
    note: "Final-quarter push.",
  },
];

const WEEKDAYS = [
  {
    key: "mon",
    label: "MON",
    task: "FinTech",
    detail: "15m FinTech + 30m DSA",
  },
  {
    key: "tue",
    label: "TUE",
    task: "Architecture",
    detail: "15m FinTech + 30m system design",
  },
  {
    key: "wed",
    label: "WED",
    task: "Engineering",
    detail: "45m backend engineering",
  },
  {
    key: "thu",
    label: "THU",
    task: "Algorithms",
    detail: "15m FinTech + 30m DSA",
  },
  {
    key: "fri",
    label: "FRI",
    task: "English",
    detail: "20–30m IELTS + weekly review",
  },
];

const OSS_STAGES = [
  "Not started",
  "Exploring",
  "Applied",
  "Accepted",
  "Contributing",
  "PR merged",
];

const DEFAULT_STATE = {
  weeks: {},
  currentMonth: 1,

  oss: [
    { name: "LFX Mentorship", stage: 0 },
    { name: "Summer of Bitcoin", stage: 0 },
  ],

  ielts: {
    targetBand: 7.5,
    sessions: 0,
    sat: false,
  },

  cse: {
    modulesDone: 0,
    modulesTotal: 12,
  },

  monthlyGoals: {},
  totalChecks: 0,
};

function getWeekKey(date = new Date()) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date - firstDay) / 86400000);

  return `${date.getFullYear()}-W${Math.ceil(
    (days + firstDay.getDay() + 1) / 7,
  )}`;
}

function getInitialState() {
  try {
    const saved = localStorage.getItem("fintech-career-os");

    if (saved) {
      return {
        ...DEFAULT_STATE,
        ...JSON.parse(saved),
      };
    }
  } catch {}

  return DEFAULT_STATE;
}

// ============================================================
// UI COMPONENTS
// ============================================================

function ProgressBar({ value, color = TOKENS.teal }) {
  return (
    <div className="progress-track">
      <div
        className="progress-fill"
        style={{
          width: `${Math.min(100, Math.max(0, value))}%`,
          background: color,
        }}
      />
    </div>
  );
}

function Badge({ children, tone = "teal" }) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

function Card({ children, className = "" }) {
  return <section className={`card ${className}`}>{children}</section>;
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="section-header">
      {eyebrow && <div className="eyebrow">{eyebrow}</div>}
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function Metric({ label, value, detail }) {
  return (
    <div className="metric">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {detail && <div className="metric-detail">{detail}</div>}
    </div>
  );
}

function Tree({ count }) {
  const stages = [
    { icon: "🌰", title: "Seed" },
    { icon: "🌱", title: "Sprout" },
    { icon: "🌿", title: "Growing" },
    { icon: "🌴", title: "Young Palm" },
    { icon: "🌴🥥", title: "Full Growth" },
  ];

  const stage = Math.min(stages.length - 1, Math.floor(count / 10));

  const currentStart = stage * 10;
  const nextTarget = (stage + 1) * 10;

  const progress =
    stage === stages.length - 1
      ? 100
      : ((count - currentStart) / (nextTarget - currentStart)) * 100;

  return (
    <div className="tree-card">
      <div className="tree-icon">{stages[stage].icon}</div>

      <div className="tree-content">
        <div className="tree-top">
          <div>
            <div className="tree-title">{stages[stage].title}</div>
            <div className="tree-subtitle">{count} habit checks this year</div>
          </div>

          <div className="tree-count">{count}</div>
        </div>

        <ProgressBar value={progress} color={TOKENS.gold} />

        <div className="tree-caption">
          {stage === stages.length - 1
            ? "Your career tree is fully grown. Keep compounding."
            : `${nextTarget - count} checks until the next stage`}
        </div>
      </div>
    </div>
  );
}

function CheckRow({ checked, onClick, label, detail }) {
  return (
    <button
      className={`check-row ${checked ? "checked" : ""}`}
      onClick={onClick}
    >
      <span className="custom-check">{checked ? "✓" : ""}</span>

      <span className="check-content">
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>

      <span className="check-arrow">{checked ? "Done" : "Mark"}</span>
    </button>
  );
}

// ============================================================
// MAIN APP
// ============================================================

export default function App() {
  const [state, setState] = useState(getInitialState);
  const [view, setView] = useState("dashboard");

  const weekKey = getWeekKey();
  const thisWeek = state.weeks[weekKey] || {};

  const currentMonth = MONTHS[state.currentMonth - 1];

  useEffect(() => {
    try {
      localStorage.setItem("fintech-career-os", JSON.stringify(state));
    } catch {}
  }, [state]);

  const weekDone = WEEKDAYS.filter((day) => thisWeek[day.key]).length;

  const weekPercent = (weekDone / 5) * 100;

  const yearProgress = Math.round(((state.currentMonth - 1) / 12) * 100);

  const cseProgress = (state.cse.modulesDone / state.cse.modulesTotal) * 100;

  const ossProgress = Math.round(
    (state.oss.reduce((sum, item) => sum + item.stage, 0) /
      (state.oss.length * (OSS_STAGES.length - 1))) *
      100,
  );

  const toggleDay = (dayKey) => {
    setState((prev) => {
      const week = {
        ...(prev.weeks[weekKey] || {}),
      };

      const wasChecked = !!week[dayKey];

      week[dayKey] = !wasChecked;

      return {
        ...prev,
        weeks: {
          ...prev.weeks,
          [weekKey]: week,
        },
        totalChecks: prev.totalChecks + (wasChecked ? -1 : 1),
      };
    });
  };

  const cycleOssStage = (index) => {
    setState((prev) => ({
      ...prev,
      oss: prev.oss.map((project, i) =>
        i === index
          ? {
              ...project,
              stage:
                project.stage === OSS_STAGES.length - 1 ? 0 : project.stage + 1,
            }
          : project,
      ),
    }));
  };

  const updateMonth = (month) => {
    setState((prev) => ({
      ...prev,
      currentMonth: month,
    }));
  };

  const updateIelts = (delta) => {
    setState((prev) => {
      const next = Math.max(0, prev.ielts.sessions + delta);

      const difference = next - prev.ielts.sessions;

      return {
        ...prev,
        ielts: {
          ...prev.ielts,
          sessions: next,
        },
        totalChecks:
          prev.totalChecks + (difference > 0 ? 1 : difference < 0 ? -1 : 0),
      };
    });
  };

  const toggleIeltsSat = () => {
    setState((prev) => ({
      ...prev,
      ielts: {
        ...prev.ielts,
        sat: !prev.ielts.sat,
      },
    }));
  };

  const updateCse = (delta) => {
    setState((prev) => {
      const next = Math.max(
        0,
        Math.min(prev.cse.modulesTotal, prev.cse.modulesDone + delta),
      );

      return {
        ...prev,
        cse: {
          ...prev.cse,
          modulesDone: next,
        },
        totalChecks: prev.totalChecks + (next > prev.cse.modulesDone ? 1 : 0),
      };
    });
  };

  const resetAll = () => {
    if (window.confirm("Reset all career progress? This cannot be undone.")) {
      setState(DEFAULT_STATE);
    }
  };

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:wght@500;600;700&display=swap');

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: ${TOKENS.sand};
        }

        button {
          font: inherit;
        }

        .app {
          min-height: 100vh;
          background:
            radial-gradient(circle at 90% 0%, rgba(31,92,84,.07), transparent 30%),
            ${TOKENS.sand};
          color: ${TOKENS.ink};
          font-family: "DM Sans", system-ui, sans-serif;
        }

        .shell {
          max-width: 1120px;
          margin: auto;
          padding: 28px 22px 60px;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-mark {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          background: ${TOKENS.teal};
          color: white;
          border-radius: 13px;
          font-size: 21px;
        }

        .brand-name {
          font-weight: 700;
          color: ${TOKENS.tealDeep};
          font-size: 15px;
        }

        .brand-sub {
          color: ${TOKENS.muted};
          font-size: 12px;
          margin-top: 2px;
        }

        .nav {
          display: flex;
          gap: 5px;
          padding: 4px;
          border: 1px solid ${TOKENS.line};
          border-radius: 12px;
          background: rgba(255,255,255,.45);
        }

        .nav button {
          border: 0;
          background: transparent;
          color: ${TOKENS.muted};
          padding: 8px 13px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 12px;
          font-weight: 600;
        }

        .nav button.active {
          background: ${TOKENS.teal};
          color: white;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.4fr .8fr;
          gap: 18px;
          margin-bottom: 18px;
        }

        .hero-main {
          background: ${TOKENS.tealDeep};
          color: white;
          border-radius: 22px;
          padding: 30px;
          position: relative;
          overflow: hidden;
        }

        .hero-main:after {
          content: "";
          position: absolute;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          background: rgba(255,255,255,.045);
          right: -70px;
          top: -90px;
        }

        .eyebrow {
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-size: 10px;
          font-weight: 700;
          color: ${TOKENS.coral};
        }

        .hero h1 {
          font-family: "Fraunces", Georgia, serif;
          font-size: clamp(32px, 5vw, 50px);
          line-height: 1;
          margin: 10px 0 12px;
          max-width: 600px;
        }

        .hero p {
          margin: 0;
          color: rgba(255,255,255,.72);
          max-width: 570px;
          line-height: 1.6;
          font-size: 14px;
        }

        .hero-side {
          background: ${TOKENS.cream};
          border: 1px solid ${TOKENS.line};
          border-radius: 22px;
          padding: 22px;
        }

        .month-label {
          color: ${TOKENS.muted};
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.1px;
        }

        .month-title {
          font-family: "Fraunces", Georgia, serif;
          color: ${TOKENS.tealDeep};
          font-size: 28px;
          margin: 5px 0;
        }

        .month-theme {
          color: ${TOKENS.palm};
          font-weight: 600;
          font-size: 13px;
          margin-bottom: 20px;
        }

        .progress-track {
          height: 7px;
          background: ${TOKENS.line};
          border-radius: 20px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          transition: width .3s ease;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-bottom: 18px;
        }

        .metric {
          background: ${TOKENS.cream};
          border: 1px solid ${TOKENS.line};
          border-radius: 16px;
          padding: 16px;
        }

        .metric-label {
          color: ${TOKENS.muted};
          font-size: 11px;
          margin-bottom: 7px;
        }

        .metric-value {
          color: ${TOKENS.tealDeep};
          font-size: 24px;
          font-weight: 700;
        }

        .metric-detail {
          color: ${TOKENS.muted};
          font-size: 11px;
          margin-top: 4px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.2fr .8fr;
          gap: 18px;
        }

        .card {
          background: ${TOKENS.cream};
          border: 1px solid ${TOKENS.line};
          border-radius: 18px;
          padding: 21px;
          margin-bottom: 18px;
        }

        .section-header {
          margin-bottom: 16px;
        }

        .section-header h2 {
          font-family: "Fraunces", Georgia, serif;
          color: ${TOKENS.tealDeep};
          margin: 4px 0;
          font-size: 22px;
        }

        .section-header p {
          color: ${TOKENS.muted};
          margin: 0;
          font-size: 12px;
          line-height: 1.5;
        }

        .tree-card {
          display: flex;
          align-items: center;
          gap: 17px;
          background: ${TOKENS.teal};
          border-radius: 18px;
          padding: 18px 20px;
          color: white;
          margin-bottom: 18px;
        }

        .tree-icon {
          font-size: 45px;
          min-width: 55px;
          text-align: center;
        }

        .tree-content {
          flex: 1;
        }

        .tree-top {
          display: flex;
          justify-content: space-between;
          gap: 15px;
          margin-bottom: 9px;
        }

        .tree-title {
          font-weight: 700;
          font-size: 14px;
        }

        .tree-subtitle {
          font-size: 11px;
          opacity: .72;
          margin-top: 3px;
        }

        .tree-count {
          font-size: 20px;
          font-weight: 700;
        }

        .tree-caption {
          font-size: 10px;
          opacity: .7;
          margin-top: 6px;
        }

        .check-row {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 11px;
          border: 1px solid ${TOKENS.line};
          background: transparent;
          padding: 12px;
          border-radius: 12px;
          margin-bottom: 8px;
          cursor: pointer;
          text-align: left;
          transition: .2s ease;
        }

        .check-row:hover {
          transform: translateY(-1px);
          border-color: ${TOKENS.palm};
        }

        .check-row.checked {
          background: ${TOKENS.softTeal};
          border-color: ${TOKENS.palm};
        }

        .custom-check {
          width: 21px;
          height: 21px;
          border-radius: 6px;
          border: 2px solid #B9AD94;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: white;
          font-size: 12px;
        }

        .checked .custom-check {
          background: ${TOKENS.palm};
          border-color: ${TOKENS.palm};
        }

        .check-content {
          flex: 1;
        }

        .check-content strong {
          display: block;
          font-size: 13px;
          color: ${TOKENS.ink};
        }

        .check-content small {
          display: block;
          color: ${TOKENS.muted};
          font-size: 11px;
          margin-top: 2px;
        }

        .check-arrow {
          color: ${TOKENS.muted};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .priority {
          display: grid;
          grid-template-columns: 28px 1fr auto;
          align-items: center;
          gap: 11px;
          padding: 11px 0;
          border-bottom: 1px solid ${TOKENS.line};
        }

        .priority:last-child {
          border-bottom: 0;
        }

        .priority-number {
          width: 25px;
          height: 25px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          color: white;
          font-size: 10px;
          font-weight: 700;
          background: ${TOKENS.teal};
        }

        .priority-name {
          font-size: 13px;
          font-weight: 700;
        }

        .priority-note {
          color: ${TOKENS.muted};
          font-size: 11px;
          margin-top: 2px;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          padding: 5px 8px;
          border-radius: 7px;
          font-size: 9px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .5px;
        }

        .badge-teal {
          background: ${TOKENS.softTeal};
          color: ${TOKENS.teal};
        }

        .badge-gold {
          background: ${TOKENS.softGold};
          color: #9A721D;
        }

        .badge-coral {
          background: ${TOKENS.softCoral};
          color: ${TOKENS.coral};
        }

        .goal {
          padding: 11px 0;
          border-bottom: 1px solid ${TOKENS.line};
          font-size: 13px;
        }

        .goal:last-child {
          border-bottom: 0;
        }

        .goal:before {
          content: "→";
          color: ${TOKENS.palm};
          font-weight: 700;
          margin-right: 8px;
        }

        .month-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .month-card {
          border: 1px solid ${TOKENS.line};
          background: #fff;
          border-radius: 14px;
          padding: 15px;
          cursor: pointer;
          text-align: left;
          transition: .2s ease;
        }

        .month-card:hover {
          transform: translateY(-2px);
        }

        .month-card.active {
          border: 2px solid ${TOKENS.teal};
          padding: 14px;
          background: ${TOKENS.softTeal};
        }

        .month-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 9px;
        }

        .month-number {
          color: ${TOKENS.muted};
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .month-card h3 {
          font-family: "Fraunces", Georgia, serif;
          color: ${TOKENS.tealDeep};
          margin: 0 0 4px;
          font-size: 18px;
        }

        .month-card p {
          color: ${TOKENS.muted};
          font-size: 11px;
          margin: 0;
          line-height: 1.45;
        }

        .oss-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid ${TOKENS.line};
          border-radius: 12px;
          margin-bottom: 9px;
        }

        .oss-info {
          flex: 1;
        }

        .oss-name {
          font-weight: 700;
          font-size: 13px;
        }

        .oss-stage {
          color: ${TOKENS.palm};
          font-size: 10px;
          margin-top: 3px;
        }

        .button {
          border: 0;
          border-radius: 9px;
          background: ${TOKENS.teal};
          color: white;
          padding: 8px 11px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .button.secondary {
          background: transparent;
          border: 1px solid ${TOKENS.line};
          color: ${TOKENS.ink};
        }

        .button.danger {
          color: ${TOKENS.coral};
          border-color: ${TOKENS.line};
          background: transparent;
        }

        .stepper {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .stepper button {
          width: 29px;
          height: 29px;
          border: 1px solid ${TOKENS.line};
          background: white;
          border-radius: 8px;
          cursor: pointer;
        }

        .stepper strong {
          min-width: 30px;
          text-align: center;
        }

        .cse-progress {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cse-progress-main {
          flex: 1;
        }

        .cse-number {
          color: ${TOKENS.tealDeep};
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 6px;
        }

        .footer {
          text-align: center;
          color: ${TOKENS.muted};
          font-size: 10px;
          padding-top: 10px;
        }

        @media (max-width: 800px) {
          .hero,
          .grid {
            grid-template-columns: 1fr;
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .month-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .topbar {
            align-items: flex-start;
            flex-direction: column;
          }

          .nav {
            width: 100%;
          }

          .nav button {
            flex: 1;
          }
        }

        @media (max-width: 520px) {
          .shell {
            padding: 18px 13px 40px;
          }

          .hero-main,
          .hero-side {
            padding: 22px;
          }

          .stats {
            grid-template-columns: 1fr 1fr;
          }

          .month-grid {
            grid-template-columns: 1fr;
          }

          .tree-card {
            align-items: flex-start;
          }

          .tree-icon {
            font-size: 34px;
            min-width: 38px;
          }
        }
      `}</style>

      <div className="shell">
        {/* ====================================================
            HEADER
        ==================================================== */}

        <header className="topbar">
          <div className="brand">
            <div className="brand-mark">🌴</div>

            <div>
              <div className="brand-name">FinTech Career OS</div>

              <div className="brand-sub">12-month compounding system</div>
            </div>
          </div>

          <nav className="nav">
            <button
              className={view === "dashboard" ? "active" : ""}
              onClick={() => setView("dashboard")}
            >
              Dashboard
            </button>

            <button
              className={view === "roadmap" ? "active" : ""}
              onClick={() => setView("roadmap")}
            >
              1-Year Roadmap
            </button>
          </nav>
        </header>

        {/* ====================================================
            DASHBOARD
        ==================================================== */}

        {view === "dashboard" && (
          <>
            <div className="hero">
              <div className="hero-main">
                <div className="eyebrow">2026 → 2027 Career Plan</div>

                <h1>
                  Build a career
                  <br />
                  that compounds.
                </h1>

                <p>
                  Protect your job first. Build FinTech expertise second. Then
                  stack technical depth, public proof of work and cloud
                  credentials over the year.
                </p>
              </div>

              <div className="hero-side">
                <div className="month-label">Current focus</div>

                <div className="month-title">{currentMonth.title}</div>

                <div className="month-theme">{currentMonth.theme}</div>

                <ProgressBar value={yearProgress} color={currentMonth.color} />

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 7,
                    color: TOKENS.muted,
                    fontSize: 10,
                  }}
                >
                  <span>Month {state.currentMonth}</span>
                  <span>12 months</span>
                </div>
              </div>
            </div>

            <div className="stats">
              <Metric
                label="This week"
                value={`${weekDone}/5`}
                detail={`${Math.round(weekPercent)}% complete`}
              />

              <Metric
                label="Career checks"
                value={state.totalChecks}
                detail="habit checks logged"
              />

              <Metric
                label="CSE"
                value={`${state.cse.modulesDone}/${state.cse.modulesTotal}`}
                detail={`${Math.round(cseProgress)}% complete`}
              />

              <Metric
                label="OSS"
                value={`${ossProgress}%`}
                detail="portfolio progress"
              />
            </div>

            <Tree count={state.totalChecks} />

            <div className="grid">
              {/* LEFT COLUMN */}

              <div>
                <Card>
                  <SectionHeader
                    eyebrow="Weekly system"
                    title="This week's habits"
                    subtitle={`${weekDone}/5 complete · hard stop after 45–60 minutes`}
                  />

                  {WEEKDAYS.map((day) => (
                    <CheckRow
                      key={day.key}
                      checked={!!thisWeek[day.key]}
                      onClick={() => toggleDay(day.key)}
                      label={`${day.label} · ${day.task}`}
                      detail={day.detail}
                    />
                  ))}
                </Card>

                <Card>
                  <SectionHeader
                    eyebrow={`Month ${state.currentMonth}`}
                    title={currentMonth.title}
                    subtitle={currentMonth.theme}
                  />

                  {currentMonth.goals.map((goal) => (
                    <div className="goal" key={goal}>
                      {goal}
                    </div>
                  ))}
                </Card>

                <Card>
                  <SectionHeader
                    eyebrow="Public proof"
                    title="Open source"
                    subtitle="Explore two paths. Execute seriously on one."
                  />

                  {state.oss.map((project, index) => (
                    <div className="oss-item" key={project.name}>
                      <div className="oss-info">
                        <div className="oss-name">{project.name}</div>

                        <div className="oss-stage">
                          {OSS_STAGES[project.stage]}
                        </div>
                      </div>

                      <button
                        className="button"
                        onClick={() => cycleOssStage(index)}
                      >
                        Advance →
                      </button>
                    </div>
                  ))}
                </Card>
              </div>

              {/* RIGHT COLUMN */}

              <div>
                <Card>
                  <SectionHeader
                    eyebrow="Decision rule"
                    title="Priority stack"
                    subtitle="When time gets tight, work from top to bottom."
                  />

                  {PRIORITIES.map((priority) => (
                    <div className="priority" key={priority.key}>
                      <div className="priority-number">{priority.rank}</div>

                      <div>
                        <div className="priority-name">{priority.label}</div>

                        <div className="priority-note">{priority.short}</div>
                      </div>

                      {priority.rank <= 3 ? (
                        <Badge>Core</Badge>
                      ) : priority.rank <= 5 ? (
                        <Badge tone="gold">Growth</Badge>
                      ) : (
                        <Badge tone="coral">Later</Badge>
                      )}
                    </div>
                  ))}
                </Card>

                <Card>
                  <SectionHeader
                    eyebrow="Credential"
                    title="CSE Diploma"
                    subtitle="Weekend deep-work anchor"
                  />

                  <div className="cse-progress">
                    <div className="cse-progress-main">
                      <div className="cse-number">
                        {state.cse.modulesDone} / {state.cse.modulesTotal}{" "}
                        modules
                      </div>

                      <ProgressBar value={cseProgress} color={TOKENS.palm} />
                    </div>

                    <div className="stepper">
                      <button onClick={() => updateCse(-1)}>−</button>

                      <strong>{Math.round(cseProgress)}%</strong>

                      <button onClick={() => updateCse(1)}>+</button>
                    </div>
                  </div>
                </Card>

                <Card>
                  <SectionHeader
                    eyebrow="Communication"
                    title="IELTS / English"
                    subtitle="High priority, but don't let it cannibalize core career progress."
                  />

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 15,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          color: TOKENS.muted,
                          fontSize: 10,
                        }}
                      >
                        TARGET BAND
                      </div>

                      <strong
                        style={{
                          fontSize: 25,
                          color: TOKENS.gold,
                        }}
                      >
                        {state.ielts.targetBand}
                      </strong>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          color: TOKENS.muted,
                          fontSize: 10,
                        }}
                      >
                        PRACTICE SESSIONS
                      </div>

                      <div className="stepper">
                        <button onClick={() => updateIelts(-1)}>−</button>

                        <strong>{state.ielts.sessions}</strong>

                        <button onClick={() => updateIelts(1)}>+</button>
                      </div>
                    </div>
                  </div>

                  <CheckRow
                    checked={state.ielts.sat}
                    onClick={toggleIeltsSat}
                    label="IELTS exam completed"
                    detail={
                      state.ielts.sat
                        ? "Exam marked as completed"
                        : "Keep this optional until ready"
                    }
                  />
                </Card>

                <Card>
                  <SectionHeader
                    eyebrow="Next action"
                    title="What matters now"
                  />

                  <div
                    style={{
                      background: TOKENS.softGold,
                      borderRadius: 12,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 10,
                        color: "#8B6D25",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                      }}
                    >
                      Month {state.currentMonth}
                    </div>

                    <div
                      style={{
                        fontFamily: '"Fraunces", Georgia, serif',
                        fontSize: 19,
                        color: TOKENS.tealDeep,
                        margin: "5px 0",
                      }}
                    >
                      {currentMonth.goals[0]}
                    </div>

                    <div
                      style={{
                        fontSize: 11,
                        color: TOKENS.muted,
                        lineHeight: 1.5,
                      }}
                    >
                      Don't optimize for doing everything. Optimize for
                      completing the next important thing.
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        )}

        {/* ====================================================
            ROADMAP
        ==================================================== */}

        {view === "roadmap" && (
          <>
            <Card>
              <SectionHeader
                eyebrow="12-month strategy"
                title="Your year at a glance"
                subtitle="Every month has one dominant theme. Supporting habits continue underneath it."
              />

              <div className="month-grid">
                {MONTHS.map((month) => (
                  <button
                    key={month.id}
                    className={`month-card ${
                      state.currentMonth === month.id ? "active" : ""
                    }`}
                    onClick={() => updateMonth(month.id)}
                  >
                    <div className="month-card-top">
                      <span className="month-number">{month.name}</span>

                      {state.currentMonth === month.id && <Badge>Now</Badge>}
                    </div>

                    <h3>{month.title}</h3>

                    <p>{month.theme}</p>
                  </button>
                ))}
              </div>
            </Card>

            <div className="grid">
              <Card>
                <SectionHeader
                  eyebrow={currentMonth.name}
                  title={currentMonth.title}
                  subtitle={currentMonth.theme}
                />

                {currentMonth.goals.map((goal, index) => (
                  <div className="goal" key={goal}>
                    <strong
                      style={{
                        marginRight: 8,
                        color: TOKENS.teal,
                      }}
                    >
                      {index + 1}.
                    </strong>

                    {goal}
                  </div>
                ))}
              </Card>

              <Card>
                <SectionHeader
                  eyebrow="Operating principle"
                  title="How to use this plan"
                />

                <div className="goal">
                  <strong>1. Protect the job.</strong>
                  <br />
                  Your primary career asset comes first.
                </div>

                <div className="goal">
                  <strong>2. Compound knowledge.</strong>
                  <br />
                  FinTech + engineering creates your differentiation.
                </div>

                <div className="goal">
                  <strong>3. Ship publicly.</strong>
                  <br />
                  OSS turns learning into evidence.
                </div>

                <div className="goal">
                  <strong>4. Certify strategically.</strong>
                  <br />
                  AWS first, Kubernetes later.
                </div>
              </Card>
            </div>

            <Card>
              <SectionHeader
                eyebrow="Year-end destination"
                title="What success looks like after 12 months"
                subtitle="The goal isn't to collect certificates. It's to become noticeably more valuable."
              />

              <div className="month-grid">
                <div className="month-card">
                  <Badge>Career</Badge>
                  <h3>Stronger at CAL</h3>
                  <p>
                    Better performance and stronger FinTech domain
                    understanding.
                  </p>
                </div>

                <div className="month-card">
                  <Badge tone="gold">Education</Badge>
                  <h3>CSE Diploma</h3>
                  <p>Major formal technical milestone completed.</p>
                </div>

                <div className="month-card">
                  <Badge>Proof</Badge>
                  <h3>OSS Portfolio</h3>
                  <p>Meaningful contribution and ideally a merged PR.</p>
                </div>

                <div className="month-card">
                  <Badge tone="gold">Cloud</Badge>
                  <h3>AWS</h3>
                  <p>Practical cloud knowledge backed by certification.</p>
                </div>

                <div className="month-card">
                  <Badge tone="coral">Kubernetes</Badge>
                  <h3>CKA Track</h3>
                  <p>Hands-on Kubernetes knowledge and CKA preparation.</p>
                </div>

                <div className="month-card">
                  <Badge>Communication</Badge>
                  <h3>English</h3>
                  <p>
                    Stronger professional communication and IELTS readiness.
                  </p>
                </div>
              </div>
            </Card>
          </>
        )}

        <div className="footer">
          <button className="button danger" onClick={resetAll}>
            Reset all progress
          </button>

          <div style={{ marginTop: 12 }}>
            Career OS · Small consistent actions compound.
          </div>
        </div>
      </div>
    </div>
  );
}
