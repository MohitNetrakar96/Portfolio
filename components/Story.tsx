// components/Story.tsx
'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import AnimatedTitle from './AnimatedTitle';
import RoundedCorners from './RoundedCorners';
import Button from './Button';

export default function Story() {
  const frameRef = useRef<HTMLImageElement>(null);

  const handleMouseLeave = () => {
    const element = frameRef.current;
    if (!element) return;

    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,
      ease: 'power1.inOut',
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;

    if (!element) return;

    const rect = element.getBoundingClientRect();
    const xPos = clientX - rect.left;
    const yPos = clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((yPos - centerY) / centerY) * -10;
    const rotateY = ((xPos - centerX) / centerX) * 10;

    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: 'power1.inOut',
    });
  };

  return (
    <section id="story" className="story-section bg-black text-stone-200">
      <div className="story-section__container">
        {/* ── Eyebrow ── */}
        <p className="story-eyebrow">
          from curiosity to craft
        </p>

        <div className="story-content-wrap">
          {/*
            AnimatedTitle: words fly in from 3D on scroll.
            <b> tags inside word strings get --accent colour via .animated-word b in globals.css.
            Keep <br /> for line breaks inside the title.
          */}
          <AnimatedTitle
            title="The jo<b>u</b>rney of <br /> a dev<b>e</b>loper"
            containerClass="story-title-blend"
          />

          <div className="story-img-container">
            <div className="story-img-mask">
              <div className="story-img-content">
                {/*
                  DROP YOUR IMAGE HERE
                  Replace /images/entrance.jpg with a photo of yourself coding,
                  a desk shot, or any atmospheric image. Recommended: 1600×900px.
                */}
                <img
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/images/meeeeeeeeee.jpeg"
                  alt="Developer at work — Mohit Netrakar"
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
            </div>

            {/* SVG filter for organic rounded-corner clip effect */}
            <RoundedCorners />
          </div>
        </div>

        {/* ── Footer copy ── */}
        <div className="story-footer">
          <div className="story-footer__inner">
            <p className="story-footer__text">
              MCA @ Ramaiah University · BCA @ KLE Tech · IEEE-published author ·
              HACKNOVA 1st Place · ISRO Hackathon finalist. Building EventX,
              Medisin &amp; SafeSim — one commit at a time.
            </p>

            {/*
              Button links to the Journey section further down the page.
              Change href to an external link if you prefer.
            */}
            <Button
              id="view-story-btn"
              title="View My Story"
              rightIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: 'rotate(45deg)' }}>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              }
              onClick={() => {
                document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
              }}
              containerClass="story-prologue-btn"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
