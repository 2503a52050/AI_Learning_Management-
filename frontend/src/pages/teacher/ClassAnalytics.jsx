import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import PerformanceChart from '../../components/student/PerformanceChart';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import { BarChart3, Users, Award, TrendingUp, AlertTriangle } from 'lucide-react';

const ClassAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getClassAnalytics();
      setAnalytics(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch class analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner message="Aggregating classroom telemetry & topic mastery heatmaps..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAnalytics} />;
  if (!analytics) return null;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Class Analytics & Cohort Telemetry</h1>
          <p className="page-subtitle">
            CS301: Artificial Intelligence — Diagnostic score distributions, topic mastery, and attendance impact.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Cohort Mean Score"
          value="78.4%"
          trend="+3.2% vs previous term"
          trendType="positive"
          color="primary"
          icon={Award}
        />
        <DashboardCard
          title="Pass Rate"
          value="94.2%"
          trend="121 / 128 Students"
          trendType="positive"
          color="emerald"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Attendance Correlation"
          value="0.84 (High)"
          subtitle="Strong attendance boosts grades"
          color="purple"
          icon={Users}
        />
        <DashboardCard
          title="Topics Needing Review"
          value="1 Unit"
          subtitle="Reinforcement Learning (<65%)"
          color="amber"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid-2col">
        {/* Grade Distribution */}
        <div className="panel">
          <div className="panel-title">
            <span>Grade Bracket Distribution</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>128 Enrolled</span>
          </div>

          <PerformanceChart
            data={analytics.gradeDistribution}
            type="bar"
            dataKey="count"
            xAxisKey="grade"
            dataName="Students"
            color="#4f46e5"
            height={260}
          />
        </div>

        {/* Attendance vs Performance */}
        <div className="panel">
          <div className="panel-title">
            <span>Attendance vs Average Grade Correlation</span>
          </div>

          <PerformanceChart
            data={analytics.attendanceCorrelation}
            type="bar"
            dataKey="avgScore"
            xAxisKey="attendanceRange"
            dataName="Avg Score"
            color="#10b981"
            height={260}
          />
        </div>
      </div>

      {/* Topic Mastery Heatmap Table */}
      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-title">
          <span>Curriculum Unit Mastery & Friction Points</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Classroom average score per module
          </span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Syllabus Topic</th>
                <th>Classroom Mastery</th>
                <th>Diagnostic Meter</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {analytics.topicMastery.map((tm) => (
                <tr key={tm.topic}>
                  <td style={{ fontWeight: 600 }}>{tm.topic}</td>
                  <td>
                    <strong>{tm.mastery}%</strong>
                  </td>
                  <td style={{ minWidth: 160 }}>
                    <div className="meter-bar">
                      <div
                        className={`meter-fill ${tm.mastery >= 80 ? 'emerald' : tm.mastery >= 70 ? 'primary' : 'amber'}`}
                        style={{ width: `${tm.mastery}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    {tm.mastery >= 80 ? (
                      <span className="badge badge-success">Well Grasped</span>
                    ) : tm.mastery >= 70 ? (
                      <span className="badge badge-info">Adequate</span>
                    ) : (
                      <span className="badge badge-warning">Revision Advised</span>
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

export default ClassAnalytics;
