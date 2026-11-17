import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import Butterfly from './components/Butterfly';
import './index.css';

function Navbar() {
  const ref = useRef(null);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fn = () => ref.current?.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, []);

  return (
    <>
      <nav className="navbar" ref={ref}>
        <NavLink to="/" className="nav-logo nav-logo-tip" onClick={() => setOpen(false)}>
          GN
          <span className="logo-tooltip">About me</span>
        </NavLink>

        {/* Desktop links */}
        <div className="nav-links">
          <NavLink to="/projects">Projects</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/contact" className="cta">Contact</NavLink>
        </div>

        {/* Hamburger button — mobile only */}
        <button
          className={`nav-burger${open ? ' is-open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-drawer${open ? ' is-open' : ''}`} onClick={() => setOpen(false)}>
        <div className="mobile-drawer-inner" onClick={e => e.stopPropagation()}>
          <NavLink to="/"          onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink to="/projects"  onClick={() => setOpen(false)}>Projects</NavLink>
          <NavLink to="/experience"onClick={() => setOpen(false)}>Experience</NavLink>
          <NavLink to="/contact"   onClick={() => setOpen(false)}>Contact</NavLink>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter basename="/Portfolio">
      <Butterfly />
      <Navbar />
      <main>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/projects"   element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact"    element={<Contact />} />
        </Routes>
      </main>
      <footer>
        Geraldine Nnene · Seattle/Tacoma, WA · geraldinennene@gmail.com
      </footer>
    </BrowserRouter>
  );
}