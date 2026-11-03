// ---------------------------------------------------------------------------
// src/data/team.js — ACM VIT-AP Student Chapter Team Data
// ---------------------------------------------------------------------------

// ─── 0] FACULTY COORDINATOR ──────────────────────────────────────────────
export const FACULTY_COORDINATOR = {
  id: 'faculty-coordinator',
  name: 'Dr. Nagaraju Devarakonda',
  role: 'Faculty Coordinator',
  designation: 'Professor Grade 2',
  institution: 'VIT-AP University',
  photo: '/team-photos/Nagaraju Devarakonda .png',
  eyebrow: 'FACULTY & MENTORSHIP',
  headline: 'GUIDED BY KNOWLEDGE. DRIVEN BY CURIOSITY.',
  subtext: 'Academic guidance that empowers students to explore computing, research, innovation, and leadership.',
  bio: 'Guiding the ACM VIT-AP chapter towards academic excellence, innovative thinking, and impactful student development in computing and technology.',
  quote: 'Empowering students to turn ideas into impact.',
  messageTitle: 'Message from the Faculty Coordinator',
  messageBody: 'The ACM Student Chapter at VIT-AP provides a platform for students to learn, collaborate, innovate, and grow beyond the classroom. Through technical events, hands-on projects, and community initiatives, we aim to nurture curiosity, encourage meaningful exploration, and build a strong foundation for future leaders in computing.',
  socials: {
    email: 'mailto:nagaraju.d@vitap.ac.in',
    linkedin: 'https://www.linkedin.com/in/dr-nagaraju-devarakonda-0b731936/',
    website: 'https://vitap.ac.in',
  },
};

// ─── 1] ADMIN TEAM ─────────────────────────────────────────────────────────
// Tier 1A: Chief Advisors (Top-level executive advisory)
export const ADMIN_CHIEF_ADVISORS = [
  {
    id: 'chief-advisor-1',
    name: 'Tushar Kumaran',
    role: 'Chief Advisor',
    badge: 'EXECUTIVE ADVISOR',
    photo: '/team-photos/tushar_passport.jpg',
    photoCrop: 'center center',
    quote: 'Guiding visionary computing initiatives and mentoring student leadership.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'chief-advisor-2',
    name: 'Charan Achanta',
    role: 'Chief Advisor',
    badge: 'EXECUTIVE ADVISOR',
    photo: '/team-photos/charan achanta.jpeg',
    photoCrop: 'center center',
    quote: 'Advising strategic development, industry engagement, and technical excellence.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// Tier 1B: Core Presidency (President & Vice President)
export const ADMIN_PRESIDENCY = [
  {
    id: 'president',
    name: 'Shaik Haaris',
    role: 'President',
    badge: 'EXECUTIVE LEADERSHIP',
    photo: '/team-photos/haaris_passport.jpg',
    photoCrop: 'center center',
    quote: 'Leading the computational frontier and uniting innovators across disciplines.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'vice-president',
    name: 'Dharineesh M R',
    role: 'Vice President',
    badge: 'EXECUTIVE LEADERSHIP',
    photo: '/team-photos/dharineesh_passport.jpg',
    photoCrop: 'center center',
    quote: 'Empowering student builders to engineer scalable, high-impact systems.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// Tier 2: 3 in a row — Secretary, Joint Secretary, Treasurer
export const ADMIN_CORE_OFFICERS = [
  {
    id: 'secretary',
    name: 'Siddhartha BVS',
    role: 'Secretary',
    badge: 'CORE OFFICER',
    photo: '/team-photos/siddhartha_passport.jpg',
    photoCrop: 'center center',
    quote: 'Orchestrating chapter governance, documentation, and structural synergy.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'joint-secretary',
    name: 'Gundlapalli Mohana Ramya',
    role: 'Joint Secretary',
    badge: 'CORE OFFICER',
    photo: '/team-photos/GUNDLAPALLI MOHANA RAMYA .jpeg',
    photoCrop: 'center center',
    quote: 'Coordinating chapter administration, communication, and student leadership initiatives.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'treasurer',
    name: 'Shreeyansh',
    role: 'Treasurer',
    badge: 'CORE OFFICER',
    photo: '/team-photos/sreeyansh_passport.jpg',
    photoCrop: 'center center',
    quote: 'Managing financial frameworks, budgeting, and sponsorship allocations.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// Tier 3: Operations & Management
export const ADMIN_MANAGERS = [
  {
    id: 'technical-manager',
    name: 'Dhyanesh',
    role: 'Technical Manager',
    badge: 'TECHNICAL LEAD',
    photo: '/team-photos/dhyanesh_passport.jpg',
    photoCrop: 'center center',
    quote: 'Leading technical architectures, hackathons, and development sprints.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'event-manager-core',
    name: 'Likith Raghav',
    role: 'Event Manager',
    badge: 'OPERATIONS LEAD',
    photo: '/team-photos/thottempudi_raghav.jpg',
    photoCrop: 'center 20%',
    quote: 'Curating seamless technical experiences and high-impact chapter gatherings.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
  {
    id: 'social-media-manager-core',
    name: 'Yazhini K B',
    role: 'Social Media Manager',
    badge: 'OPERATIONS LEAD',
    photo: '/team-photos/yazhini_passport.jpg',
    photoCrop: 'center center',
    quote: 'Amplifying the chapter narrative, digital campaigns, and community reach.',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
    },
  },
];

// ─── DOMAINS & DEPARTMENTS ──────────────────────────────────────────────────
// Rules:
// - Lead is separate in middle (1 in row)
// - Remaining Co-leads/Managers grouped below as in Admin team (3 or 2 per row)
// - NO registration numbers or phone numbers

export const DOMAIN_TEAMS = [
  {
    id: 'technical',
    departmentNumber: '01',
    title: 'Technical Team',
    iconName: 'Code2',
    desc: 'Architecting scalable web platforms, core algorithmic frameworks, open-source repositories, and hackathon prototypes.',
    lead: {
      id: 'tech-lead',
      name: 'Krishna Chaitanya Kona',
      role: 'Team Lead',
      photo: '/team-photos/krishna_chaitanya.jpg',
      quote: 'Building foundational technical systems that power the chapter’s computational vision.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'tech-colead-1',
        name: 'Litheeswar Kakarla',
        role: 'Co-Lead',
        photo: '/team-photos/litheeswar.jpg',
        quote: 'Driving hands-on workshops, technical mentorship, and systems development.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'tech-colead-2',
        name: 'Dipanjana Ghosh',
        role: 'Co-Lead',
        photo: '/team-photos/dipanjana.jpg',
        quote: 'Fostering innovative student engineering and open-source contributions.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'tech-manager',
        name: 'Vishrabdha Chatterjee',
        role: 'Technical Project Manager',
        photo: '/team-photos/vishrabdha.jpg',
        quote: 'Coordinating core technical workflows, code reviews, and developer environments.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'events',
    departmentNumber: '02',
    title: 'Event Management Team',
    iconName: 'CalendarCheck',
    desc: 'Executing premier flagship hackathons, high-energy tech speaker summits, workshops, student engagements, and community volunteer drives.',
    hierarchyTiers: [
      {
        title: 'Events Manager',
        variant: 'lead',
        members: [
          {
            id: 'event-manager-dept',
            name: 'Valupadasu Taneesh Kumar',
            role: 'Events Manager',
            photo: '/team-photos/taneesh.jpg',
            photoCrop: 'center 45%',
            quote: 'Supervising flagship event execution, volunteer coordination, venue logistics, and attendee operations.',
            socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
          },
        ],
      },
      {
        title: 'Volunteer Management',
        variant: 'lead',
        members: [
          {
            id: 'event-volunteer-manager-dept',
            name: 'Rayapudi Sai Ganesh',
            role: 'Volunteer Manager',
            photo: '/team-photos/sai_ganesh_passport.jpg',
            photoCrop: 'center center',
            quote: 'Mobilizing student volunteer contingents and ensuring smooth operational readiness across events.',
            socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
          },
        ],
      },
      {
        title: 'Event Leadership',
        variant: 'officer',
        members: [
          {
            id: 'event-lead-dept',
            name: 'Tetala Lakshmi Sreeraghava',
            role: 'Lead',
            photo: '/team-photos/TETALA LAKSHMI SREERAGHAVA.jpeg',
            photoCrop: 'center 42%',
            photoZoom: 1.55,
            quote: 'Leading event architecture, technical stages, timing, and volunteer initiatives.',
            socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
          },
          {
            id: 'event-colead-dept',
            name: 'Vendra Akash Chandra',
            role: 'Co-Lead',
            photo: '/team-photos/vendra akash chandra.png',
            photoCrop: 'center 38%',
            quote: 'Coordinating stage schedules, volunteer task tracks, technical logistics, and crowd flow.',
            socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
          },
        ],
      },
    ],
    lead: {
      id: 'event-lead-dept',
      name: 'Tetala Lakshmi Sreeraghava',
      role: 'Lead',
      photo: '/team-photos/TETALA LAKSHMI SREERAGHAVA.jpeg',
      photoCrop: 'center 15%',
      quote: 'Leading event architecture, technical stages, timing, and volunteer initiatives.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'event-manager-dept',
        name: 'Valupadasu Taneesh Kumar',
        role: 'Events Manager',
        photo: '/team-photos/taneesh.jpg',
        photoCrop: 'center 45%',
        quote: 'Supervising flagship event execution, volunteer coordination, venue logistics, and attendee operations.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'event-volunteer-manager-dept',
        name: 'Rayapudi Sai Ganesh',
        role: 'Volunteer Manager',
        photo: '/team-photos/sai_ganesh_passport.jpg',
        photoCrop: 'center center',
        quote: 'Mobilizing student volunteer contingents and ensuring smooth operational readiness across events.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'event-lead-dept',
        name: 'Tetala Lakshmi Sreeraghava',
        role: 'Lead',
        photo: '/team-photos/TETALA LAKSHMI SREERAGHAVA.jpeg',
        photoCrop: 'center 42%',
        photoZoom: 1.55,
        quote: 'Leading event architecture, technical stages, timing, and volunteer initiatives.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'event-colead-dept',
        name: 'Vendra Akash Chandra',
        role: 'Co-Lead',
        photo: '/team-photos/vendra akash chandra.png',
        photoCrop: 'center 38%',
        quote: 'Coordinating stage schedules, volunteer task tracks, technical logistics, and crowd flow.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'social-media',
    departmentNumber: '03',
    title: 'Social Media Team',
    iconName: 'Share2',
    desc: 'Amplifying chapter achievements, spotlighting members, and driving digital reach across global platforms.',
    lead: {
      id: 'social-lead',
      name: 'Donepudi Vishwath',
      role: 'Team Lead',
      photo: '/team-photos/viswath.png',
      photoCrop: 'center center',
      quote: 'Broadcasting the story of ACM VIT-AP to global student and developer networks.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'social-colead-1',
        name: 'Rudraraju Sahasra',
        role: 'Co-Lead',
        photo: '/team-photos/RUDRARAJU SAHASRA.jpg',
        quote: 'Creating interactive social stories, campaigns, and community engagement posts.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'creative',
    departmentNumber: '04',
    title: 'Creative and Design Team',
    iconName: 'Palette',
    desc: 'Crafting visually arresting graphic identities, 3D brand assets, user interfaces, and media motion designs.',
    lead: {
      id: 'creative-lead',
      name: 'Dokka Akshitha Baby',
      role: 'Team Lead',
      photo: '/team-photos/akshitha.jpg',
      quote: 'Designing the visual language of futuristic computing and interactive art.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'creative-colead',
        name: 'Prakhar Kumar Pandey',
        role: 'Co-Lead',
        photo: '/team-photos/prakhar.png',
        photoCrop: 'center center',
        quote: 'Transforming ideas into polished UI/UX aesthetics, posters, and 3D mockups.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'marketing',
    departmentNumber: '05',
    title: 'Marketing Team',
    iconName: 'Megaphone',
    desc: 'Forging corporate outreach, expanding sponsorships, public relations, and cross-chapter collaborations.',
    lead: null,
    members: [
      {
        id: 'marketing-lead-1',
        name: 'Geethika Varma Sagiraju',
        role: 'Manager',
        photo: '/team-photos/geethika.jpg',
        quote: 'Strategic positioning and outreach to industry leaders and corporate sponsors.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
      {
        id: 'marketing-lead-2',
        name: 'Hansika Reddy Gillala',
        role: 'Manager',
        photo: '/team-photos/hansika gillela.jpeg',
        photoCrop: 'center center',
        quote: 'Driving campaign promotions, brand visibility, and sponsor relations.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'project-research',
    departmentNumber: '06',
    title: 'Project and Research Team',
    iconName: 'FlaskConical',
    desc: 'Exploring deep computing paradigms, machine intelligence, papers, and production-grade prototypes.',
    lead: {
      id: 'research-lead',
      name: 'Tanuj',
      role: 'Team Lead',
      photo: '/team-photos/tanuj.jpg',
      quote: 'Investigating next-generation algorithms and guiding open project explorations.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'research-colead',
        name: 'Sneha Datta',
        role: 'Co-Lead',
        photo: '/team-photos/sneha.jpg',
        quote: 'Mentoring collaborative development repositories and research tracks.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
  {
    id: 'documentation',
    departmentNumber: '07',
    title: 'Documentation Team',
    iconName: 'FileText',
    desc: 'Maintaining meticulous reports, technical documentation, event retrospectives, and official publications.',
    lead: {
      id: 'doc-lead',
      name: 'Venuturumilli Tejaswini',
      role: 'Team Lead',
      photo: '/team-photos/tejaswini.jpg',
      quote: 'Chronicle of our technical journey, preserving knowledge for future generations.',
      socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    },
    members: [
      {
        id: 'doc-colead',
        name: 'Vudutha Venkata Subash',
        role: 'Co-Lead',
        photo: '/team-photos/subash.jpg',
        quote: 'Drafting structured whitepapers, manuals, and comprehensive event records.',
        socials: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
      },
    ],
  },
];
