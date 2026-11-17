import React, { useEffect, useRef } from 'react';

/*
  Autonomous butterfly — travels end-to-end across the full screen width,
  dips down as the page scrolls down, rises as it scrolls up.

  Movement model:
  ─────────────────────────────────────────────────────────────
  • The butterfly follows a smooth waypoint path: left-edge → right-edge → left-edge…
  • Vertical position tracks scroll progress so it moves down/up with the page.
  • Turning is organic: heading angle lerps toward the angle-to-target so the
    butterfly arcs naturally rather than snapping.
  • When reversing (left↔right) the butterfly curves in a lazy arc — no teleport.
  • The SVG rotates to match heading, so the head always points the direction of travel.

  Z-index:
  ─────────────────────────────────────────────────────────────
  • Canvas (trail) z-index: 1   → behind everything
  • SVG wrapper z-index:    2   → also behind page content (navbar/cards are higher)
  • Result: butterfly visibly passes BEHIND cards and the navbar, still visible through
    any transparent areas.

  Golden dust trail:
  ─────────────────────────────────────────────────────────────
  • Warm gold / amber particles emitted from the tail end of the body.
  • Particles drift and fade over ~1.2 s.
*/

const W = () => window.innerWidth;
const H = () => window.innerHeight;

export default function Butterfly() {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let ctx = canvas.getContext('2d');

    // ── state ──────────────────────────────────────────────────────
    const MARGIN   = 48;   // px from screen edge before turning
    const WING_SPD = 0.9;  // px/frame base forward speed
    const LERP_POS = 0.055;
    const LERP_ANG = 0.045; // how fast heading catches up — lower = lazier arc

    let bx = W() * 0.15;
    let by = H() * 0.18;
    let heading = 0;        // radians, 0 = right
    let targetX = W() - MARGIN;
    let targetY = by;
    let goingRight = true;

    let lastScrollY = window.scrollY;
    let scrollVel   = 0;    // used to smoothly shift vertical target

    let particles  = [];
    let raf;

    const resize = () => {
      canvas.width  = W();
      canvas.height = H();
      ctx = canvas.getContext('2d');
    };
    resize();
    window.addEventListener('resize', resize);

    const onScroll = () => {
      const delta = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVel   = delta;   // consumed each frame
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── tick ───────────────────────────────────────────────────────
    const tick = () => {
      const vw = W();
      const vh = H();

      // Vertical target: scroll progress mapped to 10%–80% of viewport height
      const pageH  = Math.max(document.body.scrollHeight - vh, 1);
      const prog   = Math.min(window.scrollY / pageH, 1);
      targetY = vh * 0.10 + prog * (vh * 0.68);

      // Horizontal waypoint: bounce between margins
      if (goingRight && bx >= vw - MARGIN - 10) {
        goingRight = false;
        targetX = MARGIN;
      } else if (!goingRight && bx <= MARGIN + 10) {
        goingRight = true;
        targetX = vw - MARGIN;
      }

      // Desired angle toward current waypoint
      const dx       = targetX - bx;
      const dy       = targetY - by;
      const desired  = Math.atan2(dy, dx);

      // Smooth heading toward desired (shortest arc)
      let diff = desired - heading;
      while (diff >  Math.PI) diff -= 2 * Math.PI;
      while (diff < -Math.PI) diff += 2 * Math.PI;
      heading += diff * LERP_ANG;

      // Move forward along current heading
      const spd = WING_SPD + Math.abs(scrollVel) * 0.08;
      const prevX = bx;
      const prevY = by;
      bx += Math.cos(heading) * spd;
      by += Math.sin(heading) * spd;

      // Clamp to viewport
      bx = Math.max(MARGIN, Math.min(vw - MARGIN, bx));
      by = Math.max(vh * 0.05, Math.min(vh * 0.90, by));

      scrollVel *= 0.85; // decay

      // ── SVG rotation ────────────────────────────────────────────
      // heading 0 = right → SVG head (at top, natural orientation) points right
      // We rotate so the HEAD of the butterfly points in heading direction.
      // SVG natural: head is at TOP = -90° from "right" in screen coords.
      // So: rotationDeg = heading_deg + 90
      const rotDeg = heading * (180 / Math.PI) + 90;

      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate(${bx}px, ${by}px) rotate(${rotDeg}deg)`;
      }

      // ── Trail origin: tail of body ───────────────────────────────
      // Body center in rendered SVG: ~(34, 28)px. Tail is +26px in local Y (downward).
      // After full rotation, tail is in the OPPOSITE direction of heading.
      const tailAngle = heading + Math.PI;  // opposite to heading = tail
      const tailX = bx + 34 + Math.cos(tailAngle) * 22;
      const tailY = by + 28 + Math.sin(tailAngle) * 22;

      // ── Spawn Tinkerbell pixie dust ──────────────────────────────
      const moved = Math.hypot(bx - prevX, by - prevY);
      if (moved > 0.3) {
        const count = Math.random() < 0.4 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          particles.push({
            x:     tailX + (Math.random() - 0.5) * 8,
            y:     tailY + (Math.random() - 0.5) * 8,
            r:     0.6 + Math.random() * 1.8,   // tiny — pixie dust, not blobs
            alpha: 0.9 + Math.random() * 0.1,
            vx:    (Math.random() - 0.5) * 0.6,
            vy:    0.2 + Math.random() * 0.5,   // drift downward like falling dust
            decay: 0.018 + Math.random() * 0.014,
            spin:  (Math.random() - 0.5) * 0.08,
            hue:   Math.random(),               // gold / yellow-white / warm shimmer
          });
        }
        if (particles.length > 110) particles.splice(0, particles.length - 110);
      }

      // ── Draw pixie dust ──────────────────────────────────────────
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0.01);

      for (const p of particles) {
        // tiny star-point glow: sharp bright core, quick fade
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 2.2);

        if (p.hue < 0.45) {
          // pure bright gold
          g.addColorStop(0,    `rgba(255,228, 80,${p.alpha})`);
          g.addColorStop(0.35, `rgba(255,200, 40,${p.alpha * 0.6})`);
          g.addColorStop(1,    'rgba(240,170,  0,0)');
        } else if (p.hue < 0.78) {
          // warm white-gold shimmer
          g.addColorStop(0,    `rgba(255,248,180,${p.alpha})`);
          g.addColorStop(0.35, `rgba(255,220,100,${p.alpha * 0.55})`);
          g.addColorStop(1,    'rgba(240,190, 50,0)');
        } else {
          // electric pale yellow — the "sparkle" highlight
          g.addColorStop(0,    `rgba(255,255,210,${p.alpha})`);
          g.addColorStop(0.3,  `rgba(255,230,120,${p.alpha * 0.5})`);
          g.addColorStop(1,    'rgba(255,200, 60,0)');
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // tiny bright pixel at the very centre for the "star" effect
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.min(p.r * 0.4, 0.9), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,230,${p.alpha * 0.95})`;
        ctx.fill();

        p.x     += p.vx;
        p.y     += p.vy;
        p.vx    += p.spin;
        p.alpha -= p.decay;
        p.r     *= 0.993;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Trail canvas — behind everything */}
      <canvas ref={canvasRef} style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* SVG wrapper — also behind page content, visible through transparent areas */}
      <div ref={wrapRef} style={{
        position:        'fixed',
        top:             0,
        left:            0,
        pointerEvents:   'none',
        zIndex:          2,
        willChange:      'transform',
        transformOrigin: '34px 28px',   /* body centre in rendered px */
      }}>
        <GoldenButterfly />
      </div>
    </>
  );
}

function GoldenButterfly() {
  return (
    <svg width="68" height="56" viewBox="0 0 100 78" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 2px 12px rgba(160,130,210,0.35))',
      }}
    >
      <style>{`
        .wL { transform-origin: 50px 42px; animation: wfL 1.9s ease-in-out infinite; }
        .wR { transform-origin: 50px 42px; animation: wfR 1.9s ease-in-out infinite; }
        @keyframes wfL {
          0%,100% { transform: scaleX(1)   skewY(0deg);  }
          50%      { transform: scaleX(0.1) skewY(-5deg); }
        }
        @keyframes wfR {
          0%,100% { transform: scaleX(1)   skewY(0deg); }
          50%      { transform: scaleX(0.1) skewY(5deg); }
        }
        .bd { animation: bdB 1.9s ease-in-out infinite; transform-origin: 50px 42px; }
        @keyframes bdB {
          0%,100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.025); }
        }
      `}</style>

      {/* ── LEFT WINGS ── */}
      <g className="wL">
        <path d="M50 38 Q30 8 6 12 Q0 28 8 44 Q22 54 50 45 Z" fill="url(#ulw)" />
        <path d="M50 38 Q30 8 6 12 Q0 28 8 44 Q22 54 50 45 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="1.1" opacity="0.5" />
        <path d="M50 41 Q28 26 8 16"  stroke="#d4c8e8" strokeWidth="0.7" opacity="0.55" />
        <path d="M50 41 Q26 38 7 36"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.4"  />
        <path d="M50 41 Q30 48 10 50" stroke="#d4c8e8" strokeWidth="0.5" opacity="0.3"  />
        <circle cx="16" cy="20" r="2.5" fill="#ede8f8" opacity="0.7" />
        <circle cx="10" cy="32" r="1.6" fill="#ede8f8" opacity="0.55" />
        <path d="M50 45 Q26 50 12 60 Q8 72 24 73 Q42 72 50 55 Z" fill="url(#llw)" />
        <path d="M50 45 Q26 50 12 60 Q8 72 24 73 Q42 72 50 55 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="0.9" opacity="0.45" />
        <circle cx="18" cy="64" r="1.8" fill="#ede8f8" opacity="0.6" />
      </g>

      {/* ── RIGHT WINGS ── */}
      <g className="wR">
        <path d="M50 38 Q70 8 94 12 Q100 28 92 44 Q78 54 50 45 Z" fill="url(#urw)" />
        <path d="M50 38 Q70 8 94 12 Q100 28 92 44 Q78 54 50 45 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="1.1" opacity="0.5" />
        <path d="M50 41 Q72 26 92 16"  stroke="#d4c8e8" strokeWidth="0.7" opacity="0.55" />
        <path d="M50 41 Q74 38 93 36"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.4"  />
        <path d="M50 41 Q70 48 90 50"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.3"  />
        <circle cx="84" cy="20" r="2.5" fill="#ede8f8" opacity="0.7" />
        <circle cx="90" cy="32" r="1.6" fill="#ede8f8" opacity="0.55" />
        <path d="M50 45 Q74 50 88 60 Q92 72 76 73 Q58 72 50 55 Z" fill="url(#lrw)" />
        <path d="M50 45 Q74 50 88 60 Q92 72 76 73 Q58 72 50 55 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="0.9" opacity="0.45" />
        <circle cx="82" cy="64" r="1.8" fill="#ede8f8" opacity="0.6" />
      </g>

      {/* ── BODY ── */}
      <g className="bd">
        <ellipse cx="50" cy="46" rx="2.8" ry="20" fill="#6a4a9a" />
        <ellipse cx="50" cy="46" rx="1.4" ry="20" fill="#9878c8" opacity="0.5" />
        <circle cx="50" cy="26" r="4"   fill="#5a3a8a" />
        <circle cx="50" cy="26" r="2"   fill="#8868b8" opacity="0.65" />
        <path d="M50 23 Q43 13 37 7" stroke="#5a3a8a" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M50 23 Q57 13 63 7" stroke="#5a3a8a" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="37" cy="7" r="2"   fill="#b898e8" />
        <circle cx="63" cy="7" r="2"   fill="#b898e8" />
        <circle cx="37" cy="7" r="0.9" fill="#f0e8ff" opacity="0.9" />
        <circle cx="63" cy="7" r="0.9" fill="#f0e8ff" opacity="0.9" />
      </g>

      <defs>
        <radialGradient id="ulw" cx="38%" cy="45%" r="62%">
          <stop offset="0%"   stopColor="#f8f4ff" />
          <stop offset="45%"  stopColor="#e8e0f4" />
          <stop offset="100%" stopColor="#c8b8e8" />
        </radialGradient>
        <radialGradient id="llw" cx="45%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#f4f0fe" />
          <stop offset="100%" stopColor="#c0aede" />
        </radialGradient>
        <radialGradient id="urw" cx="62%" cy="45%" r="62%">
          <stop offset="0%"   stopColor="#f8f4ff" />
          <stop offset="45%"  stopColor="#e8e0f4" />
          <stop offset="100%" stopColor="#c8b8e8" />
        </radialGradient>
        <radialGradient id="lrw" cx="55%" cy="35%" r="65%">
          <stop offset="0%"   stopColor="#f4f0fe" />
          <stop offset="100%" stopColor="#c0aede" />
        </radialGradient>
      </defs>
    </svg>
  );
}