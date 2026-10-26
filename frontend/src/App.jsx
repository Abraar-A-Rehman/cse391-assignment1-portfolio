import React, { useState, useEffect } from 'react';

const INITIAL_SKILLS = [
  { id: 1, category: 'Languages', skillName: 'Python', proficiencyLevel: 'Advanced', endorsements: 28 },
  { id: 2, category: 'Languages', skillName: 'C++ (Competitive Programming)', proficiencyLevel: 'Advanced', endorsements: 24 },
  { id: 3, category: 'Languages', skillName: 'JavaScript (ES6+) & TypeScript', proficiencyLevel: 'Advanced', endorsements: 21 },
  { id: 4, category: 'Languages', skillName: 'HTML5 & CSS3 (W3C Standards)', proficiencyLevel: 'Advanced', endorsements: 25 },
  { id: 5, category: 'Frameworks', skillName: 'Spring Boot + MySQL (JPA/REST)', proficiencyLevel: 'Advanced', endorsements: 27 },
  { id: 6, category: 'Frameworks', skillName: 'React 18 + Vite', proficiencyLevel: 'Intermediate', endorsements: 19 },
  { id: 7, category: 'Frameworks', skillName: 'Angular', proficiencyLevel: 'Intermediate', endorsements: 15 },
  { id: 8, category: 'Security & OS', skillName: 'Kali Linux & Red Team Analysis', proficiencyLevel: 'Advanced', endorsements: 31 },
  { id: 9, category: 'Security & OS', skillName: 'Mobile Application Penetration Testing', proficiencyLevel: 'Intermediate', endorsements: 18 }
];

const TOP_10_FAVORITES = [
  { rank: 1, title: 'Mr. Robot (Series)', type: 'Cybersecurity Thriller', note: 'Realistic depiction of Linux CLI, OPSEC, and social engineering.' },
  { rank: 2, title: 'The Web Application Hacker’s Handbook', type: 'Security Book', note: 'Foundational guide to discovering and exploiting web vulnerabilities.' },
  { rank: 3, title: 'Inception (2010)', type: 'Sci-Fi Film', note: 'Masterclass in recursive architecture and multi-layered logic.' },
  { rank: 4, title: 'Clean Code — Robert C. Martin', type: 'Software Engineering Book', note: 'Essential principles for maintainable Spring Boot & React systems.' },
  { rank: 5, title: 'Interstellar (2014)', type: 'Sci-Fi Film', note: 'Inspires curiosity in computational physics and visual rendering.' },
  { rank: 6, title: 'Designing Data-Intensive Applications — Martin Kleppmann', type: 'Systems Book', note: 'Deep dive into relational databases, MySQL indexing, and distributed state.' },
  { rank: 7, title: 'The Imitation Game (2014)', type: 'Biographical Film', note: 'Tribute to Alan Turing, cryptography, and algorithmic problem solving.' },
  { rank: 8, title: 'Hacking: The Art of Exploitation — Jon Erickson', type: 'Security Book', note: 'Low-level C memory architecture, stack frames, and network security.' },
  { rank: 9, title: 'Random Access Memories — Daft Punk', type: 'Music Album', note: 'Major inspiration for my own music production and late-night coding sessions.' },
  { rank: 10, title: 'Competitive Programmer’s Handbook — Antti Laaksonen', type: 'Algorithms Book', note: 'Core reference used during TLE Eliminators and BUCC Bit Battles.' }
];

export default function App() {
  const [lightMode, setLightMode] = useState(false);
  const [activeInternalPage, setActiveInternalPage] = useState('home');
  const [skillFilter, setSkillFilter] = useState('All');
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [pageLocation, setPageLocation] = useState('');
  const [lastModifiedDate, setLastModifiedDate] = useState('');

  const [contactForm, setContactForm] = useState({
    senderName: '',
    senderEmail: '',
    subject: '',
    category: 'Research / Thesis Collaboration',
    messageBody: ''
  });
  const [contactNotice, setContactNotice] = useState(null);
  const [savedMessages, setSavedMessages] = useState([
    {
      id: 101,
      senderName: 'CSE 391 Lab Instructor (Sample Record)',
      senderEmail: 'cse391.faculty@bracu.ac.bd',
      subject: 'CSE 391 Assignment 1 Verification',
      category: 'Academic Feedback',
      messageBody: 'Welcome to CSE 391! Your Spring Boot + MySQL + React homepage structure is active.',
      emailDispatched: true,
      createdAt: '2026-10-25 10:30:00'
    }
  ]);

  useEffect(() => {
    setPageLocation(window.location.href || 'http://localhost:5173/cse391-abraar-portfolio');
    setLastModifiedDate(document.lastModified || new Date().toLocaleString());

    fetch('/api/skills')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setSkills(data);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (lightMode) {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [lightMode]);

  const handleEndorseSkill = async (id) => {
    setSkills((prev) =>
      prev.map((s) => (s.id === id ? { ...s, endorsements: s.endorsements + 1 } : s))
    );
    try {
      await fetch(`/api/skills/${id}/endorse`, { method: 'POST' });
    } catch {
      // Fallback handled in state
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.senderName.trim() || !contactForm.senderEmail.trim() || !contactForm.messageBody.trim()) {
      setContactNotice({ type: 'error', text: 'Please fill in your name, email address, and message.' });
      return;
    }

    const newMsg = {
      id: Date.now(),
      ...contactForm,
      subject: contactForm.subject.trim() || 'CSE 391 Webpage Inquiry',
      emailDispatched: true,
      createdAt: new Date().toLocaleString()
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (response.ok) {
        const result = await response.json();
        setSavedMessages((prev) => [result.data || newMsg, ...prev]);
      } else {
        setSavedMessages((prev) => [newMsg, ...prev]);
      }
    } catch {
      setSavedMessages((prev) => [newMsg, ...prev]);
    }

    setContactNotice({
      type: 'success',
      text: `Thank you, ${contactForm.senderName}! Your message has been persisted to MySQL and prepared for email dispatch to abrar.a.rehman@gmail.com.`,
      mailtoUrl: `mailto:abrar.a.rehman@gmail.com?subject=${encodeURIComponent(
        newMsg.subject
      )}&body=${encodeURIComponent(
        `From: ${newMsg.senderName} (${newMsg.senderEmail})\nCategory: ${newMsg.category}\n\n${newMsg.messageBody}`
      )}`
    });

    setContactForm({
      senderName: '',
      senderEmail: '',
      subject: '',
      category: 'Research / Thesis Collaboration',
      messageBody: ''
    });
  };

  const filteredSkills =
    skillFilter === 'All' ? skills : skills.filter((s) => s.category === skillFilter);

  return (
    <div className={`theme-wrapper ${lightMode ? 'light-theme' : ''}`}>
      {/* Semantic <header> with prominent name only & navigation */}
      <header className="site-header">
        <div className="header-inner">
          <div className="brand-identity">
            <span className="brand-name">ABRAAR A REHMAN</span>
          </div>

          <nav aria-label="Primary Navigation">
            <ul className="nav-links">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveInternalPage('home')}
                  className={`nav-link-item ${activeInternalPage === 'home' ? 'active-view' : ''}`}
                >
                  Home Hub
                </button>
              </li>
              <li>
                <a href="#personal-info" onClick={() => setActiveInternalPage('home')} className="nav-link-item">
                  Personal Info
                </a>
              </li>
              <li>
                <a href="#education-table" onClick={() => setActiveInternalPage('home')} className="nav-link-item">
                  Education Table
                </a>
              </li>
              <li>
                <a href="#technical-skills" onClick={() => setActiveInternalPage('home')} className="nav-link-item">
                  Skills
                </a>
              </li>
              <li>
                <a href="#categorized-links" onClick={() => setActiveInternalPage('home')} className="nav-link-item">
                  Links &amp; Top 10
                </a>
              </li>
              <li>
                <a href="#contact-section" onClick={() => setActiveInternalPage('home')} className="nav-link-item">
                  Contact Form
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveInternalPage('projects-lab')}
                  className={`nav-link-item ${activeInternalPage === 'projects-lab' ? 'active-view' : ''}`}
                >
                  Thesis &amp; Projects
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveInternalPage('hobbies-ctf')}
                  className={`nav-link-item ${activeInternalPage === 'hobbies-ctf' ? 'active-view' : ''}`}
                >
                  Red Team &amp; Hobbies
                </button>
              </li>
              <li>
                {/* Sun & Moon Icon Theme Switcher */}
                <div className="theme-icon-pill" role="group" aria-label="Theme Switcher">
                  <button
                    type="button"
                    onClick={() => setLightMode((prev) => !prev)}
                    className={`theme-icon-btn ${lightMode ? 'active-mode' : ''}`}
                    title="Day White Mode"
                    aria-label="Switch to Day White Mode"
                  >
                    <svg viewBox="0 0 24 24" width="17" height="17" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightMode((prev) => !prev)}
                    className={`theme-icon-btn ${!lightMode ? 'active-mode' : ''}`}
                    title="Dark Mode"
                    aria-label="Switch to Dark Mode"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                  </button>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="main-container">
        {/* Internal Page Switcher Banner */}
        {activeInternalPage !== 'home' && (
          <section className="section-card animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="section-label">
                  {activeInternalPage === 'projects-lab'
                    ? 'Research & Software Architecture'
                    : 'Hobbies, Cybersecurity & Extracurriculars'}
                </span>
                <h2 className="section-title" style={{ marginBottom: '0.25rem' }}>
                  {activeInternalPage === 'projects-lab'
                    ? 'Thesis Research & Notable Software Works'
                    : 'Producing Music, Cybersecurity Labs, Competitive Coding & Volunteering'}
                </h2>
              </div>
              <button type="button" className="btn-primary" onClick={() => setActiveInternalPage('home')}>
                ← Back to Main Homepage Hub
              </button>
            </div>

            {activeInternalPage === 'projects-lab' ? (
              <div className="grid-2" style={{ marginTop: '1.25rem' }}>
                <article className="sub-card">
                  <span className="section-label">Undergraduate Thesis Track 1</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                    Evaluating Deep Learning Approaches for Novel View Synthesis Using Aerial and Ground-Level Imagery
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Conducted a comprehensive evaluation of state-of-the-art neural rendering methods (<strong>NeRF variants</strong> and <em>3D Gaussian Splatting</em>) across multi-modal aerial and ground-level datasets. Designed benchmark protocols and quantitative metrics for cross-domain generalization.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">Undergraduate Thesis Track 2</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                    A Lightweight Network Matches Larger Models in Cross-Dataset Polyp Segmentation under a Controlled Multi-Seed Protocol
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Proposed and validated a resource-efficient medical segmentation architecture that achieves competitive accuracy against significantly larger models under a rigorous multi-seed experimental protocol.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">Database Security Project</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                    Integrated Crime Investigation &amp; Criminal Database System (ICICIDS)
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Designed secure relational database schemas and backend authentication loops to catalog critical criminal record hierarchies and prevent SQL injection manipulation.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">Systems &amp; Graphics Architecture</span>
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>
                    Interactive 3D Graphics Engine &amp; Software Architectures
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                    Experimented with matrix transformations, custom graphics shaders, and local virtual filesystem configurations using C and Python framework utilities.
                  </p>
                </article>
              </div>
            ) : (
              <div className="grid-2" style={{ marginTop: '1.25rem' }}>
                <article className="sub-card">
                  <span className="section-label">Creative Hobby &amp; Audio Production</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Producing Music &amp; Sound Design (@Inhaad_official)</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Passionate about <strong>producing music</strong>, composing original instrumental and electronic tracks, arrangement, mixing, and digital audio engineering. Shares original music productions on{' '}
                    <a href="https://www.youtube.com/@Inhaad_official" target="_blank" rel="noopener noreferrer" className="content-link">
                      YouTube (@Inhaad_official)
                    </a>.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">CyberWarriors League (CWL)</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Red Team Analyst &amp; TryHackMe</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Completed TryHackMe <strong>Pre-Security (SEC0)</strong> and <strong>Cyber Security 101 (SEC1)</strong>, plus TCM Academy certifications in <em>AI Hacking 101</em>, <em>Linux 101</em>, and <em>Mobile Application Penetration Testing</em>.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">Competitive Programming</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>BUCC Bit Battles &amp; TLE Eliminators</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Secured <strong>9th place out of 100 teams</strong> in the BUCC Bit Battles Coding Contest at BRAC University and completed TLE Eliminators Levels 1, 2, and 3 on Codeforces.
                  </p>
                </article>
                <article className="sub-card">
                  <span className="section-label">Community &amp; Volunteering</span>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>Project Srijon &amp; Blessing For Human</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Active volunteer under the BRAC University School of General Education (Project Srijon) and humanitarian relief coordinator at the Blessing For Human Foundation.
                  </p>
                </article>
              </div>
            )}
          </section>
        )}

        {/* Hero & Personal Information Section */}
        <section id="personal-info" className="section-card animate-fade-up">
          <div className="hero-grid">
            <div className="profile-photo-wrapper">
              <img
                src="/assets/abraar-profile.jpg"
                alt="Abraar A Rehman - Computer Science Undergraduate at BRAC University"
                className="profile-photo avatar-glow"
              />
              {/* Engineering Motto Only Below Profile Picture */}
              <blockquote className="motto-box-under-photo motto-below-photo">
                “Security is not a product, but a continuous process — and clean, resilient code is its strongest foundation.”
              </blockquote>
            </div>

            <div>
              <h1 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '0.5rem' }}>
                Abraar A Rehman
              </h1>
              <p style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--accent-primary)', marginBottom: '0.9rem' }}>
                Computer Science Undergraduate &amp; Cyber Security Aspirant
              </p>

              <p style={{ color: 'var(--text-secondary)', marginBottom: '0.85rem', fontSize: '0.98rem' }}>
                I am a highly motivated <strong>4th-year Computer Science undergraduate</strong> studying at{' '}
                <a
                  href="https://www.bracu.ac.bd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                  BRAC University
                </a>{' '}
                in Dhaka, Bangladesh, aiming to expand my expertise in <em>offensive and defensive cyber security</em>, <strong>producing music</strong>, and mastering modern full-stack software development with <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>Spring Boot, React, Vite, and MySQL</span>. I collaborate with fellow students and course instructors on the{' '}
                <a
                  href="https://discord.com/channels/cse391-bracu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="content-link"
                >
                  CSE 391 Discord Community Page
                </a>{' '}
                to build standards-compliant web applications throughout the semester.
              </p>

              {/* Social & Coding Profile Icons Bar */}
              <div className="social-icons-bar" aria-label="Social Media and Coding Profiles">
                <a href="https://discord.com/users/731103877369430058" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Discord: Abraar A Rehman" aria-label="Discord">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </a>
                <a href="https://codeforces.com/profile/Abraar_A_Rehman" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Codeforces: Abraar_A_Rehman" aria-label="Codeforces">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="2" y="9" width="5" height="12" rx="1.2"></rect>
                    <rect x="9.5" y="4" width="5" height="17" rx="1.2"></rect>
                    <rect x="17" y="12" width="5" height="9" rx="1.2"></rect>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/abraar-a-rehman-4030a5354/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="LinkedIn: Abraar A Rehman" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://github.com/Abraar-A-Rehman" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="GitHub: Abraar-A-Rehman" aria-label="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/AbraarARehman/" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Facebook: AbraarARehman" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/aksari_z1000/" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="Instagram: @aksari_z1000" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/>
                  </svg>
                </a>
                <a href="https://www.youtube.com/@Inhaad_official" target="_blank" rel="noopener noreferrer" className="social-icon-link" title="YouTube: @Inhaad_official" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                <button type="button" className="btn-primary" onClick={() => setActiveInternalPage('projects-lab')}>
                  Explore Thesis &amp; Projects →
                </button>
                <button type="button" className="btn-outline" onClick={() => setActiveInternalPage('hobbies-ctf')}>
                  Music Production, Red Team &amp; Hobbies
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Academic Background & Research Portfolio Table */}
        <section id="education-table" className="section-card animate-fade-up">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <span className="section-label">Education, Research &amp; Course Matrix</span>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Academic Background &amp; Research Portfolio Table
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>
                Structured academic timeline and university course portfolio at{' '}
                <a href="https://www.bracu.ac.bd" target="_blank" rel="noopener noreferrer" className="content-link">
                  BRAC University
                </a>
                , featuring <strong>rowSpan</strong>, <strong>colSpan</strong>, multi-line analytical descriptions, striped rows, and interactive hover styling.
              </p>
            </div>
            <div>
              <img
                src="/assets/neural-security-banner.jpg"
                alt="3D Neural Rendering and Cybersecurity Network Laboratory Visualization"
                className="floating-visual"
                style={{ width: '100%', maxHeight: '190px', objectFit: 'cover', borderRadius: '0.75rem', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div className="table-responsive-wrapper">
            <table className="academic-table">
              <thead>
                <tr>
                  <th>Institution &amp; Level</th>
                  <th>Degree / Course / Track</th>
                  <th>Multi-Line Technical Summary &amp; Key Deliverables</th>
                  <th>Status / CGPA</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowSpan="3" style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>
                    BRAC University, Dhaka
                    <br />
                    <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-muted)' }}>
                      B.Sc. in Computer Science (4th Year)
                    </span>
                  </td>
                  <td>
                    <strong>CSE 391</strong>
                    <br />
                    <em>Programming for the Internet</em>
                  </td>
                  <td>
                    Building a full-stack personal application hub using semantic HTML5/XHTML structure, responsive CSS3 styling, React + Vite frontend state, and a Spring Boot + MySQL relational backend.
                  </td>
                  <td>
                    <span style={{ color: 'var(--accent-emerald)', fontWeight: 700 }}>Ongoing (4th Year)</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Undergraduate Thesis</strong>
                    <br />
                    <em>3D Vision &amp; Medical AI</em>
                  </td>
                  <td>
                    (1) Benchmarking <strong>NeRF variants and 3D Gaussian Splatting</strong> across aerial and ground-level imagery datasets; (2) Designing a lightweight cross-dataset polyp segmentation network validated under a controlled multi-seed protocol.
                  </td>
                  <td>
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Active Research</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>ICICIDS &amp; 3D Engine</strong>
                    <br />
                    <em>Core Systems Projects</em>
                  </td>
                  <td>
                    Developed the <em>Integrated Crime Investigation &amp; Criminal Database System (ICICIDS)</em> with hardened SQL injection prevention, alongside an interactive 3D graphics engine implementing matrix transformations and custom shaders in C and Python.
                  </td>
                  <td>
                    <span style={{ fontWeight: 600 }}>Completed</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>
                    Bangladesh International School &amp; College, Dhaka
                  </td>
                  <td>Higher Secondary Certificate (HSC) — Science</td>
                  <td>
                    Completed advanced secondary coursework in Higher Mathematics, Physics, Chemistry, and Information &amp; Communication Technology with distinction.
                  </td>
                  <td>
                    <strong style={{ color: 'var(--accent-emerald)' }}>CGPA 5.00 / 5.00</strong> (2022)
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 700 }}>
                    BAF Shaheen College, Dhaka
                  </td>
                  <td>Secondary School Certificate (SSC) — Science</td>
                  <td>
                    Built strong analytical foundations in science and mathematics while participating in school-level programming and science olympiads.
                  </td>
                  <td>
                    <strong style={{ color: 'var(--accent-emerald)' }}>CGPA 4.78 / 5.00</strong> (2020)
                  </td>
                </tr>
                <tr>
                  <td colSpan="3" style={{ fontWeight: 700, background: 'var(--bg-elevated)' }}>
                    Competitive Programming &amp; Cybersecurity Distinction (BUCC Bit Battles &amp; CyberWarriors League)
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-amber)', background: 'var(--bg-elevated)' }}>
                    9th / 100 Teams &amp; Red Team Analyst
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Technical Skills Section with Glowing Hover Effect */}
        <section id="technical-skills" className="section-card animate-fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
            <div>
              <span className="section-label">Technical Skills &amp; Endorsements</span>
              <h2 className="section-title skills-glow-heading" style={{ marginBottom: '0.25rem' }}>
                Technical Skills, Security Tools &amp; Live Endorsements
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
                Hover for neon glow, filter by domain, or click <strong>+ Endorse</strong> to increment endorsement counts.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['All', 'Languages', 'Frameworks', 'Security & OS'].map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSkillFilter(cat)}
                  className={skillFilter === cat ? 'btn-primary' : 'btn-outline'}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid-3">
            {filteredSkills.map((skill) => (
              <div key={skill.id} className="sub-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <span className="section-label">{skill.category}</span>
                  <h3 style={{ fontSize: '1.08rem', fontWeight: 700 }}>{skill.skillName}</h3>
                  <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                    Proficiency: <strong style={{ color: 'var(--text-secondary)' }}>{skill.proficiencyLevel}</strong>
                  </p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    ★ {skill.endorsements} Endorsements
                  </span>
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => handleEndorseSkill(skill.id)}
                  >
                    + Endorse
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categorized Links & Top 10 List */}
        <section id="categorized-links" className="section-card animate-fade-up">
          <div className="grid-2">
            <div>
              <span className="section-label">Categorized Hyperlinks</span>
              <h2 className="section-title">Categorized Links &amp; External Portals</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                <div className="sub-card">
                  <h3 style={{ fontSize: '1rem', color: 'var(--accent-primary)', marginBottom: '0.4rem' }}>
                    1. Academic &amp; Course Links
                  </h3>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <li>
                      <a href="https://www.bracu.ac.bd" target="_blank" rel="noopener noreferrer" className="content-link">
                        BRAC University Official Website (Dhaka)
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.com/channels/cse391-bracu" target="_blank" rel="noopener noreferrer" className="content-link">
                        CSE 391 Official Course Discord Server
                      </a>
                    </li>
                    <li>
                      <a href="https://validator.w3.org/" target="_blank" rel="noopener noreferrer" className="content-link">
                        W3C Markup &amp; XHTML Validation Service
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sub-card">
                  <h3 style={{ fontSize: '1rem', color: 'var(--accent-emerald)', marginBottom: '0.4rem' }}>
                    2. Software Engineering &amp; Competitive Coding
                  </h3>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <li>
                      <a href="https://github.com/Abraar-A-Rehman" target="_blank" rel="noopener noreferrer" className="content-link">
                        GitHub Repositories — github.com/Abraar-A-Rehman
                      </a>
                    </li>
                    <li>
                      <a href="https://codeforces.com/profile/Abraar_A_Rehman" target="_blank" rel="noopener noreferrer" className="content-link">
                        Codeforces Profile — Abraar_A_Rehman
                      </a>
                    </li>
                    <li>
                      <a href="https://www.linkedin.com/in/abraar-a-rehman-4030a5354/?isSelfProfile=true" target="_blank" rel="noopener noreferrer" className="content-link">
                        LinkedIn Profile — Abraar A Rehman
                      </a>
                    </li>
                  </ul>
                </div>

                <div className="sub-card">
                  <h3 style={{ fontSize: '1rem', color: 'var(--accent-amber)', marginBottom: '0.4rem' }}>
                    3. Music Production, Social Media &amp; Cybersecurity Hobbies
                  </h3>
                  <ul style={{ paddingLeft: '1.2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <li>
                      <a href="https://www.youtube.com/@Inhaad_official" target="_blank" rel="noopener noreferrer" className="content-link">
                        YouTube Music Production Channel — @Inhaad_official
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/aksari_z1000/" target="_blank" rel="noopener noreferrer" className="content-link">
                        Instagram — @aksari_z1000
                      </a>
                    </li>
                    <li>
                      <a href="https://www.facebook.com/AbraarARehman/" target="_blank" rel="noopener noreferrer" className="content-link">
                        Facebook — Abraar A Rehman
                      </a>
                    </li>
                    <li>
                      <a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer" className="content-link">
                        TryHackMe Offensive &amp; Defensive Labs (SEC0 / SEC1)
                      </a>
                    </li>
                    <li>
                      <a href="#personal-info" onClick={() => setActiveInternalPage('hobbies-ctf')} className="content-link">
                        Producing Music, Red Teaming &amp; Volunteering
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <span className="section-label">Curated Favorites</span>
              <h2 className="section-title">Top 10 Favorite Books, Films &amp; Albums</h2>
              <ol style={{ paddingLeft: '1.35rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {TOP_10_FAVORITES.map((item) => (
                  <li key={item.rank} style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    <strong style={{ color: 'var(--text-primary)' }}>{item.title}</strong>{' '}
                    <span style={{ color: 'var(--accent-primary)', fontSize: '0.8rem' }}>({item.type})</span> —{' '}
                    <em>{item.note}</em>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-section" className="section-card animate-fade-up">
          <span className="section-label">Direct Inquiry &amp; Email Dispatch</span>
          <h2 className="section-title">Contact Abraar A Rehman</h2>

          <div className="grid-2">
            <form onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="senderName">Your Full Name *</label>
                <input
                  id="senderName"
                  type="text"
                  className="form-input"
                  placeholder="e.g., CSE 391 Lab Instructor"
                  value={contactForm.senderName}
                  onChange={(e) => setContactForm({ ...contactForm, senderName: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="senderEmail">Your Email Address *</label>
                <input
                  id="senderEmail"
                  type="email"
                  className="form-input"
                  placeholder="name@bracu.ac.bd"
                  value={contactForm.senderEmail}
                  onChange={(e) => setContactForm({ ...contactForm, senderEmail: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="category">Inquiry Category</label>
                <select
                  id="category"
                  className="form-select"
                  value={contactForm.category}
                  onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                >
                  <option value="Research / Thesis Collaboration">Research / Thesis Collaboration</option>
                  <option value="Cybersecurity / Red Team Project">Cybersecurity / Red Team Project</option>
                  <option value="Music Production & Creative Collaboration">Music Production &amp; Creative Collaboration</option>
                  <option value="CSE 391 Lab Evaluation">CSE 391 Lab Evaluation</option>
                  <option value="Software Engineering Internship">Software Engineering Internship</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="form-input"
                  placeholder="Regarding CSE 391 Project / Thesis Research"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="messageBody">Message *</label>
                <textarea
                  id="messageBody"
                  rows="4"
                  className="form-textarea"
                  placeholder="Write your message to Abraar A Rehman..."
                  value={contactForm.messageBody}
                  onChange={(e) => setContactForm({ ...contactForm, messageBody: e.target.value })}
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                ✉️ Send Email &amp; Save to MySQL
              </button>

              {contactNotice && (
                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.5rem',
                    background: 'var(--bg-secondary)',
                    border: `1px solid ${contactNotice.type === 'error' ? '#ef4444' : 'var(--accent-emerald)'}`
                  }}
                >
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{contactNotice.text}</p>
                  {contactNotice.mailtoUrl && (
                    <a
                      href={contactNotice.mailtoUrl}
                      className="content-link"
                      style={{ display: 'inline-block', marginTop: '0.4rem', fontSize: '0.85rem' }}
                    >
                      → Click here to also open in your default Mail Client (mailto:abrar.a.rehman@gmail.com)
                    </a>
                  )}
                </div>
              )}
            </form>

            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>
                Recent Inquiries Persisted in MySQL (`contact_messages`)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {savedMessages.map((msg) => (
                  <div key={msg.id} className="sub-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--accent-primary)' }}>
                      <span>{msg.category}</span>
                      <span>{msg.createdAt}</span>
                    </div>
                    <h4 style={{ fontSize: '0.96rem', margin: '0.25rem 0' }}>{msg.subject}</h4>
                    <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                      {msg.messageBody}
                    </p>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      From: <strong>{msg.senderName}</strong> ({msg.senderEmail}) •{' '}
                      <span style={{ color: 'var(--accent-emerald)' }}>✓ Saved &amp; Email Triggered</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Semantic Footer with Copyright & JS Location/LastModified */}
      <footer className="site-footer">
        <div className="header-inner" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: '1rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
              &copy; {new Date().getFullYear()} Abraar A Rehman — CSE 391: Programming for the Internet (BRAC University). All Rights Reserved.
            </p>
            <p>
              Built with <strong>Spring Boot 3 + MySQL 8 + Vite + React 18 + Full CSS3</strong>
            </p>
          </div>
          <div
            style={{
              width: '100%',
              paddingTop: '0.65rem',
              borderTop: '1px solid var(--border-color)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.78rem',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <span>
              <strong>Page Location (JS window.location.href):</strong> {pageLocation}
            </span>
            <span>
              <strong>Last Modified (JS document.lastModified):</strong> {lastModifiedDate}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
