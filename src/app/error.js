'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Error({ error, reset }) {
  return (
    <main
      id="main"
      style={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
      }}
    >
      <div style={{ maxWidth: 560, textAlign: 'center' }}>
        <h1 style={{ marginBottom: 12 }}>Something went wrong</h1>
        <p style={{ marginBottom: 24, color: 'var(--muted)' }}>
          {error?.message || 'An unexpected error occurred while loading this page.'}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to home <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </main>
  );
}
