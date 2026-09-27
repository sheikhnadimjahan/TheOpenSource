import './_group.css';

function GlobeMark() {
  return (
    <svg className="brand-globe" viewBox="0 0 100 100" fill="none" role="img" aria-label="Open globe mark">
      <defs>
        <linearGradient id="globe-shine" x1="18" y1="10" x2="79" y2="88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b8ed0" />
          <stop offset="1" stopColor="#103e73" />
        </linearGradient>
        <clipPath id="globe-clip"><circle cx="50" cy="50" r="34" /></clipPath>
      </defs>
      <circle cx="50" cy="50" r="35" fill="url(#globe-shine)" />
      <g clipPath="url(#globe-clip)" stroke="rgba(255,255,255,.42)" strokeWidth=".8">
        <ellipse cx="50" cy="50" rx="16" ry="34" />
        <ellipse cx="50" cy="50" rx="29" ry="34" />
        <path d="M16 39c18 7 50 7 68 0M16 50c18 5 50 5 68 0M16 61c18-7 50-7 68 0" />
      </g>
      <path d="M23 38c5-7 12-11 18-13l4 7-8 5-2 8-8 2-4-9Zm28-12 10 2 6 7-4 7-9-2-5-7 2-7Zm9 25 10 2 4 8-9 6-10-4-1-7 6-5Z" fill="rgba(250,248,239,.92)" />
      <circle cx="50" cy="50" r="35" stroke="rgba(11,29,54,.4)" strokeWidth="1.4" />
      <path d="M10 55C27 71 73 76 92 42" stroke="#eef0ed" strokeWidth="8" strokeLinecap="round" transform="rotate(-14 50 50)" />
      <path d="M10 55C27 71 73 76 92 42" stroke="#19589a" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-14 50 50)" />
    </svg>
  );
}

export function Polished() {
  return (
    <main className="lockup-stage">
      <section className="lockup-card" aria-label="Polished TheOpenSource.NEWS logo">
        <div className="brand-lockup">
          <GlobeMark />
          <div className="brand-copy">
            <div className="brand-name">
              <span className="the">The</span>
              <span className="open">Open</span>
              <span className="source">Source</span>
              <span className="news">.NEWS</span>
            </div>
            <div className="brand-tagline">Global news for a better tomorrow</div>
          </div>
        </div>
        <p className="brand-caption">Polished royal wordmark direction</p>
      </section>
    </main>
  );
}