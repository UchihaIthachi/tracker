import React, { useState, useEffect } from 'react';
import { uuidv4 } from '../../utils/uuid.js';
import { getDateKey } from '../../utils/dates.js';

const CATEGORIES = [
    { id: 'numeric', label: 'Numeric Impact' },
    { id: 'fintech', label: 'FinTech Standards' },
    { id: 'jvm', label: 'JVM Lab' },
    { id: 'scale', label: 'Scale Metrics' },
    { id: 'architecture', label: 'Architecture Ledger' }
];

const CONFIDENCE_LEVELS = ['Unverified', 'Estimated', 'Measured', 'Production Verified'];

const initialForm = {
    title: '', category: 'numeric', confidence: 'Unverified',
    before: '', after: '', metric: '', description: '', technologies: '', date: ''
};

export function ResumeEntryForm({ onSave, onCancel, initialData = null }) {
    const [formData, setFormData] = useState(initialForm);

    useEffect(() => {
        if (initialData) {
            setFormData({
                ...initialData,
                technologies: Array.isArray(initialData.technologies) ? initialData.technologies.join(', ') : ''
            });
        } else {
            setFormData({ ...initialForm, date: getDateKey(new Date()) });
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return alert('Title is required');

        const entry = {
            ...formData,
            id: formData.id || uuidv4(),
            technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
            updatedAt: new Date().toISOString()
        };
        if(!entry.createdAt) entry.createdAt = new Date().toISOString();

        onSave(entry);
    };

    const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));

    return (
        <form onSubmit={handleSubmit} style={{
            background: '#FFFDF8',
            border: '1px solid #E4D9BE',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px'
        }}>
            <h3 style={{ margin: '0 0 16px', color: '#123B36' }}>{initialData ? 'Edit Evidence' : 'Log New Evidence'}</h3>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 200px' }}>
                    <label style={labelStyle}>Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} style={inputStyle}>
                        {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                    </select>
                </div>
                <div style={{ flex: '1 1 200px' }}>
                    <label style={labelStyle}>Confidence Level</label>
                    <select name="confidence" value={formData.confidence} onChange={handleChange} style={inputStyle}>
                        {CONFIDENCE_LEVELS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Title / Achievement</label>
                <input name="title" value={formData.title} onChange={handleChange} style={inputStyle} placeholder="e.g., Optimized order routing pipeline" required />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 150px' }}>
                    <label style={labelStyle}>Metric Name (optional)</label>
                    <input name="metric" value={formData.metric} onChange={handleChange} style={inputStyle} placeholder="e.g., Latency" />
                </div>
                <div style={{ flex: '1 1 150px' }}>
                    <label style={labelStyle}>Before</label>
                    <input name="before" value={formData.before} onChange={handleChange} style={inputStyle} placeholder="e.g., 800ms" />
                </div>
                <div style={{ flex: '1 1 150px' }}>
                    <label style={labelStyle}>After</label>
                    <input name="after" value={formData.after} onChange={handleChange} style={inputStyle} placeholder="e.g., 500ms" />
                </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Description / Problem / Investigation</label>
                <textarea name="description" value={formData.description} onChange={handleChange} style={{...inputStyle, height: '80px', resize: 'vertical'}} placeholder="What changed technically?" />
            </div>

            <div style={{ marginBottom: '16px' }}>
                <label style={labelStyle}>Technologies Used (comma separated)</label>
                <input name="technologies" value={formData.technologies} onChange={handleChange} style={inputStyle} placeholder="Kafka, PostgreSQL, Spring Boot" />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px', flexWrap: 'wrap' }}>
                <button type="button" onClick={onCancel} style={btnSecondary}>Cancel</button>
                <button type="submit" style={btnPrimary}>Save Evidence</button>
            </div>
        </form>
    );
}

const labelStyle = { display: 'block', fontSize: '12px', fontWeight: 600, color: '#7A7060', marginBottom: '4px' };
const inputStyle = { width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E4D9BE', boxSizing: 'border-box', fontFamily: 'inherit' };
const btnPrimary = { background: '#1F5C54', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
const btnSecondary = { background: 'transparent', color: '#6B4226', border: '1px solid #E4D9BE', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' };
