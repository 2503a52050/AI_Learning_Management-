// =========================================================
// EduPulse AI - Mock Database & Domain Entities
// =========================================================

export const initialMockUsers = [
  {
    id: 1,
    name: 'Alex Morgan',
    email: 'student@ailms.com',
    role: 'student',
    rollNumber: 'CS-2024-042',
    department: 'Computer Science & AI',
    semester: 'Semester 5',
    cgpa: 3.84,
    avatar: 'AM',
    phone: '+1 (555) 234-5678',
    joinedDate: 'August 2024',
    status: 'active'
  },
  {
    id: 2,
    name: 'Dr. Robert Vance',
    email: 'teacher@ailms.com',
    role: 'teacher',
    department: 'Computer Science & Engineering',
    designation: 'Associate Professor',
    coursesTaught: ['CS301: Artificial Intelligence', 'CS204: Data Structures'],
    avatar: 'RV',
    phone: '+1 (555) 876-5432',
    joinedDate: 'July 2020',
    status: 'active'
  },
  {
    id: 3,
    name: 'Eleanor Vance',
    email: 'admin@ailms.com',
    role: 'admin',
    department: 'Academic Administration',
    designation: 'Chief Academic Registrar',
    avatar: 'EV',
    phone: '+1 (555) 999-0000',
    joinedDate: 'January 2018',
    status: 'active'
  }
];

export const mockStudentDashboard = {
  overallPercentage: 84.5,
  averageMarks: 84.5,
  attendancePercentage: 89,
  strongSubjects: [
    { name: 'Artificial Intelligence', score: 92, grade: 'A+' },
    { name: 'Data Structures & Algorithms', score: 88, grade: 'A' },
    { name: 'Database Management Systems', score: 85, grade: 'A' }
  ],
  weakSubjects: [
    { name: 'Computer Networks', score: 71, grade: 'B' },
    { name: 'Discrete Mathematics', score: 68, grade: 'B-' }
  ],
  recentAssignments: [
    { id: 101, title: 'Neural Network Backpropagation', course: 'Artificial Intelligence', dueDate: '2026-09-15', status: 'graded', marks: 95, maxMarks: 100 },
    { id: 102, title: 'B-Tree Indexing Implementation', course: 'Database Management Systems', dueDate: '2026-09-18', status: 'graded', marks: 88, maxMarks: 100 },
    { id: 103, title: 'Subnetting & CIDR Routing Table', course: 'Computer Networks', dueDate: '2026-09-22', status: 'submitted', marks: null, maxMarks: 100 },
    { id: 104, title: 'Graph Dijkstra & Prim Implementation', course: 'Data Structures', dueDate: '2026-09-26', status: 'pending', marks: null, maxMarks: 100 }
  ],
  assignmentScores: [
    { assignment: 'A1: Neural Nets', score: 95 },
    { assignment: 'A2: B-Tree Index', score: 88 },
    { assignment: 'A3: SQL Optim.', score: 90 },
    { assignment: 'A4: Dijkstra', score: 84 },
    { assignment: 'A5: TCP Socket', score: 72 }
  ],
  performanceTrend: [
    { month: 'Jan', score: 68, classAvg: 65 },
    { month: 'Feb', score: 72, classAvg: 67 },
    { month: 'Mar', score: 75, classAvg: 70 },
    { month: 'Apr', score: 79, classAvg: 72 },
    { month: 'May', score: 82, classAvg: 73 },
    { month: 'Jun', score: 85, classAvg: 75 }
  ],
  aiRecommendations: [
    {
      id: 'rec-1',
      title: 'Revise Subnet Masking in Computer Networks',
      description: 'Your recent quiz score indicates difficulty with CIDR notation. Practice 5 routing calculations to improve by ~8%.',
      priority: 'High',
      subject: 'Computer Networks',
      timeEstimate: '45 mins'
    },
    {
      id: 'rec-2',
      title: 'Reinforce Combinatorics Proofs',
      description: 'Your mid-term discrete math score showed minor gaps in mathematical induction. Watch the recommended AI lecture snippet.',
      priority: 'Medium',
      subject: 'Discrete Mathematics',
      timeEstimate: '30 mins'
    },
    {
      id: 'rec-3',
      title: 'Ready for Advanced Deep Learning Lab',
      description: 'Outstanding 95% on backpropagation! You have qualified for the optional Convolutional Vision challenge module.',
      priority: 'Low',
      subject: 'Artificial Intelligence',
      timeEstimate: '60 mins'
    }
  ]
};

export const mockPerformanceAnalytics = {
  overallPercentage: 84.5,
  improvementPercentage: 8.4,
  subjectWiseMarks: [
    { subject: 'Artificial Intelligence', marks: 92, target: 90, grade: 'A+' },
    { subject: 'Data Structures', marks: 88, target: 85, grade: 'A' },
    { subject: 'Database Systems', marks: 85, target: 85, grade: 'A' },
    { subject: 'Software Engineering', marks: 81, target: 80, grade: 'B+' },
    { subject: 'Computer Networks', marks: 71, target: 80, grade: 'B' },
    { subject: 'Discrete Math', marks: 68, target: 75, grade: 'B-' }
  ],
  topicWiseMarks: [
    { topic: 'Deep Learning & Neural Networks', subject: 'Artificial Intelligence', marks: 94, category: 'strong' },
    { topic: 'Graph Algorithms & Trees', subject: 'Data Structures', marks: 90, category: 'strong' },
    { topic: 'Query Optimization & Indexing', subject: 'Database Systems', marks: 87, category: 'strong' },
    { topic: 'Agile & Design Patterns', subject: 'Software Engineering', marks: 82, category: 'moderate' },
    { topic: 'TCP/IP & Socket Programming', subject: 'Computer Networks', marks: 65, category: 'weak' },
    { topic: 'Subnetting & Routing Tables', subject: 'Computer Networks', marks: 63, category: 'weak' },
    { topic: 'Combinatorics & Induction', subject: 'Discrete Math', marks: 61, category: 'weak' }
  ],
  strongTopics: [
    { name: 'Deep Learning & Neural Networks', marks: 94, subject: 'Artificial Intelligence' },
    { name: 'Graph Algorithms & Trees', marks: 90, subject: 'Data Structures' },
    { name: 'Query Optimization & Indexing', marks: 87, subject: 'Database Systems' }
  ],
  weakTopics: [
    { name: 'Subnetting & Routing Tables', marks: 63, subject: 'Computer Networks' },
    { name: 'TCP/IP & Socket Programming', marks: 65, subject: 'Computer Networks' },
    { name: 'Combinatorics & Induction', marks: 61, subject: 'Discrete Math' }
  ],
  performanceTrend: [
    { term: 'Term 1', studentScore: 72, classAverage: 68 },
    { term: 'Term 2', studentScore: 76, classAverage: 70 },
    { term: 'Midterm', studentScore: 80, classAverage: 73 },
    { term: 'Term 3', studentScore: 82, classAverage: 74 },
    { term: 'Term 4', studentScore: 85, classAverage: 76 }
  ],
  aiRecommendations: [
    {
      id: 'pa-1',
      title: 'Targeted Practice: Computer Networks Routing Protocols',
      description: 'Allocating 2 hours this weekend on OSPF and Subnetting will elevate your overall semester grade past 87%.',
      priority: 'High',
      expectedGain: '+4.2%'
    },
    {
      id: 'pa-2',
      title: 'Discrete Math Logic Tables Review',
      description: 'Revisiting truth table reductions and predicate calculus will address your bottom quartile topic.',
      priority: 'High',
      expectedGain: '+3.5%'
    },
    {
      id: 'pa-3',
      title: 'Maintain Momentum in Data Structures',
      description: 'Your algorithmic complexity analysis is in the top 5% of your class. Consider mentoring a study circle.',
      priority: 'Medium',
      expectedGain: '+1.0%'
    }
  ]
};

export const mockMarksData = [
  { id: 1, code: 'CS301', subject: 'Artificial Intelligence', internal: 19, midterm: 28, final: 45, total: 92, max: 100, grade: 'A+', credits: 4, status: 'Passed' },
  { id: 2, code: 'CS204', subject: 'Data Structures & Algorithms', internal: 18, midterm: 27, final: 43, total: 88, max: 100, grade: 'A', credits: 4, status: 'Passed' },
  { id: 3, code: 'CS305', subject: 'Database Management Systems', internal: 17, midterm: 26, final: 42, total: 85, max: 100, grade: 'A', credits: 4, status: 'Passed' },
  { id: 4, code: 'CS308', subject: 'Software Engineering', internal: 16, midterm: 25, final: 40, total: 81, max: 100, grade: 'B+', credits: 3, status: 'Passed' },
  { id: 5, code: 'CS310', subject: 'Computer Networks', internal: 14, midterm: 21, final: 36, total: 71, max: 100, grade: 'B', credits: 4, status: 'Passed' },
  { id: 6, code: 'MA202', subject: 'Discrete Mathematics', internal: 13, midterm: 20, final: 35, total: 68, max: 100, grade: 'B-', credits: 3, status: 'Passed' }
];

export const mockAssignments = [
  {
    id: 101,
    title: 'Neural Network Backpropagation & Gradient Descent',
    course: 'Artificial Intelligence',
    courseCode: 'CS301',
    faculty: 'Dr. Robert Vance',
    dueDate: '2026-09-15',
    maxMarks: 100,
    status: 'graded',
    marks: 95,
    description: 'Implement a multi-layer perceptron from scratch in Python with manual backpropagation. Include test validation on MNIST digits.',
    submittedAt: '2026-09-14 18:30',
    submissionFile: 'mlp_backprop_alex_morgan.py',
    hasAIFeedback: true
  },
  {
    id: 102,
    title: 'B-Tree Indexing Implementation and Benchmarking',
    course: 'Database Management Systems',
    courseCode: 'CS305',
    faculty: 'Prof. Anita Sharma',
    dueDate: '2026-09-18',
    maxMarks: 100,
    status: 'graded',
    marks: 88,
    description: 'Implement a disk-backed B+ tree index in C++ or Python with insert, search, and split algorithms.',
    submittedAt: '2026-09-17 21:10',
    submissionFile: 'btree_index_v2.zip',
    hasAIFeedback: true
  },
  {
    id: 103,
    title: 'Subnetting & CIDR Routing Table Configuration',
    course: 'Computer Networks',
    courseCode: 'CS310',
    faculty: 'Prof. Mark Jensen',
    dueDate: '2026-09-22',
    maxMarks: 100,
    status: 'submitted',
    marks: null,
    description: 'Design an IPv4 addressing schema for a 4-branch campus using VLSM. Provide Cisco packet tracer simulation file.',
    submittedAt: '2026-09-20 14:15',
    submissionFile: 'campus_vlsm_simulation.pkt',
    hasAIFeedback: true
  },
  {
    id: 104,
    title: 'Graph Dijkstra & Prim MST Implementation',
    course: 'Data Structures & Algorithms',
    courseCode: 'CS204',
    faculty: 'Dr. Robert Vance',
    dueDate: '2026-09-28',
    maxMarks: 100,
    status: 'pending',
    marks: null,
    description: 'Write an optimized priority-queue implementation of Dijkstra shortest path and Prim MST with time complexity analysis.',
    submittedAt: null,
    submissionFile: null,
    hasAIFeedback: false
  },
  {
    id: 105,
    title: 'Agile Sprint Backlog & Burndown Simulation',
    course: 'Software Engineering',
    courseCode: 'CS308',
    faculty: 'Prof. Sarah Lin',
    dueDate: '2026-10-04',
    maxMarks: 100,
    status: 'pending',
    marks: null,
    description: 'Create user stories, acceptance criteria, and sprint plan for an AI-powered telemedicine web portal.',
    submittedAt: null,
    submissionFile: null,
    hasAIFeedback: false
  }
];

export const mockAIFeedback = {
  101: {
    assignmentTitle: 'Neural Network Backpropagation & Gradient Descent',
    score: 95,
    maxScore: 100,
    generatedAt: '2026-09-14 19:02',
    rubrics: [
      { criterion: 'Algorithmic Correctness', score: 30, maxScore: 30, remarks: 'Exact gradient derivation verified. Weight updates match theoretical formulas.' },
      { criterion: 'Code Structure & Efficiency', score: 24, maxScore: 25, remarks: 'Clean vectorized matrix math using NumPy. Vectorized operations run in under 4 seconds.' },
      { criterion: 'Validation & Metrics', score: 22, maxScore: 25, remarks: 'Achieved 96.8% accuracy on test set. Loss curve graph is properly labeled.' },
      { criterion: 'Documentation & Code Comments', score: 19, maxScore: 20, remarks: 'Well documented docstrings. Derivations explained in markdown.' }
    ],
    strengths: [
      'Exceptional vectorization eliminating redundant Python for-loops.',
      'Comprehensive error handling for numerical overflow in softmax activation.',
      'Clear modular architecture separating layers, activation functions, and optimizer.'
    ],
    improvements: [
      'Could incorporate mini-batch gradient descent with momentum to speed up convergence.',
      'Add Xavier/He weight initialization to prevent vanishing gradient in deeper layers.'
    ],
    aiSummary: 'Top-tier implementation displaying profound mastery of calculus-based optimization. Ready to progress to Convolutional and Transformer architectures.'
  },
  102: {
    assignmentTitle: 'B-Tree Indexing Implementation',
    score: 88,
    maxScore: 100,
    generatedAt: '2026-09-17 21:45',
    rubrics: [
      { criterion: 'Node Splitting Logic', score: 28, maxScore: 30, remarks: 'Splits odd order nodes accurately.' },
      { criterion: 'Search & Traversal', score: 25, maxScore: 25, remarks: 'Logarithmic search time verified.' },
      { criterion: 'Disk Serialization', score: 20, maxScore: 25, remarks: 'Slight overhead during disk flush buffer.' },
      { criterion: 'Test Suite', score: 15, maxScore: 20, remarks: 'Edge cases for duplicate key inserts need additional coverage.' }
    ],
    strengths: [
      'Robust leaf-node linked list implementation for range queries.',
      'Excellent memory management and cache friendliness.'
    ],
    improvements: [
      'Fix concurrency locking if extending to multi-threaded reads/writes.'
    ],
    aiSummary: 'Strong systems-level programming demonstrating clear conceptual understanding of database storage engines.'
  },
  103: {
    assignmentTitle: 'Subnetting & CIDR Routing Table Configuration',
    score: 82,
    maxScore: 100,
    generatedAt: '2026-09-20 15:00',
    rubrics: [
      { criterion: 'Subnet Partitioning', score: 26, maxScore: 30, remarks: 'VLSM allocations are mostly optimal.' },
      { criterion: 'Router Config Syntax', score: 25, maxScore: 25, remarks: 'Cisco IOS syntax is valid and well structured.' },
      { criterion: 'Default Gateway Assignment', score: 18, maxScore: 25, remarks: 'Branch 3 default gateway has an off-by-one IP clash.' },
      { criterion: 'Network Diagram', score: 13, maxScore: 20, remarks: 'Diagram is clear but missing interface labels (fa0/1).' }
    ],
    strengths: [
      'Accurate broadcast and network address calculations for Branches 1 and 2.',
      'Static routing statements configure basic connectivity successfully.'
    ],
    improvements: [
      'Recalculate subnet mask for Branch 3 to avoid conflicting with the broadcast IP of Branch 2.',
      'Label router interfaces on the topology diagram.'
    ],
    aiSummary: 'Good overall submission. Addressing the CIDR overlap on Branch 3 will ensure 100% packet delivery in simulation.'
  }
};

export const mockAttendanceRecords = [
  { course: 'CS301: Artificial Intelligence', faculty: 'Dr. Robert Vance', totalClasses: 36, attendedClasses: 34, percentage: 94, status: 'Good' },
  { course: 'CS204: Data Structures & Algorithms', faculty: 'Dr. Robert Vance', totalClasses: 40, attendedClasses: 37, percentage: 92, status: 'Good' },
  { course: 'CS305: Database Systems', faculty: 'Prof. Anita Sharma', totalClasses: 38, attendedClasses: 34, percentage: 89, status: 'Good' },
  { course: 'CS308: Software Engineering', faculty: 'Prof. Sarah Lin', totalClasses: 32, attendedClasses: 28, percentage: 87, status: 'Good' },
  { course: 'CS310: Computer Networks', faculty: 'Prof. Mark Jensen', totalClasses: 36, attendedClasses: 28, percentage: 77, status: 'Warning' },
  { course: 'MA202: Discrete Mathematics', faculty: 'Prof. David Miller', totalClasses: 34, attendedClasses: 24, percentage: 70, status: 'Critical' }
];

export const mockTeacherData = {
  stats: {
    totalStudents: 128,
    classAverage: 78.4,
    pendingSubmissions: 14,
    topCoursePassRate: 94.2
  },
  students: [
    { id: 1, name: 'Alex Morgan', rollNo: 'CS-2024-042', email: 'student@ailms.com', avgMarks: 84.5, attendance: 89, status: 'Top Performer', risk: 'Low' },
    { id: 2, name: 'Samantha Reed', rollNo: 'CS-2024-015', email: 'samantha.r@ailms.com', avgMarks: 91.2, attendance: 96, status: 'Top Performer', risk: 'Low' },
    { id: 3, name: 'Devon Patel', rollNo: 'CS-2024-088', email: 'devon.p@ailms.com', avgMarks: 76.0, attendance: 82, status: 'Average', risk: 'Low' },
    { id: 4, name: 'Marcus Chen', rollNo: 'CS-2024-033', email: 'marcus.c@ailms.com', avgMarks: 64.2, attendance: 71, status: 'At Risk', risk: 'High' },
    { id: 5, name: 'Priya Sharma', rollNo: 'CS-2024-059', email: 'priya.s@ailms.com', avgMarks: 88.0, attendance: 92, status: 'Top Performer', risk: 'Low' },
    { id: 6, name: 'Lucas Scott', rollNo: 'CS-2024-074', email: 'lucas.s@ailms.com', avgMarks: 58.5, attendance: 65, status: 'At Risk', risk: 'High' }
  ],
  marksSheet: [
    { studentId: 1, name: 'Alex Morgan', rollNo: 'CS-2024-042', internal: 19, midterm: 28, assignment: 95, final: 45, total: 92, grade: 'A+' },
    { studentId: 2, name: 'Samantha Reed', rollNo: 'CS-2024-015', internal: 20, midterm: 29, assignment: 98, final: 47, total: 96, grade: 'A+' },
    { studentId: 3, name: 'Devon Patel', rollNo: 'CS-2024-088', internal: 16, midterm: 23, assignment: 82, final: 38, total: 77, grade: 'B+' },
    { studentId: 4, name: 'Marcus Chen', rollNo: 'CS-2024-033', internal: 12, midterm: 18, assignment: 68, final: 32, total: 62, grade: 'C' },
    { studentId: 5, name: 'Priya Sharma', rollNo: 'CS-2024-059', internal: 18, midterm: 27, assignment: 90, final: 44, total: 89, grade: 'A' },
    { studentId: 6, name: 'Lucas Scott', rollNo: 'CS-2024-074', internal: 11, midterm: 16, assignment: 60, final: 29, total: 56, grade: 'D' }
  ],
  classAnalytics: {
    gradeDistribution: [
      { grade: 'A+ (90-100)', count: 24 },
      { grade: 'A (80-89)', count: 42 },
      { grade: 'B (70-79)', count: 36 },
      { grade: 'C (60-69)', count: 18 },
      { grade: 'D/F (<60)', count: 8 }
    ],
    topicMastery: [
      { topic: 'Neural Networks & Backpropagation', mastery: 88 },
      { topic: 'Heuristic Search & A* Search', mastery: 84 },
      { topic: 'Knowledge Representation & Prolog', mastery: 72 },
      { topic: 'Reinforcement Learning & Q-Learning', mastery: 64 },
      { topic: 'Natural Language Processing', mastery: 79 }
    ],
    attendanceCorrelation: [
      { attendanceRange: '90-100%', avgScore: 89 },
      { attendanceRange: '80-89%', avgScore: 81 },
      { attendanceRange: '70-79%', avgScore: 71 },
      { attendanceRange: '<70%', avgScore: 57 }
    ]
  }
};

export const mockAdminData = {
  stats: {
    totalStudents: 1420,
    totalTeachers: 68,
    totalSubjects: 42,
    systemUptime: '99.98%'
  },
  subjects: [
    { id: 1, code: 'CS301', name: 'Artificial Intelligence', department: 'Computer Science', credits: 4, teacher: 'Dr. Robert Vance', enrolled: 128 },
    { id: 2, code: 'CS204', name: 'Data Structures & Algorithms', department: 'Computer Science', credits: 4, teacher: 'Dr. Robert Vance', enrolled: 140 },
    { id: 3, code: 'CS305', name: 'Database Management Systems', department: 'Information Technology', credits: 4, teacher: 'Prof. Anita Sharma', enrolled: 135 },
    { id: 4, code: 'CS308', name: 'Software Engineering', department: 'Computer Science', credits: 3, teacher: 'Prof. Sarah Lin', enrolled: 115 },
    { id: 5, code: 'CS310', name: 'Computer Networks', department: 'Electronics & Comm.', credits: 4, teacher: 'Prof. Mark Jensen', enrolled: 122 },
    { id: 6, code: 'MA202', name: 'Discrete Mathematics', department: 'Mathematics', credits: 3, teacher: 'Prof. David Miller', enrolled: 150 }
  ],
  systemLogs: [
    { id: 1, event: 'Automated AI Performance Batch Evaluation completed', time: '10 mins ago', type: 'info' },
    { id: 2, event: 'New assignment created by Dr. Robert Vance: CS301', time: '35 mins ago', type: 'success' },
    { id: 3, event: 'Attendance anomaly flagged: 12 students below 75% threshold in MA202', time: '1 hour ago', type: 'warning' },
    { id: 4, event: 'Database backup synchronized successfully', time: '3 hours ago', type: 'info' }
  ]
};
