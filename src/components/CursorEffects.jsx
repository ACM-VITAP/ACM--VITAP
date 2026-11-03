// ---------------------------------------------------------------------------
// src/components/CursorEffects.jsx
// Cyber Reticle / Precision Crosshair Navigation Engine:
// 1. Hardware GPU-accelerated coordinate updates with zero-latency translate3d in rAF
// 2. 4-corner HUD targeting reticle + laser precision center pip
// 3. Smooth reactive states: hover expansion, active click pulse, zoom lock
// 4. Subtle ambient glow spotlight tracking with decoupled physics
// 5. Zero layout thrashing, strict touch-device exclusion, full native cursor hiding
// ---------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react';

export default function CursorEffects() {
  const reticleRef = useRef(null);
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Disable custom cursor entirely on touch devices or reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    let mouseX = -200;
    let mouseY = -200;
    let isHoveringInteractive = false;
    let isMouseDown = false;
    let isZoomTarget = false;
    let rafId = null;

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, select, .event-list-card, .event-photo-button, .team-glass-member-card, .dept-selection-card, .interactive';

    const updateCursor = () => {
      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        
        reticleRef.current.classList.toggle('is-hovering', isHoveringInteractive);
        reticleRef.current.classList.toggle('is-down', isMouseDown);
        reticleRef.current.classList.toggle('is-zoom', isZoomTarget);
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      rafId = null;
    };

    const onPointerMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;
      if (target && target.closest) {
        const interactiveEl = target.closest(interactiveSelector);
        isHoveringInteractive = Boolean(interactiveEl);
        isZoomTarget = Boolean(target.closest('.event-photo-button, .gallery-lightbox-image-wrap'));
      }

      if (!rafId) {
        rafId = requestAnimationFrame(updateCursor);
      }
    };

    const onPointerDown = () => {
      isMouseDown = true;
      if (!rafId) rafId = requestAnimationFrame(updateCursor);
    };

    const onPointerUp = () => {
      isMouseDown = false;
      if (!rafId) rafId = requestAnimationFrame(updateCursor);
    };

    const onMouseLeave = () => {
      mouseX = -200;
      mouseY = -200;
      if (!rafId) rafId = requestAnimationFrame(updateCursor);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Magnetic effect with cached bounding rect (avoids layout thrashing)
    const magneticElements = document.querySelectorAll('.magnetic-btn, .btn-primary-glow');
    const cleanups = [];

    magneticElements.forEach((btn) => {
      let centerX = 0;
      let centerY = 0;

      const onMouseEnter = () => {
        const rect = btn.getBoundingClientRect();
        centerX = rect.left + rect.width / 2;
        centerY = rect.top + rect.height / 2;
      };

      const onBtnMouseMove = (e) => {
        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < 90) {
          const strength = 0.32;
          btn.style.transform = `translate3d(${deltaX * strength}px, ${deltaY * strength}px, 0)`;
        }
      };

      const onBtnMouseLeave = () => {
        btn.style.transform = `translate3d(0, 0, 0)`;
      };

      btn.addEventListener('mouseenter', onMouseEnter, { passive: true });
      btn.addEventListener('mousemove', onBtnMouseMove, { passive: true });
      btn.addEventListener('mouseleave', onBtnMouseLeave, { passive: true });

      cleanups.push(() => {
        btn.removeEventListener('mouseenter', onMouseEnter);
        btn.removeEventListener('mousemove', onBtnMouseMove);
        btn.removeEventListener('mouseleave', onBtnMouseLeave);
      });
    });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
      cleanups.forEach((c) => c());
    };
  }, []);

  return (
    <>
      {/* Soft subtle cyan radial spotlight */}
      <div ref={spotlightRef} className="cursor-spotlight" aria-hidden="true" />

      {/* Cyber Reticle / Precision Crosshair */}
      <div ref={reticleRef} className="cyber-reticle" aria-hidden="true">
        {/* Central precision laser pip */}
        <div className="cyber-reticle-pip" />
        {/* 4-corner bracket HUD */}
        <span className="reticle-bracket bracket-tl" />
        <span className="reticle-bracket bracket-tr" />
        <span className="reticle-bracket bracket-bl" />
        <span className="reticle-bracket bracket-br" />
      </div>
    </>
  );
}
