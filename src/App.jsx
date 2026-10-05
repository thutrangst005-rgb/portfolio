import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from './data/portfolioData.js';
import './styles/main.css';

export default function App() {
  const [introVisible, setIntroVisible] = useState(true);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [currentScene, setCurrentScene] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const [activeModalQuest, setActiveModalQuest] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [soundActive, setSoundActive] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const ytPlayerRef = useRef(null);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.async = true;
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      } else {
        document.head.appendChild(tag);
      }
    }

    const initYT = () => {
      if (window.YT && window.YT.Player && !ytPlayerRef.current) {
        try {
          ytPlayerRef.current = new window.YT.Player('yt-intro-player-react', {
            height: '200',
            width: '200',
            videoId: 'u0Riy2fTBvU',
            playerVars: {
              autoplay: 0,
              controls: 0,
              disablekb: 1,
              fs: 0,
              modestbranding: 1,
              playsinline: 1,
              rel: 0,
              loop: 1,
              playlist: 'u0Riy2fTBvU'
            },
            events: {
              onError: () => {}
            }
          });
        } catch (e) {}
      }
    };

    if (window.YT && window.YT.Player) {
      initYT();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prev === 'function') prev();
        initYT();
      };
    }

    return () => {
      if (ytPlayerRef.current && typeof ytPlayerRef.current.stopVideo === 'function') {
        try { ytPlayerRef.current.stopVideo(); } catch (e) {}
      }
    };
  }, []);

  const playMusic = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        if (typeof ytPlayerRef.current.unMute === 'function') {
          ytPlayerRef.current.unMute();
        }
        ytPlayerRef.current.playVideo();
      } catch (e) {}
    }
  };

  const pauseMusic = () => {
    if (ytPlayerRef.current && typeof ytPlayerRef.current.pauseVideo === 'function') {
      try { ytPlayerRef.current.pauseVideo(); } catch (e) {}
    }
  };

  const stopMusic = () => {
    if (ytPlayerRef.current) {
      try {
        if (typeof ytPlayerRef.current.stopVideo === 'function') {
          ytPlayerRef.current.stopVideo();
        } else if (typeof ytPlayerRef.current.pauseVideo === 'function') {
          ytPlayerRef.current.pauseVideo();
        }
      } catch (e) {}
    }
  };

  const startJourney = () => {
    setJourneyStarted(true);
    if (soundEnabled) {
      playMusic();
    }
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    if (nextState) {
      if (journeyStarted) playMusic();
    } else {
      pauseMusic();
    }
  };

  const skipIntro = () => {
    stopMusic();
    setIntroVisible(false);
  };

  const finishIntro = () => {
    stopMusic();
    setIntroVisible(false);
  };

  // Intro animation loop (only starts when user clicks "BEGIN THE JOURNEY →")
  useEffect(() => {
    if (!introVisible || !journeyStarted) return;
    const duration = 24000;
    const interval = 100;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      const pct = Math.min(elapsed / duration, 1);
      setIntroProgress(pct * 100);

      if (elapsed < 3800) setCurrentScene(0);
      else if (elapsed < 8200) setCurrentScene(1);
      else if (elapsed < 12800) setCurrentScene(2);
      else if (elapsed < 16800) setCurrentScene(3);
      else if (elapsed < 20800) setCurrentScene(4);
      else setCurrentScene(5);

      if (pct >= 1) {
        clearInterval(timer);
        setTimeout(finishIntro, 1200);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [introVisible, journeyStarted]);

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(height > 0 ? (top / height) * 100 : 0);

      const sections = ['hero', 'origin', 'journey', 'quests', 'archive', 'tools', 'horizon'];
      for (const s of sections) {
        const el = document.getElementById(s);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(s);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copyEmail = (email) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email);
      alert('Email copied to clipboard: ' + email);
    }
  };

  return (
    <div className="odyssey-app">
      <div className="grain-overlay" aria-hidden="true"></div>

      {/* Visually Hidden YouTube Audio Player Container */}
      <div className="yt-hidden-player-container" aria-hidden="true">
        <div id="yt-intro-player-react"></div>
      </div>

      {/* Cinematic Intro */}
      {introVisible && (
        <aside className="cinematic-intro" role="dialog" aria-modal="true">
          <div className="intro-content-container">
            <div className={`intro-scene ${currentScene === 0 ? 'active' : ''}`}>
              <div className="intro-small-title">THE ODYSSEY</div>
              <h1 className="intro-big-text">
                EVERY JOURNEY<br />BEGINS WITH<br />A DEPARTURE.
              </h1>
              {!journeyStarted && (
                <div style={{ marginTop: '2.5rem' }}>
                  <button className="btn-cinematic" onClick={startJourney}>
                    BEGIN THE JOURNEY →
                  </button>
                </div>
              )}
            </div>

            <div className={`intro-scene ${currentScene === 1 ? 'active' : ''}`}>
              <div className="intro-small-title">NAVIGATION COORDINATES // 21°01'N 105°51'E</div>
              <h2 className="intro-big-text">CHARTING UNCHARTED WATERS<br />ACROSS CELESTIAL HORIZONS.</h2>
            </div>

            <div className={`intro-scene ${currentScene === 2 ? 'active' : ''}`}>
              <div className="intro-small-title">THE EXPLORER</div>
              <h2 className="intro-name-text">PHAN THỊ<br />THU TRANG</h2>
            </div>

            <div className={`intro-scene ${currentScene === 3 ? 'active' : ''}`}>
              <div className="intro-small-title">THE CONVERGENCE</div>
              <div className="intro-pillars">
                <span className="intro-pillar-item">FINANCE</span>
                <span className="intro-pillar-sep">×</span>
                <span className="intro-pillar-item">BUSINESS</span>
                <span className="intro-pillar-sep">×</span>
                <span className="intro-pillar-item">TECHNOLOGY</span>
              </div>
            </div>

            <div className={`intro-scene ${currentScene === 4 ? 'active' : ''}`}>
              <div className="intro-small-title">EXPEDITION MANIFESTO</div>
              <h2 className="intro-big-text">
                A JOURNEY THROUGH<br />MARKETS, IDEAS<br />AND TECHNOLOGY.
              </h2>
            </div>

            <div className={`intro-scene ${currentScene === 5 ? 'active' : ''}`}>
              <div className="intro-small-title">DESTINATIONS UNLOCKED</div>
              <h2 className="intro-big-text" style={{ color: 'var(--accent-gold-light)' }}>
                THE JOURNEY BEGINS.
              </h2>
              <div style={{ marginTop: '2rem' }}>
                <button className="btn-cinematic" onClick={finishIntro}>
                  ENTER PORTFOLIO →
                </button>
              </div>
            </div>
          </div>

          <div className="intro-controls">
            <div className="intro-progress-bar-container">
              <div className="intro-progress-bar-fill" style={{ width: `${introProgress}%` }}></div>
            </div>
            <div className="intro-progress-label">
              {journeyStarted ? `EXPEDITION INITIALIZATION // ${Math.floor(introProgress)}%` : 'EXPEDITION INITIALIZATION // READY'}
            </div>
            <div className="intro-btn-group">
              <button
                type="button"
                className={`intro-sound-btn ${!soundEnabled ? 'sound-off' : ''}`}
                onClick={toggleSound}
                title={soundEnabled ? 'Sound: Music On (Click to turn off)' : 'Sound: Music Off (Click to turn on)'}
              >
                <span>{soundEnabled ? '♪' : '✕'}</span>
                <span>{soundEnabled ? 'SOUND ON' : 'SOUND OFF'}</span>
              </button>
              <button className="intro-skip-btn" onClick={skipIntro}>
                SKIP INTRO →
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Sticky Header */}
      <header className="main-header">
        <div className="nav-scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
        <div className="nav-inner">
          <a href="#hero" className="nav-brand">
            <span className="brand-title">TRANG // THE ODYSSEY</span>
            <span className="brand-coordinates">21°01'N 105°51'E</span>
          </a>

          <nav>
            <ul className="nav-menu">
              {portfolioData.navigation.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  >
                    {item.code}. {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nav-tools-group">
            <button
              type="button"
              className={`sound-toggle-btn ${soundActive ? 'active' : ''}`}
              onClick={() => setSoundActive(!soundActive)}
              title="Toggle Ambience"
            >
              ♪
            </button>
            <button
              type="button"
              className="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Sections */}
      <main>
        {/* Section 00: Hero */}
        <section id="hero" className="hero-section">
          <div className="container">
            <div className="hero-content">
              <div className="hero-pre-badge">VOYAGE DOSSIER // EXPEDITION 2026</div>
              <h1 className="hero-name">PHAN THỊ<br />THU TRANG</h1>
              <div className="hero-odyssey-subtitle">THE ODYSSEY</div>
              <div className="hero-triad">
                <span>FINANCE</span><span className="sep">×</span>
                <span>BUSINESS</span><span className="sep">×</span>
                <span>TECHNOLOGY</span>
              </div>
              <div className="hero-bio-dossier">
                <p className="hero-bio-title">Final-year International Finance student</p>
                <p className="hero-bio-inst">Foreign Trade University</p>
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
                <a href="#origin" className="btn-cinematic">EXPLORE MY JOURNEY ↓</a>
                <a href="#quests" className="btn-cinematic btn-cinematic-secondary">VIEW QUESTS →</a>
              </div>
            </div>
          </div>
        </section>

        {/* Section 01: The Origin */}
        <section id="origin" className="section-wrapper">
          <div className="container">
            <div className="chapter-number">{portfolioData.origin.sectionCode}</div>
            <h2 className="section-headline">{portfolioData.origin.headline}</h2>
            <p className="section-subheadline">ACADEMIC DOSSIER // QUANTITATIVE FOUNDATION</p>
            <div className="origin-grid">
              <div className="academic-card magnetic-card">
                <div className="academic-header-stamp">
                  <span className="archival-tag">FOUNDATIONAL EXPEDITION</span>
                  <span className="font-mono text-muted">{portfolioData.origin.period}</span>
                </div>
                <h3 className="university-name">{portfolioData.origin.institution}</h3>
                <div className="major-name">{portfolioData.origin.major}</div>
                <div className="gpa-monument">
                  <div className="gpa-number">{portfolioData.origin.gpa}</div>
                  <div className="gpa-scale">/ {portfolioData.origin.gpaScale} GPA</div>
                </div>
                <div className="coursework-container">
                  <div className="coursework-title">RELEVANT COURSEWORK & CURRICULUM</div>
                  <div className="coursework-pill-grid">
                    {portfolioData.origin.coursework.map((course, idx) => (
                      <div key={idx} className="coursework-pill">
                        <span className="coursework-pill-dot"></span>
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="archival-sidebar">
                <div className="archival-tag slate" style={{ marginBottom: '1.5rem' }}>ACADEMIC DISPATCH</div>
                <p className="archival-manifesto">
                  "{portfolioData.origin.editorialNote}"
                </p>
                <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.8 }}>
                  <div>INSTITUTION: Foreign Trade University (FTU)</div>
                  <div>LOCATION: Hanoi, Vietnam</div>
                  <div>SPECIALIZATION: Quantitative Valuation & Computational Finance</div>
                  <div style={{ color: 'var(--accent-gold)', marginTop: '0.5rem' }}>STATUS: Final-Year Candidate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: The Journey */}
        <section id="journey" className="section-wrapper">
          <div className="container">
            <div className="chapter-number">{portfolioData.journey.sectionCode}</div>
            <h2 className="section-headline">{portfolioData.journey.headline}</h2>
            <p className="section-subheadline">PROFESSIONAL TRAJECTORY & STRATEGIC LEADERSHIP</p>

            <div className="journey-timeline">
              {portfolioData.journey.experiences.map((exp) => (
                <div key={exp.id} className="journey-milestone">
                  <div className="journey-milestone-marker beacon-pulse"></div>
                  <div className="milestone-content-card magnetic-card">
                    <div className="milestone-top-row">
                      <div>
                        <div className="archival-tag" style={{ marginBottom: '0.75rem' }}>CAREER EXPEDITION</div>
                        <h3 className="milestone-company">{exp.company}</h3>
                        <div className="milestone-role">{exp.role}</div>
                      </div>
                      <div className="milestone-period">{exp.period}</div>
                    </div>
                    <p className="milestone-description">{exp.description}</p>
                    {exp.highlights && (
                      <div className="milestone-highlight-tags">
                        {exp.highlights.map((h, i) => (
                          <span key={i} className="archival-tag">{h}</span>
                        ))}
                      </div>
                    )}
                    {exp.metrics && (
                      <div className="metrics-quad-grid">
                        {exp.metrics.map((m, i) => (
                          <div key={i} className="metric-item">
                            <span className="giant-number">{m.value}</span>
                            <span className="giant-number-label">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 03: The Quests */}
        <section id="quests" className="section-wrapper">
          <div className="container">
            <div className="chapter-number">03 // THE QUESTS</div>
            <h2 className="section-headline">MAJOR DESTINATIONS.</h2>
            <p className="section-subheadline">PROJECTS & CASE STUDIES</p>

            <div className="quests-destination-deck">
              {/* Featured Quest: Cardy */}
              <article className="quest-featured-card magnetic-card">
                <div className="quest-info-pane">
                  <div>
                    <div className="quest-category-stamp">★ FEATURED QUEST // FINTECH PLATFORM</div>
                    <h3 className="quest-name">{portfolioData.quests[0].title}</h3>
                    <div className="quest-tagline">{portfolioData.quests[0].tagline}</div>
                    <p className="quest-desc">{portfolioData.quests[0].summary}</p>
                    <div className="quest-tag-row">
                      {portfolioData.quests[0].tags.map((t, idx) => (
                        <span key={idx} className="quest-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="btn-cinematic"
                      onClick={() => setActiveModalQuest(portfolioData.quests[0])}
                    >
                      ENTER QUEST →
                    </button>
                  </div>
                </div>

                <div className="quest-visual-pane">
                  <div className="cardy-ui-mockup">
                    <div className="mockup-top-bar">
                      <div className="mockup-dots"><span></span><span></span><span></span></div>
                      <div className="mockup-title">CARDY // PORTFOLIO OPTIMIZER</div>
                    </div>
                    <div className="mockup-body">
                      <div className="cardy-card-graphic">
                        <div className="cardy-card-chip"></div>
                        <div className="cardy-card-num">•••• •••• •••• 8826</div>
                        <div className="cardy-card-foot">
                          <span>PHAN THI THU TRANG</span>
                          <span style={{ color: 'var(--accent-gold-light)' }}>PLATINUM</span>
                        </div>
                      </div>
                      <div className="cardy-metrics-preview">
                        <div className="cardy-metric-box">
                          <label>OPTIMAL REWARD</label>
                          <span>15.0% CASHBACK</span>
                        </div>
                        <div className="cardy-metric-box">
                          <label>ANNUAL VALUE</label>
                          <span>7.2M VND</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Secondary Quests */}
              <div className="secondary-quests-grid">
                {portfolioData.quests.slice(1).map((quest) => (
                  <article key={quest.id} className="quest-subcard magnetic-card">
                    <div>
                      <div className="quest-category-stamp">EXPEDITION DOSSIER</div>
                      <h3 className="quest-name" style={{ fontSize: '2rem' }}>{quest.title}</h3>
                      <div className="quest-tagline">{quest.tagline}</div>
                      <p className="quest-desc">{quest.summary}</p>
                      <div className="quest-tag-row">
                        {quest.tags.map((t, idx) => (
                          <span key={idx} className="quest-tag">{t}</span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="btn-cinematic btn-cinematic-secondary"
                        onClick={() => setActiveModalQuest(quest)}
                      >
                        ENTER QUEST →
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: The Archive */}
        <section id="archive" className="section-wrapper">
          <div className="container">
            <div className="chapter-number">{portfolioData.archive.sectionCode}</div>
            <h2 className="section-headline">{portfolioData.archive.headline}</h2>
            <p className="section-subheadline">PUBLISHED EMPIRICAL RESEARCH & BEHAVIORAL ASSET PRICING</p>

            <article className="archive-paper-card">
              <div className="archive-watermark">SPEC-2026-FTU</div>
              <div className="archival-tag" style={{ marginBottom: '1.5rem' }}>
                RESEARCH PUBLICATION // {portfolioData.archive.publicationDate}
              </div>
              <h3 className="archive-paper-title">{portfolioData.archive.researchTopic}</h3>
              <div className="archive-vietnamese-quote">{portfolioData.archive.publishedTitle}</div>

              <div className="archive-meta-grid">
                {portfolioData.archive.metrics.map((m, idx) => (
                  <div key={idx} className="archive-meta-item">
                    <label>{m.label}</label>
                    <span>{m.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '3rem' }}>
                <button
                  type="button"
                  className="btn-cinematic"
                  onClick={() => setActiveModalQuest(portfolioData.quests[1])}
                >
                  READ FULL RESEARCH DOSSIER →
                </button>
              </div>
            </article>
          </div>
        </section>

        {/* Section 05: The Tools */}
        <section id="tools" className="section-wrapper">
          <div className="container">
            <div className="chapter-number">{portfolioData.tools.sectionCode}</div>
            <h2 className="section-headline">{portfolioData.tools.headline}</h2>
            <p className="section-subheadline">TECHNICAL INSTRUMENTS, RIGOR & CREDENTIALS</p>

            <div className="tools-grid">
              {portfolioData.tools.categories.map((cat, idx) => (
                <div key={idx} className="tool-deck-card magnetic-card">
                  <div className="tool-deck-icon">{cat.code}</div>
                  <h3 className="tool-deck-title">{cat.name}</h3>
                  <ul className="tool-tag-list">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="tool-tag-item">
                        <span className="bullet">◆</span> {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 06: The Horizon */}
        <section id="horizon" className="horizon-section">
          <div className="container horizon-content">
            <div className="chapter-number" style={{ justifyContent: 'center' }}>06 // THE HORIZON</div>
            <h2 className="horizon-headline gold-shimmer">{portfolioData.horizon.headline}</h2>
            <div className="horizon-prose-lines">
              {portfolioData.horizon.epigraph.map((line, idx) => (
                <React.Fragment key={idx}>
                  {line}<br />
                </React.Fragment>
              ))}
            </div>

            <div className="horizon-next-label">{portfolioData.horizon.prompt}</div>

            <div className="horizon-channels">
              <a href={portfolioData.personal.socialLinks.github} target="_blank" rel="noopener noreferrer" className="btn-cinematic">
                GITHUB ↗
              </a>
              <a href={portfolioData.personal.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="btn-cinematic">
                LINKEDIN ↗
              </a>
              <button
                type="button"
                className="btn-cinematic"
                onClick={() => copyEmail(portfolioData.personal.socialLinks.email.replace('mailto:', ''))}
              >
                EMAIL ✉
              </button>
            </div>

            <footer className="horizon-footer-signoff">
              <div>{portfolioData.personal.name}</div>
              <div style={{ color: 'var(--accent-gold)', marginTop: '0.35rem' }}>{portfolioData.personal.brand} // {portfolioData.personal.year}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                COORDINATES: {portfolioData.personal.coordinates} // {portfolioData.personal.institution.toUpperCase()}
              </div>
            </footer>
          </div>
        </section>
      </main>

      {/* Case Study Modal */}
      {activeModalQuest && (
        <div className="case-study-modal open" role="dialog" aria-modal="true">
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => setActiveModalQuest(null)}
          >
            ✕ CLOSE DOSSIER [ESC]
          </button>
          <div className="modal-inner-container">
            <header className="modal-header-section">
              <div className="chapter-number">DESTINATION DOSSIER // QUEST: {activeModalQuest.id.toUpperCase()}</div>
              <h1 className="section-headline">{activeModalQuest.title}</h1>
              <p className="section-subheadline">{activeModalQuest.tagline}</p>
            </header>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 01</div>
              <h2 className="modal-chapter-title">THE PROBLEM</h2>
              <p className="modal-prose">{activeModalQuest.caseStudy.problem}</p>
            </section>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 02</div>
              <h2 className="modal-chapter-title">THE IDEA</h2>
              <p className="modal-prose">{activeModalQuest.caseStudy.idea}</p>
            </section>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 03</div>
              <h2 className="modal-chapter-title">THE PROCESS</h2>
              <p className="modal-prose">{activeModalQuest.caseStudy.process}</p>
            </section>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 04</div>
              <h2 className="modal-chapter-title">THE PRODUCT</h2>
              <p className="modal-prose">{activeModalQuest.caseStudy.product}</p>
            </section>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 05</div>
              <h2 className="modal-chapter-title">THE RESULT</h2>
              <p className="modal-prose">{activeModalQuest.caseStudy.result}</p>
            </section>
            <section className="modal-chapter-block">
              <div className="modal-chapter-tag">CHAPTER 06</div>
              <h2 className="modal-chapter-title">EXPEDITION LOGS & ACCESS</h2>
              <div className="modal-action-row">
                <a href={activeModalQuest.caseStudy.links.liveDemo} target="_blank" rel="noopener noreferrer" className="btn-cinematic">
                  LIVE DEMO →
                </a>
                <a href={activeModalQuest.caseStudy.links.github} target="_blank" rel="noopener noreferrer" className="btn-cinematic btn-cinematic-secondary">
                  GITHUB →
                </a>
              </div>
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
