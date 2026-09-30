import React, { useState } from 'react';
import { Calendar, Clock, Users, AlertTriangle, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, GanttChart } from 'recharts';
import './ScheduleOptimizer.css';

function ScheduleOptimizer() {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimized, setOptimized] = useState(false);

  const scheduleData = [
    { task: 'Track Inspection A', start: '08:00', duration: 2, department: 'Track', priority: 'High' },
    { task: 'Signal Repair B', start: '10:00', duration: 3, department: 'Signal', priority: 'Critical' },
    { task: 'Bridge Maint. C', start: '09:00', duration: 4, department: 'Bridge', priority: 'Medium' },
    { task: 'Electrical Panel', start: '13:00', duration: 2, department: 'Electrical', priority: 'Low' },
  ];

  const optimizedSchedule = [
    { task: 'Signal Repair B', start: '08:00', duration: 3, department: 'Signal', priority: 'Critical' },
    { task: 'Track Inspection A', start: '08:00', duration: 2, department: 'Track', priority: 'High' },
    { task: 'Bridge Maint. C', start: '10:00', duration: 4, department: 'Bridge', priority: 'Medium' },
    { task: 'Electrical Panel', start: '14:00', duration: 2, department: 'Electrical', priority: 'Low' },
  ];

  const handleOptimize = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      setIsOptimizing(false);
      setOptimized(true);
    }, 2000);
  };

  return (
    <div className="schedule-page">
      <div className="page-header">
        <div>
          <h1>Schedule Optimizer</h1>
          <p>Optimize maintenance schedules using AI-powered algorithms</p>
        </div>
        <button
          className={`btn-optimize ${optimized ? 'optimized' : ''}`}
          onClick={handleOptimize}
          disabled={isOptimizing}
        >
          <Zap size={18} />
          {isOptimizing ? 'Optimizing...' : optimized ? 'Optimized!' : 'Run Optimization'}
        </button>
      </div>

      <div className="optimizer-grid">
        {/* Before Optimization */}
        <div className="schedule-card">
          <div className="card-header">
            <h3>Current Schedule</h3>
            <span className="header-badge before">Before</span>
          </div>
          <div className="timeline">
            {scheduleData.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="time-col">
                  <Clock size={16} />
                  <span>{item.start}</span>
                </div>
                <div className={`task-bar priority-${item.priority.toLowerCase()}`}>
                  <span className="task-name">{item.task}</span>
                  <span className="task-duration">{item.duration}h</span>
                </div>
                <span className="dept-badge">{item.department}</span>
              </div>
            ))}
          </div>
        </div>

        {/* After Optimization */}
        <div className="schedule-card">
          <div className="card-header">
            <h3>Optimized Schedule</h3>
            <span className="header-badge after">After</span>
          </div>
          <div className={`timeline ${!optimized ? 'disabled' : ''}`}>
            {(optimized ? optimizedSchedule : scheduleData).map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="time-col">
                  <Clock size={16} />
                  <span>{item.start}</span>
                </div>
                <div className={`task-bar priority-${item.priority.toLowerCase()}`}>
                  <span className="task-name">{item.task}</span>
                  <span className="task-duration">{item.duration}h</span>
                </div>
                <span className="dept-badge">{item.department}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Optimization Benefits */}
      {optimized && (
        <div className="benefits-section">
          <h3>Optimization Results</h3>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon time">
                <Clock size={24} />
              </div>
              <div className="benefit-content">
                <span className="benefit-value">2 hours</span>
                <span className="benefit-label">Time Saved</span>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon conflict">
                <AlertTriangle size={24} />
              </div>
              <div className="benefit-content">
                <span className="benefit-value">3</span>
                <span className="benefit-label">Conflicts Resolved</span>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon resource">
                <Users size={24} />
              </div>
              <div className="benefit-content">
                <span className="benefit-value">15%</span>
                <span className="benefit-label">Resource Efficiency</span>
              </div>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon risk">
                <CheckCircle size={24} />
              </div>
              <div className="benefit-content">
                <span className="benefit-value">Low</span>
                <span className="benefit-label">Risk Level</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conflict Details */}
      <div className="conflicts-section">
        <h3>Cross-Department Coordination</h3>
        <div className="conflicts-grid">
          <div className="conflict-card warning">
            <div className="conflict-header">
              <AlertTriangle size={18} />
              <span>Zone A Conflict</span>
            </div>
            <p>Track and Signal teams scheduled at same location</p>
            <span className="conflict-status">Resolved</span>
          </div>
          <div className="conflict-card success">
            <div className="conflict-header">
              <CheckCircle size={18} />
              <span>Resource Allocation</span>
            </div>
            <p>Equipment shared between Bridge and Electrical teams</p>
            <span className="conflict-status">Optimized</span>
          </div>
          <div className="conflict-card info">
            <div className="conflict-header">
              <Users size={18} />
              <span>Team Availability</span>
            </div>
            <p>All required personnel available for scheduled tasks</p>
            <span className="conflict-status">Confirmed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleOptimizer;