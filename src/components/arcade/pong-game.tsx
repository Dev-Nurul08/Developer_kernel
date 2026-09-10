"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { retroAudio } from "./sound-effects";

interface PongGameProps {
  onScoreChange: (score: number) => void;
  onGameOver: (finalScore: number) => void;
  isPaused: boolean;
  externalDirection?: "UP" | "DOWN" | "LEFT" | "RIGHT" | null;
}

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 65;
const BALL_SIZE = 8;
const WINNING_SCORE = 7;

export function PongGame({
  onScoreChange,
  onGameOver,
  isPaused,
  externalDirection,
}: PongGameProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [matchOver, setMatchOver] = useState<"WIN" | "LOSS" | null>(null);

  // Positions and velocities in refs for 60 FPS animation
  const playerY = useRef((CANVAS_HEIGHT - PADDLE_HEIGHT) / 2);
  const aiY = useRef((CANVAS_HEIGHT - PADDLE_HEIGHT) / 2);
  const ballX = useRef(CANVAS_WIDTH / 2);
  const ballY = useRef(CANVAS_HEIGHT / 2);
  const ballVx = useRef(4);
  const ballVy = useRef(2);
  const rallyCount = useRef(0);

  const keysRef = useRef<{ up: boolean; down: boolean }>({ up: false, down: false });

  const resetBall = useCallback((towardsPlayer: boolean) => {
    ballX.current = CANVAS_WIDTH / 2;
    ballY.current = CANVAS_HEIGHT / 2;
    rallyCount.current = 0;
    const speed = 4;
    const angle = (Math.random() - 0.5) * (Math.PI / 3);
    ballVx.current = (towardsPlayer ? -1 : 1) * speed * Math.cos(angle);
    ballVy.current = speed * Math.sin(angle);
  }, []);

  const resetGame = useCallback(() => {
    setPlayerScore(0);
    setAiScore(0);
    setMatchOver(null);
    playerY.current = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    aiY.current = (CANVAS_HEIGHT - PADDLE_HEIGHT) / 2;
    onScoreChange(0);
    resetBall(false);
  }, [onScoreChange, resetBall]);

  // Handle external D-Pad
  useEffect(() => {
    if (externalDirection === "UP") {
      playerY.current = Math.max(0, playerY.current - 25);
      retroAudio.playMove();
    } else if (externalDirection === "DOWN") {
      playerY.current = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, playerY.current + 25);
      retroAudio.playMove();
    }
  }, [externalDirection]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keysRef.current.up = true;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keysRef.current.down = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "w" || e.key === "W") keysRef.current.up = false;
      if (e.key === "ArrowDown" || e.key === "s" || e.key === "S") keysRef.current.down = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Handle Mouse / Touch tracking on canvas
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const scaleY = CANVAS_HEIGHT / rect.height;
    const clientY = (e.clientY - rect.top) * scaleY;
    playerY.current = Math.max(0, Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, clientY - PADDLE_HEIGHT / 2));
  };

  // Main physics loop
  useEffect(() => {
    if (isPaused || matchOver) return;

    const interval = setInterval(() => {
      // 1. Update Player Paddle via keys
      if (keysRef.current.up) {
        playerY.current = Math.max(0, playerY.current - 6);
      }
      if (keysRef.current.down) {
        playerY.current = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, playerY.current + 6);
      }

      // 2. Update AI Paddle (tracks ball with smoothing)
      const aiTarget = ballY.current - PADDLE_HEIGHT / 2;
      const aiSpeed = 3.8 + Math.min(rallyCount.current * 0.15, 2.5);
      if (aiY.current < aiTarget - 4) {
        aiY.current = Math.min(CANVAS_HEIGHT - PADDLE_HEIGHT, aiY.current + aiSpeed);
      } else if (aiY.current > aiTarget + 4) {
        aiY.current = Math.max(0, aiY.current - aiSpeed);
      }

      // 3. Move Ball
      ballX.current += ballVx.current;
      ballY.current += ballVy.current;

      // Top / Bottom Wall collision
      if (ballY.current <= BALL_SIZE / 2) {
        ballY.current = BALL_SIZE / 2;
        ballVy.current = -ballVy.current;
        retroAudio.playHit();
      } else if (ballY.current >= CANVAS_HEIGHT - BALL_SIZE / 2) {
        ballY.current = CANVAS_HEIGHT - BALL_SIZE / 2;
        ballVy.current = -ballVy.current;
        retroAudio.playHit();
      }

      // 4. Paddle Collisions
      const playerPaddleX = 20;
      const aiPaddleX = CANVAS_WIDTH - 20 - PADDLE_WIDTH;

      // Player paddle bounce (Left side)
      if (
        ballX.current - BALL_SIZE / 2 <= playerPaddleX + PADDLE_WIDTH &&
        ballX.current + BALL_SIZE / 2 >= playerPaddleX &&
        ballY.current >= playerY.current &&
        ballY.current <= playerY.current + PADDLE_HEIGHT
      ) {
        rallyCount.current += 1;
        const hitOffset = (ballY.current - (playerY.current + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        const maxAngle = Math.PI / 3;
        const currentSpeed = Math.min(10, Math.hypot(ballVx.current, ballVy.current) * 1.05);
        ballVx.current = Math.abs(currentSpeed * Math.cos(hitOffset * maxAngle));
        ballVy.current = currentSpeed * Math.sin(hitOffset * maxAngle);
        ballX.current = playerPaddleX + PADDLE_WIDTH + BALL_SIZE / 2;
        retroAudio.playHit();
      }

      // AI paddle bounce (Right side)
      if (
        ballX.current + BALL_SIZE / 2 >= aiPaddleX &&
        ballX.current - BALL_SIZE / 2 <= aiPaddleX + PADDLE_WIDTH &&
        ballY.current >= aiY.current &&
        ballY.current <= aiY.current + PADDLE_HEIGHT
      ) {
        rallyCount.current += 1;
        const hitOffset = (ballY.current - (aiY.current + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
        const maxAngle = Math.PI / 3;
        const currentSpeed = Math.min(10, Math.hypot(ballVx.current, ballVy.current) * 1.05);
        ballVx.current = -Math.abs(currentSpeed * Math.cos(hitOffset * maxAngle));
        ballVy.current = currentSpeed * Math.sin(hitOffset * maxAngle);
        ballX.current = aiPaddleX - BALL_SIZE / 2;
        retroAudio.playHit();
      }

      // 5. Score check
      if (ballX.current < 0) {
        // AI scored
        setAiScore((prev) => {
          const next = prev + 1;
          if (next >= WINNING_SCORE) {
            setMatchOver("LOSS");
            retroAudio.playGameOver();
            onGameOver(playerScore * 10);
          } else {
            retroAudio.playHit();
            resetBall(true);
          }
          return next;
        });
      } else if (ballX.current > CANVAS_WIDTH) {
        // Player scored
        setPlayerScore((prev) => {
          const next = prev + 1;
          const newTotalScore = next * 10;
          onScoreChange(newTotalScore);
          if (next >= WINNING_SCORE) {
            setMatchOver("WIN");
            retroAudio.playScore();
            onGameOver(newTotalScore + 100);
          } else {
            retroAudio.playScore();
            resetBall(false);
          }
          return next;
        });
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [isPaused, matchOver, playerScore, onScoreChange, onGameOver, resetBall]);

  // Render loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Dark futuristic arena
      ctx.fillStyle = "#05080f";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Center dashed net line
      ctx.strokeStyle = "rgba(16, 185, 129, 0.25)";
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(CANVAS_WIDTH / 2, 0);
      ctx.lineTo(CANVAS_WIDTH / 2, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.setLineDash([]);

      // Scores watermark on canvas
      ctx.font = "bold 44px monospace";
      ctx.fillStyle = "rgba(16, 185, 129, 0.15)";
      ctx.textAlign = "center";
      ctx.fillText(`${playerScore}`, CANVAS_WIDTH / 2 - 60, 60);
      ctx.fillStyle = "rgba(244, 63, 94, 0.15)";
      ctx.fillText(`${aiScore}`, CANVAS_WIDTH / 2 + 60, 60);

      // Player Paddle (Neon Emerald)
      ctx.save();
      ctx.shadowColor = "#10B981";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#10B981";
      ctx.beginPath();
      ctx.roundRect(20, playerY.current, PADDLE_WIDTH, PADDLE_HEIGHT, 4);
      ctx.fill();
      ctx.restore();

      // AI Paddle (Neon Cyan/Rose)
      ctx.save();
      ctx.shadowColor = "#06B6D4";
      ctx.shadowBlur = 12;
      ctx.fillStyle = "#06B6D4";
      ctx.beginPath();
      ctx.roundRect(CANVAS_WIDTH - 20 - PADDLE_WIDTH, aiY.current, PADDLE_WIDTH, PADDLE_HEIGHT, 4);
      ctx.fill();
      ctx.restore();

      // Ball (Glowing White/Cyan)
      ctx.save();
      ctx.shadowColor = "#FFFFFF";
      ctx.shadowBlur = 14;
      ctx.fillStyle = "#FFFFFF";
      ctx.beginPath();
      ctx.arc(ballX.current, ballY.current, BALL_SIZE / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [playerScore, aiScore]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/40 bg-black shadow-[0_0_30px_rgba(16,185,129,0.15)]">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          onPointerMove={handlePointerMove}
          className="max-w-full w-[360px] sm:w-[480px] h-[240px] sm:h-[320px] block cursor-ns-resize touch-none"
        />

        {/* Score overlay bar */}
        <div className="absolute top-2 inset-x-0 flex justify-between px-6 pointer-events-none text-xs font-mono font-bold">
          <span className="text-emerald-400">YOU: {playerScore}</span>
          <span className="text-cyan-400">AI: {aiScore}</span>
        </div>

        {/* Match Over Modal */}
        {matchOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 backdrop-blur-sm p-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <p className="text-xs font-mono tracking-widest uppercase text-zinc-400">MATCH FINISHED</p>
            <h3 className={`text-3xl font-black mt-1 ${matchOver === "WIN" ? "text-emerald-400" : "text-rose-400"}`}>
              {matchOver === "WIN" ? "VICTORY!" : "DEFEAT"}
            </h3>
            <p className="text-zinc-300 font-mono text-sm mt-2">
              Final Score: {playerScore} - {aiScore}
            </p>
            <button
              onClick={resetGame}
              className="mt-5 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Paused Screen */}
        {isPaused && !matchOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6 text-center">
            <p className="text-xl font-bold text-amber-400 tracking-wider">PAUSED</p>
            <p className="text-xs text-zinc-400 mt-1">Press Pause button or Space to resume</p>
          </div>
        )}
      </div>
    </div>
  );
}
