import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { GraduationCap, Search, Download, CheckCircle2, UserCheck } from 'lucide-react';

const AdminStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAdminStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Unable to load student database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Querying registrar student records..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStudents} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Registry & Enrollment Management</h1>
          <p className="page-subtitle">
            Institution-wide student records, matriculation standings, and academic clearance status.
          </p>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={() => alert('Official student roster exported to spreadsheet.')}
        >
          <Download size={14} /> Export Student Roster
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
          placeholder="Filter by name or roll number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
        />
      </div>

      <div className="panel">
        <div className="panel-title">
          <span>Enrolled Undergraduate Students ({filtered.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Institutional Email</th>
                <th>Cumulative GPA</th>
                <th>Attendance</th>
                <th>Standing</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.name}</strong>
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>{s.rollNo}</td>
                  <td style={{ color: 'var(--slate-500)' }}>{s.email}</td>
                  <td>
                    <strong style={{ color: 'var(--primary-600)' }}>{(s.avgMarks / 25).toFixed(2)} / 4.0</strong>
                  </td>
                  <td>
                    <span style={{ color: s.attendance < 75 ? 'var(--rose-600)' : 'var(--emerald-600)', fontWeight: 600 }}>
                      {s.attendance}%
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${s.status === 'Top Performer' ? 'badge-success' : s.status === 'At Risk' ? 'badge-danger' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Good Standing</span>
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

export default AdminStudentManagement;
