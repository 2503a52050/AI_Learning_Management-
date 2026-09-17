import React from 'react';
import { Sparkles, Clock, ArrowUpRight, CheckCircle } from 'lucide-react';

const RecommendationCard = ({ recommendation, index = 1, onAction }) => {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'High':
        return <span className="badge badge-danger">High Priority</span>;
      case 'Medium':
        return <span className="badge badge-warning">Medium Priority</span>;
      default:
        return <span className="badge badge-info">Optional Enrichment</span>;
    }
  };

  return (
    <div className="recommendation-card">
      <div className="rec-rank">{index}</div>

      <div className="rec-body">
        <div className="rec-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary-600)' }}>
              {recommendation.subject || 'AI Learning Path'}
            </span>
            {recommendation.priority && getPriorityBadge(recommendation.priority)}
          </div>

          {recommendation.timeEstimate && (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.775rem', color: 'var(--slate-500)' }}>
              <Clock size={12} />
              {recommendation.timeEstimate}
            </span>
          )}

          {recommendation.expectedGain && (
            <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--emerald-600)', background: 'var(--emerald-50)', padding: '2px 6px', borderRadius: 4 }}>
              Expected: {recommendation.expectedGain}
            </span>
          )}
        </div>

        <h4 className="rec-title">{recommendation.title}</h4>
        <p className="rec-desc">{recommendation.description}</p>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onAction && onAction(recommendation)}
          >
            <Sparkles size={14} />
            Start Focused Practice
            <ArrowUpRight size={14} />
          </button>
          <button
            className="btn btn-outline btn-sm"
            onClick={() => alert(`Topic "${recommendation.title}" added to your study schedule calendar!`)}
          >
            <CheckCircle size={14} />
            Add to Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
