/* ============================================
   Nonogram Story — Game Reducer
   Uses useReducer to avoid double-update bugs in StrictMode.
   ============================================ */

import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, CellState, GameStatus, SerializedGameState } from '../utils/types';

function createEmptyGrid(size: number): CellState[][] {
  return Array.from({ length: size }, () =>
    Array.from({ length: size }, () => 'empty' as CellState)
  );
}

function checkWin(grid: CellState[][], solution: boolean[][]): boolean {
  for (let r = 0; r < solution.length; r++) {
    for (let c = 0; c < solution[r].length; c++) {
      if (solution[r][c] && grid[r][c] !== 'filled') return false;
      if (!solution[r][c] && grid[r][c] === 'filled') return false;
    }
  }
  return true;
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'FILL_CELL': {
      const { row, col, solution } = action;
      if (state.status !== 'playing') return state;
      if (state.grid[row][col] === 'filled') return state;
      // If cell is already marked, allow filling over it
      // Check if this cell is correct in solution
      const isCorrect = solution[row][col];
      const key = `${row},${col}`;

      if (isCorrect) {
        // Fill the cell
        const newGrid = state.grid.map((r, ri) =>
          ri === row ? r.map((c, ci) => (ci === col ? 'filled' as CellState : c)) : r
        );
        const newStatus: GameStatus = checkWin(newGrid, solution) ? 'won' : 'playing';
        return { ...state, grid: newGrid, status: newStatus };
      } else {
        // Wrong cell: place X and deduct life (only once per cell)
        const alreadyMistaken = state.mistakes.has(key);
        const newGrid = state.grid.map((r, ri) =>
          ri === row ? r.map((c, ci) => (ci === col ? 'marked' as CellState : c)) : r
        );
        if (alreadyMistaken) {
          // Already penalized, just mark
          return { ...state, grid: newGrid };
        }
        const newMistakes = new Set(state.mistakes);
        newMistakes.add(key);
        const newLives = Math.max(0, state.lives - 1);
        const newStatus: GameStatus = newLives === 0 ? 'lost' : 'playing';
        return {
          ...state,
          grid: newGrid,
          lives: newLives,
          status: newStatus,
          mistakes: newMistakes,
        };
      }
    }

    case 'TOGGLE_MARK': {
      const { row, col } = action;
      if (state.status !== 'playing') return state;
      if (state.grid[row][col] === 'filled') return state;
      const currentCell = state.grid[row][col];
      const newCellState: CellState = currentCell === 'marked' ? 'empty' : 'marked';
      const newGrid = state.grid.map((r, ri) =>
        ri === row ? r.map((c, ci) => (ci === col ? newCellState : c)) : r
      );
      return { ...state, grid: newGrid };
    }

    case 'RESET': {
      return {
        grid: createEmptyGrid(action.size),
        lives: action.maxLives,
        maxLives: action.maxLives,
        status: 'playing',
        mistakes: new Set<string>(),
      };
    }

    case 'RESTORE': {
      const s = action.state;
      return {
        grid: s.grid,
        lives: s.lives,
        maxLives: s.maxLives,
        status: s.status as GameStatus,
        mistakes: new Set(s.mistakes),
      };
    }

    default:
      return state;
  }
}

export function serializeGameState(state: GameState): SerializedGameState {
  return {
    grid: state.grid,
    lives: state.lives,
    maxLives: state.maxLives,
    status: state.status,
    mistakes: Array.from(state.mistakes),
  };
}

export function useGameReducer(size: number, maxLives: number) {
  const [state, dispatch] = useReducer(gameReducer, {
    grid: createEmptyGrid(size),
    lives: maxLives,
    maxLives,
    status: 'playing' as GameStatus,
    mistakes: new Set<string>(),
  });

  const fillCell = useCallback((row: number, col: number, solution: boolean[][]) => {
    dispatch({ type: 'FILL_CELL', row, col, solution });
  }, []);

  const toggleMark = useCallback((row: number, col: number) => {
    dispatch({ type: 'TOGGLE_MARK', row, col });
  }, []);

  const resetGame = useCallback((newSize: number, newMaxLives: number) => {
    dispatch({ type: 'RESET', size: newSize, maxLives: newMaxLives });
  }, []);

  const restoreGame = useCallback((saved: SerializedGameState) => {
    dispatch({ type: 'RESTORE', state: saved });
  }, []);

  return { state, fillCell, toggleMark, resetGame, restoreGame };
}
