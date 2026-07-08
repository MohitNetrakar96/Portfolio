// components/ZentryHero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import Button from './Button';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Premium abstract dark tech/mesh backgrounds (prevents webpage screenshots from clashing with hero text)
const HERO_IMAGES = [
  '/images/landing-bg.jpg', // Vagabond samurai artwork as the primary landing page background
  '/images/story-art.jpg',   // Orange/black anime artwork
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop', // Dark minimalist wave
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1920&auto=format&fit=crop', // Deep blue-violet mesh
];

export default function ZentryHero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const totalImages = 4;
  const nextImageRef = useRef<HTMLImageElement>(null);
  const currentImageRef = useRef<HTMLImageElement>(null);
  const backgroundImageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    // Clear loading overlay once images are loaded
    if (loadedImages >= totalImages - 1) {
      setIsLoading(false);
    }
  }, [loadedImages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const upcomingImageIndex = (currentIndex % totalImages) + 1;

  const handleMiniImageClick = () => {
    setIsClicked(true);
    setCurrentIndex(upcomingImageIndex);
  };

  useGSAP(
    () => {
      if (isClicked) {
        gsap.set('#next-video', { visibility: 'visible' });
        gsap.to('#next-video', {
          transformOrigin: 'center center',
          scale: 1,
          width: '100%',
          height: '100%',
          duration: 1,
          ease: 'power1.inOut',
        });
        gsap.from('#current-video', {
          transformOrigin: 'center center',
          scale: 0,
          duration: 1.5,
          ease: 'power1.inOut',
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0, 72% 0, 88% 90%, 0 95%)',
      borderRadius: '0% 0% 40% 10%',
    });
    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0% 0% 0% 0%',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  });

  const getImageSrc = (index: number) => HERO_IMAGES[(index - 1) % totalImages];

  return (
    <div className="zentry-hero-wrap">
      {isLoading && (
        <div className="zentry-loader-overlay">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div id="video-frame" className="zentry-video-frame">
        <div>
          <div className="mask-clip-path zentry-mini-frame">
            <div
              onClick={handleMiniImageClick}
              className="zentry-mini-video-trigger"
            >
              <img
                ref={currentImageRef}
                src={getImageSrc(upcomingImageIndex)}
                id="current-video"
                className="zentry-mini-video-el"
                onLoad={handleImageLoad}
                alt="Mini preview"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>

          <img
            ref={nextImageRef}
            src={getImageSrc(upcomingImageIndex)}
            id="next-video"
            className="zentry-next-video-el"
            onLoad={handleImageLoad}
            alt="Main display"
            style={{ objectFit: 'cover' }}
          />
          <img
            ref={backgroundImageRef}
            src={getImageSrc(currentIndex)}
            className="zentry-background-video-el"
            onLoad={handleImageLoad}
            alt="Background"
            style={{ objectFit: 'cover' }}
          />
          {/* Dark slate overlay to dim background screenshots for readability */}
          <div className="zentry-hero-dark-overlay" />
        </div>

        {/* Bottom-right heading inside the clipped frame */}
        <h1 className="special-font zentry-hero-heading zentry-hero-heading--bottom">
          B<b>u</b>ild
        </h1>

        <div className="zentry-hero-overlay">
          <section className="zentry-hero-section">
            {/* Top-left heading */}
            <h1 className="special-font zentry-hero-heading">
              creat<b>e</b>
            </h1>
            <p className="zentry-hero-sub">
              Full-Stack &amp; AI/ML Engineer <br />
              turning ideas into production software
            </p>
            {/* Download CV */}
            <Button
              id="download-cv"
              title="Download CV"
              type="button"
              onClick={() => window.open('/Mohit_Netrakar_CV.pdf', '_blank')}
              leftIcon={
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              }
              containerClass="zentry-watch-trailer-btn"
            />
          </section>
        </div>
      </div>

      {/* Black outline duplicate heading below the video frame */}
      <h1 className="special-font zentry-hero-heading zentry-hero-heading--black">
        CR<b>E</b>ATE
      </h1>
    </div>
  );
}
