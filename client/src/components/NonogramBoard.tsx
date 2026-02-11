/* ============================================
   NonogramBoard — Full puzzle grid with clues
   Design: Retro Japanese Puzzle Magazine
   Responsive: fits viewport, larger cells for usability
   ============================================ */

import { useMemo } from 'react';
import type { CellState, InputMode } from '../utils/types';
import { computeRowClues, computeColClues } from '../utils/clues';
import NonogramCell from './NonogramCell';
import CluesTop from './CluesTop';
import CluesLeft from './CluesLeft';

interface Props {
  grid: CellState[][];
  solution: boolean[][];
  gridSize: number;
  disabled: boolean;
  inputMode: InputMode;
  onFillCell: (row: number, col: number) => void;
  onToggleMark: (row: number, col: number) => void;
}

export default function NonogramBoard({
  grid,
  solution,
  gridSize,
  disabled,
  inputMode,
  onFillCell,
  onToggleMark,
}: Props) {
  const rowClues = useMemo(() => computeRowClues(solution), [solution]);
  const colClues = useMemo(() => computeColClues(solution), [solution]);

  const cellSize = gridSize <= 10 ? 32 : gridSize <= 15 ? 24 : 18;
  const maxRowClueLen = Math.max(...rowClues.map(c => c.length));
  const clueWidth = maxRowClueLen * (gridSize <= 10 ? 20 : gridSize <= 15 ? 16 : 14);

  const handleLeftClick = (r: number, c: number) => {
    if (inputMode === 'fill') {
      onFillCell(r, c);
    } else {
      onToggleMark(r, c);
    }
  };

  const handleRightClick = (r: number, c: number) => {
    onToggleMark(r, c);
  };

  return (
    <div className="nonogram-wrapper no-select">
      <div className="nonogram-table">
        {/* Top area: corner + column clues */}
        <div className="nonogram-top-area">
          <div className="nonogram-corner" style={{ width: clueWidth }} />
          <CluesTop
            colClues={colClues}
            gridSize={gridSize}
            grid={grid}
            solution={solution}
          />
        </div>

        {/* Body: row clues + grid */}
        <div className="nonogram-body-area">
          {grid.map((row, ri) => (
            <div key={ri} className="nonogram-row">
              <CluesLeft
                rowClues={rowClues}
                rowIndex={ri}
                gridSize={gridSize}
                grid={grid}
                solution={solution}
                cellSize={cellSize}
              />
              <div className="nonogram-grid-row">
                {row.map((cell, ci) => (
                  <NonogramCell
                    key={`${ri}-${ci}`}
                    state={cell}
                    size={gridSize}
                    disabled={disabled}
                    borderRightThick={(ci + 1) % 5 === 0 && ci < gridSize - 1}
                    borderBottomThick={(ri + 1) % 5 === 0 && ri < gridSize - 1}
                    borderLeftThick={ci === 0}
                    borderTopThick={ri === 0}
                    onLeftClick={() => handleLeftClick(ri, ci)}
                    onRightClick={() => handleRightClick(ri, ci)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
