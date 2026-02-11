/* ============================================
   Nonogram Story — Storage (localStorage)
   Schema-versioned save/load with safe parse.
   ============================================ */

import type { SaveData, Difficulty, ScreenName } from './types';

const STORAGE_KEY = 'nonogram-story-save';
const CURRENT_VERSION = 1;

function getDefaultSave(): SaveData {
  return {
    version: CURRENT_VERSION,
    difficulty: 'easy',
    currentScreen: 'home',
    currentLevelId: null,
    solvedLevels: [],
    chaptersUnlocked: [1],
    timestamp: Date.now(),
  };
}

export function loadSave(): SaveData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultSave();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return getDefaultSave();
    // Version check
    if (parsed.version !== CURRENT_VERSION) {
      // Future: migration logic
      return getDefaultSave();
    }
    // Validate fields
    return {
      version: CURRENT_VERSION,
      difficulty: (['easy', 'medium', 'hard'].includes(parsed.difficulty) ? parsed.difficulty : 'easy') as Difficulty,
      currentScreen: (typeof parsed.currentScreen === 'string' ? parsed.currentScreen : 'home') as ScreenName,
      currentLevelId: typeof parsed.currentLevelId === 'string' ? parsed.currentLevelId : null,
      solvedLevels: Array.isArray(parsed.solvedLevels) ? parsed.solvedLevels : [],
      chaptersUnlocked: Array.isArray(parsed.chaptersUnlocked) ? parsed.chaptersUnlocked : [1],
      timestamp: typeof parsed.timestamp === 'number' ? parsed.timestamp : Date.now(),
    };
  } catch {
    return getDefaultSave();
  }
}

export function saveSaveData(data: SaveData): void {
  try {
    data.timestamp = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Silently fail if storage is full
  }
}

export function resetSave(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportSave(): string {
  const data = loadSave();
  return JSON.stringify(data, null, 2);
}

export function importSave(json: string): boolean {
  try {
    const parsed = JSON.parse(json);
    if (!parsed || typeof parsed !== 'object') return false;
    if (parsed.version !== CURRENT_VERSION) return false;
    saveSaveData(parsed as SaveData);
    return true;
  } catch {
    return false;
  }
}
