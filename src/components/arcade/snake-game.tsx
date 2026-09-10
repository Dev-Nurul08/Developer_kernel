"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { retroAudio } from "./sound-effects";

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
}

type Point = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20; // 400x400 canvas

export function SnakeGame({
  onScoreChange,
  onGameOver,
  isPaused,
  externalDirection,
}: SnakeGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 },
  ]);
  const dirRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">("UP");
  const nextDirRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">("UP");
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const particlesRef = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);

  const spawnFood = useCallback(() => {
    let valid = false;
    let newFood: Point = { x: 5, y: 5 };
    while (!valid) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line @typescript-eslint/no-loop-func
      valid = !snakeRef.current.some((s) => s.x === newFood.x && s.y === newFood.y);
    }
    foodRef.current = newFood;
  }, []);

  const resetGame = useCallback(() => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    dirRef.current = "UP";
    nextDirRef.current = "UP";
    particlesRef.current = [];
    setScore(0);
    setGameOver(false);
    onScoreChange(0);
    spawnFood();
  }, [onScoreChange, spawnFood]);

  // Handle external D-Pad direction
  useEffect(() => {
    if (!externalDirection) return;
    const current = dirRef.current;
    if (externalDirection === "UP" && current !== "DOWN") nextDirRef.current = "UP";
    if (externalDirection === "DOWN" && current !== "UP") nextDirRef.current = "DOWN";
    if (externalDirection === "LEFT" && current !== "RIGHT") nextDirRef.current = "LEFT";
    if (externalDirection === "RIGHT" && current !== "LEFT") nextDirRef.current = "RIGHT";
    retroAudio.playMove();
  }, [externalDirection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const current = dirRef.current;
      if ((e.key === "ArrowUp" || e.key === "w" || e.key === "W") && current !== "DOWN") {
        nextDirRef.current = "UP";
        retroAudio.playMove();
      } else if ((e.key === "ArrowDown" || e.key === "s" || e.key === "S") && current !== "UP") {
        nextDirRef.current = "DOWN";
        retroAudio.playMove();
      } else if ((e.key === "ArrowLeft" || e.key === "a" || e.key === "A") && current !== "RIGHT") {
        nextDirRef.current = "LEFT";
        retroAudio.playMove();
      } else if ((e.key === "ArrowRight" || e.key === "d" || e.key === "D") && current !== "LEFT") {
        nextDirRef.current = "RIGHT";
        retroAudio.playMove();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Main game tick
  useEffect(() => {
    if (isPaused || gameOver) return;

    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = { ...snakeRef.current[0] };

      switch (dirRef.current) {
        case "UP":
          head.y -= 1;
          break;
        case "DOWN":
          head.y += 1;
          break;
        case "LEFT":
          head.x -= 1;
          break;
        case "RIGHT":
          head.x += 1;
          break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        retroAudio.playGameOver();
        onGameOver(score);
        return;
      }

      // Check self collision
      if (snakeRef.current.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        retroAudio.playGameOver();
        onGameOver(score);
        return;
      }

      // Move snake
      const newSnake = [head, ...snakeRef.current];

      // Check food
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScoreChange(newScore);
        retroAudio.playScore();

        // Spawn particles
        for (let i = 0; i < 12; i++) {
          particlesRef.current.push({
            x: head.x * CELL_SIZE + CELL_SIZE / 2,
            y: head.y * CELL_SIZE + CELL_SIZE / 2,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6,
            life: 1.0,
            color: i % 2 === 0 ? "#10B981" : "#F43F5E",
          });
        }

        spawnFood();
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;
    }, Math.max(70, 140 - Math.floor(score / 50) * 10)); // Speed increases

    return () => clearInterval(interval);
  }, [isPaused, gameOver, score, onScoreChange, onGameOver, spawnFood]);

  // Render loop
  useEffect(() => {
    let animationFrameId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark futuristic grid background
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, 400, 400);

      // Subtle grid lines
      ctx.strokeStyle = "rgba(16, 185, 129, 0.05)";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 400; i += CELL_SIZE) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 400);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(400, i);
        ctx.stroke();
      }

      // Draw food (pulsing glowing orb)
      const fx = foodRef.current.x * CELL_SIZE + CELL_SIZE / 2;
      const fy = foodRef.current.y * CELL_SIZE + CELL_SIZE / 2;
      const pulse = Math.sin(Date.now() / 150) * 2;

      ctx.save();
      ctx.shadowColor = "#F43F5E";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#F43F5E";
      ctx.beginPath();
      ctx.arc(fx, fy, 7 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw particles
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;

        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Draw Snake
      snakeRef.current.forEach((segment, index) => {
        const x = segment.x * CELL_SIZE;
        const y = segment.y * CELL_SIZE;

        if (index === 0) {
          // Head with intense glow
          ctx.save();
          ctx.shadowColor = "#10B981";
          ctx.shadowBlur = 14;
          ctx.fillStyle = "#10B981";
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2, 5);
          ctx.fill();

          // Cyber eyes
          ctx.fillStyle = "#022c22";
          ctx.beginPath();
          ctx.arc(x + 6, y + 6, 2, 0, Math.PI * 2);
          ctx.arc(x + 14, y + 6, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // Body segments with fading gradient
          const alpha = Math.max(0.35, 1 - (index / snakeRef.current.length) * 0.65);
          ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4, 3);
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <canvas
          ref={canvasRef}
          width={400}
          height={400}
          className="aspect-square max-w-full w-[360px] sm:w-[400px] h-[360px] sm:h-[400px] block"
        />

        {/* Game Over Screen */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest text-rose-400 uppercase">SYSTEM CRITICAL</p>
            <h3 className="text-3xl font-black text-white mt-1">GAME OVER</h3>
            <p className="text-emerald-400 font-mono text-lg mt-2">Score: {score}</p>
            <button
              onClick={resetGame}
              className="mt-5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Play Again
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
