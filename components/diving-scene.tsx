"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, Suspense } from "react"
import * as THREE from "three"

function FloatingTorus() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2
    }
  })

  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1.2, 0.4, 32, 100]} />
      <meshStandardMaterial
        color="#0891b2"
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  )
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7 + 1) * 0.3
      meshRef.current.position.x = Math.cos(state.clock.elapsedTime * 0.4) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[2, 0.5, -1]}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color="#f59e0b"
        roughness={0.3}
        metalness={0.6}
      />
    </mesh>
  )
}

function SmallSphere() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6 + 2) * 0.25
    }
  })

  return (
    <mesh ref={meshRef} position={[-1.8, -0.3, -0.5]}>
      <sphereGeometry args={[0.3, 32, 32]} />
      <meshStandardMaterial
        color="#06b6d4"
        roughness={0.4}
        metalness={0.5}
      />
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, 2]} color="#0891b2" intensity={0.5} />
      <pointLight position={[5, -2, 3]} color="#f59e0b" intensity={0.4} />
      
      <FloatingTorus />
      <FloatingSphere />
      <SmallSphere />
    </>
  )
}

export function DivingScene() {
  return (
    <div className="w-full h-[350px] md:h-[450px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
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
