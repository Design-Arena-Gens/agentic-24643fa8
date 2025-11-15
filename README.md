# Stormfall Royale Prototype

Immersive browser-based battle royale simulation inspired by mobile shooters such as Free Fire. Built with Next.js and React Three Fiber to showcase core systems—airdrop deployment, shrinking safe zone, autonomous combatants, and responsive touch/keyboard controls—ready for Vercel deployment.

## Features
- **50-player arena** mixing human-controlled hero with AI squads that navigate, pursue, and engage dynamically.
- **Third-person perspective** with follow camera, minimap awareness, and rich HUD telemetry for health, inventory, and safe zone.
- **Procedural loot crates** and weapon data including ARs, SMGs, snipers, shotguns, grenades, and melee options with attachment loadouts.
- **Dynamic storm** that shrinks on cadence, applying damage outside the safe circle and forcing rotations.
- **Touch-friendly controls** featuring virtual joystick, action pad, and desktop keyboard/mouse bindings.
- **Optimized visuals** using low-poly terrain, baked lighting, and atmosphere tuned for smooth playback on low-spec hardware.

## Getting Started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Production Build

```bash
npm run build
npm start
```

## Tech Stack
- Next.js 14 (App Router)
- React 18 + TypeScript
- React Three Fiber + Drei utilities
- Zustand state management

## Deployment
Deploy seamlessly to Vercel (token-based auth assumed):

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name agentic-24643fa8
```

## Controls
- **Desktop**: WASD to move, Shift sprint, Ctrl crouch, Z prone, Space jump, F interact, Left-click fire.
- **Touch**: Virtual joystick for movement, action pad for jump/crouch/prone/fire/loot.

## License
MIT
