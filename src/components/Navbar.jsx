// ---------------------------------------------------------------------------
// src/components/Navbar.jsx — Pill-shaped Floating Navigation
// ---------------------------------------------------------------------------
import React, { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar({ activeSection = 'home', onNavigate }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Events', id: 'events' },
    { label: 'Teams', id: 'teams' },
    { label: 'Gallery', id: 'gallery' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(id);
    }
    setIsMobileOpen(false);
  };

  const isContactActive = activeSection === 'contact' || activeSection === 'join';

  return (
    <header className="floating-nav-wrapper">
      <div className="nav-divided-bar" aria-label="Main Navigation">
        {/* 1. Left Island: Brand Capsule */}
        <a
          href="#home"
          className="nav-brand-group nav-island-capsule"
          onClick={(e) => handleNavClick(e, 'home')}
        >
          <div className="nav-logo-diamond-wrap">
            <img
              src="/assets/acm-logo-transparent.png"
              alt="ACM Logo"
              className="nav-logo-badge-img"
              width={34}
              height={34}
            />
          </div>
          <div className="nav-brand-text">
            <span className="nav-brand-title">ACM STUDENT CHAPTER</span>
            <span className="nav-brand-sub">VIT-AP UNIVERSITY</span>
          </div>
        </a>

        {/* 2. Center Island: Nav Links Capsule */}
        <nav className="nav-center-island nav-island-capsule" aria-label="Sections">
          <ul className="nav-links-cluster">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <li key={link.id} className="nav-link-item">
                  <button
                    type="button"
                    onClick={(e) => handleNavClick(e, link.id)}
                    className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  >
                    <span className="nav-link-label">{link.label}</span>
                    {isActive && (
                      <span className="nav-active-glow-line">
                        <span className="nav-active-core-dot" />
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 3. Right Island: Action Capsule & Mobile Toggle */}
        <div className="nav-right-actions">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`nav-action-join nav-island-capsule ${isContactActive ? 'active' : ''}`}
          >
            <span>Contact Us</span>
            <ArrowRight size={13} />
          </button>
          <button
            className="mobile-menu-toggle nav-island-capsule"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="mobile-nav-drawer" role="dialog" aria-label="Mobile Navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={(e) => handleNavClick(e, link.id)}
              className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
            >
              <span className="mobile-link-text">{link.label}</span>
              {activeSection === link.id && <span className="mobile-active-pill" />}
            </button>
          ))}
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contact')}
            className={`mobile-join-link ${isContactActive ? 'active' : ''}`}
          >
            <span>Contact Us</span>
            <ArrowRight size={15} />
          </button>
        </div>
      )}
    </header>
  );
}
