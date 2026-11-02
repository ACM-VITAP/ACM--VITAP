// ---------------------------------------------------------------------------
// src/components/Hero.jsx — Home Screen HTML Typography & Overlay Layer
// ---------------------------------------------------------------------------
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import RobotVideo from './RobotVideo.jsx';
import NexGreeting from './NexGreeting.jsx';

// ─── SVG Social Icons ───────────────────────────────────────────────────────
const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" />
  </svg>
);

export default function Hero({ onNavigate, lowPower = false }) {
  return (
    <section className="hero-universe" id="home">
      <RobotVideo lowPower={lowPower} />
      <NexGreeting />

      {/* Far Left Edge Social Column & Scroll Indicator */}
      <div className="hero-left-sidebar" aria-label="Social links and scroll">
        <div className="hero-social-strip">
          <a
            href="https://www.linkedin.com/company/acm-student-chapter-vit-ap/"
            target="_blank"
            rel="noreferrer"
            className="hero-social-icon-btn"
            aria-label="LinkedIn"
          >
            <LinkedinIcon />
          </a>
          <a
            href="https://www.instagram.com/acm_vitap?cplk=OG9hYWFjdWJuOTRx"
            target="_blank"
            rel="noreferrer"
            className="hero-social-icon-btn"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://www.youtube.com/@vit-apacmstudentchapterclu6341"
            target="_blank"
            rel="noreferrer"
            className="hero-social-icon-btn"
            aria-label="YouTube"
          >
            <YoutubeIcon />
          </a>
        </div>
        <div className="hero-vertical-scroll">
          <span className="scroll-track-pill">
            <span className="scroll-track-dot" />
          </span>
          <span className="scroll-vertical-label">SCROLL</span>
        </div>
      </div>

      {/* Main Content Grid (Left text, Center-Right globe, Far-Right NEX) */}
      <div className="hero-content-layer">
        <div className="hero-typography-block">
          {/* Eyebrow */}
          <div className="hero-chapter-eyebrow">
            <span className="eyebrow-text">Technology · Community · Impact</span>
          </div>

          {/* Headline */}
          <h1 className="hero-main-title">
            WE COMPUTE<br />
            <span className="acm-cyan-text">WHAT&apos;S NEXT.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-description-lede">
            A community of builders, thinkers, and changemakers exploring the possibilities of computing.
          </p>

          {/* Electric Neon CTA Cluster */}
          <div className="hero-cta-cluster">
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('about')}
              className="btn-primary-glow"
            >
              <span className="btn-label">EXPLORE OUR WORLD</span>
              <ArrowRight size={16} className="btn-icon-arrow" />
            </button>
            <a
              href="https://www.youtube.com/@vit-apacmstudentchapterclu6341"
              target="_blank"
              rel="noreferrer"
              className="btn-glass-secondary"
            >
              <div className="btn-play-circle">
                <Play size={12} fill="currentColor" />
              </div>
              <span>WATCH TRAILER</span>
            </a>
          </div>
        </div>

        {/* Center & Right areas display the cinematic spaceship observation deck */}
        <div className="hero-3d-visual-zone" aria-hidden="true" />
      </div>
    </section>
  );
}
