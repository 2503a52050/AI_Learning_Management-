import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('student@ailms.com');
  const [password, setPassword] = useState('Demo@123');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        if (res.role === 'teacher') navigate('/teacher');
        else if (res.role === 'admin') navigate('/admin');
        else navigate('/student');
      }
    } catch (err) {
      setError(err.message || 'Invalid credentials. Please verify your email and password.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickLogin = (demoEmail, role) => {
    setEmail(demoEmail);
    setPassword('Demo@123');
    login(demoEmail, 'Demo@123', role).then((res) => {
      if (res.role === 'teacher') navigate('/teacher');
      else if (res.role === 'admin') navigate('/admin');
      else navigate('/student');
    });
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-left">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="brand-icon">
                <GraduationCap size={24} />
              </div>
              <span>EduPulse<span className="brand-accent">AI</span></span>
            </div>
            <h2>Welcome Back</h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: 4 }}>
              Sign in to your intelligent learning & analytics portal
            </p>
          </div>

          {error && (
            <div style={{
              background: 'var(--rose-50)',
              color: 'var(--rose-600)',
              padding: '12px 16px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: 16,
              border: '1px solid #fecdd3'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@college.edu"
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="password">Password</label>
                <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Demo reset link sent to registered email.'); }} style={{ fontSize: '0.8rem', color: 'var(--primary-600)', textDecoration: 'none' }}>
                  Forgot?
                </a>
              </div>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 8 }}
              disabled={submitting}
            >
              {submitting ? 'Signing In...' : 'Sign In to Workspace'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-demo-chips">
            <p style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--slate-500)', textAlign: 'center', textTransform: 'uppercase' }}>
              One-Click Demo Credentials
            </p>
            <div className="demo-btn-group">
              <button
                type="button"
                className="demo-chip-btn"
                onClick={() => handleQuickLogin('student@ailms.com', 'student')}
              >
                🎓 Student
              </button>
              <button
                type="button"
                className="demo-chip-btn"
                onClick={() => handleQuickLogin('teacher@ailms.com', 'teacher')}
              >
                👨‍🏫 Teacher
              </button>
              <button
                type="button"
                className="demo-chip-btn"
                onClick={() => handleQuickLogin('admin@ailms.com', 'admin')}
              >
                ⚙️ Admin
              </button>
            </div>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: 24 }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary-600)', fontWeight: 600, textDecoration: 'none' }}>
              Register Here
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-split-right">
        <div style={{ maxWidth: 480, zIndex: 2 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(255,255,255,0.15)',
            padding: '6px 14px',
            borderRadius: 999,
            fontSize: '0.825rem',
            marginBottom: 24
          }}>
            <Sparkles size={16} />
            AI-Driven Educational Intelligence
          </div>

          <h1 style={{ fontSize: '2.5rem', lineHeight: 1.2, marginBottom: 18, color: 'white' }}>
            Elevate Learning with Real-Time Analytics
          </h1>

          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: 32 }}>
            Empower students, faculty, and academic leadership with automated rubric evaluation, personalized study trajectories, and early warning risk indicators.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: '50%' }}>
                <CheckCircle2 size={16} color="#34d399" />
              </div>
              <span style={{ fontSize: '0.95rem' }}>Personalized weak-topic remediation pathways</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: '50%' }}>
                <CheckCircle2 size={16} color="#34d399" />
              </div>
              <span style={{ fontSize: '0.95rem' }}>AI-assisted automated code & essay evaluation</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: '50%' }}>
                <CheckCircle2 size={16} color="#34d399" />
              </div>
              <span style={{ fontSize: '0.95rem' }}>Cohort-level performance & attendance correlation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
