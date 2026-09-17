import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import DashboardCard from '../../components/common/DashboardCard';
import PerformanceChart from '../../components/student/PerformanceChart';
import RecommendationCard from '../../components/student/RecommendationCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  Award,
  CalendarCheck,
  TrendingUp,
  BookOpen,
  Sparkles,
  ArrowRight,
  ClipboardList,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const StudentDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardData = async (shouldFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const result = await mockService.getStudentDashboard(shouldFail);
      setData(result);
    } catch (err) {
      setError(err.message || 'Unable to load dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Analyzing academic progress & generating AI insights..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={() => fetchDashboardData(false)} />;
  }

  if (!data) return null;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title-group">
          <h1>Student Dashboard</h1>
          <p className="page-subtitle">
            Welcome back! Here is an AI-powered summary of your academic trajectory this semester.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          {/* Quick test error/retry button to demonstrate error handling */}
          <button
            className="btn btn-outline btn-sm"
            onClick={() => fetchDashboardData(true)}
            title="Simulate network failure to test error state and retry button"
          >
            Simulate Error State
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/student/recommendations')}
          >
            <Sparkles size={14} />
            View Study Path
          </button>
        </div>
      </div>

      {/* AI Top Insight Banner */}
      <div className="ai-banner">
        <div className="ai-icon-bubble">
          <Sparkles size={24} />
        </div>
        <div className="ai-banner-content">
          <h3>AI Academic Intelligence Forecast</h3>
          <p>
            You are currently on track for a <strong>First Class with Distinction</strong> ({data.overallPercentage}%).
            Strengthening your <strong>Computer Networks</strong> subnet calculations is your highest-leverage opportunity, with an estimated +4.2% overall semester boost.
          </p>
        </div>
      </div>

      {/* Core Metrics: Overall %, Average Marks, Attendance %, Open Assignments */}
      <div className="stats-grid">
        <DashboardCard
          title="Overall Percentage"
          value={`${data.overallPercentage}%`}
          trend="+4.3% vs Midterm"
          trendType="positive"
          color="primary"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Average Marks"
          value={`${data.averageMarks} / 100`}
          trend="Top 12% in Batch"
          trendType="positive"
          color="emerald"
          icon={Award}
        />
        <DashboardCard
          title="Attendance Percentage"
          value={`${data.attendancePercentage}%`}
          trend={data.attendancePercentage >= 75 ? 'Above 75% Safe Threshold' : 'Attention Needed'}
          trendType={data.attendancePercentage >= 75 ? 'positive' : 'negative'}
          color={data.attendancePercentage >= 75 ? 'emerald' : 'rose'}
          icon={CalendarCheck}
        />
        <DashboardCard
          title="Strong Subjects"
          value={data.strongSubjects.length}
          subtitle="A+ and A Grade Mastery"
          color="purple"
          icon={BookOpen}
        />
      </div>

      {/* Main Charts & Breakdown Grid */}
      <div className="grid-2col">
        {/* Performance Trend Chart */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={18} style={{ color: 'var(--primary-600)' }} />
              Performance Trend Chart
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)', fontWeight: 500 }}>
              Monthly Score vs Class Average
            </span>
          </div>

          <PerformanceChart
            data={data.performanceTrend}
            type="area"
            dataKey="score"
            secondaryKey="classAvg"
            xAxisKey="month"
            dataName="My Score"
            secondaryName="Batch Average"
            height={270}
          />
        </div>

        {/* Strong vs Weak Subjects */}
        <div className="panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="panel-title">
              <span>Subject Performance Pulse</span>
            </div>

            {/* Strong Subjects */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-600)', marginBottom: 8, textTransform: 'uppercase' }}>
                <CheckCircle size={14} /> Strong Subjects
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {data.strongSubjects.map((s) => (
                  <div key={s.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--emerald-50)', borderRadius: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-800)' }}>{s.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--emerald-600)' }}>{s.score}%</strong>
                      <span className="badge badge-success">{s.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Weak Subjects */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-600)', marginBottom: 8, textTransform: 'uppercase' }}>
                <AlertTriangle size={14} /> Weak Subjects (Focus Needed)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {data.weakSubjects.map((w) => (
                  <div key={w.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', background: 'var(--amber-50)', borderRadius: 8 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-800)' }}>{w.name}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <strong style={{ fontSize: '0.85rem', color: 'var(--amber-600)' }}>{w.score}%</strong>
                      <span className="badge badge-warning">{w.grade}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/student/analytics')}
            style={{ width: '100%', marginTop: 16 }}
          >
            Deep Dive Subject & Topic Analytics
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Lower Section: Recent Assignments & Assignment Scores */}
      <div className="grid-equal-2col">
        {/* Recent Assignments */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <ClipboardList size={18} style={{ color: 'var(--primary-600)' }} />
              Recent Assignments & Scores
            </span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate('/student/assignments')}
            >
              View All
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.recentAssignments.map((a) => (
              <div
                key={a.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 10,
                  border: '1px solid var(--slate-200)',
                  background: 'var(--slate-50)'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--slate-900)' }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: '0.775rem', color: 'var(--slate-500)', marginTop: 2 }}>
                    {a.course} · Due {new Date(a.dueDate).toLocaleDateString()}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {a.status === 'graded' ? (
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--emerald-600)' }}>
                      {a.marks} / {a.maxMarks}
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                      Pending Review
                    </span>
                  )}
                  <span className={`badge ${a.status === 'graded' ? 'badge-success' : a.status === 'submitted' ? 'badge-info' : 'badge-warning'}`}>
                    {a.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assignment Scores Bar Chart */}
        <div className="panel">
          <div className="panel-title">
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} style={{ color: 'var(--primary-600)' }} />
              Assignment Score Breakdown
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Out of 100</span>
          </div>

          <PerformanceChart
            data={data.assignmentScores}
            type="bar"
            dataKey="score"
            xAxisKey="assignment"
            dataName="Marks"
            color="#6366f1"
            height={220}
          />
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-title">
          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Sparkles size={18} style={{ color: 'var(--primary-600)' }} />
            AI Recommended Learning Actions
          </span>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => navigate('/student/recommendations')}
          >
            Explore All AI Recommendations
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {data.aiRecommendations.map((rec, idx) => (
            <RecommendationCard
              key={rec.id || idx}
              recommendation={rec}
              index={idx + 1}
              onAction={() => navigate('/student/recommendations')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
