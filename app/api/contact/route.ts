import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, website } = body || {};

    // Honeypot spam protection
    if (website) {
      return NextResponse.json(
        { success: false, message: 'Spam detected.' },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing fields.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // 📩 Email to portfolio owner
    const ownerEmailResponse = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.TO_EMAIL!,
      replyTo: email,
      subject: `New message from ${name} — ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    });

    // 📨 Auto reply to user
    try {
      await resend.emails.send({
        from: 'Your Portfolio <onboarding@resend.dev>',
        to: email,
        subject: `Thank you for your message, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
            <h2>Thank You for Contacting Me!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reaching out through my portfolio website. I have received your message and will respond soon.</p>

            <div style="background:#f5f5f5;padding:15px;border-left:4px solid #0070f3;margin:20px 0;">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Message:</strong></p>
              <p>${message.replace(/\n/g, '<br/>')}</p>
            </div>

            <p>Best regards,<br/>Portfolio Owner</p>

            <hr/>
            <p style="font-size:12px;color:#666;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        `,
        text: `Hi ${name},

Thank you for contacting me. I received your message and will respond soon.

Subject: ${subject}
Message: ${message}

Best regards,
Portfolio Owner`,
      });
    } catch {
      // Ignore auto-reply errors
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message sent successfully!',
        ownerEmail: ownerEmailResponse,
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to send email.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle other methods
function methodNotAllowed() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { status: 405, headers: corsHeaders }
  );
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
export const PATCH = methodNotAllowed;