export function FeatureList() {
  return (
    <div className="feature-grid">
      <article>
        <h3>Dynamic Shrinking Zone</h3>
        <p>Adaptive safe zone funnels the fight using smart relocation logic to force decisive encounters.</p>
      </article>
      <article>
        <h3>50 Combatants</h3>
        <p>Full lobby of bots and human slots featuring autonomous behaviors, tracking, and engagement ranges.</p>
      </article>
      <article>
        <h3>Device-Friendly URP Look</h3>
        <p>Stylized low-poly map, optimized lighting and materials designed to run smoothly on modest hardware.</p>
      </article>
      <article>
        <h3>Arsenal Variety</h3>
        <p>Snipers, ARs, SMGs, shotguns, throwables, and melee options with attachments and ammo handling.</p>
      </article>
      <article>
        <h3>Touch + Keyboard</h3>
        <p>Virtual joystick and action pad paired with keyboard bindings for fluid movement on any device.</p>
      </article>
      <article>
        <h3>Real-Time Telemetry</h3>
        <p>HUD overlays, minimap awareness, inventory readouts, and victory detection keep squads informed.</p>
      </article>
      <style jsx>{`
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
          margin-top: 28px;
        }
        article {
          background: rgba(9, 16, 28, 0.75);
          border: 1px solid rgba(86, 116, 194, 0.3);
          border-radius: 18px;
          padding: 20px;
        }
        h3 {
          margin: 0 0 10px;
          font-size: 1.1rem;
        }
        p {
          margin: 0;
          color: rgba(209, 224, 255, 0.7);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
