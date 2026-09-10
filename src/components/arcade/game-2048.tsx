"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { retroAudio } from "./sound-effects";

interface Game2048Props {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
}

type Board = number[][];

const TILE_COLORS: Record<number, { bg: string; text: string; glow?: string }> = {
  0: { bg: "rgba(255, 255, 255, 0.03)", text: "transparent" },
  2: { bg: "rgba(16, 185, 129, 0.15)", text: "#6EE7B7" },
  4: { bg: "rgba(16, 185, 129, 0.3)", text: "#A7F3D0" },
  8: { bg: "rgba(6, 182, 212, 0.4)", text: "#A5F3FC", glow: "#06B6D4" },
  16: { bg: "rgba(59, 130, 246, 0.5)", text: "#BFDBFE", glow: "#3B82F6" },
  32: { bg: "rgba(139, 92, 246, 0.6)", text: "#DDD6FE", glow: "#8B5CF6" },
  64: { bg: "rgba(217, 70, 239, 0.7)", text: "#F5D0FE", glow: "#D946EF" },
  128: { bg: "rgba(244, 63, 94, 0.8)", text: "#FECDD3", glow: "#F43F5E" },
  256: { bg: "rgba(249, 115, 22, 0.9)", text: "#FFEDD5", glow: "#F97316" },
  512: { bg: "rgba(234, 179, 8, 0.95)", text: "#FEF08A", glow: "#EAB308" },
  1024: { bg: "#10B981", text: "#022C22", glow: "#34D399" },
  2048: { bg: "#F59E0B", text: "#451A03", glow: "#FBBF24" },
  4096: { bg: "#EC4899", text: "#FFFFFF", glow: "#F472B6" },
};

export function Game2048({
  onScoreChange,
  onGameOver,
  isPaused,
  externalDirection,
}: Game2048Props) {
  const [board, setBoard] = useState<Board>([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const addRandomTile = useCallback((currentBoard: Board): Board => {
    const emptyCells: { r: number; c: number }[] = [];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (currentBoard[r][c] === 0) emptyCells.push({ r, c });
      }
    }
    if (emptyCells.length === 0) return currentBoard;
    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const newBoard = currentBoard.map((row) => [...row]);
    newBoard[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
    return newBoard;
  }, []);

  const resetGame = useCallback(() => {
    let initialBoard: Board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    initialBoard = addRandomTile(initialBoard);
    initialBoard = addRandomTile(initialBoard);
    setBoard(initialBoard);
    setScore(0);
    setGameOver(false);
    setHasWon(false);
    onScoreChange(0);
  }, [addRandomTile, onScoreChange]);

  // Initial setup
  useEffect(() => {
    resetGame();
  }, [resetGame]);

  const checkGameOver = (b: Board): boolean => {
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (b[r][c] === 0) return false;
        if (c < 3 && b[r][c] === b[r][c + 1]) return false;
        if (r < 3 && b[r][c] === b[r + 1][c]) return false;
      }
    }
    return true;
  };

  const move = useCallback(
    (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
      if (gameOver || isPaused) return;

      let changed = false;
      let addedScore = 0;
      let newBoard = board.map((row) => [...row]);

      const slide = (row: number[]): number[] => {
        let arr = row.filter((val) => val !== 0);
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            addedScore += arr[i];
            if (arr[i] === 2048) setHasWon(true);
            arr.splice(i + 1, 1);
          }
        }
        while (arr.length < 4) {
          arr.push(0);
        }
        return arr;
      };

      if (dir === "LEFT") {
        for (let r = 0; r < 4; r++) {
          const original = [...newBoard[r]];
          newBoard[r] = slide(newBoard[r]);
          if (original.some((val, idx) => val !== newBoard[r][idx])) changed = true;
        }
      } else if (dir === "RIGHT") {
        for (let r = 0; r < 4; r++) {
          const original = [...newBoard[r]];
          const reversed = [...newBoard[r]].reverse();
          newBoard[r] = slide(reversed).reverse();
          if (original.some((val, idx) => val !== newBoard[r][idx])) changed = true;
        }
      } else if (dir === "UP") {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          const original = [...col];
          const newCol = slide(col);
          for (let r = 0; r < 4; r++) newBoard[r][c] = newCol[r];
          if (original.some((val, idx) => val !== newCol[idx])) changed = true;
        }
      } else if (dir === "DOWN") {
        for (let c = 0; c < 4; c++) {
          const col = [newBoard[3][c], newBoard[2][c], newBoard[1][c], newBoard[0][c]];
          const original = [newBoard[0][c], newBoard[1][c], newBoard[2][c], newBoard[3][c]];
          const newCol = slide(col).reverse();
          for (let r = 0; r < 4; r++) newBoard[r][c] = newCol[r];
          if (original.some((val, idx) => val !== newCol[idx])) changed = true;
        }
      }

      if (changed) {
        if (addedScore > 0) {
          retroAudio.playScore();
        } else {
          retroAudio.playMove();
        }
        const updatedScore = score + addedScore;
        setScore(updatedScore);
        onScoreChange(updatedScore);

        const spawnedBoard = addRandomTile(newBoard);
        setBoard(spawnedBoard);

        if (checkGameOver(spawnedBoard)) {
          setGameOver(true);
          retroAudio.playGameOver();
          onGameOver(updatedScore);
        }
      }
    },
    [board, gameOver, isPaused, score, addRandomTile, onScoreChange, onGameOver],
  );

  // Handle external direction from D-Pad
  useEffect(() => {
    if (externalDirection) move(externalDirection);
  }, [externalDirection, move]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        move("UP");
      } else if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") {
        e.preventDefault();
        move("DOWN");
      } else if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        move("LEFT");
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        move("RIGHT");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartPos.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartPos.current.x;
    const dy = touch.clientY - touchStartPos.current.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    if (Math.max(absX, absY) > 30) {
      if (absX > absY) {
        move(dx > 0 ? "RIGHT" : "LEFT");
      } else {
        move(dy > 0 ? "DOWN" : "UP");
      }
    }
    touchStartPos.current = null;
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black p-3 shadow-[0_0_30px_rgba(16,185,129,0.15)] w-[360px] sm:w-[400px]">
        {/* Score Header */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-mono font-bold text-emerald-400">CYBER 2048</span>
          <span className="text-xs font-mono font-bold text-zinc-300">SCORE: {score}</span>
        </div>

        {/* 4x4 Grid */}
        <div className="grid grid-cols-4 gap-2.5 bg-[#05080f] p-2.5 rounded-lg border border-[var(--app-border)]">
          {board.map((row, r) =>
            row.map((val, c) => {
              const tileStyle = TILE_COLORS[val] || TILE_COLORS[4096];
              return (
                <div
                  key={`${r}-${c}`}
                  style={{
                    backgroundColor: tileStyle.bg,
                    color: tileStyle.text,
                    boxShadow: tileStyle.glow ? `0 0 12px ${tileStyle.glow}` : "none",
                  }}
                  className="aspect-square flex items-center justify-center font-bold text-xl sm:text-2xl rounded-lg font-mono transition-all duration-150 transform hover:scale-[1.02]"
                >
                  {val > 0 ? val : ""}
                </div>
              );
            }),
          )}
        </div>

        {/* Win Notification */}
        {hasWon && (
          <div className="mt-2 text-center text-xs font-mono text-amber-400 font-bold">
            ★ 2048 TILE REACHED! CONTINUE FOR HIGH SCORE ★
          </div>
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest uppercase text-rose-400">NO MOVES REMAINING</p>
            <h3 className="text-3xl font-black text-white mt-1">GAME OVER</h3>
            <p className="text-emerald-400 font-mono text-lg mt-2">Score: {score}</p>
            <button
              onClick={resetGame}
              className="mt-5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Paused Screen */}
        {isPaused && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-center">
            <p className="text-xl font-bold text-amber-400 tracking-wider">PAUSED</p>
            <p className="text-xs text-zinc-400 mt-1">Press Pause button or Space to resume</p>
          </div>
        )}
      </div>
    </div>
  );
}
