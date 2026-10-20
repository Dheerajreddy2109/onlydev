// The Only Dev mark ("od" drawn on a gold tile) and wordmark.
// `id` keeps the SVG gradient id unique when the logo appears more than once on a page.
export default function Logo({ id = 'logo' }) {
  const gradient = `${id}-gold`;
  return (
    <span className="logo">
      <svg className="logo-mark" viewBox="0 0 32 32" width="34" height="34" aria-hidden="true">
        <defs>
          <linearGradient id={gradient} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#cfab74" />
            <stop offset="1" stopColor="#87642f" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="10" fill={`url(#${gradient})`} />
        <g fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round">
          <circle cx="10.5" cy="18.5" r="3.9" />
          <circle cx="21.5" cy="18.5" r="3.9" />
          <path d="M25.4 8.5v14" />
        </g>
      </svg>
      <span className="logo-word">
        Only<em>Dev</em>
      </span>
    </span>
  );
}
