import React, { useEffect, useRef, useState } from 'react';

const profileImage = new URL('../assets/profile/jericho profile.jpeg', import.meta.url).href;
const previousWorkModules = import.meta.glob('../assets/previous-work/*.png', { import: 'default' });
const previousWorkSlides = Object.keys(previousWorkModules)
  .map((path) => {
    const fileName = path.split('/').pop()?.replace(/\.png$/i, '') ?? 'Previous work';
    const title = fileName
      .replace(/[-_]+/g, ' ')
      .replace(/\b\w/g, (character) => character.toUpperCase());

    return {
      path,
      title,
      load: previousWorkModules[path],
    };
  })
  .sort((firstItem, secondItem) =>
    firstItem.title.localeCompare(secondItem.title, undefined, {
      numeric: true,
      sensitivity: 'base',
    })
  );

const services = [
  {
    icon: 'bi-ui-checks-grid',
    title: 'GoHighLevel Expert',
    description:
      'CRM setup, funnels, pipelines, and workflow management for client operations.',
  },
  {
    icon: 'bi-gear-fill',
    title: 'Automation',
    description:
      'Streamlined systems that reduce manual work and improve process efficiency.',
  },
  {
    icon: 'bi-plug-fill',
    title: 'Integration',
    description:
      'API, webhook, and third-party tool connections built for reliable data flow.',
  },
  {
    icon: 'bi-brush',
    title: 'Graphics Design',
    description:
      'Visual assets for branding, ads, and content that support a polished business presence.',
  },
  {
    icon: 'bi-window',
    title: 'Web UI/UX Design',
    description:
      'Responsive interface layouts with clarity, structure, and user flow in mind.',
  },
  {
    icon: 'bi-funnel-fill',
    title: 'Funnel UI/UX Design',
    description:
      'Conversion-focused funnel layouts designed to guide leads through the right steps.',
  },
  {
    icon: 'bi-cpu-fill',
    title: 'AI Automation Integration',
    description:
      'AI-powered workflows that support smarter operations and faster business responses.',
  },
  {
    icon: 'bi-camera-reels-fill',
    title: 'Video Editing',
    description:
      'Edited video content for promotions, social media, and branded digital content.',
  },
];

const toolGroups = [
  {
    icon: 'bi-robot',
    title: 'Automation Platforms',
    items: ['GoHighLevel', 'N8N', 'Make.com', 'Zapier', 'Vapi AI', 'ManyChat', 'Chatbot.com'],
  },
  {
    icon: 'bi-kanban',
    title: 'Productivity & CRM',
    items: ['Slack', 'Airtable', 'ClickUp'],
  },
  {
    icon: 'bi-code-slash',
    title: 'Technical Skills',
    items: ['Basic HTML/CSS', 'Basic JavaScript', 'Basic Vue.js', 'Basic JSON'],
  },
  {
    icon: 'bi-search',
    title: 'Google Tools',
    items: ['Google Console', 'Google Docs', 'Google Sheets', 'Gmail', 'Google Analytics'],
  },
];

const projects = [
  {
    id: 'connectmycity',
    tag: 'GoHighLevel',
    title: 'Connectmycity',
    excerpt: 'Built and optimized landing pages and automated sales funnels.',
    date: 'January 2022',
    details:
      'Connectmycity is a business networking platform that required custom sales funnels, automation, and CRM management to facilitate smooth interactions between clients. As their GoHighLevel Expert, I created tailored automation workflows to improve efficiency.',
  },
  {
    id: 'kixaconnect',
    tag: 'GoHighLevel',
    title: 'KixaConnect',
    excerpt: 'Built and optimized landing pages and automated sales funnels.',
    date: 'August 2024',
    details:
      'KixaConnect is a business networking platform that required custom sales funnels, automation, and CRM management. As their GoHighLevel Expert, I created tailored automation workflows to improve efficiency.',
  },
  {
    id: 'smartbizloans',
    tag: 'GoHighLevel',
    title: 'Smartbizloans',
    excerpt: 'Developed lead generation funnels for financial services.',
    date: 'January 2021',
    details:
      'Smartbizloans needed an automated lead generation system for financial services, optimizing its GoHighLevel CRM and funnel strategies. I built automation workflows that streamlined the loan application process.',
  },
  {
    id: 'profitkoresolution',
    tag: 'GoHighLevel',
    title: 'ProfitKore Solution',
    excerpt: 'Designed high-converting landing pages and streamlined funnels.',
    date: 'January 2025',
    details:
      'ProfitKore Solutions required customized sales funnels, automation systems, and CRM management. I developed tailored automation workflows to increase efficiency and drive better results.',
  },
  {
    id: '3rplumbing',
    tag: 'Video / Design',
    title: '3r Plumbing & Mechanical',
    excerpt: 'Edited marketing and service highlight videos; designed ad materials.',
    date: 'January 2022',
    details:
      '3r Plumbing & Mechanical needed marketing content to promote their plumbing services. I created promotional videos and advertising materials to attract new clients.',
  },
  {
    id: 'digilign',
    tag: 'Video / Marketing',
    title: 'Digilign',
    excerpt: 'Sales funnels, CRM workflows, video editing, and ad creatives.',
    date: 'April 2024',
    details:
      'Digilign is a SaaS digital marketing agency. I worked remotely as their GoHighLevel Specialist and Video Editor, handling automation, CRM optimization, and content creation for campaigns.',
  },
  {
    id: 'lambsclothing',
    tag: 'Video',
    title: 'Lambs Clothing',
    excerpt: 'Edited marketing videos and produced branded social content.',
    date: 'January 2023',
    details:
      'Lambs Clothing required branded video content and social media marketing materials. I produced high-quality content to strengthen their digital presence.',
  },
  {
    id: 'ndta',
    tag: 'Video / CRM',
    title: 'National Dump Trucking Association (NDTA)',
    excerpt: 'CRM automation, training videos, and promotional content.',
    date: 'January 2023',
    details:
      'NDTA required a customized GoHighLevel CRM system and video content strategy. I built membership pipelines, automated invoicing, and produced branded content and training videos.',
  },
  {
    id: 'techflow',
    tag: 'Automation',
    title: 'TechFlow Solutions (Freelance)',
    excerpt: 'Automated workflows, integrations, and AI-assisted solutions.',
    date: 'March 2023',
    details:
      'Automated marketing workflows using Make and Zapier, connected lead forms to CRMs with n8n, and implemented AI-assisted content generation to improve efficiency.',
  },
  {
    id: 'brightline',
    tag: 'Automation',
    title: 'BrightLine Electrical Services',
    excerpt: 'Marketing automation and integrations for lead management.',
    date: 'April 2024',
    details:
      'Built integrations connecting lead forms and CRMs, developed pipelines for inquiries and scheduling, and implemented AI-assisted content scheduling to maintain consistent presence.',
  },
];

function SectionHeader({ kicker, title }) {
  return (
    <div className="section-title-wrap">
      <p className="kicker">{kicker}</p>
      <h2>{title}</h2>
    </div>
  );
}

function PreviousWorkCard({ slide, index, shouldPreload }) {
  const [src, setSrc] = useState(null);
  const rootRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    if (!shouldPreload) return undefined;

    Promise.resolve(slide.load?.()).then((loadedSrc) => {
      if (!cancelled) setSrc(loadedSrc);
    });

    return () => {
      cancelled = true;
    };
  }, [shouldPreload, slide]);

  useEffect(() => {
    if (src) return undefined;
    const node = rootRef.current;
    if (!node) return undefined;

    let cancelled = false;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          Promise.resolve(slide.load?.()).then((loadedSrc) => {
            if (!cancelled) setSrc(loadedSrc);
          });
        });
      },
      { root: node.parentElement, rootMargin: '200px 0px', threshold: 0.01 }
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [slide, src]);

  return (
    <article className="card previous-work-card" ref={rootRef}>
      <div className="previous-work-media">
        {src ? (
          <img
            src={src}
            alt={`Previous work ${index + 1}`}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
          />
        ) : (
          <div className="previous-work-skeleton" aria-label="Loading previous work preview"></div>
        )}
      </div>
    </article>
  );
}

function App() {
  const currentYear = new Date().getFullYear();
  const [navOpen, setNavOpen] = useState(false);
  const [profileMissing, setProfileMissing] = useState(false);
  const [openProjects, setOpenProjects] = useState({});
  const progressBarRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorRingRef = useRef(null);
  const scrollerRef = useRef(null);
  const previousWorkCarouselRef = useRef(null);

  useEffect(() => {
    const items = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    if (!progressBar) return undefined;

    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || window.pageYOffset || doc.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
      progressBar.style.transform = `scaleX(${pct})`;
      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    requestUpdate();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
    };
  }, []);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const cursor = cursorRef.current;
    const cursorRing = cursorRingRef.current;

    if (!finePointer || !cursor || !cursorRing) return undefined;

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let ringX = cursorX;
    let ringY = cursorY;
    let framePending = false;

    const render = () => {
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      framePending = false;
    };

    const schedule = () => {
      if (!framePending) {
        framePending = true;
        window.requestAnimationFrame(render);
      }
    };

    const isInteractive = (node) =>
      node instanceof Element && node.closest('a, button, .btn, .card, .tool-tags span');

    const handleMove = (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      ringX += (cursorX - ringX) * 0.18;
      ringY += (cursorY - ringY) * 0.18;
      cursor.classList.add('is-visible');
      cursorRing.classList.add('is-visible');
      schedule();
    };

    const handleDown = () => {
      cursorRing.classList.add('is-hovering');
    };

    const handleUp = () => {
      cursorRing.classList.remove('is-hovering');
    };

    const handleOver = (event) => {
      if (isInteractive(event.target)) {
        cursor.classList.add('is-hovering');
        cursorRing.classList.add('is-hovering');
      }
    };

    const handleOut = (event) => {
      if (!isInteractive(event.relatedTarget)) {
        cursor.classList.remove('is-hovering');
        cursorRing.classList.remove('is-hovering');
      }
    };

    const handleEnter = () => {
      cursor.classList.add('is-visible');
      cursorRing.classList.add('is-visible');
    };

    const handleLeave = () => {
      cursor.classList.remove('is-visible');
      cursorRing.classList.remove('is-visible');
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    window.addEventListener('pointerdown', handleDown);
    window.addEventListener('pointerup', handleUp);
    document.addEventListener('pointerover', handleOver);
    document.addEventListener('pointerout', handleOut);
    document.addEventListener('mouseenter', handleEnter);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      window.removeEventListener('pointerdown', handleDown);
      window.removeEventListener('pointerup', handleUp);
      document.removeEventListener('pointerover', handleOver);
      document.removeEventListener('pointerout', handleOut);
      document.removeEventListener('mouseenter', handleEnter);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragged = false;
    const dragThreshold = 6;

    const handlePointerDown = (event) => {
      if (event.button !== 0) return;
      if (event.target.closest('button, a, .project-toggle')) return;

      isDown = true;
      dragged = false;
      scroller.classList.add('is-dragging');
      scroller.style.userSelect = 'none';
      startX = event.clientX;
      scrollLeft = scroller.scrollLeft;

      try {
        event.target.setPointerCapture?.(event.pointerId);
      } catch {
        try {
          scroller.setPointerCapture?.(event.pointerId);
        } catch {
          // ignore
        }
      }

      event.preventDefault();
    };

    const handlePointerMove = (event) => {
      if (!isDown) return;
      const walk = startX - event.clientX;
      if (!dragged && Math.abs(walk) > dragThreshold) {
        dragged = true;
      }
      scroller.scrollLeft = scrollLeft + walk;
    };

    const clearDrag = () => {
      if (!isDown) return;
      isDown = false;
      scroller.classList.remove('is-dragging');
      scroller.style.userSelect = '';
    };

    const handleClick = (event) => {
      if (dragged) {
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      }
    };

    scroller.addEventListener('pointerdown', handlePointerDown, { capture: true, passive: false });
    scroller.addEventListener('pointermove', handlePointerMove);
    scroller.addEventListener('pointerup', clearDrag);
    scroller.addEventListener('pointercancel', clearDrag);
    scroller.addEventListener('pointerleave', clearDrag);
    scroller.addEventListener('click', handleClick, true);

    return () => {
      scroller.removeEventListener('pointerdown', handlePointerDown, { capture: true });
      scroller.removeEventListener('pointermove', handlePointerMove);
      scroller.removeEventListener('pointerup', clearDrag);
      scroller.removeEventListener('pointercancel', clearDrag);
      scroller.removeEventListener('pointerleave', clearDrag);
      scroller.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    const carousel = previousWorkCarouselRef.current;
    if (!carousel || previousWorkSlides.length <= 1) return undefined;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return undefined;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let dragged = false;
    const dragThreshold = 6;

    const handlePointerDown = (event) => {
      if (event.button !== 0) return;

      isDown = true;
      dragged = false;
      carousel.classList.add('is-dragging');
      carousel.style.userSelect = 'none';
      startX = event.clientX;
      scrollLeft = carousel.scrollLeft;

      try {
        carousel.setPointerCapture?.(event.pointerId);
      } catch {
        // ignore pointer capture issues
      }

      event.preventDefault();
    };

    const handlePointerMove = (event) => {
      if (!isDown) return;

      const walk = startX - event.clientX;
      if (!dragged && Math.abs(walk) > dragThreshold) {
        dragged = true;
      }

      carousel.scrollLeft = scrollLeft + walk;
    };

    const clearDrag = () => {
      if (!isDown) return;

      isDown = false;
      carousel.classList.remove('is-dragging');
      carousel.style.userSelect = '';
    };

    const handleClick = (event) => {
      if (dragged) {
        event.preventDefault();
        event.stopPropagation();
        dragged = false;
      }
    };

    let intervalId = window.setInterval(() => {
      if (isDown) return;

      const cards = carousel.querySelectorAll('.previous-work-card');
      const firstCard = cards[0];

      if (!firstCard) return;

      const cardWidth = firstCard.getBoundingClientRect().width;
      const carouselStyles = window.getComputedStyle(carousel);
      const gapValue = carouselStyles.columnGap || carouselStyles.gap || '0';
      const gap = Number.parseFloat(gapValue) || 0;
      const step = cardWidth + gap;
      const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth - 8;
      const nextScrollLeft = carousel.scrollLeft + step;

      if (nextScrollLeft >= maxScrollLeft) {
        carousel.scrollTo({ left: 0, behavior: 'smooth' });
        return;
      }

      carousel.scrollBy({ left: step, behavior: 'smooth' });
    }, 4000);

    carousel.addEventListener('pointerdown', handlePointerDown, { passive: false });
    carousel.addEventListener('pointermove', handlePointerMove);
    carousel.addEventListener('pointerup', clearDrag);
    carousel.addEventListener('pointercancel', clearDrag);
    carousel.addEventListener('pointerleave', clearDrag);
    carousel.addEventListener('click', handleClick, true);

    return () => {
      window.clearInterval(intervalId);
      intervalId = 0;
      carousel.removeEventListener('pointerdown', handlePointerDown);
      carousel.removeEventListener('pointermove', handlePointerMove);
      carousel.removeEventListener('pointerup', clearDrag);
      carousel.removeEventListener('pointercancel', clearDrag);
      carousel.removeEventListener('pointerleave', clearDrag);
      carousel.removeEventListener('click', handleClick, true);
    };
  }, []);

  const toggleProject = (projectId) => {
    setOpenProjects((current) => ({
      ...current,
      [projectId]: !current[projectId],
    }));
  };

  const closeMenu = () => setNavOpen(false);

  return (
    <>
      <div id="scroll-progress" aria-hidden="true">
        <div id="scroll-progress-bar" ref={progressBarRef} aria-hidden="true"></div>
      </div>
      <div className="custom-cursor" ref={cursorRef} aria-hidden="true"></div>
      <div className="custom-cursor-ring" ref={cursorRingRef} aria-hidden="true"></div>
      <div className="bg-matrix" aria-hidden="true"></div>
      <div className="bg-orb bg-orb-1" aria-hidden="true"></div>
      <div className="bg-orb bg-orb-2" aria-hidden="true"></div>
      <div className="bg-dots bg-dots-primary" aria-hidden="true"></div>
      <div className="bg-dots bg-dots-secondary" aria-hidden="true"></div>
      <div className="bg-shape bg-shape-1" aria-hidden="true"></div>
      <div className="bg-shape bg-shape-2" aria-hidden="true"></div>

      <header className="site-header" id="top">
        <nav className="container nav-wrap">
          <a href="#top" className="brand" onClick={closeMenu}>
            <span className="brand-mark" aria-hidden="true">
              <i className="bi bi-stars" aria-hidden="true"></i>
            </span>
            <span>Jericho Luna</span>
          </a>

          <button
            className="menu-toggle"
            aria-label="Open navigation menu"
            aria-expanded={navOpen}
            aria-controls="site-nav"
            onClick={() => setNavOpen((current) => !current)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <ul className={`site-nav ${navOpen ? 'open' : ''}`} id="site-nav">
            <li><a href="#about" onClick={closeMenu}>About</a></li>
            <li><a href="#services" onClick={closeMenu}>Services</a></li>
            <li><a href="#experience" onClick={closeMenu}>Experience</a></li>
            <li>
              <a
                href="https://wa.me/639811547719?text=Hi%20Jericho%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20chat."
                target="_blank"
                rel="noopener noreferrer"
                className="nav-cta"
              >
                <i className="bi bi-whatsapp" aria-hidden="true"></i>
                <span>Chat on WhatsApp</span>
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero container reveal">
          <div className="hero-content">
            <p className="kicker">Portfolio</p>
            <h1>
              <span>Automation Specialist</span>
              <span>Funnel Builder</span>
              <span>GoHighLevel Expert</span>
            </h1>
            <p className="hero-text">
              I am Jericho Luna, an Automation and AI Specialist. I specialize
              in GoHighLevel, AI integrations, web design, and graphic design.
            </p>
            <div className="hero-actions">
              <a
                id="download-cv-btn"
                href="/JERICHO-LUNA-CV.pdf"
                download="JERICHO LUNA.pdf"
                className="btn btn-primary"
              >
                Download CV
              </a>
              <a
                id="hero-view-portfolio-btn"
                href="https://drive.google.com/drive/folders/1o5VI-0_o030INNdFwi3qAi5sHlXX_ecf?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                VIEW PORTFOLIO
              </a>
            </div>
          </div>

          <aside className={`hero-profile card ${profileMissing ? 'is-missing' : ''}`} aria-label="Profile view">
            <div className="profile-avatar">
              <img
                id="profile-image"
                src={profileImage}
                alt="Portrait of Jericho Luna"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                onError={() => setProfileMissing(true)}
              />
              <span className="profile-fallback" id="profile-fallback" aria-hidden="true">
                JL
              </span>
            </div>
            <div className="profile-meta">
              <p className="profile-label">Profile</p>
              <h3>Jericho Luna</h3>
              <p>
                Automation Specialist<br />
                <strong>GoHighLevel Expert</strong>
              </p>
            </div>
          </aside>
        </section>

        <section id="about" className="section container reveal">
          <SectionHeader kicker="About Me" title="Specialist in AI, automation, and digital design" />
          <div className="about-grid">
            <article className="card about-card">
              <h3>Who I am</h3>
              <p>I am Jericho Luna, an Automation and AI Specialist.</p>
              <p>
                I specialize in GoHighLevel, AI integrations, web design, and
                graphic design. I work while studying and am known for strong
                time management and flexibility.
              </p>
            </article>
            <article className="card stats-card">
              <h3>Quick Snapshot</h3>
              <ul>
                <li><span className="transparent-label">Role</span><strong>AI Automation Specialist</strong></li>
                <li><span className="transparent-label">Role</span><strong>GoHighLevel Expert</strong></li>
                <li><span>Focus</span><strong>GoHighLevel + AI Integrations</strong></li>
                <li><span>Language</span><strong>English, Filipino</strong></li>
                <li><span>Location</span><strong>Butuan City, Philippines 8600</strong></li>
                <li><span>Strength</span><strong>Time Management + Flexibility</strong></li>
              </ul>
            </article>
          </div>
        </section>

        <section id="previous-work" className="section container reveal previous-work-section">
          <article className="card previous-work-panel">
            <SectionHeader kicker="Previous Work" title="Previous Website and Funnel Design" />

            <div className="previous-work-carousel" ref={previousWorkCarouselRef} aria-label="Previous website and funnel design carousel">
              {previousWorkSlides.length > 0 ? (
                previousWorkSlides.map((slide, index) => (
                  <PreviousWorkCard
                    key={`${slide.title}-${index}`}
                    slide={slide}
                    index={index}
                    shouldPreload={index < 2}
                  />
                ))
              ) : (
                <article className="card previous-work-card previous-work-empty">
                  <div className="previous-work-media previous-work-empty-media">
                    <div className="previous-work-placeholder">
                      <i className="bi bi-images" aria-hidden="true"></i>
                      <h3>Drop your PNG files here</h3>
                      <p>Place previous website and funnel design images in assets/previous-work.</p>
                    </div>
                  </div>
                </article>
              )}
            </div>
          </article>
        </section>

        <section id="services" className="section container reveal">
          <SectionHeader kicker="Abilities and Job Roles" title="Skills that support automation, design, and delivery" />
          <div className="services-grid">
            {services.map((service) => (
              <article className="card service-card" key={service.title}>
                <span className="card-icon" aria-hidden="true">
                  <i className={`bi ${service.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="tools" className="section container reveal">
          <SectionHeader kicker="Softwares and Tools" title="Platforms and technologies I use" />
          <div className="tools-grid">
            {toolGroups.map((group) => (
              <article className="card tool-card" key={group.title}>
                <h3><i className={`bi ${group.icon}`}></i> {group.title}</h3>
                <div className="tool-tags">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section container reveal">
          <SectionHeader kicker="Work Field Experience" title="Automation, AI, and business workflow support" />
          <div className="timeline">
            <article className="card timeline-item">
              <p className="timeline-year">Current Role</p>
              <h3>Automation &amp; AI Integration Specialist</h3>
              <p><strong>GoHighLevel Expert</strong></p>
              <p>
                Build and manage automation systems and AI integrations to
                streamline business operations.
              </p>
              <p>
                Develop GoHighLevel CRM setups, including sales funnels,
                email/SMS automation, and lead nurturing workflows.
              </p>
            </article>
            <article className="card timeline-item">
              <p className="timeline-year">Core Responsibilities</p>
              <h3>Systems, Websites, and Marketing Assets</h3>
              <p>
                Integrate third-party tools using APIs, webhooks, and automation
                platforms.
              </p>
              <p>
                Design and build responsive websites and landing pages for
                businesses, plus create graphics and marketing assets for
                branding, ads, and social media.
              </p>
            </article>
          </div>
        </section>

        <section id="education" className="section container reveal">
          <SectionHeader kicker="Education" title="Academic background" />
          <div className="timeline">
            <article className="card timeline-item">
              <p className="timeline-year">2022 - 2026</p>
              <h3>Bachelor's Degree in Information System</h3>
              <p>Caraga State University</p>
            </article>
            <article className="card timeline-item">
              <p className="timeline-year">2021 - 2022</p>
              <h3>Senior High School</h3>
              <p>Agusan National High School</p>
              <p>Science, Technology, Engineering, and Mathematics</p>
            </article>
          </div>
        </section>

        <section id="projects" className="section container reveal">
          <SectionHeader kicker="Projects" title="Selected work" />
          <div className="projects-grid" ref={scrollerRef}>
            {projects.map((project) => {
              const isOpen = Boolean(openProjects[project.id]);

              return (
                <article className="card project-card" key={project.id}>
                  <p className="project-tag">{project.tag}</p>
                  <h3>{project.title}</h3>
                  <p className="project-excerpt">{project.excerpt}</p>
                  <button
                    className="project-toggle"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleProject(project.id)}
                  >
                    View Details
                  </button>
                  <div className="project-details" hidden={!isOpen}>
                    <p className="project-date">{project.date}</p>
                    <p>{project.details}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section container reveal contact-section">
          <p className="kicker">Contact</p>
          <h2>Ready to build something exceptional?</h2>
          <div className="contact-line" aria-label="Contact information">
            <div className="contact-item contact-location-item">
              <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
              <span className="contact-text">Butuan City, Philippines 8600</span>
            </div>

            <div className="contact-item contact-phone-item">
              <a href="tel:+639811547719" className="contact-link">
                <i className="bi bi-telephone-fill" aria-hidden="true"></i>
                <span className="contact-text">+639811547719</span>
              </a>
            </div>

            <div className="contact-item contact-email-item">
              <a href="mailto:jericho.luna29@gmail.com" className="contact-link">
                <i className="bi bi-envelope-fill" aria-hidden="true"></i>
                <span className="contact-text">jericho.luna29@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="contact-actions">
            <a
              id="view-portfolio-btn"
              href="https://drive.google.com/drive/folders/1o5VI-0_o030INNdFwi3qAi5sHlXX_ecf?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              title="Open shared Google Drive folder (opens in new tab)"
            >
              <span>View Portfolio</span>
            </a>
            <a
              id="send-message-btn"
              href="https://wa.me/639811547719?text=Hello%20Jericho%2C%20I%20would%20like%20to%20get%20in%20touch."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <i className="bi bi-whatsapp" aria-hidden="true"></i>
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-wrap">
          <p>© {currentYear} Jericho Luna. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
