import { useEffect, useState } from 'react';
import { PROFILE } from '../data.js';

const LINKS = [
  ['home', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['experience', 'Experience'],
  ['education', 'Education'], ['contact', 'Contact'],
];

export default function Navbar({ theme, onTheme }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    let tick = false;
    const onScroll = () => {
      const y = window.scrollY + 140;
      let cur = 'home';
      LINKS.forEach(([id]) => {
        const s = document.getElementById(id);
        if (s && y >= s.offsetTop) cur = id;
      });
      setActive(cur);
      tick = false;
    };
    const h = () => { if (!tick) { requestAnimationFrame(onScroll); tick = true; } };
    window.addEventListener('scroll', h, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', h);
  }, []);

  return (
    <header className="navbar">
      <div className="nav-inner">
        <a href="#home" className="brand" aria-label="Home">
          <span className="brand-mark"><i className="fas fa-code" /></span>
          <span className="brand-name">Asharam<em>.dev</em></span>
        </a>
        <nav className={`nav-links ${open ? 'open' : ''}`} aria-label="Primary">
          {LINKS.map(([id, label]) => (
            <a key={id} href={`#${id}`}
              className={`nav-link ${active === id ? 'active' : ''}`}
              onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="icon-btn" aria-label="Toggle dark mode" onClick={onTheme}>
            <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} />
          </button>
          <a href={PROFILE.resume} download className="btn btn-dark btn-sm nav-cta">
            <i className="fas fa-download" /><span>Resume</span>
          </a>
          <button className="icon-btn menu-btn" aria-label="Open menu"
            aria-expanded={open} onClick={() => setOpen(!open)}>
            <i className={open ? 'fas fa-xmark' : 'fas fa-bars'} />
          </button>
        </div>
      </div>
    </header>
  );
}
