import { SKILLS as DEFAULT_SKILLS } from '../data.js';
import { Reveal, SkillBar } from '../hooks.jsx';

export default function Skills({ skills }) {
  const list = skills || DEFAULT_SKILLS;
  return (
    <section id="skills" className="section tint">
      <div className="wrap">
        <p className="kicker">— My toolbox</p>
        <h2 className="title">Skills that <span className="grad">ship products</span></h2>
        <div className="skill-grid">
          {list.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <article className="card skill-card">
                <span className={`skill-ic ${c.cls}`}><i className={c.icon} /></span>
                <h3>{c.title}</h3>
                {c.bars && c.bars.map((b) => <SkillBar key={b.name} name={b.name} pct={b.pct} />)}
                {c.tags && <div className="chips">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>}
                {c.foot && <p className="cs">{c.foot}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
