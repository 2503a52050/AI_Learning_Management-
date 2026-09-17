import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'rgba(15, 23, 42, 0.9)',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '0.8rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
        }}
      >
        <p style={{ fontWeight: 600, marginBottom: '4px' }}>{label}</p>
        {payload.map((item, index) => (
          <p key={index} style={{ color: item.color || '#fff', margin: '2px 0' }}>
            {item.name}: <strong>{item.value}%</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const PerformanceChart = ({
  data = [],
  type = 'area', // 'area' | 'bar' | 'line'
  dataKey = 'score',
  secondaryKey = null,
  xAxisKey = 'month',
  color = '#4f46e5',
  secondaryColor = '#94a3b8',
  height = 280,
  dataName = 'Score',
  secondaryName = 'Class Average'
}) => {
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        {type === 'bar' ? (
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {secondaryKey && <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />}
            <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} name={dataName} />
            {secondaryKey && (
              <Bar dataKey={secondaryKey} fill={secondaryColor} radius={[6, 6, 0, 0]} name={secondaryName} />
            )}
          </BarChart>
        ) : type === 'line' ? (
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              domain={[40, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {secondaryKey && <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              dot={{ r: 4, fill: color }}
              activeDot={{ r: 6 }}
              name={dataName}
            />
            {secondaryKey && (
              <Line
                type="monotone"
                dataKey={secondaryKey}
                stroke={secondaryColor}
                strokeWidth={2}
                strokeDasharray="4 4"
                name={secondaryName}
              />
            )}
          </LineChart>
        ) : (
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="areaColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey={xAxisKey}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis
              domain={[40, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            {secondaryKey && <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#areaColor)"
              name={dataName}
            />
            {secondaryKey && (
              <Line
                type="monotone"
                dataKey={secondaryKey}
                stroke={secondaryColor}
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={false}
                name={secondaryName}
              />
            )}
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
