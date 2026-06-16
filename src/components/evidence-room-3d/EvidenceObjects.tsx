"use client";

import { useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { evidenceRoom3DItems } from "@/data/evidence-room-3d";
import type { EvidenceRoom3DObjectType } from "@/lib/types";

interface EvidenceObjectsProps {
  selectedId: string | null;
  completedIds: Set<string>;
  onSelect: (id: string) => void;
}

function ObjectMesh({
  type,
  color,
  selected,
  done,
  onClick,
}: {
  type: EvidenceRoom3DObjectType;
  color: string;
  selected: boolean;
  done: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const scale = selected || hovered ? 1.08 : 1;
  const emissive = selected ? "#2563eb" : done ? "#059669" : hovered ? "#60a5fa" : "#000000";
  const emissiveIntensity = selected ? 0.35 : done ? 0.15 : hovered ? 0.2 : 0;

  const mat = (
    <meshStandardMaterial
      color={color}
      emissive={emissive}
      emissiveIntensity={emissiveIntensity}
    />
  );

  return (
    <group
      scale={scale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "auto";
      }}
    >
      {type === "document_box" && (
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.22, 0.28]} />
          {mat}
        </mesh>
      )}
      {type === "laptop" && (
        <group>
          <mesh position={[0, 0.02, 0]} castShadow>
            <boxGeometry args={[0.42, 0.04, 0.28]} />
            {mat}
          </mesh>
          <mesh position={[0, 0.14, -0.1]} rotation={[-0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.38, 0.22, 0.02]} />
            <meshStandardMaterial color="#374151" emissive={emissive} emissiveIntensity={emissiveIntensity} />
          </mesh>
        </group>
      )}
      {type === "phone" && (
        <mesh castShadow rotation={[0, 0.4, 0]}>
          <boxGeometry args={[0.08, 0.14, 0.02]} />
          {mat}
        </mesh>
      )}
      {type === "receipt_stack" && (
        <group>
          {[0, 0.015, 0.03].map((y, i) => (
            <mesh key={i} position={[i * 0.02, y, i * 0.01]} castShadow>
              <boxGeometry args={[0.22, 0.02, 0.16]} />
              <meshStandardMaterial
                color={i === 0 ? color : "#E5E7EB"}
                emissive={emissive}
                emissiveIntensity={emissiveIntensity}
              />
            </mesh>
          ))}
        </group>
      )}
      {type === "case_folder" && (
        <mesh castShadow rotation={[0, -0.2, 0]}>
          <boxGeometry args={[0.3, 0.04, 0.22]} />
          {mat}
        </mesh>
      )}
    </group>
  );
}

export function EvidenceObjects({ selectedId, completedIds, onSelect }: EvidenceObjectsProps) {
  return (
    <group>
      {evidenceRoom3DItems.map((item) => (
        <group key={item.id} position={item.position}>
          <ObjectMesh
            type={item.objectType}
            color={item.color}
            selected={selectedId === item.id}
            done={completedIds.has(item.id)}
            onClick={() => onSelect(item.id)}
          />
        </group>
      ))}
    </group>
  );
}