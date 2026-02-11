/* ============================================
   MapScreen — Chapter map with winding path nodes
   Design: Retro Japanese Puzzle Magazine
   ============================================ */

import { LEVELS } from '../data/levels';
import type { ScreenName, Chapter } from '../utils/types';

interface Props {
  solvedLevels: Set<string>;
  chaptersUnlocked: number[];
  onSelectLevel: (levelId: string) => void;
  onNavigate: (screen: ScreenName) => void;
}

export default function MapScreen({
  solvedLevels,
  chaptersUnlocked,
  onSelectLevel,
  onNavigate,
}: Props) {
  // Determine which levels are unlocked
  const getUnlockedLevels = (): Set<string> => {
    const unlocked = new Set<string>();
    for (const chapter of [1, 2, 3] as Chapter[]) {
      if (!chaptersUnlocked.includes(chapter)) continue;
      const chapterLevels = LEVELS.filter(l => l.chapter === chapter);
      for (const level of chapterLevels) {
        if (level.order === 1) {
          unlocked.add(level.id);
          continue;
        }
        const prevLevel = chapterLevels.find(l => l.order === level.order - 1);
        if (prevLevel && solvedLevels.has(prevLevel.id)) {
          unlocked.add(level.id);
        }
      }
    }
    return unlocked;
  };

  const unlockedLevels = getUnlockedLevels();

  const currentLevelId = LEVELS.find(
    l => unlockedLevels.has(l.id) && !solvedLevels.has(l.id)
  )?.id;

  const chapterNames: Record<number, { name: string; sub: string }> = {
    1: { name: 'First Light', sub: '10×10' },
    2: { name: 'Growing Closer', sub: '15×15' },
    3: { name: 'Forever', sub: '20×20' },
  };

  let lastChapter = 0;

  return (
    <div className="map-container">
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <button className="btn btn-small" onClick={() => onNavigate('home')}>
          ← HOME
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Puzzle Map</h2>
        <div style={{
          fontSize: '0.75rem',
          color: '#8A8078',
          fontFamily: "'Source Code Pro', monospace",
          marginTop: '0.25rem'
        }}>
          {solvedLevels.size} / {LEVELS.length} completed
        </div>
      </div>

      <div className="map-path">
        {LEVELS.map((level, idx) => {
          const isUnlocked = unlockedLevels.has(level.id);
          const isSolved = solvedLevels.has(level.id);
          const isCurrent = level.id === currentLevelId;
          const showChapterHeader = level.chapter !== lastChapter;
          lastChapter = level.chapter;

          const chapterInfo = chapterNames[level.chapter];

          return (
            <div key={level.id}>
              {showChapterHeader && (
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div className="map-chapter-header">
                    CH.{level.chapter} — {chapterInfo.name} ({chapterInfo.sub})
                  </div>
                </div>
              )}
              {idx > 0 && !showChapterHeader && <div className="map-connector" />}
              <button
                className={`map-node ${isSolved ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${!isUnlocked ? 'locked' : ''}`}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && onSelectLevel(level.id)}
                style={{ textAlign: 'left' }}
              >
                <div className="map-node-number">
                  {isSolved ? '✓' : level.order}
                </div>
                <div className="map-node-icon">{level.icon}</div>
                <div className="map-node-title">{level.title}</div>
                {isSolved && <div className="map-node-check">done</div>}
              </button>
            </div>
          );
        })}

        {/* Final letter node */}
        {solvedLevels.size === LEVELS.length && (
          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <div className="map-connector" />
            <button
              className="btn btn-primary"
              onClick={() => onNavigate('finalLetter')}
              style={{ marginTop: '0.5rem' }}
            >
              ♥ READ THE LETTER ♥
            </button>
          </div>
        )}
      </div>

      <div style={{ height: '3rem' }} />
    </div>
  );
}
