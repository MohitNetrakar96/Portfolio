'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#work', label: 'Work' },
  { href: '#journey', label: 'Journey' },
  { href: '#achievements', label: 'Achievements' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Main navigation">
        <div className="container">
          <div className="nav-inner">
            <a href="#" className="nav-logo" aria-label="Mohit Netrakar home">
              Mohit<span>.</span>
            </a>

            {/* Desktop links */}
            <ul className="nav-links" role="list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }} className="nav-contact-wrap">
              <a href="/resume.pdf" download="Mohit_Netrakar_CV.pdf" className="btn btn-outline nav-cv" id="nav-cv-btn" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', height: 'auto', minWidth: 'auto' }}>
                Download CV
              </a>
              <a href="#contact" className="btn btn-primary nav-contact" id="nav-contact-btn">
                Contact
              </a>
            </div>

            {/* Hamburger */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className={`mobile-menu${menuOpen ? ' open' : ''}`}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
          >
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={closeMenu}>
                {link.label}
              </a>
            ))}
            <a href="/resume.pdf" download="Mohit_Netrakar_CV.pdf" className="btn btn-outline" onClick={closeMenu} id="mobile-cv-btn" style={{ marginBottom: '1rem' }}>
              Download CV
            </a>
            <a href="#contact" className="btn btn-primary" onClick={closeMenu} id="mobile-contact-btn">
              Contact
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
