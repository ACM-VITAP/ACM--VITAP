// ---------------------------------------------------------------------------
// src/components/SmoothScrollEffects.jsx
// Flagship High-Performance Smooth Scroll Progress & Reactive Viewport Reveal Engine
// Features:
// 1. Hardware-accelerated neon scroll progress bar (GPU scaleX via rAF)
// 2. Intelligent, fail-safe IntersectionObserver (threshold: 0, generous margins)
// 3. Reactive MutationObserver to dynamically observe lazy-loaded / swapped components
// 4. Instant reveal for any element already visible in initial viewport (zero blank boxes!)
// 5. Automatic safety sweep guaranteeing no element is ever stuck invisible
// 6. Butterflow anchor navigation with fixed navbar offset compensation
// ---------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react';

const REVEAL_SELECTORS = [
  '.about-float-up',
  '.about-stagger-float',
  '.scroll-reveal',
  '.scroll-reveal-scale',
  '.stagger-child-reveal',
  '.section-header-cluster',
  '.about-section-header',
  '.about-hero-grid',
  '.about-story-grid',
  '.story-card-glass',
  '.about-mv-cluster',
  '.mv-card-glass',
  '.about-activities-grid',
  '.activity-glass-card',
  '.about-activity-glass-card',
  '.about-depts-grid',
  '.dept-capsule-card',
  '.about-values-grid',
  '.value-capsule-glass',
  '.flagship-initiatives-grid',
  '.flagship-featured-card',
  '.about-stats-matrix',
  '.stat-matrix-cell',
  '.about-timeline-track',
  '.timeline-checkpoint-node',
  '.timeline-step-card',
  '.leadership-spotlight-matrix',
  '.faculty-spotlight-card',
  '.exec-preview-card',
  '.events-cards-grid',
  '.event-glass-card',
  '.events-filter-strip',
  '.team-filter-tabs-wrapper',
  '.department-selection-grid',
  '.dept-selection-card',
  '.faculty-coordinator-showcase',
  '.admin-tier-section',
  '.team-glass-member-card',
  '.gallery-grid',
  '.gallery-tile',
  '.contact-grid-layout',
  '.contact-main-frame',
  '.contact-card-glass',
  '.faq-glass-accordion',
  '.about-join-portal-glass',
  '[data-reveal]'
];

export default function SmoothScrollEffects({ activeTab }) {
  const progressBarRef = useRef(null);
  const photonRef = useRef(null);
  const observerRef = useRef(null);

  // 1. Cinematic Neon Scroll Progress Bar (0% - 100%)
  useEffect(() => {
    let animationFrameId = null;

    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(window.scrollY / scrollHeight, 0), 1) : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (photonRef.current) {
        photonRef.current.style.opacity = progress > 0.005 ? '1' : '0';
      }
      animationFrameId = null;
    };

    const handleScroll = () => {
      if (animationFrameId) return;
      animationFrameId = requestAnimationFrame(updateScrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  // 2. High-Performance Reactive Viewport Reveal Engine
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create a fresh IntersectionObserver with generous margins and 0 threshold for buttery triggering
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px',
      }
    );

    const scanAndObserve = () => {
      const vh = window.innerHeight;
      const elements = document.querySelectorAll(REVEAL_SELECTORS.join(', '));

      elements.forEach((el) => {
        // Skip elements already in view
        if (el.classList.contains('is-in-view')) return;

        // If reduced motion, reveal instantly
        if (isReducedMotion) {
          el.classList.add('is-in-view');
          return;
        }

        const rect = el.getBoundingClientRect();
        // Immediately reveal if already visible or close to viewport
        if (rect.top <= vh * 1.15 && rect.bottom >= -100) {
          el.classList.add('is-in-view');
        } else {
          // Add default reveal helper class only if not already having custom float classes
          if (
            !el.classList.contains('scroll-reveal') &&
            !el.classList.contains('stagger-child-reveal') &&
            !el.classList.contains('about-float-up') &&
            !el.classList.contains('about-stagger-float')
          ) {
            const cls = el.className;
            if (cls.includes('grid') || cls.includes('cards') || cls.includes('cluster') || cls.includes('matrix')) {
              el.classList.add('stagger-child-reveal');
            } else {
              el.classList.add('scroll-reveal');
            }
          }
          observerRef.current?.observe(el);
        }
      });
    };

    // Staggered scans to catch lazy-loading view chunks smoothly as they mount
    scanAndObserve();
    const t1 = setTimeout(scanAndObserve, 40);
    const t2 = setTimeout(scanAndObserve, 150);
    const t3 = setTimeout(scanAndObserve, 350);

    // Safety sweep: Guarantee NO element remains hidden after 600ms
    const tSafety = setTimeout(() => {
      document.querySelectorAll(
        '.about-float-up:not(.is-in-view), .about-stagger-float:not(.is-in-view), .scroll-reveal:not(.is-in-view), .stagger-child-reveal:not(.is-in-view)'
      ).forEach((el) => {
        el.classList.add('is-in-view');
      });
    }, 600);

    // Watch for DOM mutations (e.g. lazy-loaded subcomponents or category/tab filter changes)
    let rafMutation = null;
    const mutationObserver = new MutationObserver(() => {
      if (rafMutation) cancelAnimationFrame(rafMutation);
      rafMutation = requestAnimationFrame(scanAndObserve);
    });

    const contentRoot = document.querySelector('.content-layer') || document.body;
    mutationObserver.observe(contentRoot, { childList: true, subtree: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tSafety);
      if (rafMutation) cancelAnimationFrame(rafMutation);
      mutationObserver.disconnect();
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeTab]);

  // 3. Smooth in-page anchor scroll with navbar offset compensation
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = 96;
        const targetPos = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth',
        });
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="cinematic-scroll-progress-track" aria-hidden="true">
      <div ref={progressBarRef} className="cinematic-scroll-progress-bar">
        <div ref={photonRef} className="cinematic-scroll-progress-photon" />
      </div>
    </div>
  );
}
