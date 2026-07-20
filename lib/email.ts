import { Resend } from "resend";
import nodemailer from "nodemailer";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.dockera.in";
const FROM = process.env.RESEND_FROM ?? process.env.SMTP_FROM ?? "Dockera <info@dockera.in>";

const resendApiKey = process.env.RESEND_API_KEY;

const resend = resendApiKey ? new Resend(resendApiKey) : null;

const smtpTransporter = !resend
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth:
        process.env.SMTP_USER && process.env.SMTP_PASS
          ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
          : undefined,
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    })
  : null;

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (resend) {
    const { error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
    });
    if (error) throw new Error(`Resend: ${error.message}`);
    return;
  }
  if (smtpTransporter) {
    await smtpTransporter.sendMail({ from: FROM, to, subject, html });
    return;
  }
  throw new Error(
    "No email provider configured. Set RESEND_API_KEY (recommended for Vercel) or SMTP_HOST/SMTP_USER/SMTP_PASS."
  );
}

export async function sendVerificationEmail(email: string, link: string): Promise<void> {
  await sendEmail(
    email,
    "Verify your Dockera account",
    `
      <p>Thanks for signing up for Dockera.</p>
      <p>Click the link below to verify your email. The link expires in 24 hours.</p>
      <p><a href="${link}">${link}</a></p>
      <p>If you didn't create an account, you can ignore this email.</p>
    `
  );
}

export async function sendOtpEmail(email: string, otp: string): Promise<void> {
  await sendEmail(
    email,
    "Your Dockera login code",
    `
      <p>Your one-time login code is:</p>
      <p style="font-size:24px;font-weight:bold;letter-spacing:4px">${otp}</p>
      <p>This code is valid for 10 minutes.</p>
      <p>If you didn't request this code, you can ignore this email.</p>
    `
  );
}

export function getVerificationLink(token: string): string {
  return `${SITE_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`;
}

export type SubscriptionInvoiceData = {
  firstName: string;
  lastName: string;
  email: string;
  subscriptionId: string;
  paymentId: string;
  planLabel: string;
  amount: string;
  date: string;
};

export async function sendSubscriptionInvoiceEmail(data: SubscriptionInvoiceData): Promise<void> {
  const fullName = [data.firstName, data.lastName].filter(Boolean).join(" ") || "Customer";
  const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice – Dockera Pro</title>
</head>
<body style="margin:0;font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;padding:24px;">
  <div style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,0.08);overflow:hidden;">
    <div style="background:#0f172a;color:#fff;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:1.5rem;font-weight:700;">Dockera</h1>
      <p style="margin:8px 0 0;font-size:0.875rem;opacity:0.9;">Invoice for your subscription</p>
    </div>
    <div style="padding:24px;">
      <p style="margin:0 0 16px;color:#475569;">Hi ${fullName},</p>
      <p style="margin:0 0 24px;color:#475569;">Thank you for subscribing to Dockera Pro. Here are your payment details.</p>
      <table style="width:100%;border-collapse:collapse;font-size:0.875rem;">
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:12px 0;color:#64748b;">Date</td>
          <td style="padding:12px 0;text-align:right;color:#0f172a;">${data.date}</td>
        </tr>
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:12px 0;color:#64748b;">Plan</td>
          <td style="padding:12px 0;text-align:right;color:#0f172a;">${data.planLabel}</td>
        </tr>
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:12px 0;color:#64748b;">Amount paid</td>
          <td style="padding:12px 0;text-align:right;font-weight:600;color:#0f172a;">${data.amount}</td>
        </tr>
        <tr style="border-bottom:1px solid #e2e8f0;">
          <td style="padding:12px 0;color:#64748b;">Subscription ID</td>
          <td style="padding:12px 0;text-align:right;color:#0f172a;word-break:break-all;">${data.subscriptionId}</td>
        </tr>
        <tr>
          <td style="padding:12px 0;color:#64748b;">Payment ID</td>
          <td style="padding:12px 0;text-align:right;color:#0f172a;word-break:break-all;">${data.paymentId}</td>
        </tr>
      </table>
      <p style="margin:24px 0 0;color:#64748b;font-size:0.8125rem;">If you have any questions, reply to this email or visit <a href="${SITE_URL}" style="color:#0f172a;">${SITE_URL}</a>.</p>
    </div>
    <div style="padding:16px 24px;background:#f1f5f9;text-align:center;">
      <p style="margin:0;font-size:0.75rem;color:#64748b;">Dockera – Document tools that work in your browser.</p>
    </div>
  </div>
</body>
</html>
  `.trim();

  await sendEmail(data.email, "Your Dockera Pro invoice", invoiceHtml);
}

export async function sendRenewalReminderEmail(
  email: string,
  firstName: string,
  renewalDate: string,
  planLabel: string
): Promise<void> {
  const fullName = firstName?.trim() || "there";
  await sendEmail(
    email,
    "Your Dockera Pro subscription is renewing soon",
    `
      <p>Hi ${fullName},</p>
      <p>Your Dockera Pro subscription (${planLabel}) will renew on <strong>${renewalDate}</strong>.</p>
      <p>No action is needed if you want to continue. We'll charge your saved payment method automatically.</p>
      <p>To cancel or update your subscription, visit <a href="${SITE_URL}/pricing">${SITE_URL}/pricing</a> and manage your plan.</p>
      <p>Thanks for using Dockera.</p>
    `
  );
}

export async function sendSubscriptionEndedEmail(email: string, firstName: string): Promise<void> {
  const fullName = firstName?.trim() || "there";
  await sendEmail(
    email,
    "Your Dockera Pro subscription has ended",
    `
      <p>Hi ${fullName},</p>
      <p>Your Dockera Pro subscription has ended. Pro features are no longer available on your account.</p>
      <p>To get Pro back, visit <a href="${SITE_URL}/pricing">${SITE_URL}/pricing</a> and subscribe again.</p>
      <p>Thanks for using Dockera.</p>
    `
  );
}
