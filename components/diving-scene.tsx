"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, Float, Text, MeshDistortMaterial, Sphere } from "@react-three/drei"
import { useRef, Suspense } from "react"
import * as THREE from "three"

function Bubbles() {
  const bubblesRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (bubblesRef.current) {
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y += 0.01 + i * 0.002
        bubble.position.x += Math.sin(state.clock.elapsedTime + i) * 0.002
        if (bubble.position.y > 4) {
          bubble.position.y = -3
        }
      })
    }
  })

  return (
    <group ref={bubblesRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 6,
            (Math.random() - 0.5) * 6 - 2,
            (Math.random() - 0.5) * 4,
          ]}
        >
          <sphereGeometry args={[0.03 + Math.random() * 0.06, 16, 16]} />
          <meshStandardMaterial
            color="#ffffff"
            transparent
            opacity={0.4 + Math.random() * 0.3}
            roughness={0}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          color="#0891b2"
          attach="material"
          distort={0.4}
          speed={1.5}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function BrandText() {
  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <Text
        font="/fonts/Geist_Bold.json"
        fontSize={0.4}
        position={[0, -2.2, 0]}
        color="#1e3a5f"
        anchorX="center"
        anchorY="middle"
      >
        TAUCHEN VERBINDET
      </Text>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} color="#06b6d4" intensity={0.5} />
      <pointLight position={[10, 10, 10]} color="#f59e0b" intensity={0.3} />
      
      <FloatingOrb />
      <Bubbles />
      <BrandText />
      
      <Environment preset="sunset" />
    </>
  )
}

export function DivingScene() {
  return (
    <div className="w-full h-[500px] md:h-[600px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
