// components/BentoTilt.tsx
'use client';

import React, { useState, useRef } from 'react';

interface BentoTiltProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function BentoTilt({ children, className = '', id }: BentoTiltProps) {
  const [transformStyle, setTransformStyle] = useState('');
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 8;
    const tiltY = (relativeX - 0.5) * -8;
    setTransformStyle(
      `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.97,0.97,0.97)`
    );
  };

  return (
    <div
      ref={itemRef}
      id={id}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTransformStyle('')}
      style={{ transform: transformStyle, transition: 'transform 0.3s ease-out' }}
    >
      {children}
    </div>
  );
}
