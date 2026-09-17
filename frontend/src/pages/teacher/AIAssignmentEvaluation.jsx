import React, { useState } from 'react';
import { mockService } from '../../services/mockDataService';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import {
  Bot,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Send,
  RotateCcw,
  Award
} from 'lucide-react';

const AIAssignmentEvaluation = () => {
  const [student, setStudent] = useState('Devon Patel');
  const [evaluating, setEvaluating] = useState(false);
  const [approved, setApproved] = useState(false);

  const [evaluation, setEvaluation] = useState({
    recommendedScore: 84,
    maxScore: 100,
    confidence: 0.94,
    analysis: 'Devon implemented a clean 2-layer perceptron. Gradient calculations for weights and biases are mathematically sound. Validation accuracy reaches 94.2% on MNIST test batch.',
    strengths: [
      'Accurate mathematical matrix vectorization using NumPy.',
      'Modular object-oriented class architecture separating Dense layer from Activations.'
    ],
    areasToRefine: [
      'Missing Xavier initialization leading to slow convergence in first 5 epochs.',
      'Learning rate scheduler could be added to prevent loss oscillations.'
    ],
    draftFeedback: 'Solid implementation Devon! Your backpropagation derivations are exact and modular. For future projects, consider incorporating Xavier initialization to accelerate early epoch convergence.'
  });

  const [overrideScore, setOverrideScore] = useState(84);
  const [feedbackText, setFeedbackText] = useState(evaluation.draftFeedback);

  const handleRunAI = async () => {
    setEvaluating(true);
    setApproved(false);
    try {
      const result = await mockService.evaluateSubmissionWithAI(student, 'Neural Network Backpropagation', '');
      setEvaluation(result);
      setOverrideScore(result.recommendedScore);
      setFeedbackText(result.draftFeedback);
    } finally {
      setEvaluating(false);
    }
  };

  const handleApprove = () => {
    setApproved(true);
    setTimeout(() => setApproved(false), 3500);
  };

  return (
    <div>
      <div className="page-header">
        <div className="page-title-group">
          <h1>AI-Assisted Assignment Evaluation</h1>
          <p className="page-subtitle">
            Autonomous rubric scoring, code verification, and AI-drafted formative feedback for instructors.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--slate-600)' }}>
            Select Student:
          </span>
          <select
            className="role-switcher-select"
            value={student}
            onChange={(e) => {
              setStudent(e.target.value);
              setApproved(false);
            }}
          >
            <option value="Devon Patel">Devon Patel (CS-2024-088)</option>
            <option value="Marcus Chen">Marcus Chen (CS-2024-033)</option>
            <option value="Priya Sharma">Priya Sharma (CS-2024-059)</option>
            <option value="Lucas Scott">Lucas Scott (CS-2024-074)</option>
          </select>
        </div>
      </div>

      {approved && (
        <div style={{ background: 'var(--emerald-50)', border: '1px solid #a7f3d0', padding: 14, borderRadius: 10, color: 'var(--emerald-700)', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <CheckCircle2 size={20} />
          <span>Grade of {overrideScore}/100 and personalized feedback successfully posted to {student}'s portal!</span>
        </div>
      )}

      <div className="grid-2col">
        {/* Left Column: Submitted Artifact & Code Viewer */}
        <div>
          <div className="panel" style={{ marginBottom: 20 }}>
            <div className="panel-title">
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <FileCode size={18} style={{ color: 'var(--primary-600)' }} />
                Student Code Submission: {student}
              </span>
              <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: 'var(--slate-500)' }}>
                mlp_backprop_submission.py
              </span>
            </div>

            <pre
              style={{
                background: 'var(--slate-900)',
                color: '#e2e8f0',
                padding: 16,
                borderRadius: 8,
                fontSize: '0.825rem',
                fontFamily: 'Consolas, Monaco, monospace',
                overflowX: 'auto',
                lineHeight: 1.5,
                maxHeight: 340
              }}
            >
{`import numpy as np

class DenseLayer:
    def __init__(self, n_inputs, n_neurons):
        self.weights = 0.01 * np.random.randn(n_inputs, n_neurons)
        self.biases = np.zeros((1, n_neurons))
        
    def forward(self, inputs):
        self.inputs = inputs
        self.output = np.dot(inputs, self.weights) + self.biases
        return self.output
        
    def backward(self, dvalues, learning_rate):
        self.dweights = np.dot(self.inputs.T, dvalues)
        self.dbiases = np.sum(dvalues, axis=0, keepdims=True)
        self.dinputs = np.dot(dvalues, self.weights.T)
        # Gradient descent parameter updates
        self.weights -= learning_rate * self.dweights
        self.biases -= learning_rate * self.dbiases
        return self.dinputs`}
            </pre>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: 14 }}
              onClick={handleRunAI}
              disabled={evaluating}
            >
              <Sparkles size={16} />
              {evaluating ? 'Analyzing AST & Running Test Harness...' : 'Re-Run AI Rubric Evaluation'}
            </button>
          </div>
        </div>

        {/* Right Column: AI Grading Workbench */}
        <div>
          <div className="panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Bot size={20} style={{ color: 'var(--primary-600)' }} />
                <h3 style={{ fontSize: '1.1rem' }}>AI Co-Pilot Diagnostic</h3>
              </div>
              <span className="badge badge-success">Confidence: {Math.round(evaluation.confidence * 100)}%</span>
            </div>

            <div style={{ background: 'var(--slate-50)', padding: 14, borderRadius: 10, marginBottom: 16, border: '1px solid var(--slate-200)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate-500)', textTransform: 'uppercase' }}>
                Automated Rubric Score
              </span>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-600)' }}>
                  {evaluation.recommendedScore} <span style={{ fontSize: '1rem', color: 'var(--slate-400)' }}>/ 100</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Override:</span>
                  <input
                    type="number"
                    value={overrideScore}
                    onChange={(e) => setOverrideScore(e.target.value)}
                    style={{ width: 70, padding: '4px 8px', borderRadius: 6, border: '1px solid var(--slate-300)' }}
                  />
                </div>
              </div>
            </div>

            {/* Strengths */}
            <div style={{ marginBottom: 14 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--emerald-600)', display: 'block', marginBottom: 6 }}>
                ✓ Code Strengths:
              </span>
              <ul style={{ paddingLeft: 18, fontSize: '0.825rem', color: 'var(--slate-700)', lineHeight: 1.6 }}>
                {evaluation.strengths.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            {/* Areas to refine */}
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--amber-600)', display: 'block', marginBottom: 6 }}>
                ⚠ Potential Optimizations:
              </span>
              <ul style={{ paddingLeft: 18, fontSize: '0.825rem', color: 'var(--slate-700)', lineHeight: 1.6 }}>
                {evaluation.areasToRefine.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>

            {/* Feedback box */}
            <div className="form-group">
              <label className="form-label">Formative Feedback (Editable by Faculty)</label>
              <textarea
                className="form-control"
                rows={3}
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
              />
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%' }}
              onClick={handleApprove}
            >
              <CheckCircle2 size={16} /> Approve & Publish Grade to Student Portal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssignmentEvaluation;
