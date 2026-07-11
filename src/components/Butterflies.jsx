import React from 'react';

const Butterfly = ({ x, y, size, delay, duration, dx, dy, rotate }) => {
  const s = size || 40;
  const style = {
    position: 'fixed',
    left: x + '%',
    top: y + '%',
    width: s,
    height: s,
    opacity: 0,
    pointerEvents: 'none',
    zIndex: 0,
    '--bx': `${dx || 80}px`,
    '--by': `${dy || -60}px`,
    '--br': `${rotate || 15}deg`,
    animation: `butterflyFloat ${duration || 18}s ${delay || 0}s ease-in-out infinite`,
  };

  return (
    <svg viewBox="0 0 80 60" style={style} aria-hidden="true">
      {/* Left wing */}
      <g style={{ transformOrigin: '40px 30px', animation: `wingFlap ${0.6 + Math.random() * 0.4}s ${delay}s ease-in-out infinite` }}>
        <ellipse cx="22" cy="22" rx="20" ry="16" fill="#7C3AC8" opacity="0.55" />
        <ellipse cx="20" cy="38" rx="14" ry="10" fill="#9B5DD4" opacity="0.45" />
        <circle cx="18" cy="20" r="4" fill="#C4A0E8" opacity="0.3" />
      </g>
      {/* Right wing */}
      <g style={{ transformOrigin: '40px 30px', animation: `wingFlap ${0.6 + Math.random() * 0.4}s ${delay + 0.1}s ease-in-out infinite`, transform: 'scaleX(-1)', transformOrigin: '40px 30px' }}>
        <ellipse cx="22" cy="22" rx="20" ry="16" fill="#7C3AC8" opacity="0.55" />
        <ellipse cx="20" cy="38" rx="14" ry="10" fill="#9B5DD4" opacity="0.45" />
        <circle cx="18" cy="20" r="4" fill="#C4A0E8" opacity="0.3" />
      </g>
      {/* Body */}
      <ellipse cx="40" cy="30" rx="2.5" ry="14" fill="#4A2080" opacity="0.7" />
      {/* Antennae */}
      <line x1="40" y1="16" x2="34" y2="6" stroke="#4A2080" strokeWidth="1" opacity="0.6" />
      <circle cx="33" cy="5" r="1.5" fill="#4A2080" opacity="0.6" />
      <line x1="40" y1="16" x2="46" y2="6" stroke="#4A2080" strokeWidth="1" opacity="0.6" />
      <circle cx="47" cy="5" r="1.5" fill="#4A2080" opacity="0.6" />
    </svg>
  );
};

const BUTTERFLIES = [
  { x: 5,  y: 10, size: 50, delay: 0,   duration: 22, dx: 120, dy: -80,  rotate: 20  },
  { x: 80, y: 20, size: 35, delay: 4,   duration: 18, dx: -90, dy: -60,  rotate: -15 },
  { x: 15, y: 60, size: 45, delay: 8,   duration: 25, dx: 100, dy: -100, rotate: 10  },
  { x: 70, y: 70, size: 30, delay: 2,   duration: 20, dx: -70, dy: -80,  rotate: 25  },
  { x: 40, y: 5,  size: 40, delay: 12,  duration: 28, dx: 60,  dy: 120,  rotate: -20 },
  { x: 90, y: 50, size: 38, delay: 6,   duration: 16, dx: -80, dy: -50,  rotate: 12  },
  { x: 25, y: 85, size: 42, delay: 16,  duration: 24, dx: 90,  dy: -90,  rotate: -8  },
];

export default function Butterflies() {
  return (
    <>
      {BUTTERFLIES.map((b, i) => (
        <Butterfly key={i} {...b} />
      ))}
    </>
  );
}
