import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import {
  UploadCloud,
  FileText,
  Calendar,
  Clock,
  Award,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Bot
} from 'lucide-react';

const AssignmentSubmission = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states
  const [file, setFile] = useState(null);
  const [submissionText, setSubmissionText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const assignmentId = id || 101;
      const data = await mockService.getAssignmentById(assignmentId);
      setAssignment(data);
    } catch (err) {
      setError(err.message || 'Could not load assignment details.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await mockService.submitAssignment(assignment.id, {
        submissionText,
        fileName: file ? file.name : 'solution_submission.zip'
      });
      setSubmitSuccess(true);
      fetchDetails();
    } catch (err) {
      alert('Error submitting: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading assignment specifications..." />;
  if (error) return <ErrorMessage message={error} onRetry={fetchDetails} />;
  if (!assignment) return null;

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm"
        onClick={() => navigate('/student/assignments')}
        style={{ marginBottom: 20 }}
      >
        <ArrowLeft size={14} /> Back to Assignments
      </button>

      <div className="grid-2col">
        {/* Left Column: Assignment Brief & Submission Form */}
        <div>
          <div className="panel" style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="assignment-course">{assignment.course}</span>
              <span className={`badge ${assignment.status === 'graded' ? 'badge-success' : assignment.status === 'submitted' ? 'badge-info' : 'badge-warning'}`}>
                {assignment.status}
              </span>
            </div>

            <h1 style={{ fontSize: '1.45rem', marginBottom: 12, color: 'var(--slate-900)' }}>
              {assignment.title}
            </h1>

            <p style={{ color: 'var(--slate-600)', lineHeight: 1.6, fontSize: '0.925rem', marginBottom: 20 }}>
              {assignment.description}
            </p>

            <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', padding: '14px 18px', background: 'var(--slate-50)', borderRadius: 10 }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', display: 'block' }}>Instructor</span>
                <strong style={{ fontSize: '0.85rem' }}>{assignment.faculty}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', display: 'block' }}>Due Date</span>
                <strong style={{ fontSize: '0.85rem' }}>{new Date(assignment.dueDate).toLocaleDateString()}</strong>
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)', textTransform: 'uppercase', display: 'block' }}>Max Marks</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--primary-600)' }}>{assignment.maxMarks} Points</strong>
              </div>
            </div>
          </div>

          {/* Submission Form / Status */}
          <div className="panel">
            <h3 style={{ fontSize: '1.15rem', marginBottom: 16 }}>
              {assignment.status === 'pending' ? 'Submit Your Solution' : 'Submission Details'}
            </h3>

            {submitSuccess && (
              <div style={{ background: 'var(--emerald-50)', border: '1px solid #a7f3d0', padding: 14, borderRadius: 10, color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                <CheckCircle2 size={20} />
                <span>Assignment submitted successfully! Automated AI evaluation has generated preliminary feedback.</span>
              </div>
            )}

            {assignment.status !== 'pending' && (
              <div style={{ background: 'var(--slate-50)', padding: 18, borderRadius: 12, border: '1px solid var(--slate-200)', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontWeight: 600, color: 'var(--slate-700)', fontSize: '0.9rem' }}>Attached Submission File:</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>Submitted: {assignment.submittedAt || 'Recently'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'white', borderRadius: 8, border: '1px solid var(--slate-200)' }}>
                  <FileText size={20} style={{ color: 'var(--primary-600)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.875rem' }}>{assignment.submissionFile || 'submission_final.py'}</span>
                </div>

                <div style={{ marginTop: 16, display: 'flex', gap: 10 }}>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate(`/student/feedback/${assignment.id}`)}
                  >
                    <Bot size={15} />
                    View AI Evaluation Feedback
                  </button>
                </div>
              </div>
            )}

            {assignment.status === 'pending' && (
              <form onSubmit={handleSubmit}>
                {/* File Dropzone */}
                <div className="form-group">
                  <label className="form-label">Upload Solution Archive / Code File</label>
                  <div
                    style={{
                      border: '2px dashed var(--slate-300)',
                      borderRadius: 12,
                      padding: '28px 20px',
                      textAlign: 'center',
                      background: 'var(--slate-50)',
                      cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('file-upload').click()}
                  >
                    <UploadCloud size={36} color="var(--primary-600)" style={{ margin: '0 auto 8px' }} />
                    <p style={{ fontWeight: 600, color: 'var(--slate-800)', fontSize: '0.9rem' }}>
                      {file ? file.name : 'Click to browse or drop project archive (.zip, .py, .pdf)'}
                    </p>
                    <p style={{ fontSize: '0.775rem', color: 'var(--slate-400)', marginTop: 4 }}>
                      Maximum file size: 25MB
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                {/* Notes textarea */}
                <div className="form-group">
                  <label className="form-label">Submission Notes & Implementation Details</label>
                  <textarea
                    className="form-control"
                    placeholder="Provide test instructions, dependencies, or algorithmic complexity observations..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    rows={4}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  disabled={submitting}
                >
                  {submitting ? 'Submitting Work...' : 'Confirm Submission & Run AI Analysis'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: AI Auto-Grader Info & Rubric Guidelines */}
        <div>
          <div className="panel" style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div className="dashboard-card-icon primary" style={{ width: 36, height: 36 }}>
                <Sparkles size={18} />
              </div>
              <h3 style={{ fontSize: '1.05rem' }}>AI Real-Time Evaluation</h3>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--slate-600)', lineHeight: 1.5, marginBottom: 16 }}>
              Upon submission, our LLM rubric engine immediately parses your code and documentation:
            </p>

            <ul style={{ paddingLeft: 20, fontSize: '0.85rem', color: 'var(--slate-700)', lineHeight: 1.8 }}>
              <li>Verifies syntax correctness and unit test assertions</li>
              <li>Calculates algorithmic time and space complexity</li>
              <li>Generates strength analysis and constructive areas to improve</li>
              <li>Provides instructor with an automated scoring recommendation</li>
            </ul>
          </div>

          <div className="panel">
            <h3 style={{ fontSize: '1.05rem', marginBottom: 14 }}>Grading Rubric</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: 6, borderBottom: '1px solid var(--slate-100)' }}>
                <span>Algorithmic Correctness</span>
                <strong>30%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: 6, borderBottom: '1px solid var(--slate-100)' }}>
                <span>Code Structure & Modularity</span>
                <strong>25%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', paddingBottom: 6, borderBottom: '1px solid var(--slate-100)' }}>
                <span>Validation, Metrics & Test Cases</span>
                <strong>25%</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span>Documentation & Code Comments</span>
                <strong>20%</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmission;
