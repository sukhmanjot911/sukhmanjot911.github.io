/* ============================================================
   SUKHMANJOT SINGH — PORTFOLIO
   script.js | All interactions, animations, and features
   ============================================================ */

/* ── Loader ── */
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.style.opacity = '0';
      loader.style.transition = 'opacity 0.5s ease';
      setTimeout(() => loader.remove(), 500);
    }
  }, 1800);
});

/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
if (cursor && cursorTrail) {
  let cx = 0, cy = 0, tx = 0, ty = 0;
  document.addEventListener('mousemove', e => {
    tx = e.clientX; ty = e.clientY;
    cursor.style.left = tx + 'px';
    cursor.style.top = ty + 'px';
  });
  function animTrail() {
    cx += (tx - cx) * 0.15;
    cy += (ty - cy) * 0.15;
    cursorTrail.style.left = cx + 'px';
    cursorTrail.style.top = cy + 'px';
    requestAnimationFrame(animTrail);
  }
  animTrail();
  document.querySelectorAll('a, button, .work-card, .portfolio-item, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '6px'; cursor.style.height = '6px';
      cursorTrail.style.width = '60px'; cursorTrail.style.height = '60px';
      cursorTrail.style.borderColor = 'rgba(230,57,70,0.7)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '12px'; cursor.style.height = '12px';
      cursorTrail.style.width = '36px'; cursorTrail.style.height = '36px';
      cursorTrail.style.borderColor = 'rgba(230,57,70,0.5)';
    });
  });
}

/* ── Scroll Progress ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  if (progressBar) {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = pct + '%';
  }
});

/* ── Navbar scroll effect ── */
const nav = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Scroll to Top ── */
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  if (!scrollTopBtn) return;
  scrollTopBtn.classList.toggle('show', window.scrollY > 400);
});
if (scrollTopBtn) scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* ── Active Nav Link ── */
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}
setActiveNav();

/* ── Typing Animation ── */
function initTyping() {
  const el = document.getElementById('typing-text');
  if (!el) return;
  const phrases = [
    'Graphics Designer',
    'Motion Graphics Artist',
    '2D Animator',
    'Video Editor',
    'VFX Artist'
  ];
  let pIdx = 0, cIdx = 0, deleting = false;
  function tick() {
    const phrase = phrases[pIdx];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++cIdx);
      if (cIdx === phrase.length) { deleting = true; setTimeout(tick, 2000); return; }
    } else {
      el.textContent = phrase.slice(0, --cIdx);
      if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    }
    setTimeout(tick, deleting ? 60 : 100);
  }
  tick();
}
initTyping();

/* ── Particles Background ── */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.3,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1
  }));
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(230,57,70,${p.alpha})`;
      ctx.fill();
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
initParticles();

/* ── Counter Animation ── */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.count));
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => obs.observe(c));
}
initCounters();

/* ── Skill Bar Animation ── */
function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width;
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
}
initSkillBars();

/* ── AOS Init ── */
if (typeof AOS !== 'undefined') {
  AOS.init({ duration: 800, easing: 'ease-out-cubic', once: true, offset: 60 });
}

/* ── Swiper Init (Homepage Showcase) ── */
function initShowcaseSwiper() {
  if (typeof Swiper === 'undefined') return;
  if (document.querySelector('.showcase-swiper')) {
    new Swiper('.showcase-swiper', {
      loop: true, speed: 900, autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      effect: 'fade', fadeEffect: { crossFade: true }
    });
  }
}
initShowcaseSwiper();

/* ── Swiper Init (Testimonials) ── */
function initTestimonialSwiper() {
  if (typeof Swiper === 'undefined') return;
  if (document.querySelector('.testimonial-swiper')) {
    new Swiper('.testimonial-swiper', {
      loop: true, speed: 700, autoplay: { delay: 5000, disableOnInteraction: false },
      pagination: { el: '.swiper-pagination', clickable: true },
      slidesPerView: 1, spaceBetween: 24,
      breakpoints: { 768: { slidesPerView: 2 } }
    });
  }
}
initTestimonialSwiper();

/* ── Portfolio Filter ── */
function initPortfolioFilter() {
  const btns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.portfolio-item');
  if (!btns.length || !items.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item => {
        if (cat === 'all' || item.dataset.cat === cat) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
initPortfolioFilter();

/* ── Lightbox ── */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  if (!lightbox || !lbImg) return;
  document.querySelectorAll('[data-lightbox]').forEach(item => {
    item.addEventListener('click', () => {
      lbImg.src = item.querySelector('img')?.src || item.dataset.lightbox;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox() { lightbox.classList.remove('active'); document.body.style.overflow = ''; }
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}
initLightbox();

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const popup = document.getElementById('successPopup');
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    // Simulate send
    const btn = form.querySelector('[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.disabled = false;
      form.reset();
      if (popup) popup.classList.add('active');
    }, 1500);
  });
  const closePopup = document.getElementById('closePopup');
  if (closePopup && popup) closePopup.addEventListener('click', () => popup.classList.remove('active'));
}
initContactForm();

/* ── Smooth page transitions ── */
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;
  link.addEventListener('click', e => {
    e.preventDefault();
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => { window.location.href = href; }, 300);
  });
});
window.addEventListener('pageshow', () => {
  document.body.style.opacity = '1';
  document.body.style.transition = 'opacity 0.4s ease';
});

/* ── Video play overlay ── */
document.querySelectorAll('.video-play-overlay').forEach(overlay => {
  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    const video = overlay.parentElement.querySelector('video, iframe');
    if (video && video.tagName === 'VIDEO') video.play();
  });
});

/* ── fadeIn keyframe injection ── */
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }`;
document.head.appendChild(style);
