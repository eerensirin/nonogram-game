/* ============================================
   StoryIntroScreen — Story intro before puzzle
   Design: Retro Japanese Puzzle Magazine
   ============================================ */

import type { Level } from '../utils/types';

interface Props {
  level: Level;
  onStart: () => void;
  onBack: () => void;
}

export default function StoryIntroScreen({ level, onStart, onBack }: Props) {
  return (
    <div className="story-screen">
      <div className="story-icon">{level.icon}</div>
      <h2 className="story-title">{level.title}</h2>

      <div className="story-divider" />

      {level.storyIntro.map((line, i) => (
        <p key={i} className="story-text">
          <em>{line}</em>
        </p>
      ))}

      <div className="story-divider" />

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
        <button className="btn" onClick={onBack}>
          BACK
        </button>
        <button className="btn btn-primary" onClick={onStart}>
          PLAY
        </button>
      </div>

      <div style={{ marginTop: '1.5rem', fontSize: '0.7rem', color: '#B0A89E', fontFamily: "'Source Code Pro', monospace" }}>
        {level.size}×{level.size} · CH.{level.chapter} · #{level.order}
      </div>
    </div>
  );
}
