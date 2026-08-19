import React, { useState, useEffect, useMemo } from "react";
import { Layout } from "./components/Layout.jsx";
import { Dashboard } from "./components/Dashboard.jsx";
import { History } from "./components/History.jsx";
import { ResumeEngine } from "./components/ResumeEngine/index.jsx";
import { loadState, saveState, exportData, importData, DEFAULT_STATE } from "./utils/storage.js";
import { getPlanStatus, getDatesForWeek, getDateKey } from "./utils/dates.js";
import { OSS_STAGES } from "./data/constants.js";

export default function App() {
  const [state, setState] = useState(loadState);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Use today's date for current status
  const planStatus = useMemo(() => getPlanStatus(), []);

  // Persist state when it changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Derived metrics
  const resumeEvidenceScore = useMemo(() => {
    const achievements = state.resumeEngine?.achievements || [];
    if (achievements.length === 0) return 0;

    // Simple heuristic: verified entries count double, measurable metrics count more
    let score = 0;
    const maxScore = achievements.length * 4; // Assume max 4 points per entry

    achievements.forEach(a => {
        let pts = 1; // base points
        if (a.confidence === 'Measured') pts += 1;
        if (a.confidence === 'Production Verified') pts += 2;
        if (a.before && a.after) pts += 1;
        score += pts;
    });

    return Math.min(100, Math.round((score / maxScore) * 100));
  }, [state.resumeEngine?.achievements]);

  const verifiedCount = useMemo(() => {
    return (state.resumeEngine?.achievements || []).filter(a => a.confidence === 'Production Verified').length;
  }, [state.resumeEngine?.achievements]);

  // Handlers
  const handleToggleHabit = (dateKey, habitId) => {
    setState(prev => {
        const currentHabits = prev.habits[dateKey] || {};
        const wasChecked = !!currentHabits[habitId];

        const newHabits = { ...prev.habits, [dateKey]: { ...currentHabits, [habitId]: !wasChecked } };

        return {
            ...prev,
            habits: newHabits,
            plan: {
                ...prev.plan,
                totalChecks: prev.plan.totalChecks + (wasChecked ? -1 : 1)
            }
        };
    });
  };

  const handleCycleOss = (idx) => {
    setState(prev => ({
      ...prev,
      oss: prev.oss.map((o, i) => (i === idx ? { ...o, stage: (o.stage + 1) % OSS_STAGES.length } : o)),
    }));
  };

  const handleBumpIelts = (delta) => {
    setState(prev => {
      const nextSessions = Math.max(0, (prev.ielts?.sessions || 0) + delta);
      const actualDelta = nextSessions - (prev.ielts?.sessions || 0);
      return {
        ...prev,
        ielts: { ...(prev.ielts || DEFAULT_STATE.ielts), sessions: nextSessions },
        plan: { ...prev.plan, totalChecks: prev.plan.totalChecks + actualDelta },
      };
    });
  };

  const handleToggleIeltsSat = () => {
    setState(prev => ({
        ...prev,
        ielts: { ...(prev.ielts || DEFAULT_STATE.ielts), sat: !(prev.ielts?.sat) }
    }));
  };

  const handleBumpCse = (delta) => {
    setState(prev => {
      const total = prev.cse?.modulesTotal || 12;
      const nextDone = Math.max(0, Math.min(total, (prev.cse?.modulesDone || 0) + delta));
      const actualDelta = nextDone - (prev.cse?.modulesDone || 0);
      return {
        ...prev,
        cse: { ...(prev.cse || DEFAULT_STATE.cse), modulesDone: nextDone },
        plan: { ...prev.plan, totalChecks: prev.plan.totalChecks + actualDelta },
      };
    });
  };

  // Resume Engine Handlers
  const handleSaveEvidence = (entry) => {
      setState(prev => {
          const achievements = prev.resumeEngine?.achievements || [];
          const exists = achievements.find(a => a.id === entry.id);
          let newAchievements;
          if (exists) {
              newAchievements = achievements.map(a => a.id === entry.id ? entry : a);
          } else {
              newAchievements = [entry, ...achievements]; // prepend newest
          }
          return {
              ...prev,
              resumeEngine: {
                  ...(prev.resumeEngine || DEFAULT_STATE.resumeEngine),
                  achievements: newAchievements
              }
          };
      });
  };

  const handleDeleteEvidence = (id) => {
      if(window.confirm("Are you sure you want to delete this evidence?")) {
          setState(prev => {
              const achievements = prev.resumeEngine?.achievements || [];
              return {
                  ...prev,
                  resumeEngine: {
                      ...(prev.resumeEngine || DEFAULT_STATE.resumeEngine),
                      achievements: achievements.filter(a => a.id !== id)
                  }
              };
          });
      }
  };

  const handleToggleInterviewPrep = (achievementId, questionId) => {
      setState(prev => {
          const prepState = prev.resumeEngine?.interviewPrep || {};
          const achState = prepState[achievementId] || {};

          return {
              ...prev,
              resumeEngine: {
                  ...(prev.resumeEngine || DEFAULT_STATE.resumeEngine),
                  interviewPrep: {
                      ...prepState,
                      [achievementId]: {
                          ...achState,
                          [questionId]: !achState[questionId]
                      }
                  }
              }
          };
      });
  };

  // Safe Resets
  const handleResetHabits = () => {
      if (window.confirm("Reset only daily habits? Your Resume Engine and other stats will be kept.")) {
          setState(prev => ({
              ...prev,
              habits: {},
              plan: { ...prev.plan, totalChecks: 0 } // Or keep tree checks? Assuming habit reset resets tree
          }));
      }
  };

  const handleResetResumeEngine = () => {
      if (window.confirm("WARNING: This will delete ALL Resume Engine evidence. This cannot be undone. Proceed?")) {
          setState(prev => ({
              ...prev,
              resumeEngine: DEFAULT_STATE.resumeEngine
          }));
      }
  };

  const handleResetAll = () => {
    if (window.confirm("Reset all tracked progress entirely? This can't be undone.")) {
      setState(DEFAULT_STATE);
    }
  };

  const handleImport = (jsonData) => {
      if (window.confirm("Importing data will overwrite your current state. Proceed?")) {
          const success = importData(jsonData);
          if (success) {
              setState(loadState()); // Reload from the newly saved local storage
              alert("Data imported successfully.");
          }
      }
  };

  return (
    <Layout
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onExport={() => exportData(state)}
        onImport={handleImport}
    >
      {activeTab === 'dashboard' && (
          <>
            <Dashboard
                planStatus={planStatus}
                weekDates={planStatus.week !== null ? getDatesForWeek(planStatus.week) : []}
                state={state}
                onToggleHabit={handleToggleHabit}
                onCycleOss={handleCycleOss}
                onBumpIelts={handleBumpIelts}
                onToggleIeltsSat={handleToggleIeltsSat}
                onBumpCse={handleBumpCse}
                resumeEvidenceScore={resumeEvidenceScore}
                verifiedCount={verifiedCount}
                onNavigateResume={() => setActiveTab('resume')}
            />

            <div style={{ marginTop: 40, borderTop: '1px solid #E4D9BE', paddingTop: 20, display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={handleResetHabits} style={btnReset}>Reset Habits</button>
                <button onClick={handleResetResumeEngine} style={btnReset}>Reset Resume Engine</button>
                <button onClick={handleResetAll} style={{...btnReset, color: '#D9744F', border: '1px solid #D9744F'}}>Reset Everything</button>
            </div>
          </>
      )}

      {activeTab === 'resume' && (
          <ResumeEngine
              resumeEngineState={state.resumeEngine || DEFAULT_STATE.resumeEngine}
              onSaveEvidence={handleSaveEvidence}
              onDeleteEvidence={handleDeleteEvidence}
              onTogglePrep={handleToggleInterviewPrep}
          />
      )}

      {activeTab === 'history' && (
          <History
              currentPlanWeek={planStatus.week}
              state={state}
          />
      )}
    </Layout>
  );
}

const btnReset = {
  background: "transparent",
  border: "1px solid #B0A585",
  color: "#9A8F73",
  borderRadius: 8,
  padding: "8px 16px",
  fontSize: 12.5,
  cursor: "pointer",
};
