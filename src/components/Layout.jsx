import React from 'react';
import { TOKENS } from '../data/constants.js';

export function Layout({ children, activeTab, onTabChange, onExport, onImport }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'resume', label: 'Resume Engine' },
    { id: 'history', label: 'History' }
  ];

  const handleImportClick = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json,application/json';
    fileInput.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        onImport(event.target.result);
      };
      reader.readAsText(file);
    };
    fileInput.click();
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', system-ui, sans-serif",
        background: TOKENS.sand,
        minHeight: "100vh",
        color: TOKENS.ink,
      }}
    >
      <header
        style={{
          background: TOKENS.tealDeep,
          color: '#fff',
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, letterSpacing: 0.5 }}>
          FinTech Career OS
        </div>

        <nav
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            paddingBottom: 4 // for scrollbar if it appears
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                background: activeTab === tab.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.7)',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={handleImportClick}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              cursor: 'pointer'
            }}
          >
            Import
          </button>
          <button
            onClick={onExport}
            style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 6,
              fontSize: 12,
              cursor: 'pointer'
            }}
          >
            Export
          </button>
        </div>
      </header>

      <main style={{ padding: "24px 18px" }}>
        <div style={{ maxWidth: activeTab === 'resume' ? 900 : 640, margin: "0 auto", transition: 'max-width 0.3s ease' }}>
          {children}
        </div>
      </main>
    </div>
  );
}
