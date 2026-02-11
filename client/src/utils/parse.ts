/* ============================================
   Nonogram Story — Solution Parser
   ============================================ */

/**
 * Parse solution strings into a 2D boolean array.
 * '#' = true (filled), '.' = false (empty)
 */
export function parseSolution(solution: string[]): boolean[][] {
  return solution.map(row =>
    row.split('').map(ch => ch === '#')
  );
}
