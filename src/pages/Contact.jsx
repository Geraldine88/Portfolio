import React, { useState } from 'react';
import './Contact.css';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <rect x="2" y="2" width="20" height="20" rx="4"/>
    <line x1="8" y1="11" x2="8" y2="17"/>
    <line x1="8" y1="7" x2="8" y2="8"/>
    <path d="M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4"/>
    <line x1="12" y1="11" x2="12" y2="17"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const CONTACTS = [
  { href: 'mailto:geraldinennene@gmail.com', Icon: EmailIcon, label: 'geraldinennene@gmail.com', sublabel: 'Email' },
  { href: 'https://linkedin.com/in/geraldine-nnene', Icon: LinkedInIcon, label: 'linkedin.com/in/geraldine-nnene', sublabel: 'LinkedIn', external: true },
  { href: 'https://github.com/Geraldine88', Icon: GitHubIcon, label: 'github.com/Geraldine88', sublabel: 'GitHub', external: true },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText('geraldinennene@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-wrap contact-page">
      <div className="contact-center">
        <div className="sec-label fu" style={{ justifyContent: 'center' }}>
          <span>Contact</span>
          <hr style={{ maxWidth: '100px' }} />
        </div>

        <h2 className="contact-h fu2">
          Let's build something<br />
          <span>that matters</span>
        </h2>

        <p className="contact-sub fu2">
          Actively seeking roles in AI Security, Data Engineering, and ML Engineering.
          Open to full-time positions, internships, and co-ops.
          CPT authorized · Seattle/Tacoma area.
        </p>

        <div className="contact-cards fu3">
          {CONTACTS.map(({ href, Icon, label, sublabel, external }) => (
            <a
              key={href}
              href={href}
              className="contact-card"
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
            >
              <div className="cc-icon"><Icon /></div>
              <div>
                <div className="cc-label">{sublabel}</div>
                <div className="cc-val">{label}</div>
              </div>
              <span className="cc-arrow">↗</span>
            </a>
          ))}
        </div>

        <div className="contact-copy fu4">
          <button className="copy-btn" onClick={copyEmail}>
            {copied ? '✓ Copied!' : 'Copy email address'}
          </button>
        </div>

        <div className="contact-note fu4">
          <p>Based in the Seattle/Tacoma area · Available for remote or hybrid roles</p>
          <p>Currently completing MSIT at UW Tacoma. Expected graduation 2027</p>
        </div>
      </div>
    </div>
  );
}
