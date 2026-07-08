// components/Scene.tsx
'use client';

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ── 1. Hero Object: Particle Sphere ─────────────────────
function HeroSphere() {
  const pointsRef = useRef<THREE.Points>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      // Rotation
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.04;

      // Mouse Parallax
      pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, mouse.x * 0.8, 0.05);
      pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, mouse.y * 0.8, 0.05);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <points ref={pointsRef}>
        <sphereGeometry args={[2, 48, 48]} />
        <pointsMaterial
          color="#2F4CE0"
          size={0.035}
          sizeAttenuation={true}
          transparent={true}
          opacity={0.7}
        />
      </points>
    </group>
  );
}

// ── 2. Projects Cards ───────────────────────────────────
function ProjectCards() {
  // Load local placeholder textures
  const textures = useTexture([
    '/images/safesim.jpg',
    '/images/medisin.jpg',
    '/images/graphql-project.jpg',
  ]);

  const cardsData = [
    { pos: [-2.2, -12, 0], rot: [0, 0.2, 0] },
    { pos: [0, -12, 0.8], rot: [-0.05, 0, 0] },
    { pos: [2.2, -12, 0], rot: [0, -0.2, 0] },
  ];

  return (
    <group>
      {cardsData.map((data, idx) => (
        <Float key={idx} speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
          <mesh position={data.pos as [number, number, number]} rotation={data.rot as [number, number, number]}>
            <boxGeometry args={[2.2, 1.4, 0.06]} />
            <meshBasicMaterial map={textures[idx]} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── 3. Journey curved path ──────────────────────────────
function JourneyTimeline() {
  const curveRef = useRef<THREE.Mesh>(null);

  // Define points for a curved timeline path in 3D
  const points = [
    new THREE.Vector3(-3, -20, 0),
    new THREE.Vector3(-1, -21, 1),
    new THREE.Vector3(2, -22, -1),
    new THREE.Vector3(-1.5, -24, 0),
    new THREE.Vector3(1, -25, 1.5),
    new THREE.Vector3(3, -26, 0),
  ];

  const curve = new THREE.CatmullRomCurve3(points);
  
  return (
    <group>
      {/* Curved timeline tube */}
      <mesh ref={curveRef}>
        <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
        <meshBasicMaterial color="#7B7B7B" transparent opacity={0.4} wireframe />
      </mesh>

      {/* Nodes representing journey milestones */}
      {points.map((pt, idx) => (
        <mesh key={idx} position={pt}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshBasicMaterial color={idx % 2 === 0 ? '#2F4CE0' : '#7B7B7B'} />
        </mesh>
      ))}
    </group>
  );
}

// ── 4. Achievements Arc ──────────────────────────────────
function AchievementsArc() {
  // Load textures from public folder
  const textures = useTexture([
    '/images/ieee-paper.jpg',
    '/images/hacknova.jpg',
    '/images/graphql-hackathon.jpg',
  ]);

  // Place cards in an arc
  const arcRadius = 3.5;
  const cards = textures.map((tex, idx) => {
    const angle = (idx - 1) * 0.45; // Spread around center
    const x = Math.sin(angle) * arcRadius;
    const z = Math.cos(angle) * arcRadius - arcRadius;
    const y = -32;
    return {
      pos: [x, y, z] as [number, number, number],
      rot: [0, -angle, 0] as [number, number, number],
      texture: tex,
    };
  });

  return (
    <group>
      {cards.map((card, idx) => (
        <Float key={idx} speed={2} rotationIntensity={0.2} floatIntensity={0.4}>
          <mesh position={card.pos} rotation={card.rot}>
            <boxGeometry args={[1.8, 1.35, 0.05]} />
            <meshBasicMaterial map={card.texture} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ── Main Scene content ──────────────────────────────────
function SceneContent() {
  const cameraGroupRef = useRef<THREE.Group>(null);

  // Setup GSAP scroll timeline
  useEffect(() => {
    if (!cameraGroupRef.current) return;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: '#main-content',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
      },
    });

    // Move the camera group down along sections
    // Section 1: Hero (y: 0, z: 0)
    // Section 2: About (y: -6)
    timeline.to(cameraGroupRef.current.position, {
      y: -6,
      z: -0.5,
      ease: 'power1.inOut',
    }, 0.15);

    // Section 3: Projects (y: -12)
    timeline.to(cameraGroupRef.current.position, {
      y: -12,
      z: 1,
      ease: 'power1.inOut',
    }, 0.35);

    // Section 4: Journey (y: -22)
    timeline.to(cameraGroupRef.current.position, {
      x: 0.5,
      y: -22,
      z: 2,
      ease: 'power1.inOut',
    }, 0.6);

    // Section 5: Achievements (y: -32)
    timeline.to(cameraGroupRef.current.position, {
      x: 0,
      y: -32,
      z: 1,
      ease: 'power1.inOut',
    }, 0.85);

    return () => {
      // Clean up trigger instance on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <group ref={cameraGroupRef}>
      {/* Lighting parameters inside Canvas */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />

      {/* 3D components placed relative to absolute world coordinates */}
      <HeroSphere />
      <ProjectCards />
      <JourneyTimeline />
      <AchievementsArc />
    </group>
  );
}

// ── Root Dynamic Component ──────────────────────────────
export default function Scene() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ powerPreference: 'high-performance', antialias: true }}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
