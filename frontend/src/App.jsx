import { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import { Experience, Education } from './components/Sections.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import Admin from './components/Admin.jsx';
import { fetchContent } from './api.js';
import * as bundled from './data.js';

function isAdminRoute() {
  return typeof window !== 'undefined' && window.location.hash === '#/admin';
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('theme') || 'light'; }
    catch { return 'light'; }
  });
  const [admin, setAdmin] = useState(isAdminRoute());
  // Live content from backend; falls back to bundled defaults per section.
  const [live, setLive] = useState({});

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('theme', theme); } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    const h = () => setAdmin(isAdminRoute());
    window.addEventListener('hashchange', h);
    return () => window.removeEventListener('hashchange', h);
  }, []);

  useEffect(() => {
    fetchContent().then(setLive).catch(() => {});
  }, []);

  const data = {
    profile: live.profile || bundled.PROFILE,
    projects: live.projects || bundled.PROJECTS,
    skills: live.skills || bundled.SKILLS,
    experience: live.experience || bundled.EXPERIENCE,
    education: live.education || bundled.EDUCATION,
  };

  if (admin) {
    return (
      <>
        <div style={{ padding: '24px 0 60px' }}>
          <Admin onExit={() => { window.location.hash = '#home'; }} />
        </div>
        <Footer minimal />
      </>
    );
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Navbar theme={theme} onTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <main id="main">
        <Hero profile={data.profile} />
        <About />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        <Experience items={data.experience} />
        <Education items={data.education} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
