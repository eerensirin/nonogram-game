/* ============================================
   CompleteScreen — Post-puzzle reveal with pixel art and story outro
   Design: Retro Japanese Puzzle Magazine
   ============================================ */

import { useMemo } from 'react';
import type { Level, ScreenName } from '../utils/types';
import { parseSolution } from '../utils/parse';
import PixelReveal from '../components/PixelReveal';
import { LEVELS } from '../data/levels';

interface Props {
  level: Level;
  onNext: () => void;
  onNavigate: (screen: ScreenName) => void;
  isLastLevel: boolean;
}

export default function CompleteScreen({ level, onNext, onNavigate, isLastLevel }: Props) {
  const solution = useMemo(() => parseSolution(level.solution), [level]);

  // Check if this is the last level of a chapter
  const chapterLevels = LEVELS.filter(l => l.chapter === level.chapter);
  const isChapterEnd = level.order === chapterLevels.length;

  const revealCellSize = level.size <= 10 ? 12 : level.size <= 15 ? 8 : 6;

  return (
    <div className="complete-screen">
      <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{level.icon}</div>
      <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{level.title}</h2>

      <PixelReveal solution={solution} cellSize={revealCellSize} />

      {isChapterEnd && (
        <div className="chapter-stamp">
          CH.{level.chapter} COMPLETE
        </div>
      )}

      <div className="story-divider" />

      {level.storyOutro.map((line, i) => (
        <p key={i} className="story-text">
          <em>{line}</em>
        </p>
      ))}

      <div className="story-divider" />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <button className="btn" onClick={() => onNavigate('map')}>
          MAP
        </button>
        {isLastLevel ? (
          <button className="btn btn-primary" onClick={() => onNavigate('finalLetter')}>
            ♥ READ THE LETTER
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onNext}>
            NEXT →
          </button>
        )}
      </div>
    </div>
  );
}
