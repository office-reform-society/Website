import { mapRange, clamp } from '../utils/math';
import { CARRIAGE_HOME, CARRIAGE_MAX } from './reformer.svg';

/**
 * Updates spring paths based on carriage position.
 * As carriage moves right, springs compress (get shorter with tighter coils).
 * We interpolate the spring start X and amplitude based on carriage position.
 */
export function updateSprings(carriageX: number): void {
  const progress = clamp(carriageX / CARRIAGE_MAX, 0, 1);
  const springs = document.querySelectorAll<SVGPathElement>('#springs-group path');

  const baseYValues = [118, 128, 142, 152];
  const amplitude = mapRange(progress, 0, 1, 10, 3);
  const anchorX = 700;

  springs.forEach((spring, i) => {
    const baseY = baseYValues[i];
    const startX = mapRange(progress, 0, 1, 250, 650) + carriageX;
    const clampedStartX = clamp(startX, 250, 695);

    const segmentLength = (anchorX - clampedStartX) / 6;

    if (segmentLength < 5) {
      // Too compressed — simple line
      spring.setAttribute('d', `M ${clampedStartX},${baseY} L ${anchorX},${baseY}`);
      return;
    }

    let d = `M ${clampedStartX},${baseY}`;
    for (let s = 0; s < 6; s++) {
      const qx = clampedStartX + segmentLength * (s + 0.5);
      const qy = baseY + (s % 2 === 0 ? -amplitude : amplitude);
      const ex = clampedStartX + segmentLength * (s + 1);
      d += ` Q ${qx},${qy} ${ex},${baseY}`;
    }
    d += ` L ${anchorX},${baseY}`;

    spring.setAttribute('d', d);
  });
}

/**
 * Reset springs to home position paths.
 */
export function resetSprings(): void {
  updateSprings(CARRIAGE_HOME);
}
