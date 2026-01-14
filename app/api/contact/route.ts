import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// CORS headers configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, website } = body || {};

    // Honeypot (spam bot protection)
    if (website) {
      return NextResponse.json(
        { success: false, message: 'Spam detected.' },
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: 'Missing fields.' },
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address.' },
        { 
          status: 400,
          headers: corsHeaders 
        }
      );
    }

    console.log('Sending emails...');
    console.log('To email:', email);
    console.log('From email:', process.env.TO_EMAIL);

    // 📩 Email to YOU (portfolio owner)
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

    console.log('Owner email sent:', ownerEmailResponse);

    // 📨 Auto-reply to the sender - IMPORTANT: Use a verified domain
    try {
      const autoReplyResponse = await resend.emails.send({
        from: 'Your Portfolio <onboarding@resend.dev>', // or your verified domain
        to: email, // The user's email
        subject: `Thank you for your message, ${name}!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #333;">Thank You for Contacting Me!</h2>
            <p>Hi ${name},</p>
            <p>Thank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #0070f3; margin: 20px 0;">
              <p style="margin: 0;"><strong>Your Message Summary:</strong></p>
              <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              <p style="margin: 5px 0;"><strong>Message:</strong></p>
              <p style="margin: 5px 0;">${message.replace(/\n/g, '<br/>')}</p>
            </div>
            
            <p>Best regards,</p>
            <p>Your Name<br/>
            Portfolio Owner</p>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
            <p style="color: #666; font-size: 12px;">
              This is an automated response. Please don't reply to this email.
            </p>
          </div>
        `,
        // Optional: Add text version for email clients that prefer plain text
        text: `Hi ${name},\n\nThank you for reaching out through my portfolio website. I have received your message and will get back to you as soon as possible.\n\nYour Message Summary:\nSubject: ${subject}\nMessage: ${message}\n\nBest regards,\nYour Name\nPortfolio Owner\n\nThis is an automated response. Please don't reply to this email.`,
      });

      console.log('Auto-reply email sent:', autoReplyResponse);
    } catch (autoReplyError) {
      console.error('Auto-reply email failed:', autoReplyError);
      // Don't fail the whole request if auto-reply fails
      // Continue and just log the error
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
    console.error('Resend error details:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to send email.',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { 
      status: 405,
      headers: corsHeaders 
    }
  );
}

export async function PUT() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { 
      status: 405,
      headers: corsHeaders 
    }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { 
      status: 405,
      headers: corsHeaders 
    }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, message: 'Method not allowed' },
    { 
      status: 405,
      headers: corsHeaders 
    }
  );
}