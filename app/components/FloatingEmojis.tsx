'use client';

import { useGameMode } from '../context/GameModeContext';
import { useEffect, useState } from 'react';

const EMOJI_POOL = ['⭐', '🌈', '💖', '🎮', '🎉', '✨', '🦋', '🌟', '🍀', '🎈', '🏆', '🎯', '🦄', '🌸', '💫'];

interface EmojiItem {
  id: number;
  emoji: string;
  left: number;
  duration: number;
  delay: number;
  size: number;
}

export default function FloatingEmojis() {
  const { isGameMode } = useGameMode();
  const [emojis, setEmojis] = useState<EmojiItem[]>([]);

  useEffect(() => {
    if (!isGameMode) { setEmojis([]); return; }
    setEmojis(
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        emoji: EMOJI_POOL[i % EMOJI_POOL.length],
        left: (i * 7) + 1,
        duration: 5 + (i % 4),
        delay: i * 0.6,
        size: 1.2 + (i % 3) * 0.4,
      }))
    );
  }, [isGameMode]);

  if (!isGameMode) return null;

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, overflow: 'hidden' }}
    >
      {emojis.map((e) => (
        <span
          key={e.id}
          style={{
            position: 'absolute',
            bottom: '-3rem',
            left: `${e.left}%`,
            fontSize: `${e.size}rem`,
            animation: `floatEmoji ${e.duration}s ease-in ${e.delay}s infinite`,
          }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
