import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { BookOpen, Search, UserCheck, Award, Star } from 'lucide-react';

const AdminTeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTeachers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAdminTeachers();
      setTeachers(data);
    } catch (err) {
      setError(err.message || 'Unable to load faculty records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const filtered = teachers.filter(
    (t) =>
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Querying academic faculty assignments..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchTeachers} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Faculty & Instructor Directory</h1>
          <p className="page-subtitle">
            Manage professorial appointments, teaching loads, and department affiliations.
          </p>
        </div>
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
          placeholder="Search by faculty name or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
        />
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>Active Academic Faculty ({filtered.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Faculty Member</th>
                <th>Department</th>
                <th>Active Courses</th>
                <th>Students Supervised</th>
                <th>Student Rating</th>
                <th>Faculty Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t) => (
                <tr key={t.id}>
                  <td>
                    <strong>{t.name}</strong>
                  </td>
                  <td style={{ color: 'var(--slate-600)' }}>{t.department}</td>
                  <td>
                    <span className="badge badge-info">{t.courses} Courses</span>
                  </td>
                  <td>
                    <strong>{t.students}</strong>
                  </td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 700, color: 'var(--amber-600)' }}>
                      <Star size={14} fill="currentColor" /> {t.rating} / 5.0
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Active Appointment</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTeacherManagement;
