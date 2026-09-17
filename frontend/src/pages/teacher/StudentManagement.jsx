import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { Users, Search, Filter, AlertTriangle, CheckCircle2, Eye, X } from 'lucide-react';

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getTeacherStudents();
      setStudents(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch student roster.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = students.filter((s) => {
    const matchesFilter = filter === 'all' || s.status.toLowerCase().includes(filter.toLowerCase());
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <LoadingSpinner message="Fetching classroom roster and academic risk profiles..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchStudents} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Management & Roster</h1>
          <p className="page-subtitle">
            Track individual progress, identify students requiring intervention, and review attendance adherence.
          </p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'white',
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid var(--slate-200)',
            width: 300
          }}
        >
          <Search size={16} color="var(--slate-400)" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'Top Performer', 'Average', 'At Risk'].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Student Table */}
      <div className="panel">
        <div className="panel-title">
          <span>Enrolled Class Roster ({filtered.length} Students)</span>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No matching students"
            description="No students matched your search criteria."
            actionLabel="Reset Search"
            onAction={() => { setSearchTerm(''); setFilter('all'); }}
          />
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Email</th>
                  <th>Average Marks</th>
                  <th>Attendance</th>
                  <th>Status</th>
                  <th>Risk Level</th>
                  <th>Action</th>
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
                      <strong>{s.avgMarks}%</strong>
                    </td>
                    <td>
                      <span style={{ color: s.attendance < 75 ? 'var(--rose-600)' : 'var(--slate-700)', fontWeight: 600 }}>
                        {s.attendance}%
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${s.status === 'Top Performer' ? 'badge-success' : s.status === 'At Risk' ? 'badge-danger' : 'badge-warning'}`}>
                        {s.status}
                      </span>
                    </td>
                    <td>
                      <span style={{ color: s.risk === 'High' ? 'var(--rose-600)' : 'var(--emerald-600)', fontWeight: 600, fontSize: '0.8rem' }}>
                        ● {s.risk} Risk
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => setSelectedStudent(s)}
                      >
                        <Eye size={14} /> Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="modal-overlay" onClick={() => setSelectedStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Student Academic Portfolio</h3>
              <button
                className="icon-btn"
                onClick={() => setSelectedStudent(null)}
                style={{ border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div className="avatar" style={{ width: 50, height: 50 }}>
                {selectedStudent.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h4>{selectedStudent.name}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--slate-500)' }}>
                  Roll: {selectedStudent.rollNo} · {selectedStudent.email}
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
              <div style={{ padding: 12, background: 'var(--slate-50)', borderRadius: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'block' }}>Average Marks</span>
                <strong style={{ fontSize: '1.2rem', color: 'var(--primary-600)' }}>{selectedStudent.avgMarks}%</strong>
              </div>
              <div style={{ padding: 12, background: 'var(--slate-50)', borderRadius: 8 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)', display: 'block' }}>Attendance Health</span>
                <strong style={{ fontSize: '1.2rem', color: selectedStudent.attendance < 75 ? 'var(--rose-600)' : 'var(--emerald-600)' }}>
                  {selectedStudent.attendance}%
                </strong>
              </div>
            </div>

            <div style={{ background: 'var(--primary-50)', padding: 14, borderRadius: 8, marginBottom: 20 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-700)', display: 'block', marginBottom: 4 }}>
                AI Intervention Recommendation:
              </span>
              <p style={{ fontSize: '0.85rem', color: 'var(--primary-800)', lineHeight: 1.5 }}>
                {selectedStudent.risk === 'High'
                  ? 'Attendance is below 75% and test scores reflect struggle with core concepts. Immediate 1-on-1 counseling and remedial practice assignments recommended.'
                  : 'Consistent performance with high aptitude in practical assessments. Recommend for advanced challenge modules.'}
              </p>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={() => {
                alert(`Sent check-in email to ${selectedStudent.email}`);
                setSelectedStudent(null);
              }}
            >
              Send Check-In Message to Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;
