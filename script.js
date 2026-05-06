const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');
const yearEl = document.getElementById('year');
const profileImage = document.getElementById('profile-image');
const customCursor = document.getElementById('custom-cursor');
const customCursorRing = document.getElementById('custom-cursor-ring');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (profileImage) {
  profileImage.addEventListener('error', () => {
    profileImage.closest('.hero-profile')?.classList.add('is-missing');
  });
}

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14,
  }
);

reveals.forEach((item) => observer.observe(item));

// Advanced custom cursor
const finePointer = window.matchMedia('(pointer: fine)').matches;

if (finePointer && customCursor && customCursorRing) {
  let cursorX = window.innerWidth / 2;
  let cursorY = window.innerHeight / 2;
  let ringX = cursorX;
  let ringY = cursorY;
  let cursorFramePending = false;

  const moveCursor = () => {
    customCursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    customCursorRing.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
    cursorFramePending = false;
  };

  const scheduleCursorMove = () => {
    if (!cursorFramePending) {
      cursorFramePending = true;
      window.requestAnimationFrame(moveCursor);
    }
  };

  window.addEventListener('pointermove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
    ringX += (cursorX - ringX) * 0.18;
    ringY += (cursorY - ringY) * 0.18;
    customCursor.classList.add('is-visible');
    customCursorRing.classList.add('is-visible');
    scheduleCursorMove();
  }, { passive: true });

  window.addEventListener('pointerdown', () => {
    customCursorRing.classList.add('is-hovering');
  });

  window.addEventListener('pointerup', () => {
    customCursorRing.classList.remove('is-hovering');
  });

  document.querySelectorAll('a, button, .btn, .card, .tool-tags span').forEach((element) => {
    element.addEventListener('pointerenter', () => {
      customCursor.classList.add('is-hovering');
      customCursorRing.classList.add('is-hovering');
    });
    element.addEventListener('pointerleave', () => {
      customCursor.classList.remove('is-hovering');
      customCursorRing.classList.remove('is-hovering');
    });
  });

  document.addEventListener('mouseleave', () => {
    customCursor.classList.remove('is-visible');
    customCursorRing.classList.remove('is-visible');
  });

  document.addEventListener('mouseenter', () => {
    customCursor.classList.add('is-visible');
    customCursorRing.classList.add('is-visible');
  });
}

// Scroll progress indicator
const progressBar = document.getElementById('scroll-progress-bar');
let progressTicking = false;

function updateScrollProgress() {
  if (!progressBar) return;
  const doc = document.documentElement;
  const scrollTop = window.scrollY || window.pageYOffset || doc.scrollTop;
  const scrollHeight = doc.scrollHeight - doc.clientHeight;
  const pct = scrollHeight > 0 ? Math.min(1, Math.max(0, scrollTop / scrollHeight)) : 0;
  progressBar.style.transform = `scaleX(${pct})`;
  progressTicking = false;
}

function requestProgressUpdate() {
  if (!progressTicking) {
    progressTicking = true;
    window.requestAnimationFrame(updateScrollProgress);
  }
}

window.addEventListener('scroll', requestProgressUpdate, { passive: true });
window.addEventListener('resize', requestProgressUpdate);
document.addEventListener('readystatechange', () => {
  if (document.readyState === 'complete') requestProgressUpdate();
});
// initialize
requestProgressUpdate();



// Projects: View Details dropdown toggles
document.addEventListener('click', (event) => {
  const toggle = event.target.closest('.project-toggle');
  if (!toggle) return;
  const card = toggle.closest('.project-card');
  if (!card) return;
  const details = card.querySelector('.project-details');
  if (!details) return;

  const isHidden = details.hasAttribute('hidden');
  if (isHidden) {
    details.removeAttribute('hidden');
    toggle.setAttribute('aria-expanded', 'true');
  } else {
    details.setAttribute('hidden', '');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Drag / swipe horizontal carousel for project cards
(() => {
  const scroller = document.querySelector('.projects-grid');
  if (!scroller) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let dragged = false;
  const dragThreshold = 6; // pixels before we consider it a drag

  // Use capture so we get pointerdown before children handle it
  scroller.addEventListener('pointerdown', (e) => {
    // only start drag for primary (left) button
    if (e.button !== 0) return;
    // don't start drag when starting on interactive controls
    if (e.target.closest('button, a, .project-toggle')) return;

    isDown = true;
    dragged = false;
    scroller.classList.add('is-dragging');
    // prevent text selection while dragging
    scroller.style.userSelect = 'none';
    startX = e.clientX;
    scrollLeft = scroller.scrollLeft;
    try {
      // Prefer capturing on the actual event target if possible
      (e.target).setPointerCapture?.(e.pointerId);
    } catch (err) {
      try { scroller.setPointerCapture?.(e.pointerId); } catch (err2) { /* ignore */ }
    }
    e.preventDefault();
  }, { capture: true, passive: false });

  scroller.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    const x = e.clientX;
    const walk = (startX - x); // positive -> scroll right
    if (Math.abs(walk) > dragThreshold) dragged = true;
    scroller.scrollLeft = scrollLeft + walk;
  });

  const endDrag = (e) => {
    if (!isDown) return;
    isDown = false;
    scroller.classList.remove('is-dragging');
    scroller.style.userSelect = '';
    try { (e.target).releasePointerCapture?.(e.pointerId); } catch (err) { try { scroller.releasePointerCapture?.(e.pointerId); } catch (err2) { /* ignore */ } }
    // small timeout to reset dragged flag after click suppression
    setTimeout(() => { dragged = false; }, 0);
  };

  scroller.addEventListener('pointerup', endDrag);
  scroller.addEventListener('pointercancel', endDrag);
  scroller.addEventListener('pointerleave', endDrag);

  // Prevent clicks when dragging
  scroller.addEventListener('click', (e) => {
    if (dragged) {
      e.stopPropagation();
      e.preventDefault();
    }
  }, true);
})();



