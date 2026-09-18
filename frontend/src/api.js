/** Tiny API client for content + admin endpoints. */

export async function fetchContent() {
  const r = await fetch('/api/content');
  if (!r.ok) throw new Error('content failed');
  const j = await r.json();
  const out = {};
  for (const [k, v] of Object.entries(j || {})) {
    try { out[k] = typeof v === 'string' ? JSON.parse(v) : v; }
    catch { /* ignore bad section */ }
  }
  return out;
}

export async function adminLogin(password) {
  const r = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error || 'Login failed');
  return j.token;
}

export async function adminSave(token, section, payload) {
  const r = await fetch(`/api/admin/content/${section}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ payload }),
  });
  const j = await r.json();
  if (!r.ok || !j.ok) throw new Error(j.error || 'Save failed');
}
