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
  useEffect(() => {
    const fn = () => ref.current?.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <nav className="navbar" ref={ref}>
      <NavLink to="/" className="nav-logo nav-logo-tip">
        GN
        <span className="logo-tooltip">About me</span>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/experience">Experience</NavLink>
        <NavLink to="/contact" className="cta">Contact</NavLink>
      </div>
    </nav>
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