import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleHelp,
  Globe2,
  Menu,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

const stories = [
  {
    id: 'river-restoration',
    title: 'A river returns to the people who live beside it',
    summary: 'After a decade of patient work, communities along the Wye are seeing fish, wetlands and public access return to a once-polluted stretch.',
    topic: 'Living systems',
    location: 'Wales, United Kingdom',
    time: 'Published 18 Apr 2025',
    author: 'The Open Meridian desk',
    art: 'blue',
  },
  {
    id: 'solar-library',
    title: 'A library in Nairobi turns sunlight into evening study hours',
    summary: 'A neighbourhood library has extended its opening hours with a small solar installation built and maintained by local apprentices.',
    topic: 'Shared infrastructure',
    location: 'Nairobi, Kenya',
    time: 'Editorial demo · 12 Apr 2025',
    author: 'Prototype desk',
    art: 'orange',
  },
  {
    id: 'seed-archive',
    title: 'The farmers keeping a region’s seeds in circulation',
    summary: 'An informal network is documenting heirloom varieties and returning them to fields, one season at a time.',
    topic: 'Food & land',
    location: 'Oaxaca, Mexico',
    time: 'Editorial demo · 05 Apr 2025',
    author: 'Prototype desk',
    art: 'rose',
  },
];

function PageMeta({ title, description }: { title: string; description: string }) {
  useEffect(() => {
    document.title = `${title} — TheOpenSource.NEWS`;
    const meta = document.querySelector('meta[name="description"]') ?? document.createElement('meta');
    meta.setAttribute('name', 'description');
    meta.setAttribute('content', description);
    document.head.appendChild(meta);
  }, [title, description]);
  return null;
}

function MeridianMark() {
  return <span className="meridian" aria-hidden="true" />;
}

function Wordmark() {
  return (
    <span className="wordmark" aria-label="TheOpenSource.NEWS">
      <MeridianMark />
      <span className="wordmark-the">The</span>
      <span className="wordmark-open">Open</span>
      <span className="wordmark-source">Source</span>
      <span className="wordmark-news">.NEWS</span>
    </span>
  );
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { href: '/', label: 'Record' },
    { href: '/principles', label: 'Principles' },
    { href: '/contribute', label: 'Contribute' },
    { href: '/about', label: 'About' },
  ];
  return (
    <header className="site-header">
      <div className="container-editorial header-inner">
        <Link href="/" className="wordmark" data-testid="link-home">
          <Wordmark />
        </Link>
        <nav className={`nav-links ${menuOpen ? 'mobile-open' : ''}`} aria-label="Primary navigation">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link"
              aria-current={location === item.href ? 'page' : undefined}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          <label className="sr-only" htmlFor="language-select">Language</label>
          <select id="language-select" className="language-select" defaultValue="EN" data-testid="select-language" aria-label="Language">
            <option>EN</option>
            <option>BN</option>
            <option>ES</option>
            <option>AR</option>
          </select>
          <Link href="/contribute" className="button-editorial button-ink" data-testid="link-header-contribute">
            First report <ArrowRight size={14} />
          </Link>
          <button
            type="button"
            className="icon-button mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="container-editorial mobile-nav-panel">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.label.toLowerCase()}`}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-editorial footer-grid">
        <div>
          <Link href="/" className="wordmark" data-testid="link-footer-home"><Wordmark /></Link>
          <p className="footer-copy">A calm, open public record of evidence-led progress. Built by one human, offered to humanity.</p>
        </div>
        <div>
          <h3>Explore</h3>
          <Link href="/" className="footer-link" data-testid="link-footer-record">The global record</Link>
          <Link href="/story/river-restoration" className="footer-link" data-testid="link-footer-story">Read a story</Link>
          <Link href="/contribute" className="footer-link" data-testid="link-footer-contribute">Make a first report</Link>
        </div>
        <div>
          <h3>Understand</h3>
          <Link href="/principles" className="footer-link" data-testid="link-footer-principles">Editorial principles</Link>
          <Link href="/about" className="footer-link" data-testid="link-footer-about">About & legal identity</Link>
        </div>
      </div>
      <div className="container-editorial footer-bottom">
        <span>Captain: Nadim · Owner: Human</span>
        <span>Prototype content clearly marked · © 2025</span>
      </div>
    </footer>
  );
}

function Shell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return (
    <div className="site-shell">
      <Header />
      <main className="site-main page-enter" key={location}>{children}</main>
      <Footer />
    </div>
  );
}

function SaveShare({ compact = false }: { compact?: boolean }) {
  const [saved, setSaved] = useState(false);
  const [shared, setShared] = useState(false);
  const share = async () => {
    if (navigator.share) {
      await navigator.share({ title: 'TheOpenSource.NEWS', url: window.location.href }).catch(() => undefined);
    } else {
      await navigator.clipboard?.writeText(window.location.href);
    }
    setShared(true);
    window.setTimeout(() => setShared(false), 1800);
  };
  return (
    <div className="story-actions">
      <button type="button" className={compact ? 'icon-button' : 'button-editorial'} onClick={() => setSaved((value) => !value)} aria-label={saved ? 'Remove from saved' : 'Save story'} data-testid="button-save-story">
        {saved ? <Check size={15} /> : <BookOpen size={15} />} {!compact && (saved ? 'Saved' : 'Save')}
      </button>
      <button type="button" className={compact ? 'icon-button' : 'button-editorial'} onClick={share} aria-label="Share story" data-testid="button-share-story">
        <Share2 size={15} /> {!compact && (shared ? 'Copied' : 'Share')}
      </button>
    </div>
  );
}

function StoryArt({ variant = 'blue', lead = false }: { variant?: string; lead?: boolean }) {
  return <div className={`row-art ${variant} ${lead ? 'lead-art' : ''}`} aria-label="Abstract editorial illustration"><span className={lead ? 'art-mark' : 'sr-only'}>{lead ? 'Wye' : 'Editorial illustration'}</span></div>;
}

function StoryRow({ story }: { story: typeof stories[number] }) {
  return (
    <article className="story-row" data-testid={`card-story-${story.id}`}>
      <div>
        <span className="story-kicker">{story.topic} · {story.location}</span>
        <Link href={`/story/${story.id}`} data-testid={`link-story-${story.id}`}>
          <h3>{story.title}</h3>
        </Link>
        <p>{story.summary}</p>
        <div className="story-meta"><span>{story.time}</span><span>·</span><span>{story.author}</span></div>
      </div>
      <StoryArt variant={story.art} />
    </article>
  );
}

function Home() {
  const [query, setQuery] = useState('');
  const [topic, setTopic] = useState('All');
  const [subscribed, setSubscribed] = useState(false);
  const topics = ['All', 'Living systems', 'Shared infrastructure', 'Food & land'];
  const filtered = useMemo(() => stories.filter((story) => {
    const matchesTopic = topic === 'All' || story.topic === topic;
    const haystack = `${story.title} ${story.summary} ${story.location}`.toLowerCase();
    return story.id !== 'river-restoration' && matchesTopic && haystack.includes(query.toLowerCase());
  }), [query, topic]);
  return (
    <>
      <PageMeta title="A public record for humanity" description="Discover evidence-led progress and see how reporting becomes trusted knowledge on TheOpenSource.NEWS." />
      <div className="container-editorial">
        <section className="hero-record">
          <div className="reveal">
            <div className="eyebrow">The global public record · 01 / 05 / 2025</div>
            <h1>A clearer view of a world still <em>in motion.</em></h1>
            <p className="hero-deck">TheOpenSource.NEWS is a calm, open publication for evidence-led progress — stories that remain connected to the people, sources and changes behind them.</p>
          </div>
          <aside className="hero-aside reveal reveal-delay-2">
            <div className="eyebrow">Our starting point</div>
            <p>“Evidence before assertion. Accountability without theatre.”</p>
            <small>Editorial demo content is used throughout this first release to show the shape of the record. It is not presented as live reporting.</small>
          </aside>
        </section>
        <div className="record-strip">
          <div className="ticker"><span className="live-dot" /> The record is open</div>
          <div className="record-strip-copy"><strong>3</strong> prototype stories · provenance visible by design</div>
        </div>
        <div className="search-row">
          <div className="search-box">
            <Search size={17} aria-hidden="true" />
            <label className="sr-only" htmlFor="record-search">Search the record</label>
            <input id="record-search" type="search" placeholder="Search places, themes, people…" value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-search-record" />
            {query && <button type="button" className="icon-button" onClick={() => setQuery('')} aria-label="Clear search" data-testid="button-clear-search"><X size={14} /></button>}
          </div>
          <div className="topic-links" aria-label="Filter stories">
            {topics.map((item) => <button type="button" key={item} className={`topic-pill ${topic === item ? 'active' : ''}`} onClick={() => setTopic(item)} data-testid={`button-topic-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}
          </div>
        </div>
        <section aria-labelledby="featured-title">
          <div className="section-heading"><h2 id="featured-title">A story to begin with</h2><span>01 / Field note</span></div>
          <article className="lead-story">
            <StoryArt lead />
            <div className="lead-copy">
              <div>
                <span className="story-kicker">Living systems · Wales, United Kingdom</span>
                <Link href="/story/river-restoration" data-testid="link-featured-story">
                  <h3>A river returns to the people who live beside it</h3>
                </Link>
                <p className="story-summary">After a decade of patient work, communities along the Wye are seeing fish, wetlands and public access return to a once-polluted stretch.</p>
              </div>
              <div>
                <div className="story-meta"><span className="status">Editorial demo</span><span>18 Apr 2025</span><span>·</span><span>The Open Meridian desk</span></div>
                <div style={{ marginTop: 17 }}><SaveShare /></div>
              </div>
            </div>
          </article>
        </section>
        <section className="story-grid" aria-labelledby="more-stories-title">
          <div>
            <div className="section-heading"><h2 id="more-stories-title">More threads</h2><span>{filtered.length} of {stories.length}</span></div>
            <div className="story-list">
              {filtered.length > 0 ? filtered.map((story) => <StoryRow key={story.id} story={story} />) : <div className="empty-state"><p>No threads match that search yet.</p><button type="button" className="button-editorial" onClick={() => { setQuery(''); setTopic('All'); }} data-testid="button-reset-search">Show the full record</button></div>}
            </div>
          </div>
          <aside className="index-aside">
            <div className="eyebrow">Open by design</div>
            <h2>See how a story earns its place.</h2>
            <p>Every report has a visible trail: who made it, what it rests on, what changed and where uncertainty remains.</p>
            <Link href="/principles" className="button-editorial" data-testid="link-home-principles">Read the principles <ArrowRight size={14} /></Link>
          </aside>
        </section>
        <section className="newsletter" aria-labelledby="newsletter-title">
          <div><div className="eyebrow">A quiet dispatch</div><h2 id="newsletter-title">A little more context, occasionally.</h2></div>
          {subscribed ? <div className="success-box" data-testid="status-newsletter-success"><strong>You’re on the prototype list.</strong><br />In a live edition, this would be where the next carefully sourced thread begins.</div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="newsletter-email">Your email<input id="newsletter-email" type="email" required placeholder="name@example.com" data-testid="input-newsletter-email" /></label><button type="submit" className="button-editorial button-ink" data-testid="button-newsletter-submit">Join the dispatch <ArrowRight size={14} /></button></form>}
        </section>
      </div>
    </>
  );
}

function ArticlePage() {
  return (
    <>
      <PageMeta title="A river returns to the people who live beside it" description="An editorial prototype showing evidence, provenance and corrections on TheOpenSource.NEWS." />
      <div className="container-editorial">
        <article>
          <header className="article-hero">
            <div className="eyebrow">Living systems · Wales, United Kingdom · Editorial demo</div>
            <h1>A river returns to the people who live beside it</h1>
            <p className="article-deck">After a decade of patient work, communities along the Wye are seeing fish, wetlands and public access return to a once-polluted stretch.</p>
            <div className="byline-row">
              <span className="avatar-initials">OM</span>
              <span><strong>The Open Meridian desk</strong><br />Editorial team · Reporter record shown as prototype</span>
              <span>Published 18 Apr 2025<br />Updated 21 Apr 2025</span>
              <span>Original language: English</span>
              <div className="article-tools"><SaveShare compact /></div>
            </div>
          </header>
          <div className="article-layout">
            <div className="article-body">
              <p>For years, the river was treated as a boundary: a line on a map, a problem passed between authorities, a place people remembered more vividly than they could visit. Along this stretch of the Wye, that relationship is beginning to change.</p>
              <p>This prototype story follows a simple question: what does repair look like when it is measured in seasons rather than announcements? The answer is visible in restored banks, returning habitat and the ordinary act of reaching the water again.</p>
              <div className="evidence-note"><strong><ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Evidence note · prototype</strong>This is a demonstration of the evidence interface. The claims, names and references below are editorial demo content and have not been independently verified for publication.</div>
              <h2>Repair is a long sentence</h2>
              <p>The work described here is intentionally assembled as a record rather than a victory lap. A report begins with a contributor’s account, then keeps its sources, editorial decisions and later revisions attached to the same thread.</p>
              <p>That shape matters. A reader should be able to distinguish what was observed, what was reported, what has supporting evidence and what remains a question. Confidence is not the same thing as certainty.</p>
              <h2>What we would keep checking</h2>
              <p>In a published version, the record would link directly to primary documents, field notes, data and named human editorial decisions. Translations would preserve the original language, and later changes would sit beside — never silently replace — the first version.</p>
              <div className="correction"><strong>Correction history</strong><p>No corrections in this prototype record. This line is intentionally visible to show where a future change log belongs.</p></div>
            </div>
            <aside className="article-aside" aria-label="Story provenance">
              <div className="aside-block"><h3>Status</h3><p><Check size={13} /> Published as editorial demo<br /><span>Not a verified live report</span></p></div>
              <div className="aside-block"><h3>Provenance</h3><ul><li><strong>Origin</strong><br />Prototype field note · 18 Apr</li><li><strong>Evidence</strong><br />To be attached in live workflow</li><li><strong>Editorial pass</strong><br />Human review required</li><li><strong>Translation</strong><br />English original · no translation</li></ul></div>
              <div className="aside-block"><h3>Sources</h3><p><CircleHelp size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} /> References are intentionally not represented as verified in this first release.</p></div>
              <Link href="/principles" className="button-editorial" data-testid="link-article-principles">How this works <ArrowRight size={14} /></Link>
            </aside>
          </div>
        </article>
      </div>
    </>
  );
}

function ContributePage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <>
      <PageMeta title="Make a first report" description="Submit a first report to the open publication pipeline. TheOpenSource.NEWS keeps the person, evidence and revisions connected." />
      <div className="container-editorial">
        <header className="page-hero"><div className="eyebrow">Participation / first report</div><h1>Start with what you <em>noticed.</em></h1><p>A report does not arrive as a finished headline. It enters a transparent pipeline where evidence, context and human judgment can meet.</p></header>
        <div className="contribute-layout">
          <form className="report-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
            <div className="form-row"><label htmlFor="report-title">Working title<input className="field-input" id="report-title" required placeholder="What happened, in plain language?" data-testid="input-report-title" /></label></div>
            <div className="form-row"><label htmlFor="report-place">Where did you notice it?<input className="field-input" id="report-place" required placeholder="City, region or place" data-testid="input-report-place" /></label></div>
            <div className="form-row"><label htmlFor="report-body">Your account<textarea className="field-textarea" id="report-body" required placeholder="Tell us what you saw, heard or can document…" data-testid="textarea-report-body" /></label><p className="form-help">Keep observation separate from interpretation. In a live workflow, this original version would remain part of the record.</p></div>
            <div className="form-row"><label htmlFor="report-source">Evidence or source links<input className="field-input" id="report-source" placeholder="A document, dataset, image or person we can contact" data-testid="input-report-source" /></label></div>
            <label className="check-row"><input type="checkbox" required data-testid="checkbox-report-acknowledge" /><span>I understand this is a prototype entry form. Submitting here does not publish a report or establish verification.</span></label>
            <div style={{ marginTop: 24 }}><button type="submit" className="button-editorial button-ink" data-testid="button-submit-report">Place in prototype pipeline <ArrowRight size={14} /></button></div>
            {submitted && <div className="success-box" data-testid="status-report-success"><strong>Entry recorded in the interface.</strong><br />A real submission would receive a timestamp, contributor identity and review state. No report was sent from this prototype.</div>}
          </form>
          <aside className="contribute-aside">
            <div className="eyebrow">The first report</div><h2>Participation with a paper trail.</h2><p>You do not need a newsroom job to contribute. You do need to be clear about what you know, what you do not know and where your evidence begins.</p>
            <div className="pipeline">
              {['Submitted', 'Pipeline draft', 'Evidence review', 'Human editorial review', 'Published or returned'].map((step, index) => <div className="pipeline-step" key={step}><span className="step-number">{index + 1}</span>{step}</div>)}
            </div>
            <p style={{ marginTop: 20 }}><Sparkles size={14} style={{ verticalAlign: 'middle', marginRight: 5 }} /> AI may assist with structure and language. It never becomes the sole authority.</p>
          </aside>
        </div>
      </div>
    </>
  );
}

function PrinciplesPage() {
  const agents = [
    ['01', 'Claim extraction', 'Finds factual claims without deciding their truth.'],
    ['02', 'Evidence analysis', 'Maps each claim to supporting material.'],
    ['03', 'Contradiction check', 'Looks for internal conflicts and missing context.'],
    ['04', 'Language edit', 'Improves clarity without changing meaning.'],
    ['05', 'Framing audit', 'Flags loaded language and assumptions.'],
    ['06', 'Safety screen', 'Escalates privacy, legal and harm concerns to humans.'],
  ];
  return (
    <>
      <PageMeta title="Editorial principles" description="How TheOpenSource.NEWS handles evidence, corrections, AI assistance, human accountability and languages." />
      <div className="container-editorial">
        <header className="page-hero"><div className="eyebrow">The method / public documentation</div><h1>Trust is a <em>visible process.</em></h1><p>Openness is not a shortcut around standards. It is the commitment to show the work: evidence, uncertainty, provenance, translation and correction.</p></header>
        <div className="principle-layout">
          <nav className="sticky-index" aria-label="Principles sections"><a href="#evidence" data-testid="link-principle-evidence">Evidence</a><a href="#accountability" data-testid="link-principle-accountability">Accountability</a><a href="#machine" data-testid="link-principle-machine">Human + machine</a><a href="#languages" data-testid="link-principle-languages">Languages</a></nav>
          <div className="principle-content">
            <section id="evidence"><div className="eyebrow">01 / Before assertion</div><h2>Evidence before assertion.</h2><p>We distinguish a fact supported by evidence from a report that still requires verification, an analysis that interprets, and an opinion that belongs to its author. Uncertainty is a useful part of the record, not an editorial defect.</p><div className="principle-callout">“Never make uncertainty disappear merely to make an article look confident.”</div></section>
            <section id="accountability"><div className="eyebrow">02 / The audit trail</div><h2>Corrections strengthen the record.</h2><p>Original versions remain connected to revisions. A change carries a time, a reason and a category: factual, linguistic, contextual or editorial. Readers should be able to understand what changed without having to trust a quiet rewrite.</p><div className="accountability-card"><div className="eyebrow">A public promise</div><p>Every story is designed to answer: who reported this, when, with what evidence, who reviewed it and what happened afterward?</p></div></section>
            <section id="machine"><div className="eyebrow">03 / Assisted, never owned</div><h2>Technology helps. Humans answer.</h2><p>Specialised AI tools can extract claims, compare language or surface questions. Their recommendations remain recommendations, with an audit trail. Human editors retain responsibility for publication, harm, correction and meaning.</p><div className="agent-grid">{agents.map(([number, title, description]) => <div className="agent-cell" key={number}><span className="eyebrow">{number}</span><strong>{title}</strong><span>{description}</span></div>)}</div></section>
            <section id="languages"><div className="eyebrow">04 / Many originals</div><h2>Language is not a translation layer.</h2><p>The publication is Unicode-first and designed for original-language reporting, RTL and LTR writing, language-specific typography and cross-language relationships. A translation will always identify its source language, translated language, translator or system and timestamp. It will never erase the original.</p><p><Globe2 size={15} style={{ verticalAlign: 'middle', marginRight: 5 }} /> Current interface prototype: English labels with language architecture demonstrated. Multilingual editorial operations are not yet live.</p></section>
          </div>
        </div>
      </div>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageMeta title="About TheOpenSource.NEWS" description="The philosophy, human steering and legal representation behind TheOpenSource.NEWS." />
      <div className="container-editorial">
        <header className="page-hero"><div className="eyebrow">About / a public gift</div><h1>One human steers. <em>Humanity is the horizon.</em></h1><p>TheOpenSource.NEWS is being built as a public record — open to participation, accountable to evidence and designed to outlast the person who began it.</p></header>
        <div className="about-grid">
          <aside className="about-quote">“I steer the ship, but the ship is not mine. <em>Humanity owns the destination.</em>”</aside>
          <div className="about-copy">
            <section><div className="eyebrow">The philosophy</div><h2>Captain: Nadim · Owner: Human</h2><p>“Owner: Human” is a philosophical statement about the platform’s intended centre of gravity: people collectively, rather than a country, party, government, institution or private empire. It is not a legal corporate ownership claim. Nadim is the human captain steering the work.</p></section>
            <section><div className="eyebrow">The legal representative</div><h2>A real company, described precisely.</h2><p>TheOpenSource.NEWS is represented in this prototype by UK SCHOOL OF ARTIFICIAL INTELLIGENCE LTD (company no. 17041560), an active UK company registered with Companies House.</p><div className="legal-card"><strong>Registered activities include</strong><p>Newspaper publishing · Web portals · Investigation activities · Educational support services</p></div><p>Companies House registration is not described here as a separate licence or regulatory approval. This page is a careful representation of the company identity, not a claim of editorial certification.</p></section>
            <section><div className="eyebrow">The invitation</div><h2>A record worth returning to.</h2><p>Readers can inspect the work. Contributors can enter the process. Editors can explain decisions. The long-term ambition is not to manufacture certainty, but to leave humanity with a more legible, continuously improving account of what happened.</p><Link href="/contribute" className="button-editorial button-ink" data-testid="link-about-contribute">Make a first report <ArrowRight size={14} /></Link></section>
          </div>
        </div>
      </div>
    </>
  );
}

function Router() {
  return (
    <ErrorBoundary resetKey={useLocation()[0]}>
      <Shell>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/story/river-restoration" component={ArticlePage} />
          <Route path="/contribute" component={ContributePage} />
          <Route path="/principles" component={PrinciplesPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFound} />
        </Switch>
      </Shell>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;