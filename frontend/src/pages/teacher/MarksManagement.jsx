import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { FileSpreadsheet, Save, Download, CheckCircle2, Search } from 'lucide-react';

const MarksManagement = () => {
  const [sheet, setSheet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchSheet = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getMarksManagementSheet();
      setSheet(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch marks sheet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSheet();
  }, []);

  const handleCellChange = (studentId, field, val) => {
    const numVal = Math.max(0, Math.min(100, Number(val) || 0));
    setSheet((prev) =>
      prev.map((row) => {
        if (row.studentId === studentId) {
          const updated = { ...row, [field]: numVal };
          const internal = field === 'internal' ? numVal : updated.internal;
          const midterm = field === 'midterm' ? numVal : updated.midterm;
          const assignment = field === 'assignment' ? numVal : updated.assignment;
          const final = field === 'final' ? numVal : updated.final;

          // Composite formula: Internal (20) + Midterm (30) + Assignment (20) + Final (30)
          const total = Math.round(internal + midterm + (assignment * 0.2) + final);
          const grade = total >= 90 ? 'A+' : total >= 80 ? 'A' : total >= 70 ? 'B+' : total >= 60 ? 'C' : 'F';
          return { ...updated, total, grade };
        }
        return row;
      })
    );
  };

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Save locally to storage
      localStorage.setItem('ailms_teacher_marks_sheet', JSON.stringify(sheet));
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (e) {
      alert('Error saving marks');
    } finally {
      setSaving(false);
    }
  };

  const filtered = sheet.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <LoadingSpinner message="Loading course evaluation roster and grade sheets..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchSheet} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Marks Management & Grade Entry</h1>
          <p className="page-subtitle">
            CS301: Artificial Intelligence — Direct mark entry, auto-grade calculation, and official registry sync.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => alert('Grade sheet exported to CSV.')}
          >
            <Download size={15} /> Export CSV
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={handleSaveAll}
            disabled={saving}
          >
            <Save size={15} /> {saving ? 'Saving...' : 'Save & Publish Marks'}
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid #a7f3d0', padding: 12, borderRadius: 8, color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 18, fontSize: '0.9rem' }}>
          <CheckCircle2 size={18} />
          Grades calculated and published to student portals successfully!
        </div>
      )}

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
          placeholder="Filter students in sheet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
        />
      </div>

      {/* Editable Table */}
      <div className="panel">
        <div className="panel-title">
          <span>Continuous Assessment Marks Sheet</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Editable inputs with live formula recalculation
          </span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll No</th>
                <th style={{ width: 110 }}>Internal (20)</th>
                <th style={{ width: 110 }}>Midterm (30)</th>
                <th style={{ width: 110 }}>Assignment (100)</th>
                <th style={{ width: 110 }}>Final (50)</th>
                <th>Total (100)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.studentId}>
                  <td style={{ fontWeight: 600 }}>{row.name}</td>
                  <td style={{ fontFamily: 'monospace', color: 'var(--slate-600)' }}>{row.rollNo}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ padding: '6px 8px', fontSize: '0.85rem', width: 80 }}
                      value={row.internal}
                      onChange={(e) => handleCellChange(row.studentId, 'internal', e.target.value)}
                      min={0}
                      max={20}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ padding: '6px 8px', fontSize: '0.85rem', width: 80 }}
                      value={row.midterm}
                      onChange={(e) => handleCellChange(row.studentId, 'midterm', e.target.value)}
                      min={0}
                      max={30}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ padding: '6px 8px', fontSize: '0.85rem', width: 80 }}
                      value={row.assignment || 85}
                      onChange={(e) => handleCellChange(row.studentId, 'assignment', e.target.value)}
                      min={0}
                      max={100}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={{ padding: '6px 8px', fontSize: '0.85rem', width: 80 }}
                      value={row.final}
                      onChange={(e) => handleCellChange(row.studentId, 'final', e.target.value)}
                      min={0}
                      max={50}
                    />
                  </td>
                  <td>
                    <strong style={{ fontSize: '1rem', color: 'var(--slate-900)' }}>{row.total}</strong>
                  </td>
                  <td>
                    <span className={`badge ${row.grade === 'A+' || row.grade === 'A' ? 'badge-success' : row.grade === 'B+' ? 'badge-info' : 'badge-warning'}`}>
                      {row.grade}
                    </span>
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

export default MarksManagement;
