export function RoomEnvironment() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color="#d6e1f4" />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 2.5, -4]} receiveShadow>
        <boxGeometry args={[12, 5, 0.2]} />
        <meshStandardMaterial color="#eef3fb" />
      </mesh>

      {/* Left wall */}
      <mesh position={[-6, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#e8eff9" />
      </mesh>

      {/* Right wall */}
      <mesh position={[6, 2.5, 0]} receiveShadow>
        <boxGeometry args={[0.2, 5, 12]} />
        <meshStandardMaterial color="#e8eff9" />
      </mesh>

      {/* Center table */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[4.2, 0.12, 1.8]} />
        <meshStandardMaterial color="#8B7355" />
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
          <meshStandardMaterial color="#6B5344" />
        </mesh>
      ))}
    </group>
  );
}