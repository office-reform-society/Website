import './style.css';
import { REFORMER_SVG } from './reformer/reformer.svg';
import { initDrag } from './reformer/reformer-drag';
import { initScrollAnimation } from './reformer/reformer-scroll';
import { initPageLoad } from './animations/page-load';
import { initScrollReveals } from './animations/scroll-reveals';
import { initNavScroll, initMobileMenu } from './animations/nav-scroll';
import { initI18n } from './i18n/i18n';

function initThemeToggle(): void {
  const STORAGE_KEY = 'rs-theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'dark'); // default dark

  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);

  document.querySelectorAll('.nav__theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      document.body.classList.add('theme-transitioning');
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(STORAGE_KEY, next);
      updateThemeIcon(next);
      setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
    });
  });
}

function updateThemeIcon(theme: string): void {
  document.querySelectorAll('.nav__theme-toggle').forEach((btn) => {
    const sunIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
    const moonIcon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    btn.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
  });
}

function initReformer(): void {
  const wrapper = document.querySelector('.hero__reformer-wrapper');
  if (!wrapper) return;
  wrapper.innerHTML = REFORMER_SVG;
  initDrag();
  initScrollAnimation();
}

function initSmoothScroll(): void {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = (link as HTMLAnchorElement).getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Initialize everything once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initI18n();
  initReformer();
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initPageLoad();
  initScrollReveals();
});
