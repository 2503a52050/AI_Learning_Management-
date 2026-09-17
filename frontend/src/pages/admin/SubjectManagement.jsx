import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Layers, Plus, Search, BookOpen, X, CheckCircle2 } from 'lucide-react';

const SubjectManagement = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: 'Computer Science',
    credits: 4,
    teacher: 'Dr. Robert Vance'
  });

  const fetchSubjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getSubjects();
      setSubjects(data);
    } catch (err) {
      setError(err.message || 'Unable to load subjects catalog.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await mockService.createSubject(formData);
      setShowModal(false);
      setFormData({
        code: '',
        name: '',
        department: 'Computer Science',
        credits: 4,
        teacher: 'Dr. Robert Vance'
      });
      fetchSubjects();
    } catch (err) {
      alert('Error adding subject: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  const filtered = subjects.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading course curriculum catalog..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchSubjects} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Subject & Curriculum Management</h1>
          <p className="page-subtitle">
            Accredited course units, syllabus credit allocation, and faculty instructor assignments.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Add New Subject
        </button>
      </div>

      {/* Search Input */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'white',
          padding: '8px 14px',
          borderRadius: 8,
          border: '1px solid var(--slate-200)',
          maxWidth: 320,
          marginBottom: 18
        }}
      >
        <Search size={16} color="var(--slate-400)" />
        <input
          type="text"
          placeholder="Search subjects or codes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
        />
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>Accredited Curriculum Subjects ({filtered.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Subject Code</th>
                <th>Subject Title</th>
                <th>Academic Department</th>
                <th>Credits</th>
                <th>Lead Faculty</th>
                <th>Enrolled Students</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontFamily: 'monospace', fontWeight: 700, color: 'var(--primary-600)' }}>
                    {s.code}
                  </td>
                  <td>
                    <strong>{s.name}</strong>
                  </td>
                  <td style={{ color: 'var(--slate-600)' }}>{s.department}</td>
                  <td>
                    <span className="badge badge-info">{s.credits} Credits</span>
                  </td>
                  <td>{s.teacher}</td>
                  <td>
                    <strong>{s.enrolled}</strong>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Accredited Subject</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)} style={{ border: 'none' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Subject Code</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="CS402"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Subject Title</label>
                  <input
                    type="text"
                    className="form-control"
                    required
                    placeholder="Distributed Cloud Architectures"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electronics & Comm.">Electronics & Comm.</option>
                    <option value="Mathematics">Mathematics</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Credits</label>
                  <input
                    type="number"
                    className="form-control"
                    min={1}
                    max={6}
                    value={formData.credits}
                    onChange={(e) => setFormData({ ...formData, credits: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Assigned Faculty Instructor</label>
                <select
                  className="form-control"
                  value={formData.teacher}
                  onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                >
                  <option value="Dr. Robert Vance">Dr. Robert Vance</option>
                  <option value="Prof. Anita Sharma">Prof. Anita Sharma</option>
                  <option value="Prof. Sarah Lin">Prof. Sarah Lin</option>
                  <option value="Prof. Mark Jensen">Prof. Mark Jensen</option>
                  <option value="Prof. David Miller">Prof. David Miller</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={creating}
                >
                  {creating ? 'Saving...' : 'Add Subject to Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectManagement;
