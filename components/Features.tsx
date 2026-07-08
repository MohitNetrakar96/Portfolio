// components/Features.tsx
'use client';

import { useState, useRef } from 'react';
import BentoTilt from './BentoTilt';

// Local portfolio images mapping for bento cards
const FEATURE_IMAGES = [
  '/images/eventron.png',     // EventX project screenshot
  '/images/medisn.png',       // Medisin project screenshot
  '/images/safesim.png',      // SafeSim project screenshot
  '/images/Ieee.png',         // IEEE publication screenshot
  '/images/hackanova.jpeg',   // Hacknova award screenshot
];

interface BentoCardProps {
  src: string;
  title: React.ReactNode;
  description?: string;
  isComingSoon?: boolean;
}

export function BentoCard({ src, title, description, isComingSoon }: BentoCardProps) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="bento-card-inner">
      <img
        src={src}
        className="bento-card-video" // Reuse styling class for full coverage
        alt="Bento visual representation"
        style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
      />
      <div className="bento-card-content">
        <div>
          <h3 className="bento-title special-font">{title}</h3>
          {description && (
            <p className="bento-desc">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="bento-coming-soon-btn"
          >
            {/* Radial gradient hover effect */}
            <div
              className="bento-radial-hover"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(101, 111, 226, 0.53), rgba(0, 0, 0, 0.15))`,
              }}
            />
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)', position: 'relative', zIndex: 2 }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
            <p className="bento-coming-soon-text">view project</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section className="features-section bg-black">
      <div className="container">
        {/* ── Section header ── */}
        <div className="features-header">
          <p className="features-eyebrow">
            What I Build
          </p>
          <p className="features-subtext">
            From event platforms to AI-powered medical tools — every project is a
            full-stack system built with React, Node.js, MongoDB, and a deep care
            for user experience.
          </p>
        </div>

        {/*
          ── Bento grid layout ──
          Large card (EventX) + 2-col grid below.
          BentoTilt adds 3D mouse-tilt on each card via perspective transform.
        */}

        {/* Card 1 — EventX (large hero card) */}
        <BentoTilt className="bento-grid-item bento-grid-item--large">
          <BentoCard
            src={FEATURE_IMAGES[0]}
            title={
              <>
                Eve<b>n</b>tX
              </>
            }
            description="Full-stack event management platform — venue booking, ticketing, and real-time attendee dashboards built with MERN + Socket.io."
            isComingSoon
          />
        </BentoTilt>

        <div className="bento-grid-layout">
          {/* Card 2 — Medisin */}
          <BentoTilt className="bento-grid-item bento-tilt-col-span-2">
            <BentoCard
              src={FEATURE_IMAGES[1]}
              title={
                <>
                  Me<b>d</b>isin
                </>
              }
              description="AI-powered medical assistant — symptom checker, prescription analysis, and doctor-appointment scheduling. Built with Next.js + OpenAI API."
              isComingSoon
            />
          </BentoTilt>

          {/* Card 3 — SafeSim */}
          <BentoTilt className="bento-grid-item bento-tilt-col-span-1">
            <BentoCard
              src={FEATURE_IMAGES[2]}
              title={
                <>
                  Safe<b>S</b>im
                </>
              }
              description="Safety-training simulation platform — 3D hazard scenarios, real-time scoring, and compliance reporting."
              isComingSoon
            />
          </BentoTilt>

          {/* Card 4 — IEEE Research */}
          <BentoTilt className="bento-grid-item bento-tilt-col-span-1">
            <BentoCard
              src={FEATURE_IMAGES[3]}
              title={
                <>
                  IE<b>E</b>E
                </>
              }
              description="Published research paper — peer-reviewed and presented at an IEEE-indexed conference. Exploring emerging web technologies."
              isComingSoon
            />
          </BentoTilt>

          {/* CTA card — Open to Work */}
          <BentoTilt className="bento-grid-item bento-grid-item--cta">
            <div
              className="bento-cta-box"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else window.open('mailto:mohitnetrakar@gmail.com', '_blank');
              }}
              style={{ cursor: 'pointer' }}
            >
              <h3 className="bento-title special-font">
                Op<b>e</b>n to W<b>o</b>rk.
              </h3>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="bento-cta-arrow">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </BentoTilt>

          {/* Card 5 — B-roll / hackathon */}
          <BentoTilt className="bento-grid-item bento-tilt-col-span-1">
            <img
              src={FEATURE_IMAGES[4]}
              className="bento-card-video"
              alt="Awards and recognition"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
}
