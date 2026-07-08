// components/Button.tsx
'use client';

import React from 'react';

interface ButtonProps {
  title: string;
  id?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClass?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

export default function Button({
  title,
  id,
  leftIcon,
  rightIcon,
  containerClass = '',
  onClick,
  type = 'button',
}: ButtonProps) {
  return (
    <button
      type={type}
      id={id}
      onClick={onClick}
      className={`zentry-btn ${containerClass}`}
    >
      {leftIcon}
      <span className="zentry-btn__text">
        <span className="zentry-btn__text-inner" data-text={title}>
          {title}
        </span>
      </span>
      {rightIcon}
    </button>
  );
}
