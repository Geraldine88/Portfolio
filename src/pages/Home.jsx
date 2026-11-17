import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    const g = window.gsap;
    const ST = window.ScrollTrigger;
    if (!g || !ST) return;
    g.registerPlugin(ST);

    // Hero: animate Y only — content stays visible even if GSAP is slow
    const tl = g.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.h-eye',       { y: 20, duration: .7 })
      .from('.h-name',      { y: 40, duration: .9 }, '-=.3')
      .from('.h-role',      { y: 20, duration: .7 }, '-=.4')
      .from('.h-pills',     { y: 14, duration: .5 }, '-=.3')
      .from('.h-btns',      { y: 14, duration: .5 }, '-=.3')
      .from('.h-badge-wrap',{ x: 30, duration: .7 }, '-=.6');

    // Scroll reveals: use IntersectionObserver as fallback
    g.utils.toArray('.scroll-reveal').forEach(el => {
      g.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });

    return () => ST.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="home-wrap">
      {/* ── HERO ───────────────────────────── */}
      <div className="hero">
        <div className="hero-left">
          <div className="h-eye eyebrow">AI Security · Data Engineering · ML Systems</div>

          <h1 className="h-name hero-name-txt">
            Geraldine<br />
            <em>Nnene.</em>
          </h1>

          <p className="h-role hero-role-txt">
            First-gen engineer from Cameroon. M.S. Information Technology +
            M.S. Electrical &amp; Computer Engineering (concurrent) · UW Tacoma 2026 · GPA 3.8.
            I build AI systems that protect people. Fraud detection pipelines,
            HIPAA-aware LLM platforms. I build things that ship.
          </p>

          <div className="h-pills pills-wrap">
            {['Python','LLM / RAG','AI Security','Data Engineering','AWS EC2',
              'TypeScript','scikit-learn','Docker','HIPAA'].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>

          <div className="h-btns hero-btns-wrap">
            <Link to="/projects" className="btn-main">See my work</Link>
            <Link to="/contact" className="btn-ghost">Get in touch</Link>
          </div>

          <div className="h-stats hero-stats">
            {[
              ['0.95',   'F1 Macro · Robocall Detection'],
              ['81.99%', 'ASL Classifier Accuracy'],
              ['3.8',    'GPA / 4.0 · MSIT UWT'],
            ].map(([val, lbl]) => (
              <div key={val} className="stat">
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right h-badge-wrap">
          {/* Floating AI-security image */}
          <div className="hero-img-float">
            <img
              src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80&auto=format&fit=crop"
              alt="AI security visualization"
              className="hero-img"
            />
            <div className="hero-img-glow" />
          </div>
          <div className="hero-badge-stack">
            <div className="badge-card badge-gold scroll-reveal">
              <div className="badge-icon">🏆</div>
              <div>
                <div className="badge-title">VIP WITS Scholar</div>
                <div className="badge-sub">Visionary Integration Professionals · 2026</div>
              </div>
            </div>
            <div className="badge-card scroll-reveal">
              <div className="badge-icon">Σ</div>
              <div>
                <div className="badge-title">Upsilon Pi Epsilon</div>
                <div className="badge-sub">CS Honor Society · 2026</div>
              </div>
            </div>
            <div className="badge-card scroll-reveal">
              <div className="badge-icon">📍</div>
              <div>
                <div className="badge-title">Open to roles</div>
                <div className="badge-sub">Seattle / Tacoma · Remote</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}