'use client';

import { motion } from 'framer-motion';

interface RevealTextProps {
  text: string;
  delay?: number;
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  id?: string;
}

export default function RevealText({
  text,
  delay = 0,
  className = '',
  tag: Tag = 'span',
  id,
}: RevealTextProps) {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { y: '105%', opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <Tag id={id} className={className} style={{ overflow: 'hidden', display: 'block' }}>
      <motion.span
        style={{ display: 'inline-block', overflow: 'hidden' }}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-40px' }}
      >
        {words.map((word, idx) => (
          <span
            key={idx}
            style={{
              display: 'inline-block',
              overflow: 'hidden',
              marginRight: '0.22em',
              verticalAlign: 'bottom',
            }}
          >
            <motion.span
              variants={wordVariants}
              style={{ display: 'inline-block', originY: 0.5 }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
