"use client";

import { useMemo } from "react";
import { useGameStore } from "@/app/lib/gameStore";

export function Hud() {
  const match = useGameStore((state) => state.match);
  const players = useGameStore((state) => state.players);
  const safeZone = useGameStore((state) => state.safeZone);
  const humanPlayer = useMemo(() => players.find((p) => !p.isBot), [players]);

  return (
    <div className="hud">
      <section className="top">
        <div>
          <h2>Stormfall Royale</h2>
          <p>{match.status === "finished" ? "Match Complete" : "Battle Royale Simulation"}</p>
        </div>
        <div className="status-cards">
          <article>
            <span>Alive</span>
            <strong>{match.aliveCount}</strong>
          </article>
          <article>
            <span>Phase</span>
            <strong>{safeZone.phase}</strong>
          </article>
          <article>
            <span>Safe Shrink</span>
            <strong>{Math.max(0, safeZone.timeToNextShrink).toFixed(1)}s</strong>
          </article>
        </div>
      </section>
      <section className="player">
        <div className="health">
          <label>Health</label>
          <div className="bar">
            <span style={{ width: `${Math.max(0, Math.min(100, (humanPlayer?.health ?? 0) / 2))}%` }} />
          </div>
        </div>
        <div className="equipment">
          <div>
            <label>Armor</label>
            <p>L{humanPlayer?.armorLevel ?? 0}</p>
          </div>
          <div>
            <label>Helmet</label>
            <p>L{humanPlayer?.helmetLevel ?? 0}</p>
          </div>
          <div>
            <label>Backpack</label>
            <p>L{humanPlayer?.backpackLevel ?? 0}</p>
          </div>
        </div>
      </section>
      <section className="inventory">
        <h3>Inventory</h3>
        <div className="weapons">
          {humanPlayer?.inventory.map((slot, index) => (
            <article key={`${slot.weapon.id}-${index}`} className={slot === humanPlayer.activeWeapon ? "active" : undefined}>
              <header>
                <span>{slot.weapon.category.toUpperCase()}</span>
                <span>{slot.attachment.scope ?? "Iron"}</span>
              </header>
              <strong>{slot.weapon.name}</strong>
              <footer>
                <span>{slot.ammo} ammo</span>
                {slot.attachment.extendedMag ? <span>Ext Mag</span> : null}
                {slot.attachment.suppressor ? <span>Suppressor</span> : null}
              </footer>
            </article>
          ))}
          {!humanPlayer && <p>No player controlled.</p>}
        </div>
      </section>
      <style jsx>{`
        .hud {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          pointer-events: none;
          padding: 24px;
          gap: 18px;
        }
        .top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
        }
        h2 {
          margin: 0;
          font-size: 1.6rem;
        }
        p {
          margin: 4px 0 0;
          color: rgba(236, 244, 255, 0.68);
          font-size: 0.95rem;
        }
        .status-cards {
          display: flex;
          gap: 12px;
          pointer-events: none;
        }
        article {
          background: rgba(10, 19, 32, 0.65);
          border: 1px solid rgba(88, 124, 181, 0.35);
          border-radius: 16px;
          padding: 12px 18px;
          min-width: 84px;
          backdrop-filter: blur(6px);
        }
        article span {
          font-size: 0.75rem;
          text-transform: uppercase;
          color: rgba(212, 223, 255, 0.65);
        }
        article strong {
          display: block;
          margin-top: 6px;
          font-size: 1.3rem;
        }
        .player {
          display: flex;
          gap: 18px;
          align-items: center;
        }
        .health {
          flex: 1;
          pointer-events: none;
        }
        .health label {
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          color: rgba(216, 229, 255, 0.7);
        }
        .bar {
          margin-top: 6px;
          width: 100%;
          height: 16px;
          border-radius: 999px;
          background: rgba(39, 54, 78, 0.65);
          overflow: hidden;
        }
        .bar span {
          display: block;
          height: 100%;
          background: linear-gradient(90deg, #3ae6a5 0%, #007759 100%);
        }
        .equipment {
          display: flex;
          gap: 14px;
          pointer-events: none;
        }
        .equipment div {
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(18, 29, 45, 0.7);
          border: 1px solid rgba(90, 118, 182, 0.35);
        }
        .equipment label {
          font-size: 0.7rem;
          text-transform: uppercase;
          color: rgba(190, 208, 255, 0.65);
        }
        .equipment p {
          margin: 4px 0 0;
          font-weight: 600;
        }
        .inventory {
          margin-top: auto;
          pointer-events: none;
        }
        .inventory h3 {
          margin: 0 0 12px;
          font-size: 1.1rem;
        }
        .weapons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .weapons article {
          pointer-events: none;
          min-width: 160px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .weapons article.active {
          border-color: rgba(91, 178, 255, 0.8);
          transform: translateY(-4px);
          box-shadow: 0 12px 26px rgba(46, 128, 255, 0.25);
        }
        .weapons header,
        .weapons footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: rgba(199, 223, 255, 0.6);
        }
        .weapons strong {
          display: block;
          margin: 8px 0;
          font-size: 1rem;
        }
        @media (max-width: 768px) {
          .hud {
            padding: 18px;
            gap: 12px;
          }
          .top {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
