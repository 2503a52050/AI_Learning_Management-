import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import PerformanceChart from '../../components/student/PerformanceChart';
import RecommendationCard from '../../components/student/RecommendationCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import {
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Layers,
  Compass,
  Zap
} from 'lucide-react';

const PerformanceAnalytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAnalytics = async (shouldFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mockService.getPerformanceAnalytics(shouldFail);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to load performance analytics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading) return <LoadingSpinner message="Synthesizing multi-topic performance models & trend projections..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchAnalytics(false)} />;
  if (!data) return null;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Performance Analytics</h1>
          <p className="page-subtitle">
            Fine-grained topic-level proficiency, learning curve velocity, and AI diagnostic recommendations.
          </p>
        </div>

        <button
          className="btn btn-outline btn-sm"
          onClick={() => fetchAnalytics(true)}
          title="Test retry mechanism"
        >
          Simulate Error
        </button>
      </div>

      {/* Top Stat Metrics */}
      <div className="stats-grid">
        <DashboardCard
          title="Overall Proficiency"
          value={`${data.overallPercentage}%`}
          trend="Calculated across 6 courses"
          trendType="positive"
          color="primary"
          icon={Award}
        />
        <DashboardCard
          title="Improvement Percentage"
          value={`+${data.improvementPercentage}%`}
          trend="Velocity since Term 1"
          trendType="positive"
          color="emerald"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Strong Topics Count"
          value={data.strongTopics.length}
          subtitle="Score >= 85%"
          color="sky"
          icon={CheckCircle2}
        />
        <DashboardCard
          title="Weak Topics Flagged"
          value={data.weakTopics.length}
          subtitle="Requires Remediation (<70%)"
          color="rose"
          icon={AlertCircle}
        />
      </div>

      {/* Main Charts: Subject-Wise Marks & Performance Trend */}
      <div className="grid-2col">
        {/* Subject-Wise Marks Bar Chart */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Layers size={18} style={{ color: 'var(--primary-600)' }} />
              Subject-Wise Marks vs Benchmark
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
              Actual vs Target Score
            </span>
          </div>

          <PerformanceChart
            data={data.subjectWiseMarks}
            type="bar"
            dataKey="marks"
            secondaryKey="target"
            xAxisKey="subject"
            dataName="My Marks"
            secondaryName="Target Score"
            color="#4f46e5"
            secondaryColor="#cbd5e1"
            height={280}
          />
        </div>

        {/* Multi-Term Performance Trend */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={18} style={{ color: 'var(--emerald-600)' }} />
              Performance Trend (Velocity)
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
              Student vs Cohort
            </span>
          </div>

          <PerformanceChart
            data={data.performanceTrend}
            type="line"
            dataKey="studentScore"
            secondaryKey="classAverage"
            xAxisKey="term"
            dataName="Your Trajectory"
            secondaryName="Cohort Mean"
            color="#10b981"
            secondaryColor="#94a3b8"
            height={280}
          />
        </div>
      </div>

      {/* Strong Topics vs Weak Topics Grid */}
      <div className="grid-equal-2col">
        {/* Strong Topics */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={18} style={{ color: 'var(--emerald-600)' }} />
              Strong Topics (Demonstrated Mastery)
            </span>
            <span className="badge badge-success">High Confidence</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.strongTopics.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'var(--emerald-50)',
                  border: '1px solid #a7f3d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    {item.subject}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 80 }} className="meter-bar">
                    <div className="meter-fill emerald" style={{ width: `${item.marks}%` }} />
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--emerald-600)', fontSize: '0.95rem' }}>
                    {item.marks}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={18} style={{ color: 'var(--rose-600)' }} />
              Weak Topics (Targeted Remediation)
            </span>
            <span className="badge badge-danger">Immediate Action</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.weakTopics.map((item) => (
              <div
                key={item.name}
                style={{
                  padding: '12px 14px',
                  borderRadius: 10,
                  background: 'var(--rose-50)',
                  border: '1px solid #fecdd3',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    {item.subject}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 80 }} className="meter-bar">
                    <div className="meter-fill rose" style={{ width: `${item.marks}%` }} />
                  </div>
                  <span style={{ fontWeight: 800, color: 'var(--rose-600)', fontSize: '0.95rem' }}>
                    {item.marks}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comprehensive Topic-Wise Marks Breakdown */}
      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Compass size={18} style={{ color: 'var(--primary-600)' }} />
            Complete Topic-Wise Marks & Mastery Index
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            All Curriculum Units
          </span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Topic Name</th>
                <th>Subject Area</th>
                <th>Score</th>
                <th>Proficiency Meter</th>
                <th>Status Category</th>
              </tr>
            </thead>
            <tbody>
              {data.topicWiseMarks.map((t, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{t.topic}</td>
                  <td style={{ color: 'var(--slate-500)' }}>{t.subject}</td>
                  <td>
                    <strong>{t.marks}%</strong>
                  </td>
                  <td style={{ minWidth: 160 }}>
                    <div className="meter-bar">
                      <div
                        className={`meter-fill ${t.marks >= 85 ? 'emerald' : t.marks >= 70 ? 'primary' : 'rose'}`}
                        style={{ width: `${t.marks}%` }}
                      />
                    </div>
                  </td>
                  <td>
                    {t.category === 'strong' ? (
                      <span className="badge badge-success">Strong</span>
                    ) : t.category === 'moderate' ? (
                      <span className="badge badge-info">Moderate</span>
                    ) : (
                      <span className="badge badge-danger">Weak</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} style={{ color: 'var(--primary-600)' }} />
            AI Analytical Recommendations & Prescriptive Guidance
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {data.aiRecommendations.map((rec, idx) => (
            <RecommendationCard
              key={rec.id || idx}
              recommendation={rec}
              index={idx + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;
