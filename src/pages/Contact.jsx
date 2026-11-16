import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const g = window.gsap;
    if (!g) return;
    g.fromTo('.contact-inner > *',
      { opacity: 0, y: 28 },
      { opacity: 1, y: 0, duration: .7, stagger: .12, ease: 'power3.out' }
    );
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText('geraldinennene@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-wrap contact-page">
      <div className="contact-inner">
        <span className="eyebrow">Contact</span>
        <h2 className="page-title">
          Let's build something<br />
          <em>that matters.</em>
        </h2>
        <p className="contact-sub">
          Actively seeking roles in AI Security, Data Engineering, and ML Engineering.
          Open to full-time positions, internships, and co-ops.
          Seattle / Tacoma area or remote.
        </p>

        <div className="contact-cards">
          <a href="mailto:geraldinennene@gmail.com" className="contact-card">
            <div className="cc-icon">✉</div>
            <div>
              <div className="cc-label">Email</div>
              <div className="cc-val">geraldinennene@gmail.com</div>
            </div>
            <span className="cc-arrow">↗</span>
          </a>
          <a href="https://linkedin.com/in/geraldine-nnene" target="_blank" rel="noreferrer" className="contact-card">
            <div className="cc-icon">in</div>
            <div>
              <div className="cc-label">LinkedIn</div>
              <div className="cc-val">linkedin.com/in/geraldine-nnene</div>
            </div>
            <span className="cc-arrow">↗</span>
          </a>
          <a href="https://github.com/Geraldine88" target="_blank" rel="noreferrer" className="contact-card">
            <div className="cc-icon">gh</div>
            <div>
              <div className="cc-label">GitHub</div>
              <div className="cc-val">github.com/Geraldine88</div>
            </div>
            <span className="cc-arrow">↗</span>
          </a>
        </div>

        <button className="copy-btn" onClick={copyEmail}>
          {copied ? '✓ Copied!' : 'Copy email address'}
        </button>

        <div className="contact-note">
          <p>Based in the Seattle/Tacoma area · Remote or hybrid roles welcome</p>
          <p>M.S. Information Technology & Electrical & Computer Engineering, UW Tacoma · 2026</p>
        </div>
      </div>
    </div>
  );
}