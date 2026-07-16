"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { EvidenceObjects } from "@/components/evidence-room-3d/EvidenceObjects";
import { RoomEnvironment } from "@/components/evidence-room-3d/RoomEnvironment";

interface Scene3DProps {
  selectedId: string | null;
  completedIds: Set<string>;
  onSelect: (id: string) => void;
}

export function Scene3D({ selectedId, completedIds, onSelect }: Scene3DProps) {
  return (
    <div className="h-[min(62vh,520px)] w-full overflow-hidden rounded-2xl border border-navy-100 bg-navy-950 shadow-card">
      <Canvas
        shadows
        camera={{ position: [0, 2.2, 4.5], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
      >
        <color attach="background" args={["#091327"]} />
        <fog attach="fog" args={["#091327", 7, 15]} />
        <hemisphereLight args={["#c7ddff", "#071022", 0.75]} />
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.35}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <spotLight position={[-3.8, 4.5, 1.8]} angle={0.55} penumbra={0.7} intensity={1.2} color="#5bb8f5" castShadow />
        <pointLight position={[3.2, 2.8, -1.8]} intensity={0.85} color="#ffcb2d" distance={7} />

        <RoomEnvironment />
        <EvidenceObjects
          selectedId={selectedId}
          completedIds={completedIds}
          onSelect={onSelect}
        />

        <OrbitControls
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          minPolarAngle={0.4}
          maxPolarAngle={1.4}
          target={[0, 0.5, 0]}
        />
      </Canvas>
    </div>
  );
}
