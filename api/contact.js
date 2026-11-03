// ---------------------------------------------------------------------------
// api/contact.js — Vercel Serverless Function for ACM Chapter Contact Form
// ---------------------------------------------------------------------------

// In-memory rate limiter per IP: max 5 requests per 10 minutes
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

// Clean old rate limit entries every 30 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now > entry.resetAt) {
      rateLimitMap.delete(ip);
    }
  }
}, 30 * 60 * 1000).unref?.();

// Helper to sanitize HTML characters to prevent HTML/XSS injection in email clients
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export default async function handler(req, res) {
  // Security headers & Origin boundary
  const origin = req.headers.origin || '';
  const allowedOrigins = [
    'https://acm-official.vercel.app',
    'https://acm-vitap.vercel.app',
    'https://acm.vitap.ac.in',
    'http://localhost:5173',
    'http://localhost:3000',
  ];
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin) {
    // Direct same-origin or server-to-server request
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else {
    // Untrusted cross-origin request
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  }

  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-Type, Date'
  );
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      ok: false,
      error: 'Method Not Allowed. Only POST requests are supported.',
    });
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch (err) {
        return res.status(400).json({ ok: false, error: 'Malformed JSON payload.' });
      }
    }

    const {
      name,
      email,
      subject,
      message,
      hp_company,
      _timestamp,
    } = body || {};

    // 1. Bot spam protection: Honeypot check
    // If the invisible honeypot field is filled, silently accept to fool bots without sending email
    if (hp_company) {
      return res.status(200).json({
        ok: true,
        message: 'Message received successfully.',
      });
    }

    // 2. Bot spam protection: Submission speed check
    // If submitted under 1.2 seconds from page/component mount, likely an automated script
    if (_timestamp && typeof _timestamp === 'number') {
      const elapsed = Date.now() - _timestamp;
      if (elapsed < 1200) {
        return res.status(200).json({
          ok: true,
          message: 'Message received successfully.',
        });
      }
    }

    // 3. Client IP extraction & rate limiting
    const rawIp =
      req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
      req.headers['x-real-ip'] ||
      req.socket?.remoteAddress ||
      'unknown-ip';

    if (isRateLimited(rawIp)) {
      return res.status(429).json({
        ok: false,
        error: 'Too many submissions from your connection. Please wait a few minutes before trying again.',
      });
    }

    // 4. Input sanitization & field validation
    const trimmedName = String(name || '').trim();
    const trimmedEmail = String(email || '').trim().toLowerCase();
    const trimmedSubject = String(subject || '').trim();
    const trimmedMessage = String(message || '').trim();

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return res.status(400).json({
        ok: false,
        error: 'Please provide a valid full name (2–100 characters).',
      });
    }

    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || trimmedEmail.length > 120) {
      return res.status(400).json({
        ok: false,
        error: 'Please enter a valid email address.',
      });
    }

    const validSubjects = ['General Enquiry', 'Events', 'Collaboration', 'Membership', 'Other'];
    if (!trimmedSubject || (!validSubjects.includes(trimmedSubject) && trimmedSubject.length > 120)) {
      return res.status(400).json({
        ok: false,
        error: 'Please select or provide a valid subject topic.',
      });
    }

    if (!trimmedMessage || trimmedMessage.length < 10 || trimmedMessage.length > 2000) {
      return res.status(400).json({
        ok: false,
        error: 'Message must be between 10 and 2000 characters.',
      });
    }

    // 5. Configuration check
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'acm.studentchapter@vitap.ac.in';
    const fromEmail = process.env.CONTACT_FROM_EMAIL || 'ACM VIT-AP Contact <onboarding@resend.dev>';

    if (!RESEND_API_KEY) {
      // Clear reporting that credentials are not configured on server
      return res.status(503).json({
        ok: false,
        unconfigured: true,
        error: 'Email delivery service is currently not configured on the server (missing RESEND_API_KEY).',
        recipientEmail,
      });
    }

    // 6. Safe HTML email template
    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeSubject = escapeHtml(trimmedSubject);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, '<br />');
    const timestampFormatted = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Contact Message - ACM VIT-AP</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f8fafc;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0b1528; border: 1px solid #1e3a66; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);">
    <!-- Header -->
    <tr>
      <td style="padding: 28px 32px; background: linear-gradient(135deg, #091a38 0%, #030e20 100%); border-bottom: 2px solid #00d4ff;">
        <div style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #00d4ff; font-weight: 700; margin-bottom: 6px;">ACM STUDENT CHAPTER · VIT-AP</div>
        <h1 style="margin: 0; font-size: 22px; color: #ffffff; font-weight: 700;">New Contact Form Message</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #94a3b8;">Transmitted from the official chapter portal</p>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px; background-color: #050d1c; border: 1px solid #172a46; border-radius: 10px;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 13px; color: #64748b; width: 100px;">From:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 14px; color: #f1f5f9; font-weight: 600;">${safeName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 13px; color: #64748b;">Email:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 14px; color: #38bdf8;">
              <a href="mailto:${safeEmail}" style="color: #00d4ff; text-decoration: none;">${safeEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 13px; color: #64748b;">Subject:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #172a46; font-size: 14px; color: #f1f5f9; font-weight: 600;">${safeSubject}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; font-size: 13px; color: #64748b;">Received:</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #94a3b8;">${timestampFormatted} (IST)</td>
          </tr>
        </table>

        <div style="font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; color: #00d4ff; font-weight: 700; margin-bottom: 8px;">Message Content:</div>
        <div style="padding: 20px; background-color: #030814; border-left: 3px solid #00d4ff; border-radius: 6px; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
          ${safeMessage}
        </div>

        <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #172a46; text-align: center;">
          <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(trimmedSubject)}" style="display: inline-block; padding: 10px 22px; background: linear-gradient(90deg, #00d4ff, #0088ff); color: #020617; font-weight: 700; font-size: 13px; text-decoration: none; border-radius: 9999px;">
            Reply to ${safeName} &rarr;
          </a>
        </div>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding: 20px 32px; background-color: #030914; border-top: 1px solid #172a46; text-align: center; font-size: 11px; color: #64748b;">
        This transmission was generated by the ACM Student Chapter VIT-AP Website Contact Form. Reply-To is set directly to ${safeEmail}.
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const plainTextContent = `New Contact Form Message - ACM VIT-AP
---------------------------------------------
From: ${trimmedName} (${trimmedEmail})
Subject: ${trimmedSubject}
Received: ${timestampFormatted} (IST)

Message:
${trimmedMessage}

---------------------------------------------
Reply directly to ${trimmedEmail}
`;

    // 7. Dispatch via Resend REST API
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [recipientEmail],
        reply_to: trimmedEmail,
        subject: `[ACM Contact] ${trimmedSubject}: ${trimmedName}`,
        html: htmlContent,
        text: plainTextContent,
      }),
    });

    const resendData = await resendResponse.json().catch(() => ({}));

    if (!resendResponse.ok) {
      console.error('Resend delivery failed:', resendData);
      return res.status(502).json({
        ok: false,
        error: resendData?.message || 'Failed to dispatch email via Resend provider.',
        recipientEmail,
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Your message has been successfully delivered to the ACM Student Chapter VIT-AP.',
      id: resendData.id,
    });
  } catch (error) {
    console.error('Server contact endpoint error:', error);
    return res.status(500).json({
      ok: false,
      error: 'An internal server error occurred while processing your message. Please try again or use direct mail.',
    });
  }
}
