"use client";

import { useMemo } from "react";
import { useGameStore } from "@/app/lib/gameStore";
import { MAP_HALF_EXTENT } from "@/app/lib/constants";

const mapSizePx = 180;

const worldToMiniMap = (value: number) => ((value + MAP_HALF_EXTENT) / (MAP_HALF_EXTENT * 2)) * mapSizePx;

export function MiniMap() {
  const players = useGameStore((state) => state.players);
  const safeZone = useGameStore((state) => state.safeZone);
  const circles = useMemo(() => {
    const radiusRatio = safeZone.radius / (MAP_HALF_EXTENT * 2);
    return {
      radius: radiusRatio * mapSizePx,
      cx: worldToMiniMap(safeZone.center.x),
      cy: worldToMiniMap(safeZone.center.z)
    };
  }, [safeZone]);

  return (
    <div className="mini-map">
      <svg width={mapSizePx} height={mapSizePx} viewBox={`0 0 ${mapSizePx} ${mapSizePx}`}>
        <defs>
          <radialGradient id="mapGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#1b2a47" />
            <stop offset="100%" stopColor="#0a101d" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" rx="18" fill="url(#mapGradient)" stroke="rgba(90,125,200,0.4)" strokeWidth="2" />
        <circle cx={circles.cx} cy={circles.cy} r={circles.radius} fill="none" stroke="#60d7ff" strokeDasharray="6 4" strokeWidth="2" />
        {players.map((player) => (
          <circle
            key={player.id}
            cx={worldToMiniMap(player.position.x)}
            cy={worldToMiniMap(player.position.z)}
            r={player.isBot ? 2.5 : 4.5}
            fill={player.isBot ? "#5892ff" : "#ff9240"}
            opacity={player.isAlive ? 1 : 0.3}
          />
        ))}
      </svg>
      <style jsx>{`
        .mini-map {
          position: absolute;
          bottom: 24px;
          right: 50%;
          transform: translateX(50%);
          pointer-events: none;
        }
      `}</style>
    </div>
  );
}
