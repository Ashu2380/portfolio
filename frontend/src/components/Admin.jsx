import { useState } from 'react';
import { adminLogin, adminSave } from '../api.js';

const SECTIONS = ['profile', 'projects', 'skills', 'experience', 'education'];

export default function Admin({ onExit }) {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('adminToken') || ''; } catch { return ''; }
  });
  const [password, setPassword] = useState('');
  const [section, setSection] = useState('projects');
  const [text, setText] = useState('');
  const [msg, setMsg] = useState({ t: '', ok: true });
  const [busy, setBusy] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const t = await adminLogin(password);
      try { localStorage.setItem('adminToken', t); } catch { /* ignore */ }
      setToken(t);
      setMsg({ t: 'Logged in. Pick a section, edit JSON, Save.', ok: true });
    } catch (err) {
      setMsg({ t: err.message, ok: false });
    } finally {
      setBusy(false);
    }
  };

  const logout = () => {
    try { localStorage.removeItem('adminToken'); } catch { /* ignore */ }
    setToken('');
    setText('');
  };

  const load = async () => {
    setBusy(true);
    try {
      const r = await fetch('/api/content');
      const j = await r.json();
      const raw = j[section];
      setText(typeof raw === 'string' ? JSON.stringify(JSON.parse(raw), null, 2) : JSON.stringify(raw ?? [], null, 2));
      setMsg({ t: `Loaded "${section}" (empty = using site defaults).`, ok: true });
    } catch {
      setMsg({ t: 'Could not load. Is the backend running?', ok: false });
    } finally {
      setBusy(false);
    }
  };

  const save = async () => {
    let parsed;
    try { parsed = JSON.parse(text); }
    catch { setMsg({ t: 'Invalid JSON — fix it before saving.', ok: false }); return; }
    setBusy(true);
    try {
      await adminSave(token, section, JSON.stringify(parsed));
      setMsg({ t: `Saved! "${section}" is live now — refresh the site to see it.`, ok: true });
    } catch (err) {
      setMsg({ t: err.message + (err.message.includes('Login') ? ' — log in again.' : ''), ok: false });
      if (err.message.includes('Login')) logout();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="wrap admin">
      <div className="admin-top">
        <h2>Site Admin</h2>
        <button className="btn btn-line btn-sm" onClick={onExit}>← Back to site</button>
      </div>

      {!token ? (
        <form className="card admin-card" onSubmit={login}>
          <h3>Login</h3>
          <p className="muted">Enter the admin password (ADMIN_PASSWORD on the server).</p>
          <div className="field">
            <label htmlFor="apw">Password</label>
            <input id="apw" type="password" value={password}
              onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
          <button className="btn btn-primary btn-sm" disabled={busy}>
            {busy ? 'Checking...' : 'Login'}
          </button>
          {msg.t && <p className="form-note" style={{ color: msg.ok ? '#059669' : '#dc2626' }}>{msg.t}</p>}
        </form>
      ) : (
        <div className="card admin-card">
          <div className="admin-row">
            <div className="filters">
              {SECTIONS.map((s) => (
                <button key={s} type="button"
                  className={`chip-btn ${section === s ? 'active' : ''}`}
                  onClick={() => { setSection(s); setText(''); setMsg({ t: '', ok: true }); }}>
                  {s}
                </button>
              ))}
            </div>
            <div className="admin-actions">
              <button className="btn btn-line btn-sm" disabled={busy} onClick={load}>Load current</button>
              <button className="btn btn-ghost-dark btn-sm" onClick={logout}>Logout</button>
            </div>
          </div>
          <div className="field">
            <label htmlFor="ajson">JSON for “{section}”</label>
            <textarea id="ajson" className="json-box" rows="18" value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Click "Load current", edit, then Save. Empty section = site shows defaults.' />
          </div>
          <button className="btn btn-primary" disabled={busy} onClick={save}>
            {busy ? 'Saving...' : 'Save — go live'}
          </button>
          {msg.t && <p className="form-note" style={{ color: msg.ok ? '#059669' : '#dc2626' }}>{msg.t}</p>}
        </div>
      )}
    </div>
  );
}
