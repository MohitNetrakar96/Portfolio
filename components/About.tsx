'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ImageUploader from './ImageUploader';
import RevealText from './RevealText';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [aboutImage, setAboutImage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Load from MongoDB and verify admin status
  useEffect(() => {
    fetch('/api/profile')
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.data?.aboutImage) {
          setAboutImage(d.data.aboutImage);
        } else {
          // Local storage fallback
          const saved = localStorage.getItem('portfolio_about_image');
          if (saved) setAboutImage(saved);
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('portfolio_about_image');
        if (saved) setAboutImage(saved);
      });

    const password = localStorage.getItem('admin_password');
    if (password) {
      fetch('/api/auth/verify', {
        headers: { 'x-admin-password': password }
      })
      .then(r => r.json())
      .then(d => {
        if (d.success) setIsAdmin(true);
      });
    }
  }, []);

  const handleUpload = async (url: string) => {
    setAboutImage(url);
    // Persist to local storage
    try { localStorage.setItem('portfolio_about_image', url); } catch {}
    // Persist to MongoDB if admin
    const password = localStorage.getItem('admin_password');
    if (password) {
      try {
        await fetch('/api/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ aboutImage: url }),
        });
      } catch {}
    }
  };

  return (
    <section className="section bg-black text-stone-200" id="about" aria-labelledby="about-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="section-header" ref={ref}>
          <p className="eyebrow" style={{ color: 'var(--accent-light)' }}>About me</p>
          <RevealText text="Precision in engineering. Intention in design." tag="h2" id="about-heading" className="about-section-heading" />
        </div>
 
        <div className="about-inner">
          {/* Bio text block */}
          <div className="about-text">
            {[
              `I am a full-stack developer currently pursuing my Master of Computer Applications at Ramaiah University of Applied Sciences, with a focus on building robust MERN-stack applications and decentralized Web3 solutions — from thoughtfully designed interfaces to production-grade backend systems.`,
              `During my internship at Palindrome Labs, I contributed to the delivery of three production applications as a MERN Stack Developer, reducing the outstanding bug backlog by 30 percent while collaborating within a cross-functional team of five engineers. Among the projects I am most proud of are SafeSim 2026, a decentralized cryptocurrency transfer application, and Medisin 2025, a healthcare appointment platform currently serving over 100 patients.`,
              `My academic contributions include a peer-reviewed research paper presented at ICEI 2024, IIIT Dharwad, and a first-place finish at the HACKNOVA 1.0 hackathon. I continue to deepen my expertise in modern API architectures, most recently through a GraphQL-focused hackathon hosted on Unstop.`,
            ].map((text, i) => (
              <motion.p
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{ color: '#a1a1aa' }} // zinc-400 for secondary text readability on dark bg
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Callout card and avatar side-by-side matching screenshot */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div
              className="about-callout"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ background: '#18181b', border: '1px solid rgba(255,255,255,0.08)' }} // Dark card border
            >
              <div className="about-callout-number" style={{ color: 'var(--accent-light)' }}>30%</div>
              <p style={{ color: '#d4d4d8' }}>
                Reduction in bug backlog during my MERN Stack Internship at Palindrome Labs — shipping features 20% faster through streamlined workflows.
              </p>
            </motion.div>

            {/* Avatar upload placeholder mimicking the small screenshot portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                padding: '1rem',
                background: '#18181b', // dark background for avatar info container
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 'var(--radius-md)',
              }}
            >
              <div style={{ width: 80, height: 80, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '1px solid rgba(255,255,255,0.15)', position: 'relative' }}>
                <ImageUploader
                  currentImage={aboutImage}
                  onUpload={handleUpload}
                  onRemove={() => handleUpload("")}
                  disabled={!isAdmin}
                  aspectRatio="1/1"
                  className="img-uploader--avatar"
                  alt="Mohit profile"
                  placeholder={
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', background: '#27272a' }}>
                      <span style={{ fontSize: '1.5rem' }}>👤</span>
                    </div>
                  }
                />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.2rem', color: '#ffffff' }}>Mohit Netrakar</h4>
                <p style={{ fontSize: '0.78rem', color: '#a1a1aa', lineHeight: 1.3 }}>MERN + Web3 Lead Developer & Research Author</p>
              </div>
            </motion.div>
        </div>
      </div>
    </div>
  </section>
  );
}
