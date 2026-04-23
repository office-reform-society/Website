import gsap from 'gsap';
import { clamp } from '../utils/math';
import { CARRIAGE_HOME, CARRIAGE_MAX } from './reformer.svg';
import { updateSprings } from './reformer-springs';
import { prefersReducedMotion } from '../utils/reduced-motion';

interface DragState {
  isDragging: boolean;
  startX: number;
  startCarriageX: number;
  currentX: number;
  hasInteracted: boolean;
}

const state: DragState = {
  isDragging: false,
  startX: 0,
  startCarriageX: 0,
  currentX: 0,
  hasInteracted: false,
};

function getPointerX(e: PointerEvent): number {
  return e.clientX;
}

function getSvgScale(): number {
  const svg = document.getElementById('reformer-svg');
  if (!svg) return 1;
  const rect = svg.getBoundingClientRect();
  const viewBox = svg.getAttribute('viewBox')?.split(' ');
  if (!viewBox) return 1;
  const svgWidth = parseFloat(viewBox[2]);
  return svgWidth / rect.width;
}

function onPointerDown(e: PointerEvent): void {
  const carriage = document.getElementById('carriage');
  if (!carriage) return;

  state.isDragging = true;
  state.startX = getPointerX(e);

  const transform = gsap.getProperty(carriage, 'x') as number;
  state.startCarriageX = typeof transform === 'number' ? transform : 0;

  carriage.style.cursor = 'grabbing';
  carriage.setPointerCapture(e.pointerId);

  // Hide drag hint after first interaction
  if (!state.hasInteracted) {
    state.hasInteracted = true;
    const hint = document.querySelector('.hero__drag-hint');
    const arrows = document.getElementById('drag-arrows');
    if (hint) gsap.to(hint, { opacity: 0, duration: 0.3 });
    if (arrows) gsap.to(arrows, { opacity: 0, duration: 0.3 });
  }

  e.preventDefault();
}

function onPointerMove(e: PointerEvent): void {
  if (!state.isDragging) return;

  const scale = getSvgScale();
  const deltaX = (getPointerX(e) - state.startX) * scale;
  const newX = clamp(state.startCarriageX + deltaX, CARRIAGE_HOME, CARRIAGE_MAX);

  state.currentX = newX;

  gsap.set('#carriage', { x: newX });
  updateSprings(newX);

  e.preventDefault();
}

function onPointerUp(e: PointerEvent): void {
  if (!state.isDragging) return;

  state.isDragging = false;
  const carriage = document.getElementById('carriage');
  if (carriage) {
    carriage.style.cursor = 'grab';
    carriage.releasePointerCapture(e.pointerId);
  }

  // Snap back with elastic easing
  const ease = prefersReducedMotion() ? 'power2.out' : 'elastic.out(1, 0.4)';
  const duration = prefersReducedMotion() ? 0.3 : 1.2;

  const proxy = { x: state.currentX };
  gsap.to(proxy, {
    x: CARRIAGE_HOME,
    duration,
    ease,
    onUpdate: () => {
      gsap.set('#carriage', { x: proxy.x });
      updateSprings(proxy.x);
    },
  });

  state.currentX = CARRIAGE_HOME;
}

export function initDrag(): void {
  const carriage = document.getElementById('carriage');
  if (!carriage) return;

  carriage.addEventListener('pointerdown', onPointerDown);
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);

  // Prevent touch scrolling while dragging
  carriage.style.touchAction = 'none';
}
