"use client";

import { useGameStore } from "@/app/lib/gameStore";

export function MatchControls() {
  const match = useGameStore((state) => state.match);
  const requestDrop = useGameStore((state) => state.requestDrop);
  const reviveMatch = useGameStore((state) => state.reviveMatch);

  return (
    <div className="match-controls">
      {match.status === "dropping" && (
        <button type="button" onClick={requestDrop}>
          Jump Now
        </button>
      )}
      {match.status === "finished" && (
        <button type="button" onClick={reviveMatch}>
          New Match
        </button>
      )}
      <style jsx>{`
        .match-controls {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 16px;
          pointer-events: auto;
        }
        button {
          padding: 18px 32px;
          font-size: 1.1rem;
          background: linear-gradient(135deg, #3d9eff 0%, #1c4dff 100%);
          border-radius: 999px;
          border: 0;
          color: #fff;
          font-weight: 700;
          box-shadow: 0 18px 42px rgba(31, 122, 255, 0.35);
        }
        button:hover {
          transform: translateY(-2px);
        }
        button:active {
          transform: translateY(1px);
        }
      `}</style>
    </div>
  );
}
