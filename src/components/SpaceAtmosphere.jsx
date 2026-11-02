// ---------------------------------------------------------------------------
// src/components/SpaceAtmosphere.jsx
// High-Performance Space Atmosphere:
// 1. Hardware-friendly 2D stars without expensive software shadowBlur
// 2. Glowing dust particles without ctx.filter blur or shadowBlur
// 3. Auto-pause during deep scroll (> 1.2x viewport) and tab inactivity
// ---------------------------------------------------------------------------
import React, { useEffect, useRef } from 'react';

const isMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 900px)').matches;

export default function SpaceAtmosphere({ activeTab = 'home' }) {
  const canvasRef = useRef(null);
  const dustCanvasRef = useRef(null);

  // Twinkling stars canvas (optimized draw calls, zero shadowBlur stalls)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let isScrolledPast = window.scrollY > window.innerHeight * 1.4;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      // Pause drawing when scrolled deep down past the top section
      isScrolledPast = window.scrollY > window.innerHeight * 1.4;
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

    // Balanced star count for high visual impact without fill-rate saturation
    const mobile = isMobile();
    const lowPower = mobile || (navigator.hardwareConcurrency || 8) <= 4 || (navigator.deviceMemory || 8) <= 4;
    const starCount = lowPower ? 36 : 140;
    const stars = Array.from({ length: starCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.75,
      radius: Math.random() * 1.3 + 0.5,
      baseAlpha: Math.random() * 0.45 + 0.25,
      pulseSpeed: Math.random() * 0.025 + 0.01,
      phase: Math.random() * Math.PI * 2,
      isGlow: !lowPower && Math.random() > 0.65,
    }));

    let time = 0;

    const render = () => {
      if (isVisible && !isScrolledPast) {
        ctx.clearRect(0, 0, width, height);
        time += 0.016;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];
          const alpha = Math.max(0.08, star.baseAlpha + Math.sin(time * star.pulseSpeed * 60 + star.phase) * 0.3);

          // Fast halo glow without software Gaussian blur
          if (star.isGlow) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${alpha * 0.25})`;
            ctx.fill();
          }

          // Star core
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(225, 242, 255, ${alpha})`;
          ctx.fill();
        }
      }

      animationFrameId = null;
      if (activeTab === 'home' && isVisible && !isScrolledPast) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    if (activeTab === 'home' && isVisible && !isScrolledPast) {
      animationFrameId = requestAnimationFrame(render);
    } else {
      render();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  // Floating Dust specks (skip on mobile, ultra-lightweight GPU 2D on desktop)
  useEffect(() => {
    if (isMobile()) return;
    const canvas = dustCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let isScrolledPast = window.scrollY > window.innerHeight * 1.4;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      isScrolledPast = window.scrollY > window.innerHeight * 1.4;
      if (isScrolledPast && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (!isScrolledPast && isVisible && activeTab === 'home' && !animationFrameId) {
        animationFrameId = requestAnimationFrame(renderDust);
      }
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (!isVisible && animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      } else if (isVisible && !isScrolledPast && activeTab === 'home' && !animationFrameId) {
        animationFrameId = requestAnimationFrame(renderDust);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const dustCount = 28;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.8,
      speedY: Math.random() * 0.35 + 0.12,
      speedX: (Math.random() - 0.5) * 0.12,
      opacity: Math.random() * 0.45 + 0.2,
      isGlow: Math.random() > 0.5,
    }));

    const renderDust = () => {
      if (isVisible && !isScrolledPast) {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < dustParticles.length; i++) {
          const p = dustParticles[i];
          p.y -= p.speedY;
          p.x += p.speedX;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          // Subtle halo for glowing dust without ctx.filter or shadowBlur
          if (p.isGlow) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 212, 255, ${p.opacity * 0.22})`;
            ctx.fill();
          }

          // Particle body
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 220, 255, ${p.opacity})`;
          ctx.fill();
        }
      }

      animationFrameId = null;
      if (activeTab === 'home' && isVisible && !isScrolledPast) {
        animationFrameId = requestAnimationFrame(renderDust);
      }
    };

    if (activeTab === 'home' && isVisible && !isScrolledPast) {
      animationFrameId = requestAnimationFrame(renderDust);
    } else {
      renderDust();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeTab]);

  return (
    <div className={`space-atmosphere-wrapper ${activeTab === 'home' ? '' : 'space-atmosphere--static'}`} aria-hidden="true">
      {/* Canvas for twinkling stars */}
      <canvas ref={canvasRef} className="atmosphere-canvas" />

      {/* Floating dust particles — desktop only */}
      <canvas ref={dustCanvasRef} className="dust-canvas atmosphere-desktop-only" />

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
