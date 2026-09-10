"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { retroAudio } from "./sound-effects";

interface FlappyCoderProps {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalAction?: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
}

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 440;
const BIRD_SIZE = 16;
const PIPE_WIDTH = 50;
const PIPE_GAP = 120;
const GRAVITY = 0.28;
const JUMP_FORCE = -5.8;

type Pipe = {
  x: number;
  topHeight: number;
  passed: boolean;
};

export function FlappyCoderGame({
  onScoreChange,
  onGameOver,
  isPaused,
  externalAction,
  externalDirection,
}: FlappyCoderProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const birdY = useRef(CANVAS_HEIGHT / 2);
  const birdVy = useRef(0);
  const pipes = useRef<Pipe[]>([]);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const frameCount = useRef(0);

  const flap = useCallback(() => {
    if (gameOver) return;
    birdVy.current = JUMP_FORCE;
    retroAudio.playFlap();

    // Flap jet particles
    for (let i = 0; i < 6; i++) {
      particles.current.push({
        x: 60,
        y: birdY.current + BIRD_SIZE / 2,
        vx: -Math.random() * 3 - 1,
        vy: (Math.random() - 0.5) * 2,
        life: 0.8,
        color: "#10B981",
      });
    }
  }, [gameOver]);

  const resetGame = useCallback(() => {
    birdY.current = CANVAS_HEIGHT / 2;
    birdVy.current = 0;
    pipes.current = [];
    particles.current = [];
    frameCount.current = 0;
    setScore(0);
    setGameOver(false);
    onScoreChange(0);
  }, [onScoreChange]);

  // Handle external controls
  useEffect(() => {
    if (externalAction || externalDirection === "UP") flap();
  }, [externalAction, externalDirection, flap]);

  // Keyboard navigation & canvas tap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        e.preventDefault();
        flap();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [flap]);

  // Main physics loop
  useEffect(() => {
    if (isPaused || gameOver) return;

    const interval = setInterval(() => {
      frameCount.current++;

      // 1. Update bird physics
      birdVy.current += GRAVITY;
      birdY.current += birdVy.current;

      // Floor & ceiling collision
      if (birdY.current > CANVAS_HEIGHT - BIRD_SIZE - 20) {
        birdY.current = CANVAS_HEIGHT - BIRD_SIZE - 20;
        setGameOver(true);
        retroAudio.playGameOver();
        onGameOver(score);
        return;
      }
      if (birdY.current < 0) {
        birdY.current = 0;
        birdVy.current = 0;
      }

      // 2. Spawn pipes
      if (frameCount.current % 90 === 0) {
        const minH = 50;
        const maxH = CANVAS_HEIGHT - PIPE_GAP - minH - 30;
        const topH = Math.floor(Math.random() * (maxH - minH + 1)) + minH;
        pipes.current.push({
          x: CANVAS_WIDTH,
          topHeight: topH,
          passed: false,
        });
      }

      // 3. Move and check pipes
      const birdBox = {
        left: 60 - BIRD_SIZE / 2,
        right: 60 + BIRD_SIZE / 2,
        top: birdY.current - BIRD_SIZE / 2,
        bottom: birdY.current + BIRD_SIZE / 2,
      };

      pipes.current.forEach((p) => {
        p.x -= 2.6;

        // Score increment
        if (!p.passed && p.x + PIPE_WIDTH < 60) {
          p.passed = true;
          retroAudio.playScore();
          setScore((prev) => {
            const next = prev + 1;
            onScoreChange(next);
            return next;
          });
        }

        // Pipe collision check
        const inPipeX = birdBox.right > p.x && birdBox.left < p.x + PIPE_WIDTH;
        const hitTopPipe = birdBox.top < p.topHeight;
        const hitBottomPipe = birdBox.bottom > p.topHeight + PIPE_GAP;

        if (inPipeX && (hitTopPipe || hitBottomPipe)) {
          setGameOver(true);
          retroAudio.playGameOver();
          onGameOver(score);
        }
      });

      // Filter offscreen pipes
      pipes.current = pipes.current.filter((p) => p.x > -PIPE_WIDTH);
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPaused, gameOver, score, onScoreChange, onGameOver]);

  // Render loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark background with parallax grid
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Background skyline / grid
      ctx.strokeStyle = "rgba(16, 185, 129, 0.08)";
      ctx.lineWidth = 1;
      const gridOffset = (Date.now() / 30) % 30;
      for (let x = -gridOffset; x < CANVAS_WIDTH; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, CANVAS_HEIGHT);
        ctx.stroke();
      }

      // Draw Pipes (Cyber code pillars)
      pipes.current.forEach((p) => {
        // Top pipe
        ctx.save();
        ctx.shadowColor = "#06B6D4";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#091724";
        ctx.strokeStyle = "#06B6D4";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(p.x, 0, PIPE_WIDTH, p.topHeight, [0, 0, 6, 6]);
        ctx.fill();
        ctx.stroke();

        // Bottom pipe
        const bottomTop = p.topHeight + PIPE_GAP;
        const bottomH = CANVAS_HEIGHT - bottomTop;
        ctx.beginPath();
        ctx.roundRect(p.x, bottomTop, PIPE_WIDTH, bottomH, [6, 6, 0, 0]);
        ctx.fill();
        ctx.stroke();

        // Pipe neon stripes
        ctx.fillStyle = "rgba(6, 182, 212, 0.4)";
        ctx.fillRect(p.x + 6, p.topHeight - 12, PIPE_WIDTH - 12, 4);
        ctx.fillRect(p.x + 6, bottomTop + 8, PIPE_WIDTH - 12, 4);
        ctx.restore();
      });

      // Ground bar
      ctx.fillStyle = "#0c1527";
      ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);
      ctx.strokeStyle = "#10B981";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT - 20);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - 20);
      ctx.stroke();

      // Draw Particles
      particles.current.forEach((pt) => {
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= 0.035;
        if (pt.life > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, pt.life);
          ctx.fillStyle = pt.color;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particles.current = particles.current.filter((pt) => pt.life > 0);

      // Draw Flappy Coder Bird
      ctx.save();
      ctx.translate(60, birdY.current);
      const angle = Math.min(Math.PI / 4, Math.max(-Math.PI / 4, birdVy.current * 0.08));
      ctx.rotate(angle);

      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.roundRect(-BIRD_SIZE / 2, -BIRD_SIZE / 2, BIRD_SIZE, BIRD_SIZE, 4);
      ctx.fill();

      // Cyber visor
      ctx.fillStyle = "#06B6D4";
      ctx.fillRect(1, -BIRD_SIZE / 4, BIRD_SIZE / 2 + 1, 4);

      // Jet nozzle
      ctx.fillStyle = "#F43F5E";
      ctx.fillRect(-BIRD_SIZE / 2 - 3, 0, 3, 4);

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div
      className="relative flex flex-col items-center justify-center select-none"
      onClick={flap}
    >
      <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="max-w-full w-[360px] sm:w-[400px] h-[396px] sm:h-[440px] block"
        />

        {/* Score overlay */}
        <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
          <span className="text-3xl font-black font-mono text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
            {score}
          </span>
        </div>

        {/* Instructions banner */}
        {!gameOver && score === 0 && (
          <div className="absolute bottom-8 inset-x-0 flex justify-center pointer-events-none">
            <span className="rounded-full border border-emerald-500/40 bg-black/70 px-4 py-1.5 text-xs font-mono text-emerald-400 backdrop-blur-sm animate-pulse">
              Click / Spacebar to Flap
            </span>
          </div>
        )}

        {/* Game Over Modal */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest uppercase text-rose-400">SESSION CRASHED</p>
            <h3 className="text-3xl font-black text-white mt-1">GAME OVER</h3>
            <p className="text-emerald-400 font-mono text-lg mt-2">Score: {score}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetGame();
              }}
              className="mt-5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Flap Again
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
