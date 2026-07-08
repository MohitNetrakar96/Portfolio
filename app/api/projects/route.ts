// app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Project from '@/models/Project';

// Seed projects
const seedProjects = [
  {
    title: 'SafeSim',
    year: '2026',
    description:
      'Decentralized crypto transfer dApp with sub-3-second transaction confirmations. Features a NeonGlitch-themed UI, MetaMask integration, and Solidity smart contracts deployed on Ethereum.',
    tags: ['React', 'Solidity', 'Ethereum', 'MetaMask', 'Vercel'],
    githubUrl: 'https://github.com/MohitNetrakar96',
    vercelUrl: '',
    image: '',
    placeholder: '⛓️',
  },
  {
    title: 'Medisin',
    year: '2025',
    description:
      'Healthcare appointment booking system serving 100+ patients. Reduced booking time by 40% with a streamlined UX, RESTful API, and MongoDB-backed scheduling engine.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Vercel'],
    githubUrl: 'https://github.com/MohitNetrakar96',
    vercelUrl: '',
    image: '',
    placeholder: '🏥',
  },
  {
    title: 'GraphQL Hackathon Build',
    year: '2025',
    description:
      'Full-stack GraphQL project built during the Unstop GraphQL Hackathon. Exploring real-time queries, schema-first design, and a React + Apollo front-end.',
    tags: ['GraphQL', 'Apollo', 'Node.js', 'React'],
    githubUrl: 'https://github.com/MohitNetrakar96',
    vercelUrl: '',
    image: '',
    placeholder: '🔗',
  },
];

export async function GET() {
  try {
    await connectDB();
    let projects = await Project.find({}).sort({ createdAt: 1 }).lean();

    if (projects.length === 0) {
      await Project.insertMany(seedProjects);
      projects = await Project.find({}).sort({ createdAt: 1 }).lean();
    }

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    console.error('GET /api/projects error (using fallback seed data):', error);
    // Graceful fallback to seed data so landing page doesn't break
    return NextResponse.json({ success: true, data: seedProjects, fallback: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio_admin_secret';
    if (req.headers.get('x-admin-password') !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    const { title, year, description, tags, githubUrl, vercelUrl, image, placeholder } = body;

    if (!title || !year || !description) {
      return NextResponse.json({ success: false, error: 'Title, year, and description are required' }, { status: 400 });
    }

    const project = await Project.create({
      title,
      year,
      description,
      tags: Array.isArray(tags) ? tags : [],
      githubUrl: githubUrl || '',
      vercelUrl: vercelUrl || '',
      image: image || '',
      placeholder: placeholder || '🔗',
    });

    return NextResponse.json({ success: true, data: project }, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create project (check DB connection)' }, { status: 500 });
  }
}
