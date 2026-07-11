/* ==========================================================================
   Harsh Raj — Portfolio Script
   Vanilla JS only. Organized by feature.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initCustomCursor();
  initParticles();
  initTypingEffect();
  initRevealOnScroll();
  initCounters();
  initSkillBars();
  initProjects();
  initTestimonialAutoScroll();
  initRipple();
  initContactForm();
  initScrollTop();
  initMouseParallax();
  document.getElementById('year').textContent = new Date().getFullYear();
});

/* ---------- Loading screen ---------- */
function initLoader(){
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 500);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader.classList.add('hidden'), 2500);
}

/* ---------- Theme toggle (dark / light) ---------- */
function initThemeToggle(){
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  const saved = safeGet('hr-theme');

  if (saved === 'light') root.setAttribute('data-theme', 'light');

  toggle.addEventListener('click', () => {
    const isLight = root.getAttribute('data-theme') === 'light';
    if (isLight){
      root.removeAttribute('data-theme');
      safeSet('hr-theme', 'dark');
    } else {
      root.setAttribute('data-theme', 'light');
      safeSet('hr-theme', 'light');
    }
  });
}
function safeGet(key){ try { return localStorage.getItem(key); } catch(e){ return null; } }
function safeSet(key, val){ try { localStorage.setItem(key, val); } catch(e){ /* ignore */ } }

/* ---------- Sticky navbar + active link ---------- */
function initNavbar(){
  const navbar = document.getElementById('navbar');
  const links = document.querySelectorAll('.nav-link');
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute('href')));

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    let currentIndex = 0;
    sections.forEach((sec, i) => {
      if (sec && window.scrollY >= sec.offsetTop - 140) currentIndex = i;
    });
    links.forEach((l, i) => l.classList.toggle('active', i === currentIndex));
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- Mobile menu ---------- */
function initMobileMenu(){
  const burger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');

  burger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---------- Scroll progress bar ---------- */
function initScrollProgress(){
  const bar = document.getElementById('scrollProgress');
  const update = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  };
  document.addEventListener('scroll', update, { passive: true });
  update();
}

/* ---------- Custom cursor ---------- */
function initCustomCursor(){
  if (window.matchMedia('(hover: none)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let ringX = 0, ringY = 0;

  document.addEventListener('mousemove', (e) => {
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
    ringX = e.clientX; ringY = e.clientY;
  });

  const animateRing = () => {
    const currentLeft = parseFloat(ring.style.left || ringX);
    const currentTop = parseFloat(ring.style.top || ringY);
    const nextLeft = currentLeft + (ringX - currentLeft) * 0.18;
    const nextTop = currentTop + (ringY - currentTop) * 0.18;
    ring.style.left = nextLeft + 'px';
    ring.style.top = nextTop + 'px';
    requestAnimationFrame(animateRing);
  };
  requestAnimationFrame(animateRing);

  document.querySelectorAll('a, button, input, textarea').forEach(el => {
    el.addEventListener('mouseenter', () => ring.style.transform = 'translate(-50%,-50%) scale(1.6)');
    el.addEventListener('mouseleave', () => ring.style.transform = 'translate(-50%,-50%) scale(1)');
  });
}

/* ---------- Background particles (canvas) ---------- */
function initParticles(){
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize(){
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  function createParticles(){
    const count = Math.min(60, Math.floor(canvas.width / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.6,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }
  function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha})`;
      ctx.fill();
    });
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  resize(); createParticles(); draw();
  window.addEventListener('resize', () => { resize(); createParticles(); });
}

/* ---------- Hero typing animation ---------- */
function initTypingEffect(){
  const target = document.getElementById('typeTarget');
  if (!target) return;
  const words = ['clean code.', 'beautiful design.', 'real impact.', 'great UX.'];
  let wordIndex = 0, charIndex = 0, deleting = false;

  function tick(){
    const word = words[wordIndex];
    if (!deleting){
      charIndex++;
      target.textContent = word.slice(0, charIndex);
      if (charIndex === word.length){
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      target.textContent = word.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 85);
  }
  tick();
}

/* ---------- Reveal on scroll (IntersectionObserver) ---------- */
function initRevealOnScroll(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach(item => io.observe(item));
}

/* ---------- Animated counters ---------- */
function initCounters(){
  const counters = document.querySelectorAll('[data-count]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();

      function update(now){
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => io.observe(c));
}

/* ---------- Skill progress bars ---------- */
function initSkillBars(){
  const bars = document.querySelectorAll('.bar-fill');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.style.width = entry.target.dataset.fill + '%';
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  bars.forEach(b => io.observe(b));
}

/* ---------- Featured projects (generated placeholder data) ---------- */
function initProjects(){
  const grid = document.getElementById('projectsGrid');
  if (!grid) return;

  const projects = [
    {
      name: 'ShopEase — E-commerce UI',
      desc: 'A responsive storefront concept with product filtering, cart drawer, and smooth checkout flow.',
      tech: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
      name: 'TaskFlow — Task Manager',
      desc: 'A full-stack task manager with authentication, drag-and-drop boards, and a MySQL backend.',
      tech: ['Node.js', 'Express', 'MySQL']
    },
    {
      name: 'WeatherNow — Weather App',
      desc: 'A clean weather dashboard consuming a public API, with animated icons and geolocation support.',
      tech: ['JavaScript', 'REST API', 'CSS3']
    },
    {
      name: 'DevBlog — Personal Blog',
      desc: 'A minimal blogging platform with a Markdown editor, tags, and a searchable article archive.',
      tech: ['Node.js', 'Express', 'MySQL']
    },
    {
      name: 'FitTrack — Habit Tracker',
      desc: 'A habit and workout tracker with animated progress rings and local data persistence.',
      tech: ['HTML5', 'CSS3', 'JavaScript']
    },
    {
      name: 'PortfolioX — Agency Landing',
      desc: 'A high-conversion landing page template with scroll animations and a glassmorphism aesthetic.',
      tech: ['HTML5', 'CSS3', 'JavaScript']
    }
  ];

  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card reveal">
      <div class="project-thumb">
        <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4">
          <rect x="3" y="4" width="18" height="14" rx="2"/><path d="M3 9h18M8 4v14"/>
        </svg>
      </div>
      <div class="project-body">
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
        <div class="project-links">
          <a href="#" aria-label="View source on GitHub">GitHub</a>
          <a href="#" aria-label="View live demo">Live Demo</a>
        </div>
      </div>
    </div>
  `).join('');

  // re-observe newly injected reveal items
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  grid.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ---------- Testimonials auto-scroll ---------- */
function initTestimonialAutoScroll(){
  const track = document.getElementById('testimonialTrack');
  if (!track) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  let paused = false;
  track.addEventListener('mouseenter', () => paused = true);
  track.addEventListener('mouseleave', () => paused = false);

  let pos = 0;
  function step(){
    if (!paused){
      pos += 0.4;
      const max = track.scrollWidth - track.parentElement.clientWidth;
      if (pos >= max) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
    }
    requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ---------- Button ripple effect ---------- */
function initRipple(){
  document.querySelectorAll('.btn-ripple').forEach(btn => {
    btn.addEventListener('click', function(e){
      const rect = this.getBoundingClientRect();
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

/* ---------- Contact form validation ---------- */
function initContactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const fields = [
      { id: 'fname', check: v => v.trim().length > 1, msg: 'Please enter your name.' },
      { id: 'femail', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), msg: 'Please enter a valid email.' },
      { id: 'fsubject', check: v => v.trim().length > 2, msg: 'Please add a subject.' },
      { id: 'fmessage', check: v => v.trim().length > 9, msg: 'Message should be at least 10 characters.' }
    ];

    fields.forEach(f => {
      const input = document.getElementById(f.id);
      const wrapper = input.closest('.form-field');
      const errorEl = form.querySelector(`[data-error-for="${f.id}"]`);
      const ok = f.check(input.value);
      wrapper.classList.toggle('invalid', !ok);
      errorEl.textContent = ok ? '' : f.msg;
      if (!ok) valid = false;
    });

    if (!valid){
      status.textContent = 'Please fix the highlighted fields.';
      status.style.color = '#f87171';
      return;
    }

    status.style.color = '';
    status.textContent = 'Sending...';
    setTimeout(() => {
      status.textContent = `Thanks, ${document.getElementById('fname').value.split(' ')[0]}! Your message has been noted — I'll get back to you soon.`;
      form.reset();
    }, 900);
  });
}

/* ---------- Scroll to top ---------- */
function initScrollTop(){
  const btn = document.getElementById('scrollTop');
  document.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ---------- Mouse parallax on hero visual ---------- */
function initMouseParallax(){
  const visual = document.getElementById('heroVisual');
  const frame = document.getElementById('stackFrame');
  if (!visual || !frame) return;
  if (window.matchMedia('(hover: none)').matches) return;

  visual.addEventListener('mousemove', (e) => {
    const rect = visual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    frame.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  visual.addEventListener('mouseleave', () => {
    frame.style.transform = 'rotateY(0) rotateX(0)';
  });
}