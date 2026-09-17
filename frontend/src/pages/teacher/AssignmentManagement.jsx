import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import { ClipboardList, Plus, Calendar, Clock, Award, CheckCircle2, X } from 'lucide-react';

const AssignmentManagement = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    course: 'CS301: Artificial Intelligence',
    courseCode: 'CS301',
    dueDate: '2026-10-15',
    maxMarks: 100,
    description: ''
  });

  const fetchAssignments = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getAssignments();
      setAssignments(data);
    } catch (err) {
      setError(err.message || 'Unable to load assignments.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      await mockService.createAssignment(formData);
      setShowModal(false);
      setFormData({
        title: '',
        course: 'CS301: Artificial Intelligence',
        courseCode: 'CS301',
        dueDate: '2026-10-15',
        maxMarks: 100,
        description: ''
      });
      fetchAssignments();
    } catch (err) {
      alert('Error creating assignment: ' + err.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching syllabus assignments and milestones..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchAssignments} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>Assignment Management</h1>
          <p className="page-subtitle">
            Publish course problem sets, define AI evaluation rubrics, and monitor cohort submission rates.
          </p>
        </div>

        <button className="btn btn-primary btn-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Create Assignment
        </button>
      </div>

      {/* Assignment List */}
      <div className="panel">
        <div className="panel-title">
          <span>Active Course Assignments ({assignments.length})</span>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Due Date</th>
                <th>Max Points</th>
                <th>Submissions</th>
                <th>AI Grading</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a) => (
                <tr key={a.id}>
                  <td>
                    <strong>{a.title}</strong>
                  </td>
                  <td style={{ color: 'var(--slate-500)' }}>{a.course}</td>
                  <td>{new Date(a.dueDate).toLocaleDateString()}</td>
                  <td>
                    <strong>{a.maxMarks}</strong>
                  </td>
                  <td>
                    <span style={{ fontWeight: 600, color: 'var(--primary-600)' }}>
                      {a.status === 'graded' || a.status === 'submitted' ? '124 / 128' : '18 / 128'}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success">Enabled</span>
                  </td>
                  <td>
                    <span className="badge badge-info">Published</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Create New Assignment</h3>
              <button className="icon-btn" onClick={() => setShowModal(false)} style={{ border: 'none' }}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate}>
              <div className="form-group">
                <label className="form-label">Assignment Title</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  placeholder="e.g. Convolutional Vision Architecture"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="form-group">
                  <label className="form-label">Course</label>
                  <select
                    className="form-control"
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  >
                    <option value="CS301: Artificial Intelligence">CS301: Artificial Intelligence</option>
                    <option value="CS204: Data Structures & Algorithms">CS204: Data Structures & Algorithms</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Max Marks</label>
                <input
                  type="number"
                  className="form-control"
                  value={formData.maxMarks}
                  onChange={(e) => setFormData({ ...formData, maxMarks: e.target.value })}
                  min={10}
                  max={200}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description & Instructions</label>
                <textarea
                  className="form-control"
                  rows={4}
                  required
                  placeholder="Provide algorithmic constraints, input/output format, and test case requirements..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ flex: 1 }}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={creating}
                >
                  {creating ? 'Publishing...' : 'Publish Assignment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentManagement;
