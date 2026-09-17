import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import AssignmentCard from '../../components/student/AssignmentCard';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import EmptyState from '../../components/common/EmptyState';
import { ClipboardList, Search, Filter } from 'lucide-react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'submitted' | 'graded'
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAssignments();
      setAssignments(data);
    } catch (err) {
      setError(err.message || 'Unable to load course assignments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const filtered = assignments.filter((item) => {
    const matchesFilter = filter === 'all' || item.status === filter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.course.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  if (loading) return <LoadingSpinner message="Fetching syllabus assignments and deadlines..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAssignments} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Course Assignments</h1>
          <p className="page-subtitle">
            Manage your project milestones, submit code/lab reports, and access AI-generated feedback.
          </p>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['all', 'pending', 'submitted', 'graded'].map((status) => (
            <button
              key={status}
              className={`btn btn-sm ${filter === status ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setFilter(status)}
              style={{ textTransform: 'capitalize' }}
            >
              {status} (
              {status === 'all'
                ? assignments.length
                : assignments.filter((a) => a.status === status).length}
              )
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: 'white',
          padding: '10px 16px',
          borderRadius: 12,
          border: '1px solid var(--slate-200)',
          marginBottom: 24,
          maxWidth: 420
        }}
      >
        <Search size={16} color="var(--slate-400)" />
        <input
          type="text"
          placeholder="Filter by title or course name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ border: 'none', outline: 'none', width: '100%', fontSize: '0.875rem' }}
        />
      </div>

      {/* Assignment Grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={ClipboardList}
          title="No assignments found"
          description={`No ${filter !== 'all' ? filter : ''} assignments match your search query.`}
          actionLabel="Clear Filters"
          onAction={() => {
            setFilter('all');
            setSearchTerm('');
          }}
        />
      ) : (
        <div className="grid-3col">
          {filtered.map((assignment) => (
            <AssignmentCard
              key={assignment.id}
              assignment={assignment}
              onSubmit={(a) => navigate(`/student/assignments/submit/${a.id}`)}
              onViewFeedback={(a) => navigate(`/student/feedback/${a.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Assignments;
