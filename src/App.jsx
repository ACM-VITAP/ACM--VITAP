// ---------------------------------------------------------------------------
// src/App.jsx — Master ACM VIT-AP Computational Universe Application
// ---------------------------------------------------------------------------
import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { createPortal } from 'react-dom';
import { Canvas } from '@react-three/fiber';
import { ArrowRight, ChevronRight, Globe as GlobeIcon, X } from 'lucide-react';
import Loader from './components/Loader.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';

import SpaceAtmosphere from './components/SpaceAtmosphere.jsx';
import CursorEffects from './components/CursorEffects.jsx';
import SmoothScrollEffects from './components/SmoothScrollEffects.jsx';

// Lazy-load the heavy 3D Space Scene (Globe, Robot, Stars, Bloom)
const SpaceUniverse = lazy(() => import('./components/SpaceUniverse.jsx'));
const About = lazy(() => import('./components/About.jsx'));
const Events = lazy(() => import('./components/Events.jsx'));
const Team = lazy(() => import('./components/Team.jsx'));
const Contact = lazy(() => import('./components/Contact.jsx'));

// ─── WebGL Support Detection ────────────────────────────────────────────────
function detectWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

function getPerformanceProfile() {
  if (typeof window === 'undefined') return { lowPower: false };
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  // These APIs are optional. Unknown hardware should not be treated as low
  // power, which would unnecessarily downgrade capable desktops.
  const cores = navigator.hardwareConcurrency || 8;
  const memory = navigator.deviceMemory || 8;
  return { lowPower: coarsePointer || cores <= 4 || memory <= 4 };
}

// ─── Reduced Motion Hook ────────────────────────────────────────────────────
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

// ─── ABOUT SECTION (Panel 07) ───────────────────────────────────────────────
function AboutSection() {
  return (
    <section className="section-full" id="about">
      <div className="section-header-cluster">
        <div className="section-eyebrow-badge">
          <span>The Network</span>
        </div>
        <h2 className="section-headline-large">
          A COMMUNITY THAT BUILDS <span className="blue-highlight">BEYOND CLASSROOMS.</span>
        </h2>
        <p className="section-subtext-lede">
          We create opportunities to learn, collaborate, innovate, and grow through high-impact workshops, hackathons, open-source projects, and global technology networks.
        </p>
      </div>

      <div className="about-network-grid">
        <div className="about-metrics-bar">
          <div className="metric-item-box">
            <span className="metric-item-num">1K+</span>
            <span className="metric-item-label">Active Members</span>
          </div>
          <div className="metric-item-box">
            <span className="metric-item-num">50+</span>
            <span className="metric-item-label">Flagship Events</span>
          </div>
          <div className="metric-item-box">
            <span className="metric-item-num">10+</span>
            <span className="metric-item-label">Tech Domains</span>
          </div>
          <div className="metric-item-box">
            <span className="metric-item-num">∞</span>
            <span className="metric-item-label">Possibilities</span>
          </div>
        </div>

        {/* Visual Network Hub */}
        <div className="about-visual-network">
          <div className="network-ring network-ring--outer" />
          <div className="network-ring network-ring--inner" />
          <div className="network-center-label">ACM</div>
          {['LEARN', 'BUILD', 'SHARE', 'CONNECT'].map((label, i) => (
            <div className={`network-node network-node--${i}`} key={label}>
              <span className="network-node-dot" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION (Panel 10) ─────────────────────────────────────────────
function GallerySection() {
  const [activeMemory, setActiveMemory] = useState(null);
  const tiles = [
    { label: 'ACM QUEST', sub: 'SPIDER-MAN BRAND NEW DAY', image: '/eventspictures/acmquest.webp' },
    { label: 'TREASURE HUNT', sub: 'DECODE. DISCOVER. CONQUER.', image: '/eventspictures/treasurehunt.webp' },
    { label: 'KBC', sub: 'KAUN BANEGA CODEPATHI', image: '/eventspictures/KBC.webp' },
    { label: 'ASHUTOSH WEBINAR', sub: 'BEYOND THE CLASSROOM', image: '/eventspictures/ashutosh.webp' },
    { label: 'PROMPT BATTLE', sub: 'IMAGINE. PROMPT. CREATE.', image: '/eventspictures/promptbattle.webp' },
    { label: 'TECHNICAL WORKSHOP', sub: 'LEARN. BUILD. GROW.', image: '/eventspictures/technical workshop.webp' },
    { label: 'FRESHERS MEET AND GREET', sub: 'NEW FACES. SHARED PASSIONS.', image: '/eventspictures/meetandgreet.webp' },
  ];

  const memories = [
    { label: 'ACM QUEST', category: 'COMPETITIONS', sub: 'SPIDER-MAN BRAND NEW DAY', image: '/eventspictures/acmquest.webp', alt: 'ACM Quest Spider-Man Brand New Day event artwork' },
    { label: 'TREASURE HUNT', category: 'COMMUNITY', sub: 'DECODE. DISCOVER. CONQUER.', image: '/eventspictures/treasurehunt.webp', alt: 'Treasure Hunt event artwork' },
    { label: 'KBC', category: 'COMPETITIONS', sub: 'KAUN BANEGA CODEPATHI', image: '/eventspictures/KBC.webp', alt: 'KBC Kaun Banega Codepathi event artwork' },
    { label: 'ASHUTOSH WEBINAR', category: 'INNOVATION', sub: 'BEYOND THE CLASSROOM', image: '/eventspictures/ashutosh.webp', alt: 'Ashutosh webinar event artwork' },
    { label: 'PROMPT BATTLE', category: 'INNOVATION', sub: 'IMAGINE. PROMPT. CREATE.', image: '/eventspictures/promptbattle.webp', alt: 'Prompt Battle event artwork' },
    { label: 'TECHNICAL WORKSHOP', category: 'WORKSHOPS', sub: 'LEARN. BUILD. GROW.', image: '/eventspictures/technical workshop.webp', alt: 'Technical workshop event photograph' },
    { label: 'FRESHERS MEET AND GREET', category: 'COMMUNITY', sub: 'NEW FACES. SHARED PASSIONS.', image: '/eventspictures/meetandgreet.webp', alt: 'Freshers Meet and Greet event artwork' },
  ];

  return (
    <section className="section-full gallery-showcase gallery-memory-archive" id="gallery">
      <div className="gallery-memory-layout">
        <div className="gallery-intro-panel">
          <div className="section-eyebrow-badge"><span>GALLERY SHOWCASE</span></div>
          <h2 className="section-headline-large">MOMENTS THAT <span className="blue-highlight">INSPIRE.</span></h2>
          <p className="section-subtext-lede">A glimpse of our journey, our people, and our community in action.</p>
          <div className="gallery-index-list" aria-label="Gallery themes">
            {['EVENTS', 'PEOPLE', 'LEARNING', 'COLLABORATION', 'INNOVATION', 'BEYOND CAMPUS'].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>

        <div className="gallery-memory-tree" aria-label="ACM memory tree">
          <svg className="gallery-tree-svg" viewBox="0 0 900 560" role="img" aria-label="A branching tree connecting ACM memories">
            <defs>
              <linearGradient id="galleryTreeStroke" x1="0" x2="1"><stop stopColor="#00d4ff" /><stop offset=".5" stopColor="#8b5cf6" /><stop offset="1" stopColor="#00d4ff" /></linearGradient>
              <filter id="galleryTreeGlow"><feGaussianBlur stdDeviation="4" result="blur" /><feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <g className="gallery-tree-branches" fill="none" stroke="url(#galleryTreeStroke)" strokeLinecap="round" filter="url(#galleryTreeGlow)">
              <path d="M450 520 C450 430 445 340 450 270 C455 205 410 160 330 115" />
              <path d="M450 520 C450 415 470 342 500 282 C535 210 610 165 690 120" />
              <path d="M450 365 C400 315 330 280 250 260 C185 245 140 210 110 160" />
              <path d="M470 380 C535 330 610 305 700 295 C770 285 810 250 840 205" />
              <path d="M450 300 C420 245 415 190 450 130 C475 90 520 70 570 56" />
              <path d="M450 320 C475 250 520 210 575 195" />
              <path d="M448 420 C385 390 315 365 250 350 C205 340 170 315 150 285" />
              <path d="M462 425 C535 395 610 375 675 360 C735 347 775 320 800 280" />
              <path d="M442 270 C395 225 350 200 300 185 C250 170 220 140 205 105" />
              <path d="M475 270 C520 225 565 195 625 175 C680 157 720 125 740 88" />
            </g>
            <g className="gallery-tree-nodes" fill="#00eaff">
              {[['330', '115'], ['690', '120'], ['110', '160'], ['840', '205'], ['570', '56'], ['575', '195']].map(([cx, cy]) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />)}
            </g>
            <g className="gallery-tree-roots" fill="none" stroke="#00d4ff" strokeLinecap="round" opacity=".55">
              <path d="M450 520 C400 545 340 544 280 530" /><path d="M450 520 C500 545 560 544 630 528" />
            </g>
          </svg>
          <div className="gallery-tree-core">acm<span>VIT-AP</span></div>
          <button className="gallery-category-node gallery-category-node--competition" type="button">COMPETITIONS<small>Challenges &amp; Victories</small></button>
          <button className="gallery-category-node gallery-category-node--workshop" type="button">WORKSHOPS<small>Learning &amp; Building</small></button>
          <button className="gallery-category-node gallery-category-node--community" type="button">COMMUNITY<small>People &amp; Friendships</small></button>
          <button className="gallery-category-node gallery-category-node--innovation" type="button">INNOVATION<small>Ideas &amp; Projects</small></button>
          {memories.map((memory, index) => <figure className={`gallery-memory-photo gallery-memory-photo--${index} ${activeMemory === memory.label ? 'is-active' : ''}`} key={memory.label} onClick={() => setActiveMemory(memory.label)}><img src={memory.image} alt={memory.alt} loading="lazy" /><figcaption><span className="gallery-memory-category">{memory.category}</span><strong>{memory.label}</strong></figcaption></figure>)}
        </div>
      </div>

      <div className="gallery-archive-heading"><span>EXPLORE OUR MEMORIES</span><i /></div>
      <div className="gallery-archive-strip" role="list">
        {tiles.map((tile, i) => <button className={`gallery-archive-card ${activeMemory === tile.label ? 'is-active' : ''}`} key={tile.label} type="button" role="listitem" onClick={() => setActiveMemory(tile.label)} aria-pressed={activeMemory === tile.label}><img src={tile.image} alt={`${tile.label} — ${tile.sub}`} loading="lazy" /><div><strong>{tile.label}</strong><span>{tile.sub}</span></div><ArrowRight size={16} aria-hidden="true" /></button>)}
      </div>
    </section>
  );
}

// Event-first gallery: select an event to open its complete photo collection.
function EventGallery() {
  const [selected, setSelected] = useState(null);
  const [lightbox, setLightbox] = useState(null);
  const touchStart = useRef(null);
  const events = [
    { label: 'ACM QUEST', category: 'COMPETITIONS', image: '/eventspictures/acmquest.webp', video: '/eventspictures/Acm Quest/2026-10-31 22-27-43.mp4', photos: [
      '/eventspictures/Acm Quest/1.webp', '/eventspictures/Acm Quest/2.webp',
    ] },
    { label: 'CYBER SECURITY WEBINAR', category: 'INNOVATION', image: '/eventspictures/cybersecurity Webinar/event-banner.png', video: '/eventspictures/cybersecurity Webinar/video.webm', photos: [
      '/eventspictures/cybersecurity Webinar/Poster.png',
      '/eventspictures/cybersecurity Webinar/event-banner.png',
    ] },
    { label: 'TREASURE HUNT', category: 'COMMUNITY', image: '/eventspictures/treasurehunt.webp', photos: [
      '/eventspictures/Treasure Hunt/IMG_2679.webp', '/eventspictures/Treasure Hunt/IMG_2698.webp',
      '/eventspictures/Treasure Hunt/IMG_2703.webp', '/eventspictures/Treasure Hunt/IMG_2729.webp',
      '/eventspictures/Treasure Hunt/IMG_2731.webp', '/eventspictures/treasurehunt.webp',
    ] },
    { label: 'KBC', category: 'COMPETITIONS', image: '/eventspictures/KBC.webp', photos: [
      '/eventspictures/KBC/IMG_4523.webp', '/eventspictures/KBC/IMG_4537.webp', '/eventspictures/KBC/IMG_4547.webp',
      '/eventspictures/KBC/IMG_8820.webp', '/eventspictures/KBC/IMG_8826.webp', '/eventspictures/KBC/IMG_8837.webp',
      '/eventspictures/KBC/IMG_8875.webp', '/eventspictures/KBC/IMG_8879(1).webp', '/eventspictures/KBC/IMG_8879.webp',
      '/eventspictures/KBC/IMG_8901.webp', '/eventspictures/KBC/IMG_20260911_165219878.webp',
      '/eventspictures/KBC/IMG_5563.webp', '/eventspictures/KBC/IMG_5587.webp', '/eventspictures/KBC.webp',
    ] },
    { label: 'ASHUTOSH WEBINAR', category: 'INNOVATION', image: '/eventspictures/ashutosh.webp', photos: [
      '/eventspictures/ashutosh webinar/IMG_3764.webp', '/eventspictures/ashutosh webinar/IMG_3766.webp',
      '/eventspictures/ashutosh webinar/IMG_3774.webp', '/eventspictures/ashutosh webinar/IMG_3776.webp',
      '/eventspictures/ashutosh webinar/IMG_3780.webp', '/eventspictures/ashutosh webinar/IMG_3781.webp',
      '/eventspictures/ashutosh webinar/IMG_3783.webp', '/eventspictures/ashutosh webinar/IMG_3786.webp',
      '/eventspictures/ashutosh webinar/IMG_3788.webp', '/eventspictures/ashutosh webinar/IMG_3790.webp',
      '/eventspictures/ashutosh webinar/IMG_8058.webp', '/eventspictures/ashutosh webinar/IMG_8061.webp',
      '/eventspictures/ashutosh.webp',
    ] },
    { label: 'PROMPT BATTLE', category: 'INNOVATION', image: '/eventspictures/promptbattle/20261010_170436.webp', photos: [
      '/eventspictures/promptbattle/20261010_170436.webp', '/eventspictures/promptbattle/20261010_170618.webp',
      '/eventspictures/promptbattle/IMG_5612.webp', '/eventspictures/promptbattle/IMG_5669.webp', '/eventspictures/promptbattle/IMG_5677.webp',
    ] },
    { label: 'TECHNICAL WORKSHOP', category: 'WORKSHOPS', image: '/eventspictures/technical workshop.webp', photos: [
      '/eventspictures/technical workshop/20261015_121925.webp',
      '/eventspictures/technical workshop/20261015_125624.webp',
      '/eventspictures/technical workshop/20261015_125638.webp',
      '/eventspictures/technical workshop/20261015_125717.webp',
      '/eventspictures/technical workshop/20261015_125735.webp',
      '/eventspictures/technical workshop/selected (2).webp',
      '/eventspictures/technical workshop/selected.webp',
      '/eventspictures/technical workshop.webp',
    ] },
    { label: 'FRESHERS MEET AND GREET', category: 'COMMUNITY', image: '/eventspictures/meetandgreet.webp', photos: [
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.02.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.03.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.04 (1).webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.04.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.05.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.08.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.09.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.11.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.12.webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.13 (1).webp',
      '/eventspictures/MEET AND GREET/WhatsApp Image 2026-10-28 at 15.43.13.webp',
      '/eventspictures/meetandgreet.webp',
    ] },
  ];

  useEffect(() => {
    if (!lightbox) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setLightbox(null);
      if (event.key === 'ArrowLeft') setLightbox((current) => current && { ...current, index: (current.index - 1 + current.photos.length) % current.photos.length });
      if (event.key === 'ArrowRight') setLightbox((current) => current && { ...current, index: (current.index + 1) % current.photos.length });
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeyDown);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKeyDown); };
  }, [lightbox]);

  const moveLightbox = (direction) => setLightbox((current) => current && ({ ...current, index: (current.index + direction + current.photos.length) % current.photos.length }));

  return <section className="section-full gallery-showcase event-gallery" id="gallery">
    {!selected ? <>
      <div className="event-gallery-heading"><div className="section-eyebrow-badge"><span>EVENT ARCHIVE</span></div><h2 className="section-headline-large">MOMENTS THAT <span className="blue-highlight">INSPIRE.</span></h2><p className="section-subtext-lede">Choose an event to explore its photos and relive the experience.</p></div>
      <div className="event-list-grid">{events.map((event, index) => <button className="event-list-card" style={{ '--event-index': index }} key={event.label} onClick={() => setSelected(event)}><img src={event.image} alt="" loading="lazy" decoding="async" /><span className="event-list-card-copy"><small>{event.category}</small><strong>{event.label}</strong><span>View photos <ArrowRight size={15} /></span></span></button>)}</div>
    </> : <div className="event-detail"><button className="event-detail-back" onClick={() => setSelected(null)}>← All events</button><div className="event-detail-heading"><div><span className="gallery-memory-category">{selected.category}</span><h2>{selected.label}</h2></div><p>Event memories from ACM VIT-AP · Click any photo to expand</p></div>{selected.video && <div className="event-feature-video"><video src={selected.video} autoPlay loop muted playsInline preload="metadata" controls aria-label={`${selected.label} event video`} /></div>}<div className="event-photo-grid">{selected.photos.map((photo, index) => <button className="event-photo-button" style={{ '--photo-index': index }} key={photo} type="button" onClick={() => setLightbox({ photos: selected.photos, index, label: selected.label })} aria-label={`Open ${selected.label} photo ${index + 1}`}><img src={photo} alt={`${selected.label} event memory`} loading="lazy" decoding="async" /></button>)}</div></div>}
    {lightbox && typeof document !== 'undefined' && createPortal(
      <div
        className="gallery-lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`${lightbox.label} photo viewer`}
        onClick={() => setLightbox(null)}
        onTouchStart={(event) => { touchStart.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          const delta = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(delta) > 45) moveLightbox(delta > 0 ? -1 : 1);
        }}
      >
        <button className="gallery-lightbox-close" type="button" onClick={() => setLightbox(null)} aria-label="Close photo viewer">
          <X size={24} />
        </button>
        <button
          className="gallery-lightbox-nav gallery-lightbox-prev"
          type="button"
          onClick={(event) => { event.stopPropagation(); moveLightbox(-1); }}
          aria-label="Previous photo"
        >
          ‹
        </button>
        <div className="gallery-lightbox-stage" onClick={(event) => event.stopPropagation()}>
          <div className="gallery-lightbox-image-wrap">
            <img
              src={lightbox.photos[lightbox.index]}
              alt={`${lightbox.label} photo ${lightbox.index + 1}`}
              decoding="async"
              fetchPriority="high"
            />
          </div>
          <div className="gallery-lightbox-meta">
            <span>{lightbox.label}</span>
            <strong>{lightbox.index + 1} / {lightbox.photos.length}</strong>
          </div>
        </div>
        <button
          className="gallery-lightbox-nav gallery-lightbox-next"
          type="button"
          onClick={(event) => { event.stopPropagation(); moveLightbox(1); }}
          aria-label="Next photo"
        >
          ›
        </button>
      </div>,
      document.body
    )}
  </section>;
}

// ─── MASTER APP COMPONENT ───────────────────────────────────────────────────
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [hasWebGL] = useState(() => detectWebGL());
  const [performanceProfile] = useState(getPerformanceProfile);
  const reducedMotion = usePrefersReducedMotion();
  const hangarBgRef = useRef(null);

  // Listen to hash changes for browser forward/back buttons
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'about', 'events', 'teams', 'gallery', 'join', 'contact'].includes(hash)) {
        setActiveTab(hash === 'join' ? 'contact' : hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tabId) => {
    const targetTab = tabId === 'join' ? 'contact' : tabId;
    setActiveTab(targetTab);
    window.location.hash = `#${targetTab}`;
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // High-performance smooth parallax: directly updates GPU transform via rAF (zero React re-renders)
  useEffect(() => {
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    const onPointerMove = (e) => {
      targetX = ((e.clientX / window.innerWidth) - 0.5) * -12;
      targetY = ((e.clientY / window.innerHeight) - 0.5) * -8;
      if (!rafId) {
        rafId = requestAnimationFrame(updateParallax);
      }
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      if (hangarBgRef.current) {
        hangarBgRef.current.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0) scale(1.04)`;
      }

      if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
        rafId = requestAnimationFrame(updateParallax);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  return (
    <div className={`app-root ${performanceProfile.lowPower ? 'performance-lite' : ''}`}>
      {/* Intro sequence loader */}
      <Loader onComplete={() => setIsLoaded(true)} />

      {/* Layer 1: Atmospheric Background Plate with Parallax & Page Adaptability */}
      <div
        ref={hangarBgRef}
        className={`hangar-bg-layer ${activeTab === 'teams' ? 'teams-page-bg' : ''}`}
        aria-hidden="true"
      />

      {/* Layer 1.5: Rich Space Atmosphere (twinkling stars, shooting stars, nebula drift, glow pulse, dust, noise) */}
      <SpaceAtmosphere activeTab={activeTab} />

      {/* Layer 2: Dark Vignette & Left typography contrast overlay */}
      <div className="hangar-dark-vignette" aria-hidden="true" />

      {/* Cursor effects: spotlight, custom dot & trailing ring, magnetic button physics */}
      <CursorEffects />

      {/* Cinematic Smooth Scroll Progress & Viewport Reveal Engine */}
      <SmoothScrollEffects activeTab={activeTab} />

      {/* Layer 3: 3D Canvas (Rotating Earth, Satellites, 3D NEX Robot, Stars, Bloom) */}
      {hasWebGL && !reducedMotion ? (
        <div className="three-scene-container" aria-hidden="true">
          <Canvas
            camera={{ position: [0, 0, 10], fov: 35 }}
            dpr={performanceProfile.lowPower ? [0.75, 1] : [1, 1.25]}
            frameloop={activeTab === 'home' ? 'always' : 'demand'}
            gl={{
              alpha: true,
              powerPreference: performanceProfile.lowPower ? 'low-power' : 'high-performance',
              antialias: false,
              stencil: false,
            }}
            style={{ background: 'transparent' }}
          >
            <Suspense fallback={null}>
              <SpaceUniverse lowPower={performanceProfile.lowPower} />
            </Suspense>
          </Canvas>
        </div>
      ) : null}

      {/* Navigation */}
      <Navbar activeSection={activeTab} onNavigate={handleNavigate} />

      {/* Content Layer (Dedicated Views divided by Navbar Tabs) */}
      <main className="content-layer">
        <Suspense fallback={<div className="view-loading" aria-label="Loading section" />}>
          {activeTab === 'home' && (
          <div key="view-home" className="view-container">
              <Hero onNavigate={handleNavigate} lowPower={performanceProfile.lowPower} />
          </div>
          )}

          {activeTab === 'about' && (
          <div key="view-about" className="view-container">
            <About onNavigate={handleNavigate} />
          </div>
          )}

          {activeTab === 'events' && (
          <div key="view-events" className="view-container">
            <Events />
          </div>
          )}

          {activeTab === 'teams' && (
          <div key="view-teams" className="view-container">
            <Team />
          </div>
          )}

          {activeTab === 'gallery' && (
          <div key="view-gallery" className="view-container">
            <EventGallery />
          </div>
          )}

          {(activeTab === 'contact' || activeTab === 'join') && (
          <div key="view-contact" className="view-container">
            <Contact />
          </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}
