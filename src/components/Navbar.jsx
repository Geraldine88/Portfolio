import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="2" y="2" width="20" height="20" rx="4"/>
    <line x1="8" y1="11" x2="8" y2="17"/>
    <line x1="8" y1="7" x2="8" y2="8"/>
    <path d="M12 17v-4c0-1.1.9-2 2-2s2 .9 2 2v4"/>
    <line x1="12" y1="11" x2="12" y2="17"/>
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <NavLink to="/" className="nav-logo">Geraldine Nnene</NavLink>
        <div className="nav-links">
          <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''} end>About</NavLink>
          <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
          <NavLink to="/experience" className={({isActive}) => isActive ? 'active' : ''}>Experience</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>Contact</NavLink>
        </div>
        <div className="nav-icons">
          <a href="https://www.linkedin.com/in/nnene-geraldine/" className="nav-icon" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://github.com/Geraldine88" className="nav-icon" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
          <a href="mailto:geraldinennene@gmail.com" className="nav-icon" aria-label="Email">
            <EmailIcon />
          </a>
          <a href="mailto:agadyn28@uw.edu" className="nav-icon" aria-label="Email">
            <EmailIcon />
          </a>
        </div>
      </div>
    </nav>
  );
}
