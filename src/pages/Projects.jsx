import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { id: 'all',       label: 'All' },
  { id: 'ai',        label: 'AI & Security' },
  { id: 'ml',        label: 'Machine Learning' },
  { id: 'fullstack', label: 'Full-Stack' },
  { id: 'data',      label: 'Data & Analytics' },
];

const PROJECTS = [
  {
    cat: 'ai', wide: true,
    eye: 'RAG · RBAC · Production AI',
    title: 'Ask Husky 2.0',
    badge: 'MSIT Capstone',
    desc: '3-tier LLM routing (smollm2 → qwen2.5 → llama3.2), ChromaDB RAG pipeline with Selenium-scraped UW Tacoma knowledge base, JWT-based RBAC across 6 user roles. Deployed on AWS EC2 via Docker with GitHub CI/CD. Full SDLC ownership from requirements to production.',
    tags: ['TypeScript','Node.js','ChromaDB','Ollama','JWT','Docker','AWS EC2','Selenium'],
    noDemo: 'Private repo',
  },
  {
    cat: 'ai',
    eye: 'Fraud Detection · Audio · NLP',
    title: 'Robocall Scam Detection',
    badge: '0.95 F1 Macro',
    desc: '12-notebook end-to-end ML pipeline on 1,379 adversarial audio files. Cross-modal fusion of MFCC acoustic features (OpenAI Whisper) + TF-IDF language features into a 313-dim vector. XGBoost hit 0.95 F1 Macro across 10 imbalanced scam categories.',
    tags: ['Python','XGBoost','scikit-learn','OpenAI Whisper','librosa','TF-IDF','NLP'],
    noDemo: 'Notebook',
  },
  {
    cat: 'ai', wide: true,
    eye: 'Responsible AI · Hiring · PII Protection',
    title: 'FairHire AI',
    badge: 'Responsible AI',
    desc: 'AI hiring platform with PII anonymization, embedding-based candidate ranking, bias detection, and explainability reports for every decision. Audit-logged and GDPR-aware.',
    tags: ['Python','Sentence Transformers','spaCy','FastAPI','Docker','Responsible AI'],
    github: 'https://github.com/Geraldine88/FaireHire_AI',
  },
  {
    cat: 'fullstack', wide: true,
    eye: 'ETL · Payments · Production',
    title: 'Marlin Payment Reconciliation Platform',
    badge: '52 merged PRs',
    desc: 'Production-grade ERA 835 parser and payment reconciliation engine built at Life Transitions. Full data model, reconciliation logic, and web front end. 52 merged PRs shipped in a single internship. Live in production.',
    tags: ['Node.js','PostgreSQL','ERA 835','ETL','REST API','React'],
  },
  {
    cat: 'ml',
    eye: 'Computer Vision · CNN · Accessibility',
    title: 'ASL Sign Language Classifier',
    badge: '81.99% accuracy',
    desc: 'Custom CNN on 223,074 labeled ASL hand gesture images across 29 classes with data augmentation. EarlyStopping + ModelCheckpoint training. Live Streamlit app with real-time webcam inference.',
    tags: ['Python','TensorFlow/Keras','CNN','OpenCV','Streamlit','NumPy'],
    github: 'https://github.com/Geraldine88/SignLanguageClassification',
    demo: 'https://einzfugmkhkaqxcdp4zcc5.streamlit.app/',
  },
  {
    cat: 'ml',
    eye: 'Audio ML · Emotion Detection',
    title: 'Speech Emotion Recognition',
    badge: '59% acc · 4 emotions',
    desc: 'MLP classifier on RAVDESS dataset using MFCC, chroma, and mel spectrogram features (180-dim). Flask web app with live PyAudio microphone recording. Streamlit cloud demo for browser-based file upload.',
    tags: ['Python','scikit-learn','librosa','PyAudio','Flask','Streamlit'],
    github: 'https://github.com/Geraldine88/SER',
    demo: 'https://einzfugmkhkaqxcdp4zcc5.streamlit.app/',
    video: 'https://youtu.be/QQxVYjD7Y6A',
  },
  {
    cat: 'ml',
    eye: 'NLP · Text Classification',
    title: 'Reddit NLP Classifier',
    badge: '91.4% accuracy',
    desc: 'Scraped 1,994 Reddit posts via PRAW, built full NLP pipeline (regex, stopword removal, TF-IDF), compared AdaBoost and XGBoost — AdaBoost hit 91.4% generalization accuracy.',
    tags: ['Python','scikit-learn','XGBoost','AdaBoost','PRAW','TF-IDF'],
    noDemo: 'Notebook',
  },
  {
    cat: 'data',
    eye: 'Banking · ML · Imbalanced Data',
    title: 'Fraud & Churn Risk Pipeline',
    badge: '0.95 F1 Macro',
    desc: 'End-to-end pandas pipeline on 284K credit card transactions + 10K bank customers. SMOTE to handle 0.17% fraud rate. Random Forest models with StandardScaler + LabelEncoder. Executive Power BI risk dashboard for stakeholder reporting.',
    tags: ['Python','pandas','scikit-learn','SMOTE','Power BI','Random Forest'],
    github: 'https://github.com/Geraldine88',
  },
  {
    cat: 'data',
    eye: 'HCI · UX Research',
    title: 'AI Chatbot Trust Study',
    badge: '62.5% favorable',
    desc: 'Usability study on AI chatbot trust and adoption across demographics. Collected and analyzed survey data, presented findings to faculty panel. 62.5% favorable usability rating for redesigned interaction flow.',
    tags: ['HCI','UX Research','Survey Design','Data Analysis'],
    noDemo: 'Research report',
  },
];

export default function Projects() {
  const [active, setActive] = useState('all');

  useEffect(() => {
    const g = window.gsap;
    if (!g) return;
    g.fromTo('.proj-card',
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: .7, stagger: .08, ease: 'power3.out' }
    );
  }, [active]);

  const visible = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.cat === active);

  return (
    <div className="page-wrap">
      <div className="page-header scroll-reveal">
        <span className="eyebrow">Projects</span>
        <h2 className="page-title">Selected work.</h2>
      </div>

      <div className="filter-row scroll-reveal">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`filter-btn${active === c.id ? ' active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="proj-grid">
        {visible.map((p, i) => (
          <div key={p.title} className={`proj-card${p.wide ? ' wide' : ''}`}>
            <div className="proj-top">
              <span className="proj-eye eyebrow">{p.eye}</span>
              <span className="proj-badge">{p.badge}</span>
            </div>
            <h3 className="proj-title">{p.title}</h3>
            <p className="proj-desc">{p.desc}</p>
            <div className="proj-tags">
              {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="proj-links">
              {p.github && (
                <a href={p.github} target="_blank" rel="noreferrer" className="proj-link">
                  GitHub →
                </a>
              )}
              {p.demo && (
                <a href={p.demo} target="_blank" rel="noreferrer" className="proj-link accent">
                  Live demo →
                </a>
              )}
              {p.video && (
                <a href={p.video} target="_blank" rel="noreferrer" className="proj-link">
                  Video →
                </a>
              )}
              {p.noDemo && <span className="proj-muted">{p.noDemo}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}