'use client';

import { useState } from 'react';

export default function Footer() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (data.success) {
        setStatus({ type: 'success', message: 'Message sent successfully!' });
        setForm({ name: '', email: '', message: '' });
      } else if (data.fallback) {
        // Fallback to mailto
        const mailtoUrl = `mailto:mohitnetrakar43@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
          `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        )}`;
        window.location.href = mailtoUrl;
        setStatus({ type: 'success', message: 'Opening email client (fallback)...' });
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (err: any) {
      // Offline / other error fallback to mailto
      const mailtoUrl = `mailto:mohitnetrakar43@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus({ type: 'success', message: 'Opening email client (fallback)...' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer" id="contact" aria-label="Site footer">
      <div className="container">
        <div className="footer-top">
          {/* Left: Big heading + email */}
          <div>
            <h2 className="footer-headline">
              Got a project in mind?<br />Let&apos;s build it.
            </h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="contact-name" style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 500 }}>Name</label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                  style={{
                    background: '#18181b',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.8rem',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-light)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="contact-email" style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 500 }}>Email</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                  style={{
                    background: '#18181b',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.8rem',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-light)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <label htmlFor="contact-message" style={{ fontSize: '0.8rem', color: '#a1a1aa', fontWeight: 500 }}>Message</label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                  style={{
                    background: '#18181b',
                    border: '1.5px solid rgba(255,255,255,0.08)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '0.6rem 0.8rem',
                    color: '#ffffff',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--accent-light)'}
                  onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
              </div>
              {status && <p style={{ fontSize: '0.85rem', color: status.type === 'success' ? '#34d399' : '#f87171' }}>{status.message}</p>}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary"
                style={{
                  alignSelf: 'flex-start',
                  padding: '0.6rem 1.5rem',
                  fontSize: '0.85rem',
                  height: 'auto',
                  minWidth: 'auto',
                  marginTop: '0.5rem'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Right: Social links */}
          <div>
            <div className="footer-links-group">
              <h5>Connect</h5>
              <nav className="footer-links" aria-label="Social links">
                <a href="https://github.com/MohitNetrakar96" target="_blank" rel="noopener noreferrer" id="footer-github-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  github.com/MohitNetrakar96
                </a>
                <a href="https://linkedin.com/in/mohit-netrakar" target="_blank" rel="noopener noreferrer" id="footer-linkedin-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                  </svg>
                  linkedin.com/in/mohit-netrakar
                </a>
                <a href="tel:+916363542738" id="footer-phone-link">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 3a1 1 0 011-1h2.5l1 3-1.5 1a9 9 0 004 4l1-1.5 3 1V12a1 1 0 01-1 1A12 12 0 012 3z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  +91 6363 542 738
                </a>
              </nav>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Mohit Netrakar. All rights reserved.</p>
          <p>
            Built with Next.js · Framer Motion · MongoDB ·{' '}
            <button
              onClick={() => {
                const pass = prompt('Enter admin password:');
                if (pass !== null) {
                  localStorage.setItem('admin_password', pass);
                  window.location.reload();
                }
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#a1a1aa',
                cursor: 'pointer',
                fontSize: 'inherit',
                textDecoration: 'underline',
                padding: 0,
              }}
            >
              Admin Access
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
