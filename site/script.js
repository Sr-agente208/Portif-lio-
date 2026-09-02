/* =========================================================
   NICOLLAS — PORTFÓLIO EM SESSÕES
   1. Menu mobile          2. Cursor glow      3. Ano automático
   4. Reveal por rolagem   5. Sessão ativa (nav + trilho lateral)
   6. Barra de progresso   7. Navegação por teclado
   8. Tilt do cartão de perfil
   ========================================================= */

const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ---------- 1. Menu mobile ---------- */
const toggle = $('.nav-toggle');
const menu = $('.nav-links');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '×' : '☰';
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

/* ---------- 2. Cursor glow ---------- */
const glow = $('.cursor-glow');

if (glow && finePointer && !reduceMotion) {
  window.addEventListener('pointermove', (event) => {
    glow.style.left = `${event.clientX}px`;
    glow.style.top = `${event.clientY}px`;
  }, { passive: true });
} else if (glow) {
  glow.style.display = 'none';
}

/* ---------- 3. Ano automático ---------- */
const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

/* ---------- 4. Reveal por rolagem ---------- */
const revealItems = $$('.reveal');
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((item) => revealObserver.observe(item));

/* ---------- 5. Sessão ativa (nav + trilho lateral) ---------- */
const slides = $$('.slide');
const navLinks = $$('[data-nav]');
const railLinks = $$('[data-rail]');

function setActive(id) {
  navLinks.forEach((link) => {
    const active = link.dataset.nav === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  railLinks.forEach((link) => {
    const active = link.dataset.rail === id;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) setActive(entry.target.id);
  });
}, { rootMargin: '-45% 0px -45% 0px' });
slides.forEach((slide) => activeObserver.observe(slide));
setActive('inicio');

/* ---------- 6. Barra de progresso ---------- */
const bar = $('.progress-bar');
let progressPending = false;

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (bar) bar.style.width = `${percent}%`;
  progressPending = false;
}

window.addEventListener('scroll', () => {
  if (!progressPending) {
    requestAnimationFrame(updateProgress);
    progressPending = true;
  }
}, { passive: true });
updateProgress();

/* ---------- 7. Navegação por teclado entre sessões ---------- */
function currentSlideIndex() {
  let bestIndex = 0;
  let bestDistance = Infinity;
  slides.forEach((slide, index) => {
    const distance = Math.abs(slide.getBoundingClientRect().top);
    if (distance < bestDistance) { bestDistance = distance; bestIndex = index; }
  });
  return bestIndex;
}

window.addEventListener('keydown', (event) => {
  if (event.metaKey || event.ctrlKey || event.altKey) return;

  const index = currentSlideIndex();
  let target = null;

  if (event.key === 'ArrowDown' || event.key === 'PageDown') {
    target = Math.min(index + 1, slides.length - 1);
  } else if (event.key === 'ArrowUp' || event.key === 'PageUp') {
    target = Math.max(index - 1, 0);
  } else if (event.key === 'Home') {
    target = 0;
  } else if (event.key === 'End') {
    target = slides.length - 1;
  }

  if (target !== null && target !== index) {
    event.preventDefault();
    slides[target].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  }
});

/* ---------- 8. Tilt do cartão de perfil ---------- */
const card = $('.profile-card');
if (card && finePointer && !reduceMotion) {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${y * -7}deg)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
}
