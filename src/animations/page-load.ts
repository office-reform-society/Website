import gsap from 'gsap';
import { initDrawIn } from '../reformer/reformer-animator';
import { prefersReducedMotion } from '../utils/reduced-motion';

export function initPageLoad(): void {
  if (prefersReducedMotion()) {
    gsap.set('.hero__content', { opacity: 1 });
    gsap.set('.hero__title-reform, .hero__title-society, .hero__tagline', { opacity: 1, y: 0 });
    gsap.set('.hero__scroll-indicator', { opacity: 1 });
    const drawIn = initDrawIn();
    drawIn.play();
    return;
  }

  // Hide elements initially
  gsap.set('.hero__content', { opacity: 1 });
  gsap.set('.hero__title-reform', { opacity: 0, y: 30 });
  gsap.set('.hero__title-society', { opacity: 0, y: 20 });
  gsap.set('.hero__tagline', { opacity: 0, y: 15 });
  gsap.set('.hero__scroll-indicator', { opacity: 0 });
  gsap.set('.nav', { opacity: 0, y: -20 });

  const tl = gsap.timeline();

  // Nav slides in
  tl.to('.nav', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, 0);

  // Title reveals
  tl.to('.hero__title-reform', {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: 'power2.out',
  }, 0.3);

  tl.to('.hero__title-society', {
    opacity: 1,
    y: 0,
    duration: 0.8,
    ease: 'power2.out',
  }, 0.6);

  tl.to('.hero__tagline', {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out',
  }, 0.8);

  // Reformer draw-in starts
  const drawIn = initDrawIn();
  tl.add(() => drawIn.play(), 0.5);

  // Scroll indicator appears last
  tl.to('.hero__scroll-indicator', {
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  }, 2.5);
}
