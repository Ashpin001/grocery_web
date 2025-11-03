import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const url = isRegister ? '/api/users/register' : '/api/users/login';
      const body = isRegister ? { name, email, password } : { email, password };
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const err = await res.json(); alert(err.message || (isRegister ? 'Register failed' : 'Login failed')); return; }
      const data = await res.json();
      if (data.token) localStorage.setItem('token', data.token);
      if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) { console.error(err); alert('Authentication error'); }
  }

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 480, margin: '24px auto' }}>
        <h2 className="page-title">{isRegister ? 'Create account' : 'Login'}</h2>
        <form onSubmit={submit}>
          {isRegister && (
            <div style={{ marginBottom: 12 }}>
              <label className="text-sm">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }} />
            </div>
          )}
          <div style={{ marginBottom: 12 }}>
            <label className="text-sm">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label className="text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 8, marginTop: 6 }} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button type="submit" className="btn">{isRegister ? 'Create account' : 'Login'}</button>
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="btn" style={{ background: '#6b7280' }}>
              {isRegister ? 'Have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
