/* ============================================
   Nonogram Story — Type Definitions
   ============================================ */

export type Difficulty = 'easy' | 'medium' | 'hard';

export type GridSize = 10 | 15 | 20;

export type Chapter = 1 | 2 | 3;

export type CellState = 'empty' | 'filled' | 'marked';

export type GameStatus = 'playing' | 'won' | 'lost';

export type ScreenName = 'home' | 'map' | 'storyIntro' | 'game' | 'complete' | 'finalLetter' | 'settings';

export interface Level {
  id: string;
  size: GridSize;
  chapter: Chapter;
  order: number;
  title: string;
  icon: string;
  storyIntro: string[];
  storyOutro: string[];
  solution: string[]; // length=size; each string length=size; '#' filled '.' empty
}

export interface GameState {
  grid: CellState[][];
  lives: number;
  maxLives: number;
  status: GameStatus;
  mistakes: Set<string>; // "r,c" keys for cells that already cost a life
}

export type GameAction =
  | { type: 'FILL_CELL'; row: number; col: number; solution: boolean[][] }
  | { type: 'TOGGLE_MARK'; row: number; col: number }
  | { type: 'RESET'; size: number; maxLives: number }
  | { type: 'RESTORE'; state: SerializedGameState };

export interface SaveData {
  version: number;
  difficulty: Difficulty;
  currentScreen: ScreenName;
  currentLevelId: string | null;
  solvedLevels: string[];
  chaptersUnlocked: number[];
  timestamp: number;
}

export interface SerializedGameState {
  grid: CellState[][];
  lives: number;
  maxLives: number;
  status: GameStatus;
  mistakes: string[]; // serialized from Set
}

export type InputMode = 'fill' | 'mark';
