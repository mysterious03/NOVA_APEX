"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function CoreEngine() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
    if (glowRef.current) {
      glowRef.current.intensity = 2 + Math.sin(state.clock.elapsedTime * 5) * 0.5; // Pulsing effect
    }
  });

  return (
    <group>
      {/* Outer Casing */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[2, 1.5, 4, 32, 1, true]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.2}
          wireframe={true}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Inner Heating Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <cylinderGeometry args={[0.5, 0.5, 3, 16]} />
          <meshStandardMaterial
            color="#FF4D00"
            emissive="#FF4D00"
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>
      </Float>

      {/* Dynamic Glow */}
      <pointLight ref={glowRef} color="#00D2FF" distance={20} intensity={2} />
      <pointLight color="#FF4D00" distance={10} intensity={1} position={[0, -2, 0]} />

      {/* Exhaust Particles (Ion Wind) */}
      <Sparkles
        count={200}
        scale={3}
        size={4}
        speed={0.4}
        opacity={0.5}
        color="#00D2FF"
        position={[0, -3, 0]}
      />
    </group>
  );
}

export default function ThrusterCore() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-transparent flex items-center justify-center opacity-70">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.1} />
        <CoreEngine />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
    </div>
  );
}
