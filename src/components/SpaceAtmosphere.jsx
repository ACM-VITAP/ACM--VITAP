// ---------------------------------------------------------------------------
// src/components/SpaceAtmosphere.jsx
// High-Performance Unified Space Atmosphere:
// 1. Single composite 2D canvas for twinkling stars and floating dust specks
// 2. Hardware-friendly drawing with zero software shadowBlur / ctx.filter stalls
// 3. Auto-pause during deep scroll (> 1.2x viewport), tab changes, and backgrounding
// ---------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react';

const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;

export default function SpaceAtmosphere({ activeTab = 'home' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let animationFrameId = null;
    let isVisible = !document.hidden;
    let isScrolledPast = window.scrollY > window.innerHeight * 1.3;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (activeTab !== 'home') {
        renderFrame(true);
      }
    };

    const handleScroll = () => {
      isScrolledPast = window.scrollY > window.innerHeight * 1.3;
      if (isScrolledPast && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (!isScrolledPast && isVisible && activeTab === 'home' && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (isVisible && !isScrolledPast && activeTab === 'home' && !animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const mobile = isMobile();
    const lowPower = mobile || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const starCount = lowPower ? 32 : 110;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.75,
      radius: Math.random() * 1.2 + 0.5,
      baseAlpha: Math.random() * 0.45 + 0.25,
      pulseSpeed: Math.random() * 0.02 + 0.008,
      phase: Math.random() * Math.PI * 2,
      isGlow: !lowPower && Math.random() > 0.7,
    }));

    const dustCount = mobile || lowPower ? 0 : 20;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.7,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.4 + 0.15,
      isGlow: Math.random() > 0.6,
    }));

    let time = 0;

    const renderFrame = (staticOnly = false) => {
      ctx.clearRect(0, 0, width, height);
      if (!staticOnly) time += 0.016;

      // 1. Draw Starfield
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        const alpha = staticOnly
          ? star.baseAlpha
          : Math.max(0.08, star.baseAlpha + Math.sin(time * star.pulseSpeed * 60 + star.phase) * 0.28);

        if (star.isGlow) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.22})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 242, 255, ${alpha})`;
        ctx.fill();
      }

      // 2. Draw Dust Specks (only during live desktop home animation)
      if (!staticOnly && dustCount > 0) {
        for (let i = 0; i < dustParticles.length; i++) {
          const p = dustParticles[i];
          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          if (p.isGlow) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity * 0.2})`;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 255, ${p.opacity})`;
          ctx.fill();
        }
      }
    };

    const render = () => {
      if (isVisible && !isScrolledPast) {
        renderFrame(false);
      }

      animationFrameId = null;
      if (activeTab === 'home' && isVisible && !isScrolledPast) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (activeTab === 'home' && isVisible && !isScrolledPast) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      renderFrame(true);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  return (
    <div
      className={`space-atmosphere-wrapper ${activeTab === 'home' ? '' : 'space-atmosphere--static'}`}
      aria-hidden="true"
    >
      {/* Unified Canvas for twinkling stars and drifting dust */}
      <canvas ref={canvasRef} className="atmosphere-canvas" />

      {/* Shooting stars elements */}
      <div className="shooting-star star-1 atmosphere-desktop-only" />
      <div className="shooting-star star-2 atmosphere-desktop-only" />
      <div className="shooting-star star-3 atmosphere-desktop-only" />

      {/* Platform glow rings breathing pulse mask */}
      <div className="platform-glow-rings-pulse" />

      {/* Film grain noise overlay */}
      <div className="film-grain-overlay" />
    </div>
  );
}
