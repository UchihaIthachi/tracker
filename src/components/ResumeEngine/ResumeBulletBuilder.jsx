import React, { useState } from 'react';
import { TOKENS } from '../../data/constants.js';

export function ResumeBulletBuilder({ achievements }) {
    const [selectedId, setSelectedId] = useState(achievements[0]?.id || '');

    const selected = achievements.find(a => a.id === selectedId);

    if (achievements.length === 0) {
        return (
            <div style={{ padding: '20px', background: '#fff', border: `1px solid ${TOKENS.line}`, borderRadius: 12 }}>
                <p style={{ color: '#7A7060', fontSize: 14 }}>Log evidence first to build resume bullets.</p>
            </div>
        );
    }

    const generateBullet = (a) => {
        if (!a) return '';

        let action = "Optimized";
        if(a.category === 'architecture') action = "Architected";
        else if(a.category === 'fintech') action = "Implemented";

        const techStr = (a.technologies && a.technologies.length > 0) ? ` using ${a.technologies.join(', ')}` : '';
        const metricStr = (a.before && a.after) ? `, improving ${a.metric || 'performance'} from ${a.before} to ${a.after}` : '';

        return `${action} ${a.title.toLowerCase()}${techStr}${metricStr}.`;
    };

    return (
        <div style={{ padding: '20px', background: '#fff', border: `1px solid ${TOKENS.line}`, borderRadius: 12, marginBottom: 20 }}>
            <h3 style={{ margin: '0 0 16px', color: TOKENS.tealDeep }}>Resume Bullet Builder</h3>
            <div style={{ marginBottom: 16 }}>
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
                <div style={{ background: '#F8F9FA', padding: '16px', borderRadius: 8, borderLeft: `4px solid ${TOKENS.teal}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#7A7060', marginBottom: 8, textTransform: 'uppercase' }}>
                        Action + Technical Change + Measurable Result
                    </div>
                    <div style={{ fontSize: 15, lineHeight: 1.5, color: TOKENS.ink }}>
                        {generateBullet(selected)}
                    </div>
                </div>
            )}
        </div>
    );
}
