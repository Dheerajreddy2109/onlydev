"use client";

import React, { useEffect, useId, useRef, useState } from 'react';
import Icon from '../Icon';
import { contactOptions } from '@/data/site';
import '../../css/Contact.css';

const empty = { project: '', budget: '', timeline: '', name: '', email: '', phone: '', company: '', message: '' };

function Chips({ label, options, value, onChange, error }) {
  const id = useId();
  return (
    <fieldset className="cf-field">
      <legend id={id}>{label}</legend>
      <div className="cf-chips" role="radiogroup" aria-labelledby={id}>
        {options.map((o) => (
          <button
            type="button"
            key={o}
            role="radio"
            aria-checked={value === o}
            className={value === o ? 'on' : ''}
            onClick={() => onChange(value === o ? '' : o)}
          >
            {value === o && <Icon name="check" size={14} strokeWidth={2.6} />}
            {o}
          </button>
        ))}
      </div>
      {error && <p className="cf-error">{error}</p>}
    </fieldset>
  );
}

function Input({ label, error, optional, as = 'input', ...props }) {
  const Tag = as;
  return (
    <label className={`cf-field ${error ? 'has-error' : ''}`}>
      <span>
        {label} {optional && <em>optional</em>}
      </span>
      <Tag {...props} aria-invalid={!!error} />
      {error && <p className="cf-error">{error}</p>}
    </label>
  );
}

/**
 * Two-step enquiry form posting to /api/contact.
 * prefill: { project, budget, timeline, company, message }, source: where it was opened from.
 */
export default function ContactForm({ prefill, source = 'website', onDone, autoFocus = false }) {
  const [form, setForm] = useState(() => ({ ...empty, ...prefill }));
  const [step, setStep] = useState(prefill?.project ? 2 : 1);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [startedAt] = useState(() => Date.now());
  const trapRef = useRef(null);
  const firstFieldRef = useRef(null);

  useEffect(() => {
    if (step === 2 && (autoFocus || prefill?.project)) firstFieldRef.current?.focus();
  }, [step, autoFocus, prefill?.project]);

  const set = (k) => (v) => {
    setForm((f) => ({ ...f, [k]: typeof v === 'string' ? v : v.target.value }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const next = () => {
    if (!form.project) {
      setErrors({ project: 'Pick what you want to build — or choose “Not sure yet”.' });
      return;
    }
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) errs.email = 'Please enter a valid email.';
    if (form.phone && !/^[+\d][\d\s-]{6,18}$/.test(form.phone.trim())) errs.phone = 'Please enter a valid phone number.';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setStatus('sending');
    setServerError('');
    // Lightweight analytics hook; no-ops when GA isn't configured.
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'submit_lead_form', { source, project: form.project });
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source, startedAt, website: trapRef.current?.value || '' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) {
          setErrors(data.errors);
          if (data.errors.project) setStep(1);
        }
        setServerError(data.error || 'Something went wrong. Please try again.');
        setStatus('error');
        return;
      }
      setStatus('sent');
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div className="cf-success" role="status">
        <span className="cf-success-icon"><Icon name="check" size={30} strokeWidth={2.6} /></span>
        <h3>Thanks, {form.name.trim().split(' ')[0]}! We’ve got it.</h3>
        <p>
          A confirmation is on its way to <strong>{form.email}</strong>. Here’s what happens next:
        </p>
        <ol>
          <li><b>Today</b> — we review your {form.project.toLowerCase()} requirements.</li>
          <li><b>Within 24 hours</b> — you get a written quote: scope, price and delivery date.</li>
          <li><b>Your call</b> — no payment or commitment until you approve it.</li>
        </ol>
        {onDone && (
          <button type="button" className="btn btn-primary" onClick={onDone}>
            Back to the site
          </button>
        )}
      </div>
    );
  }

  return (
    <form className="cf" onSubmit={submit} noValidate>
      <div className="cf-progress" aria-hidden="true">
        <span className="on" />
        <span className={step === 2 ? 'on' : ''} />
      </div>
      <p className="cf-step">Step {step} of 2 · {step === 1 ? 'Your project' : 'Your details'}</p>

      {step === 1 ? (
        <div className="cf-body" key="s1">
          <Chips label="What do you want to build?" options={contactOptions.projects} value={form.project} onChange={set('project')} error={errors.project} />
          <Chips label="Budget" options={contactOptions.budgets} value={form.budget} onChange={set('budget')} />
          <Chips label="When do you want to launch?" options={contactOptions.timelines} value={form.timeline} onChange={set('timeline')} />
          <button type="button" className="btn btn-primary cf-submit" onClick={next}>
            Continue <Icon name="arrow" />
          </button>
        </div>
      ) : (
        <div className="cf-body" key="s2">
          <button type="button" className="cf-summary" onClick={() => setStep(1)}>
            <span>
              <b>{form.project}</b>
              {[form.budget, form.timeline].filter(Boolean).join(' · ')}
            </span>
            <em>Edit</em>
          </button>

          <div className="cf-row">
            <Input label="Your name" value={form.name} onChange={set('name')} error={errors.name} autoComplete="name" maxLength={80} placeholder="Priya Sharma" ref={firstFieldRef} />
            <Input label="Email" type="email" value={form.email} onChange={set('email')} error={errors.email} autoComplete="email" maxLength={120} placeholder="priya@business.com" />
          </div>
          <div className="cf-row">
            <Input label="Phone / WhatsApp" optional type="tel" value={form.phone} onChange={set('phone')} error={errors.phone} autoComplete="tel" maxLength={20} placeholder="+91 98765 43210" />
            <Input label="Business or website" optional value={form.company} onChange={set('company')} maxLength={120} placeholder="SmileCare Dental, Pune" />
          </div>
          <Input
            as="textarea"
            label="Tell us a little more"
            optional
            rows={3}
            value={form.message}
            onChange={set('message')}
            maxLength={2000}
            placeholder="e.g. Patients should book appointments and pay online. We like the style of example.com."
          />

          {/* Honeypot: hidden from people, filled by bots. */}
          <input ref={trapRef} type="text" name="website" tabIndex={-1} autoComplete="off" className="cf-trap" aria-hidden="true" />

          {serverError && <p className="cf-server-error" role="alert">{serverError}</p>}

          <div className="cf-actions">
            <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit" className="btn btn-primary cf-submit" disabled={status === 'sending'}>
              {status === 'sending' ? <span className="cf-spinner" /> : <Icon name="mail" />}
              {status === 'sending' ? 'Sending…' : 'Get my free quote'}
            </button>
          </div>
          <p className="cf-fine">
            <Icon name="lock" size={13} /> No spam, no sharing. We reply within one working day.
          </p>
        </div>
      )}
    </form>
  );
}
