import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import { CalendarCheck, AlertTriangle, CheckCircle2, UserCheck, ShieldAlert } from 'lucide-react';

const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttendance = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAttendance();
      setRecords(data);
    } catch (err) {
      setError(err.message || 'Failed to load attendance records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating cumulative attendance logs & compliance..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAttendance} />;

  const totalClasses = records.reduce((sum, r) => sum + r.totalClasses, 0);
  const attendedClasses = records.reduce((sum, r) => sum + r.attendedClasses, 0);
  const overallPercentage = totalClasses ? Math.round((attendedClasses / totalClasses) * 100) : 0;
  const atRiskCount = records.filter((r) => r.percentage < 75).length;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Attendance Tracking & Compliance</h1>
          <p className="page-subtitle">
            Monitor lecture presence, prevent exam debarment, and track attendance thresholds in real time.
          </p>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="stats-grid">
        <DashboardCard
          title="Overall Attendance"
          value={`${overallPercentage}%`}
          trend={overallPercentage >= 75 ? 'Meets 75% Requirement' : 'Below Mandatory Threshold'}
          trendType={overallPercentage >= 75 ? 'positive' : 'negative'}
          color={overallPercentage >= 75 ? 'emerald' : 'rose'}
          icon={CalendarCheck}
        />
        <DashboardCard
          title="Total Lectures Attended"
          value={`${attendedClasses} / ${totalClasses}`}
          subtitle={`${totalClasses - attendedClasses} Total Absences`}
          color="primary"
          icon={UserCheck}
        />
        <DashboardCard
          title="Compliant Courses"
          value={records.length - atRiskCount}
          subtitle="Above 75% Safe Threshold"
          color="emerald"
          icon={CheckCircle2}
        />
        <DashboardCard
          title="Courses Requiring Attention"
          value={atRiskCount}
          subtitle={atRiskCount > 0 ? 'Action Needed to Avoid Penalty' : 'All Clear'}
          color={atRiskCount > 0 ? 'rose' : 'emerald'}
          icon={atRiskCount > 0 ? ShieldAlert : CheckCircle2}
        />
      </div>

      {atRiskCount > 0 && (
        <div
          style={{
            background: 'var(--amber-50)',
            border: '1px solid #fde68a',
            padding: '16px 20px',
            borderRadius: 12,
            marginBottom: 24,
            display: 'flex',
            alignItems: 'center',
            gap: 14
          }}
        >
          <AlertTriangle size={24} style={{ color: 'var(--amber-600)', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: 'var(--amber-800)', fontSize: '0.95rem', marginBottom: 2 }}>
              Low Attendance Warning
            </h4>
            <p style={{ color: 'var(--amber-700)', fontSize: '0.85rem' }}>
              Your attendance in <strong>Discrete Mathematics</strong> is currently at 70% (minimum 75% required by University regulation). Attending the next 3 consecutive lectures will restore your eligibility.
            </p>
          </div>
        </div>
      )}

      {/* Attendance Grid by Course */}
      <div className="panel">
        <div className="panel-title">
          <span>Subject-Wise Attendance Breakdown</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Minimum Mandatory: 75%
          </span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Course Faculty</th>
                <th>Lectures Held</th>
                <th>Attended</th>
                <th>Percentage</th>
                <th>Attendance Health</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map((r) => (
                <tr key={r.course}>
                  <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>{r.course}</td>
                  <td style={{ color: 'var(--slate-500)' }}>{r.faculty}</td>
                  <td>{r.totalClasses}</td>
                  <td>
                    <strong>{r.attendedClasses}</strong>
                  </td>
                  <td>
                    <strong style={{ color: r.percentage < 75 ? 'var(--rose-600)' : 'var(--slate-900)' }}>
                      {r.percentage}%
                    </strong>
                  </td>
                  <td style={{ minWidth: 140 }}>
                    <div className="meter-bar">
                      <div
                        className={`meter-fill ${r.percentage >= 85 ? 'emerald' : r.percentage >= 75 ? 'amber' : 'rose'}`}
                        style={{ width: `${r.percentage}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    {r.percentage >= 85 ? (
                      <span className="badge badge-success">Good</span>
                    ) : r.percentage >= 75 ? (
                      <span className="badge badge-warning">Warning</span>
                    ) : (
                      <span className="badge badge-danger">Critical</span>
                    )}
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

export default Attendance;
