'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ImageUploader from './ImageUploader';
import RevealText from './RevealText';
import BentoTilt from './BentoTilt';

interface Project {
  _id?: string;
  title: string;
  year: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  vercelUrl?: string;
  image: string;
  placeholder: string;
}

// ── Parallax Scroll wrapper ─────────────────────────────
function ParallaxWrapper({ children, active = true }: { children: React.ReactNode; active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [25, -25]);

  if (!active) return <>{children}</>;

  return (
    <motion.div ref={ref} style={{ y }}>
      {children}
    </motion.div>
  );
}

// ── Project Card ────────────────────────────────────────
function ProjectCard({
  project,
  delay,
  onImageUpload,
  onEdit,
  onDelete,
  isAdmin,
}: {
  project: Project;
  delay: number;
  onImageUpload: (id: string, url: string) => void;
  onEdit: (p: Project) => void;
  onDelete: (p: Project) => void;
  isAdmin: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [touchActive, setTouchActive] = useState(false);

  return (
    <ProjectWrapperWithConditionalParallax active={inView}>
      <BentoTilt className={`project-card${touchActive ? ' touch-active' : ''}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 36 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
          onTouchStart={() => setTouchActive(true)}
          onTouchEnd={() => setTimeout(() => setTouchActive(false), 800)}
          style={{ width: '100%', height: '100%' }}
        >
          <div className="project-image-wrap">
            <ImageUploader
              currentImage={project.image}
              onUpload={(url) => onImageUpload(project._id ?? project.title, url)}
              onRemove={() => onImageUpload(project._id ?? project.title, "")}
              disabled={!isAdmin}
              aspectRatio="16/10"
              alt={project.title}
              placeholder={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '2.5rem' }}>{project.placeholder}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    Click to upload screenshot
                  </span>
                </div>
              }
            />

            {/* Hover overlay with tags */}
            <div className="project-overlay" aria-hidden="true">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="project-body">
            <span className="project-year">{project.year}</span>
            <h3>{project.title}</h3>
            <p className="project-desc">{project.description}</p>
            <div className="project-links">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}-github-link`}
                >
                  GitHub
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </a>
              )}
              {project.vercelUrl && (
                <a
                  href={project.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--accent-light)' }}
                  id={`project-${project.title.toLowerCase().replace(/\s+/g, '-')}-vercel-link`}
                >
                  Live Demo
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </a>
              )}
            </div>

            {isAdmin && (
              <div className="project-actions" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(project);
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
                    onDelete(project);
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
    </ProjectWrapperWithConditionalParallax>
  );
}

// Wrapper utility for conditional parallax activation after load
function ProjectWrapperWithConditionalParallax({ children, active }: { children: React.ReactNode; active: boolean }) {
  const [useParallax, setUseParallax] = useState(false);

  useEffect(() => {
    // Disable parallax on low-perf devices or if prefers-reduced-motion is active
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (active && !media.matches && window.innerWidth > 900) {
      const timer = setTimeout(() => setUseParallax(true), 600);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return <ParallaxWrapper active={useParallax}>{children}</ParallaxWrapper>;
}

// ── Project Modal ───────────────────────────────────────
function ProjectModal({
  onClose,
  onSave,
  projectToEdit,
  isAdmin,
}: {
  onClose: () => void;
  onSave: (p: Project) => void;
  projectToEdit?: Project;
  isAdmin: boolean;
}) {
  const [form, setForm] = useState({
    title: projectToEdit?.title ?? '',
    year: projectToEdit?.year ?? new Date().getFullYear().toString(),
    description: projectToEdit?.description ?? '',
    tagsString: projectToEdit?.tags.join(', ') ?? '',
    githubUrl: projectToEdit?.githubUrl ?? '',
    vercelUrl: projectToEdit?.vercelUrl ?? '',
    image: projectToEdit?.image ?? '',
    placeholder: projectToEdit?.placeholder ?? '🔗',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = useCallback((url: string) => {
    setForm((f) => ({ ...f, image: url }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.title || !form.year || !form.description) {
      setError('Title, year, and description are required.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        tags: form.tagsString
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      const password = localStorage.getItem('admin_password') || '';
      if (projectToEdit?._id) {
        // Edit mode (database path)
        const res = await fetch(`/api/projects/${projectToEdit._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to update project');
        onSave(data.data as Project);
      } else if (projectToEdit) {
        // Edit mode (fallback local path)
        onSave({ ...projectToEdit, ...payload });
      } else {
        // Create mode (database path)
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to add project');
        onSave(data.data as Project);
      }
      onClose();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop open" role="dialog" aria-modal="true" aria-label={projectToEdit ? "Edit project" : "Add project"}>
      <motion.div
        className="modal"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3>{projectToEdit ? 'Edit Project' : 'Add Project'}</h3>
        <form className="modal-form" onSubmit={handleSubmit} id="project-form">
          {/* Image upload area */}
          <div className="form-group">
            <label>Project Screenshot <span style={{ color: 'var(--text-light)', fontWeight: 400 }}>(optional)</span></label>
            <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1.5px solid var(--border)' }}>
              <ImageUploader
                currentImage={form.image}
                onUpload={handleImageUpload}
                onRemove={() => handleImageUpload("")}
                disabled={!isAdmin}
                aspectRatio="16/10"
                alt="Project screenshot"
                placeholder={
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                    <svg viewBox="0 0 48 48" fill="none" style={{ width: 32, height: 32, opacity: 0.4 }} aria-hidden="true">
                      <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
                      <circle cx="17" cy="20" r="4" stroke="currentColor" strokeWidth="2" />
                      <path d="M4 32l10-8 8 6 8-10 14 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Click or drag screenshot here
                    </p>
                  </div>
                }
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="proj-title">Project Title *</label>
            <input
              id="proj-title"
              type="text"
              placeholder="e.g. SafeSim"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-year">Year *</label>
            <input
              id="proj-year"
              type="text"
              placeholder="e.g. 2026"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-desc">Description *</label>
            <textarea
              id="proj-desc"
              placeholder="Detail what this project accomplishes..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-tags">Tech Tags (comma separated)</label>
            <input
              id="proj-tags"
              type="text"
              placeholder="React, Solidity, Web3"
              value={form.tagsString}
              onChange={(e) => setForm({ ...form, tagsString: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-github">GitHub Link</label>
            <input
              id="proj-github"
              type="url"
              placeholder="https://github.com/..."
              value={form.githubUrl}
              onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-vercel">Vercel / Live Link</label>
            <input
              id="proj-vercel"
              type="url"
              placeholder="https://...vercel.app or live demo URL"
              value={form.vercelUrl}
              onChange={(e) => setForm({ ...form, vercelUrl: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="proj-placeholder">Emoji icon (for fallback placeholder)</label>
            <input
              id="proj-placeholder"
              type="text"
              placeholder="⛓️ or 🏥 or 🔗"
              maxLength={4}
              value={form.placeholder}
              onChange={(e) => setForm({ ...form, placeholder: e.target.value })}
            />
          </div>

          {error && <p style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose} id="modal-project-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading} id="modal-project-save-btn">
              {loading ? 'Saving…' : 'Save Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Projects Section ────────────────────────────────
export default function Projects() {
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => r.json())
      .then((d) => {
        if (d.success) setProjectList(d.data);
      })
      .catch(() => {
        // Fallback seed projects if MongoDB is disconnected
        setProjectList([
          {
            title: 'SafeSim',
            year: '2026',
            description:
              'Decentralized crypto transfer dApp with sub-3-second transaction confirmations. Features a NeonGlitch-themed UI, MetaMask integration, and Solidity smart contracts deployed on Ethereum.',
            tags: ['React', 'Solidity', 'Ethereum', 'MetaMask', 'Vercel'],
            githubUrl: 'https://github.com/MohitNetrakar96',
            vercelUrl: '',
            image: '',
            placeholder: '⛓️',
          },
          {
            title: 'Medisin',
            year: '2025',
            description:
              'Healthcare appointment booking system serving 100+ patients. Reduced booking time by 40% with a streamlined UX, RESTful API, and MongoDB-backed scheduling engine.',
            tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
            githubUrl: 'https://github.com/MohitNetrakar96',
            vercelUrl: '',
            image: '',
            placeholder: '🏥',
          },
          {
            title: 'GraphQL Hackathon Build',
            year: '2025',
            description:
              'Full-stack GraphQL project built during the Unstop GraphQL Hackathon. Exploring real-time queries, schema-first design, and a React + Apollo front-end.',
            tags: ['GraphQL', 'Apollo', 'Node.js', 'React'],
            githubUrl: 'https://github.com/MohitNetrakar96',
            vercelUrl: '',
            image: '',
            placeholder: '🔗',
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

  const handleAddProject = (newProj: Project) => {
    setProjectList((prev) => [...prev, newProj]);
  };

  const handleUpdateProject = (updatedProj: Project) => {
    setProjectList((prev) =>
      prev.map((p) =>
        (updatedProj._id && p._id === updatedProj._id) || (!updatedProj._id && p.title === updatedProj.title)
          ? updatedProj
          : p
      )
    );
  };

  const handleDeleteProject = async (proj: Project) => {
    if (!confirm(`Are you sure you want to delete "${proj.title}"?`)) return;

    if (proj._id) {
      try {
        const password = localStorage.getItem('admin_password') || '';
        const res = await fetch(`/api/projects/${proj._id}`, {
          method: 'DELETE',
          headers: { 'x-admin-password': password },
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || 'Failed to delete');
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to delete project');
        return;
      }
    }

    setProjectList((prev) =>
      prev.filter((p) => (proj._id ? p._id !== proj._id : p.title !== proj.title))
    );
  };

  const handleImageUpload = async (idOrTitle: string, url: string) => {
    setProjectList((prev) =>
      prev.map((p) =>
        (p._id ?? p.title) === idOrTitle ? { ...p, image: url } : p
      )
    );

    const target = projectList.find((p) => (p._id ?? p.title) === idOrTitle);
    if (target?._id) {
      try {
        const password = localStorage.getItem('admin_password') || '';
        await fetch(`/api/projects/${target._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-admin-password': password,
          },
          body: JSON.stringify({ image: url }),
        });
      } catch {}
    }
  };

  return (
    <section className="section bg-black text-stone-200" id="work" aria-labelledby="projects-heading" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <p className="eyebrow" style={{ color: 'var(--accent-light)' }}>Selected work</p>
          <RevealText text="Projects I've built." tag="h2" id="projects-heading" className="about-section-heading" />
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            Loading projects…
          </div>
        ) : (
          <div className="projects-grid" style={{ overflow: 'visible' }}>
            {projectList.map((project, i) => (
              <ProjectCard
                key={project._id ?? i}
                project={project}
                delay={i * 0.12}
                onImageUpload={handleImageUpload}
                onEdit={setEditingProject}
                onDelete={handleDeleteProject}
                isAdmin={isAdmin}
              />
            ))}

            {/* Dynamic Add Project Card button */}
            {isAdmin && (
              <motion.button
                className="add-achievement-card"
                style={{ minHeight: '340px', background: '#18181b', border: '1.5px dashed rgba(255,255,255,0.15)' }}
                onClick={() => setModalOpen(true)}
                id="add-project-btn"
                aria-label="Add new project"
                initial={{ opacity: 0, y: 36 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}

                transition={{ duration: 0.65, delay: projectList.length * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg viewBox="0 0 40 40" fill="none" style={{ width: 36, height: 36, color: 'var(--accent)' }} aria-hidden="true">
                  <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M20 12v16M12 20h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent)', textTransform: 'uppercase', fontFamily: 'var(--font-display)', letterSpacing: '0.05em' }}>
                  Add Project
                </span>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontFamily: 'var(--font-body)', fontWeight: 400 }}>
                  Upload screenshot & link demo
                </p>
              </motion.button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <ProjectModal onClose={() => setModalOpen(false)} onSave={handleAddProject} isAdmin={isAdmin} />
        )}
        {editingProject && (
          <ProjectModal
            projectToEdit={editingProject}
            onClose={() => setEditingProject(null)}
            onSave={handleUpdateProject}
            isAdmin={isAdmin}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
