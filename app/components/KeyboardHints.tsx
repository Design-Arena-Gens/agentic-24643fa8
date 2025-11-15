export function KeyboardHints() {
  return (
    <div className="hints">
      <h4>Keyboard Controls</h4>
      <ul>
        <li><span>WASD</span> Move</li>
        <li><span>Space</span> Jump</li>
        <li><span>Left Shift</span> Sprint</li>
        <li><span>Ctrl</span> Crouch</li>
        <li><span>Z</span> Prone</li>
        <li><span>F</span> Interact</li>
        <li><span>Click</span> Fire</li>
      </ul>
      <style jsx>{`
        .hints {
          margin-top: 32px;
          padding: 20px;
          border-radius: 18px;
          background: rgba(8, 14, 26, 0.72);
          border: 1px solid rgba(100, 134, 212, 0.35);
        }
        h4 {
          margin: 0 0 12px;
        }
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          gap: 8px;
        }
        li {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(205, 220, 255, 0.72);
        }
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          padding: 6px 10px;
          border-radius: 8px;
          background: rgba(27, 44, 72, 0.8);
          border: 1px solid rgba(99, 134, 214, 0.35);
          font-size: 0.85rem;
          color: #dfe9ff;
        }
      `}</style>
    </div>
  );
}
