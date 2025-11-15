"use client";

interface ActionPadProps {
  onJump: () => void;
  onCrouch: (toggle: boolean) => void;
  onProne: (toggle: boolean) => void;
  onInteract: () => void;
  onShootStart: () => void;
  onShootEnd: () => void;
}

export function ActionPad({
  onJump,
  onCrouch,
  onProne,
  onInteract,
  onShootStart,
  onShootEnd
}: ActionPadProps) {
  return (
    <div className="action-pad">
      <div className="row">
        <button type="button" onPointerDown={onShootStart} onPointerUp={onShootEnd} onPointerLeave={onShootEnd}>
          Fire
        </button>
        <button type="button" onClick={onInteract}>
          Loot
        </button>
      </div>
      <div className="row">
        <button type="button" onClick={onJump}>
          Jump
        </button>
        <button type="button" onPointerDown={() => onCrouch(true)} onPointerUp={() => onCrouch(false)} onPointerLeave={() => onCrouch(false)}>
          Crouch
        </button>
        <button type="button" onPointerDown={() => onProne(true)} onPointerUp={() => onProne(false)} onPointerLeave={() => onProne(false)}>
          Prone
        </button>
      </div>
      <style jsx>{`
        .action-pad {
          position: absolute;
          bottom: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }
        .row {
          display: flex;
          gap: 12px;
        }
        button {
          min-width: 72px;
          min-height: 48px;
          padding: 12px 18px;
          border-radius: 12px;
          background: rgba(20, 36, 62, 0.58);
          color: #f3f7ff;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(95, 136, 221, 0.35);
          backdrop-filter: blur(5px);
        }
        button:active {
          transform: scale(0.96);
          background: rgba(55, 131, 255, 0.65);
        }
      `}</style>
    </div>
  );
}
