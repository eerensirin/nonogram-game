/* ============================================
   Nonogram Story — App Root
   Design: Retro Japanese Puzzle Magazine (Nikoli-style)
   Single-player romantic puzzle game with localStorage persistence.
   ============================================ */

import { useState, useEffect, useCallback } from 'react';
import type { ScreenName, Difficulty, Level } from './utils/types';
import { loadSave, saveSaveData } from './utils/storage';
import { LEVELS } from './data/levels';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import StoryIntroScreen from './screens/StoryIntroScreen';
import GameScreen from './screens/GameScreen';
import CompleteScreen from './screens/CompleteScreen';
import FinalLetterScreen from './screens/FinalLetterScreen';
import SettingsScreen from './screens/SettingsScreen';
import './index.css';

function App() {
  // Load saved state
  const [save] = useState(() => loadSave());
  // Only restore to game/storyIntro if there was actual progress
  const initialScreen = (): ScreenName => {
    const s = save.currentScreen;
    // Valid screens that don't require a level
    if (s === 'home' || s === 'map' || s === 'settings' || s === 'finalLetter') {
      return s;
    }
    // Screens that require a level: game, storyIntro, complete
    if (save.currentLevelId) {
      return s;
    }
    return 'home';
  };
  const [screen, setScreen] = useState<ScreenName>(initialScreen());
  const [currentLevel, setCurrentLevel] = useState<Level | null>(
    save.currentLevelId ? LEVELS.find(l => l.id === save.currentLevelId) || null : null
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(save.difficulty);
  const [solvedLevels, setSolvedLevels] = useState<Set<string>>(new Set(save.solvedLevels));
  const [chaptersUnlocked, setChaptersUnlocked] = useState<number[]>(save.chaptersUnlocked);

  // Persist state on changes
  useEffect(() => {
    const data = {
      version: 1,
      difficulty,
      currentScreen: screen,
      currentLevelId: currentLevel?.id || null,
      solvedLevels: Array.from(solvedLevels),
      chaptersUnlocked,
      timestamp: Date.now(),
    };
    saveSaveData(data);
  }, [screen, currentLevel, difficulty, solvedLevels, chaptersUnlocked]);

  const navigate = useCallback((s: ScreenName) => {
    setScreen(s);
  }, []);

  const handleSelectLevel = useCallback((levelId: string) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (level) {
      setCurrentLevel(level);
      if (solvedLevels.has(levelId)) {
        // Already solved, go directly to game for replay
        setScreen('game');
      } else {
        setScreen('storyIntro');
      }
    }
  }, [solvedLevels]);

  const handleStartPuzzle = useCallback(() => {
    setScreen('game');
  }, []);

  const handleWin = useCallback(() => {
    if (!currentLevel) return;
    const newSolved = new Set(solvedLevels);
    newSolved.add(currentLevel.id);
    setSolvedLevels(newSolved);

    // Check if chapter should unlock next
    const chapterLevels = LEVELS.filter(l => l.chapter === currentLevel.chapter);
    const allChapterSolved = chapterLevels.every(l => newSolved.has(l.id));
    if (allChapterSolved && currentLevel.chapter < 3) {
      const nextChapter = currentLevel.chapter + 1;
      if (!chaptersUnlocked.includes(nextChapter)) {
        setChaptersUnlocked(prev => [...prev, nextChapter]);
      }
    }

    setScreen('complete');
  }, [currentLevel, solvedLevels, chaptersUnlocked]);

  const handleLose = useCallback(() => {
    // Stay on game screen, overlay shown
  }, []);

  const handleNextLevel = useCallback(() => {
    if (!currentLevel) return;
    // Find next level
    const currentIdx = LEVELS.findIndex(l => l.id === currentLevel.id);
    if (currentIdx < LEVELS.length - 1) {
      const next = LEVELS[currentIdx + 1];
      setCurrentLevel(next);
      setScreen('storyIntro');
    } else {
      setScreen('finalLetter');
    }
  }, [currentLevel]);

  const handleContinue = useCallback(() => {
    // Resume where left off
    if (save.currentScreen === 'game' && save.currentLevelId) {
      const level = LEVELS.find(l => l.id === save.currentLevelId);
      if (level) {
        setCurrentLevel(level);
        setScreen('game');
        return;
      }
    }
    if (save.currentScreen === 'storyIntro' && save.currentLevelId) {
      const level = LEVELS.find(l => l.id === save.currentLevelId);
      if (level) {
        setCurrentLevel(level);
        setScreen('storyIntro');
        return;
      }
    }
    // Default: go to map
    setScreen('map');
  }, [save]);

  const handleReset = useCallback(() => {
    setSolvedLevels(new Set());
    setChaptersUnlocked([1]);
    setCurrentLevel(null);
    setDifficulty('easy');
    setScreen('home');
  }, []);

  const hasSavedProgress = solvedLevels.size > 0;
  const isLastLevel = currentLevel?.id === LEVELS[LEVELS.length - 1].id;

  return (
    <div>
      {screen === 'home' && (
        <HomeScreen
          difficulty={difficulty}
          onSetDifficulty={setDifficulty}
          onNavigate={navigate}
          hasSavedProgress={hasSavedProgress}
          onContinue={handleContinue}
        />
      )}

      {screen === 'map' && (
        <MapScreen
          solvedLevels={solvedLevels}
          chaptersUnlocked={chaptersUnlocked}
          onSelectLevel={handleSelectLevel}
          onNavigate={navigate}
        />
      )}

      {screen === 'storyIntro' && currentLevel && (
        <StoryIntroScreen
          level={currentLevel}
          onStart={handleStartPuzzle}
          onBack={() => navigate('map')}
        />
      )}

      {screen === 'game' && currentLevel && (
        <GameScreen
          level={currentLevel}
          difficulty={difficulty}
          onWin={handleWin}
          onLose={handleLose}
          onBack={() => navigate('map')}
        />
      )}

      {screen === 'complete' && currentLevel && (
        <CompleteScreen
          level={currentLevel}
          onNext={handleNextLevel}
          onNavigate={navigate}
          isLastLevel={isLastLevel}
        />
      )}

      {screen === 'finalLetter' && (
        <FinalLetterScreen onNavigate={navigate} />
      )}

      {screen === 'settings' && (
        <SettingsScreen onNavigate={navigate} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
