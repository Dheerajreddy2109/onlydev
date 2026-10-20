import Link from 'next/link';
import Icon from '@/components/Icon';

export default function NotFound() {
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
        <h1 style={{ marginBottom: 12 }}>Page not found</h1>
        <p style={{ marginBottom: 24, color: 'var(--muted)' }}>
          The page you were looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary">
          Back to home <Icon name="arrow" />
        </Link>
      </div>
    </main>
  );
}
