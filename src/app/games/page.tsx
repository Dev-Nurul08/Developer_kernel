import type { Metadata } from "next";
import { MotionSection, PageTransition } from "@/components/motion-section";
import { ArcadeHub } from "@/components/arcade/arcade-hub";

export const metadata: Metadata = {
  title: "Arcade Games & Interactive Retro Studio",
  description:
    "Play 6 built-in interactive retro arcade games developed by Nurul Shaikh: Snake Classic, Cyber Pong, Neon Brick Breaker, 2048 Cyber Grid, Galaxy Defender, and Flappy Coder.",
  keywords: [
    "Nurul Shaikh Games",
    "Nurul Shaikh Arcade",
    "Developer Portfolio Games",
    "Snake Game Canvas",
    "Cyber Pong",
    "Brick Breaker HTML5",
    "2048 Game React",
    "Space Invaders JavaScript",
    "Flappy Coder",
  ],
};

export default function GamesPage() {
  return (
    <PageTransition className="space-y-6">
      <MotionSection>
        <p className="text-sm text-[var(--app-muted)]">Recreational Runtime</p>
        <h1 className="mt-1 text-3xl font-semibold text-[var(--app-text)]">Arcade System</h1>
      </MotionSection>

      <ArcadeHub />
    </PageTransition>
  );
}
