import React from 'react';
import { TOKENS, PRIORITIES, OSS_STAGES } from '../data/constants.js';
import { SectionCard, Tree, Checkbox } from './ui.jsx';
import { WeeklyHabits } from './WeeklyHabits.jsx';

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

export function Dashboard({
    planStatus,
    weekDates,
    state,
    onToggleHabit,
    onCycleOss,
    onBumpIelts,
    onToggleIeltsSat,
    onBumpCse,
    resumeEvidenceScore,
    verifiedCount,
    onNavigateResume
}) {

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 12,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            color: TOKENS.coral,
            fontWeight: 600,
            marginBottom: 4,
          }}
        >
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
        {planStatus.status === 'pre-launch' ? (
             <p style={{ fontSize: 13, color: "#7A7060", margin: "6px 0 0" }}>
                 {planStatus.message}
             </p>
        ) : (
            <p style={{ fontSize: 13, color: "#7A7060", margin: "6px 0 0" }}>
                Week {planStatus.week}, Day {planStatus.day} / 365 ({planStatus.percentage}%) · Priority order runs top to bottom.
            </p>
        )}
      </div>

      {/* Mini Resume Engine Widget */}
      <div
        onClick={onNavigateResume}
        style={{
          background: TOKENS.tealDeep,
          color: '#fff',
          borderRadius: 14,
          padding: '16px 20px',
          marginBottom: 18,
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 4px 12px rgba(18, 59, 54, 0.15)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
          <div>
              <div style={{ fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', opacity: 0.8, marginBottom: 4 }}>
                  CAL Resume Engine
              </div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <div style={{ fontSize: 24, fontWeight: 700, color: TOKENS.gold }}>
                      {resumeEvidenceScore}% Score
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.8 }}>
                      {state.resumeEngine.achievements?.length || 0} achievements · {verifiedCount} verified
                  </div>
              </div>
          </div>
          <div style={{ fontSize: 20, color: TOKENS.gold }}>→</div>
      </div>

      <div style={{ marginBottom: 18 }}>
        <Tree count={state.plan.totalChecks} />
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

      <WeeklyHabits
          dates={weekDates}
          habitsState={state.habits}
          onToggleHabit={onToggleHabit}
      />

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
              onClick={() => onCycleOss(idx)}
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

      <SectionCard title="IELTS / English" subtitle="High priority, not a mandatory trophy — okay if the score lands a bit under target.">
        <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 140px", background: "#FBF6EA", borderRadius: 10, padding: "10px 12px", border: `1px solid ${TOKENS.line}` }}>
            <div style={{ fontSize: 11, color: "#9A8F73" }}>Target band</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: TOKENS.gold }}>{state.ielts.targetBand}</div>
          </div>
          <div style={{ flex: "1 1 140px", background: "#FBF6EA", borderRadius: 10, padding: "10px 12px", border: `1px solid ${TOKENS.line}` }}>
            <div style={{ fontSize: 11, color: "#9A8F73" }}>Practice sessions logged</div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => onBumpIelts(-1)} style={miniBtn}>−</button>
              <span style={{ fontSize: 18, fontWeight: 700 }}>{state.ielts.sessions}</span>
              <button onClick={() => onBumpIelts(1)} style={miniBtn}>+</button>
            </div>
          </div>
        </div>
        <Checkbox checked={state.ielts.sat} onChange={onToggleIeltsSat} label="Sat the IELTS exam" />
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
          <button onClick={() => onBumpCse(-1)} style={miniBtn}>−</button>
          <button onClick={() => onBumpCse(1)} style={miniBtn}>+</button>
        </div>
      </SectionCard>
    </>
  );
}
