import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CARRIAGE_MAX } from './reformer.svg';
import { updateSprings } from './reformer-springs';
import { prefersReducedMotion } from '../utils/reduced-motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * Auto-animates the reformer carriage based on scroll position.
 * Only active when user hasn't interacted via drag.
 */
export function initScrollAnimation(): void {
  if (prefersReducedMotion()) return;

  const carriageProxy = { x: 0 };

  gsap.to(carriageProxy, {
    x: CARRIAGE_MAX * 0.6,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1.5,
      onUpdate: () => {
        // Only animate if user hasn't started dragging
        const carriage = document.getElementById('carriage');
        if (!carriage) return;
        // Check if currently being dragged (cursor is grabbing)
        if (carriage.style.cursor === 'grabbing') return;

        gsap.set('#carriage', { x: carriageProxy.x });
        updateSprings(carriageProxy.x);
      },
    },
  });
}
