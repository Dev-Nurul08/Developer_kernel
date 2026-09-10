"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { retroAudio } from "./sound-effects";

interface SpaceInvadersProps {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
  externalAction?: boolean;
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 360;
const SHIP_WIDTH = 32;
const SHIP_HEIGHT = 18;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_WIDTH = 26;
const ALIEN_HEIGHT = 18;

type Alien = {
  x: number;
  y: number;
  alive: boolean;
  row: number;
};

type Bullet = {
  x: number;
  y: number;
  vy: number;
  fromPlayer: boolean;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
};

export function SpaceInvadersGame({
  onScoreChange,
  onGameOver,
  isPaused,
  externalDirection,
  externalAction,
}: SpaceInvadersProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<"PLAYING" | "WON" | "LOST">("PLAYING");

  const shipX = useRef((CANVAS_WIDTH - SHIP_WIDTH) / 2);
  const aliens = useRef<Alien[]>([]);
  const bullets = useRef<Bullet[]>([]);
  const particles = useRef<Particle[]>([]);
  const alienDir = useRef<number>(1);
  const alienStepDown = useRef<boolean>(false);
  const lastShotTime = useRef<number>(0);
  const keys = useRef<{ left: boolean; right: boolean; shoot: boolean }>({
    left: false,
    right: false,
    shoot: false,
  });

  const initAliens = useCallback(() => {
    const newAliens: Alien[] = [];
    for (let r = 0; r < ALIEN_ROWS; r++) {
      for (let c = 0; c < ALIEN_COLS; c++) {
        newAliens.push({
          x: 40 + c * 48,
          y: 35 + r * 28,
          alive: true,
          row: r,
        });
      }
    }
    aliens.current = newAliens;
    alienDir.current = 1;
    alienStepDown.current = false;
  }, []);

  const shoot = useCallback(() => {
    const now = Date.now();
    if (now - lastShotTime.current < 260) return; // Fire rate limiter
    lastShotTime.current = now;

    bullets.current.push({
      x: shipX.current + SHIP_WIDTH / 2,
      y: CANVAS_HEIGHT - 35,
      vy: -6.5,
      fromPlayer: true,
    });
    retroAudio.playLaser();
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setLives(3);
    setGameState("PLAYING");
    shipX.current = (CANVAS_WIDTH - SHIP_WIDTH) / 2;
    bullets.current = [];
    particles.current = [];
    initAliens();
    onScoreChange(0);
  }, [initAliens, onScoreChange]);

  useEffect(() => {
    initAliens();
  }, [initAliens]);

  // Handle external controls
  useEffect(() => {
    if (externalDirection === "LEFT") {
      shipX.current = Math.max(10, shipX.current - 25);
    } else if (externalDirection === "RIGHT") {
      shipX.current = Math.min(CANVAS_WIDTH - SHIP_WIDTH - 10, shipX.current + 25);
    }
  }, [externalDirection]);

  useEffect(() => {
    if (externalAction) shoot();
  }, [externalAction, shoot]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") keys.current.left = true;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") keys.current.right = true;
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        shoot();
      }
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
  }, [shoot]);

  // Main physics loop
  useEffect(() => {
    if (isPaused || gameState !== "PLAYING") return;

    const interval = setInterval(() => {
      // 1. Move Player
      if (keys.current.left) shipX.current = Math.max(10, shipX.current - 5.5);
      if (keys.current.right) shipX.current = Math.min(CANVAS_WIDTH - SHIP_WIDTH - 10, shipX.current + 5.5);

      // 2. Move Aliens
      let switchDir = false;
      const aliveAliens = aliens.current.filter((a) => a.alive);

      if (aliveAliens.length === 0) {
        setGameState("WON");
        retroAudio.playScore();
        onGameOver(score + 1000);
        return;
      }

      const alienSpeed = 0.8 + (1 - aliveAliens.length / (ALIEN_ROWS * ALIEN_COLS)) * 1.5;

      aliveAliens.forEach((a) => {
        a.x += alienDir.current * alienSpeed;
        if (a.x < 15 || a.x > CANVAS_WIDTH - ALIEN_WIDTH - 15) {
          switchDir = true;
        }
        // Alien reached ship height
        if (a.y >= CANVAS_HEIGHT - 55) {
          setGameState("LOST");
          retroAudio.playGameOver();
          onGameOver(score);
        }
      });

      if (switchDir) {
        alienDir.current = -alienDir.current;
        aliens.current.forEach((a) => {
          a.y += 12;
        });
      }

      // Random alien shooting
      if (Math.random() < 0.035 && aliveAliens.length > 0) {
        const shooter = aliveAliens[Math.floor(Math.random() * aliveAliens.length)];
        bullets.current.push({
          x: shooter.x + ALIEN_WIDTH / 2,
          y: shooter.y + ALIEN_HEIGHT,
          vy: 3.8,
          fromPlayer: false,
        });
      }

      // 3. Move Bullets
      bullets.current.forEach((b) => {
        b.y += b.vy;
      });

      // Filter out-of-bounds bullets
      bullets.current = bullets.current.filter((b) => b.y > 0 && b.y < CANVAS_HEIGHT);

      // 4. Bullet collisions
      bullets.current.forEach((b, bIdx) => {
        if (b.fromPlayer) {
          // Check against aliens
          aliens.current.forEach((a) => {
            if (
              a.alive &&
              b.x >= a.x &&
              b.x <= a.x + ALIEN_WIDTH &&
              b.y >= a.y &&
              b.y <= a.y + ALIEN_HEIGHT
            ) {
              a.alive = false;
              b.y = -999; // Mark bullet for removal
              retroAudio.playHit();

              // Spawn particles
              const rowColors = ["#F43F5E", "#FB923C", "#06B6D4", "#10B981"];
              for (let i = 0; i < 10; i++) {
                particles.current.push({
                  x: a.x + ALIEN_WIDTH / 2,
                  y: a.y + ALIEN_HEIGHT / 2,
                  vx: (Math.random() - 0.5) * 6,
                  vy: (Math.random() - 0.5) * 6,
                  life: 1.0,
                  color: rowColors[a.row],
                });
              }

              setScore((prev) => {
                const next = prev + (4 - a.row) * 20;
                onScoreChange(next);
                return next;
              });
            }
          });
        } else {
          // Check enemy bullet against Player
          if (
            b.x >= shipX.current &&
            b.x <= shipX.current + SHIP_WIDTH &&
            b.y >= CANVAS_HEIGHT - 35 &&
            b.y <= CANVAS_HEIGHT - 35 + SHIP_HEIGHT
          ) {
            b.y = 999; // Remove bullet
            retroAudio.playGameOver();

            // Spawn player damage particles
            for (let i = 0; i < 14; i++) {
              particles.current.push({
                x: shipX.current + SHIP_WIDTH / 2,
                y: CANVAS_HEIGHT - 30,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                life: 1.0,
                color: "#10B981",
              });
            }

            setLives((prev) => {
              const next = prev - 1;
              if (next <= 0) {
                setGameState("LOST");
                onGameOver(score);
              }
              return next;
            });
          }
        }
      });
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

      // Dark space background
      ctx.fillStyle = "#030611";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Starfield background
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      for (let i = 0; i < 30; i++) {
        const sx = (i * 97 + (Date.now() / 80)) % CANVAS_WIDTH;
        const sy = (i * 61) % CANVAS_HEIGHT;
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Draw Aliens
      const rowColors = ["#F43F5E", "#FB923C", "#06B6D4", "#10B981"];
      aliens.current.forEach((a) => {
        if (a.alive) {
          ctx.save();
          const col = rowColors[a.row];
          ctx.shadowColor = col;
          ctx.shadowBlur = 6;
          ctx.fillStyle = col;

          // Cute 8-bit invader geometry
          ctx.beginPath();
          ctx.rect(a.x + 4, a.y, ALIEN_WIDTH - 8, 4);
          ctx.rect(a.x + 2, a.y + 4, ALIEN_WIDTH - 4, 8);
          ctx.rect(a.x, a.y + 8, ALIEN_WIDTH, 6);
          ctx.rect(a.x + 4, a.y + 14, 4, 4);
          ctx.rect(a.x + ALIEN_WIDTH - 8, a.y + 14, 4, 4);
          ctx.fill();

          // Invader eyes
          ctx.fillStyle = "#000000";
          ctx.fillRect(a.x + 6, a.y + 6, 3, 3);
          ctx.fillRect(a.x + ALIEN_WIDTH - 9, a.y + 6, 3, 3);
          ctx.restore();
        }
      });

      // Draw Bullets
      bullets.current.forEach((b) => {
        ctx.save();
        if (b.fromPlayer) {
          ctx.shadowColor = "#10B981";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#10B981";
          ctx.fillRect(b.x - 1.5, b.y, 3, 10);
        } else {
          ctx.shadowColor = "#F43F5E";
          ctx.shadowBlur = 8;
          ctx.fillStyle = "#F43F5E";
          ctx.fillRect(b.x - 1.5, b.y, 3, 8);
        }
        ctx.restore();
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

      // Draw Player Starship
      const shipY = CANVAS_HEIGHT - 35;
      ctx.save();
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.moveTo(shipX.current + SHIP_WIDTH / 2, shipY);
      ctx.lineTo(shipX.current + SHIP_WIDTH, shipY + SHIP_HEIGHT);
      ctx.lineTo(shipX.current + SHIP_WIDTH - 6, shipY + SHIP_HEIGHT - 4);
      ctx.lineTo(shipX.current + 6, shipY + SHIP_HEIGHT - 4);
      ctx.lineTo(shipX.current, shipY + SHIP_HEIGHT);
      ctx.closePath();
      ctx.fill();

      // Cockpit glow
      ctx.fillStyle = "#06B6D4";
      ctx.beginPath();
      ctx.arc(shipX.current + SHIP_WIDTH / 2, shipY + 8, 3, 0, Math.PI * 2);
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
          className="max-w-full w-[360px] sm:w-[480px] h-[270px] sm:h-[360px] block"
        />

        {/* HUD Bar */}
        <div className="absolute top-2 inset-x-0 flex justify-between px-4 pointer-events-none text-xs font-mono font-bold">
          <span className="text-emerald-400">SCORE: {score}</span>
          <div className="flex items-center gap-1.5">
            <span className="text-zinc-400">SHIELDS:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <span
                key={i}
                className={`size-2.5 rounded-sm ${i < lives ? "bg-emerald-400 shadow-[0_0_8px_#10B981]" : "bg-zinc-800"}`}
              />
            ))}
          </div>
        </div>

        {/* Game Finished Modal */}
        {gameState !== "PLAYING" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-400">
              {gameState === "WON" ? "GALAXY DEFENDED" : "BASE DESTROYED"}
            </p>
            <h3 className={`text-3xl font-black mt-1 ${gameState === "WON" ? "text-emerald-400" : "text-rose-400"}`}>
              {gameState === "WON" ? "VICTORY!" : "GAME OVER"}
            </h3>
            <p className="text-zinc-300 font-mono text-sm mt-2">Score: {score}</p>
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
