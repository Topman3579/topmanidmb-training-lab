export function RoomEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#17243a" roughness={0.78} metalness={0.08} />
      </mesh>
      <gridHelper args={[12, 24, "#3c5a7c", "#22344f"]} position={[0, 0.006, 0]} />

      {/* Back wall */}
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#15233a" roughness={0.72} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#101d31" roughness={0.76} />
      </mesh>

      {/* Right wall */}
      <mesh position={[6, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#101d31" roughness={0.76} />
      </mesh>

      {/* Ceiling and illuminated command panels */}
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#0a1426" roughness={0.9} />
      </mesh>
      {[-2.8, 0, 2.8].map((x) => (
        <group key={x} position={[x, 2.75, -3.84]}>
          <mesh>
            <boxGeometry args={[2.3, 1.35, 0.08]} />
            <meshStandardMaterial color="#0b1626" metalness={0.32} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0, 0.05]}>
            <boxGeometry args={[2.05, 1.08, 0.03]} />
            <meshStandardMaterial color="#122f50" emissive="#1e6b9e" emissiveIntensity={0.4} roughness={0.28} />
          </mesh>
          {[0.25, 0, -0.25].map((y, i) => (
            <mesh key={y} position={[-0.45 + i * 0.22, y, 0.08]}>
              <boxGeometry args={[0.9 + i * 0.28, 0.035, 0.02]} />
              <meshStandardMaterial color={i === 0 ? "#ffcb2d" : "#5bb8f5"} emissive={i === 0 ? "#ffcb2d" : "#5bb8f5"} emissiveIntensity={1.1} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Side evidence cabinets */}
      {[-4.8, 4.8].map((x) => (
        <group key={x} position={[x, 1.25, -2.9]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.25, 2.5, 0.75]} />
            <meshStandardMaterial color="#263750" metalness={0.45} roughness={0.5} />
          </mesh>
          {[-0.72, 0, 0.72].map((y) => (
            <mesh key={y} position={[0, y, 0.39]}>
              <boxGeometry args={[0.95, 0.035, 0.025]} />
              <meshStandardMaterial color="#7d9ab8" metalness={0.55} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Center table */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 1.8]} />
        <meshStandardMaterial color="#5f4734" roughness={0.48} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.47, 0]} castShadow>
        <boxGeometry args={[4.25, 0.035, 1.85]} />
        <meshStandardMaterial color="#b8902f" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Table legs */}
      {(
        [
          [-1.8, 0.2, 0.7],
          [1.8, 0.2, 0.7],
          [-1.8, 0.2, -0.7],
          [1.8, 0.2, -0.7],
        ] as [number, number, number][]
      ).map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.12, 0.4, 0.12]} />
          <meshStandardMaterial color="#1e2b3e" metalness={0.72} roughness={0.34} />
        </mesh>
      ))}

      {/* Safety line around the evidence table */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.012, 0]}>
        <ringGeometry args={[2.75, 2.82, 4]} />
        <meshStandardMaterial color="#ffcb2d" emissive="#ffcb2d" emissiveIntensity={0.38} />
      </mesh>
    </group>
  );
}
