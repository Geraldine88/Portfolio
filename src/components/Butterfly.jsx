import React, { useEffect, useRef } from 'react';

/*
  White-cream butterfly with dusty lavender hints
  Direction-aware: head points UP when scrolling up, DOWN when scrolling down.

  SVG natural orientation: head at TOP (antennae at y≈7, tail at y≈70).
  So rotation 0°   = head up  = scrolling UP   ✓
     rotation 180° = head down = scrolling DOWN ✓

  Trail comes from the TAIL end (behind the direction of travel).
*/

export default function Butterfly() {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const s = useRef({
    lastScrollY: 0,
    scrollDir:   1,       // 1 = down, -1 = up
    totalScroll: 0,
    x: 0,
    y: 0,
    raf: null,
    particles: [],
  });

  useEffect(() => {
    const st = s.current;
    st.x = window.innerWidth  * 0.5;
    st.y = window.innerHeight * 0.15;
    st.lastScrollY = window.scrollY;

    const onScroll = () => {
      const delta    = window.scrollY - st.lastScrollY;
      st.scrollDir   = delta >= 0 ? 1 : -1;
      st.totalScroll += delta;
      st.lastScrollY  = window.scrollY;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const margin = 80;

    const tick = () => {
      // --- position ---
      const zigzag  = Math.sin(st.totalScroll * 0.008);
      const targetX = margin + ((zigzag + 1) / 2) * (window.innerWidth - margin * 2 - 70);

      const pageH   = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      const prog    = Math.min(window.scrollY / pageH, 1);
      const targetY = window.innerHeight * 0.1 + prog * (window.innerHeight * 0.75);

      const prevX = st.x;
      const prevY = st.y;
      st.x += (targetX - st.x) * 0.04;
      st.y += (targetY - st.y) * 0.04;

      // --- rotation ---
      // SVG head is at top, so:
      //   scrolling UP   → 0°   (head up, natural)
      //   scrolling DOWN → 180° (flipped, head now points down)
      const dx        = st.x - prevX;
      const dy        = st.y - prevY;
      const baseAngle = st.scrollDir === 1 ? 180 : 0;
      // tilt left/right based on horizontal drift
      const tiltAngle = Math.atan2(dx, Math.abs(dy)) * (180 / Math.PI) * 0.55;
      const rotation  = baseAngle + tiltAngle;

      if (wrapRef.current) {
        wrapRef.current.style.transform =
          `translate(${st.x}px, ${st.y}px) rotate(${rotation}deg)`;
      }

      // --- trail origin: tail end ---
      // SVG is 68×56 rendered (viewBox 0 0 100 78, scaled).
      // Body center ≈ (34, 28) in rendered px. Tail is below body center in local space (+Y).
      // After rotation, the tail offset vector rotates with it.
      const rad      = rotation * Math.PI / 180;
      // local tail offset: 0px horizontal, +26px vertical (below body center)
      const tailOffX =  Math.sin(rad) * 26;
      const tailOffY = -Math.cos(rad) * 26;
      const tailX    = st.x + 34 + tailOffX;
      const tailY    = st.y + 28 + tailOffY;

      // --- spawn thin dusty particle ---
      const moved = Math.hypot(st.x - prevX, st.y - prevY);
      if (moved > 0.4) {
        st.particles.push({
          x:     tailX + (Math.random() - 0.5) * 5,
          y:     tailY + (Math.random() - 0.5) * 5,
          r:     1.2 + Math.random() * 2.8,
          alpha: 0.22 + Math.random() * 0.16,
          vx:    (Math.random() - 0.5) * 0.25,
          vy:    (Math.random() - 0.5) * 0.25,
          decay: 0.012 + Math.random() * 0.009,
        });
        if (st.particles.length > 55) st.particles.shift();
      }

      // --- draw trail: dusty lavender-white ---
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      st.particles = st.particles.filter(p => p.alpha > 0.01);
      for (const p of st.particles) {
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0,   `rgba(230,220,245,${p.alpha})`);   // soft lavender-white
        g.addColorStop(0.5, `rgba(200,185,225,${p.alpha * 0.5})`); // dusty lilac
        g.addColorStop(1,   'rgba(180,165,210,0)');
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        p.x     += p.vx;
        p.y     += p.vy;
        p.alpha -= p.decay;
      }

      st.raf = requestAnimationFrame(tick);
    };
    st.raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(st.raf);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} style={{
        position: 'fixed', inset: 0,
        pointerEvents: 'none', zIndex: 48,
      }} />
      <div ref={wrapRef} style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 49,
        willChange: 'transform',
        transformOrigin: '34px 28px',  /* body centre in rendered px */
      }}>
        <CreamButterfly />
      </div>
    </>
  );
}

function CreamButterfly() {
  return (
    <svg width="68" height="56" viewBox="0 0 100 78" fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        display: 'block',
        filter: 'drop-shadow(0 2px 12px rgba(160,130,210,0.30))',
      }}
    >
      <style>{`
        .wL { transform-origin: 50px 42px; animation: wfL 1.9s ease-in-out infinite; }
        .wR { transform-origin: 50px 42px; animation: wfR 1.9s ease-in-out infinite; }
        @keyframes wfL {
          0%,100% { transform: scaleX(1)    skewY(0deg);  }
          50%      { transform: scaleX(0.1)  skewY(-5deg); }
        }
        @keyframes wfR {
          0%,100% { transform: scaleX(1)    skewY(0deg); }
          50%      { transform: scaleX(0.1)  skewY(5deg); }
        }
        .bd { animation: bdB 1.9s ease-in-out infinite; transform-origin: 50px 42px; }
        @keyframes bdB {
          0%,100% { transform: scaleY(1); }
          50%      { transform: scaleY(1.025); }
        }
      `}</style>

      {/* ── LEFT WINGS ── */}
      <g className="wL">
        {/* upper left */}
        <path d="M50 38 Q30 8 6 12 Q0 28 8 44 Q22 54 50 45 Z" fill="url(#ulw)" />
        <path d="M50 38 Q30 8 6 12 Q0 28 8 44 Q22 54 50 45 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="1.1" opacity="0.5" />
        {/* wing veins */}
        <path d="M50 41 Q28 26 8 16"  stroke="#d4c8e8" strokeWidth="0.7" opacity="0.55" />
        <path d="M50 41 Q26 38 7 36"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.4"  />
        <path d="M50 41 Q30 48 10 50" stroke="#d4c8e8" strokeWidth="0.5" opacity="0.3"  />
        {/* shimmer spots */}
        <circle cx="16" cy="20" r="2.5" fill="#ede8f8" opacity="0.7" />
        <circle cx="10" cy="32" r="1.6" fill="#ede8f8" opacity="0.55" />
        {/* lower left */}
        <path d="M50 45 Q26 50 12 60 Q8 72 24 73 Q42 72 50 55 Z" fill="url(#llw)" />
        <path d="M50 45 Q26 50 12 60 Q8 72 24 73 Q42 72 50 55 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="0.9" opacity="0.45" />
        <circle cx="18" cy="64" r="1.8" fill="#ede8f8" opacity="0.6" />
      </g>

      {/* ── RIGHT WINGS ── */}
      <g className="wR">
        {/* upper right */}
        <path d="M50 38 Q70 8 94 12 Q100 28 92 44 Q78 54 50 45 Z" fill="url(#urw)" />
        <path d="M50 38 Q70 8 94 12 Q100 28 92 44 Q78 54 50 45 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="1.1" opacity="0.5" />
        <path d="M50 41 Q72 26 92 16"  stroke="#d4c8e8" strokeWidth="0.7" opacity="0.55" />
        <path d="M50 41 Q74 38 93 36"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.4"  />
        <path d="M50 41 Q70 48 90 50"  stroke="#d4c8e8" strokeWidth="0.5" opacity="0.3"  />
        <circle cx="84" cy="20" r="2.5" fill="#ede8f8" opacity="0.7" />
        <circle cx="90" cy="32" r="1.6" fill="#ede8f8" opacity="0.55" />
        {/* lower right */}
        <path d="M50 45 Q74 50 88 60 Q92 72 76 73 Q58 72 50 55 Z" fill="url(#lrw)" />
        <path d="M50 45 Q74 50 88 60 Q92 72 76 73 Q58 72 50 55 Z"
          fill="none" stroke="#c0b0d8" strokeWidth="0.9" opacity="0.45" />
        <circle cx="82" cy="64" r="1.8" fill="#ede8f8" opacity="0.6" />
      </g>

      {/* ── BODY ── */}
      <g className="bd">
        <ellipse cx="50" cy="46" rx="2.8" ry="20" fill="#6a4a9a" />
        <ellipse cx="50" cy="46" rx="1.4" ry="20" fill="#9878c8" opacity="0.5" />
        {/* head (at TOP of SVG — y≈26) */}
        <circle cx="50" cy="26" r="4"   fill="#5a3a8a" />
        <circle cx="50" cy="26" r="2"   fill="#8868b8" opacity="0.65" />
        {/* antennae — point UP (small y = top of SVG) */}
        <path d="M50 23 Q43 13 37 7" stroke="#5a3a8a" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M50 23 Q57 13 63 7" stroke="#5a3a8a" strokeWidth="1.1" strokeLinecap="round" />
        <circle cx="37" cy="7" r="2"   fill="#b898e8" />
        <circle cx="63" cy="7" r="2"   fill="#b898e8" />
        <circle cx="37" cy="7" r="0.9" fill="#f0e8ff" opacity="0.9" />
        <circle cx="63" cy="7" r="0.9" fill="#f0e8ff" opacity="0.9" />
      </g>

      <defs>
        {/* cream-white with dusty lavender blush */}
        <radialGradient id="ulw" cx="38%" cy="45%" r="62%">
          <stop offset="0%"   stopColor="#f8f4ff" />  {/* near-white cream */}
          <stop offset="45%"  stopColor="#e8e0f4" />  {/* dusty lavender */}
          <stop offset="100%" stopColor="#c8b8e8" />  {/* muted purple edge */}
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