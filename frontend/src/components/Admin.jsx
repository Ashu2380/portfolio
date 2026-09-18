import { useState } from 'react';
import { adminLogin, adminSave, adminUpload } from '../api.js';
import * as bundled from '../data.js';

const DEFAULTS = {
  profile: bundled.PROFILE,
  projects: bundled.PROJECTS,
  skills: bundled.SKILLS,
  experience: bundled.EXPERIENCE,
  education: bundled.EDUCATION,
};
const TABS = ['profile', 'projects', 'skills', 'experience', 'education'];
const CATS = [['fullstack', 'Full Stack'], ['salesforce', 'Salesforce'], ['frontend', 'Frontend']];
const ICONS = [
  ['fab fa-angular', 'Angular'], ['fas fa-file-contract', 'Contract'],
  ['fas fa-hospital', 'Hospital'], ['fas fa-gamepad', 'Game'],
  ['fas fa-cart-shopping', 'Shop'], ['fas fa-briefcase', 'Work'],
  ['fas fa-star', 'Star'], ['fas fa-code', 'Code'],
];
const COLORS = [['f1', 'Red'], ['f2', 'Green'], ['f3', 'Blue'], ['f4', 'Pink']];

/* ---------- small fields ---------- */
function F({ label, value, onChange, ph, type }) {
  return (
    <div className="field">
      <label>{label}</label>
      <input type={type || 'text'} value={value || ''} placeholder={ph || ''}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
function FA({ label, value, onChange, ph, rows }) {
  return (
    <div className="field">
      <label>{label}</label>
      <textarea rows={rows || 3} value={value || ''} placeholder={ph || ''}
        onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
const set = (obj, k) => (v) => ({ ...obj, [k]: v });
const upd = (setter) => (fn) => setter((prev) => (typeof fn === 'function' ? fn(prev) : fn));

/* ---------- image picker: URL text + file upload + preview ---------- */
function ImagePicker({ value, onChange, token, note }) {
  const [busy, setBusy] = useState(false);
  const pick = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setBusy(true);
    note('Uploading...', true);
    try {
      const url = await adminUpload(token, file);
      onChange(url);
      note('Uploaded! Save the section to go live.', true);
    } catch (err) {
      note(err.message, false);
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className="field">
      <label>Image (link or upload)</label>
      <input type="text" value={value || ''} placeholder="https://… or /uploads/… or blank for icon"
        onChange={(e) => onChange(e.target.value)} />
      <div className="admin-actions" style={{ marginTop: 8 }}>
        <label className="btn btn-line btn-sm" style={{ cursor: 'pointer' }}>
          {busy ? 'Uploading...' : 'Upload image'}
          <input type="file" accept="image/*" hidden onChange={pick} />
        </label>
        {value ? <button type="button" className="btn btn-ghost-dark btn-sm" onClick={() => onChange('')}>Use icon instead</button> : null}
      </div>
      {value ? <img src={value} alt="preview" className="img-preview" /> : null}
    </div>
  );
}

/* ================= MAIN ================= */
export default function Admin({ onExit }) {
  const [token, setToken] = useState(() => {
    try { return localStorage.getItem('adminToken') || ''; } catch { return ''; }
  });
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('projects');
  const [msg, setMsg] = useState({ t: '', ok: true });
  const [busy, setBusy] = useState(false);
  const [drafts, setDrafts] = useState({}); // section -> edited value

  const note = (t, ok) => setMsg({ t, ok: !!ok });
  const draftOf = (s) => (drafts[s] !== undefined ? drafts[s] : DEFAULTS[s]);
  const setDraft = (s, v) => setDrafts((d) => ({ ...d, [s]: v }));

  const login = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const t = await adminLogin(password);
      try { localStorage.setItem('adminToken', t); } catch { /* ignore */ }
      setToken(t);
      note('Logged in! Open a tab, Load, edit, Save.', true);
    } catch (err) {
      note(err.message, false);
    } finally {
      setBusy(false);
    }
  };
  const logout = () => {
    try { localStorage.removeItem('adminToken'); } catch { /* ignore */ }
    setToken('');
  };

  const load = async (s) => {
    setBusy(true);
    try {
      const r = await fetch('/api/content');
      const j = await r.json();
      if (j[s] !== undefined) {
        setDraft(s, typeof j[s] === 'string' ? JSON.parse(j[s]) : j[s]);
        note(`Loaded saved "${s}".`, true);
      } else {
        setDraft(s, JSON.parse(JSON.stringify(DEFAULTS[s])));
        note(`No saved "${s}" yet — showing site defaults. Edit + Save to publish.`, true);
      }
    } catch {
      note('Could not load. Is the backend running?', false);
    } finally {
      setBusy(false);
    }
  };

  const save = async (s) => {
    setBusy(true);
    try {
      await adminSave(token, s, JSON.stringify(draftOf(s)));
      note(`Saved! "${s}" is live — refresh the site to see it.`, true);
    } catch (err) {
      note(err.message, false);
      if (/login/i.test(err.message)) logout();
    } finally {
      setBusy(false);
    }
  };

  if (!token) {
    return (
      <div className="wrap admin">
        <div className="admin-top">
          <h2>Site Admin</h2>
          <button className="btn btn-line btn-sm" onClick={onExit}>← Back to site</button>
        </div>
        <form className="card admin-card" onSubmit={login}>
          <h3>Login</h3>
          <p className="muted">Enter the admin password to manage the whole site.</p>
          <F label="Password" type="password" value={password} onChange={setPassword} ph="••••••••" />
          <div><button className="btn btn-primary btn-sm" disabled={busy}>{busy ? 'Checking...' : 'Login'}</button></div>
          {msg.t && <p className="form-note" style={{ color: msg.ok ? '#059669' : '#dc2626' }}>{msg.t}</p>}
        </form>
      </div>
    );
  }

  return (
    <div className="wrap admin">
      <div className="admin-top">
        <h2>Site Admin</h2>
        <div className="admin-actions">
          <button className="btn btn-ghost-dark btn-sm" onClick={logout}>Logout</button>
          <button className="btn btn-line btn-sm" onClick={onExit}>← Back to site</button>
        </div>
      </div>
      <div className="card admin-card">
        <div className="filters">
          {TABS.map((t) => (
            <button key={t} type="button" className={`chip-btn ${tab === t ? 'active' : ''}`}
              onClick={() => setTab(t)}>{t}</button>
          ))}
        </div>
        <div className="admin-actions">
          <button className="btn btn-line btn-sm" disabled={busy} onClick={() => load(tab)}>Load current</button>
          <button className="btn btn-primary btn-sm" disabled={busy} onClick={() => save(tab)}>
            {busy ? 'Saving...' : 'Save — go live'}
          </button>
        </div>
        {msg.t && <p className="form-note" style={{ color: msg.ok ? '#059669' : '#dc2626' }}>{msg.t}</p>}
        {tab === 'profile' && <ProfileEd value={draftOf('profile')} onChange={(v) => setDraft('profile', v)} />}
        {tab === 'projects' && <ProjectsEd value={draftOf('projects')} onChange={(v) => setDraft('projects', v)} token={token} note={note} />}
        {tab === 'skills' && <SkillsEd value={draftOf('skills')} onChange={(v) => setDraft('skills', v)} />}
        {tab === 'experience' && <SimpleListEd value={draftOf('experience')} onChange={(v) => setDraft('experience', v)}
          fields={[['time', 'Period'], ['title', 'Title'], ['desc', 'Description']]} addLabel="Add experience" />}
        {tab === 'education' && <SimpleListEd value={draftOf('education')} onChange={(v) => setDraft('education', v)}
          fields={[['time', 'Period'], ['title', 'Title'], ['place', 'Institute'], ['score', 'Score']]} addLabel="Add education" />}
      </div>
    </div>
  );
}

/* ================= EDITORS ================= */
function ProfileEd({ value, onChange }) {
  const v = value || {};
  const s = (k) => (nv) => onChange({ ...v, [k]: nv });
  return (
    <div>
      <div className="frow2">
        <F label="Full name" value={v.name} onChange={s('name')} />
        <F label="Current role line" value={v.role} onChange={s('role')} ph="SDE-1 · Aiquant" />
      </div>
      <div className="frow2">
        <F label="Location" value={v.location} onChange={s('location')} />
        <F label="Email" value={v.email} onChange={s('email')} />
      </div>
      <div className="frow2">
        <F label="Phone" value={v.phone} onChange={s('phone')} />
        <F label="Live project link" value={v.liveProject} onChange={s('liveProject')} />
      </div>
      <div className="frow2">
        <F label="GitHub link" value={v.github} onChange={s('github')} />
        <F label="LinkedIn link" value={v.linkedin} onChange={s('linkedin')} />
      </div>
    </div>
  );
}

const BLANK_PROJECT = { cat: 'fullstack', catLabel: 'MERN Stack', title: 'New Project', desc: '', tags: [], img: '', badge: '', icon: 'fas fa-star', cls: 'f1', live: '', code: '' };

function ProjectsEd({ value, onChange, token, note }) {
  const list = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(0);
  const setItem = (i, nv) => onChange(list.map((p, j) => (j === i ? nv : p)));
  return (
    <div>
      {list.map((p, i) => (
        <div className="item-box" key={i}>
          <button type="button" className="item-head" onClick={() => setOpen(open === i ? -1 : i)}>
            <strong>{i + 1}. {p.title || '(untitled)'}</strong>
            <span>{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && (
            <div className="item-body">
              <F label="Title" value={p.title} onChange={(v) => setItem(i, { ...p, title: v })} />
              <div className="frow2">
                <div className="field">
                  <label>Category</label>
                  <select value={p.cat} onChange={(e) => setItem(i, { ...p, cat: e.target.value })}>
                    {CATS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
                <F label="Category label" value={p.catLabel} onChange={(v) => setItem(i, { ...p, catLabel: v })} />
              </div>
              <FA label="Description" value={p.desc} onChange={(v) => setItem(i, { ...p, desc: v })} />
              <F label="Tags (comma separated)" value={(p.tags || []).join(', ')}
                onChange={(v) => setItem(i, { ...p, tags: v.split(',').map((t) => t.trim()).filter(Boolean) })} />
              <ImagePicker value={p.img} token={token} note={note}
                onChange={(v) => setItem(i, { ...p, img: v })} />
              {!p.img && (
                <div className="frow2">
                  <div className="field">
                    <label>Fallback icon</label>
                    <select value={p.icon} onChange={(e) => setItem(i, { ...p, icon: e.target.value })}>
                      {ICONS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div className="field">
                    <label>Icon color</label>
                    <select value={p.cls} onChange={(e) => setItem(i, { ...p, cls: e.target.value })}>
                      {COLORS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                </div>
              )}
              <div className="frow2">
                <F label="Badge (e.g. ● Live)" value={p.badge} onChange={(v) => setItem(i, { ...p, badge: v })} />
                <F label="Live demo link" value={p.live} onChange={(v) => setItem(i, { ...p, live: v })} />
              </div>
              <F label="Repo / code link" value={p.code} onChange={(v) => setItem(i, { ...p, code: v })} />
              <button type="button" className="btn btn-danger btn-sm"
                onClick={() => { onChange(list.filter((_, j) => j !== i)); setOpen(-1); }}>
                Delete project
              </button>
            </div>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-line btn-sm"
        onClick={() => { onChange([...list, { ...BLANK_PROJECT }]); setOpen(list.length); }}>
        + Add project
      </button>
    </div>
  );
}

function SkillsEd({ value, onChange }) {
  const list = Array.isArray(value) ? value : [];
  const setCat = (i, nv) => onChange(list.map((c, j) => (j === i ? nv : c)));
  return (
    <div>
      {list.map((c, i) => (
        <div className="item-box" key={i}>
          <F label={`Category ${i + 1} title`} value={c.title}
            onChange={(v) => setCat(i, { ...c, title: v })} />
          {c.bars ? (
            <div>
              {c.bars.map((b, j) => (
                <div className="frow3" key={j}>
                  <F label="Skill" value={b.name}
                    onChange={(v) => setCat(i, { ...c, bars: c.bars.map((x, k) => (k === j ? { ...x, name: v } : x)) })} />
                  <F label="%" type="number" value={b.pct}
                    onChange={(v) => setCat(i, { ...c, bars: c.bars.map((x, k) => (k === j ? { ...x, pct: Number(v) || 0 } : x)) })} />
                  <button type="button" className="btn btn-ghost-dark btn-sm"
                    onClick={() => setCat(i, { ...c, bars: c.bars.filter((_, k) => k !== j) })}>✕</button>
                </div>
              ))}
              <button type="button" className="btn btn-line btn-sm"
                onClick={() => setCat(i, { ...c, bars: [...c.bars, { name: 'New skill', pct: 50 }] })}>
                + Add skill bar
              </button>
            </div>
          ) : (
            <FA label="Tags (comma separated)" rows={2} value={(c.tags || []).join(', ')}
              onChange={(v) => setCat(i, { ...c, tags: v.split(',').map((t) => t.trim()).filter(Boolean) })} />
          )}
          {c.foot !== undefined && (
            <F label="Footer note" value={c.foot} onChange={(v) => setCat(i, { ...c, foot: v })} />
          )}
          <div style={{ marginTop: 8 }}>
            <button type="button" className="btn btn-danger btn-sm"
              onClick={() => onChange(list.filter((_, j) => j !== i))}>Delete category</button>
          </div>
        </div>
      ))}
      <button type="button" className="btn btn-line btn-sm"
        onClick={() => onChange([...list, { icon: 'fas fa-star', cls: 's2', title: 'New Category', tags: [] }])}>
        + Add category
      </button>
    </div>
  );
}

function SimpleListEd({ value, onChange, fields, addLabel }) {
  const list = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState(0);
  return (
    <div>
      {list.map((row, i) => (
        <div className="item-box" key={i}>
          <button type="button" className="item-head" onClick={() => setOpen(open === i ? -1 : i)}>
            <strong>{i + 1}. {row.title || '(untitled)'}</strong>
            <span>{open === i ? '▲' : '▼'}</span>
          </button>
          {open === i && (
            <div className="item-body">
              {fields.map(([k, label]) => (
                <F key={k} label={label} value={row[k]}
                  onChange={(v) => onChange(list.map((r, j) => (j === i ? { ...r, [k]: v } : r)))} />
              ))}
              <button type="button" className="btn btn-danger btn-sm"
                onClick={() => { onChange(list.filter((_, j) => j !== i)); setOpen(-1); }}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
      <button type="button" className="btn btn-line btn-sm"
        onClick={() => { onChange([...list, Object.fromEntries(fields.map(([k]) => [k, '']))]); setOpen(list.length); }}>
        + {addLabel}
      </button>
    </div>
  );
}
