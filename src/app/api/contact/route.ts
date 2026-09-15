import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      phone,
      eventType,
      otherEventType,
      eventDate,
      guestCount,
      notes,
      message,
      ticketId,
      timestamp,
      source = 'Website Form',
    } = body;

    // Validate essential fields
    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { error: 'Name and contact info (email or phone) are required.' },
        { status: 400 }
      );
    }

    const category =
      eventType === 'Other' && otherEventType
        ? `Other (${otherEventType})`
        : eventType || 'General Inquiry';

    const clientNotes = notes || message || 'None provided';
    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'Ashoutosh@kraftiveevents.com';
    const ccEmail = process.env.CC_NOTIFICATION_EMAIL || 'info@kraftiveevents.com';

    // Build rich HTML email template
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #121212; color: #FAF7F0; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #1A1A1A; border: 1px solid #C6A962; padding: 30px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); }
    .header { border-bottom: 2px solid #C6A962; padding-bottom: 15px; margin-bottom: 25px; display: flex; justify-content: space-between; align-items: center; }
    .brand { font-size: 20px; font-weight: bold; color: #C6A962; letter-spacing: 2px; text-transform: uppercase; }
    .ticket-badge { background-color: rgba(198, 169, 98, 0.15); border: 1px solid #C6A962; color: #C6A962; padding: 4px 12px; font-family: monospace; font-size: 12px; font-weight: bold; text-transform: uppercase; }
    .title { font-size: 18px; font-weight: 600; color: #FAF7F0; margin-bottom: 20px; }
    .details-table { width: 100%; border-collapse: collapse; margin-bottom: 25px; }
    .details-table td { padding: 12px 0; border-bottom: 1px solid rgba(250, 247, 240, 0.1); font-size: 14px; }
    .label { color: #C6A962; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 1px; width: 35%; }
    .value { color: #FAF7F0; font-weight: 400; }
    .value-highlight { color: #C6A962; font-weight: bold; }
    .notes-box { background-color: #242424; border-left: 3px solid #C6A962; padding: 15px; margin-top: 15px; font-style: italic; color: #E0E0E0; font-size: 13px; line-height: 1.5; }
    .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid rgba(250, 247, 240, 0.1); text-align: center; font-size: 11px; color: #888888; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">KRAFTIVE EVENTS</div>
      ${ticketId ? `<div class="ticket-badge">${ticketId}</div>` : ''}
    </div>

    <div class="title">✨ New Event Inquiry Received (${source})</div>

    <table class="details-table">
      ${ticketId ? `<tr><td class="label">Ticket Number</td><td class="value font-mono">${ticketId}</td></tr>` : ''}
      ${timestamp ? `<tr><td class="label">Submission Time</td><td class="value">${timestamp}</td></tr>` : ''}
      <tr><td class="label">Client Name</td><td class="value-highlight">${name}</td></tr>
      <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${email}" style="color: #C6A962; text-decoration: none;">${email || 'N/A'}</a></td></tr>
      <tr><td class="label">Phone / WhatsApp</td><td class="value"><a href="tel:${phone}" style="color: #C6A962; text-decoration: none;">${phone || 'N/A'}</a></td></tr>
      <tr><td class="label">Event Category</td><td class="value-highlight">${category}</td></tr>
      <tr><td class="label">Target Date</td><td class="value">${eventDate || 'Flexible / To be decided'}</td></tr>
      <tr><td class="label">Guest Count</td><td class="value">${guestCount || 'Not specified'}</td></tr>
    </table>

    <div class="label">Special Requirements / Notes</div>
    <div class="notes-box">
      "${clientNotes}"
    </div>

    <div class="footer">
      This is an automated notification from Kraftive Events & Media website (${source}).<br>
      To respond to the client directly, reply to this email.
    </div>
  </div>
</body>
</html>
`;

    // Plain text fallback
    const textContent = `
NEW EVENT INQUIRY - KRAFTIVE EVENTS (${source})
==================================================
Ticket ID: ${ticketId || 'N/A'}
Timestamp: ${timestamp || new Date().toISOString()}

CLIENT DETAILS:
- Name: ${name}
- Email: ${email || 'N/A'}
- Phone: ${phone || 'N/A'}

EVENT DETAILS:
- Category: ${category}
- Date: ${eventDate || 'Flexible'}
- Guest Count: ${guestCount || 'Not specified'}

SPECIAL NOTES:
"${clientNotes}"

==================================================
`;

    // Configure Mail Transport
    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const port = Number(process.env.SMTP_PORT) || 465;

    if (host && user && pass) {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: process.env.SMTP_SECURE !== 'false', // true for 465, false for other ports
        auth: {
          user,
          pass,
        },
      });

      await transporter.sendMail({
        from: `"Kraftive Events Website" <${user}>`,
        to: recipientEmail,
        cc: ccEmail,
        replyTo: email || undefined,
        subject: `[New Inquiry ${ticketId || ''}] ${category} - ${name}`,
        text: textContent,
        html: htmlContent,
      });

      console.log(`[Contact API] Email successfully sent to ${recipientEmail} for ticket ${ticketId}`);
    } else {
      console.warn(
        `[Contact API] SMTP credentials missing in .env.local. Inquiry logged to console for ${name} (${ticketId}). Add SMTP_HOST, SMTP_USER, SMTP_PASS to send live emails.`
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received and sent successfully.',
      ticketId,
    });
  } catch (error) {
    console.error('[Contact API Error]:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again or contact us directly.' },
      { status: 500 }
    );
  }
}
