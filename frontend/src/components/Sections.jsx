import { EDUCATION as DEFAULT_EDU, EXPERIENCE as DEFAULT_EXP } from '../data.js';
import { Reveal } from '../hooks.jsx';

export function Experience({ items }) {
  const list = items || DEFAULT_EXP;
  return (
    <section id="experience" className="section tint">
      <div className="wrap">
        <p className="kicker">— Career so far</p>
        <h2 className="title">7 internships, <span className="grad">zero fluff</span></h2>
        <div className="timeline">
          {list.map((e) => (
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

export function Education({ items }) {
  const list = items || DEFAULT_EDU;
  return (
    <section id="education" className="section">
      <div className="wrap">
        <p className="kicker">— Academics</p>
        <h2 className="title">Strong <span className="grad">fundamentals</span></h2>
        <div className="edu-grid">
          {list.map((e) => (
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
