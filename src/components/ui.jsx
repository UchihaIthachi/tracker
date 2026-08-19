import React from 'react';
import { TOKENS, TREE_STAGES } from '../data/constants.js';

export function SectionCard({ title, subtitle, children }) {
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
        {subtitle && <p style={{ margin: "4px 0 0", fontSize: 13, color: "#7A7060" }}>{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

export function Tree({ count }) {
  const perStage = 8;
  const stageIdx = Math.min(TREE_STAGES.length - 1, Math.floor(count / perStage));
  const nextAt = (stageIdx + 1) * perStage;
  const isMaxStage = stageIdx === TREE_STAGES.length - 1;
  const pct = isMaxStage ? 100 : Math.min(100, ((count % perStage) / perStage) * 100);

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
        <div style={{ height: 8, background: "rgba(255,255,255,0.25)", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: TOKENS.gold, transition: "width 0.4s ease" }} />
        </div>
        <div style={{ fontSize: 11, opacity: 0.75, marginTop: 4 }}>
          {isMaxStage ? "Fully grown — full coconut tree. Keep the streak going." : `${nextAt - count} more checks to the next stage`}
        </div>
      </div>
    </div>
  );
}

export function Checkbox({ checked, onChange, label, disabled = false, isToday = false }) {
  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        borderRadius: 10,
        background: checked ? "rgba(62,124,89,0.1)" : isToday ? "rgba(255,255,255,0.8)" : "transparent",
        border: `1px solid ${checked ? TOKENS.palm : isToday ? TOKENS.gold : TOKENS.line}`,
        cursor: disabled ? "not-allowed" : "pointer",
        marginBottom: 8,
        opacity: disabled ? 0.6 : 1,
        transition: "all 0.2s ease"
      }}
      onClick={disabled ? undefined : onChange}
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
      <span
        style={{
          fontSize: 14,
          color: TOKENS.ink,
          textDecoration: checked ? "line-through" : "none",
          opacity: checked ? 0.6 : 1,
        }}
      >
        {label}
      </span>
    </label>
  );
}
