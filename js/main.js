const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    navLinks.classList.toggle('open');
  });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const statElements = document.querySelectorAll('[data-count]');
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }
      const el = entry.target;
      const target = Number(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      let value = 0;
      const step = Math.max(1, Math.floor(target / 45));

      const timer = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(timer);
        }
        el.textContent = `${value}${suffix}`;
      }, 24);

      statObserver.unobserve(el);
    });
  },
  { threshold: 0.3 }
);

statElements.forEach((el) => statObserver.observe(el));

const parallaxNodes = document.querySelectorAll('[data-parallax]');
if (parallaxNodes.length > 0) {
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 16;
    const y = (event.clientY / window.innerHeight - 0.5) * 16;
    parallaxNodes.forEach((node) => {
      const factor = Number(node.getAttribute('data-parallax')) || 1;
      node.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
    });
  });
}

const yearEl = document.querySelector('[data-year]');
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}
