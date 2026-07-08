'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import RevealText from './RevealText';

interface TimelineEntry {
  _id?: string;
  period: string;
  title: string;
  org: string;
  bullets: string[];
  doi?: string;
}

function TimelineItem({ entry, delay }: { entry: TimelineEntry; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="timeline-dot" aria-hidden="true" />
      <div className="timeline-item-header">
        <h4>{entry.title}</h4>
        <span className="timeline-period">{entry.period}</span>
      </div>
      <p className="timeline-org">{entry.org}</p>
      <div className="timeline-desc">
        {entry.bullets.length === 1 ? (
          <p>{entry.bullets[0]}</p>
        ) : (
          <ul>
            {entry.bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        {entry.doi && (
          <p style={{ marginTop: '0.5rem' }}>
            <a
              href={`https://doi.org/${entry.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.8rem', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}
            >
              DOI: {entry.doi} ↗
            </a>
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ── Add Journey Item Modal ──────────────────────────────
function AddJourneyModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (item: TimelineEntry) => void;
}) {
  const [form, setForm] = useState({
    period: '',
    title: '',
    org: '',
    bulletsString: '',
    doi: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.period || !form.title || !form.org) {
      setError('Period, Title, and Organization/Institution are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        bullets: form.bulletsString
          .split('\n')
          .map((b) => b.trim())
          .filter(Boolean),
      };

      const res = await fetch('/api/journey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Failed to add item');
      onAdd(data.data as TimelineEntry);
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label="Add journey entry">
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3>Add Journey Entry</h3>
        <form className="modal-form" onSubmit={handleSubmit} id="add-journey-form">
          <div className="form-group">
            <label htmlFor="j-title">Title / Role *</label>
            <input
              id="j-title"
              type="text"
              placeholder="e.g. MERN Stack Intern, MCA student"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="j-org">Company / University *</label>
            <input
              id="j-org"
              type="text"
              placeholder="e.g. Palindrome Labs"
              value={form.org}
              onChange={(e) => setForm({ ...form, org: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="j-period">Period *</label>
            <input
              id="j-period"
              type="text"
              placeholder="e.g. Jan – May 2025, 2025 – Present"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="j-bullets">Bullet Details (One per line)</label>
            <textarea
              id="j-bullets"
              placeholder="Shipped 3+ apps to production&#10;Reduced bug backlog by 30%&#10;Worked in a team of 5+"
              rows={4}
              value={form.bulletsString}
              onChange={(e) => setForm({ ...form, bulletsString: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="j-doi">DOI Link <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional for papers)</span></label>
            <input
              id="j-doi"
              type="text"
              placeholder="e.g. 10.1109/ICEI64305.2024.10912308"
              value={form.doi}
              onChange={(e) => setForm({ ...form, doi: e.target.value })}
            />
          </div>

          {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} id="modal-journey-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} id="modal-journey-save-btn">
              {loading ? 'Saving…' : 'Save Entry'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Journey Section ────────────────────────────────
export default function Journey() {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch('/api/journey')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setTimeline(d.data);
      })
      .catch(() => {
        // Fallback seed timeline if MongoDB is disconnected
        setTimeline([
          {
            period: 'Jan – May 2025',
            title: 'MERN Stack Intern',
            org: 'Palindrome Labs',
            bullets: [
              'Shipped 3+ full-stack applications to production.',
              'Reduced bug backlog by 30% through proactive code reviews.',
              'Collaborated with a cross-functional team of 5+ engineers.',
              'Delivered features 20% faster by streamlining development workflows.',
            ],
          },
          {
            period: '2025 – Present',
            title: 'Master of Computer Applications (MCA)',
            org: 'Ramaiah University of Applied Sciences, Bangalore',
            bullets: ['Specializing in full-stack development, cloud computing, and emerging technologies.'],
          },
          {
            period: '2024',
            title: 'Winner — HACKNOVA 1.0 · 1st Place',
            org: 'Agile iTech',
            bullets: ['Won 1st place in a competitive 10-hour hackathon. Designed, built, and deployed a working product from scratch within the time limit.'],
          },
          {
            period: '2024',
            title: 'IEEE Publication — ICEI 2024',
            org: 'IIIT Dharwad',
            bullets: [
              '"A Comparative Analysis of U-Net, PSPNet, and FPNet Deep Learning Techniques for Image Segmentation."',
            ],
            doi: '10.1109/ICEI64305.2024.10912308',
          },
          {
            period: '2023 – 2025',
            title: 'Bachelor of Computer Applications (BCA)',
            org: 'KLE Technological University',
            bullets: ['Built a strong foundation in data structures, algorithms, and software engineering.'],
          },
          {
            period: '2025',
            title: 'Participant — GraphQL Hackathon',
            org: 'Unstop',
            bullets: ['Built a full-stack GraphQL application in a competitive setting, exploring schema-first design and Apollo Client.'],
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAddItem = (newItem: TimelineEntry) => {
    setTimeline((prev) => [...prev, newItem]);
  };

  return (
    <section className="section bg-black text-stone-200" id="journey" aria-labelledby="journey-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className="eyebrow" style={{ color: 'var(--accent-light)' }}>Experience & education</p>
          <RevealText text="My dev journey." tag="h2" id="journey-heading" className="about-section-heading" />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading timeline…
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            <div className="timeline" role="list" aria-label="Career and education timeline">
              {timeline.map((entry, i) => (
                <TimelineItem key={entry._id ?? i} entry={entry} delay={i * 0.08} />
              ))}
            </div>

            {/* Add Experience/Internship details trigger button */}
            <motion.button
              onClick={() => setModalOpen(true)}
              className="btn btn-outline"
              style={{ alignSelf: 'flex-start', marginLeft: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              id="add-journey-btn"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0-1A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm.5-9v2.5H11a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V8.5H5a.5.5 0 0 1 0-1h2.5V5a.5.5 0 0 1 1 0z" />
              </svg>
              Add Internship / Experience
            </motion.button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <AddJourneyModal onClose={() => setModalOpen(false)} onAdd={handleAddItem} />
        )}
      </AnimatePresence>
    </section>
  );
}
