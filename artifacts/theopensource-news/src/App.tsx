import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  Activity,
  BookOpen,
  ChevronRight,
  Clock3,
  Building2,
  Check,
  CircleHelp,
  ChevronDown,
  Compass,
  Globe2,
  Languages,
  Map,
  Menu,
  Radio,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { Link, Route, Switch, useLocation, useParams, Router as WouterRouter } from 'wouter';
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
    time: 'Prototype edition · date not live',
    author: 'The Open Meridian desk',
    art: 'blue',
  },
  {
    id: 'solar-library',
    title: 'A library in Nairobi turns sunlight into evening study hours',
    summary: 'A neighbourhood library has extended its opening hours with a small solar installation built and maintained by local apprentices.',
    topic: 'Shared infrastructure',
    location: 'Nairobi, Kenya',
    time: 'Editorial demo · date not live',
    author: 'Prototype desk',
    art: 'orange',
  },
  {
    id: 'seed-archive',
    title: 'The farmers keeping a region’s seeds in circulation',
    summary: 'An informal network is documenting heirloom varieties and returning them to fields, one season at a time.',
    topic: 'Food & land',
    location: 'Oaxaca, Mexico',
    time: 'Editorial demo · date not live',
    author: 'Prototype desk',
    art: 'rose',
  },
  {
    id: 'health-map',
    title: 'Community clinics are building their own public health maps',
    summary: 'Local health workers are combining lived experience with open data to show where care is missing and what is changing.',
    topic: 'Health',
    location: 'Kigali, Rwanda',
    time: 'Editorial demo · date not live',
    author: 'Global health desk',
    art: 'green',
  },
  {
    id: 'coastal-commons',
    title: 'A coastal commons asks who gets to decide what is protected',
    summary: 'Fishermen, scientists and residents are testing a shared approach to a shoreline under pressure from heat and development.',
    topic: 'Climate',
    location: 'Chittagong, Bangladesh',
    time: 'Prototype edition · date not live',
    author: 'Climate desk',
    art: 'blue',
  },
  {
    id: 'repair-economy',
    title: 'The repair economy is giving old devices a second public life',
    summary: 'Small workshops are extending the life of electronics while teaching practical skills that rarely appear in official economic figures.',
    topic: 'Business & technology',
    location: 'Bengaluru, India',
    time: 'Editorial demo · date not live',
    author: 'Future desk',
    art: 'gold',
  },
  {
    id: 'language-archive',
    title: 'A language archive is being built one family recording at a time',
    summary: 'Young researchers are preserving everyday speech, songs and local memory before the last fluent speakers disappear.',
    topic: 'Culture & ideas',
    location: 'Oaxaca, Mexico',
    time: 'Editorial demo · date not live',
    author: 'Culture desk',
    art: 'rose',
  },
  {
    id: 'night-transit',
    title: 'The cities making night travel safer without making it louder',
    summary: 'A new generation of transit experiments is treating late-night mobility as a public service rather than an afterthought.',
    topic: 'Cities',
    location: 'Melbourne, Australia',
    time: 'Editorial demo · date not live',
    author: 'Cities desk',
    art: 'ink',
  },
];

const networkNodes = [
  { id: 'dhaka', city: 'Dhaka', country: 'Bangladesh', region: 'South Asia', language: 'বাংলা · English', type: 'Community node', status: 'Prototype activity', reporters: 4, x: '67%', y: '44%' },
  { id: 'london', city: 'London', country: 'United Kingdom', region: 'UK / Europe', language: 'English', type: 'Editorial node', status: 'Prototype activity', reporters: 6, x: '48%', y: '29%' },
  { id: 'nairobi', city: 'Nairobi', country: 'Kenya', region: 'Africa', language: 'Kiswahili · English', type: 'Community node', status: 'Prototype activity', reporters: 3, x: '54%', y: '61%' },
  { id: 'oaxaca', city: 'Oaxaca', country: 'Mexico', region: 'Latin America', language: 'Español', type: 'Independent node', status: 'Prototype activity', reporters: 2, x: '24%', y: '55%' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', region: 'East Asia', language: '日本語 · English', type: 'Independent node', status: 'Prototype activity', reporters: 5, x: '84%', y: '40%' },
  { id: 'amman', city: 'Amman', country: 'Jordan', region: 'Middle East', language: 'العربية · English', type: 'Community node', status: 'Prototype activity', reporters: 2, x: '59%', y: '40%' },
];

const people = [
  { id: 'samira-rahman', name: 'Samira Rahman', role: 'Correspondent', status: 'Reporter · prototype identity', location: 'Dhaka, Bangladesh', languages: 'বাংলা · English', record: 'First report pathway demonstrated', initials: 'SR' },
  { id: 'thomas-evans', name: 'Thomas Evans', role: 'Editor', status: 'Editorial role · prototype identity', location: 'London, United Kingdom', languages: 'English · Cymraeg', record: 'Human review pathway demonstrated', initials: 'TE' },
  { id: 'amina-wanjiku', name: 'Amina Wanjiku', role: 'Community contributor', status: 'Contributor · prototype identity', location: 'Nairobi, Kenya', languages: 'Kiswahili · English', record: 'Evidence contribution pathway demonstrated', initials: 'AW' },
  { id: 'lucia-santiago', name: 'Lucía Santiago', role: 'Researcher', status: 'Research role · prototype identity', location: 'Oaxaca, Mexico', languages: 'Español', record: 'Source mapping pathway demonstrated', initials: 'LS' },
  { id: 'kenji-mori', name: 'Kenji Mori', role: 'Photographer', status: 'Visual contributor · prototype identity', location: 'Tokyo, Japan', languages: '日本語 · English', record: 'Media provenance pathway demonstrated', initials: 'KM' },
];

const organizations = [
  { id: 'meridian-desk', name: 'The Open Meridian desk', type: 'Central editorial node', region: 'Global / distributed', members: ['TE', 'SR'], intent: 'Human editorial review and provenance stewardship' },
  { id: 'dhaka-community', name: 'Dhaka community node', type: 'Community newsroom node', region: 'South Asia', members: ['SR'], intent: 'Local observation connected to a global record' },
  { id: 'wye-field', name: 'Wye field circle', type: 'Independent reporting node', region: 'UK / Europe', members: ['TE'], intent: 'Place-based environmental reporting and evidence' },
  { id: 'east-africa', name: 'East Africa learning node', type: 'Partner-ready node', region: 'Africa', members: ['AW'], intent: 'Future interoperability with local publishing systems' },
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
  return (
    <svg className="meridian" viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle cx="50" cy="50" r="34" fill="#19589a" />
      <g stroke="rgba(255,255,255,.42)" strokeWidth=".8">
        <ellipse cx="50" cy="50" rx="16" ry="34" />
        <ellipse cx="50" cy="50" rx="29" ry="34" />
        <path d="M16 39c18 7 50 7 68 0M16 50c18 5 50 5 68 0M16 61c18-7 50-7 68 0" />
      </g>
      <path d="M23 38c5-7 12-11 18-13l4 7-8 5-2 8-8 2-4-9Zm28-12 10 2 6 7-4 7-9-2-5-7 2-7Zm9 25 10 2 4 8-9 6-10-4-1-7 6-5Z" fill="rgba(250,248,239,.92)" />
      <circle cx="50" cy="50" r="34" stroke="rgba(11,29,54,.4)" strokeWidth="1.4" />
      <path d="M10 55C27 71 73 76 92 42" stroke="#eef0ed" strokeWidth="8" strokeLinecap="round" transform="rotate(-14 50 50)" />
      <path d="M10 55C27 71 73 76 92 42" stroke="#19589a" strokeWidth="1.2" strokeLinecap="round" transform="rotate(-14 50 50)" />
    </svg>
  );
}

function Wordmark({ showTagline = true }: { showTagline?: boolean }) {
  return (
    <span className="brand-lockup" aria-label="TheOpenSource.NEWS">
      <span className="brand-emblem">
        <MeridianMark />
      </span>
      <span className="brand-copy">
        <span className="brand-name">
          <span className="brand-the">The</span>
          <span className="brand-open">Open</span>
          <span className="brand-source">Source</span>
          <span className="brand-news">.NEWS</span>
        </span>
        {showTagline && <span className="brand-tagline">Global news for a better tomorrow</span>}
      </span>
    </span>
  );
}

function Header() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = [
    { href: '/', label: 'Home' },
    { href: '/network', label: 'Network' },
    { href: '/people', label: 'Contributors' },
    { href: '/principles', label: 'Standards' },
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
          <a href="/#latest" className="header-search" data-testid="link-header-search">
            <Search size={14} /> <span>Search</span>
          </a>
          <label className="sr-only" htmlFor="language-select">Language</label>
          <select id="language-select" className="language-select" defaultValue="EN" data-testid="select-language" aria-label="Language">
            <option>EN</option>
            <option>BN</option>
            <option>ES</option>
            <option>AR</option>
          </select>
          <Link href="/contribute" className="button-editorial button-ink" data-testid="link-header-contribute">
            Contribute <ArrowRight size={14} />
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
      <nav className="publication-nav" aria-label="News sections">
        <div className="container-editorial publication-nav-inner">
          <span className="publication-nav-name">News</span>
          <a href="/#world" data-testid="link-publication-world">World</a>
          <a href="/#latest" data-testid="link-publication-latest">Latest</a>
          <a href="/#climate" data-testid="link-publication-climate">Climate</a>
          <a href="/#business" data-testid="link-publication-business">Business &amp; technology</a>
          <a href="/#culture" data-testid="link-publication-culture">Culture &amp; ideas</a>
          <Link href="/network" data-testid="link-publication-network">Global network</Link>
          <Link href="/principles" data-testid="link-publication-standards">Standards</Link>
        </div>
      </nav>
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
          <Link href="/network" className="footer-link" data-testid="link-footer-network">Global network</Link>
          <Link href="/people" className="footer-link" data-testid="link-footer-people">People in the network</Link>
          <Link href="/organizations" className="footer-link" data-testid="link-footer-organizations">Organizations & nodes</Link>
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
        <span>Prototype content clearly marked · no live publication date</span>
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

function EcosystemNav() {
  const items = [
    { href: '/', label: 'Global', icon: Globe2 },
    { href: '/network', label: 'Regions', icon: Map },
    { href: '/network', label: 'Developing', icon: Activity },
    { href: '/story/river-restoration', label: 'Stories', icon: BookOpen },
    { href: '/people', label: 'People', icon: Users },
    { href: '/organizations', label: 'Newsrooms', icon: Building2 },
    { href: '/network', label: 'Languages', icon: Languages },
    { href: '/network', label: 'Network activity', icon: Compass },
  ];
  return (
    <nav className="ecosystem-nav" aria-label="Global discovery">
      <div className="eyebrow">Explore the ecosystem</div>
      <div className="ecosystem-nav-links">
        {items.map(({ href, label, icon: Icon }) => (
          <Link key={`${href}-${label}`} href={href} className="ecosystem-link" data-testid={`link-ecosystem-${label.toLowerCase().replaceAll(' ', '-')}`}>
            <Icon size={15} /> <span>{label}</span><ArrowRight size={12} />
          </Link>
        ))}
      </div>
    </nav>
  );
}

function NetworkScale() {
  return (
    <section className="network-scale" aria-labelledby="network-scale-title">
      <div className="network-scale-copy">
        <div className="eyebrow">A network, not a feed</div>
        <h2 id="network-scale-title">Many places. One accountable record.</h2>
        <p>The eventual network can hold millions of people, organizations, languages and evolving stories without changing its basic promise: every item keeps its origin and editorial path attached.</p>
        <Link href="/network" className="button-editorial button-ink" data-testid="link-home-network">Enter the global network <ArrowRight size={14} /></Link>
      </div>
      <div className="scale-constellation" aria-label="Prototype network scale diagram">
        <div className="constellation-orbit orbit-one" />
        <div className="constellation-orbit orbit-two" />
        <div className="constellation-center"><MeridianMark /><span>Humanity</span></div>
        <span className="constellation-label label-one">People</span>
        <span className="constellation-label label-two">Places</span>
        <span className="constellation-label label-three">Languages</span>
        <span className="constellation-label label-four">Stories</span>
      </div>
    </section>
  );
}

function NetworkPage() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All regions');
  const regions = ['All regions', ...Array.from(new Set(networkNodes.map((node) => node.region)))];
  const filteredNodes = useMemo(() => networkNodes.filter((node) => {
    const text = `${node.city} ${node.country} ${node.region} ${node.language} ${node.type}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (region === 'All regions' || node.region === region);
  }), [query, region]);
  return (
    <>
      <PageMeta title="Global network" description="Explore the prototype world, regions, cities, languages and newsroom nodes of TheOpenSource.NEWS." />
      <div className="container-editorial">
        <header className="page-hero">
          <div className="eyebrow">Global network / discovery layer</div>
          <h1>A world of reporting, <em>connected.</em></h1>
          <p>The network is designed for people, places and independent reporting streams to meet without losing their identity. Everything visible here is static prototype activity — not a live feed.</p>
        </header>
        <EcosystemNav />
        <section className="network-workspace" aria-labelledby="map-title">
          <div className="network-heading">
            <div><div className="eyebrow">World → region → country → city</div><h2 id="map-title">The Open Meridian network map</h2></div>
            <span className="prototype-badge">Prototype nodes · not live</span>
          </div>
          <div className="network-controls">
            <label className="network-search"><Search size={16} /><span className="sr-only">Search the network</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search city, country, language…" data-testid="input-search-network" /></label>
            <label className="network-select-label"><span className="sr-only">Filter by region</span><select value={region} onChange={(event) => setRegion(event.target.value)} data-testid="select-network-region">{regions.map((item) => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label>
          </div>
          <div className="map-and-list">
            <div className="world-map" role="img" aria-label="Abstract world map with prototype newsroom nodes">
              <div className="map-grid" />
              <div className="landmass landmass-one" /><div className="landmass landmass-two" /><div className="landmass landmass-three" />
              {filteredNodes.map((node) => <button type="button" key={node.id} className="map-node" style={{ left: node.x, top: node.y }} title={`${node.city}, ${node.country}`} onClick={() => setQuery(node.city)} data-testid={`button-map-node-${node.id}`}><span className="map-node-pulse" /><span className="map-node-label">{node.city}</span></button>)}
              {filteredNodes.length === 0 && <div className="map-empty">No prototype nodes match this search.</div>}
              <div className="map-legend"><span><i className="legend-dot" />Prototype activity</span><span><i className="legend-line" />Potential connection</span></div>
            </div>
            <div className="node-list">
              <div className="eyebrow">Node directory · {filteredNodes.length}</div>
              {filteredNodes.map((node) => <article className="node-item" key={node.id} data-testid={`card-network-node-${node.id}`}><div className="node-item-top"><span className="node-country">{node.country}</span><span className="prototype-badge">{node.status}</span></div><h3>{node.city}</h3><p>{node.region} · {node.type}</p><div className="node-item-meta"><span>{node.language}</span><span>{node.reporters} prototype identities</span></div></article>)}
            </div>
          </div>
        </section>
        <section className="activity-section" aria-labelledby="activity-title">
          <div className="section-heading"><h2 id="activity-title">Network activity</h2><span>Static prototype stream</span></div>
          <div className="activity-grid">
            <div className="activity-event"><span className="activity-time">Recently shaped</span><strong>Dhaka · a community node mapped a first-report pathway</strong><p>Prototype activity · provenance not yet live</p></div>
            <div className="activity-event"><span className="activity-time">In development</span><strong>Nairobi · Kiswahili language relationship added</strong><p>Prototype activity · translation workflow not yet live</p></div>
            <div className="activity-event"><span className="activity-time">Architecture</span><strong>London ↔ Oaxaca · cross-border editorial connection</strong><p>Prototype activity · no partner feed connected</p></div>
          </div>
        </section>
      </div>
    </>
  );
}

function PeoplePage() {
  const [query, setQuery] = useState('');
  const [role, setRole] = useState('All roles');
  const roles = ['All roles', ...Array.from(new Set(people.map((person) => person.role)))];
  const filteredPeople = useMemo(() => people.filter((person) => {
    const text = `${person.name} ${person.role} ${person.location} ${person.languages}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (role === 'All roles' || person.role === role);
  }), [query, role]);
  return (
    <>
      <PageMeta title="People in the network" description="Discover the contributor and reporter identity architecture of TheOpenSource.NEWS." />
      <div className="container-editorial">
        <header className="page-hero"><div className="eyebrow">People / contributor identity</div><h1>Every report begins with a <em>person.</em></h1><p>Reporter, correspondent, contributor, editor, photographer or researcher: the network keeps roles distinct and publication history visible. These are prototype identities, not verified credentials.</p></header>
        <EcosystemNav />
        <div className="directory-toolbar"><label className="search-box"><Search size={16} /><span className="sr-only">Search people</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, places, languages…" data-testid="input-search-people" /></label><div className="filter-pills">{roles.map((item) => <button type="button" key={item} className={`topic-pill ${role === item ? 'active' : ''}`} onClick={() => setRole(item)} data-testid={`button-role-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}</div></div>
        <div className="directory-summary"><span>{filteredPeople.length} prototype identities shown</span><span>Identity is earned through transparent contribution, never popularity.</span></div>
        <section className="people-directory" aria-label="People directory">
          {filteredPeople.map((person) => <article className="person-card" key={person.id} data-testid={`card-person-${person.id}`}><div className="person-card-top"><span className="person-avatar">{person.initials}</span><span className="prototype-badge">{person.status}</span></div><h2>{person.name}</h2><div className="person-role">{person.role}</div><p>{person.location}</p><p className="person-languages"><Languages size={13} /> {person.languages}</p><div className="person-record"><span className="eyebrow">Provenance record</span><strong>{person.record}</strong></div></article>)}
        </section>
        {filteredPeople.length === 0 && <div className="directory-empty">No prototype identities match this search. Try another place, role or language.</div>}
        <div className="directory-note"><ShieldCheck size={17} /><p><strong>No artificial authority.</strong> A profile can show what a person has contributed and how a record changed. It does not manufacture a badge, trust score or verification claim.</p></div>
      </div>
    </>
  );
}

function OrganizationsPage() {
  const [query, setQuery] = useState('');
  const filteredOrganizations = useMemo(() => organizations.filter((organization) => `${organization.name} ${organization.type} ${organization.region} ${organization.intent}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <>
      <PageMeta title="Organizations and nodes" description="Explore the prototype newsroom and organization node architecture of TheOpenSource.NEWS." />
      <div className="container-editorial">
        <header className="page-hero"><div className="eyebrow">Organizations / node directory</div><h1>Newsrooms are <em>connections.</em></h1><p>Organizations can join the ecosystem as accountable nodes, attach multiple reporters and preserve original authorship while making collaboration possible across borders.</p></header>
        <EcosystemNav />
        <section className="organization-intro"><div><div className="eyebrow">Interoperability by design</div><h2>Built to connect, not absorb.</h2></div><p>These organization records demonstrate a future-ready shape for partner publications, independent newsrooms and community reporting systems. No external organization or live feed is represented here.</p></section>
        <label className="search-box organization-search"><Search size={16} /><span className="sr-only">Search organizations</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search nodes, regions or purpose…" data-testid="input-search-organizations" /></label>
        <section className="organization-directory" aria-label="Organization directory">
          {filteredOrganizations.map((organization) => <article className="organization-card" key={organization.id} data-testid={`card-organization-${organization.id}`}><div className="organization-icon"><Building2 size={21} /></div><div className="organization-card-body"><div className="organization-card-top"><span className="eyebrow">{organization.type}</span><span className="prototype-badge">Prototype node</span></div><h2>{organization.name}</h2><p>{organization.region}</p><div className="organization-intent"><span className="eyebrow">Interoperability intent</span><strong>{organization.intent}</strong></div><div className="member-line"><span className="eyebrow">Attached identities</span><span className="member-stack">{organization.members.map((member) => <span key={member} className="member-avatar">{member}</span>)}</span><span>{organization.members.length} prototype {organization.members.length === 1 ? 'identity' : 'identities'}</span></div></div></article>)}
        </section>
        {filteredOrganizations.length === 0 && <div className="directory-empty">No prototype nodes match this search.</div>}
        <div className="api-intent"><div className="eyebrow">Future API surface</div><h2>One network, many ways in.</h2><p>The product is intended to become API-first and integration-ready for mobile apps, external newsrooms, partner publications and controlled syndication — while preserving authorship, provenance and language relationships.</p><span className="prototype-badge">Architecture note · not connected</span></div>
      </div>
    </>
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
    return matchesTopic && haystack.includes(query.toLowerCase());
  }), [query, topic]);
  const leadStory = stories[0];
  return (
    <>
      <PageMeta title="Global news, openly reported" description="TheOpenSource.NEWS is a prototype global newsroom for evidence-led reporting, local knowledge and a visible editorial record." />
      <div className="home-frontpage">
        <div className="container-editorial">
          <div className="edition-bar" data-testid="status-edition">
            <span className="edition-date">GLOBAL EDITION <b>/</b> SUNDAY 27 SEPTEMBER 2026</span>
            <span className="edition-status"><Radio size={12} /> Publication date not live</span>
            <Link href="/principles" data-testid="link-edition-principles">Our standards <ChevronRight size={13} /></Link>
          </div>
          <section className="front-intro reveal">
            <div>
              <div className="eyebrow">TheOpenSource.NEWS · independent global desk</div>
              <h1>Global news, <em>reported</em> with context.</h1>
            </div>
            <div className="front-intro-side">
              <p>Evidence-led reporting from the places where change is happening — with people, sources and uncertainty kept in view.</p>
              <span className="prototype-badge">Editorial prototype · not live news</span>
            </div>
          </section>
          <nav className="front-section-nav" aria-label="News sections" data-testid="nav-news-sections">
            <span className="section-nav-label">Sections</span>
            <a href="#world" data-testid="link-section-world">World</a>
            <a href="#latest" data-testid="link-section-latest">Latest</a>
            <a href="#living-systems" data-testid="link-section-living-systems">Living systems</a>
            <a href="#infrastructure" data-testid="link-section-infrastructure">Shared infrastructure</a>
            <a href="#food-land" data-testid="link-section-food-land">Food &amp; land</a>
            <Link href="/network" data-testid="link-section-network">Global network <ChevronRight size={13} /></Link>
          </nav>
          <div className="front-news-alert" data-testid="status-news-alert">
            <span className="alert-label"><span className="live-dot" /> NEWSROOM NOTE</span>
            <span>Prototype coverage is clearly marked. The publication workflow is being built in public.</span>
            <Link href="/about" data-testid="link-news-alert-about">Why this exists <ArrowRight size={13} /></Link>
          </div>
          <section className="front-lead-layout" id="world" aria-labelledby="top-story-title">
            <article className="front-lead-story" data-testid="card-lead-story">
              <StoryArt lead />
              <div className="front-lead-copy">
                <div>
                  <div className="story-kicker">Wales, United Kingdom <span>·</span> Living systems</div>
                  <Link href="/story/river-restoration" data-testid="link-lead-story">
                    <h2 id="top-story-title">{leadStory.title}</h2>
                  </Link>
                  <p>{leadStory.summary}</p>
                </div>
                <div className="front-lead-footer">
                  <div className="story-meta"><span className="status">EDITORIAL DEMO</span><span>Prototype edition</span><span>·</span><span>The Open Meridian desk</span></div>
                  <Link href="/story/river-restoration" className="read-link" data-testid="link-lead-read">Read full coverage <ArrowRight size={14} /></Link>
                </div>
              </div>
            </article>
            <aside className="latest-rail" id="latest" aria-labelledby="latest-title">
              <div className="rail-heading"><h2 id="latest-title">Latest headlines</h2><span>03 reports</span></div>
              {stories.slice(0, 5).map((story, index) => (
                <Link href={`/story/${story.id}`} className="headline-item" key={story.id} data-testid={`link-latest-${story.id}`}>
                  <span className="headline-number">0{index + 1}</span>
                  <span className="headline-copy"><span className="story-kicker">{story.location}</span><strong>{story.title}</strong><span className="headline-time"><Clock3 size={11} /> {story.time}</span></span>
                  <ChevronRight size={15} className="headline-arrow" />
                </Link>
              ))}
              <div className="rail-footer"><span className="live-dot" /> All times shown are prototype labels</div>
            </aside>
          </section>
          <section className="desk-index" aria-labelledby="desk-index-title">
            <div className="desk-index-top">
              <div><div className="eyebrow">The global desk</div><h2 id="desk-index-title">Coverage by place and consequence.</h2></div>
              <p>Our starting file follows practical change across borders, without flattening local context into a single feed.</p>
            </div>
            <div className="desk-columns">
              <Link href="/story/solar-library" id="infrastructure" className="desk-column desk-column-blue" data-testid="link-desk-infrastructure">
                <span className="desk-column-top"><span>01</span><span>East Africa</span></span>
                <span className="desk-column-title">{stories[1].title}</span>
                <span className="desk-column-meta">Nairobi, Kenya <ArrowRight size={14} /></span>
              </Link>
              <Link href="/story/seed-archive" id="food-land" className="desk-column desk-column-rose" data-testid="link-desk-food-land">
                <span className="desk-column-top"><span>02</span><span>Latin America</span></span>
                <span className="desk-column-title">{stories[2].title}</span>
                <span className="desk-column-meta">Oaxaca, Mexico <ArrowRight size={14} /></span>
              </Link>
              <Link href="/network" id="living-systems" className="desk-column desk-column-ink" data-testid="link-desk-network">
                <span className="desk-column-top"><span>03</span><span>Six nodes mapped</span></span>
                <span className="desk-column-title">A global network for local reporting.</span>
                <span className="desk-column-meta">Explore the network <ArrowRight size={14} /></span>
              </Link>
            </div>
          </section>
          <section className="news-beat-grid" aria-labelledby="beats-title">
            <div className="beat-grid-heading">
              <div><div className="eyebrow">Across the desks</div><h2 id="beats-title">News in focus</h2></div>
              <span>Stories with the context attached</span>
            </div>
            <div className="beat-grid">
              <article className="beat-column" id="health" data-testid="card-beat-health">
                <div className="beat-label">Health</div>
                <Link href="/story/health-map" data-testid="link-beat-health"><h3>{stories[3].title}</h3></Link>
                <p>{stories[3].summary}</p>
                <div className="beat-meta"><span>{stories[3].location}</span><ArrowRight size={14} /></div>
              </article>
              <article className="beat-column" id="climate" data-testid="card-beat-climate">
                <div className="beat-label">Climate</div>
                <Link href="/story/coastal-commons" data-testid="link-beat-climate"><h3>{stories[4].title}</h3></Link>
                <p>{stories[4].summary}</p>
                <div className="beat-meta"><span>{stories[4].location}</span><ArrowRight size={14} /></div>
              </article>
              <article className="beat-column beat-column-ink" id="business" data-testid="card-beat-business">
                <div className="beat-label">Business &amp; technology</div>
                <Link href="/story/repair-economy" data-testid="link-beat-business"><h3>{stories[5].title}</h3></Link>
                <p>{stories[5].summary}</p>
                <div className="beat-meta"><span>{stories[5].location}</span><ArrowRight size={14} /></div>
              </article>
              <article className="beat-column" id="culture" data-testid="card-beat-culture">
                <div className="beat-label">Culture &amp; ideas</div>
                <Link href="/story/language-archive" data-testid="link-beat-culture"><h3>{stories[6].title}</h3></Link>
                <p>{stories[6].summary}</p>
                <div className="beat-meta"><span>{stories[6].location}</span><ArrowRight size={14} /></div>
              </article>
            </div>
          </section>
          <section className="front-latest-section" id="latest" aria-labelledby="full-index-title">
            <div className="front-index-header">
              <div><div className="eyebrow">The full index</div><h2 id="full-index-title">More from the record</h2></div>
              <div className="front-index-tools">
                <label className="front-search"><Search size={15} /><span className="sr-only">Search the record</span><input id="record-search" type="search" placeholder="Search coverage" value={query} onChange={(event) => setQuery(event.target.value)} data-testid="input-search-record" />{query && <button type="button" className="icon-button" onClick={() => setQuery('')} aria-label="Clear search" data-testid="button-clear-search"><X size={13} /></button>}</label>
                <div className="topic-links" aria-label="Filter coverage">
                  {topics.map((item) => <button type="button" key={item} className={`topic-pill ${topic === item ? 'active' : ''}`} onClick={() => setTopic(item)} data-testid={`button-topic-${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</button>)}
                </div>
              </div>
            </div>
            <div className="front-index-body">
              <div className="story-list">
                {filtered.length > 0 ? filtered.map((story) => <StoryRow key={story.id} story={story} />) : <div className="empty-state"><p>No reports match that search yet.</p><button type="button" className="button-editorial" onClick={() => { setQuery(''); setTopic('All'); }} data-testid="button-reset-search">Show the full record</button></div>}
              </div>
              <aside className="index-aside front-principles">
                <div className="eyebrow">Open by design</div>
                <h2>See how a story earns its place.</h2>
                <p>Every report has a visible trail: who made it, what it rests on, what changed and where uncertainty remains.</p>
                <Link href="/principles" className="button-editorial" data-testid="link-home-principles">Read the principles <ArrowRight size={14} /></Link>
              </aside>
            </div>
          </section>
          <section className="front-newsletter" aria-labelledby="newsletter-title">
            <div><div className="eyebrow">The weekly file</div><h2 id="newsletter-title">Reporting with the context attached.</h2><p>A concise dispatch when a new thread is ready. No manufactured urgency.</p></div>
            {subscribed ? <div className="success-box" data-testid="status-newsletter-success"><strong>You’re on the prototype list.</strong><br />In a live edition, this would be where the next carefully sourced thread begins.</div> : <form className="newsletter-form" onSubmit={(event) => { event.preventDefault(); setSubscribed(true); }}><label htmlFor="newsletter-email">Email address<input id="newsletter-email" type="email" required placeholder="name@example.com" data-testid="input-newsletter-email" /></label><button type="submit" className="button-editorial button-ink" data-testid="button-newsletter-submit">Join the dispatch <ArrowRight size={14} /></button></form>}
          </section>
        </div>
      </div>
    </>
  );
}

function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const story = stories.find((item) => item.id === slug) ?? stories[0];
  return (
    <>
      <PageMeta title={story.title} description={`${story.summary} Read the editorial prototype record on TheOpenSource.NEWS.`} />
      <div className="container-editorial">
        <article>
          <header className="article-hero">
            <div className="eyebrow">{story.topic} · {story.location} · Editorial demo</div>
            <h1>{story.title}</h1>
            <p className="article-deck">{story.summary}</p>
            <div className="byline-row">
              <span className="avatar-initials">OM</span>
              <span><strong>{story.author}</strong><br />Editorial team · Reporter record shown as prototype</span>
              <span>Prototype publication record<br />Update history not live</span>
              <span>Original language: English</span>
              <div className="article-tools"><SaveShare compact /></div>
            </div>
          </header>
          <div className="article-layout">
            <div className="article-body">
               <p>This prototype report follows a story that begins in {story.location}, but asks questions that travel further: who is affected, what evidence is available and what changes when local knowledge is treated as part of the public record?</p>
               <p>The work is intentionally assembled as a news record rather than a victory lap. Readers should be able to see what was observed, what was reported, what has supporting evidence and what remains a question.</p>
              <div className="evidence-note"><strong><ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} /> Evidence note · prototype</strong>This is a demonstration of the evidence interface. The claims, names and references below are editorial demo content and have not been independently verified for publication.</div>
               <h2>Context is part of the story</h2>
               <p>A report begins with a contributor’s account, then keeps its sources, editorial decisions and later revisions attached to the same thread. The record should travel with the headline, not disappear behind it.</p>
               <p>That shape matters across borders and languages. Confidence is not the same thing as certainty, and a clear uncertainty is more useful than an unsupported claim.</p>
              <h2>What we would keep checking</h2>
              <p>In a published version, the record would link directly to primary documents, field notes, data and named human editorial decisions. Translations would preserve the original language, and later changes would sit beside — never silently replace — the first version.</p>
              <div className="correction"><strong>Correction history</strong><p>No corrections in this prototype record. This line is intentionally visible to show where a future change log belongs.</p></div>
            </div>
            <aside className="article-aside" aria-label="Story provenance">
              <div className="aside-block"><h3>Status</h3><p><Check size={13} /> Published as editorial demo<br /><span>Not a verified live report</span></p></div>
              <div className="aside-block"><h3>Provenance</h3><ul><li><strong>Origin</strong><br />Prototype field note · date not live</li><li><strong>Evidence</strong><br />To be attached in live workflow</li><li><strong>Editorial pass</strong><br />Human review required</li><li><strong>Translation</strong><br />English original · no translation</li></ul></div>
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
          <Route path="/network" component={NetworkPage} />
          <Route path="/people" component={PeoplePage} />
          <Route path="/organizations" component={OrganizationsPage} />
          <Route path="/story/:slug" component={ArticlePage} />
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