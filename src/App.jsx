import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Butterflies from './components/Butterflies';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import './index.css';
import './pages/Home.css';
import './pages/Projects.css';
import './pages/Experience.css';
import './pages/Contact.css';

export default function App() {
  return (
    <BrowserRouter basename="/portfolio">
      <Butterflies />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/"           element={<Home />} />
          <Route path="/projects"   element={<Projects />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/contact"    element={<Contact />} />
        </Routes>
      </main>
      <footer style={{
        borderTop: '1px solid var(--border)',
        padding: '1.5rem 2rem',
        textAlign: 'center',
        color: 'var(--inkMute)',
        fontFamily: "'Space Mono', monospace",
        fontSize: '.72rem',
        position: 'relative',
        zIndex: 1,
      }}>
        Geraldine Nnene · Seattle/Tacoma, WA · geraldinennene@gmail.com
      </footer>
    </BrowserRouter>
  );
}
