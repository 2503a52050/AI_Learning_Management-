import React, { useEffect, useState } from 'react';
import { mockService } from '../../services/mockDataService';
import MarksTable from '../../components/student/MarksTable';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';
import DashboardCard from '../../components/common/DashboardCard';
import { Award, BookCheck, TrendingUp, Download, CheckCircle2 } from 'lucide-react';

const MyMarks = () => {
  const [marks, setMarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('Semester 5 (Current)');

  const fetchMarks = async (shouldFail = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await mockService.getMyMarks(shouldFail);
      setMarks(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch marks sheet.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarks();
  }, []);

  const totalCredits = marks.reduce((sum, item) => sum + (item.credits || 0), 0);
  const totalScore = marks.reduce((sum, item) => sum + item.total, 0);
  const avgPercentage = marks.length ? Math.round(totalScore / marks.length) : 0;
  const passedCount = marks.filter((m) => m.status === 'Passed').length;

  if (loading) return <LoadingSpinner message="Calculating cumulative grade points & marks..." />;
  if (error) return <ErrorMessage message={error} onRetry={() => fetchMarks(false)} />;

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>My Marks & Academic Transcript</h1>
          <p className="page-subtitle">
            Comprehensive breakdown of internal, mid-semester, and final examination assessments.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <select
            className="role-switcher-select"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="Semester 5 (Current)">Semester 5 (Current)</option>
            <option value="Semester 4">Semester 4</option>
            <option value="Semester 3">Semester 3</option>
          </select>

          <button
            className="btn btn-outline btn-sm"
            onClick={() => alert('Transcript report generated and downloaded as PDF.')}
          >
            <Download size={15} />
            Export Grade Card
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-grid">
        <DashboardCard
          title="Current SGPA"
          value="8.84 / 10"
          trend="Top 10% in CSE"
          trendType="positive"
          color="primary"
          icon={Award}
        />
        <DashboardCard
          title="Average Percentage"
          value={`${avgPercentage}%`}
          trend="+5.2% vs Semester 4"
          trendType="positive"
          color="emerald"
          icon={TrendingUp}
        />
        <DashboardCard
          title="Earned Credits"
          value={`${totalCredits} / ${totalCredits}`}
          subtitle="All Courses Cleared"
          color="purple"
          icon={BookCheck}
        />
        <DashboardCard
          title="Course Clearance"
          value={`${passedCount} / ${marks.length}`}
          subtitle="Zero Backlogs"
          color="emerald"
          icon={CheckCircle2}
        />
      </div>

      {/* Marks Table Panel */}
      <div className="panel">
        <div className="panel-title">
          <span>{selectedSemester} Subject Assessment Matrix</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--slate-500)' }}>
            Grading Scale: 10-point relative standard
          </span>
        </div>

        <MarksTable marks={marks} showBreakdown={true} />
      </div>
    </div>
  );
};

export default MyMarks;
