import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { User, Mail, Phone, BookOpen, Award, CheckCircle2, Save } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bio: 'Junior CSE undergraduate enthusiastic about deep learning systems, distributed algorithms, and web scalability.'
  });

  const fetchProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getStudentProfile();
      setProfile(data);
      setFormData({
        name: data.name,
        phone: data.phone || '+1 (555) 234-5678',
        bio: data.bio || 'Junior CSE undergraduate enthusiastic about deep learning systems, distributed algorithms, and web scalability.'
      });
    } catch (err) {
      setError(err.message || 'Unable to load profile data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await mockService.updateStudentProfile(formData);
      setProfile(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert('Error updating profile: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading student identity and academic portfolio..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchProfile} />;
  if (!profile) return null;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Profile</h1>
          <p className="page-subtitle">
            Manage your personal details, verified academic credentials, and contact preferences.
          </p>
        </div>
      </div>

      <div className="grid-2col">
        {/* Left Column: Editable Profile Card */}
        <div className="panel">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24, paddingBottom: 20, borderBottom: '1px solid var(--slate-100)' }}>
            <div className="avatar" style={{ width: 68, height: 68, fontSize: '1.5rem' }}>
              {profile.avatar || 'AM'}
            </div>
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--slate-900)' }}>{profile.name}</h2>
              <p style={{ color: 'var(--slate-500)', fontSize: '0.875rem' }}>
                {profile.department} · {profile.semester}
              </p>
              <span className="badge badge-success" style={{ marginTop: 6 }}>
                Active Matriculation
              </span>
            </div>
          </div>

          {saveSuccess && (
            <div style={{ background: 'var(--emerald-50)', border: '1px solid #a7f3d0', padding: 12, borderRadius: 8, color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: '0.875rem' }}>
              <CheckCircle2 size={18} />
              Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address (Academic)</label>
              <input
                type="email"
                className="form-control"
                value={profile.email}
                disabled
                style={{ background: 'var(--slate-100)', color: 'var(--slate-500)' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Academic Bio & Goals</label>
              <textarea
                className="form-control"
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
              style={{ width: '100%' }}
            >
              <Save size={16} />
              {saving ? 'Saving Changes...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Right Column: Academic Standing & Enrolled Courses */}
        <div>
          <div className="panel" style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: 16 }}>Academic Standing</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Roll Number:</span>
                <strong style={{ fontFamily: 'monospace' }}>{profile.rollNumber}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Cumulative GPA:</span>
                <strong style={{ color: 'var(--emerald-600)' }}>{profile.cgpa} / 4.00</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, borderBottom: '1px solid var(--slate-100)' }}>
                <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Admitted Term:</span>
                <strong>{profile.joinedDate}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--slate-600)', fontSize: '0.875rem' }}>Degree Program:</span>
                <strong>B.S. in Computer Science & AI</strong>
              </div>
            </div>
          </div>

          <div className="panel">
            <h3 style={{ fontSize: '1.05rem', marginBottom: 14 }}>Active Course Registrations</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['CS301: Artificial Intelligence', 'CS204: Data Structures & Algorithms', 'CS305: Database Systems', 'CS310: Computer Networks', 'MA202: Discrete Mathematics'].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.85rem', color: 'var(--slate-700)' }}>
                  <BookOpen size={16} color="var(--primary-600)" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
