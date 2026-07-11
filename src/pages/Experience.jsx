import React from 'react';
import './Experience.css';

const WORK = [
  {
    period: '2026 – Present',
    role: 'Data Engineering & AI Intern',
    org: 'Life Transitions · Tacoma, WA',
    points: [
      '>Building financial ETL pipelines on live healthcare data',
      '>Evaluating BAA-covered LLMs under HIPAA compliance constraints',
      '>Per-provider profitability analytics for leadership',
    ],
  },
  {
    period: 'Dec 2024 – Apr 2025',
    role: 'Data Analyst Volunteer',
    org: 'North Corner Chamber Orchestra · Seattle, WA',
    points: [
      '>Python analytics pipeline → projected 3% audience growth',
      '>Tableau & Power BI dashboards for 5-person executive leadership',
    ],
  },
  {
    period: 'Jul 2022 – Jan 2023',
    role: 'Software Development Intern',
    org: 'CIESD · Cameroon',
    points: [
      '>T-SQL POS database with reduced errors by 8%',
      '>4-person Agile team, full Git workflow',
    ],
  },
  {
    period: 'Mar 2021 – Dec 2021',
    role: 'Trainer & Secretary',
    org: 'ICOTEL-UB · Cameroon',
    points: [
      '>Trained 100+ students in Python, IT fundamentals, and technology literacy',
      '>Coordinated 6 technology events; mentored women entering tech',
    ],
  },
];

const EDU = [
  {
    period: 'Expected 2027',
    role: 'M.S. Information Technology',
    org: 'University of Washington Tacoma',
    detail: 'Machine Learning, Data Structures & Algorithms, Cloud Computing, Database Systems, Network Administration, Human-Computer Interaction',
  },
  {
    period: '2024',
    role: 'Data Science Immersive',
    org: 'Adobe Digital Academy (General Assembly) · Remote',
    detail: 'Statistical modeling, ML/deep learning, data visualization, Python development',
  },
  {
    period: '2022',
    role: 'B.Tech. Computer Engineering',
    org: 'University of Buea, Cameroon',
    detail: 'Software Engineering concentration · ML, Data Structures, Cloud Computing',
  },
];

const COMMUNITY = [
  { period: 'Mar 2026 – Present', role: 'Junior Officer', org: 'Society of Women Engineers, UW Tacoma' },
  { period: '2025 – Present',    role: 'Global Chapter Success Committee', org: 'Blacks in Technology Foundation' },
  { period: '2021',              role: 'Trainer & Secretary', org: 'ICOTEL-UB, Cameroon' },
];

export default function Experience() {
  return (
    <div className="page-wrap">
      <div className="sec-label fu"><span>Experience & Education</span><hr /></div>

      <div className="exp-grid">
        <div>
          <div className="exp-h fu2">Work experience</div>
          {WORK.map((item) => (
            <div key={item.role} className="tl-item fu3">
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
              {item.points.map((p) => <div key={p} className="t-pt">— {p}</div>)}
            </div>
          ))}
        </div>

        <div>
          <div className="exp-h fu2">Education</div>
          {EDU.map((item) => (
            <div key={item.role} className="tl-item gold fu3">
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
              <div className="t-pt">{item.detail}</div>
            </div>
          ))}

          <div className="exp-h" style={{ marginTop: '2.5rem' }}>Community</div>
          {COMMUNITY.map((item) => (
            <div key={item.role} className="tl-item fu3">
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section fu4">
        <div className="sec-label" style={{ marginTop: '3rem' }}><span>Technical Skills</span><hr /></div>
        <div className="skills-grid">
          {[
            { label: 'Languages', val: 'Python, SQL (T-SQL), TypeScript, JavaScript, R, Bash' },
            { label: 'ML & AI', val: 'scikit-learn, XGBoost, TensorFlow/Keras, NLP pipelines, LLM integration, RAG, ChromaDB' },
            { label: 'Data Engineering', val: 'ETL pipelines, data modeling, pandas, NumPy, Power BI, Tableau, Matplotlib' },
            { label: 'Cloud & DevOps', val: 'AWS EC2, Docker, Git/GitHub, PM2, Linux/Ubuntu, CI/CD, REST APIs' },
            { label: 'Concepts', val: 'Responsible AI, HIPAA-aware data handling, RBAC, Agile, OOP, data integrity' },
          ].map((s) => (
            <div key={s.label} className="skill-row">
              <span className="skill-label">{s.label}</span>
              <span className="skill-val">{s.val}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
