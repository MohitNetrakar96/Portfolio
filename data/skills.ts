// data/skills.ts

export interface Skill {
  name: string;
  level?: string; // e.g. 'Advanced', 'Intermediate'
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Solidity' },
      { name: 'Python' },
      { name: 'HTML5' },
      { name: 'CSS3' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    items: [
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Three.js' },
      { name: 'Framer Motion' },
      { name: 'GSAP' },
    ],
  },
  {
    category: 'Databases & Cache',
    items: [
      { name: 'MongoDB' },
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'Redis' },
    ],
  },
  {
    category: 'Tools & Technologies',
    items: [
      { name: 'Git & GitHub' },
      { name: 'GraphQL / Apollo' },
      { name: 'MetaMask' },
      { name: 'Hardhat' },
      { name: 'Docker' },
      { name: 'Vercel' },
      { name: 'Postman' },
    ],
  },
];
