import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import RecommendationCard from '../../components/student/RecommendationCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import { Sparkles, Compass, Clock, CheckCircle2, Target, Calendar, ArrowRight } from 'lucide-react';

const StudyRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecs = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getStudyRecommendations();
      setRecommendations(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch recommendations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecs();
  }, []);

  if (loading) return <LoadingSpinner message="Synthesizing personalized knowledge graphs & study recommendations..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchRecs} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>AI Study Recommendations & Learning Path</h1>
          <p className="page-subtitle">
            Tailored study regimens designed to close conceptual gaps, elevate your SGPA, and optimize study hours.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => alert('AI study planner synchronized with your student calendar!')}
        >
          <Calendar size={14} />
          Sync with Google Calendar
        </button>
      </div>

      {/* Metric Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Recommended Focus Hours"
          value="4.5 hrs / wk"
          subtitle="Targeting weak topics"
          color="primary"
          icon={Clock}
        />
        <DashboardCard
          title="Expected Grade Gain"
          value="+4.8%"
          trend="Based on completed drills"
          trendType="positive"
          color="emerald"
          icon={Target}
        />
        <DashboardCard
          title="Curated Modules"
          value={recommendations.length}
          subtitle="High & Medium Priority"
          color="amber"
          icon={Sparkles}
        />
        <DashboardCard
          title="Learning Velocity"
          value="Optimal"
          trend="85th Percentile in CS"
          trendType="positive"
          color="purple"
          icon={Compass}
        />
      </div>

      {/* AI Strategy Overview */}
      <div className="ai-banner">
        <div className="ai-icon-bubble">
          <Sparkles size={24} />
        </div>
        <div className="ai-banner-content">
          <h3>Your Weekly Personalized Strategy</h3>
          <p>
            Allocate your first 90 minutes to <strong>Computer Networks (Subnetting & CIDR)</strong>, followed by 45 minutes on <strong>Discrete Mathematics Proofs</strong>. Your Data Structures and AI foundation are solid—use them as active recall anchors.
          </p>
        </div>
      </div>

      {/* Priority Recommendations List */}
      <div className="panel" style={{ marginBottom: 24 }}>
        <div className="panel-title">
          <span>Priority Learning Modules</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Ranked by Grade Impact
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {recommendations.map((rec, index) => (
            <RecommendationCard
              key={rec.id || index}
              recommendation={rec}
              index={index + 1}
              onAction={(r) => alert(`Launching interactive practice session for "${r.title}".`)}
            />
          ))}
        </div>
      </div>

      {/* Weekly Schedule Plan */}
      <div className="panel">
        <div className="panel-title">
          <span>Structured Weekly Revision Routine</span>
        </div>

        <div className="grid-3col">
          <div style={{ padding: '16px', background: 'var(--slate-50)', borderRadius: 10, border: '1px solid var(--slate-200)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-600)', textTransform: 'uppercase' }}>Monday & Wednesday</span>
            <h4 style={{ margin: '6px 0 8px', fontSize: '0.95rem' }}>Computer Networks Mastery</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              45 mins CIDR subnet calculations + 15 mins Cisco packet tracer routing lab.
            </p>
          </div>

          <div style={{ padding: '16px', background: 'var(--slate-50)', borderRadius: 10, border: '1px solid var(--slate-200)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--emerald-600)', textTransform: 'uppercase' }}>Tuesday & Thursday</span>
            <h4 style={{ margin: '6px 0 8px', fontSize: '0.95rem' }}>Discrete Math Logic Proofs</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              30 mins induction proofs + 15 mins combinatorics pigeonhole problem solving.
            </p>
          </div>

          <div style={{ padding: '16px', background: 'var(--slate-50)', borderRadius: 10, border: '1px solid var(--slate-200)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--purple-500)', textTransform: 'uppercase' }}>Saturday Review</span>
            <h4 style={{ margin: '6px 0 8px', fontSize: '0.95rem' }}>AI & Data Structures Lab</h4>
            <p style={{ fontSize: '0.825rem', color: 'var(--slate-600)' }}>
              1 hr advanced challenge coding on graph optimization and neural net tuning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyRecommendations;
