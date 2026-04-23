/**
 * Interactive Reformer Pilates Machine — Inline SVG
 *
 * Structure:
 *   #reformer-group
 *     #rails          — two horizontal guide rails (static)
 *     #frame-left     — headrest frame end (static)
 *     #frame-right    — footbar frame end (static)
 *     #footbar        — vertical footbar (static)
 *     #carriage       — sliding platform (DRAGGABLE along X)
 *     #shoulder-blocks— pads on carriage (move with carriage)
 *     #headrest       — adjustable headrest (move with carriage)
 *     #springs-group  — 4 springs connecting carriage to frame
 *     #straps-group   — 2 rope loops through pulleys
 */

export const REFORMER_SVG = `
<svg id="reformer-svg" viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" aria-label="Interactive Reformer Pilates Machine">
  <defs>
    <linearGradient id="rail-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="var(--accent)" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.3"/>
    </linearGradient>
    <linearGradient id="spring-grad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="var(--accent)" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="var(--accent)" stop-opacity="0.5"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <g id="reformer-group" transform="translate(50, 30)">

    <!-- Rails -->
    <g id="rails">
      <line x1="0" y1="100" x2="800" y2="100"
            stroke="url(#rail-grad)" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="0" y1="170" x2="800" y2="170"
            stroke="url(#rail-grad)" stroke-width="2.5" stroke-linecap="round"/>
      <!-- Rail detail lines -->
      <line x1="0" y1="102" x2="800" y2="102"
            stroke="var(--accent)" stroke-width="0.5" opacity="0.2"/>
      <line x1="0" y1="168" x2="800" y2="168"
            stroke="var(--accent)" stroke-width="0.5" opacity="0.2"/>
    </g>

    <!-- Frame Left (headrest end) -->
    <g id="frame-left">
      <rect x="-10" y="80" width="20" height="110" rx="4"
            fill="none" stroke="var(--accent)" stroke-width="1.8" opacity="0.7"/>
      <line x1="0" y1="80" x2="0" y2="68"
            stroke="var(--accent)" stroke-width="1.5" opacity="0.5"/>
      <!-- Feet -->
      <rect x="-14" y="190" width="28" height="8" rx="2"
            fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.4"/>
    </g>

    <!-- Frame Right (footbar end) -->
    <g id="frame-right">
      <rect x="790" y="80" width="20" height="110" rx="4"
            fill="none" stroke="var(--accent)" stroke-width="1.8" opacity="0.7"/>
      <!-- Feet -->
      <rect x="786" y="190" width="28" height="8" rx="2"
            fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.4"/>
    </g>

    <!-- Footbar -->
    <g id="footbar">
      <line x1="780" y1="60" x2="780" y2="90"
            stroke="var(--accent)" stroke-width="3" stroke-linecap="round"/>
      <!-- Footbar grip -->
      <rect x="770" y="48" width="20" height="14" rx="7"
            fill="none" stroke="var(--accent)" stroke-width="1.5" opacity="0.8"/>
    </g>

    <!-- Springs (connect carriage to frame-right anchor at x=700) -->
    <g id="springs-group">
      <path id="spring-1" d="M 250,118 Q 280,108 310,118 Q 340,128 370,118 Q 400,108 430,118 Q 460,128 490,118 Q 520,108 550,118 L 700,118"
            fill="none" stroke="url(#spring-grad)" stroke-width="1.8" stroke-linecap="round"/>
      <path id="spring-2" d="M 250,128 Q 280,118 310,128 Q 340,138 370,128 Q 400,118 430,128 Q 460,138 490,128 Q 520,118 550,128 L 700,128"
            fill="none" stroke="url(#spring-grad)" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
      <path id="spring-3" d="M 250,142 Q 280,132 310,142 Q 340,152 370,142 Q 400,132 430,142 Q 460,152 490,142 Q 520,132 550,142 L 700,142"
            fill="none" stroke="url(#spring-grad)" stroke-width="1.8" stroke-linecap="round"/>
      <path id="spring-4" d="M 250,152 Q 280,142 310,152 Q 340,162 370,152 Q 400,142 430,152 Q 460,162 490,152 Q 520,142 550,152 L 700,152"
            fill="none" stroke="url(#spring-grad)" stroke-width="1.8" stroke-linecap="round" opacity="0.7"/>
    </g>

    <!-- Straps (ropes from pulleys at frame-right, looping down) -->
    <g id="straps-group">
      <path id="strap-left" d="M 780,110 L 680,110 Q 660,110 660,125 L 660,200 Q 660,215 675,215 L 690,215 Q 700,215 700,200 L 700,125"
            fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
      <path id="strap-right" d="M 780,160 L 680,160 Q 660,160 660,175 L 660,225 Q 660,240 675,240 L 690,240 Q 700,240 700,225 L 700,175"
            fill="none" stroke="var(--accent)" stroke-width="1.2" opacity="0.5" stroke-linecap="round"/>
      <!-- Strap handles -->
      <ellipse cx="680" cy="215" rx="15" ry="6"
               fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.4"/>
      <ellipse cx="680" cy="240" rx="15" ry="6"
               fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.4"/>
    </g>

    <!-- Carriage (draggable) -->
    <g id="carriage" style="cursor: grab;">
      <!-- Main platform -->
      <rect id="carriage-platform" x="60" y="96" width="190" height="78" rx="3"
            fill="var(--accent)" fill-opacity="0.06"
            stroke="var(--accent)" stroke-width="2"/>

      <!-- Padding detail -->
      <rect x="70" y="106" width="170" height="58" rx="2"
            fill="var(--accent)" fill-opacity="0.03"
            stroke="var(--accent)" stroke-width="0.5" opacity="0.4"/>

      <!-- Shoulder blocks -->
      <g id="shoulder-blocks">
        <rect x="70" y="100" width="12" height="30" rx="2"
              fill="var(--accent)" fill-opacity="0.15"
              stroke="var(--accent)" stroke-width="1.2"/>
        <rect x="218" y="100" width="12" height="30" rx="2"
              fill="var(--accent)" fill-opacity="0.15"
              stroke="var(--accent)" stroke-width="1.2"/>
      </g>

      <!-- Headrest -->
      <g id="headrest">
        <rect x="100" y="86" width="100" height="14" rx="7"
              fill="var(--accent)" fill-opacity="0.1"
              stroke="var(--accent)" stroke-width="1.5"/>
        <!-- Headrest supports -->
        <line x1="120" y1="100" x2="120" y2="88"
              stroke="var(--accent)" stroke-width="1" opacity="0.5"/>
        <line x1="180" y1="100" x2="180" y2="88"
              stroke="var(--accent)" stroke-width="1" opacity="0.5"/>
      </g>

      <!-- Wheel indicators on carriage -->
      <circle cx="80" cy="100" r="4" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
      <circle cx="220" cy="100" r="4" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
      <circle cx="80" cy="170" r="4" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>
      <circle cx="220" cy="170" r="4" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>

      <!-- Drag affordance arrows -->
      <g id="drag-arrows" opacity="0.3">
        <polygon points="140,135 148,130 148,140" fill="var(--accent)"/>
        <polygon points="160,135 152,130 152,140" fill="var(--accent)"/>
        <line x1="142" y1="135" x2="158" y2="135" stroke="var(--accent)" stroke-width="1"/>
      </g>
    </g>

    <!-- Spring anchor point indicators -->
    <circle cx="700" cy="135" r="5" fill="none" stroke="var(--accent)" stroke-width="1" opacity="0.3"/>

  </g>
</svg>
`;

/** Home position of carriage (x offset from original) */
export const CARRIAGE_HOME = 0;
/** Max extended position */
export const CARRIAGE_MAX = 400;
/** Spring paths in home (compressed) position */
export const SPRING_PATHS_HOME = [
  'M 250,118 Q 280,108 310,118 Q 340,128 370,118 Q 400,108 430,118 Q 460,128 490,118 Q 520,108 550,118 L 700,118',
  'M 250,128 Q 280,118 310,128 Q 340,138 370,128 Q 400,118 430,128 Q 460,138 490,128 Q 520,118 550,128 L 700,128',
  'M 250,142 Q 280,132 310,142 Q 340,152 370,142 Q 400,132 430,142 Q 460,152 490,142 Q 520,132 550,142 L 700,142',
  'M 250,152 Q 280,142 310,152 Q 340,162 370,152 Q 400,142 430,152 Q 460,162 490,152 Q 520,142 550,152 L 700,152',
];
/** Spring paths in extended position */
export const SPRING_PATHS_EXTENDED = [
  'M 650,118 Q 660,113 670,118 Q 680,123 690,118 L 700,118',
  'M 650,128 Q 660,123 670,128 Q 680,133 690,128 L 700,128',
  'M 650,142 Q 660,137 670,142 Q 680,147 690,142 L 700,142',
  'M 650,152 Q 660,147 670,152 Q 680,157 690,152 L 700,152',
];
