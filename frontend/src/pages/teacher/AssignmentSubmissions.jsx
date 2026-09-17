import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { CheckSquare, Search, Bot, Eye, Clock, Award } from 'lucide-react';

const AssignmentSubmissions = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const submissions = [
    { id: 1, studentName: 'Alex Morgan', rollNo: 'CS-2024-042', assignment: 'Neural Network Backprop', submittedAt: '2026-09-14 18:30', status: 'graded', marks: 95, aiSuggested: 95 },
    { id: 2, studentName: 'Samantha Reed', rollNo: 'CS-2024-015', assignment: 'Neural Network Backprop', submittedAt: '2026-09-14 19:12', status: 'graded', marks: 98, aiSuggested: 98 },
    { id: 3, studentName: 'Devon Patel', rollNo: 'CS-2024-088', assignment: 'Neural Network Backprop', submittedAt: '2026-09-15 11:20', status: 'pending', marks: null, aiSuggested: 84 },
    { id: 4, studentName: 'Marcus Chen', rollNo: 'CS-2024-033', assignment: 'Neural Network Backprop', submittedAt: '2026-09-15 14:05', status: 'pending', marks: null, aiSuggested: 68 },
    { id: 5, studentName: 'Priya Sharma', rollNo: 'CS-2024-059', assignment: 'Neural Network Backprop', submittedAt: '2026-09-15 16:40', status: 'pending', marks: null, aiSuggested: 90 },
    { id: 6, studentName: 'Lucas Scott', rollNo: 'CS-2024-074', assignment: 'Neural Network Backprop', submittedAt: '2026-09-16 09:15', status: 'late', marks: null, aiSuggested: 62 }
  ];

  const filtered = submissions.filter((s) => {
    const matchesFilter = filter === 'all' || s.status === filter;
    const matchesSearch =
      s.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Assignment Submissions</h1>
          <p className="page-subtitle">
            CS301: Assignment 1 (Neural Network Backprop) — Batch evaluate student source code and review AI drafts.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate('/teacher/ai-eval')}
        >
          <Bot size={15} /> Launch AI Batch Evaluator
        </button>
      </div>

      {/* Filter & Search Bar */}
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
            placeholder="Search student or roll no..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'pending', 'graded', 'late'].map((cat) => (
            <button
              key={cat}
              className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(cat)}
              style={{ textTransform: 'capitalize' }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="panel">
        <div className="panel-title">
          <span>Submission Queue ({filtered.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Roll Number</th>
                <th>Submitted On</th>
                <th>AI Score Recommendation</th>
                <th>Current Status</th>
                <th>Assigned Marks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.studentName}</strong>
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>{s.rollNo}</td>
                  <td>{s.submittedAt}</td>
                  <td>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary-600)', fontWeight: 700 }}>
                      <Bot size={14} /> {s.aiSuggested} / 100
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${s.status === 'graded' ? 'badge-success' : s.status === 'late' ? 'badge-danger' : 'badge-warning'}`}>
                      {s.status}
                    </span>
                  </td>
                  <td>
                    <strong>{s.marks !== null ? `${s.marks} pts` : '—'}</strong>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => navigate('/teacher/ai-eval')}
                      title="Open in AI Evaluation Workbench"
                    >
                      <Bot size={13} /> Evaluate
                    </button>
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

export default AssignmentSubmissions;
