import './_group.css';

function CurrentMeridian() {
  return <span className="current-meridian" aria-hidden="true" />;
}

export function Current() {
  return (
    <main className="lockup-stage">
      <section className="lockup-card" aria-label="Current TheOpenSource.NEWS logo">
        <div className="current-lockup">
          <CurrentMeridian />
          <span className="current-wordmark">
            <span className="current-the">The</span>
            <span className="current-open">Open</span>
            <span className="current-source">Source</span>
            <span className="current-news">.NEWS</span>
          </span>
        </div>
        <p className="current-tagline">Global news for a better tomorrow</p>
        <p className="brand-caption">Current app wordmark</p>
      </section>
    </main>
  );
}
