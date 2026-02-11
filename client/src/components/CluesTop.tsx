/* ============================================
   CluesTop — Column clues stacked vertically above each column
   ============================================ */

import { memo } from 'react';
import type { CellState } from '../utils/types';
import { isColClueSatisfied } from '../utils/clues';

interface Props {
  colClues: number[][];
  gridSize: number;
  grid: CellState[][];
  solution: boolean[][];
}

function CluesTop({ colClues, gridSize, grid, solution }: Props) {
  const cellSize = gridSize <= 10 ? 32 : gridSize <= 15 ? 24 : 18;
  const maxClueLen = Math.max(...colClues.map(c => c.length));

  return (
    <div className="nonogram-col-clues-row" style={{ display: 'flex' }}>
      {colClues.map((clue, ci) => {
        const satisfied = isColClueSatisfied(ci, grid, solution);
        return (
          <div
            key={ci}
            className="nonogram-col-clue"
            style={{
              width: cellSize,
              minHeight: maxClueLen * 16,
            }}
          >
            {clue.map((n, ni) => (
              <span key={ni} className={satisfied ? 'clue-satisfied' : ''}>
                {n}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default memo(CluesTop);
