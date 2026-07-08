// app/api/auth/verify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'portfolio_admin_secret';
  const providedPassword = req.headers.get('x-admin-password');

  if (providedPassword === adminPassword) {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { success: false, error: 'Unauthorized' },
    { status: 401 }
  );
}
