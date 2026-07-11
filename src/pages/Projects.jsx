import React, { useState } from 'react';
import './Projects.css';

const CATEGORIES = [
  { id: 'all',       label: 'All Projects' },
  { id: 'ai',        label: 'AI Security & Responsible AI' },
  { id: 'ml',        label: 'Machine Learning & Deep Learning' },
  { id: 'fullstack', label: 'Full-Stack & Backend' },
  { id: 'data',      label: 'Data Analysis' },
  { id: 'devops',    label: 'DevOps & Cloud' },
];

const PROJECTS = [
  // AI SECURITY & RESPONSIBLE AI
  {
    cat: 'ai', wide: true,
    eye: 'Responsible AI · Hiring · PII Protection',
    title: 'FairHire AI',
    badge: 'AI Security', badgeClass: 'cb-lav',
    desc: 'AI hiring platform with PII anonymization, embedding-based candidate ranking, bias detection, and explainability reports for every decision. Audit-logged and GDPR-aware. To be built for responsible enterprise deployment.',
    tags: ['Python','Sentence Transformers','spaCy','FastAPI','Docker','Responsible AI'],
    github: 'https://github.com/Geraldine88/FaireHire_AI',
    noDemo: 'No live demo. View code',
  },
  {
    cat: 'ai', wide: true,
    eye: 'RAG · RBAC · Production AI',
    title: 'Ask Husky 2.0',
    badge: 'Production', badgeClass: 'cb-lav',
    desc: '3-tier LLM routing (smollm2 → qwen2.5 → llama3.2), ChromaDB RAG pipeline with Selenium-scraped UW Tacoma knowledge base, JWT-based RBAC across 6 user roles. Deployed on AWS EC2 via Docker with GitHub CI/CD.',
    tags: ['TypeScript','Node.js','ChromaDB','Ollama','JWT','Docker','AWS EC2','Selenium'],
    noDemo: 'Private',
  },
  {
    cat: 'ai',
    eye: 'Fraud Detection · Audio · NLP',
    title: 'Robocall Scam Detection',
    badge: '0.95 F1 Macro', badgeClass: 'cb-blue',
    desc: '12-notebook end-to-end ML pipeline on 1,379 real adversarial audio files. Cross-modal fusion of acoustic MFCC features (via OpenAI Whisper) and TF-IDF language features into a 313-dim vector. XGBoost hit 0.95 F1 Macro across 10 imbalanced scam categories.',
    tags: ['Python','XGBoost','scikit-learn','OpenAI Whisper','librosa','TF-IDF','NLP','pandas'],
    noDemo: 'Notebook',
  },

  //  MACHINE LEARNING & DEEP LEARNING 
  {
    cat: 'ml',
    eye: 'Audio ML · Emotion Detection',
    title: 'Speech Emotion Recognition',
    badge: '59% acc · 4 emotions', badgeClass: 'cb-mute',
    desc: 'MLP classifier on RAVDESS dataset using MFCC, chroma, and mel spectrogram features (180-dim). Flask web app with live PyAudio microphone recording. Streamlit cloud demo available for browser-based file upload.',
    tags: ['Python','scikit-learn','librosa','PyAudio','Flask','Streamlit','NumPy'],
    github: 'https://github.com/Geraldine88/SER',
    demo: 'https://einzfugmkhkaqxcdp4zcc5.streamlit.app/',
    video: 'https://youtu.be/QQxVYjD7Y6A',
  },
  {
    cat: 'ml',
    eye: 'Computer Vision · CNN · Accessibility',
    title: 'ASL Sign Language Classifier',
    badge: '81.99% accuracy', badgeClass: 'cb-blue',
    desc: 'Custom CNN on 223,074 labeled ASL hand gesture images across 29 classes with data augmentation. EarlyStopping + ModelCheckpoint training. Live Streamlit app with real-time webcam inference.',
    tags: ['Python','TensorFlow/Keras','CNN','OpenCV','Streamlit','NumPy'],
    github: 'https://github.com/Geraldine88/SignLanguageClassification',
    demo: 'https://einzfugmkhkaqxcdp4zcc5.streamlit.app/',
  },
  {
    cat: 'ml',
    eye: 'NLP · Text Classification',
    title: 'Reddit NLP Classifier',
    badge: '91.4% accuracy', badgeClass: 'cb-blue',
    desc: 'Scraped 1,994 Reddit posts via PRAW, built a full NLP preprocessing pipeline (regex cleaning, stopword removal, TF-IDF vectorization), and compared AdaBoost and XGBoost classifiers — AdaBoost achieved 91.4% generalization accuracy.',
    tags: ['Python','scikit-learn','XGBoost','AdaBoost','spaCy','PRAW','TF-IDF'],
    noDemo: 'Notebook',
  },
  {
    cat: 'ml',
    eye: 'Deep Learning · B.Tech Research',
    title: 'ASL Recognition Research (B.Tech)',
    badge: 'Research', badgeClass: 'cb-mute',
    desc: 'Earlier capstone research project on ASL gesture recognition with full write-up, model architecture diagrams, and two PDF reports documenting research methodology and findings from University of Buea, Cameroon.',
    tags: ['Python','TensorFlow','CNN','librosa','Research','Computer Vision'],
    github: 'https://github.com/Geraldine88/ASL-Recognition',
    noDemo: 'Research PDF',
  },

  //  FULL-STACK & BACKEND 
  {
    cat: 'fullstack', wide: true,
    eye: 'MERN · REST API · Cloud Deployment',
    title: 'MERN E-Book Backend',
    badge: 'Live on Vercel', badgeClass: 'cb-lav',
    desc: 'Production REST API backend for a book management platform. Node.js + Express.js server with MongoDB data layer, full CRUD operations for book resources, and live deployment on Vercel. JavaScript 100%.',
    tags: ['Node.js','Express.js','MongoDB','REST API','JavaScript','Vercel','CRUD'],
    github: 'https://github.com/Geraldine88/mern_e-book-backend',
    demo: 'https://mern-e-book-backend.vercel.app',
  },
  {
    cat: 'fullstack', wide: true,
    eye: 'Django · SQLite · Full-Stack · In Development',
    title: 'MyScholarshipDB',
    badge: 'In development', badgeClass: 'cb-mute',
    desc: 'Production-ready Django application managing STEM scholarship opportunities for underrepresented students in Washington State. Normalized schema with custom validators, fully configured Django Admin (search, filters, inline editing), and API-ready architecture for future React frontend integration.',
    tags: ['Python','Django','SQLite','Django Admin','REST-ready','HTML','CSS','JavaScript'],
    github: 'https://github.com/Geraldine88/MyScholarshipDB',
    noDemo: 'Run locally',
  },
  {
    cat: 'fullstack',
    eye: 'LLM Integration · Discord Bot',
    title: 'Discord Bot + Web Scraper',
    badge: 'LLM Integration', badgeClass: 'cb-lav',
    desc: 'TypeScript Discord bot with real-time web scraping and Ollama LLM integration.RAG-adjacent pattern to retrieve live web content, augment with context, generate grounded responses inside Discord.',
    tags: ['TypeScript','Node.js','Discord.js','Ollama','Web Scraping','dotenv'],
    github: 'https://github.com/Geraldine88/Disbot_web_scrape_finder',
    noDemo: 'Run locally',
  },
  {
    cat: 'fullstack',
    eye: 'PHP · MySQL · E-Commerce · Learning Project',
    title: 'GlamRage E-Commerce Store',
    badge: 'Learning project', badgeClass: 'cb-mute',
    desc: 'Locally-hosted e-commerce website with product listing, add-to-cart, quantity management, checkout simulation, admin dashboard, and user authentication (login/register). Built with PHP + MySQL on XAMPP while learning full-stack fundamentals.',
    tags: ['PHP','MySQL','HTML5','CSS3','Bootstrap 5','JavaScript','XAMPP','phpMyAdmin'],
    github: 'https://github.com/Geraldine88/E-comm_GlamRage',
    noDemo: 'Run locally (XAMPP)',
  },

  //  DATA ANALYSIS 
  {
    cat: 'data', wide: true,
    eye: 'Global Health · EDA · 3 Datasets',
    title: 'Global TB Death Rate Analysis',
    badge: 'Public Health', badgeClass: 'cb-blue',
    desc: 'Investigated tuberculosis mortality trends across countries from 1990–2019, correlating TB death rates with population dynamics and life expectancy across 3 merged datasets. Answered 11 structured EDA questions with key findings such as weak correlation between TB death rate and population decline, challenging assumed causal relationships.',
    tags: ['Python','pandas','NumPy','Matplotlib','seaborn','Jupyter','EDA','Public Health'],
    github: 'https://github.com/Geraldine88/global_tb_deathrate_analysis',
    noDemo: 'Notebook',
  },
  {
    cat: 'data',
    eye: 'Time Series · Retail · Seasonality',
    title: 'Walmart Sales Trend Analysis',
    badge: 'Time Series', badgeClass: 'cb-mute',
    desc: 'Seasonal decomposition of Walmart weekly sales across 45 stores. Holiday uplift analysis (Super Bowl, Labor Day, Thanksgiving, Christmas) with external factor correlation (fuel price, temperature, CPI, unemployment).',
    tags: ['Python','pandas','NumPy','Matplotlib','seaborn','Jupyter'],
    github: 'https://github.com/Geraldine88/time-Series_Walmart-sales-Trend',
    noDemo: 'Notebook',
  },
  {
    cat: 'data',
    eye: 'Regression · Housing · Predictive Modeling',
    title: 'House Sales Prediction',
    badge: 'Regression', badgeClass: 'cb-mute',
    desc: 'Exploratory analysis and predictive modeling of residential housing sales. Feature engineering, correlation analysis, and regression modeling to predict sale prices based on property characteristics.',
    tags: ['Python','pandas','scikit-learn','Matplotlib','seaborn','Jupyter'],
    github: 'https://github.com/Geraldine88/house_sales_prediction',
    noDemo: 'Notebook',
  },

  //  DEVOPS & CLOUD 
  {
    cat: 'devops',
    eye: 'System Monitoring · IT Automation · Streamlit',
    title: 'System Health & Log Watcher',
    badge: 'Live dashboard', badgeClass: 'cb-lav',
    desc: 'Python automation suite monitoring CPU, RAM, and disk usage with configurable thresholds and rotating log files. Extended with a real-time LogWatcher Dashboard deployed on Streamlit Community Cloud. Always-on system observability.',
    tags: ['Python','psutil','schedule','Streamlit','logging','Linux','Automation'],
    github: 'https://github.com/Geraldine88/System_health_check',
    demo: 'https://logwatcherdashboard-5mai7c3edad79ja4s8hgz4.streamlit.app/',
  },
];

export default function Projects() {
  const [active, setActive] = useState('all');

  const filtered = active === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.cat === active);

  return (
    <div className="page-wrap">
      <div className="sec-label fu"><span>Projects</span><hr /></div>
      <h2 className="sec-h fu2">Things I've built</h2>
      <p className="sec-sub fu2">
        {PROJECTS.length} projects across AI security, machine learning, full-stack development, data analysis, and cloud infrastructure.
      </p>

      <div className="cat-tabs fu3">
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            className={`cat-tab${active === c.id ? ' act' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
            <span className="cat-count">
              {c.id === 'all'
                ? PROJECTS.length
                : PROJECTS.filter(p => p.cat === c.id).length}
            </span>
          </button>
        ))}
      </div>

      <div className="projects-grid fu3">
        {filtered.map((p) => (
          <div key={p.title} className={`card${p.wide ? ' wide' : ''}`}>
            <div className="card-eye">{p.eye}</div>
            <div className="card-row">
              <div className="card-title">{p.title}</div>
              <span className={`cbadge ${p.badgeClass}`}>{p.badge}</span>
            </div>
            <p className="card-desc">{p.desc}</p>
            <div className="tags">
              {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>
            <div className="links">
              {p.demo && (
                <a href={p.demo} className="l-demo" target="_blank" rel="noreferrer">▶ Live demo</a>
              )}
              {p.video && (
                <a href={p.video} className="l-vid" target="_blank" rel="noreferrer">▶ Video</a>
              )}
              {p.github && (
                <a href={p.github} className="l-gh" target="_blank" rel="noreferrer">GitHub ↗</a>
              )}
              {!p.demo && !p.github && (
                <span className="l-txt">{p.noDemo}</span>
              )}
              {!p.demo && p.github && p.noDemo && (
                <span className="l-txt">{p.noDemo}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
