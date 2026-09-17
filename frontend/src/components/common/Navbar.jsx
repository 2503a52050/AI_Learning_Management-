import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, LogOut, Sparkles, User } from 'lucide-react';

const Navbar = ({ onToggleMobileSidebar }) => {
  const { user, role, switchRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    switchRole(newRole);
    navigate(`/${newRole}`);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-navbar">
      <div className="navbar-left">
        <button
          className="mobile-menu-btn"
          onClick={onToggleMobileSidebar}
          aria-label="Open mobile navigation"
        >
          <Menu size={22} />
        </button>

        <div className="search-bar">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search courses, assignments, topics..."
            aria-label="Search"
          />
        </div>
      </div>

      <div className="navbar-right">
        {/* Quick Demo Role Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={16} style={{ color: 'var(--primary-600)' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--slate-500)' }}>
            View As:
          </span>
          <select
            className="role-switcher-select"
            value={role || 'student'}
            onChange={handleRoleChange}
            aria-label="Switch Role View"
          >
            <option value="student">Student (Alex)</option>
            <option value="teacher">Teacher (Dr. Vance)</option>
            <option value="admin">Admin (Eleanor)</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button className="icon-btn" aria-label="Notifications" title="3 New Notifications">
          <Bell size={18} />
          <span className="notif-badge" />
        </button>

        {/* User profile snippet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="avatar" title={user?.name || 'User'}>
            {user?.avatar || (user?.name ? user.name[0] : 'U')}
          </div>
          <div style={{ display: 'none', md: 'block' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--slate-800)' }}>
              {user?.name || 'User'}
            </div>
          </div>
        </div>

        {/* Sign out button */}
        <button
          className="icon-btn"
          onClick={handleLogout}
          aria-label="Sign out"
          title="Sign out of account"
        >
          <LogOut size={17} style={{ color: 'var(--rose-600)' }} />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
