"use client";

import { useCallback, useRef } from "react";

interface JoystickProps {
  onChange: (x: number, y: number) => void;
}

export function Joystick({ onChange }: JoystickProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerId = useRef<number | null>(null);

  const update = useCallback(
    (clientX: number, clientY: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = clientX - cx;
      const dy = clientY - cy;
      const maxRadius = rect.width / 2;
      const normalizedX = Math.max(-1, Math.min(1, dx / maxRadius));
      const normalizedY = Math.max(-1, Math.min(1, dy / maxRadius));
      onChange(normalizedX, normalizedY);
    },
    [onChange]
  );

  const reset = useCallback(() => {
    onChange(0, 0);
  }, [onChange]);

  return (
    <div
      ref={containerRef}
      className="joystick"
      onPointerDown={(event) => {
        pointerId.current = event.pointerId;
        (event.target as HTMLElement).setPointerCapture(event.pointerId);
        update(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (event.pointerId !== pointerId.current) return;
        update(event.clientX, event.clientY);
      }}
      onPointerUp={(event) => {
        if (event.pointerId !== pointerId.current) return;
        pointerId.current = null;
        (event.target as HTMLElement).releasePointerCapture(event.pointerId);
        reset();
      }}
      onPointerCancel={() => {
        pointerId.current = null;
        reset();
      }}
    >
      <div className="joystick-thumb" />
      <style jsx>{`
        .joystick {
          position: absolute;
          bottom: 36px;
          left: 36px;
          width: 120px;
          height: 120px;
          border-radius: 999px;
          background: rgba(20, 36, 62, 0.55);
          border: 1px solid rgba(107, 136, 206, 0.35);
          touch-action: none;
          display: grid;
          place-items: center;
        }
        .joystick-thumb {
          width: 48px;
          height: 48px;
          border-radius: 999px;
          background: linear-gradient(180deg, #5ea0ff 0%, #2560ff 100%);
          box-shadow: 0 0 18px rgba(62, 143, 255, 0.6);
        }
        @media (min-width: 768px) {
          .joystick {
            width: 140px;
            height: 140px;
          }
        }
      `}</style>
    </div>
  );
}
