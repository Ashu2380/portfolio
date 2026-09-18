import { useState } from 'react';
import { PROJECTS as DEFAULT_PROJECTS } from '../data.js';
import { Reveal } from '../hooks.jsx';

const FILTERS = [
  ['all', 'All'], ['fullstack', 'Full Stack'],
  ['salesforce', 'Salesforce'], ['frontend', 'Frontend'],
];

export default function Projects({ projects }) {
  const [filter, setFilter] = useState('all');
  const all = projects || DEFAULT_PROJECTS;
  const list = all.filter((p) => filter === 'all' || p.cat === filter);
  return (
    <section id="projects" className="section">
      <div className="wrap">
        <p className="kicker">— Selected work</p>
        <h2 className="title">Projects with <span className="grad">live impact</span></h2>
        <div className="filters" role="tablist" aria-label="Filter projects">
          {FILTERS.map(([v, label]) => (
            <button key={v} className={`chip-btn ${filter === v ? 'active' : ''}`}
              onClick={() => setFilter(v)}>{label}</button>
          ))}
        </div>
        <div className="proj-grid">
          {list.map((p) => (
            <Reveal key={p.title}>
              <article className="card proj">
                {p.img ? (
                  <div className="proj-media">
                    {p.badge && <span className="flag">{p.badge}</span>}
                    <img src={p.img} alt={`${p.title} preview`} loading="lazy" />
                  </div>
                ) : (
                  <div className={`proj-media fallback ${p.cls}`}><i className={p.icon} /></div>
                )}
                <div className="proj-body">
                  <p className="proj-cat">{p.catLabel}</p>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="chips">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                  <div className="proj-links">
                    {p.live && (
                      <a className="btn btn-primary btn-sm" href={p.live} target="_blank" rel="noopener">
                        <i className="fas fa-external-link-alt" />Live Demo
                      </a>
                    )}
                    <a className="btn btn-line btn-sm" href={p.code} target="_blank" rel="noopener">
                      <i className="fab fa-github" />Code
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
