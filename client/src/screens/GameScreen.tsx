/* ============================================
   GameScreen — Hosts the nonogram puzzle
   Design: Retro Japanese Puzzle Magazine
   ============================================ */

import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Level, Difficulty, InputMode } from '../utils/types';
import { parseSolution } from '../utils/parse';
import { useGameReducer } from '../hooks/useGameReducer';
import NonogramBoard from '../components/NonogramBoard';
import HeaderBar from '../components/HeaderBar';

interface Props {
  level: Level;
  difficulty: Difficulty;
  onWin: () => void;
  onLose: () => void;
  onBack: () => void;
}

function getLives(difficulty: Difficulty): number {
  switch (difficulty) {
    case 'easy': return 5;
    case 'medium': return 3;
    case 'hard': return 3;
  }
}

export default function GameScreen({ level, difficulty, onWin, onLose, onBack }: Props) {
  const maxLives = getLives(difficulty);
  const solution = useMemo(() => parseSolution(level.solution), [level]);
  const { state, fillCell, toggleMark, resetGame } = useGameReducer(level.size, maxLives);
  const [inputMode, setInputMode] = useState<InputMode>('fill');

  // Reset game when level changes
  useEffect(() => {
    resetGame(level.size, maxLives);
    setInputMode('fill');
  }, [level.id, maxLives, level.size, resetGame]);

  // Watch for win/loss
  useEffect(() => {
    if (state.status === 'won') {
      const t = setTimeout(onWin, 400);
      return () => clearTimeout(t);
    }
  }, [state.status, onWin]);

  const handleFillCell = useCallback((row: number, col: number) => {
    fillCell(row, col, solution);
  }, [fillCell, solution]);

  const handleRetry = () => {
    resetGame(level.size, maxLives);
    setInputMode('fill');
  };

  const disabled = state.status !== 'playing';

  return (
    <div>
      <HeaderBar
        lives={state.lives}
        maxLives={state.maxLives}
        levelTitle={`${level.icon} ${level.title}`}
        inputMode={inputMode}
        onBack={onBack}
        onToggleMode={() => setInputMode(m => m === 'fill' ? 'mark' : 'fill')}
        showModeToggle={true}
      />

      <NonogramBoard
        grid={state.grid}
        solution={solution}
        gridSize={level.size}
        disabled={disabled}
        inputMode={inputMode}
        onFillCell={handleFillCell}
        onToggleMark={toggleMark}
      />

      {state.status === 'lost' && (
        <div className="game-status-overlay">
          <h2>Puzzle Failed</h2>
          <p className="story-text" style={{ marginBottom: '1rem' }}>
            Don't worry — every puzzle deserves another try.
          </p>
          <button className="btn" onClick={handleRetry}>
            RETRY
          </button>
          <button className="btn" onClick={onBack} style={{ marginLeft: '0.5rem' }}>
            BACK TO MAP
          </button>
        </div>
      )}

      {state.status === 'won' && (
        <div className="game-status-overlay">
          <h2>Solved!</h2>
        </div>
      )}
    </div>
  );
}
