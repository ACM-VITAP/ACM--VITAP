import React, { useEffect, useState } from 'react';

const GREETING = "HELLO, I'M NEX — YOUR ACM COMPANION.\nWELCOME TO ACM VIT-AP.\nLET'S COMPUTE WHAT'S NEXT.";
const GREETING_SEEN_KEY = 'acm-vitap-nex-greeting-seen';

export default function NexGreeting() {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let typeTimer;
    let hideTimer;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    try {
      if (window.localStorage.getItem(GREETING_SEEN_KEY) === 'true') return undefined;
      window.localStorage.setItem(GREETING_SEEN_KEY, 'true');
    } catch {
      // Continue gracefully if storage is blocked by browser privacy settings.
    }

    const revealTimer = window.setTimeout(() => {
      setVisible(true);

      if (reducedMotion) {
        setMessage(GREETING);
        hideTimer = window.setTimeout(() => setVisible(false), 4600);
        return;
      }

      let index = 0;

      typeTimer = window.setInterval(() => {
        index += 1;
        setMessage(GREETING.slice(0, index));

        if (index >= GREETING.length) {
          window.clearInterval(typeTimer);
          hideTimer = window.setTimeout(() => setVisible(false), 4600);
        }
      }, 38);
    }, 1500);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearInterval(typeTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div
      className={`hero-nex-greeting ${visible ? 'is-visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="NEX greeting"
    >
      <span className="hero-nex-greeting-label">NEX // TRANSMISSION</span>
      <span className="hero-nex-greeting-message">{message}</span>
      <span className="hero-nex-greeting-cursor" aria-hidden="true" />
    </div>
  );
}
