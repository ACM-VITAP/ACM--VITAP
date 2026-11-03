// ---------------------------------------------------------------------------
// src/components/Team.jsx — Interactive Chapter Leadership & Department Showcase
// ---------------------------------------------------------------------------
import React, { useState } from 'react';
import {
  User,
  Shield,
  Terminal,
  Crown,
  Users,
  Star,
  Code2,
  CalendarCheck,
  Share2,
  Palette,
  Megaphone,
  FlaskConical,
  FileText,
  Briefcase,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  GraduationCap,
  Mail,
  Globe,
  Quote,
} from 'lucide-react';
import { FACULTY_COORDINATOR, ADMIN_PRESIDENCY, ADMIN_CORE_OFFICERS, ADMIN_MANAGERS, DOMAIN_TEAMS } from '../data/team.js';

// Lucide icon dictionary mapping for Department Cards
const DEPARTMENT_ICONS = {
  Code2,
  CalendarCheck,
  Share2,
  Palette,
  Megaphone,
  FlaskConical,
  FileText,
};

// SVG Social Icons
const GithubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
  </svg>
);

// Member Avatar & Profile Card Component
function MemberCard({ member, variant = 'standard', index = 0, layout = 'auto' }) {
  const [imgFailed, setImgFailed] = useState(false);

  const initials = member.name
    ? member.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .substring(0, 2)
        .toUpperCase()
    : 'ACM';

  const hasPhoto = Boolean(member.photo && !imgFailed);
  const hasSocials = Boolean(member.socials && (member.socials.linkedin || member.socials.github || member.socials.website));

  // In side-by-side 2-col grids, both cards must use identical balanced vertical layout
  const isSpotlight = layout === 'vertical' ? false : (variant === 'lead' || variant === 'spotlight');

  return (
    <div
      className={`team-glass-member-card card-${variant} ${isSpotlight ? 'card-spotlight-horizontal' : ''}`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {isSpotlight ? (
        /* Spotlight Horizontal Layout for Team Lead */
        <div className="spotlight-card-inner">
          <div className="member-avatar-placeholder spotlight-avatar">
            <div className="avatar-initials-badge">
              {hasPhoto ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="member-profile-img"
                  style={member.photoCrop ? { objectPosition: member.photoCrop } : undefined}
                  onError={() => setImgFailed(true)}
                  loading="lazy"
                />
              ) : (
                <>
                  <User size={30} className="avatar-icon-ghost" aria-hidden="true" />
                  <span className="avatar-initials-text">{initials}</span>
                </>
              )}
            </div>
          </div>

          <div className="spotlight-info-column">
            {member.role && (
              <div className="member-role-pill">
                <span className="role-dot" aria-hidden="true" />
                <span>{member.role}</span>
              </div>
            )}

            <h3 className="member-name-heading">{member.name}</h3>

            {hasSocials && (
              <div className="member-socials-cluster">
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s LinkedIn profile`}
                  >
                    <LinkedinIcon />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${member.name}'s GitHub profile`}
                  >
                    <GithubIcon />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Balanced Column Layout for Co-Leads, Managers, and Team Members */
        <>
          {member.role && (
            <div className="member-role-pill">
              <span className="role-dot" aria-hidden="true" />
              <span>{member.role}</span>
            </div>
          )}

          <div className="member-avatar-placeholder">
            <div className="avatar-initials-badge">
              {hasPhoto ? (
                <img
                  src={member.photo}
                  alt={member.name}
                  className="member-profile-img"
                  style={member.photoCrop ? { objectPosition: member.photoCrop } : undefined}
                  onError={() => setImgFailed(true)}
                  loading="lazy"
                />
              ) : (
                <>
                  <User size={22} className="avatar-icon-ghost" aria-hidden="true" />
                  <span className="avatar-initials-text">{initials}</span>
                </>
              )}
            </div>
          </div>

          <h3 className="member-name-heading">{member.name}</h3>

          {hasSocials && (
            <div className="member-socials-cluster">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s LinkedIn profile`}
                >
                  <LinkedinIcon />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s GitHub profile`}
                >
                  <GithubIcon />
                </a>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Department Selection Card Component
function DepartmentCard({ dept, onSelect, index = 0 }) {
  const IconComponent = DEPARTMENT_ICONS[dept.iconName] || Terminal;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(dept.id);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`Open ${dept.title}`}
      className="dept-selection-card"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onSelect(dept.id)}
      onKeyDown={handleKeyDown}
    >
      <div className="dept-card-top-row">
        <div className="dept-icon-box">
          <IconComponent size={20} className="dept-icon-symbol" />
        </div>
        <span className="dept-number-tag">Dept {dept.departmentNumber}</span>
      </div>

      <div className="dept-card-body">
        <h3 className="dept-card-title">{dept.title}</h3>
        <p className="dept-card-desc">{dept.desc}</p>
      </div>

      <div className="dept-card-footer">
        <span className="dept-view-prompt">Enter Department</span>
        <ChevronRight size={16} className="dept-chevron-icon" />
      </div>

      {/* Cyber Corner Accents */}
      <span className="dept-card-bracket top-left" aria-hidden="true" />
      <span className="dept-card-bracket bottom-right" aria-hidden="true" />
    </div>
  );
}

function EventTeamNode({ member }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = member.name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article className="event-team-node">
      <div className="event-team-node-avatar">
        {member.photo && !imgFailed ? (
          <img
            src={member.photo}
            alt={member.name}
            style={{
              ...(member.photoCrop ? { objectPosition: member.photoCrop } : {}),
              ...(member.photoZoom ? { transform: `scale(${member.photoZoom})` } : {}),
            }}
            onError={() => setImgFailed(true)}
          />
        ) : <span>{initials}</span>}
      </div>
      <div className="event-team-node-copy">
        <span className="event-team-node-role">{member.role}</span>
        <h4>{member.name}</h4>
        <div className="event-team-node-socials" aria-label={`${member.name}'s social profiles`}>
          <a href={member.socials?.linkedin || '#'} target="_blank" rel="noreferrer noopener" aria-label={`${member.name}'s LinkedIn`}><LinkedinIcon size={13} /></a>
          <a href={member.socials?.github || '#'} target="_blank" rel="noreferrer noopener" aria-label={`${member.name}'s GitHub`}><GithubIcon size={13} /></a>
        </div>
      </div>
    </article>
  );
}

function EventManagementDiagram({ department }) {
  const manager = department.hierarchyTiers[0].members[0];
  const eventMembers = department.hierarchyTiers[2].members;
  const volunteerMembers = department.hierarchyTiers[1].members;

  return (
    <div className="event-management-diagram" aria-label="Event management team structure">
      <div className="event-diagram-manager">
        <EventTeamNode member={manager} />
      </div>
      <div className="event-diagram-trunk" aria-hidden="true" />
      <div className="event-diagram-branches" aria-hidden="true"><span /><span /></div>
      <div className="event-diagram-branch-grid">
        <section className="event-team-branch event-team-branch--events">
          <header><CalendarCheck size={20} /><div><h3>Event Management</h3><p>Planning and executing flagship events, speaker talks, workshops and student engagements.</p></div></header>
          <div className="event-team-node-grid">{eventMembers.map((member) => <EventTeamNode key={member.id} member={member} />)}</div>
        </section>
        <section className="event-team-branch event-team-branch--volunteers">
          <header><Users size={20} /><div><h3>Volunteer Management</h3><p>Coordinating volunteers, community outreach, and on-ground event support.</p></div></header>
          <div className="event-team-node-grid">{volunteerMembers.map((member) => <EventTeamNode key={member.id} member={member} />)}</div>
        </section>
      </div>
    </div>
  );
}

export default function Team() {
  const [activeTab, setActiveTab] = useState('domains');
  // activeDepartmentId is null when showing the department selection grid; set to dept.id when drilled inside
  const [activeDepartmentId, setActiveDepartmentId] = useState(null);

  const selectedDepartment = DOMAIN_TEAMS.find((d) => d.id === activeDepartmentId);

  // Dynamic role grouping from verified data for selected department
  const leads = [];
  if (selectedDepartment && selectedDepartment.lead) {
    leads.push(selectedDepartment.lead);
  }

  const allOther = (selectedDepartment && selectedDepartment.members) || [];
  const totalDeptMembers = [...leads, ...allOther];
  const coLeads = allOther.filter((m) =>
    (m.role || '').toLowerCase().includes('co-lead')
  );
  const managers = allOther.filter((m) =>
    (m.role || '').toLowerCase().includes('manager')
  );
  const standardMembers = allOther.filter(
    (m) =>
      !(m.role || '').toLowerCase().includes('co-lead') &&
      !(m.role || '').toLowerCase().includes('manager')
  );

  const handleSelectDepartment = (deptId) => {
    setActiveDepartmentId(deptId);
    // Smooth scroll to top of team section to see the department details immediately
    const section = document.getElementById('teams');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBackToGrid = () => {
    setActiveDepartmentId(null);
    const section = document.getElementById('teams');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="section-full team-section-wrap" id="teams">
      {/* Section Header */}
      <div className="section-header-cluster text-center">
        <div className="section-eyebrow-badge">
          <span>Chapter Leadership</span>
        </div>
        <h2 className="section-headline-large">
          PEOPLE BEHIND THE <span className="blue-highlight">IMPACT.</span>
        </h2>
        <p className="section-subtext-lede">
          Meet the core leadership and specialized departmental domains spearheading innovation and excellence at ACM VIT-AP.
        </p>
      </div>

      {/* Segmented Controller (Faculty Coordinator | Admin Team | Domains & Departments) */}
      <div className="team-filter-tabs-wrapper">
        <div className="team-filter-tabs-strip" role="tablist" aria-label="Team View Selector">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'faculty'}
            className={`team-subtab-pill ${activeTab === 'faculty' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('faculty');
              setActiveDepartmentId(null);
            }}
          >
            <GraduationCap size={15} className="tab-icon" />
            <span className="tab-label">Faculty Coordinator</span>
            <span className="tab-indicator-badge">Mentor</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'admin'}
            className={`team-subtab-pill ${activeTab === 'admin' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('admin');
              setActiveDepartmentId(null);
            }}
          >
            <Shield size={15} className="tab-icon" />
            <span className="tab-label">Core Administration</span>
            <span className="tab-indicator-badge">Tier I</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === 'domains'}
            className={`team-subtab-pill ${activeTab === 'domains' ? 'active' : ''}`}
            onClick={() => setActiveTab('domains')}
          >
            <Terminal size={15} className="tab-icon" />
            <span className="tab-label">Domains & Departments</span>
            <span className="tab-indicator-badge">7 Leads</span>
          </button>
        </div>
      </div>

      {activeTab === 'faculty' ? (
        /* ─── 0] FACULTY COORDINATOR SHOWCASE VIEW ────────────────────── */
        <div className="faculty-coordinator-showcase">
          {/* Top Faculty Showcase Grid */}
          <div className="faculty-hero-grid">
            {/* Left Headline Column */}
            <div className="faculty-lead-intro">
              <div className="faculty-eyebrow-tag">
                <span className="faculty-dash">—</span>
                <span>{FACULTY_COORDINATOR.eyebrow}</span>
              </div>
              <h2 className="faculty-bold-headline">
                GUIDED BY <span className="blue-highlight">KNOWLEDGE.</span><br />
                DRIVEN BY <span className="acm-cyan-text">CURIOSITY.</span>
              </h2>
              <p className="faculty-subtext">
                {FACULTY_COORDINATOR.subtext}
              </p>
            </div>

            {/* Center Profile Glass Card */}
            <div className="faculty-profile-card">
              <div className="faculty-photo-outer-frame">
                <div className="faculty-photo-glow" />
                <img
                  src={FACULTY_COORDINATOR.photo}
                  alt={FACULTY_COORDINATOR.name}
                  className="faculty-photo-img"
                  loading="lazy"
                />
              </div>

              <div className="faculty-details-block">
                <div className="faculty-role-pill">
                  <span>{FACULTY_COORDINATOR.role}</span>
                </div>
                <h3 className="faculty-person-name">{FACULTY_COORDINATOR.name}</h3>
                <span className="faculty-university-tag">
                  {FACULTY_COORDINATOR.designation} &middot; {FACULTY_COORDINATOR.institution}
                </span>
                <p className="faculty-bio-paragraph">{FACULTY_COORDINATOR.bio}</p>

                <div className="faculty-socials-row">
                  <a
                    href={FACULTY_COORDINATOR.socials.email}
                    className="faculty-social-icon-btn"
                    aria-label="Send email to Faculty Coordinator"
                  >
                    <Mail size={16} />
                  </a>
                  <a
                    href={FACULTY_COORDINATOR.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faculty-social-icon-btn"
                    aria-label="Faculty Coordinator LinkedIn Profile"
                  >
                    <LinkedinIcon size={16} />
                  </a>
                  <a
                    href={FACULTY_COORDINATOR.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="faculty-social-icon-btn"
                    aria-label="VIT-AP Official Website"
                  >
                    <Globe size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Message Banner */}
          <div className="faculty-message-card">
            <div className="faculty-message-header">
              <div className="faculty-message-icon-box">
                <FileText size={18} />
              </div>
              <h4 className="faculty-message-title">{FACULTY_COORDINATOR.messageTitle}</h4>
            </div>
            <div className="faculty-message-content-split">
              <p className="faculty-message-paragraph">
                {FACULTY_COORDINATOR.messageBody}
              </p>
              <div className="faculty-quote-callout">
                <Quote size={28} className="faculty-quote-mark" />
                <blockquote className="faculty-quote-text">
                  &ldquo;{FACULTY_COORDINATOR.quote}&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'admin' ? (
        /* ─── 1] ADMIN TEAM VIEW ─────────────────────────────────────── */
        <div className="admin-team-structured-layout">
          {/* ROW 1: 3 in a row (Chief Advisor, President, Vice President) */}
          <div className="admin-tier-section">
            <div className="tier-header-badge">
              <Crown size={14} />
              <span>Core Presidency & Executive Advisory</span>
            </div>
            <div className="team-grid-3col executive-tier">
              {ADMIN_PRESIDENCY.map((member) => (
                <MemberCard key={member.id} member={member} variant="executive" />
              ))}
            </div>
          </div>

          <div className="tier-connector-line" />

          {/* ROW 2: 3 in a row (Secretary, Joint Secretary, Treasurer) */}
          <div className="admin-tier-section">
            <div className="tier-header-badge">
              <Shield size={14} />
              <span>Core Secretariat & Finance</span>
            </div>
            <div className="team-grid-3col">
              {ADMIN_CORE_OFFICERS.map((member) => (
                <MemberCard key={member.id} member={member} variant="officer" />
              ))}
            </div>
          </div>

          <div className="tier-connector-line" />

          {/* ROW 3: 2 in a row (Club Manager & Technical Manager) */}
          <div className="admin-tier-section">
            <div className="tier-header-badge">
              <Users size={14} />
              <span>Operations & Management</span>
            </div>
            <div className="team-grid-2col managers-tier">
              {ADMIN_MANAGERS.map((member) => (
                <MemberCard key={member.id} member={member} variant="manager" />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* ─── 2] DOMAINS & DEPARTMENTS VIEW ─────────────────────────── */
        <div className="departments-view-container">
          {!selectedDepartment ? (
            /* VIEW 2A: 7-DEPARTMENT 2-COLUMN SELECTION GRID */
            <div className="dept-grid-view-wrapper">
              <div className="departments-section-intro">
                <h3 className="departments-grid-headline">Select a Department</h3>
                <p className="departments-grid-subline">
                  Choose any of the seven specialized chapter teams to enter and view its full roster and leadership.
                </p>
              </div>

              {/* Responsive Two-Column Department Selection Grid (7 departments) */}
              <div className="department-selection-grid" role="region" aria-label="Department selection grid">
                {DOMAIN_TEAMS.map((dept, idx) => (
                  <DepartmentCard
                    key={dept.id}
                    dept={dept}
                    index={idx}
                    onSelect={handleSelectDepartment}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* VIEW 2B: DEDICATED INSIDE VIEW FOR SELECTED DEPARTMENT */
            <div className="selected-department-showcase inside-mode" aria-live="polite">
              {/* Back to All Departments Navigation Bar */}
              <div className="dept-navigation-bar">
                <button
                  type="button"
                  className="dept-back-btn"
                  onClick={handleBackToGrid}
                  aria-label="Back to all departments grid"
                >
                  <ArrowLeft size={16} />
                  <span>← Back to All Departments</span>
                </button>
              </div>

              {/* Active Department Header Banner */}
              <div className="domain-header-banner">
                <div className="domain-banner-tag">
                  <span>Department {selectedDepartment.departmentNumber}</span>
                </div>
                <h3 className="domain-banner-title">{selectedDepartment.title}</h3>
                <p className="domain-banner-desc">{selectedDepartment.desc}</p>
              </div>

              {/* Department Team Members Display */}
              {selectedDepartment.id === 'events' ? (
                <EventManagementDiagram department={selectedDepartment} />
              ) : <div className="dept-hierarchy-wrapper">
                {/* EXPLICIT HIERARCHY (e.g. Event Management Team or defined hierarchy tiers) */}
                {selectedDepartment.hierarchyTiers ? (
                  selectedDepartment.hierarchyTiers.map((tier, idx) => (
                    <React.Fragment key={tier.title || idx}>
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          {idx === 0 ? <Crown size={14} /> : <Users size={14} />}
                          <span>{tier.title}</span>
                        </div>
                        <div className={tier.members.length === 1 ? 'team-grid-1col-center' : 'team-grid-2col managers-tier'}>
                          {tier.members.map((member, mIdx) => (
                            <MemberCard
                              key={member.id}
                              member={member}
                              variant={tier.variant || (idx === 0 ? 'lead' : 'officer')}
                              index={mIdx}
                            />
                          ))}
                        </div>
                      </div>
                      {idx < selectedDepartment.hierarchyTiers.length - 1 && (
                        <div className="tier-connector-line" />
                      )}
                    </React.Fragment>
                  ))
                ) : selectedDepartment.hierarchy ? (
                  selectedDepartment.hierarchy.map((member, idx) => (
                    <React.Fragment key={member.id}>
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          {idx === 0 ? <Crown size={14} /> : <Users size={14} />}
                          <span>{member.role}</span>
                        </div>
                        <div className="team-grid-1col-center">
                          <MemberCard
                            member={member}
                            variant={idx === 0 ? 'lead' : idx === 1 ? 'officer' : 'standard'}
                            index={idx}
                          />
                        </div>
                      </div>
                      {idx < selectedDepartment.hierarchy.length - 1 && (
                        <div className="tier-connector-line" />
                      )}
                    </React.Fragment>
                  ))
                ) : totalDeptMembers.length === 2 ? (
                  /* SPECIAL CASE: If exactly 2 people in the department, render them side by side */
                  <div className="admin-tier-section">
                    <div className="tier-header-badge">
                      <Users size={14} />
                      <span>Department Leadership</span>
                    </div>
                    <div className="team-grid-2col managers-tier">
                      {totalDeptMembers.map((member, i) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          index={i}
                          layout="vertical"
                          variant={member.role && member.role.toLowerCase().includes('lead') && !member.role.toLowerCase().includes('co-lead') ? 'lead' : 'officer'}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  /* STANDARD HIERARCHICAL LAYOUT (for 3 or more members) */
                  <>
                    {/* 1. Team Lead — Centered in its own row */}
                    {leads.length > 0 && (
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          <Crown size={14} />
                          <span>Team Lead</span>
                        </div>
                        <div className="team-grid-1col-center">
                          {leads.map((lead, i) => (
                            <MemberCard key={lead.id} member={lead} variant="lead" index={i} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Connector Line if further members exist */}
                    {leads.length > 0 && (coLeads.length > 0 || managers.length > 0 || standardMembers.length > 0) && (
                      <div className="tier-connector-line" />
                    )}

                    {/* 2. Co-Leads — Side by side in the next row */}
                    {coLeads.length > 0 && (
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          <Users size={14} />
                          <span>Co-Leads</span>
                        </div>
                        <div className={coLeads.length === 1 ? 'team-grid-1col-center' : 'team-grid-2col managers-tier'}>
                          {coLeads.map((colead, i) => (
                            <MemberCard key={colead.id} member={colead} variant="officer" index={i + 1} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Connector Line between Co-Leads and Managers/Members */}
                    {coLeads.length > 0 && (managers.length > 0 || standardMembers.length > 0) && (
                      <div className="tier-connector-line" />
                    )}

                    {/* 3. Managers — Grouped below if that department has managers */}
                    {managers.length > 0 && (
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          <Briefcase size={14} />
                          <span>Management</span>
                        </div>
                        <div className={managers.length === 1 ? 'team-grid-1col-center' : 'team-grid-2col managers-tier'}>
                          {managers.map((manager, i) => (
                            <MemberCard key={manager.id} member={manager} variant="manager" index={i + 2} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Connector Line between Managers and other members */}
                    {managers.length > 0 && standardMembers.length > 0 && (
                      <div className="tier-connector-line" />
                    )}

                    {/* 4. Other Members — Displayed in a responsive card grid */}
                    {standardMembers.length > 0 && (
                      <div className="admin-tier-section">
                        <div className="tier-header-badge">
                          <Users size={14} />
                          <span>Team Members</span>
                        </div>
                        <div className="team-grid-3col">
                          {standardMembers.map((member, i) => (
                            <MemberCard key={member.id} member={member} variant="standard" index={i + 3} />
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
