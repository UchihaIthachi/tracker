import React, { useState } from 'react';
import { TOKENS } from '../../data/constants.js';

const QUESTIONS = [
    { id: 'q1', text: "What was the original problem?" },
    { id: 'q2', text: "How did you measure it?" },
    { id: 'q3', text: "Why did you choose this solution?" },
    { id: 'q4', text: "What alternatives did you consider?" },
    { id: 'q5', text: "What was the bottleneck?" },
    { id: 'q6', text: "What changed technically?" },
    { id: 'q7', text: "What changed numerically?" },
    { id: 'q8', text: "What trade-offs did you make?" },
    { id: 'q9', text: "How did you verify the result?" },
    { id: 'q10', text: "What would you improve today?" }
];

export function InterviewDrill({ achievements, interviewPrepState, onTogglePrep }) {
    const [selectedId, setSelectedId] = useState(achievements[0]?.id || '');
    const selected = achievements.find(a => a.id === selectedId);

    if (achievements.length === 0) {
        return null;
    }

    const prepState = interviewPrepState[selectedId] || {};
    const checkedCount = QUESTIONS.filter(q => prepState[q.id]).length;
    const isReady = checkedCount === QUESTIONS.length;

    return (
        <div style={{ padding: '20px', background: '#fff', border: `1px solid ${TOKENS.line}`, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ margin: 0, color: TOKENS.tealDeep }}>Interview Drill</h3>
                <div style={{ fontSize: 13, fontWeight: 600, color: isReady ? TOKENS.palm : TOKENS.coral }}>
                    {checkedCount} / {QUESTIONS.length} Prepared
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <select
                    value={selectedId}
                    onChange={e => setSelectedId(e.target.value)}
                    style={{ width: '100%', padding: '10px', borderRadius: 8, border: `1px solid ${TOKENS.line}`, fontFamily: 'inherit' }}
                >
                    {achievements.map(a => (
                        <option key={a.id} value={a.id}>{a.title}</option>
                    ))}
                </select>
            </div>

            {selected && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
                    {QUESTIONS.map(q => (
                        <label
                            key={q.id}
                            style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 10,
                                padding: '10px 12px',
                                background: prepState[q.id] ? 'rgba(62, 124, 89, 0.05)' : '#FBF6EA',
                                borderRadius: 8,
                                cursor: 'pointer',
                                border: `1px solid ${prepState[q.id] ? TOKENS.palm : TOKENS.line}`
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={!!prepState[q.id]}
                                onChange={() => onTogglePrep(selectedId, q.id)}
                                style={{ marginTop: 4 }}
                            />
                            <span style={{ fontSize: 13, lineHeight: 1.4, color: prepState[q.id] ? TOKENS.palm : TOKENS.ink }}>
                                {q.text}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
