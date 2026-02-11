/* ============================================
   HomeScreen — Title, Continue, New Game, Settings
   Design: Retro Japanese Puzzle Magazine
   Uses generated hero background texture
   ============================================ */

import type { Difficulty, ScreenName } from '../utils/types';

const HERO_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/VbIMjTH1JkkhGzA8ytDSN3/sandbox/zsKWUO8HijTDpOglJAsLwv-img-1_1770845656000_na1fn_aGVyby1iZw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVmJJTWpUSDFKa2toR3pBOHl0RFNOMy9zYW5kYm94L3pzS1dVTzhIaWpURHBPZ2xKQXNMd3YtaW1nLTFfMTc3MDg0NTY1NjAwMF9uYTFmbl9hR1Z5YnkxaVp3LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=g38OT109BWOooa9uiapOYv5qEt3oGuKJUEO1dGuxJ8KtERhHB8kvJR92m~Zj0iPncVW73FrvsDWy4zhPEqw7xUpCxX8EsDN-8KWJSBMQ-lO3b2fwOrb~M8yM0l-UumB932KIubL3EkR9hLUc~wbI1LQHBIKfRTXFoNYvicehEnRy1cgu2YhAtmUbtRh61~nsKAm~5gFQSnunhe1KdfoOjfQr270NArVlcKSKqwz8Wgu3TtYFEU5dK-hK2qZTWpCIf7Ja4OvMRo6SkbMlYvxQEBSxvCtBs8MiOyTbQKrhmKyRahqI6TzF5VpLGNIQfEk4bHrjxH~Dheqtc4QSPWNqdQ__';

interface Props {
  difficulty: Difficulty;
  onSetDifficulty: (d: Difficulty) => void;
  onNavigate: (screen: ScreenName) => void;
  hasSavedProgress: boolean;
  onContinue: () => void;
}

export default function HomeScreen({
  difficulty,
  onSetDifficulty,
  onNavigate,
  hasSavedProgress,
  onContinue,
}: Props) {
  return (
    <div
      className="home-screen"
      style={{
        backgroundImage: `url(${HERO_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem', color: '#2C2C2C' }}>✦</div>
      <h1 className="home-title">Nonogram Story</h1>
      <p className="home-subtitle">a puzzle journey, for you</p>

      <div className="difficulty-selector">
        {(['easy', 'medium', 'hard'] as Difficulty[]).map(d => (
          <button
            key={d}
            className={`difficulty-option ${difficulty === d ? 'active' : ''}`}
            onClick={() => onSetDifficulty(d)}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="home-actions">
        {hasSavedProgress && (
          <button className="btn btn-primary" onClick={onContinue}>
            CONTINUE
          </button>
        )}
        <button className="btn" onClick={() => onNavigate('map')}>
          {hasSavedProgress ? 'MAP' : 'START'}
        </button>
        <button className="btn btn-small" onClick={() => onNavigate('settings')}>
          SETTINGS
        </button>
      </div>

      <div style={{ marginTop: '2rem', fontSize: '0.7rem', color: '#8A8078', fontFamily: "'Source Code Pro', monospace" }}>
        40 puzzles · 3 chapters · 1 story
      </div>
    </div>
  );
}
