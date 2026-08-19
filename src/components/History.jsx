import React, { useState } from 'react';
import { TOKENS, DEFAULT_WEEKLY_HABITS } from '../data/constants.js';
import { SectionCard, Checkbox } from './ui.jsx';
import { getDatesForWeek, getDateKey, isWeekend } from '../utils/dates.js';
import { format, getDay } from 'date-fns';

export function History({ currentPlanWeek, state }) {
    const [viewWeek, setViewWeek] = useState(currentPlanWeek || 0);

    // Safety boundaries
    const weekToRender = Math.max(0, Math.min(viewWeek, 53));
    const isCurrent = weekToRender === currentPlanWeek;

    const dates = getDatesForWeek(weekToRender);
    const weekdays = dates.filter(d => !isWeekend(d));

    const { completed, missed } = weekdays.reduce((acc, date) => {
        const dKey = getDateKey(date);
        const dayOfWeek = getDay(date);
        const habitDef = DEFAULT_WEEKLY_HABITS.find(h => h.day === dayOfWeek && h.active);

        if (habitDef) {
            if (state.habits[dKey]?.[habitDef.id]) {
                acc.completed.push({ date, habitDef });
            } else {
                acc.missed.push({ date, habitDef });
            }
        }
        return acc;
    }, { completed: [], missed: [] });

    const total = completed.length + missed.length;
    const pct = total === 0 ? 0 : Math.round((completed.length / total) * 100);

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <button
                    onClick={() => setViewWeek(prev => Math.max(0, prev - 1))}
                    disabled={weekToRender <= 0}
                    style={{
                        background: TOKENS.teal,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 16px',
                        cursor: weekToRender <= 0 ? 'not-allowed' : 'pointer',
                        opacity: weekToRender <= 0 ? 0.5 : 1
                    }}
                >
                    ← Previous
                </button>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 700, color: TOKENS.tealDeep }}>
                        {weekToRender === 0 ? 'Pre-Launch' : `Week ${weekToRender}`} {isCurrent ? '(Current)' : ''}
                    </div>
                    {dates.length > 0 && (
                        <div style={{ fontSize: 13, color: '#7A7060', marginTop: 4 }}>
                            {format(dates[0], 'MMM d, yyyy')} – {format(dates[6], 'MMM d, yyyy')}
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setViewWeek(prev => Math.min(53, prev + 1))}
                    disabled={weekToRender >= 53 || (isCurrent && weekToRender === currentPlanWeek)}
                    style={{
                        background: TOKENS.teal,
                        color: '#fff',
                        border: 'none',
                        borderRadius: 8,
                        padding: '8px 16px',
                        cursor: (weekToRender >= 53 || isCurrent) ? 'not-allowed' : 'pointer',
                        opacity: (weekToRender >= 53 || isCurrent) ? 0.5 : 1
                    }}
                >
                    Next →
                </button>
            </div>

            <SectionCard title="Weekly Habit Completion">
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
                    <div style={{ fontSize: 32, fontWeight: 700, color: TOKENS.gold }}>
                        {pct}%
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ height: 8, background: TOKENS.line, borderRadius: 6, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${pct}%`, background: TOKENS.palm, transition: 'width 0.3s ease' }} />
                        </div>
                        <div style={{ fontSize: 12, color: '#7A7060', marginTop: 6 }}>
                            {completed.length} completed, {missed.length} missed
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>
                    <div>
                        <h3 style={{ fontSize: 14, color: TOKENS.tealDeep, marginBottom: 12 }}>Completed</h3>
                        {completed.length === 0 ? (
                            <div style={{ fontSize: 13, color: '#9A8F73' }}>None recorded.</div>
                        ) : (
                            completed.map(({ date, habitDef }) => (
                                <div key={getDateKey(date)} style={{ fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${TOKENS.line}` }}>
                                    <span style={{ color: TOKENS.palm, marginRight: 8 }}>✓</span>
                                    <strong>{format(date, 'EEE')}:</strong> {habitDef.label}
                                </div>
                            ))
                        )}
                    </div>
                    <div>
                        <h3 style={{ fontSize: 14, color: TOKENS.coral, marginBottom: 12 }}>Missed</h3>
                        {missed.length === 0 ? (
                            <div style={{ fontSize: 13, color: '#9A8F73' }}>None! Perfect week.</div>
                        ) : (
                            missed.map(({ date, habitDef }) => (
                                <div key={getDateKey(date)} style={{ fontSize: 13, padding: '6px 0', borderBottom: `1px solid ${TOKENS.line}` }}>
                                    <span style={{ color: TOKENS.coral, marginRight: 8 }}>✗</span>
                                    <strong>{format(date, 'EEE')}:</strong> {habitDef.label}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </SectionCard>

            <SectionCard title="Resume Impact" subtitle="Achievements logged during this week">
                {/* Find achievements that happened during this week's dates */}
                {(() => {
                    const weekDateKeys = dates.map(d => getDateKey(d));
                    const achievements = state.resumeEngine.achievements.filter(a => weekDateKeys.includes(a.date));

                    if (achievements.length === 0) {
                        return <div style={{ fontSize: 13, color: '#9A8F73' }}>No resume evidence recorded this week.</div>;
                    }

                    return achievements.map(a => (
                        <div key={a.id} style={{ padding: '10px 12px', background: '#fff', border: `1px solid ${TOKENS.line}`, borderRadius: 8, marginBottom: 8 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{a.title}</div>
                            <div style={{ fontSize: 12, color: TOKENS.palm, marginTop: 4 }}>Category: {a.category}</div>
                        </div>
                    ));
                })()}
            </SectionCard>
        </div>
    );
}
