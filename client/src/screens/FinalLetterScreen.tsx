/* ============================================
   FinalLetterScreen — The final love letter
   Design: Retro Japanese Puzzle Magazine
   Uses generated letter background texture
   ============================================ */

import { FINAL_LETTER } from '../data/letter';
import type { ScreenName } from '../utils/types';

const LETTER_BG = 'https://private-us-east-1.manuscdn.com/sessionFile/VbIMjTH1JkkhGzA8ytDSN3/sandbox/zsKWUO8HijTDpOglJAsLwv-img-3_1770845660000_na1fn_ZmluYWwtbGV0dGVyLWJn.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvVmJJTWpUSDFKa2toR3pBOHl0RFNOMy9zYW5kYm94L3pzS1dVTzhIaWpURHBPZ2xKQXNMd3YtaW1nLTNfMTc3MDg0NTY2MDAwMF9uYTFmbl9abWx1WVd3dGJHVjBkR1Z5TFdKbi5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Hze9Q7i9k-W2DjvkN3xg25EZo2O7kcFq-zv0WkWVcYywq1gxSHMjv-sih5GvDO3SNZkYNzD8U4E1Lmhxx4EyFudK2DnbfC5Zt0UOcqwwg3qpn4I3Hb5gqlyOfawnqUFCvaoVc-b9exdAwhmObb~Mhh44yzB587kqF54e3CuZbu3skyZG~49me3PdGxPLV3vzT0-Bm-jzle2C1kqcEYLi94e2TZfVAegOZDKf~2V1-ldbaBOXvZvUwpcpnOleU2~WK9ywsjd~uusb1RdSlGB10xCn7MrcKTpZKhBIha3EWKc-bMZAL0yUyEtm-UIvJXfNcBvlPggoiuiNELU0hzCO0w__';

interface Props {
  onNavigate: (screen: ScreenName) => void;
}

export default function FinalLetterScreen({ onNavigate }: Props) {
  return (
    <div
      className="final-letter-screen"
      style={{
        backgroundImage: `url(${LETTER_BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✦</div>
        <h1 className="final-letter-title">{FINAL_LETTER.title}</h1>
        <div className="story-divider" style={{ margin: '0 auto' }} />
      </div>

      <div className="final-letter-body">
        {FINAL_LETTER.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="story-divider" style={{ margin: '2rem auto' }} />

      <div className="final-letter-sign">
        {FINAL_LETTER.signature}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <button className="btn" onClick={() => onNavigate('map')}>
          BACK TO MAP
        </button>
      </div>
    </div>
  );
}
