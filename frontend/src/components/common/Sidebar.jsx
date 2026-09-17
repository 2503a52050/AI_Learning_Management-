import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  Award,
  BarChart3,
  BookOpen,
  ClipboardList,
  Sparkles,
  CheckCircle2,
  User,
  Users,
  FileSpreadsheet,
  CheckSquare,
  Layers,
  ShieldAlert,
  LogOut,
  X,
  Bot
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const studentLinks = [
    { to: '/student', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/student/marks', label: 'My Marks', icon: Award },
    { to: '/student/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/student/assignments', label: 'Assignments', icon: ClipboardList },
    { to: '/student/feedback', label: 'AI Feedback', icon: Bot },
    { to: '/student/recommendations', label: 'AI Study Paths', icon: Sparkles },
    { to: '/student/attendance', label: 'Attendance', icon: CheckCircle2 },
    { to: '/student/profile', label: 'Profile', icon: User }
  ];

  const teacherLinks = [
    { to: '/teacher', label: 'Teacher Dashboard', icon: LayoutDashboard, end: true },
    { to: '/teacher/students', label: 'Student Management', icon: Users },
    { to: '/teacher/marks', label: 'Marks Management', icon: FileSpreadsheet },
    { to: '/teacher/assignments', label: 'Assignment Manager', icon: ClipboardList },
    { to: '/teacher/submissions', label: 'Submissions', icon: CheckSquare },
    { to: '/teacher/ai-eval', label: 'AI Evaluation', icon: Bot },
    { to: '/teacher/analytics', label: 'Class Analytics', icon: BarChart3 }
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/users', label: 'User Management', icon: Users },
    { to: '/admin/students', label: 'Student Directory', icon: GraduationCap },
    { to: '/admin/teachers', label: 'Teacher Directory', icon: BookOpen },
    { to: '/admin/subjects', label: 'Subject Management', icon: Layers }
  ];

  const links = role === 'teacher' ? teacherLinks : role === 'admin' ? adminLinks : studentLinks;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.4)',
            zIndex: 35,
            display: 'block'
          }}
        />
      )}

      <aside className={`app-sidebar ${isOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo">
            <div className="brand-icon">
              <GraduationCap size={20} />
            </div>
            <span>
              EduPulse<span className="brand-accent">AI</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="mobile-menu-btn"
            aria-label="Close navigation sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className={`sidebar-role-badge ${role}`}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          {role ? `${role.toUpperCase()} PORTAL` : 'WORKSPACE'}
        </div>

        <nav className="sidebar-nav">
          {links.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini-card">
            <div className="avatar">
              {user?.avatar || (user?.name ? user.name[0] : 'U')}
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name || 'Demo User'}</div>
              <div className="user-email">{user?.email || 'user@ailms.com'}</div>
            </div>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={handleLogout} style={{ width: '100%' }}>
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
