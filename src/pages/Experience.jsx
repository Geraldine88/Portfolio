import React, { useEffect } from 'react';

const WORK = [
  {
    period: 'Jun 2026 – Oct 2026',
    role: 'Software Engineering Intern',
    org: 'Life Transitions (Marlin Platform) · Tacoma, WA',
    points: [
      'Built Marlin, a production ERA 835 payment reconciliation platform from zero with parser, reconciliation engine, data model, and web front end.',
      'Shipped 52 merged PRs across backend and frontend over the internship.',
      'Platform went live and is actively used by the organization.',
    ],
  },
  {
    period: 'Oct 2026 – Present',
    role: 'Technology & Operations Assistant',
    org: 'Life Transitions · Tacoma, WA',
    points: [
      'Part-time supporting operations and technology systems.',
      'First exposure to Go and Svelte in a production environment.',
    ],
  },
  {
    period: 'Dec 2024 – Apr 2025',
    role: 'Data Analyst Volunteer',
    org: 'North Corner Chamber Orchestra · Seattle, WA',
    points: [
      'Python analytics pipeline → projected 3% audience growth.',
      'Tableau & Power BI dashboards for 5-person executive leadership.',
    ],
  },
  {
    period: 'Jul 2022 – Jan 2023',
    role: 'Software Development Intern',
    org: 'CISED · Cameroon',
    points: [
      'Built a T-SQL POS database in a 4-person Agile team; reduced file-handling errors by 8%.',
      'Full Git workflow; documented specs for team handoff.',
    ],
  },
  {
    period: 'Mar 2021 – Dec 2021',
    role: 'Trainer & Secretary',
    org: 'ICOTEL-UB · Cameroon',
    points: [
      'Trained 100+ students in Python, IT fundamentals, and technology literacy.',
      'Coordinated 6 technology events; mentored women entering tech.',
    ],
  },
];

const EDU = [
  {
    period: '2024 – 2026',
    role: 'Master of Science in Information Technology',
    org: 'University of Washington Tacoma',
    detail: 'GPA 3.8 / 4.0 · Machine Learning, Data Structures & Algorithms, Cloud Computing, Database Systems, HCI',
    honor: 'Upsilon Pi Epsilon · VIP WITS Scholar 2026',
  },
  {
    period: 'Fall 2026 – Present',
    role: 'Master of Science in Electrical & Computer Engineering',
    org: 'University of Washington Tacoma',
    detail: 'Concurrent degree alongside MSIT · AI Security focus · Current: TECE 510',
    honor: 'In progress · AI Security track',
  },
  {
    period: '2024',
    role: 'Data Science Immersive',
    org: 'Adobe Digital Academy (General Assembly) · Remote',
    detail: 'Statistical modeling, ML/deep learning, data visualization, Python development',
  },
  {
    period: '2022',
    role: 'Bachelor of Technology in Computer Engineering',
    org: 'University of Buea, Cameroon',
    detail: 'Software Engineering concentration · ML, Data Structures, Cloud Computing',
  },
];

const COMMUNITY = [
  { period: 'Mar 2026 – Present', role: 'Junior Officer', org: 'Society of Women Engineers, UW Tacoma' },
  { period: '2026 – Present',     role: 'Member',         org: 'Upsilon Pi Epsilon Honor Society' },
  { period: '2025 – Present',     role: 'Global Chapter Success Committee', org: 'Blacks in Technology Foundation' },
];

export default function Experience() {
  useEffect(() => {
    const g = window.gsap;
    const ST = window.ScrollTrigger;
    if (!g || !ST) return;
    g.registerPlugin(ST);
    g.utils.toArray('.scroll-reveal').forEach(el => {
      g.fromTo(el,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: .8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
        }
      );
    });
    return () => ST.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="page-wrap">
      <div className="page-header scroll-reveal">
        <span className="eyebrow">Background</span>
        <h2 className="page-title">Experience &amp; Education.</h2>
      </div>

      <div className="exp-grid">
        <div>
          <div className="exp-h scroll-reveal">Work experience</div>
          {WORK.map(item => (
            <div key={item.role} className="tl-item scroll-reveal">
              <div className="tl-dot" />
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
              <ul className="t-bullets">
                {item.points.map(p => <li key={p}>{p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div>
          <div className="exp-h scroll-reveal">Education</div>
          {EDU.map(item => (
            <div key={item.role} className="tl-item tl-gold scroll-reveal">
              <div className="tl-dot" />
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
              <div className="t-detail">{item.detail}</div>
              {item.honor && <div className="t-honor">{item.honor}</div>}
            </div>
          ))}

          <div className="exp-h" style={{ marginTop: '2.5rem' }}>Community</div>
          {COMMUNITY.map(item => (
            <div key={item.role + item.org} className="tl-item scroll-reveal">
              <div className="tl-dot" />
              <div className="t-per">{item.period}</div>
              <div className="t-role">{item.role}</div>
              <div className="t-org">{item.org}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="skills-section scroll-reveal">
        <div className="exp-h" style={{ marginTop: '3rem', marginBottom: '1rem' }}>Technical skills</div>
        <div className="skills-grid">
          {[
            { label: 'Languages',        val: 'Python, SQL (T-SQL), TypeScript, JavaScript, R, Bash, Go' },
            { label: 'ML & AI',          val: 'scikit-learn, XGBoost, TensorFlow/Keras, NLP pipelines, LLM integration, RAG, ChromaDB' },
            { label: 'Data Engineering', val: 'ETL pipelines, ERA 835 parsing, pandas, NumPy, Power BI, Tableau, Matplotlib' },
            { label: 'Cloud & DevOps',   val: 'AWS EC2, Docker, Git/GitHub, PM2, Linux/Ubuntu, CI/CD, REST APIs' },
            { label: 'Concepts',         val: 'Responsible AI, HIPAA-aware data handling, RBAC, Agile/Scrum, OOP, data integrity' },
          ].map(s => (
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