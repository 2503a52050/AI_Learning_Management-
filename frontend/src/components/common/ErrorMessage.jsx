import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';

const ErrorMessage = ({ message = 'An unexpected error occurred while loading data.', onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-icon">
        <AlertCircle size={28} />
      </div>
      <div>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--rose-600)', marginBottom: '4px' }}>
          Unable to Load Information
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', maxWidth: '420px', lineHeight: 1.5 }}>
          {message}
        </p>
      </div>
      {onRetry && (
        <button className="btn btn-danger btn-sm" onClick={onRetry} style={{ marginTop: '8px' }}>
          <RotateCcw size={15} />
          Retry Request
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
