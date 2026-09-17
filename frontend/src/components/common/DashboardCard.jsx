import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  color = 'primary' // 'primary' | 'emerald' | 'amber' | 'rose' | 'sky' | 'purple'
}) => {
  const renderTrendIcon = () => {
    if (trendType === 'positive') return <TrendingUp size={13} />;
    if (trendType === 'negative') return <TrendingDown size={13} />;
    return <Minus size={13} />;
  };

  return (
    <div className="dashboard-card">
      <div className="dashboard-card-top">
        <span className="dashboard-card-label">{title}</span>
        {Icon && (
          <div className={`dashboard-card-icon ${color}`}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="dashboard-card-value">{value}</div>

      {(trend || subtitle) && (
        <div className="dashboard-card-footer">
          {trend && (
            <span className={`trend-badge ${trendType}`}>
              {renderTrendIcon()}
              {trend}
            </span>
          )}
          {subtitle && <span>{subtitle}</span>}
        </div>
      )}
    </div>
  );
};

export default DashboardCard;
