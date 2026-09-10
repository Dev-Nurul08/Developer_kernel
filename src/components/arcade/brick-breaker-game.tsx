"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { retroAudio } from "./sound-effects";

interface BrickBreakerProps {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 10;
const BALL_RADIUS = 5;
const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_WIDTH = 52;
const BRICK_HEIGHT = 16;
const BRICK_PADDING = 6;
const BRICK_OFFSET_TOP = 40;
const BRICK_OFFSET_LEFT = 12;

type Brick = {
  x: number;
  y: number;
  status: number; // 1 = active, 0 = broken
  color: string;
  points: number;
};

const ROW_COLORS = ["#F43F5E", "#FB923C", "#FACC15", "#10B981", "#06B6D4"];
const ROW_POINTS = [50, 40, 30, 20, 10];

export function BrickBreakerGame({
  onScoreChange,
  onGameOver,
  isPaused,
  externalDirection,
}: BrickBreakerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<"PLAYING" | "WON" | "LOST">("PLAYING");

  const paddleX = useRef((CANVAS_WIDTH - PADDLE_WIDTH) / 2);
  const ballX = useRef(CANVAS_WIDTH / 2);
  const ballY = useRef(CANVAS_HEIGHT - 40);
  const ballVx = useRef(3);
  const ballVy = useRef(-3);
  const ballInPlay = useRef(true);

  const bricks = useRef<Brick[]>([]);
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const keys = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });

  const initBricks = useCallback(() => {
    const newBricks: Brick[] = [];
    for (let r = 0; r < BRICK_ROWS; r++) {
      for (let c = 0; c < BRICK_COLS; c++) {
        const brickX = c * (BRICK_WIDTH + BRICK_PADDING) + BRICK_OFFSET_LEFT;
        const brickY = r * (BRICK_HEIGHT + BRICK_PADDING) + BRICK_OFFSET_TOP;
        newBricks.push({
          x: brickX,
          y: brickY,
          status: 1,
          color: ROW_COLORS[r],
          points: ROW_POINTS[r],
        });
      }
    }
    bricks.current = newBricks;
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setGameState("PLAYING");
    paddleX.current = (CANVAS_WIDTH - PADDLE_WIDTH) / 2;
    ballX.current = CANVAS_WIDTH / 2;
    ballY.current = CANVAS_HEIGHT - 40;
    ballVx.current = (Math.random() > 0.5 ? 1 : -1) * 3;
    ballVy.current = -3.5;
    ballInPlay.current = true;
    particles.current = [];
    initBricks();
    onScoreChange(0);
  }, [onScoreChange, initBricks]);

  // Initial load
  useEffect(() => {
    initBricks();
  }, [initBricks]);

  // Handle external D-Pad
  useEffect(() => {
    if (externalDirection === "LEFT") {
      paddleX.current = Math.max(0, paddleX.current - 35);
      retroAudio.playMove();
    } else if (externalDirection === "RIGHT") {
      paddleX.current = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, paddleX.current + 35);
      retroAudio.playMove();
    }
  }, [externalDirection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Pointer / Touch move
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleX = CANVAS_WIDTH / rect.width;
    const clientX = (e.clientX - rect.left) * scaleX;
    paddleX.current = Math.max(0, Math.min(CANVAS_WIDTH - PADDLE_WIDTH, clientX - PADDLE_WIDTH / 2));
  };

  // Main game tick
  useEffect(() => {
    if (isPaused || gameState !== "PLAYING") return;

    const interval = setInterval(() => {
      // 1. Move paddle via keys
      if (keys.current.left) paddleX.current = Math.max(0, paddleX.current - 7);
      if (keys.current.right) paddleX.current = Math.min(CANVAS_WIDTH - PADDLE_WIDTH, paddleX.current + 7);

      if (!ballInPlay.current) return;

      // 2. Move Ball
      ballX.current += ballVx.current;
      ballY.current += ballVy.current;

      // Side Wall collision
      if (ballX.current <= BALL_RADIUS) {
        ballX.current = BALL_RADIUS;
        ballVx.current = -ballVx.current;
        retroAudio.playHit();
      } else if (ballX.current >= CANVAS_WIDTH - BALL_RADIUS) {
        ballX.current = CANVAS_WIDTH - BALL_RADIUS;
        ballVx.current = -ballVx.current;
        retroAudio.playHit();
      }

      // Top Wall collision
      if (ballY.current <= BALL_RADIUS) {
        ballY.current = BALL_RADIUS;
        ballVy.current = -ballVy.current;
        retroAudio.playHit();
      }

      // 3. Paddle collision
      const paddleTop = CANVAS_HEIGHT - 25;
      if (
        ballY.current + BALL_RADIUS >= paddleTop &&
        ballY.current - BALL_RADIUS <= paddleTop + PADDLE_HEIGHT &&
        ballX.current >= paddleX.current &&
        ballX.current <= paddleX.current + PADDLE_WIDTH
      ) {
        const hitOffset = (ballX.current - (paddleX.current + PADDLE_WIDTH / 2)) / (PADDLE_WIDTH / 2);
        const maxAngle = Math.PI / 3;
        const currentSpeed = Math.min(7, Math.hypot(ballVx.current, ballVy.current));
        ballVx.current = currentSpeed * Math.sin(hitOffset * maxAngle);
        ballVy.current = -Math.abs(currentSpeed * Math.cos(hitOffset * maxAngle));
        ballY.current = paddleTop - BALL_RADIUS;
        retroAudio.playHit();
      }

      // 4. Brick collision
      let activeCount = 0;
      bricks.current.forEach((b) => {
        if (b.status === 1) {
          activeCount++;
          if (
            ballX.current + BALL_RADIUS > b.x &&
            ballX.current - BALL_RADIUS < b.x + BRICK_WIDTH &&
            ballY.current + BALL_RADIUS > b.y &&
            ballY.current - BALL_RADIUS < b.y + BRICK_HEIGHT
          ) {
            b.status = 0;
            ballVy.current = -ballVy.current;
            retroAudio.playScore();

            // Spawn particles
            for (let i = 0; i < 8; i++) {
              particles.current.push({
                x: b.x + BRICK_WIDTH / 2,
                y: b.y + BRICK_HEIGHT / 2,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                life: 1.0,
                color: b.color,
              });
            }

            setScore((prev) => {
              const next = prev + b.points;
              onScoreChange(next);
              return next;
            });
          }
        }
      });

      // Win condition
      if (activeCount === 0) {
        setGameState("WON");
        retroAudio.playScore();
        onGameOver(score + 500);
        return;
      }

      // 5. Ball fell below paddle (Lost Life)
      if (ballY.current > CANVAS_HEIGHT + 10) {
        setLives((prev) => {
          const next = prev - 1;
          if (next <= 0) {
            setGameState("LOST");
            retroAudio.playGameOver();
            onGameOver(score);
          } else {
            retroAudio.playHit();
            // Reset ball position
            ballX.current = paddleX.current + PADDLE_WIDTH / 2;
            ballY.current = CANVAS_HEIGHT - 40;
            ballVx.current = (Math.random() > 0.5 ? 1 : -1) * 3;
            ballVy.current = -3.5;
          }
          return next;
        });
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPaused, gameState, score, onScoreChange, onGameOver]);

  // Render loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark futuristic background
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Bricks
      bricks.current.forEach((b) => {
        if (b.status === 1) {
          ctx.save();
          ctx.shadowColor = b.color;
          ctx.shadowBlur = 6;
          ctx.fillStyle = b.color;
          ctx.beginPath();
          ctx.roundRect(b.x, b.y, BRICK_WIDTH, BRICK_HEIGHT, 3);
          ctx.fill();
          ctx.restore();
        }
      });

      // Draw Particles
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.04;
        if (p.life > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      particles.current = particles.current.filter((p) => p.life > 0);

      // Draw Paddle
      const paddleTop = CANVAS_HEIGHT - 25;
      ctx.save();
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.roundRect(paddleX.current, paddleTop, PADDLE_WIDTH, PADDLE_HEIGHT, 5);
      ctx.fill();
      ctx.restore();

      // Draw Ball
      ctx.save();
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 10;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerMove={handlePointerMove}
          className="max-w-full w-[360px] sm:w-[480px] h-[270px] sm:h-[360px] block cursor-ew-resize touch-none"
        />

        {/* HUD Bar */}
        <div className="absolute top-2 inset-x-0 flex justify-between px-4 pointer-events-none text-xs font-mono font-bold">
          <span className="text-emerald-400">SCORE: {score}</span>
          <div className="flex items-center gap-1">
            <span className="text-zinc-400">LIVES:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={`size-2.5 rounded-full ${i < lives ? "bg-rose-500 shadow-[0_0_8px_#f43f5e]" : "bg-zinc-800"}`} />
            ))}
          </div>
        </div>

        {/* Game Finished Modal */}
        {gameState !== "PLAYING" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              {gameState === "WON" ? "SECTOR CLEARED" : "SYSTEM FAILURE"}
            </p>
            <h3 className={`text-3xl font-black mt-1 ${gameState === "WON" ? "text-emerald-400" : "text-rose-400"}`}>
              {gameState === "WON" ? "STAGE CLEARED!" : "GAME OVER"}
            </h3>
            <p className="text-zinc-300 font-mono text-sm mt-2">Total Score: {score}</p>
            <button
              onClick={resetGame}
              className="mt-5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Paused Screen */}
        {isPaused && gameState === "PLAYING" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-center">
            <p className="text-xl font-bold text-amber-400 tracking-wider">PAUSED</p>
            <p className="text-xs text-zinc-400 mt-1">Press Pause button or Space to resume</p>
          </div>
        )}
      </div>
    </div>
  );
}
