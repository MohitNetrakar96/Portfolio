'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Nav from '@/components/Nav';
// Zentry-style cinematic hero — replaces old Hero.tsx
import ZentryHero from '@/components/ZentryHero';
// Zentry story & bento-features sections
import Story from '@/components/Story';
import Features from '@/components/Features';
// Data-driven sections (MongoDB-backed)
import Stats from '@/components/Stats';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Journey from '@/components/Journey';
import Achievements from '@/components/Achievements';
import Skills from '@/components/Skills';
import CTABanner from '@/components/CTABanner';
import Footer from '@/components/Footer';

// Load 3D scene dynamically on the client side only (disabled SSR)
const Scene = dynamic(() => import('@/components/Scene'), { ssr: false });

export default function HomePage() {
  const [use3D, setUse3D] = useState(false);

  useEffect(() => {
    // Check if device supports 3D rendering and user preferences
    const isSmall = window.innerWidth < 800;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Check if the device has low-core counts
    const lowPower = navigator.hardwareConcurrency ? navigator.hardwareConcurrency <= 4 : false;

    setUse3D(!(isSmall || reduced || lowPower));
  }, []);

  return (
    <>
      {use3D && <Scene />}
      <Nav />
      <main id="main-content" className={use3D ? 'immersive-3d' : ''}>
        {/* ── Zentry-style cinematic sections ── */}
        <ZentryHero />
        <Story />
        <Features />

        {/* ── Data-driven portfolio portfolio sections (MongoDB-backed) ── */}
        <Stats />
        <About />
        <Projects />
        <Journey />
        <Achievements />
        <Skills />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
