// app/api/achievements/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Achievement from '@/models/Achievement';

// Seed data for first run
const seedAchievements = [
  {
    title: 'IEEE Published Paper',
    description:
      'A peer-reviewed comparative study evaluating U-Net, PSPNet, and FPNet architectures for image segmentation, presented at the IEEE International Conference on Emerging Innovations (ICEI 2024), IIIT Dharwad.',
    meta: 'IIIT Dharwad · ICEI 2024',
    image: '',
  },
  {
    title: 'HACKNOVA 1.0 — 1st Place Winner',
    description:
      'Awarded first place at HACKNOVA 1.0, a ten-hour hackathon hosted by Agile iTech, in recognition of technical execution and originality of solution.',
    meta: 'Agile iTech · 2024',
    image: '',
  },
  {
    title: 'GraphQL Hackathon — Participant',
    description:
      'Participated in a GraphQL-focused hackathon hosted by Unstop, developing a full-stack application built on GraphQL, Node.js, and React.',
    meta: 'Unstop · 2025',
    image: '',
  },
];

export async function GET() {
  try {
    await connectDB();

    let achievements = await Achievement.find({}).sort({ createdAt: 1 }).lean();

    // Seed on first run
    if (achievements.length === 0) {
      await Achievement.insertMany(seedAchievements);
      achievements = await Achievement.find({}).sort({ createdAt: 1 }).lean();
    }

    return NextResponse.json({ success: true, data: achievements });
  } catch (error) {
    console.error('GET /api/achievements error (using fallback seed data):', error);
    // Graceful fallback to seed data
    return NextResponse.json({ success: true, data: seedAchievements, fallback: true });
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
    const { title, description, meta, image } = body;

    if (!title || !description || !meta) {
      return NextResponse.json({ success: false, error: 'title, description, and meta are required' }, { status: 400 });
    }

    const achievement = await Achievement.create({ title, description, meta, image: image || '' });

    return NextResponse.json({ success: true, data: achievement }, { status: 201 });
  } catch (error) {
    console.error('POST /api/achievements error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create achievement' }, { status: 500 });
  }
}
