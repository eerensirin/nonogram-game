/* ============================================
   CluesLeft — Row clues aligned left of each row
   ============================================ */

import { memo } from 'react';
import type { CellState } from '../utils/types';
import { isRowClueSatisfied } from '../utils/clues';

interface Props {
  rowClues: number[][];
  rowIndex: number;
  gridSize: number;
  grid: CellState[][];
  solution: boolean[][];
  cellSize: number;
}

function CluesLeft({ rowClues, rowIndex, gridSize, grid, solution, cellSize }: Props) {
  const clue = rowClues[rowIndex];
  const maxClueLen = Math.max(...rowClues.map(c => c.length));
  const clueWidth = maxClueLen * (gridSize <= 10 ? 20 : gridSize <= 15 ? 16 : 14);
  const satisfied = isRowClueSatisfied(rowIndex, grid, solution);

  return (
    <div
      className="nonogram-row-clue"
      style={{
        width: clueWidth,
        height: cellSize,
      }}
    >
      {clue.map((n, ni) => (
        <span key={ni} className={satisfied ? 'clue-satisfied' : ''}>
          {n}
        </span>
      ))}
    </div>
  );
}

export default memo(CluesLeft);
