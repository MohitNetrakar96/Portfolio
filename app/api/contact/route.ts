// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('RESEND_API_KEY is not configured. Falling back to mailto.');
      return NextResponse.json({
        success: false,
        fallback: true,
        error: 'Email service not configured',
      });
    }

    const resend = new Resend(resendApiKey);

    const data = await resend.emails.send({
      from: 'Portfolio Contact Form <onboarding@resend.dev>',
      to: 'mohitnetrakar43@gmail.com',
      subject: `Portfolio Contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email,
    });

    if (data.error) {
      console.error('Resend error:', data.error);
      return NextResponse.json({
        success: false,
        fallback: true,
        error: data.error.message,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('POST /api/contact error:', error);
    return NextResponse.json({
      success: false,
      fallback: true,
      error: error.message || 'Internal server error',
    });
  }
}
