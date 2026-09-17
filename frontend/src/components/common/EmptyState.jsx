import React from 'react';
import { Inbox } from 'lucide-react';

const EmptyState = ({
  icon: Icon = Inbox,
  title = 'No records found',
  description = 'There are no entries available to display at this moment.',
  actionLabel,
  onAction
}) => {
  return (
    <div className="empty-container">
      <div className="empty-icon">
        <Icon size={28} />
      </div>
      <h3 style={{ fontSize: '1.05rem', color: 'var(--slate-800)', fontWeight: 600 }}>
        {title}
      </h3>
      <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)', maxWidth: '380px', lineHeight: 1.5 }}>
        {description}
      </p>
      {actionLabel && onAction && (
        <button className="btn btn-outline btn-sm" onClick={onAction} style={{ marginTop: '10px' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
