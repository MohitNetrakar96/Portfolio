import type { Metadata } from 'next';
import { Syncopate, Space_Grotesk } from 'next/font/google';
import './globals.css';

const syncopate = Syncopate({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '700'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mohit Netrakar — Full-Stack Developer',
  description:
    'Portfolio of Mohit Netrakar — MCA student at RUAS, MERN & Web3 developer, IEEE-published author, and hackathon winner. Available for full-time roles and freelance projects.',
  keywords: ['Full-Stack Developer', 'MERN', 'Web3', 'React', 'Node.js', 'MongoDB', 'Solidity', 'IEEE', 'Portfolio'],
  authors: [{ name: 'Mohit Netrakar' }],
  openGraph: {
    title: 'Mohit Netrakar — Full-Stack Developer',
    description: 'MERN + Web3 developer, IEEE-published author, hackathon winner.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${syncopate.variable} ${spaceGrotesk.variable}`}>{children}</body>
    </html>
  );
}
