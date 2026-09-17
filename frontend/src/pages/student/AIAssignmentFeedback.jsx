import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import {
  Sparkles,
  Bot,
  Award,
  CheckCircle2,
  AlertCircle,
  Code,
  ArrowLeft,
  ThumbsUp,
  Lightbulb
} from 'lucide-react';

const AIAssignmentFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(id || '101');
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedback = async (assignmentId) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAIFeedback(assignmentId);
      setFeedback(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch AI feedback report.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback(selectedId);
  }, [selectedId]);

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/student/assignments')}
            >
              <ArrowLeft size={14} /> Back
            </button>
            <h1>AI Assignment Evaluation & Feedback</h1>
          </div>
          <p className="page-subtitle">
            Automated synthetic rubric scoring, code correctness verification, and personalized improvement tips.
          </p>
        </div>

        {/* Assignment selector dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Assignment:
          </span>
          <select
            className="role-switcher-select"
            value={selectedId}
            onChange={(e) => {
              setSelectedId(e.target.value);
              navigate(`/student/feedback/${e.target.value}`);
            }}
          >
            <option value="101">A1: Backpropagation (CS301)</option>
            <option value="102">A2: B-Tree Indexing (CS305)</option>
            <option value="103">A3: CIDR Subnetting (CS310)</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Querying LLM rubric evaluator and generating synthetic feedback..." />
      ) : error ? (
        <ErrorMessage message={error} onRetry={() => fetchFeedback(selectedId)} />
      ) : !feedback ? null : (
        <div>
          {/* Summary Stat Grid */}
          <div className="stats-grid">
            <DashboardCard
              title="AI Rubric Score"
              value={`${feedback.score} / ${feedback.maxScore}`}
              trend="Confidence: 96%"
              trendType="positive"
              color="primary"
              icon={Award}
            />
            <DashboardCard
              title="Evaluation Status"
              value="Verified"
              subtitle={`Generated: ${feedback.generatedAt}`}
              color="emerald"
              icon={CheckCircle2}
            />
            <DashboardCard
              title="Code Correctness"
              value="100%"
              subtitle="All validation test suites passed"
              color="sky"
              icon={Code}
            />
            <DashboardCard
              title="AI Verdict"
              value="Exceptional"
              subtitle="Exceeds syllabus benchmarks"
              color="purple"
              icon={Sparkles}
            />
          </div>

          {/* AI Executive Summary Banner */}
          <div className="ai-banner">
            <div className="ai-icon-bubble">
              <Bot size={24} />
            </div>
            <div className="ai-banner-content">
              <h3>AI Synthesis: {feedback.assignmentTitle}</h3>
              <p>{feedback.aiSummary}</p>
            </div>
          </div>

          {/* Rubric Breakdown Table */}
          <div className="panel" style={{ marginBottom: 24 }}>
            <div className="panel-title">
              <span>Rubric Criterion Scores</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                Detailed Criteria Assessment
              </span>
            </div>

            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Rubric Criterion</th>
                    <th>Earned Score</th>
                    <th>Mastery</th>
                    <th>Evaluator Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {feedback.rubrics.map((r, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: 600, color: 'var(--slate-900)' }}>{r.criterion}</td>
                      <td>
                        <strong>{r.score}</strong> / {r.maxScore}
                      </td>
                      <td style={{ minWidth: 140 }}>
                        <div className="meter-bar">
                          <div
                            className="meter-fill emerald"
                            style={{ width: `${(r.score / r.maxScore) * 100}%` }}
                          />
                        </div>
                      </td>
                      <td style={{ color: 'var(--slate-600)', fontSize: '0.85rem' }}>{r.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Strengths & Areas to Refine Grid */}
          <div className="grid-equal-2col">
            {/* Strengths */}
            <div className="panel">
              <div className="panel-title">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--emerald-600)' }}>
                  <ThumbsUp size={18} />
                  Identified Strengths
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {feedback.strengths.map((str, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '12px 14px',
                      background: 'var(--emerald-50)',
                      borderRadius: 8,
                      fontSize: '0.875rem',
                      color: 'var(--slate-800)',
                      border: '1px solid #a7f3d0'
                    }}
                  >
                    <CheckCircle2 size={18} style={{ color: 'var(--emerald-600)', flexShrink: 0, marginTop: 1 }} />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Areas for Improvement */}
            <div className="panel">
              <div className="panel-title">
                <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--amber-600)' }}>
                  <Lightbulb size={18} />
                  Areas for Improvement
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {feedback.improvements.map((imp, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      padding: '12px 14px',
                      background: 'var(--amber-50)',
                      borderRadius: 8,
                      fontSize: '0.875rem',
                      color: 'var(--slate-800)',
                      border: '1px solid #fde68a'
                    }}
                  >
                    <AlertCircle size={18} style={{ color: 'var(--amber-600)', flexShrink: 0, marginTop: 1 }} />
                    <span>{imp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssignmentFeedback;
