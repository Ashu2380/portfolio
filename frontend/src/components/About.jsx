import { PROFILE } from '../data.js';
import { Reveal } from '../hooks.jsx';

const FACTS = [
  ['Location', 'Jaipur, Rajasthan, India'],
  ['Email', 'asharamsaini2380@gmail.com'],
  ['Phone', '+91-6350395820'],
  ['Languages', 'English, Hindi'],
  ['Education', 'B.Tech IT · CGPA 9.2'],
  ['Interests', 'Cricket, Volleyball, Tech'],
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <p className="kicker">About me</p>
        <h2 className="title">Developer who owns features <span className="grad">end-to-end</span></h2>
        <div className="about-grid">
          <Reveal>
            <article className="card">
              <p>Entry-level Full Stack Developer with hands-on experience across the <strong>MERN stack, Angular, Spring Boot and Salesforce</strong>. Strong foundation in Java, OOP, DSA and SQL/NoSQL databases (SQL, MongoDB, PostgreSQL).</p>
              <p>Shipped production-style web apps, blockchain modules (Ethereum, Cardano) and security-hardened features across <strong>7 internships</strong>. Comfortable in Agile teams, fast to learn, quicker to deliver.</p>
              <dl className="facts">
                {FACTS.map(([k, v]) => (
                  <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
                ))}
              </dl>
              <a href={PROFILE.resume} download className="btn btn-primary btn-sm">
                <i className="fas fa-download" />Download Resume
              </a>
            </article>
          </Reveal>
          <div className="about-side">
            <Reveal delay={100}>
              <article className="card">
                <h3><i className="fas fa-trophy gold" /> Highlights</h3>
                <ul className="ticks">
                  <li><strong>1st rank</strong> in 7th sem · 2nd in 4th &amp; 6th sem, B.Tech</li>
                  <li><strong>2nd rank</strong> in entire school, Class 10 boards</li>
                  <li><strong>Salesforce Trailhead Ranger</strong></li>
                  <li>District-level volleyball player</li>
                </ul>
              </article>
            </Reveal>
            <Reveal delay={150}>
              <article className="card">
                <h3><i className="fas fa-certificate gold" /> Certifications</h3>
                <div className="chips">
                  <span>Java · NPTEL</span><span>Infosys Springboard</span><span>RHCHA</span>
                  <span>MongoDB</span><span>Java · Code360</span><span>Trailhead Ranger</span>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
