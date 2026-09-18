import { EDUCATION, EXPERIENCE } from '../data.js';
import { Reveal } from '../hooks.jsx';

export function Experience() {
  return (
    <section id="experience" className="section tint">
      <div className="wrap">
        <p className="kicker">— Career so far</p>
        <h2 className="title">7 internships, <span className="grad">zero fluff</span></h2>
        <div className="timeline">
          {EXPERIENCE.map((e) => (
            <Reveal key={e.title} className="t-item">
              <article className="card">
                <time>{e.time}</time>
                <h3>{e.title}</h3>
                <p>{e.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <p className="kicker">— Academics</p>
        <h2 className="title">Strong <span className="grad">fundamentals</span></h2>
        <div className="edu-grid">
          {EDUCATION.map((e) => (
            <Reveal key={e.title}>
              <article className="card edu">
                <time>{e.time}</time>
                <h3>{e.title}</h3>
                <p className="muted">{e.place}</p>
                <p className="score"><i className={`${e.icon} gold`} /> {e.score}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
