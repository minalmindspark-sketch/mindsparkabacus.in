/* ====== NAV SCROLL ====== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('up', window.scrollY > 20);
}, { passive: true });

/* ====== MOBILE MENU ====== */
const hbg     = document.getElementById('hbg');
const mobMenu = document.getElementById('mob-menu');
const overlay = document.getElementById('mob-overlay');
const mobClose= document.getElementById('mob-close');

function openMenu() {
  mobMenu.classList.add('open');
  overlay.classList.add('show');
  hbg.classList.add('open');
  hbg.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  mobMenu.classList.remove('open');
  overlay.classList.remove('show');
  hbg.classList.remove('open');
  hbg.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hbg.addEventListener('click', () => mobMenu.classList.contains('open') ? closeMenu() : openMenu());
mobClose.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
document.querySelectorAll('.mob-nav a').forEach(a => a.addEventListener('click', closeMenu));

/* ====== FAQ ACCORDION ====== */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* ====== FORMSPREE AJAX ====== */
const form    = document.getElementById('contact-form');
const formOk  = document.getElementById('form-ok');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;
  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      form.reset();
      formOk.classList.add('show');
      submitBtn.textContent = '✓ Sent!';
    } else {
      submitBtn.textContent = 'Error – Try Again';
      submitBtn.disabled = false;
    }
  } catch {
    submitBtn.textContent = 'Error – Try Again';
    submitBtn.disabled = false;
  }
});

/* ====== SCROLL REVEAL ====== */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.ben-card, .class-card, .testi-card, .strip-card, .faq-item, .mstat, .ci, .insta-pic'
).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});
