// app/api/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Profile from '@/models/Profile';

export async function GET() {
  try {
    await connectDB();
    const profile = await Profile.findOne({}).lean();

    if (!profile) {
      return NextResponse.json({
        success: true,
        data: { heroImage: '', aboutImage: '' },
      });
    }

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('GET /api/profile error (using fallback settings):', error);
    // Graceful fallback so profiles still load
    return NextResponse.json({
      success: true,
      data: { heroImage: '', aboutImage: '' },
      fallback: true
    });
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
    const { heroImage, aboutImage } = body;

    const updateFields: { heroImage?: string; aboutImage?: string; updatedAt: Date } = {
      updatedAt: new Date(),
    };
    
    if (typeof heroImage === 'string') updateFields.heroImage = heroImage;
    if (typeof aboutImage === 'string') updateFields.aboutImage = aboutImage;

    const profile = await Profile.findOneAndUpdate(
      {},
      { $set: updateFields },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, data: profile });
  } catch (error) {
    console.error('POST /api/profile error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update profile settings' }, { status: 500 });
  }
}
