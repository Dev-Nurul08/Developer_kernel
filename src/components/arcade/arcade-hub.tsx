"use client";

import { useState, useEffect, useCallback } from "react";
import { SnakeGame } from "./snake-game";
import { PongGame } from "./pong-game";
import { BrickBreakerGame } from "./brick-breaker-game";
import { Game2048 } from "./game-2048";
import { SpaceInvadersGame } from "./space-invaders-game";
import { FlappyCoderGame } from "./flappy-coder-game";
import { retroAudio } from "./sound-effects";
import {
  Gamepad2,
  Trophy,
  Volume2,
  VolumeX,
  RotateCcw,
  Pause,
  Play,
  ArrowLeft,
  Tv,
  Sparkles,
  Flame,
  Zap,
  Swords,
  Layers,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleDot,
} from "lucide-react";

export type GameId = "snake" | "pong" | "breakout" | "2048" | "invaders" | "flappy";

type GameMeta = {
  id: GameId;
  title: string;
  category: string;
  badge: string;
  description: string;
  icon: React.ReactNode;
  controls: string;
  accent: string;
};

const GAMES: GameMeta[] = [
  {
    id: "snake",
    title: "Snake Classic",
    category: "Arcade Retro",
    badge: "Most Popular",
    description: "Navigate the neon cyber serpent, consume data energy orbs, and scale your length without crashing into the perimeter walls.",
    icon: <Sparkles className="size-5 text-emerald-400" />,
    controls: "Arrow Keys / WASD / D-Pad",
    accent: "#10B981",
  },
  {
    id: "pong",
    title: "Cyber Pong",
    category: "Sports & Physics",
    badge: "Vs AI Bot",
    description: "Fast-paced cyber table tennis duel against an adaptive bot paddle. Deflect high-velocity shots to score 7 points for victory.",
    icon: <Swords className="size-5 text-cyan-400" />,
    controls: "W/S / Up/Down / Mouse Move / Touch",
    accent: "#06B6D4",
  },
  {
    id: "breakout",
    title: "Neon Brick Breaker",
    category: "Action & Physics",
    badge: "3 Lives",
    description: "Demolish multiple rows of high-density neon bricks with angled ball deflections and power combo scoring multipliers.",
    icon: <Flame className="size-5 text-amber-400" />,
    controls: "Left/Right / A/D / Mouse Slide / D-Pad",
    accent: "#F59E0B",
  },
  {
    id: "2048",
    title: "2048 Cyber Grid",
    category: "Puzzle & Logic",
    badge: "Mind Bender",
    description: "Slide and fuse matching numeric data blocks across a 4x4 matrix to forge the legendary 2048 cyber quantum tile.",
    icon: <Layers className="size-5 text-violet-400" />,
    controls: "Arrow Keys / WASD / Swipe Gestures",
    accent: "#8B5CF6",
  },
  {
    id: "invaders",
    title: "Galaxy Defender",
    category: "Space Shooter",
    badge: "Classic 80s",
    description: "Command a starship to defend against descending waves of alien invaders while dodging enemy fire and scoring tactical combos.",
    icon: <Zap className="size-5 text-rose-400" />,
    controls: "Left/Right + Spacebar / Action Button",
    accent: "#F43F5E",
  },
  {
    id: "flappy",
    title: "Flappy Coder",
    category: "Endless Runner",
    badge: "High Reflex",
    description: "Pilot the jet-propelled developer bot through tight code-bracket obstacles. Perfect your rhythm to beat personal best streaks.",
    icon: <Gamepad2 className="size-5 text-emerald-400" />,
    controls: "Click / Tap / Spacebar / Up Arrow",
    accent: "#10B981",
  },
];

export function ArcadeHub() {
  const [activeGame, setActiveGame] = useState<GameId | null>(null);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScores, setHighScores] = useState<Record<GameId, number>>({
    snake: 0,
    pong: 0,
    breakout: 0,
    "2048": 0,
    invaders: 0,
    flappy: 0,
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [scanlines, setScanlines] = useState(true);
  const [gameKey, setGameKey] = useState(0); // Trigger clean restart

  // D-Pad trigger states for mobile/on-screen controls
  const [dpadDir, setDpadDir] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT" | null>(null);
  const [actionTrigger, setActionTrigger] = useState(false);

  // Load high scores from localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    const scores: Record<GameId, number> = {
      snake: Number(window.localStorage.getItem("nurul_arcade_hs_snake") || 0),
      pong: Number(window.localStorage.getItem("nurul_arcade_hs_pong") || 0),
      breakout: Number(window.localStorage.getItem("nurul_arcade_hs_breakout") || 0),
      "2048": Number(window.localStorage.getItem("nurul_arcade_hs_2048") || 0),
      invaders: Number(window.localStorage.getItem("nurul_arcade_hs_invaders") || 0),
      flappy: Number(window.localStorage.getItem("nurul_arcade_hs_flappy") || 0),
    };
    setHighScores(scores);
    setIsMuted(retroAudio.isMuted);
  }, []);

  const handleScoreChange = useCallback(
    (score: number) => {
      setCurrentScore(score);
      if (activeGame) {
        setHighScores((prev) => {
          if (score > prev[activeGame]) {
            const updated = { ...prev, [activeGame]: score };
            if (typeof window !== "undefined") {
              window.localStorage.setItem(`nurul_arcade_hs_${activeGame}`, String(score));
            }
            return updated;
          }
          return prev;
        });
      }
    },
    [activeGame],
  );

  const handleGameOver = useCallback(
    (finalScore: number) => {
      if (activeGame) {
        setHighScores((prev) => {
          if (finalScore > prev[activeGame]) {
            const updated = { ...prev, [activeGame]: finalScore };
            if (typeof window !== "undefined") {
              window.localStorage.setItem(`nurul_arcade_hs_${activeGame}`, String(finalScore));
            }
            return updated;
          }
          return prev;
        });
      }
    },
    [activeGame],
  );

  const toggleSound = () => {
    const muted = retroAudio.toggleMute();
    setIsMuted(muted);
  };

  const restartCurrentGame = () => {
    setGameKey((k) => k + 1);
    setCurrentScore(0);
    setIsPaused(false);
  };

  const triggerDpad = (dir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    setDpadDir(dir);
    setTimeout(() => setDpadDir(null), 50);
  };

  const triggerAction = () => {
    setActionTrigger(true);
    setTimeout(() => setActionTrigger(false), 50);
  };

  const selectedMeta = GAMES.find((g) => g.id === activeGame);

  return (
    <div className="space-y-6">
      {/* ─── Arcade Lobby View ─── */}
      {!activeGame ? (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="glass-panel rounded-xl p-6 sm:p-8 relative overflow-hidden border border-emerald-500/30">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 size-64 rounded-full bg-gradient-to-br from-emerald-500/10 via-cyan-500/5 to-transparent blur-3xl pointer-events-none" />
            
            <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <Gamepad2 className="size-4 animate-bounce" />
                  BUILT-IN ARCADE STATION
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--app-text)]">
                  Interactive Developer Games
                </h2>
                <p className="text-sm text-[var(--app-muted)] max-w-2xl leading-relaxed">
                  Take a break and test your reflexes! Play 6 custom-engineered retro arcade games with synthesized 8-bit sound effects, physics engines, high score tracking, and full mobile touch controls.
                </p>
              </div>

              {/* Global Audio & CRT Toggles */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSound}
                  className="button-scale inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2 text-xs font-semibold text-[var(--app-text)] hover:border-emerald-500/40 transition-colors"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? <VolumeX className="size-4 text-rose-400" /> : <Volume2 className="size-4 text-emerald-400" />}
                  <span>{isMuted ? "Audio: Off" : "Audio: On"}</span>
                </button>
                <button
                  onClick={() => setScanlines(!scanlines)}
                  className={`button-scale inline-flex items-center gap-2 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-2 text-xs font-semibold ${scanlines ? "text-emerald-400 border-emerald-500/30" : "text-[var(--app-muted)]"}`}
                  title="Toggle CRT Scanline Effect"
                >
                  <Tv className="size-4" />
                  <span>CRT FX</span>
                </button>
              </div>
            </div>
          </div>

          {/* Game Selection Grid (6 Games) */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GAMES.map((game) => {
              const hs = highScores[game.id] || 0;
              return (
                <div
                  key={game.id}
                  className="lift-card glass-panel rounded-xl p-5 border border-[var(--app-border)] hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div
                        style={{ backgroundColor: `${game.accent}15`, borderColor: `${game.accent}40` }}
                        className="grid size-11 place-items-center rounded-xl border"
                      >
                        {game.icon}
                      </div>
                      <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 font-mono">
                        {game.badge}
                      </span>
                    </div>

                    <div>
                      <p className="text-xs font-mono text-[var(--app-muted)] uppercase tracking-wider">{game.category}</p>
                      <h3 className="text-xl font-bold text-[var(--app-text)] group-hover:text-emerald-400 transition-colors mt-0.5">
                        {game.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[var(--app-muted)] leading-relaxed line-clamp-3">
                      {game.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--app-border)] mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--app-muted)] flex items-center gap-1">
                        <Trophy className="size-3.5 text-amber-400" /> Best:
                      </span>
                      <strong className="text-emerald-400 text-sm font-bold">{hs}</strong>
                    </div>

                    <button
                      onClick={() => {
                        setActiveGame(game.id);
                        setCurrentScore(0);
                        setIsPaused(false);
                      }}
                      className="button-scale w-full rounded-lg bg-emerald-500 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <Play className="size-3.5 fill-current" /> Play Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ─── Active Game Arena View ─── */
        <div className="space-y-4">
          {/* Top Game Header Bar */}
          <div className="glass-panel rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 border border-emerald-500/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveGame(null);
                  setCurrentScore(0);
                }}
                className="button-scale inline-flex items-center gap-1.5 rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--app-text)] hover:border-emerald-500/40 transition-colors"
              >
                <ArrowLeft className="size-3.5" /> Arcade Hub
              </button>
              <div>
                <h3 className="text-base font-bold text-[var(--app-text)]">{selectedMeta?.title}</h3>
                <p className="text-[11px] text-[var(--app-muted)] hidden sm:block">
                  Controls: {selectedMeta?.controls}
                </p>
              </div>
            </div>

            {/* Score HUD & Actions */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-3 bg-[var(--app-bg)] px-3 py-1.5 rounded-lg border border-[var(--app-border)] font-mono text-xs">
                <div>
                  <span className="text-[var(--app-muted)] text-[10px] block leading-none">SCORE</span>
                  <span className="text-emerald-400 font-bold text-sm leading-tight">{currentScore}</span>
                </div>
                <div className="border-l border-[var(--app-border)] pl-3">
                  <span className="text-[var(--app-muted)] text-[10px] block leading-none">HIGH SCORE</span>
                  <span className="text-amber-400 font-bold text-sm leading-tight">
                    {highScores[activeGame] || 0}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className="button-scale grid size-9 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] hover:border-emerald-500/40"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? <Play className="size-4 text-emerald-400" /> : <Pause className="size-4 text-amber-400" />}
              </button>

              <button
                onClick={restartCurrentGame}
                className="button-scale grid size-9 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] hover:border-emerald-500/40"
                title="Restart Game"
              >
                <RotateCcw className="size-4 text-zinc-300" />
              </button>

              <button
                onClick={toggleSound}
                className="button-scale grid size-9 place-items-center rounded-lg border border-[var(--app-border)] bg-[var(--app-bg)] text-[var(--app-text)] hover:border-emerald-500/40"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <VolumeX className="size-4 text-rose-400" /> : <Volume2 className="size-4 text-emerald-400" />}
              </button>
            </div>
          </div>

          {/* Central Arcade Cabinet Frame */}
          <div className="glass-panel rounded-2xl p-4 sm:p-6 border border-emerald-500/30 relative flex flex-col items-center justify-center overflow-hidden">
            {/* CRT scanlines overlay */}
            {scanlines && (
              <div
                className="pointer-events-none absolute inset-0 z-20 opacity-20"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.7) 2px, rgba(0, 0, 0, 0.7) 4px)",
                }}
              />
            )}

            {/* Game Canvas Component */}
            <div className="relative z-10">
              {activeGame === "snake" && (
                <SnakeGame
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                />
              )}
              {activeGame === "pong" && (
                <PongGame
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                />
              )}
              {activeGame === "breakout" && (
                <BrickBreakerGame
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                />
              )}
              {activeGame === "2048" && (
                <Game2048
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                />
              )}
              {activeGame === "invaders" && (
                <SpaceInvadersGame
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                  externalAction={actionTrigger}
                />
              )}
              {activeGame === "flappy" && (
                <FlappyCoderGame
                  key={gameKey}
                  onScoreChange={handleScoreChange}
                  onGameOver={handleGameOver}
                  isPaused={isPaused}
                  externalDirection={dpadDir}
                  externalAction={actionTrigger}
                />
              )}
            </div>

            {/* On-Screen Virtual D-Pad / Controls for Touch & Mobile Visitors */}
            <div className="mt-5 w-full max-w-sm flex items-center justify-between gap-4 p-3 rounded-xl border border-[var(--app-border)] bg-[var(--app-bg)]/80 backdrop-blur-sm">
              {/* Directional Pad */}
              <div className="grid grid-cols-3 gap-1 size-28 p-1 place-items-center">
                <div />
                <button
                  onPointerDown={() => triggerDpad("UP")}
                  className="size-9 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] flex items-center justify-center text-zinc-300 active:bg-emerald-500 active:text-black transition-colors"
                  aria-label="Up"
                >
                  <ChevronUp className="size-5" />
                </button>
                <div />

                <button
                  onPointerDown={() => triggerDpad("LEFT")}
                  className="size-9 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] flex items-center justify-center text-zinc-300 active:bg-emerald-500 active:text-black transition-colors"
                  aria-label="Left"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="size-7 rounded-full bg-emerald-500/20 border border-emerald-500/40" />

                <button
                  onPointerDown={() => triggerDpad("RIGHT")}
                  className="size-9 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] flex items-center justify-center text-zinc-300 active:bg-emerald-500 active:text-black transition-colors"
                  aria-label="Right"
                >
                  <ChevronRight className="size-5" />
                </button>

                <div />
                <button
                  onPointerDown={() => triggerDpad("DOWN")}
                  className="size-9 rounded-lg border border-[var(--app-border)] bg-[var(--app-card)] flex items-center justify-center text-zinc-300 active:bg-emerald-500 active:text-black transition-colors"
                  aria-label="Down"
                >
                  <ChevronDown className="size-5" />
                </button>
                <div />
              </div>

              {/* Action Button & Instructions */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onPointerDown={triggerAction}
                  className="size-14 rounded-full border-2 border-emerald-500 bg-emerald-500/20 active:bg-emerald-500 active:text-black text-emerald-400 font-bold text-xs flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  aria-label="Action Button"
                >
                  <CircleDot className="size-6" />
                </button>
                <span className="text-[10px] font-mono text-[var(--app-muted)]">ACTION / FLAP</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
