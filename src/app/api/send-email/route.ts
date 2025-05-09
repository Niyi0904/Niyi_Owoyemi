// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const allowedOrigins = ['https://niyi-owoyemi.vercel.app', 'http://localhost:3000', 'https://niyi-owoyemi-niyi0904s-projects.vercel.app/', 'https://niyi-owoyemi-3ch3zv6g0-niyi0904s-projects.vercel.app/'];

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', allowedOrigins.join(','));
  response.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  response.headers.set('Access-Control-Max-Age', '86400');
  return response;
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin') || '';
  if (!allowedOrigins.includes(origin)) {
    return new NextResponse(JSON.stringify({ error: 'Origin not allowed' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    
    // Validate the request body
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 465,
      secure: true, // true for port 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
      const info = await transporter.sendMail({
        from: `"NidavTech Contact Form" <${process.env.SMTP_TO}>`,
        replyTo: body.email,
        to: process.env.SMTP_TO,
        subject: `New message from ${body.name}`,
        text: `
          Name: ${body.name}
          Email: ${body.email}
          Message: ${body.message}
        `,
        html:`
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
      `
      })

      console.log('Message sent: %s', info.messageId);

    return NextResponse.json(
      { success: true, message: 'Message sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}