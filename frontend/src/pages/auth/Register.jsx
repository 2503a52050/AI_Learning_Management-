import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, ArrowRight, CheckCircle2 } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    department: 'Computer Science & AI',
    rollNumber: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await register(formData);
      if (res.success) {
        if (res.role === 'teacher') navigate('/teacher');
        else if (res.role === 'admin') navigate('/admin');
        else navigate('/student');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-left" style={{ padding: '30px 20px' }}>
        <div className="auth-card" style={{ maxWidth: 480 }}>
          <div className="auth-header" style={{ marginBottom: 20 }}>
            <div className="auth-logo">
              <div className="brand-icon">
                <GraduationCap size={24} />
              </div>
              <span>EduPulse<span className="brand-accent">AI</span></span>
            </div>
            <h2>Create New Account</h2>
            <p style={{ color: 'var(--slate-500)', fontSize: '0.9rem', marginTop: 4 }}>
              Join EduPulse AI for personalized learning analytics
            </p>
          </div>

          {error && (
            <div style={{
              background: 'var(--rose-50)',
              color: 'var(--rose-600)',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: 14,
              border: '1px solid #fecdd3'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Alex Morgan"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-email">Email Address</label>
              <input
                id="reg-email"
                name="email"
                type="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="alex.morgan@college.edu"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="reg-password">Password</label>
              <input
                id="reg-password"
                name="password"
                type="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create a strong password"
                minLength={6}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="form-group">
                <label className="form-label" htmlFor="role">Account Role</label>
                <select
                  id="role"
                  name="role"
                  className="form-control"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher / Faculty</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="department">Department</label>
                <select
                  id="department"
                  name="department"
                  className="form-control"
                  value={formData.department}
                  onChange={handleChange}
                >
                  <option value="Computer Science & AI">Computer Science & AI</option>
                  <option value="Information Technology">Information Technology</option>
                  <option value="Electronics & Comm.">Electronics & Comm.</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 6 }}
              disabled={submitting}
            >
              {submitting ? 'Creating Profile...' : 'Complete Registration'}
              <ArrowRight size={16} />
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--slate-500)', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary-600)', fontWeight: 600, textDecoration: 'none' }}>
              Sign In Instead
            </Link>
          </p>
        </div>
      </div>

      <div className="auth-split-right">
        <div style={{ maxWidth: 460 }}>
          <h2 style={{ fontSize: '2.2rem', color: 'white', marginBottom: 16 }}>
            Start Your Academic Supercharge
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: 28 }}>
            Real-time insights on your marks, topic masteries, assignment submissions, and attendance safety alerts.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={18} color="#34d399" />
              <span>Instant AI rubric breakdown on all homework code</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={18} color="#34d399" />
              <span>Personalized exam prediction and topic drills</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <CheckCircle2 size={18} color="#34d399" />
              <span>Direct feedback pipeline with course instructors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
