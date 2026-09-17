import React from 'react';

const MarksTable = ({ marks = [], showBreakdown = true }) => {
  const getGradeBadge = (grade) => {
    if (['A+', 'A'].includes(grade)) return 'badge-success';
    if (['B+', 'B'].includes(grade)) return 'badge-info';
    if (['C+', 'C'].includes(grade)) return 'badge-warning';
    return 'badge-danger';
  };

  const getMeterColor = (score) => {
    if (score >= 85) return 'emerald';
    if (score >= 70) return 'primary';
    if (score >= 60) return 'amber';
    return 'rose';
  };

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th>Course / Subject</th>
            <th>Code</th>
            {showBreakdown && (
              <>
                <th>Internal (20)</th>
                <th>Midterm (30)</th>
                <th>Final Exam (50)</th>
              </>
            )}
            <th>Total Score</th>
            <th>Performance</th>
            <th>Grade</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((row) => (
            <tr key={row.id || row.code}>
              <td>
                <div style={{ fontWeight: 600, color: 'var(--slate-900)' }}>
                  {row.subject}
                </div>
                {row.credits && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>
                    {row.credits} Credits
                  </div>
                )}
              </td>
              <td>
                <span style={{ fontFamily: 'monospace', fontWeight: 600, color: 'var(--slate-600)' }}>
                  {row.code}
                </span>
              </td>
              {showBreakdown && (
                <>
                  <td>{row.internal ?? '—'}</td>
                  <td>{row.midterm ?? '—'}</td>
                  <td>{row.final ?? '—'}</td>
                </>
              )}
              <td>
                <strong style={{ fontSize: '0.95rem', color: 'var(--slate-900)' }}>
                  {row.total}
                </strong>{' '}
                <span style={{ color: 'var(--slate-400)', fontSize: '0.8rem' }}>/ {row.max || 100}</span>
              </td>
              <td style={{ minWidth: 120 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div className="meter-bar">
                    <div
                      className={`meter-fill ${getMeterColor(row.total)}`}
                      style={{ width: `${Math.min(100, row.total)}%` }}
                    />
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--slate-600)' }}>
                    {row.total}%
                  </span>
                </div>
              </td>
              <td>
                <span className={`badge ${getGradeBadge(row.grade)}`}>
                  {row.grade}
                </span>
              </td>
              <td>
                <span style={{ fontSize: '0.825rem', fontWeight: 600, color: row.status === 'Passed' ? 'var(--emerald-600)' : 'var(--rose-600)' }}>
                  ● {row.status || 'Passed'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarksTable;
