'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ImageUploader from './ImageUploader';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [heroImage, setHeroImage] = useState('');
  const targetRef = useRef<HTMLElement>(null);

  // Parallax Scroll Tracking
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 160]);
  const contentY = useTransform(scrollY, [0, 800], [0, 80]);
  const visualY = useTransform(scrollY, [0, 800], [0, -60]);
  const opacityFade = useTransform(scrollY, [0, 600], [1, 0]);

  // Load from MongoDB on mount, fall back to localStorage
  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.heroImage) {
          setHeroImage(d.data.heroImage);
        } else {
          // Local storage fallback
          const saved = localStorage.getItem('portfolio_hero_image');
          if (saved) setHeroImage(saved);
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('portfolio_hero_image');
        if (saved) setHeroImage(saved);
      });
  }, []);

  const handleUpload = async (url: string) => {
    setHeroImage(url);
    // Persist to local storage
    try { localStorage.setItem('portfolio_hero_image', url); } catch {}
    // Persist to MongoDB
    try {
      await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ heroImage: url }),
      });
    } catch {}
  };

  return (
    <section className="hero" id="hero" aria-label="Hero section" ref={targetRef}>
      {/* Background Animated Gradient + Grain (with parallax slow drift) */}
      <motion.div className="hero-bg" style={{ y: bgY }} />
      <div className="hero-grain" />

      {/* Floating Scroll Indicator */}
      <motion.div className="hero-scroll-indicator" style={{ opacity: opacityFade }} aria-hidden="true">
        <span className="hero-scroll-line"></span>
        <span>Scroll Down</span>
      </motion.div>

      <div className="container" style={{ overflow: 'visible' }}>
        <div className="hero-inner" style={{ overflow: 'visible' }}>
          {/* Left Column: Heading, Stats, Summary (with parallax drift) */}
          <motion.div
            className="hero-content"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ y: contentY, opacity: opacityFade }}
          >
            {/* Top stats mimicking the mock screenshot */}
            <div className="hero-stats" style={{ border: 'none', padding: 0, marginBottom: '2.5rem', gap: '3rem' }}>
              <div>
                <span className="hero-stat-num" style={{ color: 'var(--accent)' }}>*3+</span>
                <span className="hero-stat-label">Apps Shipped</span>
              </div>
              <div>
                <span className="hero-stat-num" style={{ color: 'var(--accent)' }}>*20%</span>
                <span className="hero-stat-label">Faster Delivery</span>
              </div>
            </div>

            <motion.p className="eyebrow hero-eyebrow" variants={itemVariants}>
              Full-Stack Developer
            </motion.p>

            <motion.h1 className="hero-headline" variants={itemVariants}>
              <span className="text-glitch" data-text="HELLO">HELLO</span><em>.</em>
            </motion.h1>

            <motion.p className="hero-sub" variants={itemVariants}>
              — I&apos;m Mohit Netrakar, an MCA student at Ramaiah University of Applied Sciences.
              MERN + Web3 developer, IEEE-published author, and hackathon winner.
            </motion.p>

            <motion.div className="hero-buttons" variants={itemVariants}>
              <a href="#work" className="btn btn-primary" id="hero-view-work-btn">
                View Work
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a href="#contact" className="btn btn-outline" id="hero-lets-talk-btn">
                Let&apos;s Talk
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Profile Portrait (with counter parallax shift) */}
          <motion.div className="hero-visual" style={{ y: visualY }}>
            <div className="hero-photo-wrap">
              <ImageUploader
                currentImage={heroImage}
                onUpload={handleUpload}
                aspectRatio="3/4"
                alt="Mohit Netrakar"
                placeholder={
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '2rem' }}>
                    <svg viewBox="0 0 80 80" fill="none" style={{ width: 64, height: 64, opacity: 0.35, color: 'var(--text-light)' }} aria-hidden="true">
                      <circle cx="40" cy="30" r="16" stroke="currentColor" strokeWidth="2" />
                      <path d="M10 70c0-16.569 13.431-30 30-30s30 13.431 30 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                      Click or drag to upload<br />your profile photo
                    </p>
                  </div>
                }
              />
            </div>

            {/* Centered Open to Work badge */}
            <motion.div
              className="badge-open"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Open to work"
            >
              Open to work
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
