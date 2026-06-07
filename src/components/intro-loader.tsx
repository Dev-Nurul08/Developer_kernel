"use client";

import { useEffect, useState } from "react";

interface IntroLoaderProps {
  onComplete: () => void;
}

export function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [fadeExit, setFadeExit] = useState(false);

  useEffect(() => {
    // Start fading out the loader overlay immediately after the name animation completes (3 seconds)
    const fadeTimer = setTimeout(() => {
      setFadeExit(true);
    }, 3000);

    // Call onComplete after the 0.5s fade exit transition (3.5 seconds total)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-loader-overlay ${fadeExit ? "fade-exit" : ""}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700;900&display=swap');

        :root {
          --accent-color: #94A3B8; /* Muted Slate Silver */
          --accent-color-dark: #64748B; /* Dark Steel Gray */
          --accent-color-glow: rgba(148, 163, 184, 0.25);
          --accent-color-glow-heavy: rgba(148, 163, 184, 0.6);
        }

        /* Full screen overlay style with smooth native CSS transitions */
        .intro-loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background-color: #020205;
          opacity: 1;
          transition: opacity 0.5s cubic-bezier(0.25, 1, 0.35, 1);
          pointer-events: auto;
        }

        .intro-loader-overlay.fade-exit {
          opacity: 0;
          pointer-events: none;
        }

        .loader-container {
          position: relative;
          width: 90vw;
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Ambient glowing backdrop matching slate gray */
        .glowing-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          height: 60%;
          background: radial-gradient(circle, rgba(148, 163, 184, 0.05) 0%, transparent 80%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 1;
        }

        /* Name bounding container to keep layers and sweep line perfectly in sync */
        .name-container {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }

        /* Base text layer showing the dim outlines */
        .text-base-layer {
          width: 100%;
          text-align: center;
          color: rgba(255, 255, 255, 0.01);
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.06);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
          user-select: none;
          
          /* Responsive sizing to cover the screen width elegantly */
          font-size: 11vw;
        }

        /* Reveal mask (sweeping clip box) using sliding transform */
        .reveal-mask {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          will-change: transform;
          transform: translate3d(-100%, 0, 0);
          animation: maskSweep 3.0s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        /* Highlighted reveal layer containing the filled text with glow */
        .reveal-content {
          width: 100%;
          height: 100%;
          text-align: center;
          color: var(--accent-color);
          font-family: 'Space Grotesk', sans-serif;
          font-weight: 900;
          line-height: 1.15;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          white-space: nowrap;
          user-select: none;
          filter: drop-shadow(0 0 12px var(--accent-color-glow-heavy));
          font-size: 11vw;
          will-change: transform;
          transform: translate3d(100%, 0, 0);
          animation: contentSweep 3.0s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        /* Dedicated GPU-friendly sweep line container (wave of light) */
        .sweep-line-container {
          position: absolute;
          top: -2%;
          bottom: -2%;
          left: 0;
          width: 100%;
          pointer-events: none;
          z-index: 10;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          animation: lineSweep 3.0s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
        }

        .sweep-line {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent-color);
          box-shadow: 
            0 0 15px var(--accent-color),
            0 0 25px var(--accent-color-dark);
        }

        @media (min-width: 768px) {
          .text-base-layer, .reveal-content {
            font-size: 8.5vw;
          }
        }

        @media (min-width: 1024px) {
          .text-base-layer, .reveal-content {
            font-size: 7.5vw;
          }
        }

        @keyframes clipSweep {
          0% {
            clip-path: inset(0 100% 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes maskSweep {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        @keyframes contentSweep {
          0% {
            transform: translate3d(100%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }

        @keyframes lineSweep {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(100%, 0, 0);
          }
        }

        /* Sleek progress indicator bar */
        .progress-bar-container {
          position: relative;
          margin-top: 40px;
          width: 260px;
          height: 2px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 99px;
          overflow: hidden;
          z-index: 2;
        }

        .progress-bar-fill {
          height: 100%;
          width: 0%;
          background: var(--accent-color-dark);
          border-radius: inherit;
          animation: progressLoad 3.0s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
          box-shadow: 0 0 8px var(--accent-color-glow);
        }

        @keyframes progressLoad {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        /* Loader subtitle */
        .loader-subtitle {
          margin-top: 25px;
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.2);
          letter-spacing: 0.45em;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(6px);
          animation: fadeInSubtitle 0.5s ease-out 0.4s forwards;
          z-index: 2;
        }

        @keyframes fadeInSubtitle {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="loader-container">
        <div className="glowing-bg"></div>
        
        <div className="name-container">
          {/* Base outlines */}
          <div className="text-base-layer">
            <div>NURUL</div>
            <div>SHAIKH</div>
          </div>

          {/* Reveal layer (sliding mask) */}
          <div className="reveal-mask">
            <div className="reveal-content">
              <div>NURUL</div>
              <div>SHAIKH</div>
            </div>
          </div>

          {/* Sweep line container and element (wave of light) */}
          <div className="sweep-line-container">
            <div className="sweep-line"></div>
          </div>
        </div>

        <p className="loader-subtitle">Personal Operating System v1.0</p>
        
        <div className="progress-bar-container">
          <div className="progress-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
