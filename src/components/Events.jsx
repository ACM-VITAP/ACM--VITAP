import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { EVENT_CATEGORIES } from '../data/events.js';

const tiles = [
  ['treasure-hunt', 'Community', 'COMMUNITY EVENT', 'TREASURE HUNT', 'Decode. Discover. Conquer Together.', '12% 52%'],
  ['kbc', 'Competitions', 'COMPETITION', 'KBC – KAUN BANEGA CODEPATHI', 'Play. Think. Code. Win.', '48% 46%'],
  ['cyber-security-webinar', 'Tech Talks', 'TECH TALK', 'CYBER SECURITY WEBINAR WITH SANDEEP KUMAR', 'Defend. Detect. Decode Digital Threats.', 'center center'],
  ['ashutosh', 'Tech Talks', 'TECH TALK', 'ASHUTOSH WEBINAR – BEYOND THE CLASSROOM', 'Real Conversations. Deeper Perspectives.', '82% 46%'],
  ['prompt-battle', 'Competitions', 'COMMUNITY EVENT', 'PROMPT BATTLE', 'Imagine. Prompt. Create.', '16% 80%'],
  ['technical-workshop', 'Workshops', 'WORKSHOP', 'TECHNICAL WORKSHOP', 'Learn. Build. Grow.', '52% 80%'],
  ['freshers', 'Community', 'COMMUNITY EVENT', 'FRESHERS MEET AND GREET', 'New Faces. Shared Passions. Stronger Community.', '86% 80%'],
].map(([id, category, tag, title, subtitle, position]) => ({
  id,
  category,
  tag,
  title,
  subtitle,
  position,
  image: {
    'kbc': '/eventspictures/KBC.webp',
    'treasure-hunt': '/eventspictures/treasurehunt.webp',
    'cyber-security-webinar': '/eventspictures/cybersecurity Webinar/event-banner.png',
    'ashutosh': '/eventspictures/ashutosh.webp',
    'prompt-battle': '/eventspictures/promptbattle.webp',
    'technical-workshop': '/eventspictures/technical workshop.webp',
    'freshers': '/eventspictures/meetandgreet.webp',
  }[id] || '/assets/panels/08-events-section.jpg',
}));

function EventTile({ event, featured = false }) {
  return (
    <article className={`reference-event-tile event-${event.id} ${featured ? 'reference-event-tile--featured' : ''}`}>
      {event.video ? <video
        src={event.video}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        poster={event.image}
        aria-label={`${event.title} event video`}
      /> : <img
        src={event.image}
        alt={event.title}
        loading="lazy"
        decoding="async"
        style={{ objectPosition: event.position }}
      />}
      <div className="reference-event-shade" />
      <div className="reference-event-copy">
        <h3>{event.title}</h3>
        <p>{event.subtitle}</p>
      </div>
      <button className="reference-event-arrow" aria-label={`View ${event.title}`}>
        <ArrowRight size={22} />
      </button>
    </article>
  );
}

export default function Events() {
  const [activeCategory, setActiveCategory] = useState('All Events');
  const filtered = activeCategory === 'All Events' ? tiles : tiles.filter((event) => event.category === activeCategory);
  const featured = {
    title: 'ACM QUEST',
    subtitle: 'A thrilling challenge of knowledge, logic and teamwork inspired by the world of Spider-Man.',
    tag: '★  FEATURED EVENT',
    image: '/eventspictures/acmquest.webp',
    video: '/eventspictures/Acm Quest/2026-10-31 22-27-43.mp4',
    position: 'center',
  };

  return (
    <section className="section-full events-section-wrap reference-events" id="events">
      <div className="section-header-cluster reference-events-header">
        <div className="section-eyebrow-badge">
          <span>OUR EVENTS</span>
        </div>
        <h2 className="section-headline-large">
          EVENTS THAT<br />CREATE <span className="blue-highlight">CHANGE.</span>
        </h2>
        <p className="section-subtext-lede">
          From workshops to hackathons, we turn ideas into real-world impact.<br />
          Join a community that builds, learns, and innovates together.
        </p>
      </div>
      <div className="events-filter-strip reference-event-filters" role="tablist" aria-label="Event categories">
        {EVENT_CATEGORIES.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={activeCategory === category}
            className={`event-filter-pill ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {activeCategory === 'All Events' && <EventTile featured event={featured} />}
      <div className="reference-events-grid">
        {filtered.map((event) => (
          <EventTile key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
