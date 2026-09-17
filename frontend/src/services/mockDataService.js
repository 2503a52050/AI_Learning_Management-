// =========================================================
// EduPulse AI - Mock Data Service Layer
// Provides simulated async APIs with latency, error simulation, and localStorage persistence.
// =========================================================

import {
  initialMockUsers,
  mockStudentDashboard,
  mockPerformanceAnalytics,
  mockMarksData,
  mockAssignments,
  mockAIFeedback,
  mockAttendanceRecords,
  mockTeacherData,
  mockAdminData
} from '../data/mockData';

const DELAY_MS = 250;

// Helper to simulate network latency
const delay = (ms = DELAY_MS) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to load or initialize from localStorage
function getStorage(key, defaultVal) {
  try {
    const saved = localStorage.getItem(`ailms_${key}`);
    return saved ? JSON.parse(saved) : defaultVal;
  } catch (e) {
    return defaultVal;
  }
}

function setStorage(key, val) {
  try {
    localStorage.setItem(`ailms_${key}`, JSON.stringify(val));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

// Service methods
export const mockService = {
  // ---- STUDENT SERVICES ----
  async getStudentDashboard(shouldFail = false) {
    await delay();
    if (shouldFail) throw new Error('Failed to retrieve student dashboard records. Please check your network connection.');
    return getStorage('student_dashboard', mockStudentDashboard);
  },

  async getMyMarks(shouldFail = false) {
    await delay();
    if (shouldFail) throw new Error('Failed to retrieve marks sheet.');
    return getStorage('my_marks', mockMarksData);
  },

  async getPerformanceAnalytics(shouldFail = false) {
    await delay();
    if (shouldFail) throw new Error('Failed to compute performance analytics matrix.');
    return getStorage('performance_analytics', mockPerformanceAnalytics);
  },

  async getAssignments() {
    await delay();
    return getStorage('assignments', mockAssignments);
  },

  async getAssignmentById(id) {
    await delay();
    const list = getStorage('assignments', mockAssignments);
    const item = list.find(a => a.id === parseInt(id, 10));
    if (!item) throw new Error('Assignment not found');
    return item;
  },

  async submitAssignment(assignmentId, { submissionText, fileName }) {
    await delay(400);
    const list = getStorage('assignments', mockAssignments);
    const updated = list.map(a => {
      if (a.id === parseInt(assignmentId, 10)) {
        return {
          ...a,
          status: 'submitted',
          submittedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          submissionFile: fileName || 'submission.zip',
          studentText: submissionText || '',
          hasAIFeedback: true
        };
      }
      return a;
    });
    setStorage('assignments', updated);
    return { success: true, message: 'Assignment submitted successfully!' };
  },

  async getAIFeedback(assignmentId) {
    await delay();
    const id = parseInt(assignmentId, 10);
    const feedbacks = getStorage('ai_feedback', mockAIFeedback);
    if (feedbacks[id]) return feedbacks[id];

    // Auto-generate fallback feedback for newly submitted assignments
    return {
      assignmentTitle: 'Assignment Submission',
      score: 86,
      maxScore: 100,
      generatedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      rubrics: [
        { criterion: 'Solution Completeness', score: 26, maxScore: 30, remarks: 'Addressed all main requirements.' },
        { criterion: 'Quality and Style', score: 23, maxScore: 25, remarks: 'Consistent formatting and logic flow.' },
        { criterion: 'Accuracy & Robustness', score: 22, maxScore: 25, remarks: 'Verified test assertions passed.' },
        { criterion: 'Originality & Insights', score: 15, maxScore: 20, remarks: 'Clear individual explanation provided.' }
      ],
      strengths: ['Clear logical problem breakdown', 'Accurate syntax and data modeling'],
      improvements: ['Consider optimizing edge-case memory handling', 'Add more inline comments for complex methods'],
      aiSummary: 'Solid execution showing clear grasp of core concepts. Ready for final teacher grading.'
    };
  },

  async getStudyRecommendations() {
    await delay();
    return mockStudentDashboard.aiRecommendations;
  },

  async getAttendance() {
    await delay();
    return getStorage('attendance', mockAttendanceRecords);
  },

  async getStudentProfile() {
    await delay();
    return getStorage('student_profile', initialMockUsers[0]);
  },

  async updateStudentProfile(updatedData) {
    await delay(300);
    const current = getStorage('student_profile', initialMockUsers[0]);
    const merged = { ...current, ...updatedData };
    setStorage('student_profile', merged);
    return merged;
  },

  // ---- TEACHER SERVICES ----
  async getTeacherDashboard() {
    await delay();
    return mockTeacherData.stats;
  },

  async getTeacherStudents() {
    await delay();
    return getStorage('teacher_students', mockTeacherData.students);
  },

  async getMarksManagementSheet() {
    await delay();
    return getStorage('teacher_marks_sheet', mockTeacherData.marksSheet);
  },

  async updateStudentMark(studentId, field, value) {
    await delay(200);
    const sheet = getStorage('teacher_marks_sheet', mockTeacherData.marksSheet);
    const updated = sheet.map(row => {
      if (row.studentId === parseInt(studentId, 10)) {
        const copy = { ...row, [field]: Number(value) };
        copy.total = Math.round(copy.internal * 0.2 + copy.midterm * 0.3 + (copy.assignment || 80) * 0.2 + copy.final * 0.3);
        copy.grade = copy.total >= 90 ? 'A+' : copy.total >= 80 ? 'A' : copy.total >= 70 ? 'B+' : copy.total >= 60 ? 'C' : 'F';
        return copy;
      }
      return row;
    });
    setStorage('teacher_marks_sheet', updated);
    return updated;
  },

  async createAssignment(assignmentData) {
    await delay(350);
    const list = getStorage('assignments', mockAssignments);
    const newAssoc = {
      id: Date.now(),
      title: assignmentData.title,
      course: assignmentData.course || 'CS301: Artificial Intelligence',
      courseCode: assignmentData.courseCode || 'CS301',
      faculty: 'Dr. Robert Vance',
      dueDate: assignmentData.dueDate,
      maxMarks: parseInt(assignmentData.maxMarks || 100, 10),
      status: 'pending',
      marks: null,
      description: assignmentData.description || '',
      submittedAt: null,
      submissionFile: null,
      hasAIFeedback: false
    };
    list.unshift(newAssoc);
    setStorage('assignments', list);
    return newAssoc;
  },

  async evaluateSubmissionWithAI(studentName, assignmentTitle, codeOrText) {
    await delay(500);
    return {
      recommendedScore: 88,
      maxScore: 100,
      confidence: 0.94,
      analysis: `Evaluated submission for ${studentName}. The code addresses key constraints, accurately implements core algorithmic logic, and passes 9/10 simulated test suites. Minor memory cleanup issue detected.`,
      strengths: [
        'Optimal time complexity O(V + E log V)',
        'Proper type checks and defensive input assertions'
      ],
      areasToRefine: [
        'Slight memory leak in recursive call stack on large graphs',
        'Add formal Big-O documentation'
      ],
      draftFeedback: `Great work, ${studentName}! Your core implementation is robust and executes with optimal time complexity. Please review line 42 regarding cleanup of disconnected nodes.`
    };
  },

  async getClassAnalytics() {
    await delay();
    return mockTeacherData.classAnalytics;
  },

  // ---- ADMIN SERVICES ----
  async getAdminDashboard() {
    await delay();
    return {
      stats: mockAdminData.stats,
      logs: mockAdminData.systemLogs
    };
  },

  async getAllUsers() {
    await delay();
    return getStorage('admin_all_users', initialMockUsers);
  },

  async toggleUserStatus(userId) {
    await delay(200);
    const users = getStorage('admin_all_users', initialMockUsers);
    const updated = users.map(u => {
      if (u.id === parseInt(userId, 10)) {
        return { ...u, status: u.status === 'active' ? 'inactive' : 'active' };
      }
      return u;
    });
    setStorage('admin_all_users', updated);
    return updated;
  },

  async getAdminStudents() {
    await delay();
    return getStorage('teacher_students', mockTeacherData.students);
  },

  async getAdminTeachers() {
    await delay();
    return [
      { id: 2, name: 'Dr. Robert Vance', department: 'Computer Science', courses: 2, students: 128, rating: 4.8, status: 'active' },
      { id: 4, name: 'Prof. Anita Sharma', department: 'Information Technology', courses: 2, students: 135, rating: 4.9, status: 'active' },
      { id: 5, name: 'Prof. Sarah Lin', department: 'Software Engineering', courses: 1, students: 115, rating: 4.7, status: 'active' },
      { id: 6, name: 'Prof. Mark Jensen', department: 'Electronics & Comm.', courses: 2, students: 122, rating: 4.6, status: 'active' },
      { id: 7, name: 'Prof. David Miller', department: 'Mathematics', courses: 2, students: 150, rating: 4.5, status: 'active' }
    ];
  },

  async getSubjects() {
    await delay();
    return getStorage('admin_subjects', mockAdminData.subjects);
  },

  async createSubject(subject) {
    await delay(300);
    const list = getStorage('admin_subjects', mockAdminData.subjects);
    const newItem = {
      id: Date.now(),
      code: subject.code,
      name: subject.name,
      department: subject.department,
      credits: parseInt(subject.credits || 3, 10),
      teacher: subject.teacher || 'Unassigned',
      enrolled: 0
    };
    list.push(newItem);
    setStorage('admin_subjects', list);
    return newItem;
  }
};
