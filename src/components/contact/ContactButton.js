"use client";

import { useContact } from './ContactModal';

/**
 * Any call-to-action that should open the contact popup.
 * Usable from server components: <ContactButton className="btn btn-primary" source="hero">…</ContactButton>
 */
export default function ContactButton({ children, className, source, title, prefill, ...props }) {
  const { open } = useContact();
  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
          window.gtag('event', 'open_contact', { source: source || 'unknown' });
        }
        open({ source, title, prefill });
      }}
      {...props}
    >
      {children}
    </button>
  );
}
