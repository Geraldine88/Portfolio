import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-wrap">
      <div className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow fu">AI Security · Data Engineering · ML Systems</div>

          <h1 className="hero-name fu2">
            Geraldine<br />
            <span>Nnene</span>
          </h1>

          <p className="hero-role fu2">
            MSIT student at UW Tacoma building AI systems that protect people 
            from fraud detection pipelines and HIPAA-aware LLM evaluation,
            to role-based AI platforms. I build things that ship.
          </p>

          <div className="hero-pills fu3">
            {['Python','LLM / RAG','AI Security','Data Engineering','AWS EC2','TypeScript','scikit-learn','Docker','HIPAA'].map(p => (
              <span key={p} className="pill">{p}</span>
            ))}
          </div>

          <div className="hero-btns fu4">
            <Link to="/projects" className="btn-main">See my work</Link>
            <Link to="/contact" className="btn-ghost">Get in touch</Link>
          </div>

          <div className="stats fu4">
            {[
              ['0.95', 'F1 Macro, Fraud Detection'],
              ['81.99%', 'ASL Classifier Accuracy'],
              ['100+', 'Students trained at ICOTEL'],
            ].map(([val, lbl]) => (
              <div key={val} className="stat">
                <div className="stat-val">{val}</div>
                <div className="stat-lbl">{lbl}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-right fu3">
          <div className="hero-img-wrap">
            <img
              src="https://raw.githubusercontent.com/Geraldine88/Portfolio/main/hero-image.png"
              alt="AI and security visualization"
            />
            <div className="hero-img-badge">
              <span className="badge-dot" />
              Open to roles
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
