import { useEffect, useState } from 'react';
import { PROFILE } from '../data.js';

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const h = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', h, { passive: true });
    h();
    return () => window.removeEventListener('scroll', h);
  }, []);
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <p>© 2026 <strong>{PROFILE.name}</strong> · Built with discipline &amp; caffeine</p>
        <div className="social-row sm">
          <a href={PROFILE.github} target="_blank" rel="noopener" aria-label="GitHub"><i className="fab fa-github" /></a>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email"><i className="fas fa-envelope" /></a>
        </div>
        {showTop && (
          <button className="icon-btn" aria-label="Back to top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <i className="fas fa-arrow-up" />
          </button>
        )}
      </div>
    </footer>
  );
}
