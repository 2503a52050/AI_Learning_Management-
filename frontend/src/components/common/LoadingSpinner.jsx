import React from 'react';

const LoadingSpinner = ({ message = 'Loading academic records...' }) => {
  return (
    <div className="loading-container" role="status" aria-live="polite">
      <div className="spinner"></div>
      <p style={{ color: 'var(--slate-600)', fontSize: '0.9rem', fontWeight: 500 }}>
        {message}
      </p>
    </div>
  );
};

export default LoadingSpinner;
