import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyMarks from './pages/student/MyMarks';
import PerformanceAnalytics from './pages/student/PerformanceAnalytics';
import Assignments from './pages/student/Assignments';
import AssignmentSubmission from './pages/student/AssignmentSubmission';
import AIAssignmentFeedback from './pages/student/AIAssignmentFeedback';
import StudyRecommendations from './pages/student/StudyRecommendations';
import Attendance from './pages/student/Attendance';
import Profile from './pages/student/Profile';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import StudentManagement from './pages/teacher/StudentManagement';
import MarksManagement from './pages/teacher/MarksManagement';
import AssignmentManagement from './pages/teacher/AssignmentManagement';
import AssignmentSubmissions from './pages/teacher/AssignmentSubmissions';
import AIAssignmentEvaluation from './pages/teacher/AIAssignmentEvaluation';
import ClassAnalytics from './pages/teacher/ClassAnalytics';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import AdminStudentManagement from './pages/admin/AdminStudentManagement';
import AdminTeacherManagement from './pages/admin/AdminTeacherManagement';
import SubjectManagement from './pages/admin/SubjectManagement';

// Dynamic Root Redirector
const RootRedirect = () => {
  const { user, role, isAuthenticated } = useAuth();
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }
  if (role === 'teacher') return <Navigate to="/teacher" replace />;
  if (role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/student" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Root redirector based on authentication and active role */}
      <Route path="/" element={<RootRedirect />} />

      {/* Student Portal Routes */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentDashboard />} />
        <Route path="marks" element={<MyMarks />} />
        <Route path="analytics" element={<PerformanceAnalytics />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="assignments/submit/:id" element={<AssignmentSubmission />} />
        <Route path="feedback" element={<AIAssignmentFeedback />} />
        <Route path="feedback/:id" element={<AIAssignmentFeedback />} />
        <Route path="recommendations" element={<StudyRecommendations />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Teacher Portal Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute allowedRoles={['teacher']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<TeacherDashboard />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="marks" element={<MarksManagement />} />
        <Route path="assignments" element={<AssignmentManagement />} />
        <Route path="submissions" element={<AssignmentSubmissions />} />
        <Route path="ai-eval" element={<AIAssignmentEvaluation />} />
        <Route path="analytics" element={<ClassAnalytics />} />
      </Route>

      {/* Admin Portal Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="students" element={<AdminStudentManagement />} />
        <Route path="teachers" element={<AdminTeacherManagement />} />
        <Route path="subjects" element={<SubjectManagement />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
