import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Users, Search, Shield, UserCheck, UserX, Plus } from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAllUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message || 'Unable to fetch user registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (userId) => {
    try {
      const updated = await mockService.toggleUserStatus(userId);
      setUsers(updated);
    } catch (err) {
      alert('Error updating user status');
    }
  };

  const filtered = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesSearch;
  });

  if (loading) return <LoadingSpinner message="Querying enterprise authentication directory..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchUsers} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>User Identity & Access Management</h1>
          <p className="page-subtitle">
            Manage student, faculty, and administrative system credentials, permissions, and account statuses.
          </p>
        </div>

        <button
          className="btn btn-primary btn-sm"
          onClick={() => alert('Add user modal dialog: Enter full name, university email, and initial role.')}
        >
          <Plus size={16} /> Provision User
        </button>
      </div>

      {/* Search and Role Filter */}
      <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: 'white',
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid var(--slate-200)',
            width: 320
          }}
        >
          <Search size={16} color="var(--slate-400)" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6 }}>
          {['all', 'student', 'teacher', 'admin'].map((r) => (
            <button
              key={r}
              className={`btn btn-sm ${roleFilter === r ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setRoleFilter(r)}
              style={{ textTransform: 'capitalize' }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* User Table */}
      <div className="panel">
        <div className="panel-title">
          <span>Registered System Accounts ({filtered.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Institutional Email</th>
                <th>Role Tier</th>
                <th>Department</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.8rem' }}>
                        {u.avatar || u.name.slice(0, 2).toUpperCase()}
                      </div>
                      <strong style={{ color: 'var(--slate-900)' }}>{u.name}</strong>
                    </div>
                  </td>
                  <td style={{ color: 'var(--slate-600)' }}>{u.email}</td>
                  <td>
                    <span className={`badge ${u.role === 'admin' ? 'badge-purple' : u.role === 'teacher' ? 'badge-success' : 'badge-info'}`}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ color: 'var(--slate-500)' }}>{u.department || 'General'}</td>
                  <td>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: u.status === 'active' ? 'var(--emerald-600)' : 'var(--rose-600)' }}>
                      ● {u.status || 'active'}
                    </span>
                  </td>
                  <td>
                    <button
                      className={`btn btn-sm ${u.status === 'active' ? 'btn-outline' : 'btn-primary'}`}
                      onClick={() => handleToggleStatus(u.id)}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {u.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
