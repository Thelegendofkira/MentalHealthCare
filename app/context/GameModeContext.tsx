

'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface GameModeContextValue {
  isGameMode: boolean;
  toggleGameMode: () => void;
}

const GameModeContext = createContext<GameModeContextValue>({
  isGameMode: false,
  toggleGameMode: () => {},
});

export function GameModeProvider({ children }: { children: ReactNode }) {
  const [isGameMode, setIsGameMode] = useState(false);

  const toggleGameMode = () => setIsGameMode((prev) => !prev);

  useEffect(() => {
    if (isGameMode) {
      document.documentElement.setAttribute('data-game-mode', 'true');
    } else {
      document.documentElement.removeAttribute('data-game-mode');
    }
  }, [isGameMode]);

  return (
    <GameModeContext.Provider value={{ isGameMode, toggleGameMode }}>
      {children}
    </GameModeContext.Provider>
  );
}

export function useGameMode() {
  return useContext(GameModeContext);
}