// app/api/journey/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import JourneyItem from '@/models/JourneyItem';

const seedJourney = [
  {
    period: 'Jan – May 2025',
    title: 'MERN Stack Intern',
    org: 'Palindrome Labs',
    bullets: [
      'Shipped 3+ full-stack applications to production.',
      'Reduced bug backlog by 30% through proactive code reviews.',
      'Collaborated with a cross-functional team of 5+ engineers.',
      'Delivered features 20% faster by streamlining development workflows.',
    ],
  },
  {
    period: '2025 – Present',
    title: 'Master of Computer Applications (MCA)',
    org: 'Ramaiah University of Applied Sciences, Bangalore',
    bullets: ['Specializing in full-stack development, cloud computing, and emerging technologies.'],
  },
  {
    period: '2024',
    title: 'Winner — HACKNOVA 1.0 · 1st Place',
    org: 'Agile iTech',
    bullets: ['Won 1st place in a competitive 10-hour hackathon. Designed, built, and deployed a working product from scratch within the time limit.'],
  },
  {
    period: '2024',
    title: 'IEEE Publication — ICEI 2024',
    org: 'IIIT Dharwad',
    bullets: [
      '"A Comparative Analysis of U-Net, PSPNet, and FPNet Deep Learning Techniques for Image Segmentation."',
    ],
    doi: '10.1109/ICEI64305.2024.10912308',
  },
  {
    period: '2023 – 2025',
    title: 'Bachelor of Computer Applications (BCA)',
    org: 'KLE Technological University',
    bullets: ['Built a strong foundation in data structures, algorithms, and software engineering.'],
  },
  {
    period: '2025',
    title: 'Participant — GraphQL Hackathon',
    org: 'Unstop',
    bullets: ['Built a full-stack GraphQL application in a competitive setting, exploring schema-first design and Apollo Client.'],
  },
];

export async function GET() {
  try {
    await connectDB();
    let items = await JourneyItem.find({}).sort({ createdAt: 1 }).lean();

    if (items.length === 0) {
      await JourneyItem.insertMany(seedJourney);
      items = await JourneyItem.find({}).sort({ createdAt: 1 }).lean();
    }

    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('GET /api/journey error (using fallback seed data):', error);
    // Graceful fallback to seed data
    return NextResponse.json({ success: true, data: seedJourney, fallback: true });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { period, title, org, bullets, doi } = body;

    if (!period || !title || !org) {
      return NextResponse.json({ success: false, error: 'Period, title, and org are required' }, { status: 400 });
    }

    const item = await JourneyItem.create({
      period,
      title,
      org,
      bullets: Array.isArray(bullets) ? bullets : [],
      doi: doi || '',
    });

    return NextResponse.json({ success: true, data: item }, { status: 201 });
  } catch (error) {
    console.error('POST /api/journey error:', error);
    return NextResponse.json({ success: false, error: 'Failed to create journey item' }, { status: 500 });
  }
}
