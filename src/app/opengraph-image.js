import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = 'Only Dev — websites and web apps built to win customers';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The preview shown when the site is shared on WhatsApp, LinkedIn, X and the like. Generated at build time.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          backgroundColor: '#fbf9f5',
          backgroundImage:
            'radial-gradient(circle at 88% 8%, rgba(236, 214, 178, 0.95), rgba(251, 249, 245, 0) 46%), radial-gradient(circle at 0% 100%, rgba(242, 220, 210, 0.85), rgba(251, 249, 245, 0) 42%)',
          color: '#221f1b',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 32 32">
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#cfab74" />
                <stop offset="1" stopColor="#87642f" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="10" fill="url(#g)" />
            <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
              <circle cx="10.5" cy="18.5" r="3.9" />
              <circle cx="21.5" cy="18.5" r="3.9" />
              <path d="M25.4 8.5v14" />
            </g>
          </svg>
          <div style={{ display: 'flex', fontSize: 40, letterSpacing: '-0.03em' }}>{site.name}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ display: 'flex', maxWidth: 920, fontSize: 80, lineHeight: 1.02, letterSpacing: '-0.045em' }}>
            Websites & web apps built to win customers.
          </div>
          <div style={{ display: 'flex', fontSize: 28, color: '#766c61' }}>
            Custom design · Next.js & React · Fixed written quote · You own the code
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 24, color: '#82612f' }}>
          <span>{new URL(site.url).host}</span>
          <span>Websites · Web apps · SaaS</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
