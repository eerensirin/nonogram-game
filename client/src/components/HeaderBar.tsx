/* ============================================
   HeaderBar — Lives display, back button, level info, mode toggle
   ============================================ */

import type { InputMode } from '../utils/types';

interface Props {
  lives: number;
  maxLives: number;
  levelTitle: string;
  inputMode: InputMode;
  onBack: () => void;
  onToggleMode: () => void;
  showModeToggle: boolean;
}

export default function HeaderBar({
  lives,
  maxLives,
  levelTitle,
  inputMode,
  onBack,
  onToggleMode,
  showModeToggle,
}: Props) {
  return (
    <div className="header-bar">
      <div className="header-bar-left">
        <button className="btn btn-small" onClick={onBack}>
          ← MAP
        </button>
        <span style={{ fontSize: '0.85rem' }}>{levelTitle}</span>
      </div>
      <div className="header-bar-right">
        {showModeToggle && (
          <div className="mobile-toggle">
            <button
              className={`mobile-toggle-btn ${inputMode === 'fill' ? 'active' : ''}`}
              onClick={() => inputMode !== 'fill' && onToggleMode()}
            >
              FILL
            </button>
            <button
              className={`mobile-toggle-btn ${inputMode === 'mark' ? 'active' : ''}`}
              onClick={() => inputMode !== 'mark' && onToggleMode()}
            >
              ✕ MARK
            </button>
          </div>
        )}
        <div className="lives-display">
          <span className="heart">♥</span> {lives}/{maxLives}
        </div>
      </div>
    </div>
  );
}
