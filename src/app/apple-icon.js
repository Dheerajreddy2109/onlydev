import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

// Home-screen icon: the "od" mark full-bleed (iOS rounds the corners itself).
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: 'linear-gradient(135deg, #cfab74, #87642f)',
        }}
      >
        <svg width="180" height="180" viewBox="0 0 32 32">
          <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
            <circle cx="10.5" cy="18.5" r="3.9" />
            <circle cx="21.5" cy="18.5" r="3.9" />
            <path d="M25.4 8.5v14" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
