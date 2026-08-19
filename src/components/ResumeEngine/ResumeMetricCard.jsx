import React from 'react';

// Terminal-inspired colors to mix with the Sand theme
const CONSOLE_TOKENS = {
    bg: '#1A1A1A',
    surface: '#252525',
    border: '#333333',
    textMain: '#E0E0E0',
    textMuted: '#888888',
    accentTeal: '#4ECDC4',
    accentGold: '#FFD166',
    accentCoral: '#EF476F',
    accentGreen: '#06D6A0',
};

const CONFIDENCE_COLORS = {
    'Unverified': CONSOLE_TOKENS.textMuted,
    'Estimated': CONSOLE_TOKENS.accentGold,
    'Measured': CONSOLE_TOKENS.accentTeal,
    'Production Verified': CONSOLE_TOKENS.accentGreen
};

export function ResumeMetricCard({ achievement, onEdit, onDelete }) {
    return (
        <div style={{
            background: CONSOLE_TOKENS.surface,
            border: `1px solid ${CONSOLE_TOKENS.border}`,
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
            fontFamily: "'Fira Code', 'Courier New', monospace",
            color: CONSOLE_TOKENS.textMain,
            position: 'relative',
            boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ fontWeight: 600, fontSize: '15px', color: '#fff', wordBreak: 'break-word', flex: 1 }}>
                    {achievement.title}
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button onClick={() => onEdit(achievement)} style={actionBtn}>Edit</button>
                    <button onClick={() => onDelete(achievement.id)} style={{...actionBtn, color: CONSOLE_TOKENS.accentCoral}}>Del</button>
                </div>
            </div>

            <div style={{ fontSize: '12px', color: CONSOLE_TOKENS.textMuted, marginBottom: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{
                    border: `1px solid ${CONFIDENCE_COLORS[achievement.confidence]}`,
                    color: CONFIDENCE_COLORS[achievement.confidence],
                    padding: '2px 6px',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap'
                }}>
                    {achievement.confidence}
                </span>
                <span style={{ whiteSpace: 'nowrap' }}>[{achievement.category.toUpperCase()}]</span>
                <span style={{ whiteSpace: 'nowrap' }}>{achievement.date}</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px' }}>
                {achievement.before && achievement.after && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', background: CONSOLE_TOKENS.bg, padding: '10px', borderRadius: '4px' }}>
                        <div>
                            <div style={{ color: CONSOLE_TOKENS.textMuted, fontSize: '11px', marginBottom: '4px' }}>BEFORE</div>
                            <div style={{ color: CONSOLE_TOKENS.accentCoral, wordBreak: 'break-word' }}>{achievement.before}</div>
                        </div>
                        <div>
                            <div style={{ color: CONSOLE_TOKENS.textMuted, fontSize: '11px', marginBottom: '4px' }}>AFTER</div>
                            <div style={{ color: CONSOLE_TOKENS.accentGreen, wordBreak: 'break-word' }}>{achievement.after}</div>
                        </div>
                    </div>
                )}
                {achievement.metric && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ color: CONSOLE_TOKENS.textMuted }}>Metric:</span>
                        <span style={{ color: CONSOLE_TOKENS.accentTeal }}>{achievement.metric}</span>
                    </div>
                )}
                {achievement.technologies && achievement.technologies.length > 0 && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                        {achievement.technologies.map(t => (
                            <span key={t} style={{ background: CONSOLE_TOKENS.bg, padding: '2px 6px', borderRadius: '4px', fontSize: '11px' }}>
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

const actionBtn = {
    background: 'transparent',
    border: `1px solid ${CONSOLE_TOKENS.border}`,
    color: CONSOLE_TOKENS.textMain,
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    cursor: 'pointer',
    fontFamily: 'inherit'
};
