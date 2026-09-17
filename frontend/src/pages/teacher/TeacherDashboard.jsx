import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import DashboardCard from '../../components/common/DashboardCard';
import PerformanceChart from '../../components/student/PerformanceChart';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  Users,
  TrendingUp,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  CheckSquare,
  FileSpreadsheet,
  PlusCircle,
  Bot
} from 'lucide-react';

const TeacherDashboard = () => {
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchTeacherData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [sData, stList] = await Promise.all([
        mockService.getTeacherDashboard(),
        mockService.getTeacherStudents()
      ]);
      setStats(sData);
      setStudents(stList);
    } catch (err) {
      setError(err.message || 'Unable to load teacher dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacherData();
  }, []);

  if (loading) return <LoadingSpinner message="Aggregating classroom telemetry and submission queues..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchTeacherData} />;

  const chartData = [
    { grade: 'A+ (90-100)', count: 24 },
    { grade: 'A (80-89)', count: 42 },
    { grade: 'B (70-79)', count: 36 },
    { grade: 'C (60-69)', count: 18 },
    { grade: 'D/F (<60)', count: 8 }
  ];

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Faculty Classroom Dashboard</h1>
          <p className="page-subtitle">
            Overview of student cohorts, real-time assignment grading queues, and AI-assisted evaluations.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => navigate('/teacher/marks')}
          >
            <FileSpreadsheet size={15} /> Marks Sheet
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => navigate('/teacher/assignments')}
          >
            <PlusCircle size={15} /> Create Assignment
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Enrolled Students"
          value={stats?.totalStudents || 128}
          subtitle="Across CS301 & CS204"
          color="primary"
          icon={Users}
        />
        <DashboardCard
          title="Class Average Marks"
          value={`${stats?.classAverage || 78.4}%`}
          trend="+3.2% vs Last Exam"
          trendType="positive"
          color="emerald"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Pending Submissions"
          value={stats?.pendingSubmissions || 14}
          subtitle="Awaiting Faculty Review"
          color="amber"
          icon={Clock}
        />
        <DashboardCard
          title="Top Course Pass Rate"
          value={`${stats?.topCoursePassRate || 94.2}%`}
          trend="CS301 AI & ML"
          trendType="positive"
          color="purple"
          icon={Award}
        />
      </div>

      {/* AI Assistance Banner */}
      <div className="ai-banner">
        <div className="ai-icon-bubble">
          <Bot size={24} />
        </div>
        <div className="ai-banner-content">
          <h3>AI Co-Pilot Grading Active</h3>
          <p>
            14 new student submissions have been pre-evaluated by the automated rubric engine with syntax verification and edge-case scoring. You can review and approve grades in 1-click.
          </p>
          <button
            className="btn btn-sm"
            style={{ marginTop: 12, background: 'white', color: 'var(--primary-700)', fontWeight: 700 }}
            onClick={() => navigate('/teacher/ai-eval')}
          >
            Launch AI Grading Assistant <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Charts & At Risk Student Grid */}
      <div className="grid-2col">
        {/* Cohort Grade Distribution Chart */}
        <div className="panel">
          <div className="panel-title">
            <span>Cohort Grade Distribution (CS301)</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>128 Students</span>
          </div>

          <PerformanceChart
            data={chartData}
            type="bar"
            dataKey="count"
            xAxisKey="grade"
            dataName="Students"
            color="#4f46e5"
            height={260}
          />
        </div>

        {/* At-Risk / Priority Students */}
        <div className="panel">
          <div className="panel-title">
            <span>Students Requiring Attention</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => navigate('/teacher/students')}
            >
              View Roster
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {students.slice(0, 4).map((s) => (
              <div
                key={s.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  background: s.risk === 'High' ? 'var(--rose-50)' : 'var(--slate-50)',
                  borderRadius: 8,
                  border: `1px solid ${s.risk === 'High' ? '#fecdd3' : 'var(--slate-200)'}`
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.875rem', color: 'var(--slate-900)' }}>{s.name}</strong>
                  <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>
                    Roll: {s.rollNo} · Att: {s.attendance}%
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.avgMarks}%</span>
                  <span className={`badge ${s.status === 'Top Performer' ? 'badge-success' : s.status === 'At Risk' ? 'badge-danger' : 'badge-warning'}`}>
                    {s.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
