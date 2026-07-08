'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { number: '3+', label: 'Apps shipped in production' },
  { number: '20%', label: 'Faster feature delivery at Palindrome Labs' },
  { number: 'IEEE', label: 'Published author · ICEI 2024' },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="stats" aria-label="Key stats">
      <div className="container">
        <div className="stats-grid" ref={ref}>
          {stats.map((s, i) => (
            <motion.div
              key={s.number}
              className="stat-item"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
