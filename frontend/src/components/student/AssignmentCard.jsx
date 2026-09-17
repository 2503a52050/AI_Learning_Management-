import React from 'react';
import { Calendar, Clock, Award, ArrowRight, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AssignmentCard = ({ assignment, onSubmit, onViewFeedback }) => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'graded':
        return <span className="badge badge-success">Graded</span>;
      case 'submitted':
        return <span className="badge badge-info">Submitted</span>;
      case 'late':
        return <span className="badge badge-danger">Late</span>;
      default:
        return <span className="badge badge-warning">Pending</span>;
    }
  };

  const isDueSoon = () => {
    if (!assignment.dueDate) return false;
    const diffDays = (new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 3;
  };

  return (
    <div className="assignment-card">
      <div>
        <div className="assignment-card-header">
          <span className="assignment-course">{assignment.course}</span>
          {getStatusBadge(assignment.status)}
        </div>

        <h3 className="assignment-card-title">{assignment.title}</h3>

        {assignment.description && (
          <p style={{ fontSize: '0.85rem', color: 'var(--slate-600)', marginBottom: '14px', lineHeight: 1.4 }}>
            {assignment.description.length > 110
              ? `${assignment.description.slice(0, 110)}...`
              : assignment.description}
          </p>
        )}
      </div>

      <div>
        <div className="assignment-meta" style={{ marginBottom: '14px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar size={14} />
            Due: {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </span>

          {assignment.status === 'graded' && assignment.marks !== null ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--emerald-600)', fontWeight: 700 }}>
              <Award size={14} />
              {assignment.marks} / {assignment.maxMarks}
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <Clock size={14} />
              Max: {assignment.maxMarks} pts
            </span>
          )}

          {isDueSoon() && assignment.status === 'pending' && (
            <span style={{ color: 'var(--rose-600)', fontWeight: 600, fontSize: '0.75rem' }}>
              Due Soon
            </span>
          )}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          {assignment.status === 'pending' ? (
            <button
              className="btn btn-primary btn-sm"
              style={{ width: '100%' }}
              onClick={() => (onSubmit ? onSubmit(assignment) : navigate(`/student/assignments/submit/${assignment.id}`))}
            >
              Submit Assignment
              <ArrowRight size={14} />
            </button>
          ) : (
            <>
              {assignment.hasAIFeedback && (
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                  onClick={() => (onViewFeedback ? onViewFeedback(assignment) : navigate(`/student/feedback/${assignment.id}`))}
                >
                  <Bot size={14} style={{ color: 'var(--primary-600)' }} />
                  AI Feedback
                </button>
              )}
              <button
                className="btn btn-outline btn-sm"
                style={{ flex: 1 }}
                onClick={() => navigate(`/student/assignments/submit/${assignment.id}`)}
              >
                View Details
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignmentCard;
