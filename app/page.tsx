"use client";

import { useCallback, useMemo } from "react";
import { GameCanvas } from "./components/GameCanvas";
import { Hud } from "./components/Hud";
import { Joystick } from "./components/Joystick";
import { ActionPad } from "./components/ActionPad";
import { MatchControls } from "./components/MatchControls";
import { MiniMap } from "./components/MiniMap";
import { FeatureList } from "./components/FeatureList";
import { KeyboardHints } from "./components/KeyboardHints";
import { useGameStore } from "./lib/gameStore";
import { useInputController } from "./lib/useInput";

export default function HomePage() {
  const updateInput = useGameStore((state) => state.updateInput);
  const triggerFire = useGameStore((state) => state.triggerFire);
  const match = useGameStore((state) => state.match);
  const players = useGameStore((state) => state.players);

  useInputController();

  const humanPlayer = useMemo(() => players.find((player) => !player.isBot), [players]);

  const handleJoystick = useCallback(
    (x: number, y: number) => {
      updateInput({ moveX: x, moveY: -y });
    },
    [updateInput]
  );

  return (
    <main>
      <section className="hero">
        <div className="copy">
          <h1>Stormfall Royale</h1>
          <p>
            Drop into a 2 km island, loot tactical gear, and survive the shrinking storm. Optimized third-person
            battles for low-end devices with responsive touch and keyboard controls.
          </p>
          <div className="meta">
            <span>50 Players</span>
            <span>Dynamic Safe Zone</span>
            <span>Full Arsenal</span>
            <span>Mobile Ready</span>
          </div>
        </div>
        <div className="canvas-wrapper">
          <GameCanvas />
          <Hud />
          <MiniMap />
          <MatchControls />
          <div className="controls-layer">
            <Joystick onChange={handleJoystick} />
            <ActionPad
              onJump={() => {
                updateInput({ isJumping: true });
                window.setTimeout(() => updateInput({ isJumping: false }), 140);
              }}
              onCrouch={(toggle) => updateInput({ isCrouching: toggle })}
              onProne={(toggle) => updateInput({ isProne: toggle })}
              onInteract={() => {
                updateInput({ isInteracting: true });
                window.setTimeout(() => updateInput({ isInteracting: false }), 180);
              }}
              onShootStart={() => triggerFire(true)}
              onShootEnd={() => triggerFire(false)}
            />
          </div>
          {match.status === "finished" && humanPlayer?.id === match.winnerId && (
            <div className="victory-banner">
              <h2>Victory Royale</h2>
              <p>You outlasted the arena. Queue up again!</p>
            </div>
          )}
        </div>
      </section>
      <section className="details">
        <h2>Advanced Royale Systems</h2>
        <p>
          Built with WebGL acceleration for browser deployment, Stormfall Royale prototypes the full battle royale
          loop: aerial deployment, procedural loot, adaptive AI squads, and an intelligent storm that pressures combat.
        </p>
        <FeatureList />
        <KeyboardHints />
      </section>
      <section className="technical">
        <h2>Technical Pillars</h2>
        <div className="pillar-grid">
          <article>
            <h3>Scaled Terrain</h3>
            <p>
              Recreated 2×2 km island layout with optimized meshes, low-poly landmarks, rivers, and elevation cues to
              guide rotations and flanking routes.
            </p>
          </article>
          <article>
            <h3>Weapon Simulation</h3>
            <p>
              Attachment-aware weapon profiles simulate velocity, fire rate, recoil discipline, and falloff to deliver
              believable gunplay.
            </p>
          </article>
          <article>
            <h3>Performance Focus</h3>
            <p>
              Tweaked materials, fog, shadow cascades, and instancing to keep the experience smooth across low-end
              hardware while preserving atmosphere.
            </p>
          </article>
        </div>
      </section>
      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          gap: 56px;
          padding-bottom: 80px;
        }
        .hero {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 36px;
          padding: 48px;
        }
        .copy h1 {
          font-size: clamp(2.6rem, 5vw, 4rem);
          margin: 0 0 18px;
        }
        .copy p {
          margin: 0;
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(214, 228, 255, 0.75);
        }
        .meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 24px;
        }
        .meta span {
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(20, 32, 51, 0.8);
          border: 1px solid rgba(68, 103, 175, 0.4);
          font-weight: 600;
        }
        .canvas-wrapper {
          position: relative;
          min-height: 540px;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid rgba(70, 110, 188, 0.35);
          box-shadow: inset 0 0 0 1px rgba(59, 96, 163, 0.15);
        }
        canvas {
          width: 100% !important;
          height: 100% !important;
        }
        .controls-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .controls-layer :global(.joystick),
        .controls-layer :global(.action-pad) {
          pointer-events: auto;
        }
        .victory-banner {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(7, 14, 28, 0.88);
          border: 1px solid rgba(80, 130, 255, 0.55);
          padding: 32px 48px;
          border-radius: 22px;
          text-align: center;
          box-shadow: 0 40px 60px rgba(18, 58, 128, 0.45);
          pointer-events: none;
        }
        .victory-banner h2 {
          margin: 0 0 12px;
          font-size: 2.3rem;
        }
        .victory-banner p {
          margin: 0;
          color: rgba(203, 218, 255, 0.75);
        }
        .details,
        .technical {
          padding: 0 48px;
        }
        .details h2,
        .technical h2 {
          font-size: 2rem;
          margin-bottom: 12px;
        }
        .details p,
        .technical p {
          color: rgba(210, 224, 255, 0.7);
          line-height: 1.6;
        }
        .pillar-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          margin-top: 28px;
        }
        .pillar-grid article {
          padding: 20px;
          border-radius: 18px;
          background: rgba(8, 15, 26, 0.78);
          border: 1px solid rgba(80, 119, 188, 0.3);
        }
        .pillar-grid h3 {
          margin: 0 0 10px;
        }
        @media (max-width: 900px) {
          .hero {
            padding: 32px 18px;
          }
          .details,
          .technical {
            padding: 0 18px;
          }
        }
        @media (max-width: 640px) {
          .canvas-wrapper {
            min-height: 420px;
          }
        }
      `}</style>
    </main>
  );
}
