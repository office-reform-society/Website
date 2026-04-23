import gsap from 'gsap';
import { prefersReducedMotion } from '../utils/reduced-motion';

/**
 * Draw-in animation: the reformer SVG draws itself on page load
 * using stroke-dashoffset technique.
 */
export function initDrawIn(): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true });

  if (prefersReducedMotion()) {
    // Just make everything visible instantly
    gsap.set('#reformer-svg path, #reformer-svg line, #reformer-svg rect, #reformer-svg circle, #reformer-svg ellipse', {
      opacity: 1,
      strokeDashoffset: 0,
    });
    return tl;
  }

  // Get all stroke-based elements
  const strokeElements = document.querySelectorAll<SVGGeometryElement>(
    '#rails line, #frame-left rect, #frame-left line, #frame-right rect, #footbar line, #footbar rect'
  );

  const springElements = document.querySelectorAll<SVGPathElement>('#springs-group path');
  const strapElements = document.querySelectorAll<SVGPathElement>('#straps-group path');
  const strapDetails = document.querySelectorAll<SVGEllipseElement>('#straps-group ellipse');
  const carriageElements = document.querySelectorAll<SVGElement>(
    '#carriage rect, #carriage line, #carriage circle'
  );
  const headrestElements = document.querySelectorAll<SVGElement>('#headrest rect, #headrest line');
  const dragArrows = document.querySelector('#drag-arrows');

  // Set initial state: all strokes hidden
  const allDrawable = [...strokeElements, ...springElements, ...strapElements];
  allDrawable.forEach((el) => {
    const length = el.getTotalLength ? el.getTotalLength() : 300;
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });
  });

  gsap.set([...carriageElements, ...headrestElements, ...strapDetails], { opacity: 0 });
  if (dragArrows) gsap.set(dragArrows, { opacity: 0 });

  // Build timeline
  tl.to(strokeElements, {
    strokeDashoffset: 0,
    duration: 1,
    stagger: 0.05,
    ease: 'power2.out',
  }, 0);

  tl.to(springElements, {
    strokeDashoffset: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power2.out',
  }, 0.6);

  tl.to(strapElements, {
    strokeDashoffset: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  }, 0.8);

  tl.to(strapDetails, {
    opacity: 1,
    duration: 0.3,
    stagger: 0.05,
  }, 1.2);

  tl.to(carriageElements, {
    opacity: 1,
    duration: 0.5,
    stagger: 0.03,
    ease: 'power2.out',
  }, 0.3);

  tl.to(headrestElements, {
    opacity: 1,
    duration: 0.4,
    stagger: 0.05,
  }, 0.5);

  // Drag arrows fade in last with a hint pulse
  if (dragArrows) {
    tl.to(dragArrows, {
      opacity: 0.5,
      duration: 0.6,
      ease: 'power2.out',
    }, 1.5);
  }

  // After draw-in, do a subtle carriage slide to hint at interactivity
  tl.to('#carriage', {
    x: 40,
    duration: 0.6,
    ease: 'power2.out',
  }, 2);

  tl.to('#carriage', {
    x: 0,
    duration: 0.8,
    ease: 'elastic.out(1, 0.5)',
  }, 2.6);

  return tl;
}
