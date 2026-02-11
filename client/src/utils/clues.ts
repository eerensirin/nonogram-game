/* ============================================
   Nonogram Story — Clue Computation
   ============================================ */

/**
 * Compute row clues from a boolean solution grid.
 * Each row clue is an array of consecutive filled-cell counts.
 */
export function computeRowClues(solution: boolean[][]): number[][] {
  return solution.map(row => {
    const clues: number[] = [];
    let count = 0;
    for (const cell of row) {
      if (cell) {
        count++;
      } else {
        if (count > 0) clues.push(count);
        count = 0;
      }
    }
    if (count > 0) clues.push(count);
    return clues.length > 0 ? clues : [0];
  });
}

/**
 * Compute column clues from a boolean solution grid.
 */
export function computeColClues(solution: boolean[][]): number[][] {
  if (solution.length === 0) return [];
  const cols = solution[0].length;
  const clues: number[][] = [];

  for (let c = 0; c < cols; c++) {
    const colClue: number[] = [];
    let count = 0;
    for (let r = 0; r < solution.length; r++) {
      if (solution[r][c]) {
        count++;
      } else {
        if (count > 0) colClue.push(count);
        count = 0;
      }
    }
    if (count > 0) colClue.push(count);
    clues.push(colClue.length > 0 ? colClue : [0]);
  }

  return clues;
}

/**
 * Check if a specific row clue is fully satisfied.
 */
export function isRowClueSatisfied(
  rowIndex: number,
  grid: import('./types').CellState[][],
  solution: boolean[][]
): boolean {
  const row = grid[rowIndex];
  if (!row) return false;
  const solRow = solution[rowIndex];
  // Check: every solution-filled cell is filled in grid
  for (let c = 0; c < row.length; c++) {
    if (solRow[c] && row[c] !== 'filled') return false;
    if (!solRow[c] && row[c] === 'filled') return false;
  }
  return true;
}

/**
 * Check if a specific column clue is fully satisfied.
 */
export function isColClueSatisfied(
  colIndex: number,
  grid: import('./types').CellState[][],
  solution: boolean[][]
): boolean {
  for (let r = 0; r < grid.length; r++) {
    if (solution[r][colIndex] && grid[r][colIndex] !== 'filled') return false;
    if (!solution[r][colIndex] && grid[r][colIndex] === 'filled') return false;
  }
  return true;
}
