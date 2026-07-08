// components/Skills.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import RevealText from './RevealText';
import BentoTilt from './BentoTilt';

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-60px' });

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <section className="section bg-black text-stone-200" id="skills" aria-labelledby="skills-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="section-header" ref={containerRef}>
          <p className="eyebrow" style={{ color: 'var(--accent-light)' }}>My Toolbox</p>
          <RevealText text="Technologies I work with." tag="h2" id="skills-heading" className="about-section-heading" />
        </div>

        <div className="skills-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '3rem' }}>
          {skillCategories.map((cat, i) => (
            <BentoTilt key={cat.category} className="skills-card-wrap">
              <motion.div
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                style={{
                  background: '#18181b',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 'var(--radius-md)',
                  padding: '2rem',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-light)', letterSpacing: '0.02em', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.75rem', fontFamily: 'var(--font-display)' }}>
                  {cat.category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                  {cat.items.map((skill) => (
                    <span
                      key={skill.name}
                      className="skill-tag"
                      style={{
                        padding: '0.4rem 0.8rem',
                        fontSize: '0.8rem',
                        color: '#d4d4d8',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1.5px solid rgba(255,255,255,0.06)',
                        borderRadius: 'var(--radius-sm)',
                        transition: 'all 0.3s ease',
                        cursor: 'default',
                        display: 'inline-block'
                      }}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </BentoTilt>
          ))}
        </div>
      </div>
    </section>
  );
}
