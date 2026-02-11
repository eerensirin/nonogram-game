/* ============================================
   SettingsScreen — Reset progress, Export/Import
   Design: Retro Japanese Puzzle Magazine
   ============================================ */

import { useState } from 'react';
import { exportSave, importSave, resetSave } from '../utils/storage';
import type { ScreenName } from '../utils/types';

interface Props {
  onNavigate: (screen: ScreenName) => void;
  onReset: () => void;
}

export default function SettingsScreen({ onNavigate, onReset }: Props) {
  const [exportText, setExportText] = useState('');
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    setExportText(exportSave());
  };

  const handleImport = () => {
    const success = importSave(importText);
    setImportStatus(success ? 'success' : 'error');
    if (success) {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  const handleReset = () => {
    resetSave();
    onReset();
    setShowResetConfirm(false);
  };

  return (
    <div className="settings-panel">
      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn btn-small" onClick={() => onNavigate('home')}>
          ← BACK
        </button>
      </div>

      <h2 style={{ marginBottom: '1.5rem' }}>Settings</h2>

      {/* Export */}
      <div className="settings-section">
        <h3>Export Progress</h3>
        <p style={{ fontSize: '0.85rem', color: '#8A8078', marginBottom: '0.5rem' }}>
          Copy this JSON to save your progress externally.
        </p>
        <button className="btn btn-small" onClick={handleExport}>
          GENERATE EXPORT
        </button>
        {exportText && (
          <div className="export-area">
            <textarea
              readOnly
              value={exportText}
              onClick={(e) => (e.target as HTMLTextAreaElement).select()}
            />
          </div>
        )}
      </div>

      {/* Import */}
      <div className="settings-section">
        <h3>Import Progress</h3>
        <p style={{ fontSize: '0.85rem', color: '#8A8078', marginBottom: '0.5rem' }}>
          Paste exported JSON to restore progress.
        </p>
        <div className="export-area">
          <textarea
            value={importText}
            onChange={(e) => {
              setImportText(e.target.value);
              setImportStatus('idle');
            }}
            placeholder="Paste JSON here..."
          />
        </div>
        <button
          className="btn btn-small"
          onClick={handleImport}
          style={{ marginTop: '0.5rem' }}
          disabled={!importText.trim()}
        >
          IMPORT
        </button>
        {importStatus === 'success' && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#8B9E7E' }}>
            Success! Reloading...
          </span>
        )}
        {importStatus === 'error' && (
          <span style={{ marginLeft: '0.5rem', fontSize: '0.8rem', color: '#C4725A' }}>
            Invalid data. Please check the JSON.
          </span>
        )}
      </div>

      {/* Reset */}
      <div className="settings-section">
        <h3>Reset Progress</h3>
        {!showResetConfirm ? (
          <button className="btn btn-small btn-danger" onClick={() => setShowResetConfirm(true)}>
            RESET ALL PROGRESS
          </button>
        ) : (
          <div>
            <p style={{ fontSize: '0.85rem', color: '#C4725A', marginBottom: '0.5rem' }}>
              Are you sure? This cannot be undone.
            </p>
            <button className="btn btn-small btn-danger" onClick={handleReset}>
              YES, RESET
            </button>
            <button
              className="btn btn-small"
              onClick={() => setShowResetConfirm(false)}
              style={{ marginLeft: '0.5rem' }}
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
