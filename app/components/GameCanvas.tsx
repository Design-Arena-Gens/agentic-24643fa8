"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, PerspectiveCamera, Line } from "@react-three/drei";
import { useEffect, useMemo } from "react";
import { useGameStore } from "@/app/lib/gameStore";
import { MAP_HALF_EXTENT, MAP_SIZE_METERS } from "@/app/lib/constants";

function GameLoop() {
  const tick = useGameStore((state) => state.tick);
  useFrame((_, delta) => {
    tick(delta);
  });
  return null;
}

function SafeZone() {
  const safeZone = useGameStore((state) => state.safeZone);
  const segments = 64;
  const points = useMemo(() => {
    const coords = [] as [number, number, number][];
    for (let i = 0; i <= segments; i += 1) {
      const theta = (i / segments) * Math.PI * 2;
      coords.push([
        safeZone.center.x + Math.cos(theta) * safeZone.radius,
        0.2,
        safeZone.center.z + Math.sin(theta) * safeZone.radius
      ]);
    }
    return coords;
  }, [safeZone.center.x, safeZone.center.z, safeZone.radius]);
  return <Line points={points} color="#4cd2ff" lineWidth={0.8} dashed dashSize={8} gapSize={4} />;
}

function Players() {
  const players = useGameStore((state) => state.players);
  return (
    <group>
      {players.map((player) => (
        <group key={player.id} position={[player.position.x, player.position.y + 1.2, player.position.z]}>
          <mesh scale={[1, 1.8, 1]}>
            <capsuleGeometry args={[0.6, 0.9, 6, 12]} />
            <meshStandardMaterial
              color={player.isBot ? "#5470ff" : "#ff9d42"}
              emissive={player.isBot ? "#112bff" : "#ff6b00"}
              emissiveIntensity={player.isAlive ? 0.2 : 0}
              opacity={player.isAlive ? 1 : 0.25}
              transparent
            />
          </mesh>
          <Html
            position={[0, 1.4, 0]}
            center
            style={{
              background: "rgba(8, 12, 22, 0.75)",
              padding: "4px 8px",
              borderRadius: "999px",
              fontSize: "12px",
              border: "1px solid rgba(97,137,240,0.4)",
              color: "#dce8ff"
            }}
          >
            {player.name} · {Math.max(0, Math.round(player.health))} HP
          </Html>
        </group>
      ))}
    </group>
  );
}

function Structures() {
  const structures = useMemo(() => {
    const seed = 28;
    const generated = [] as Array<{
      position: [number, number, number];
      scale: [number, number, number];
      color: string;
    }>;
    const rng = (function* () {
      let value = seed;
      while (true) {
        value = (value * 1664525 + 1013904223) % 4294967296;
        yield value / 4294967296;
      }
    })();
    const random = () => rng.next().value as number;
    for (let i = 0; i < 48; i += 1) {
      const px = random() * MAP_SIZE_METERS - MAP_HALF_EXTENT;
      const pz = random() * MAP_SIZE_METERS - MAP_HALF_EXTENT;
      const height = 6 + random() * 16;
      const scale: [number, number, number] = [8 + random() * 22, height, 8 + random() * 22];
      generated.push({
        position: [px, height / 2, pz],
        scale,
        color: random() > 0.5 ? "#182036" : "#22304a"
      });
    }
    return generated;
  }, []);
  return (
    <group>
      {structures.map((structure, index) => (
        <mesh key={`structure-${index}`} position={structure.position} scale={structure.scale} castShadow receiveShadow>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={structure.color} roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function Terrain() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[MAP_SIZE_METERS, MAP_SIZE_METERS, 64, 64]} />
      <meshStandardMaterial color="#0b1d33" />
    </mesh>
  );
}

function ThirdPersonCamera() {
  const player = useGameStore((state) => state.players.find((p) => !p.isBot));
  const { camera } = useThree();
  useFrame(() => {
    if (!player) return;
    const target = player.position;
    const desired = [target.x - 12, target.y + 8, target.z + 16] as const;
    camera.position.lerp({ x: desired[0], y: desired[1], z: desired[2] }, 0.1);
    camera.lookAt(target.x, target.y + 1.2, target.z);
  });
  return null;
}

export function GameCanvas() {
  const initializeMatch = useGameStore((state) => state.initializeMatch);

  useEffect(() => {
    initializeMatch();
  }, [initializeMatch]);

  return (
    <Canvas shadows dpr={[1, 1.5]} camera={{ position: [0, 30, 60], fov: 55 }}>
      <color attach="background" args={["#05070f"]} />
      <fog attach="fog" args={["#05070f", 80, 420]} />
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[50, 120, 40]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight args={["#4a76ff", "#050d1a", 0.55]} />
      <PerspectiveCamera makeDefault position={[0, 38, 65]} fov={55} />
      <ThirdPersonCamera />
      <Terrain />
      <Structures />
      <SafeZone />
      <Players />
      <GameLoop />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
}
