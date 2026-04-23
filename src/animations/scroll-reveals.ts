import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../utils/reduced-motion';

gsap.registerPlugin(ScrollTrigger);

export function initScrollReveals(): void {
  if (prefersReducedMotion()) {
    // Make everything visible
    gsap.set('.reveal, .reveal-scale, .clip-reveal', {
      opacity: 1,
      y: 0,
      scale: 1,
      clipPath: 'none',
    });
    gsap.set('.reveal-line, .gold-line', { scaleX: 1 });
    return;
  }

  // Standard reveal (fade up)
  gsap.utils.toArray<HTMLElement>('.reveal').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Scale reveal (cards)
  gsap.utils.toArray<HTMLElement>('.reveal-scale').forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Gold line reveals
  gsap.utils.toArray<HTMLElement>('.gold-line').forEach((el) => {
    gsap.fromTo(el,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          once: true,
        },
      }
    );
  });

  // Section headings — clip-path reveal
  gsap.utils.toArray<HTMLElement>('.clip-reveal').forEach((el) => {
    gsap.fromTo(el,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 0.8,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });

  // Stagger children
  gsap.utils.toArray<HTMLElement>('.stagger-children').forEach((parent) => {
    const children = parent.children;
    gsap.fromTo(children,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          once: true,
        },
      }
    );
  });
}
