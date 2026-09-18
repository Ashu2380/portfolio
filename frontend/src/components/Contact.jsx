import { useState } from 'react';
import { PROFILE } from '../data.js';
import { Reveal } from '../hooks.jsx';

const INFO = [
  ['fas fa-envelope', 'Email', PROFILE.email, `mailto:${PROFILE.email}`],
  ['fas fa-phone', 'Phone', PROFILE.phone, `tel:${PROFILE.phone.replace(/[^+\d]/g, '')}`],
  ['fas fa-location-dot', 'Location', 'Tonk, Rajasthan, India', null],
  ['fab fa-linkedin-in', 'LinkedIn', '/in/asharam-saini', PROFILE.linkedin],
  ['fab fa-github', 'GitHub', '@Ashu2380', PROFILE.github],
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [note, setNote] = useState({ text: '', ok: true });
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const mailto = () => {
    window.location.href = `mailto:${PROFILE.email}?subject=` +
      encodeURIComponent(`${form.subject} — ${form.name}`) +
      `&body=` + encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
  };

  const submit = async (e) => {
    e.preventDefault();
    const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
    if (form.name.trim().length < 2 || !okEmail ||
        form.subject.trim().length < 3 || form.message.trim().length < 10) {
      setNote({ text: 'Please fill all fields correctly (message minimum 10 characters).', ok: false });
      return;
    }
    setSending(true);
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(), email: form.email.trim(),
          subject: form.subject.trim(), message: form.message.trim(),
        }),
      });
      const j = await r.json();
      if (r.ok && j.ok) {
        setNote({ text: 'Message received! I will reply soon. Thank you.', ok: true });
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setNote({ text: `Server: ${j.error || 'failed'} — opening mail app instead.`, ok: false });
        mailto();
      }
    } catch {
      setNote({ text: 'Opening your mail app… Thanks for reaching out!', ok: true });
      mailto();
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="section tint">
      <div className="wrap">
        <p className="kicker">— Say hello</p>
        <h2 className="title">Let&apos;s build something <span className="grad">together</span></h2>
        <div className="contact-grid">
          <Reveal>
            <div className="card contact-info">
              {INFO.map(([ic, label, value, href]) => {
                const inner = (<><span className="c-ic"><i className={ic} /></span><span><small>{label}</small><strong>{value}</strong></span></>);
                return href
                  ? <a className="c-row" key={label} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}>{inner}</a>
                  : <div className="c-row" key={label}>{inner}</div>;
              })}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <form className="card form" onSubmit={submit} noValidate>
              <div className="frow">
                <div className="field">
                  <label htmlFor="fName">Name</label>
                  <input id="fName" type="text" placeholder="Your name" autoComplete="name"
                    value={form.name} onChange={set('name')} required />
                </div>
                <div className="field">
                  <label htmlFor="fEmail">Email</label>
                  <input id="fEmail" type="email" placeholder="you@mail.com" autoComplete="email"
                    value={form.email} onChange={set('email')} required />
                </div>
              </div>
              <div className="field">
                <label htmlFor="fSubject">Subject</label>
                <input id="fSubject" type="text" placeholder="Project inquiry"
                  value={form.subject} onChange={set('subject')} required />
              </div>
              <div className="field">
                <label htmlFor="fMsg">Message</label>
                <textarea id="fMsg" rows="5" placeholder="Hi Asharam, I want to discuss..."
                  value={form.message} onChange={set('message')} required />
              </div>
              <button type="submit" className="btn btn-primary" disabled={sending}>
                <i className={`fas ${sending ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`} />
                {sending ? 'Sending...' : 'Send Message'}
              </button>
              <p className="form-note" role="status"
                style={{ color: note.text ? (note.ok ? '#059669' : '#dc2626') : undefined }}>
                {note.text}
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
