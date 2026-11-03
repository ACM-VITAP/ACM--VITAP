// ---------------------------------------------------------------------------
// src/components/About.jsx — Comprehensive Futuristic About Page for ACM VIT-AP
// ---------------------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import {
  Code2,
  Trophy,
  Cpu,
  Users,
  Compass,
  ArrowRight,
  ExternalLink,
  CalendarCheck,
  Palette,
  Share2,
  FileSpreadsheet,
  Layers,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  CheckCircle2,
  Target,
  Flame,
  Award,
  Globe,
  Radio,
  BookOpen,
  ChevronRight,
  MessageSquare,
  Sparkle,
  Zap,
} from 'lucide-react';
import { FACULTY_COORDINATOR, ADMIN_PRESIDENCY, ADMIN_CORE_OFFICERS } from '../data/team.js';

export default function About({ onNavigate }) {
  const [activeStoryTab, setActiveStoryTab] = useState('vision');

  // Immediate fail-safe reveal for About elements in initial viewport on mount
  useEffect(() => {
    const triggerInitialReveals = () => {
      const targets = document.querySelectorAll(
        '.about-futuristic-page .about-stagger-float, .about-futuristic-page .about-float-up'
      );
      targets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 1.15) {
          el.classList.add('is-in-view');
        }
      });
    };

    triggerInitialReveals();
    const timer = setTimeout(triggerInitialReveals, 80);
    return () => clearTimeout(timer);
  }, []);

  const activities = [
    {
      title: 'Technical Workshops',
      icon: Code2,
      tag: 'Skill Engineering',
      desc: 'Hands-on intensive sessions, full-stack architectural labs, AI/ML pipelines, system design, and emerging cloud technologies.',
      gradient: 'from-cyan-500/20 to-blue-600/10',
      borderGlow: 'rgba(0, 212, 255, 0.4)',
    },
    {
      title: 'Hackathons & Competitions',
      icon: Trophy,
      tag: 'Competitive Spirit',
      desc: 'Multi-hour sprint challenges and national-level computational showdowns encouraging algorithmic problem-solving, rapid prototyping, and teamwork.',
      gradient: 'from-amber-500/20 to-orange-600/10',
      borderGlow: 'rgba(255, 170, 0, 0.4)',
    },
    {
      title: 'Projects & Research',
      icon: Cpu,
      tag: 'Applied Innovation',
      desc: 'Building practical open-source solutions, publishing paper drafts, and incubating functional prototypes from whiteboard to production.',
      gradient: 'from-purple-500/20 to-indigo-600/10',
      borderGlow: 'rgba(168, 85, 247, 0.4)',
    },
    {
      title: 'Community & Networking',
      icon: Users,
      tag: 'Global Syndicate',
      desc: 'Connecting ambitious student developers, alumni engineers at top tech firms, open-source contributors, and industry mentors.',
      gradient: 'from-emerald-500/20 to-teal-600/10',
      borderGlow: 'rgba(16, 185, 129, 0.4)',
    },
    {
      title: 'Guest Lectures & Summits',
      icon: Radio,
      tag: 'Industry Wisdom',
      desc: 'Direct interactive keynotes from senior software architects, deep-tech researchers, tech startup founders, and global pioneers.',
      gradient: 'from-sky-500/20 to-blue-600/10',
      borderGlow: 'rgba(56, 189, 248, 0.4)',
    },
    {
      title: 'Creative Initiatives',
      icon: Palette,
      tag: 'Interdisciplinary Craft',
      desc: 'Synthesizing computing, UI/UX aesthetics, digital storytelling, motion design, and high-energy interactive event experiences.',
      gradient: 'from-pink-500/20 to-rose-600/10',
      borderGlow: 'rgba(244, 63, 94, 0.4)',
    },
  ];

  const departments = [
    {
      name: 'Technical',
      id: 'technical',
      number: '01',
      icon: Code2,
      desc: 'Website development, software architecture, technical workshops, and chapter project initiatives.',
    },
    {
      name: 'Event Management',
      id: 'events',
      number: '02',
      icon: CalendarCheck,
      desc: 'Strategic planning, stage management, competition workflows, and student volunteer contingents.',
    },
    {
      name: 'Creative',
      id: 'creative',
      number: '04',
      icon: Palette,
      desc: 'Visual design systems, branding, 3D assets, futuristic posters, and immersive UI/UX experiences.',
    },
    {
      name: 'Social Media',
      id: 'social-media',
      number: '03',
      icon: Share2,
      desc: 'Digital communications, algorithmic outreach, engagement campaigns, and media storytelling.',
    },
    {
      name: 'Documentation',
      id: 'documentation',
      number: '05',
      icon: FileSpreadsheet,
      desc: 'Formal event reports, academic dossiers, governance archives, and organizational knowledge bases.',
    },
    {
      name: 'Project & Research',
      id: 'research',
      number: '06',
      icon: Cpu,
      desc: 'Exploration of cutting-edge computing, paper writing, collaborative prototypes, and applied R&D.',
    },
    {
      name: 'ACM-W',
      id: 'acm-w',
      number: '07',
      icon: HeartHandshake,
      desc: 'Specialized programs, tech bootcamps, and initiatives championing and celebrating women in computing.',
    },
  ];

  const milestones = [
    {
      year: '2021',
      badge: 'Chapter Genesis',
      title: 'Charter & Establishment',
      desc: 'ACM Student Chapter was formally chartered at VIT-AP University under the leadership of Dr. Nagaraju Devarakonda and founding student pioneers.',
    },
    {
      year: '2022',
      badge: 'Rapid Scale',
      title: 'First Flagship Hackathon',
      desc: 'Organized first university-wide coding marathon, onboarding 400+ participants and establishing 5 core technological interest wings.',
    },
    {
      year: '2023',
      badge: 'Ecosystem Expansion',
      title: 'ACM-W & Research Inception',
      desc: 'Inaugurated the dedicated ACM-W chapter wing and launched collaborative research study groups in artificial intelligence and systems.',
    },
    {
      year: '2024 - Present',
      badge: 'Computational Universe',
      title: 'State-of-the-Art Operations',
      desc: 'Crossed 1,200+ active members, hosting 48-hour continuous national hackathons, global tech talks, and open-source software contributions.',
    },
  ];

  const coreValues = [
    {
      title: 'Learning',
      icon: BookOpen,
      code: 'VAL-01',
      desc: 'Continuously refining computational proficiency, exploring uncharted software paradigms, and advancing technical excellence.',
    },
    {
      title: 'Collaboration',
      icon: Users,
      code: 'VAL-02',
      desc: 'Sharing open knowledge without barriers, pair-programming across disciplines, and building resilient scalable systems together.',
    },
    {
      title: 'Innovation',
      icon: Lightbulb,
      code: 'VAL-03',
      desc: 'Daring to experiment with unproven concepts, prototyping rapid MVPs, and turning theoretical ideas into real-world software.',
    },
    {
      title: 'Inclusivity',
      icon: HeartHandshake,
      code: 'VAL-04',
      desc: 'Creating equal, open launchpads for students of every skill tier, department, background, and perspective to flourish in computing.',
    },
    {
      title: 'Ownership',
      icon: Award,
      code: 'VAL-05',
      desc: 'Taking personal responsibility for projects, event execution, community wellbeing, and the long-term legacy of the chapter.',
    },
  ];

  return (
    <div className="about-futuristic-page">
      {/* ─── 1. HERO SECTION: WHO WE ARE ─────────────────────────────────── */}
      <section className="about-hero-block" id="about-hero">
        <div className="about-hero-hud-frame">
          <div className="about-hero-grid about-hero-entrance is-in-view">
            <div className="about-hero-content">
              <h1 className="about-hero-headline">
                Where Curiosity Meets <span className="cyber-cyan-gradient">Computing.</span>
              </h1>

              <div className="about-subheadline-motto">
                <span>Learn.</span> <span className="dot-sep">&middot;</span>
                <span>Build.</span> <span className="dot-sep">&middot;</span>
                <span>Collaborate.</span> <span className="dot-sep">&middot;</span>
                <span className="innovate-glow">Innovate.</span>
              </div>

              <p className="about-hero-paragraph">
                The <strong>ACM Student Chapter at VIT-AP University</strong> is a premier student-driven technology community passionate about computing, software engineering, and scientific innovation. We bring together curious minds to learn high-demand skills, build meaningful software, exchange bold ideas, and accelerate personal growth through peer-led collaboration.
              </p>

              <div className="about-hero-actions-row">
                <a
                  href="#what-we-do"
                  className="about-btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('what-we-do')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Layers size={16} />
                  <span>Explore Our Activities</span>
                  <ArrowRight size={15} />
                </a>

                <button
                  type="button"
                  className="about-btn-secondary"
                  onClick={() => onNavigate && onNavigate('teams')}
                >
                  <Users size={16} />
                  <span>Meet Our Team</span>
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* ACM Official Emblem Showcase with Blue Aura Glow & Floating Animation */}
            <div className="about-hero-visual-frame">
              <div className="about-logo-stage-glass">
                {/* Background Ambient Radial Aura & Particle Rings */}
                <div className="logo-aura-glow-core" />
                <div className="logo-aura-ring ring-outer" />
                <div className="logo-aura-ring ring-mid" />

                {/* Floating 3D Emblem Container */}
                <div className="logo-floating-wrapper">
                  <div className="logo-emblem-disc">
                    <img
                      src="/assets/acm-logo-transparent.png"
                      alt="ACM Student Chapter VIT-AP University Official Emblem"
                      className="acm-official-floating-logo"
                    />
                    <div className="logo-specular-sweep" />
                  </div>
                </div>

                {/* Status Bar / Chapter Badge */}
                <div className="logo-stage-footer">
                  <div className="stage-footer-text">
                    <span className="stage-title">Association for Computing Machinery</span>
                    <span className="stage-subtitle">VIT-AP University Student Chapter</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 2. OUR STORY ────────────────────────────────────────────────── */}
      <section className="about-section-shell" id="our-story">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <Compass size={13} />
            <span>OUR GENESIS & JOURNEY</span>
          </div>
          <h2 className="about-section-title">
            The Story Behind <span className="cyber-cyan-gradient">Our Community.</span>
          </h2>
          <p className="about-section-subtitle">
            Why ACM VIT-AP exists, what drives our initiatives, and how we empower student innovators to build beyond the boundaries of standard curriculums.
          </p>
        </div>

        <div className="about-story-grid about-stagger-float">
          <div className="story-card-glass">
            <div className="story-card-icon-wrap">
              <Code2 size={24} className="text-cyan" />
            </div>
            <h3 className="story-card-title">Empowering Computing Enthusiasts</h3>
            <p className="story-card-desc">
              ACM VIT-AP was established as a launchpad for students seeking practical exposure to computing. We bridge university academia with modern tech industry stacks, giving every member a space to test bold hypotheses and build production-grade applications.
            </p>
          </div>

          <div className="story-card-glass">
            <div className="story-card-icon-wrap">
              <Lightbulb size={24} className="text-cyan" />
            </div>
            <h3 className="story-card-title">Learning Beyond Classroom Walls</h3>
            <p className="story-card-desc">
              We firmly believe that computer science is best mastered through direct creation. From open-source git workflows to distributed microservices and generative AI, our members gain battle-tested experience through hackathons, code clinics, and collaborative repositories.
            </p>
          </div>

          <div className="story-card-glass">
            <div className="story-card-icon-wrap">
              <Users size={24} className="text-cyan" />
            </div>
            <h3 className="story-card-title">Holistic Growth: Tech & Synergy</h3>
            <p className="story-card-desc">
              Great software requires more than raw code. We seamlessly connect technical developers with creative designers, documentation authors, event planners, and media strategists—fostering real-world interdisciplinary leadership and communication skills.
            </p>
          </div>
        </div>
      </section>

      {/* ─── 3. MISSION AND VISION ───────────────────────────────────────── */}
      <section className="about-section-shell" id="mission-vision">
        <div className="about-mv-cluster about-stagger-float">
          {/* Mission Card */}
          <div className="mv-card-glass mission-glass">
            <div className="mv-card-badge">
              <Target size={14} />
              <span>CORE PURPOSE</span>
            </div>
            <h2 className="mv-card-heading">Our Mission</h2>
            <div className="mv-quote-decor">“</div>
            <p className="mv-card-text">
              To create an inclusive, rigorous, and inspiring learning environment where students develop industry-relevant technical skills, explore emerging computational frontiers, collaborate on impactful real-world projects, and prepare with confidence for global engineering challenges.
            </p>
            <ul className="mv-checklist">
              <li><CheckCircle2 size={15} /> Hands-on skill acceleration across all years</li>
              <li><CheckCircle2 size={15} /> Open peer collaboration without prerequisites</li>
              <li><CheckCircle2 size={15} /> Direct pathway to open-source and hackathon excellence</li>
            </ul>
            <div className="mv-glow-orb cyan-orb" />
          </div>

          {/* Vision Card */}
          <div className="mv-card-glass vision-glass">
            <div className="mv-card-badge">
              <Compass size={14} />
              <span>FUTURE HORIZON</span>
            </div>
            <h2 className="mv-card-heading">Our Vision</h2>
            <div className="mv-quote-decor">“</div>
            <p className="mv-card-text">
              To build a thriving, internationally recognized student technology community that encourages groundbreaking innovation, practical problem-solving, open-source contribution, and lifelong continuous learning across diverse fields of computing.
            </p>
            <ul className="mv-checklist">
              <li><CheckCircle2 size={15} /> Cultivating high-caliber technical leaders</li>
              <li><CheckCircle2 size={15} /> Building sustainable chapter software products</li>
              <li><CheckCircle2 size={15} /> Championing gender diversity through ACM-W</li>
            </ul>
            <div className="mv-glow-orb purple-orb" />
          </div>
        </div>
      </section>

      {/* ─── 4. WHAT WE DO (VISUALLY DISTINCT CARDS) ─────────────────────── */}
      <section className="about-section-shell" id="what-we-do">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <Layers size={13} />
            <span>ACTIVITIES & INITIATIVES</span>
          </div>
          <h2 className="about-section-title">
            What We <span className="cyber-cyan-gradient">Do.</span>
          </h2>
          <p className="about-section-subtitle">
            From overnight hackathons to deep-dive workshops, explore the dynamic pillars that make our student chapter vibrate with constant engineering momentum.
          </p>
        </div>

        <div className="about-activities-grid about-stagger-float">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div
                key={act.title}
                className="activity-glass-card"
                style={{ '--glow-color': act.borderGlow }}
              >
                <div className="activity-card-top">
                  <div className="activity-icon-container">
                    <Icon size={22} className="activity-icon-svg" />
                  </div>
                  <span className="activity-tag-badge">{act.tag}</span>
                </div>

                <h3 className="activity-card-title">{act.title}</h3>
                <p className="activity-card-desc">{act.desc}</p>

                <div className="activity-card-footer">
                  <span className="activity-active-dot" />
                  <span className="activity-footer-label">Annual Initiative</span>
                </div>

                {/* Decorative Cyber Brackets */}
                <span className="corner-bracket top-l" />
                <span className="corner-bracket bottom-r" />
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 5. OUR DEPARTMENTS ──────────────────────────────────────────── */}
      <section className="about-section-shell" id="our-departments">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <Users size={13} />
            <span>SPECIALIZED PILLARS</span>
          </div>
          <h2 className="about-section-title">
            Our <span className="cyber-cyan-gradient">Departments.</span>
          </h2>
          <p className="about-section-subtitle">
            Seven specialized student wings operate collaboratively to deliver exceptional events, software, design, and research across VIT-AP University.
          </p>
        </div>

        <div className="about-depts-grid about-stagger-float">
          {departments.map((dept) => {
            const DeptIcon = dept.icon;
            return (
              <div
                key={dept.id}
                className="dept-capsule-card"
                onClick={() => onNavigate && onNavigate('teams')}
                role="button"
                tabIndex={0}
                title={`Click to view ${dept.name} Team in our Roster`}
              >
                <div className="dept-capsule-badge">
                  <DeptIcon size={18} className="text-cyan" />
                  <span className="dept-num">DEPT {dept.number}</span>
                </div>
                <h3 className="dept-capsule-name">{dept.name}</h3>
                <p className="dept-capsule-desc">{dept.desc}</p>
                <div className="dept-capsule-action">
                  <span>View Department Team</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 6. OUR IMPACT AND MILESTONES ────────────────────────────────── */}
      <section className="about-section-shell" id="impact-milestones">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <Trophy size={13} />
            <span>PROVEN NUMBERS & MILESTONES</span>
          </div>
          <h2 className="about-section-title">
            Our Impact & <span className="cyber-cyan-gradient">Journey.</span>
          </h2>
          <p className="about-section-subtitle">
            Quantifiable growth and significant milestones that define our expanding technological legacy.
          </p>
        </div>

        {/* Impact Numbers Strip */}
        <div className="about-stats-matrix about-stagger-float">
          <div className="stat-matrix-cell">
            <span className="stat-num-neon">1,200+</span>
            <span className="stat-label-dim">Active Members</span>
            <span className="stat-subdetail">Across undergraduate & masters streams</span>
          </div>
          <div className="stat-matrix-cell">
            <span className="stat-num-neon">50+</span>
            <span className="stat-label-dim">Events Conducted</span>
            <span className="stat-subdetail">Technical, collaborative & flagship sprints</span>
          </div>
          <div className="stat-matrix-cell">
            <span className="stat-num-neon">3,500+</span>
            <span className="stat-label-dim">Students Reached</span>
            <span className="stat-subdetail">University and pan-India participants</span>
          </div>
          <div className="stat-matrix-cell">
            <span className="stat-num-neon">25+</span>
            <span className="stat-label-dim">Guest Lecturers & Mentors</span>
            <span className="stat-subdetail">Industry leaders, engineers & researchers</span>
          </div>
        </div>

        {/* Chronological Milestone Timeline */}
        <div className="about-timeline-track about-stagger-float">
          <div className="timeline-track-rail" />
          {milestones.map((milestone, idx) => (
            <div key={milestone.year} className="timeline-checkpoint-node">
              <div className="checkpoint-year-pill">
                <span className="checkpoint-dot" />
                <span>{milestone.year}</span>
              </div>
              <div className="checkpoint-card-glass">
                <span className="checkpoint-kicker">{milestone.badge}</span>
                <h4 className="checkpoint-title">{milestone.title}</h4>
                <p className="checkpoint-text">{milestone.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 7. OUR COMMUNITY & VALUES ───────────────────────────────────── */}
      <section className="about-section-shell" id="values">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <HeartHandshake size={13} />
            <span>THE CULTURE WE LIVE BY</span>
          </div>
          <h2 className="about-section-title">
            Our Community & <span className="cyber-cyan-gradient">Core Values.</span>
          </h2>
          <p className="about-section-subtitle">
            Five non-negotiable principles that shape our character, our code reviews, and our chapter culture every single day.
          </p>
        </div>

        <div className="about-values-grid about-stagger-float">
          {coreValues.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="value-capsule-glass">
                <div className="value-header-flex">
                  <div className="value-icon-box">
                    <Icon size={20} className="text-cyan" />
                  </div>
                  <span className="value-code-tag">{val.code}</span>
                </div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── 8. FACULTY GUIDANCE AND LEADERSHIP ───────────────────────────── */}
      <section className="about-section-shell" id="faculty-leadership">
        <div className="about-section-header text-center about-float-up">
          <div className="about-pill-kicker">
            <GraduationCap size={13} />
            <span>STEWARDSHIP & GOVERNANCE</span>
          </div>
          <h2 className="about-section-title">
            Faculty Guidance & <span className="cyber-cyan-gradient">Student Leadership.</span>
          </h2>
          <p className="about-section-subtitle">
            Our chapter thrives on the intersection of academic wisdom, faculty mentorship, and energetic student self-governance.
          </p>
        </div>

        <div className="leadership-spotlight-matrix about-stagger-float">
          {/* Faculty Coordinator Card */}
          <div className="faculty-spotlight-card">
            <div className="faculty-card-badge-row">
              <span className="badge-pill-cyan">FACULTY COORDINATOR & MENTOR</span>
              <span className="badge-pill-subtle">VIT-AP UNIVERSITY</span>
            </div>

            <div className="faculty-card-profile-split">
              <div className="faculty-avatar-circle">
                <img
                  src={FACULTY_COORDINATOR.photo}
                  alt={FACULTY_COORDINATOR.name}
                  className="faculty-avatar-img"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="faculty-info-cluster">
                <h3 className="faculty-title-name">{FACULTY_COORDINATOR.name}</h3>
                <span className="faculty-sub-role">
                  {FACULTY_COORDINATOR.designation} &middot; {FACULTY_COORDINATOR.institution}
                </span>
                <p className="faculty-statement-short">
                  “Empowering student technologists to push the boundaries of algorithmic thinking and computational engineering through continuous research and inclusive practice.”
                </p>
              </div>
            </div>
          </div>

          {/* Executive Presidency Brief */}
          <div className="exec-preview-card">
            <div className="exec-preview-header">
              <span className="badge-pill-cyan">STUDENT EXECUTIVE LEADERSHIP</span>
              <button
                type="button"
                className="meet-full-team-link"
                onClick={() => onNavigate && onNavigate('teams')}
              >
                <span>Meet the Full Team</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="exec-intro-quote">
              Our chapter is entirely student-led, structured to give aspiring leaders hands-on experience in organizational governance, high-stakes event execution, and engineering stewardship.
            </p>

            <div className="exec-presidency-duo">
              {ADMIN_PRESIDENCY.map((pres) => (
                <div key={pres.id} className="exec-member-compact">
                  <div className="exec-compact-avatar">
                    <img
                      src={pres.photo}
                      alt={pres.name}
                      className="exec-img"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="exec-compact-details">
                    <strong className="exec-compact-name">{pres.name}</strong>
                    <span className="exec-compact-role">{pres.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. JOIN THE ACM COMMUNITY ─────────────────── */}
      <section className="about-join-portal-section" id="join-community">
        <div className="about-join-portal-glass about-float-up">
          <div className="join-portal-ambient-light" />
          <div className="join-portal-hud-bar">
            <span className="portal-code">MEMBERSHIP & COMMUNITY</span>
            <span className="portal-indicator-live">OPEN RECRUITMENT</span>
          </div>

          <div className="join-portal-body">
            <h2 className="join-portal-headline">
              Your Next Idea <span className="cyber-cyan-gradient">Could Start Here.</span>
            </h2>

            <p className="join-portal-paragraph">
              Whether you’re writing your very first line of code, exploring novel research, engineering a full-stack product, or looking to connect with like-minded student builders, there is a vibrant place for you in our community.
            </p>

            <div className="join-portal-buttons-grid">
              <button
                type="button"
                className="join-portal-btn primary-portal"
                onClick={() => onNavigate && onNavigate('events')}
              >
                <CalendarCheck size={17} />
                <span>Explore Upcoming Events</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="join-portal-btn secondary-portal"
                onClick={() => onNavigate && onNavigate('contact')}
              >
                <Zap size={17} />
                <span>Join Our Community</span>
                <ExternalLink size={15} />
              </button>

              <a
                href="https://www.linkedin.com/company/acm-student-chapter-vit-ap/"
                target="_blank"
                rel="noopener noreferrer"
                className="join-portal-btn outline-portal"
              >
                <Globe size={17} />
                <span>Follow Us Online</span>
                <ExternalLink size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
