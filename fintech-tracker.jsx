import { useState, useEffect } from "react";

// ---------- constants ----------

const TOKENS = {
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

const PRIORITIES = [
  { key: "job", label: "CAL job performance", note: "Never sacrificed for anything below." },
  { key: "domain", label: "FinTech domain knowledge", note: "Unit Trusts, NAV, capital markets." },
  { key: "cse", label: "CSE Diploma", note: "Weekend deep-work anchor." },
  { key: "ielts", label: "English / IELTS", note: "High priority — but okay if it slips a little." },
  { key: "oss", label: "Open source", note: "One serious project beats five applications." },
  { key: "aws", label: "AWS certification", note: "Starts Month 7." },
  { key: "cka", label: "CKA (Kubernetes)", note: "Final month push." },
];

const WEEKDAYS = [
  { key: "mon", label: "Mon", task: "FinTech (15m) + DSA (30m)" },
  { key: "tue", label: "Tue", task: "FinTech (15m) + System design (30m)" },
  { key: "wed", label: "Wed", task: "Backend engineering (45m)" },
  { key: "thu", label: "Thu", task: "FinTech (15m) + DSA (30m)" },
  { key: "fri", label: "Fri", task: "IELTS practice (20-30m) + review" },
];

const OSS_STAGES = ["Not started", "Exploring", "Applied", "Accepted", "Contributing", "PR merged"];

const TREE_STAGES = [
  "🌰", // seed
  "🌱", // sprout
  "🌿", // small shoot
  "🌴", // young palm
  "🌴🥥", // palm with coconuts
];

function getWeekKey(d = new Date()) {
  const onejan = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - onejan) / 86400000 + onejan.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${week}`;
}

const DEFAULT_STATE = {
  weeks: {}, // weekKey -> { mon:bool, tue:bool, ... }
  oss: [
    { name: "LFX Mentorship", stage: 0 },
    { name: "Summer of Bitcoin", stage: 0 },
  ],
  ielts: { targetBand: "7.5", sessions: 0, sat: false },
  cse: { modulesDone: 0, modulesTotal: 12 },
  totalChecks: 0,
};

// ---------- small components ----------

function SectionCard({ title, subtitle, children }) {
  return (
    <div
      style={{
        background: TOKENS.cardBg,
        border: `1px solid ${TOKENS.line}`,
        borderRadius: 14,
        padding: "20px 22px",
        marginBottom: 18,
      }}
    >
      <div style={{ marginBottom: 14 }}>
        <h2
          style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontSize: 19,
            fontWeight: 600,
            color: TOKENS.tealDeep,
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7A7060" }}>{subtitle}</p>
        )}
      </div>
      {children}
    </div>
  );
}

function Tree({ count }) {
  const stageIdx = Math.min(TREE_STAGES.length - 1, Math.floor(count / 8));
  const nextAt = (stageIdx + 1) * 8;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: TOKENS.teal,
        borderRadius: 14,
        padding: "16px 20px",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: 40, lineHeight: 1 }}>{TREE_STAGES[stageIdx]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>
          {count} habit checks logged · growing your coconut tree
        </div>
        <div
          style={{
            height: 8,
            background: "rgba(255,255,255,0.25)",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${Math.min(100, (count / (stageIdx === TREE_STAGES.length - 1 ? nextAt : nextAt)) * 100)}%`,
              background: TOKENS.gold,
              transition: "width 0.4s ease",
            }}
          />
        </div>
        <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>
          {stageIdx === TREE_STAGES.length - 1
            ? "Fully grown — full coconut tree. Keep the streak going."
            : `${nextAt - count} more checks to the next stage`}
        </div>
      </div>
    </div>
  );
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        background: checked ? "rgba(62,124,89,0.1)" : "transparent",
        border: `1px solid ${checked ? TOKENS.palm : TOKENS.line}`,
        cursor: "pointer",
        marginBottom: 8,
      }}
      onClick={onChange}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: 5,
          border: `2px solid ${checked ? TOKENS.palm : "#B8AD91"}`,
          background: checked ? TOKENS.palm : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
      </div>
      <span style={{ fontSize: 14, color: TOKENS.ink, textDecoration: checked ? "line-through" : "none", opacity: checked ? 0.6 : 1 }}>
        {label}
      </span>
    </label>
  );
}

// ---------- main app ----------

export default function App() {
  const [state, setState] = useState(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);
  const weekKey = getWeekKey();

  useEffect(() => {
    (async () => {
      try {
        const res = await window.storage.get("fintech-tracker-state");
        if (res && res.value) {
          setState({ ...DEFAULT_STATE, ...JSON.parse(res.value) });
        }
      } catch (e) {
        // no saved state yet
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    (async () => {
      try {
        await window.storage.set("fintech-tracker-state", JSON.stringify(state));
      } catch (e) {
        console.error("save failed", e);
      }
    })();
  }, [state, loaded]);

  const thisWeek = state.weeks[weekKey] || {};

  function toggleDay(dayKey) {
    setState((prev) => {
      const week = { ...(prev.weeks[weekKey] || {}) };
      const wasChecked = !!week[dayKey];
      week[dayKey] = !wasChecked;
      return {
        ...prev,
        weeks: { ...prev.weeks, [weekKey]: week },
        totalChecks: prev.totalChecks + (wasChecked ? -1 : 1),
      };
    });
  }

  function cycleOssStage(idx) {
    setState((prev) => {
      const oss = prev.oss.map((o, i) =>
        i === idx ? { ...o, stage: (o.stage + 1) % OSS_STAGES.length } : o
      );
      return { ...prev, oss };
    });
  }

  function bumpIeltsSessions(delta) {
    setState((prev) => ({
      ...prev,
      ielts: { ...prev.ielts, sessions: Math.max(0, prev.ielts.sessions + delta) },
      totalChecks: prev.totalChecks + (delta > 0 ? 1 : -1 < 0 && prev.ielts.sessions > 0 ? -1 : 0),
    }));
  }

  function toggleIeltsSat() {
    setState((prev) => ({ ...prev, ielts: { ...prev.ielts, sat: !prev.ielts.sat } }));
  }

  function bumpCse(delta) {
    setState((prev) => ({
      ...prev,
      cse: {
        ...prev.cse,
        modulesDone: Math.max(0, Math.min(prev.cse.modulesTotal, prev.cse.modulesDone + delta)),
      },
      totalChecks: prev.totalChecks + (delta > 0 ? 1 : 0),
    }));
  }

  function resetAll() {
    if (window.confirm && !window.confirm("Reset all tracked progress? This can't be undone.")) return;
    setState(DEFAULT_STATE);
  }

  const weekDone = WEEKDAYS.filter((d) => thisWeek[d.key]).length;

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: TOKENS.sand,
        minHeight: "100%",
        padding: "24px 18px",
        color: TOKENS.ink,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, letterSpacing: 1.5, textTransform: "uppercase", color: TOKENS.coral, fontWeight: 600, marginBottom: 4 }}>
            FinTech Career Plan
          </div>
          <h1
            style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: 28,
              fontWeight: 700,
              margin: 0,
              color: TOKENS.tealDeep,
            }}
          >
            Progress Tracker
          </h1>
          <p style={{ fontSize: 13, color: "#7A7060", margin: "6px 0 0" }}>
            Week {weekKey.split("-W")[1]}, {weekKey.split("-")[0]} · Priority order runs top to bottom — protect the top of the list first.
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <Tree count={state.totalChecks} />
        </div>

        <SectionCard title="Priority Order" subtitle="If time runs short this week, protect items from the top down.">
          {PRIORITIES.map((p, i) => (
            <div
              key={p.key}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                padding: "8px 0",
                borderBottom: i < PRIORITIES.length - 1 ? `1px solid ${TOKENS.line}` : "none",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: i < 3 ? TOKENS.teal : TOKENS.gold,
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                {i + 1}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.label}</div>
                <div style={{ fontSize: 12.5, color: "#7A7060" }}>{p.note}</div>
              </div>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="This Week's Weekday Habit" subtitle={`${weekDone}/5 days done · 45–60 min hard stop each day`}>
          {WEEKDAYS.map((d) => (
            <Checkbox
              key={d.key}
              checked={!!thisWeek[d.key]}
              onChange={() => toggleDay(d.key)}
              label={`${d.label} — ${d.task}`}
            />
          ))}
        </SectionCard>

        <SectionCard
          title="Open Source"
          subtitle="Track up to two paths in parallel exploration — but only carry ONE into full execution."
        >
          {state.oss.map((o, idx) => (
            <div
              key={o.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 12px",
                borderRadius: 10,
                border: `1px solid ${TOKENS.line}`,
                marginBottom: 8,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{o.name}</div>
                <div style={{ fontSize: 12.5, color: TOKENS.palm }}>{OSS_STAGES[o.stage]}</div>
              </div>
              <button
                onClick={() => cycleOssStage(idx)}
                style={{
                  background: TOKENS.teal,
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: "6px 12px",
                  fontSize: 12.5,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Advance →
              </button>
            </div>
          ))}
          <div style={{ fontSize: 12, color: "#9A8F73", marginTop: 6 }}>
            Guardrail: one project with a merged PR beats five applications with nothing to show.
          </div>
        </SectionCard>

        <SectionCard
          title="IELTS / English"
          subtitle="High priority, not a mandatory trophy — okay if the score lands a bit under target."
        >
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 140px", background: "#FBF6EA", borderRadius: 10, padding: "10px 12px", border: `1px solid ${TOKENS.line}` }}>
              <div style={{ fontSize: 11, color: "#9A8F73" }}>Target band</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: TOKENS.gold }}>{state.ielts.targetBand}</div>
            </div>
            <div style={{ flex: "1 1 140px", background: "#FBF6EA", borderRadius: 10, padding: "10px 12px", border: `1px solid ${TOKENS.line}` }}>
              <div style={{ fontSize: 11, color: "#9A8F73" }}>Practice sessions logged</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => bumpIeltsSessions(-1)} style={miniBtn}>−</button>
                <span style={{ fontSize: 18, fontWeight: 700 }}>{state.ielts.sessions}</span>
                <button onClick={() => bumpIeltsSessions(1)} style={miniBtn}>+</button>
              </div>
            </div>
          </div>
          <Checkbox checked={state.ielts.sat} onChange={toggleIeltsSat} label="Sat the IELTS exam" />
        </SectionCard>

        <SectionCard title="CSE Diploma" subtitle="Weekend deep-work anchor.">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, marginBottom: 6 }}>
                {state.cse.modulesDone} / {state.cse.modulesTotal} modules complete
              </div>
              <div style={{ height: 8, background: TOKENS.line, borderRadius: 6, overflow: "hidden" }}>
                <div
                  style={{
                    height: "100%",
                    width: `${(state.cse.modulesDone / state.cse.modulesTotal) * 100}%`,
                    background: TOKENS.palm,
                  }}
                />
              </div>
            </div>
            <button onClick={() => bumpCse(-1)} style={miniBtn}>−</button>
            <button onClick={() => bumpCse(1)} style={miniBtn}>+</button>
          </div>
        </SectionCard>

        <div style={{ textAlign: "center", marginTop: 8 }}>
          <button
            onClick={resetAll}
            style={{
              background: "transparent",
              border: `1px solid ${TOKENS.line}`,
              color: "#9A8F73",
              borderRadius: 8,
              padding: "8px 16px",
              fontSize: 12.5,
              cursor: "pointer",
            }}
          >
            Reset all progress
          </button>
        </div>
      </div>
    </div>
  );
}

const miniBtn = {
  width: 28,
  height: 28,
  borderRadius: 8,
  border: `1px solid ${TOKENS.line}`,
  background: "#fff",
  fontSize: 16,
  fontWeight: 600,
  cursor: "pointer",
  color: TOKENS.ink,
};
