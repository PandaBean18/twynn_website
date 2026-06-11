import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret } from 'firebase-functions/params';
import { Resend } from 'resend';
import { LRUCache } from 'lru-cache';

const resendApiKey = defineSecret('RESEND_API_KEY');

const emailThrottleCache = new LRUCache<string, boolean>({
  max: 1000,
  ttl: 1000 * 60 * 5
});

export const oncreatorwaitlistjoin = onDocumentCreated({
  document: 'creators/{docId}',
  secrets: [resendApiKey]
}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;
  
  const data = snapshot.data();
  if (!data || !data.email) return;

  const email = data.email.toLowerCase().trim();

  if (emailThrottleCache.has(email)) {
    console.warn(`Rate limit triggered for: ${email}. Skipping duplicate email dispatch.`);
    return;
  }

  emailThrottleCache.set(email, true);

  const resend = new Resend(resendApiKey.value());

  try {
    await resend.emails.send({
      from: 'Twynn <contact@ontwynn.com>',
      to: [email],
      subject: "Welcome to the Twynn Waitlist ✨",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; line-height: 1.6;">
          <h2 style="font-size: 22px; font-weight: 600;">Hey ${data.name || 'there'},</h2>
          <p>Thanks for requesting an invitation to join Twynn as a creator!</p>
          <p>We built Twynn to give you a private, dedicated workspace where you can track active brand deals, streamline calendar deliverables, and receive your milestone payments securely via escrow.</p>
          <p>We are rolling out early access slots in controlled stages. Keep a close eye on this inbox—we'll reach out as soon as your setup space is ready.</p>
          <br />
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 13px; color: #666;">Welcome to the future of content collaboration.<br /><strong>The Twynn Team</strong></p>
        </div>
      `
    });
    console.log(`Successfully sent confirmation mail to creator: ${email}`);
  } catch (error) {
    console.error('Error dispatching email via Resend SDK:', error);
  }
});

export const onbrandwaitlistjoin = onDocumentCreated({
  document: 'brands/{docId}',
  secrets: [resendApiKey]
}, async (event) => {
  const snapshot = event.data;
  if (!snapshot) return;

  const data = snapshot.data();
  if (!data || !data.email) return;

  const email = data.email.toLowerCase().trim();

  if (emailThrottleCache.has(email)) {
    console.warn(`Rate limit triggered for: ${email}. Skipping duplicate email dispatch.`);
    return;
  }

  emailThrottleCache.set(email, true);

  const resend = new Resend(resendApiKey.value());

  try {
    await resend.emails.send({
      from: 'Twynn <contact@ontwynn.com>',
      to: [email],
      subject: "Twynn Waitlist: Request Received 🏢",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111; line-height: 1.6;">
          <h2 style="font-size: 22px; font-weight: 600;">Hello ${data.name || 'there'},</h2>
          <p>Thank you for registering your agency or brand on the Twynn waitlist.</p>
          <p>Twynn is designed to provide complete oversight over your active creator campaigns, monitor production milestone flags, and secure your financial disbursements cleanly within an escrow pipeline.</p>
          <p>A team member will review your business registration profile shortly to issue your verified enterprise account credentials.</p>
          <br />
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 13px; color: #666;">Best regards,<br /><strong>The Twynn Team</strong></p>
        </div>
      `
    });
    console.log(`Successfully sent confirmation mail to brand: ${email}`);
  } catch (error) {
    console.error('Error dispatching email via Resend SDK:', error);
  }
});