import nodemailer from 'nodemailer';
import { contactOptions, site } from '@/data/site';

const MAX_PER_WINDOW = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map(); // ip -> timestamps (best-effort, per server instance)

// Periodically drop empty/expired buckets so the Map can't grow unbounded.
function sweepHits() {
  const now = Date.now();
  for (const [ip, ts] of hits) {
    const recent = ts.filter((t) => now - t < WINDOW_MS);
    if (recent.length) hits.set(ip, recent);
    else hits.delete(ip);
  }
}

let transporter;
function getTransporter() {
  transporter ??= nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });
  return transporter;
}

function rateLimited(ip) {
  const now = Date.now();
  sweepHits();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

const escape = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneOf = (v, list) => (list.includes(v) ? v : '');

function validate(body) {
  const data = {
    name: clean(body.name, 80),
    email: clean(body.email, 120).toLowerCase(),
    phone: clean(body.phone, 20),
    company: clean(body.company, 120),
    project: oneOf(body.project, contactOptions.projects),
    budget: oneOf(body.budget, contactOptions.budgets),
    timeline: oneOf(body.timeline, contactOptions.timelines),
    message: clean(body.message, 2000),
    source: clean(body.source, 60),
  };
  const errors = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) errors.email = 'Please enter a valid email.';
  if (data.phone && !/^[+\d][\d\s-]{6,18}$/.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (!data.project) errors.project = 'Pick what you want to build.';
  return { data, errors };
}

function ownerEmail(d) {
  const rows = [
    ['Name', d.name],
    ['Email', d.email],
    ['Phone / WhatsApp', d.phone || '—'],
    ['Business', d.company || '—'],
    ['Wants', d.project],
    ['Budget', d.budget || '—'],
    ['Timeline', d.timeline || '—'],
    ['Sent from', d.source || 'website'],
  ];
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;color:#221f1b">
      <h2 style="margin:0 0 4px">New project enquiry</h2>
      <p style="margin:0 0 20px;color:#766c61">From the ${escape(site.name)} website</p>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px;border:1px solid #ebe4d9;background:#f8f4ee;width:150px;font-weight:600">${k}</td><td style="padding:8px 12px;border:1px solid #ebe4d9">${escape(v)}</td></tr>`
          )
          .join('')}
      </table>
      ${d.message ? `<h3 style="margin:24px 0 8px">Message</h3><p style="white-space:pre-wrap;margin:0;padding:12px;background:#f8f4ee;border-radius:8px">${escape(d.message)}</p>` : ''}
      <p style="margin-top:24px;color:#766c61;font-size:13px">Reply to this email to answer ${escape(d.name)} directly.</p>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + (d.message ? `\n\nMessage:\n${d.message}` : '');
  return { html, text };
}

function confirmationEmail(d) {
  const first = d.name.split(' ')[0];
  const html = `
    <div style="font-family:Inter,Arial,sans-serif;max-width:520px;color:#221f1b;line-height:1.6">
      <h2 style="margin:0 0 12px">Thanks, ${escape(first)} — we've got your enquiry.</h2>
      <p>We'll review what you need (<strong>${escape(d.project)}</strong>) and reply with a written quote — scope, price and delivery date — usually within one working day.</p>
      <p>If you have a brief, screenshots or a site you like, just reply to this email with them.</p>
      <p style="margin-top:24px">— Team ${escape(site.name)}</p>
    </div>`;
  const text = `Thanks, ${first} — we've got your enquiry for: ${d.project}.\n\nWe'll reply with a written quote (scope, price and delivery date), usually within one working day. Reply to this email with any brief or references.\n\n— Team ${site.name}`;
  return { html, text };
}

export async function POST(request) {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASSWORD are not set.');
    return Response.json({ ok: false, error: 'Email is not configured yet. Please try again later.' }, { status: 500 });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 415 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Spam traps: hidden field must stay empty and humans take more than 3s to fill the form.
  if (body.website || (body.startedAt && Date.now() - Number(body.startedAt) < 3000)) {
    return Response.json({ ok: true });
  }

  const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
  if (rateLimited(ip)) {
    return Response.json({ ok: false, error: 'Too many requests. Please try again in a few minutes.' }, { status: 429 });
  }

  const { data, errors } = validate(body);
  if (Object.keys(errors).length) {
    return Response.json({ ok: false, errors }, { status: 422 });
  }

  const from = `"${site.name} Website" <${process.env.GMAIL_USER}>`;
  // CONTACT_TO may list several inboxes, comma-separated; every one gets the enquiry.
  const to = (process.env.CONTACT_TO || process.env.GMAIL_USER)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    await getTransporter().sendMail({
      from,
      to,
      replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
      subject: `New enquiry: ${data.project} — ${data.name}`,
      ...ownerEmail(data),
    });
  } catch (err) {
    console.error('Contact form: failed to send enquiry', err);
    return Response.json(
      { ok: false, error: `Could not send right now. Please email us at ${site.email}.` },
      { status: 502 }
    );
  }

  // The enquiry is already delivered; a failed confirmation should not fail the request.
  try {
    await getTransporter().sendMail({
      from,
      to: data.email,
      replyTo: to,
      subject: `We've received your enquiry — ${site.name}`,
      ...confirmationEmail(data),
    });
  } catch (err) {
    console.error('Contact form: confirmation email failed', err);
  }

  return Response.json({ ok: true });
}
