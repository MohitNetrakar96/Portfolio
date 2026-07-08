// app/api/achievements/[id]/route.ts
// PATCH — update an individual achievement (e.g. update image URL)

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Achievement from '@/models/Achievement';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio_admin_secret';
    if (req.headers.get('x-admin-password') !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;
    const body = await req.json();

    const updated = await Achievement.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ success: false, error: 'Achievement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (err) {
    console.error('PATCH /api/achievements/[id] error:', err);
    return NextResponse.json({ success: false, error: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio_admin_secret';
    if (req.headers.get('x-admin-password') !== adminPassword) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const deleted = await Achievement.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Achievement not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deleted });
  } catch (err) {
    console.error('DELETE /api/achievements/[id] error:', err);
    return NextResponse.json({ success: false, error: 'Deletion failed' }, { status: 500 });
  }
}

