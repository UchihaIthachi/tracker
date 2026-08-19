import React, { useState } from 'react';
import { TOKENS } from '../../data/constants.js';
import { ResumeMetricCard } from './ResumeMetricCard.jsx';
import { ResumeEntryForm } from './ResumeEntryForm.jsx';
import { ResumeBulletBuilder } from './ResumeBulletBuilder.jsx';
import { InterviewDrill } from './InterviewDrill.jsx';

export function ResumeEngine({ resumeEngineState, onSaveEvidence, onDeleteEvidence, onTogglePrep }) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingEntry, setEditingEntry] = useState(null);

    const handleEdit = (entry) => {
        setEditingEntry(entry);
        setIsFormOpen(true);
    };

    const handleSave = (entry) => {
        onSaveEvidence(entry);
        setIsFormOpen(false);
        setEditingEntry(null);
    };

    const achievements = resumeEngineState.achievements || [];

    return (
        <div>
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 28, fontWeight: 700, margin: 0, color: TOKENS.tealDeep }}>
                        CAL Resume Engine
                    </h1>
                    <p style={{ fontSize: 14, color: "#7A7060", margin: "4px 0 0" }}>
                        Convert daily work into measurable interview evidence.
                    </p>
                </div>
                {!isFormOpen && (
                    <button
                        onClick={() => setIsFormOpen(true)}
                        style={{
                            background: TOKENS.tealDeep,
                            color: '#fff',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: 8,
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        + Log Evidence
                    </button>
                )}
            </div>

            {isFormOpen && (
                <ResumeEntryForm
                    initialData={editingEntry}
                    onSave={handleSave}
                    onCancel={() => { setIsFormOpen(false); setEditingEntry(null); }}
                />
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24, marginBottom: 32 }}>
                <div>
                    <h3 style={{ fontSize: 16, color: TOKENS.tealDeep, borderBottom: `2px solid ${TOKENS.line}`, paddingBottom: 8, marginBottom: 16 }}>
                        Numeric & Scale Metrics
                    </h3>
                    {achievements.filter(a => ['numeric', 'scale'].includes(a.category)).length === 0 ? (
                        <div style={{ fontSize: 13, color: '#9A8F73' }}>No entries yet.</div>
                    ) : (
                        achievements.filter(a => ['numeric', 'scale'].includes(a.category)).map(a => (
                            <ResumeMetricCard key={a.id} achievement={a} onEdit={handleEdit} onDelete={onDeleteEvidence} />
                        ))
                    )}
                </div>

                <div>
                    <h3 style={{ fontSize: 16, color: TOKENS.tealDeep, borderBottom: `2px solid ${TOKENS.line}`, paddingBottom: 8, marginBottom: 16 }}>
                        Architecture & Tech Traction
                    </h3>
                    {achievements.filter(a => ['architecture', 'fintech'].includes(a.category)).length === 0 ? (
                        <div style={{ fontSize: 13, color: '#9A8F73' }}>No entries yet.</div>
                    ) : (
                        achievements.filter(a => ['architecture', 'fintech'].includes(a.category)).map(a => (
                            <ResumeMetricCard key={a.id} achievement={a} onEdit={handleEdit} onDelete={onDeleteEvidence} />
                        ))
                    )}
                </div>

                <div>
                    <h3 style={{ fontSize: 16, color: TOKENS.tealDeep, borderBottom: `2px solid ${TOKENS.line}`, paddingBottom: 8, marginBottom: 16 }}>
                        JVM Performance Lab
                    </h3>
                    {achievements.filter(a => a.category === 'jvm').length === 0 ? (
                        <div style={{ fontSize: 13, color: '#9A8F73' }}>No entries yet.</div>
                    ) : (
                        achievements.filter(a => a.category === 'jvm').map(a => (
                            <ResumeMetricCard key={a.id} achievement={a} onEdit={handleEdit} onDelete={onDeleteEvidence} />
                        ))
                    )}
                </div>
            </div>

            <div style={{ borderTop: `1px solid ${TOKENS.line}`, paddingTop: 32 }}>
                <ResumeBulletBuilder achievements={achievements} />
                <InterviewDrill
                    achievements={achievements}
                    interviewPrepState={resumeEngineState.interviewPrep || {}}
                    onTogglePrep={onTogglePrep}
                />
            </div>
        </div>
    );
}
