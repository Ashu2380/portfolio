import { ROLES, STATS, PROFILE as DEFAULT_PROFILE } from '../data.js';
import { Counter, useTyping } from '../hooks.jsx';

const MINIS = [
  ['fab fa-react', 'MERN'], ['fab fa-angular', 'Angular'],
  ['fas fa-leaf', 'Spring Boot'], ['fab fa-salesforce', 'Salesforce'],
];

const STRIP = [
  ['fas fa-bolt', 'i1', 'Fast Learner', 'Agile, deadline-driven'],
  ['fas fa-shield-halved', 'i2', 'Secure Code', 'JWT · validation · RBAC'],
  ['fas fa-layer-group', 'i3', 'End-to-End', 'UI to database'],
  ['fas fa-people-group', 'i4', 'Team Player', 'Remote friendly'],
];

export default function Hero({ profile }) {
  const P = { ...DEFAULT_PROFILE, ...(profile || {}) };
  const typed = useTyping(ROLES);
  return (
    <section id="home" className="hero-section">
      <div className="wrap">
        <div className="hero-panel">
          <div className="hero-grid">
            <div className="hero-copy">
              <span className="pill"><span className="dot" />Available for opportunities · Jaipur, India</span>
              <h1>Building apps<br />that <span className="grad">ship &amp; scale.</span></h1>
              <p className="role-line">I&apos;m <strong>{P.name}</strong> — {typed}<span className="caret">|</span></p>
              <p className="lede">Full Stack Developer working across <strong>MERN, Angular, Spring&nbsp;Boot &amp; Salesforce</strong> — 6 production-style projects, 7 internships, CGPA&nbsp;9.2.</p>
              <div className="cta-row">
                <a href="#projects" className="btn btn-light">View Projects<i className="fas fa-arrow-right" /></a>
                <a href="#contact" className="btn btn-ghost">Contact Me</a>
              </div>
              <div className="social-row">
                <a href={P.github} target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github" /></a>
                <a href={P.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                <a href={`mailto:${P.email}`} aria-label="Email"><i className="fas fa-envelope" /></a>
                <a href={`tel:${P.phone.replace(/[^+\d]/g, '')}`} aria-label="Phone"><i className="fas fa-phone" /></a>
              </div>
            </div>
            <div className="hero-side">
              <div className="live-card">
                <span className="live-badge">● Live Project</span>
                <h3>Mykart — E-Commerce</h3>
                <p>MERN stack store, deployed on Vercel</p>
                <a href={P.liveProject} target="_blank" rel="noopener" className="btn btn-primary btn-sm">
                  Open Live Demo<i className="fas fa-external-link-alt" />
                </a>
              </div>
              <div className="mini-grid">
                {MINIS.map(([ic, label]) => (
                  <div className="mini" key={label}><i className={ic} /><span>{label}</span></div>
                ))}
              </div>
              <div className="now-card">
                <div><small>Currently</small><strong>{P.role}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div className="strip">
          {STRIP.map(([ic, cls, title, sub]) => (
            <div className="strip-item" key={title}>
              <span className={`strip-ic ${cls}`}><i className={ic} /></span>
              <div><strong>{title}</strong><span>{sub}</span></div>
            </div>
          ))}
        </div>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <strong>{s.count != null ? <><Counter end={s.count} />{s.suffix}</> : s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
