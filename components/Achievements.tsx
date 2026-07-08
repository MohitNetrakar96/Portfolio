'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import ImageUploader from './ImageUploader';
import RevealText from './RevealText';
import BentoTilt from './BentoTilt';

interface Achievement {
  _id?: string;
  title: string;
  description: string;
  meta: string;
  image: string;
}

// ── Individual achievement card ──────────────────────────
function AchievementCard({
  a,
  delay,
  onImageUpload,
  onEdit,
  onDelete,
  isAdmin,
}: {
  a: Achievement;
  delay: number;
  onImageUpload: (id: string, url: string) => void;
  onEdit: (a: Achievement) => void;
  onDelete: (a: Achievement) => void;
  isAdmin: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <BentoTilt className="achievement-card">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%' }}
      >
        <div className="achievement-img-wrap">
          <ImageUploader
            currentImage={a.image}
            onUpload={(url) => onImageUpload(a._id ?? a.title, url)}
            onRemove={() => onImageUpload(a._id ?? a.title, "")}
            disabled={!isAdmin}
            aspectRatio="4/3"
            alt={a.title}
            placeholder={
              <span style={{ fontSize: '3rem' }}>
                {a.title.includes('IEEE') ? '📄' : a.title.includes('HACKNOVA') ? '🏆' : '🚀'}
              </span>
            }
          />
        </div>
        <div className="achievement-body">
          <h4>{a.title}</h4>
          <p className="achievement-desc">{a.description}</p>
          <span className="achievement-meta">{a.meta}</span>

          {isAdmin && (
            <div className="achievement-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(a);
                }}
                className="btn btn-outline"
                style={{
                  padding: '0.35rem 0.7rem',
                  fontSize: '0.72rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  cursor: 'pointer',
                  borderColor: 'rgba(255,255,255,0.15)',
                  background: 'transparent',
                  color: 'var(--text-light)',
                  height: 'auto',
                  minWidth: 'auto',
                }}
              >
                ✏️ Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(a);
                }}
                className="btn"
                style={{
                  padding: '0.35rem 0.7rem',
                  fontSize: '0.72rem',
                  borderRadius: 'var(--radius-sm)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  cursor: 'pointer',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)',
                  color: '#f87171',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  height: 'auto',
                  minWidth: 'auto',
                }}
              >
                🗑️ Delete
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </BentoTilt>
  );
}

// ── Achievement Modal ────────────────────────────────────
function AchievementModal({
  onClose,
  onSave,
  achievementToEdit,
  isAdmin,
}: {
  onClose: () => void;
  onSave: (a: Achievement) => void;
  achievementToEdit?: Achievement;
  isAdmin: boolean;
}) {
  const [form, setForm] = useState({
    title: achievementToEdit?.title ?? '',
    description: achievementToEdit?.description ?? '',
    meta: achievementToEdit?.meta ?? '',
    image: achievementToEdit?.image ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = useCallback((url: string) => {
    setForm((f) => ({ ...f, image: url }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.title || !form.description || !form.meta) {
      setError('Title, description, and meta are required.');
      return;
    }
    setLoading(true);
    try {
      const password = localStorage.getItem('admin_password') || '';
      if (achievementToEdit?._id) {
        // Edit mode (database path)
        const res = await fetch(`/api/achievements/${achievementToEdit._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error ?? 'Failed to update');
        onSave(data.data as Achievement);
      } else if (achievementToEdit) {
        // Edit mode (fallback local path)
        onSave({ ...achievementToEdit, ...form });
      } else {
        // Create mode (database path)
        const res = await fetch('/api/achievements', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error ?? 'Failed to add');
        onSave(data.data as Achievement);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label={achievementToEdit ? "Edit achievement" : "Add achievement"}>
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3>{achievementToEdit ? 'Edit Achievement' : 'Add Achievement'}</h3>
        <form className="modal-form" onSubmit={handleSubmit} id="achievement-form">

          {/* Image upload area */}
          <div className="form-group">
            <label>Achievement Image <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional)</span></label>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
              <ImageUploader
                currentImage={form.image}
                onUpload={handleImageUpload}
                onRemove={() => handleImageUpload("")}
                disabled={!isAdmin}
                aspectRatio="16/9"
                alt="Achievement image"
                placeholder={
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width: 36, height: 36, opacity: 0.4 }} aria-hidden="true">
                      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 32l10-8 8 6 8-10 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                      Click or drag photo here<br />Certificate · Event photo · Screenshot
                    </p>
                  </div>
                }
              />
            </div>
            {form.image && (
              <p style={{ fontSize: '0.72rem', color: 'var(--accent)', marginTop: '0.3rem', wordBreak: 'break-all' }}>
                ✓ {form.image}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="ach-title">Title *</label>
            <input
              id="ach-title"
              type="text"
              placeholder="e.g. Winner — HackFest 2025"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ach-desc">Description *</label>
            <textarea
              id="ach-desc"
              placeholder="Brief description of the achievement..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="ach-meta">Organizer &amp; Year *</label>
            <input
              id="ach-meta"
              type="text"
              placeholder="e.g. MLH · 2025"
              value={form.meta}
              onChange={(e) => setForm({ ...form, meta: e.target.value })}
              required
            />
          </div>

          {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} id="modal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} id="modal-save-btn">
              {loading ? 'Saving…' : 'Save Achievement'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Achievements section ────────────────────────────
export default function Achievements() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAchievement, setEditingAchievement] = useState<Achievement | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch('/api/achievements')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setAchievements(d.data);
      })
      .catch(() => {
        // Fallback if MongoDB is not connected
        setAchievements([
          {
            title: 'IEEE Published Paper',
            description:
              'A peer-reviewed comparative study evaluating U-Net, PSPNet, and FPNet architectures for image segmentation, presented at the IEEE International Conference on Emerging Innovations (ICEI 2024), IIIT Dharwad.',
            meta: 'IIIT Dharwad · ICEI 2024',
            image: '',
          },
          {
            title: 'HACKNOVA 1.0 — 1st Place Winner',
            description:
              'Awarded first place at HACKNOVA 1.0, a ten-hour hackathon hosted by Agile iTech, in recognition of technical execution and originality of solution.',
            meta: 'Agile iTech · 2024',
            image: '',
          },
          {
            title: 'GraphQL Hackathon — Participant',
            description:
              'Participated in a GraphQL-focused hackathon hosted by Unstop, developing a full-stack application built on GraphQL, Node.js, and React.',
            meta: 'Unstop · 2025',
            image: '',
          },
        ]);
      })
      .finally(() => setLoading(false));

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

  const handleAdd = (newAch: Achievement) => {
    setAchievements((prev) => [...prev, newAch]);
  };

  const handleUpdate = (updatedAch: Achievement) => {
    setAchievements((prev) =>
      prev.map((a) =>
        (updatedAch._id && a._id === updatedAch._id) || (!updatedAch._id && a.title === updatedAch.title)
          ? updatedAch
          : a
      )
    );
  };

  const handleDelete = async (ach: Achievement) => {
    if (!confirm(`Are you sure you want to delete "${ach.title}"?`)) return;

    if (ach._id) {
      try {
        const password = localStorage.getItem('admin_password') || '';
        const res = await fetch(`/api/achievements/${ach._id}`, {
          method: 'DELETE',
          headers: { 'x-admin-password': password },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to delete');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete achievement');
        return;
      }
    }

    setAchievements((prev) =>
      prev.filter((a) => (ach._id ? a._id !== ach._id : a.title !== ach.title))
    );
  };

  // Update image on an existing card (PATCH to MongoDB if we have _id, else update local state)
  const handleImageUpload = async (idOrTitle: string, url: string) => {
    setAchievements((prev) =>
      prev.map((a) =>
        (a._id ?? a.title) === idOrTitle ? { ...a, image: url } : a
      )
    );
    // If MongoDB _id exists, persist via PATCH
    const target = achievements.find((a) => (a._id ?? a.title) === idOrTitle);
    if (target?._id) {
      try {
        const password = localStorage.getItem('admin_password') || '';
        await fetch(`/api/achievements/${target._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ image: url }),
        });
      } catch { /* silent — image already updated in UI */ }
    }
  };

  return (
    <section className="section bg-black text-stone-200" id="achievements" aria-labelledby="achievements-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className="eyebrow" style={{ color: 'var(--accent-light)' }}>Recognition</p>
          <RevealText text="Achievements." tag="h2" id="achievements-heading" className="about-section-heading" />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading achievements…
          </div>
        ) : (
          <div className="achievements-grid">
            {achievements.map((a, i) => (
              <AchievementCard
                key={a._id ?? i}
                a={a}
                delay={i * 0.1}
                onImageUpload={handleImageUpload}
                onEdit={setEditingAchievement}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}

            {/* Add achievement card */}
            {isAdmin && (
              <motion.button
                className="add-achievement-card"
                style={{ background: '#18181b', border: '1.5px dashed rgba(255,255,255,0.15)' }}
                onClick={() => setModalOpen(true)}
                id="add-achievement-btn"
                aria-label="Add new achievement"
                initial={{ opacity: 0, y: 36 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: achievements.length * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <svg viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 12v16M12 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Add Achievement</span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 400 }}>
                  With photo upload
                </p>
              </motion.button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <AchievementModal onClose={() => setModalOpen(false)} onSave={handleAdd} isAdmin={isAdmin} />
        )}
        {editingAchievement && (
          <AchievementModal
            achievementToEdit={editingAchievement}
            onClose={() => setEditingAchievement(null)}
            onSave={handleUpdate}
            isAdmin={isAdmin}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
