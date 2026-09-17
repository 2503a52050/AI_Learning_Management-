import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import DashboardCard from '../../components/common/DashboardCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  Users,
  GraduationCap,
  BookOpen,
  Activity,
  ShieldCheck,
  Layers,
  ArrowRight,
  Clock,
  AlertTriangle
} from 'lucide-react';

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchAdminData = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await mockService.getAdminDashboard();
      setData(result);
    } catch (err) {
      setError(err.message || 'Unable to load administration dashboard.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  if (loading) return <LoadingSpinner message="Checking system diagnostics, security logs, and institution registries..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAdminData} />;
  if (!data) return null;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Institution Administration Dashboard</h1>
          <p className="page-subtitle">
            System-wide telemetry, user provisioning, faculty assignments, and audit logging.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => navigate('/admin/users')}>
            <Users size={14} /> Provision Users
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => navigate('/admin/subjects')}>
            <Layers size={14} /> Course Catalog
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="stats-grid">
        <DashboardCard
          title="Total Matriculated Students"
          value={data.stats.totalStudents}
          trend="+84 this academic year"
          trendType="positive"
          color="primary"
          icon={GraduationCap}
        />
        <DashboardCard
          title="Active Faculty Members"
          value={data.stats.totalTeachers}
          subtitle="Across 6 Academic Departments"
          color="emerald"
          icon={Users}
        />
        <DashboardCard
          title="Accredited Subjects"
          value={data.stats.totalSubjects}
          subtitle="Undergraduate & Honors"
          color="purple"
          icon={BookOpen}
        />
        <DashboardCard
          title="Platform Health & AI Uptime"
          value={data.stats.systemUptime}
          trend="All AI pipelines operational"
          trendType="positive"
          color="sky"
          icon={Activity}
        />
      </div>

      <div className="grid-2col">
        {/* Quick Operations Panel */}
        <div className="panel">
          <div className="panel-title">
            <span>Administrative Governance Modules</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--slate-50)',
                borderRadius: 10,
                border: '1px solid var(--slate-200)',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/admin/users')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="dashboard-card-icon primary" style={{ width: 38, height: 38 }}>
                  <Users size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Global User Directory</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    Role elevation, profile activation, and security access logs.
                  </p>
                </div>
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: 'var(--slate-50)',
                borderRadius: 10,
                border: '1px solid var(--slate-200)',
                cursor: 'pointer'
              }}
              onClick={() => navigate('/admin/subjects')}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="dashboard-card-icon purple" style={{ width: 38, height: 38 }}>
                  <Layers size={18} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>Curriculum & Subject Catalog</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
                    Map course credit structures and faculty instructor allocation.
                  </p>
                </div>
              </div>
              <ArrowRight size={16} color="var(--slate-400)" />
            </div>
          </div>
        </div>

        {/* Audit Logs */}
        <div className="panel">
          <div className="panel-title">
            <span>System Audit & Operational Events</span>
            <span className="badge badge-success">Live Stream</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {data.logs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '12px 14px',
                  background: log.type === 'warning' ? 'var(--amber-50)' : 'var(--slate-50)',
                  borderRadius: 8,
                  border: `1px solid ${log.type === 'warning' ? '#fde68a' : 'var(--slate-200)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-900)' }}>
                    {log.event}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-500)' }}>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
