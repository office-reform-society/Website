import { $ } from '../utils/dom';

export function initNavScroll(): void {
  const nav = $('.nav');
  if (!nav) return;

  const threshold = 50;

  const handleScroll = (): void => {
    const scrolled = window.scrollY > threshold;
    nav.classList.toggle('nav--scrolled', scrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Check initial state
}

export function initMobileMenu(): void {
  const hamburger = $('.nav__hamburger');
  const mobileMenu = $('.nav__mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('nav__hamburger--open');
    mobileMenu.classList.toggle('nav__mobile-menu--open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  mobileMenu.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('nav__hamburger--open');
      mobileMenu.classList.remove('nav__mobile-menu--open');
      document.body.style.overflow = '';
    });
  });
}
