import React, { useState } from 'react';
import { CheckCircle2, Circle, Info, Users, Headphones, Calendar, TrendingUp, AlertCircle, Brain, Zap, Target, Map } from 'lucide-react';

const StudyOS = () => {
  const [currentStep, setCurrentStep] = useState('intake'); // intake, loading, dashboard
  const [systemMode, setSystemMode] = useState('ON TRACK');
  const [activeView, setActiveView] = useState('your_study');
  const [showReasoningModal, setShowReasoningModal] = useState(null);
  const [agentLogs, setAgentLogs] = useState([]);
  
  // Form state
  const [formData, setFormData] = useState({
    exam: '',
    deadline: '',
    subjects: '',
    studyHours: '4',
    weakAreas: ''
  });

  // Generated data
  const [tasks, setTasks] = useState([]);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [journeyMap, setJourneyMap] = useState([]);

  const simulateAgentProcessing = () => {
    setCurrentStep('loading');
    setAgentLogs([]);
    
    const logs = [
      { agent: 'Context Agent', action: 'Building student world model...', time: 0 },
      { agent: 'Context Agent', action: 'Analyzing: JEE Advanced, 42 days, Math/Physics/Chemistry', time: 1000 },
      { agent: 'Strategy Agent', action: 'Evaluating long-term strategy...', time: 2000 },
      { agent: 'Strategy Agent', action: 'Prioritizing weak areas: Calculus, Thermodynamics', time: 3000 },
      { agent: 'Planning Agent', action: 'Generating 6-week roadmap...', time: 4000 },
      { agent: 'Planning Agent', action: 'Creating daily missions with effort estimation', time: 5000 },
      { agent: 'Execution Agent', action: 'Preparing revision questions and resources', time: 6000 },
      { agent: 'Orchestrator', action: '✓ System ready. Monitoring activated.', time: 7000 }
    ];

    logs.forEach(log => {
      setTimeout(() => {
        setAgentLogs(prev => [...prev, log]);
      }, log.time);
    });

    setTimeout(() => {
      // Generate tasks
      setTasks([
        { id: 1, text: 'Calculus: Derivatives practice (30 min)', effort: 'Medium', reason: 'Identified as weak area', completed: false },
        { id: 2, text: 'Physics: Thermodynamics numericals (45 min)', effort: 'High', reason: 'High exam weightage + weak area', completed: false },
        { id: 3, text: 'Chemistry: Organic reactions revision (20 min)', effort: 'Low', reason: 'Maintaining strong foundation', completed: false },
      ]);

      // Generate weekly plan
      setWeeklyPlan([
        { week: 1, focus: 'Foundation Strengthening', status: 'current' },
        { week: 2, focus: 'Weak Area Deep Dive', status: 'upcoming' },
        { week: 3, focus: 'Integration & Practice', status: 'upcoming' },
        { week: 4, focus: 'Mock Tests & Analysis', status: 'upcoming' },
        { week: 5, focus: 'Revision Sprint', status: 'upcoming' },
        { week: 6, focus: 'Final Prep & Rest', status: 'upcoming' }
      ]);

      // Generate journey map
      setJourneyMap([
        { phase: 'Foundation', weeks: '1-2', goal: 'Strengthen weak areas', status: 'active' },
        { phase: 'Application', weeks: '3-4', goal: 'Problem-solving mastery', status: 'pending' },
        { phase: 'Mastery', weeks: '5-6', goal: 'Exam simulation & peak', status: 'pending' }
      ]);

      setCurrentStep('dashboard');
    }, 7500);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const getModeColor = () => {
    switch(systemMode) {
      case 'ON TRACK': return 'bg-gradient-to-r from-blue-600 to-purple-600';
      case 'AT RISK': return 'bg-gradient-to-r from-amber-500 to-orange-500';
      case 'RECOVERY MODE': return 'bg-gradient-to-r from-red-500 to-pink-500';
      default: return 'bg-gray-600';
    }
  };

  // Intake Form
  if (currentStep === 'intake') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-gray-100 flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Brain className="text-purple-500" size={40} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                StudyOS
              </h1>
            </div>
            <p className="text-gray-400">Autonomous AI-Powered Learning System</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-semibold mb-6 text-white">Student Journey Setup</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Target Exam</label>
                <input
                  type="text"
                  value={formData.exam}
                  onChange={(e) => setFormData({...formData, exam: e.target.value})}
                  placeholder="e.g., JEE Advanced, NEET, SAT"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Days to Deadline</label>
                <input
                  type="number"
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  placeholder="e.g., 42"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Subjects (comma-separated)</label>
                <input
                  type="text"
                  value={formData.subjects}
                  onChange={(e) => setFormData({...formData, subjects: e.target.value})}
                  placeholder="e.g., Math, Physics, Chemistry"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Daily Study Hours Available</label>
                <select
                  value={formData.studyHours}
                  onChange={(e) => setFormData({...formData, studyHours: e.target.value})}
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                >
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="6">6 hours</option>
                  <option value="8">8 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Weak Areas / Concerns</label>
                <textarea
                  value={formData.weakAreas}
                  onChange={(e) => setFormData({...formData, weakAreas: e.target.value})}
                  placeholder="e.g., Calculus derivatives, Thermodynamics, Organic chemistry..."
                  rows="3"
                  className="w-full bg-black border border-gray-700 rounded px-4 py-3 text-gray-100 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              onClick={simulateAgentProcessing}
              disabled={!formData.exam || !formData.deadline || !formData.subjects}
              className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <Zap size={20} />
              Activate AI Agent System
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading/Processing State
  if (currentStep === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-950 text-gray-100 flex items-center justify-center p-6">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-8">
            <Brain className="text-purple-500 mx-auto mb-4 animate-pulse" size={48} />
            <h2 className="text-2xl font-semibold mb-2">Multi-Agent System Processing</h2>
            <p className="text-gray-400">Building your personalized learning strategy...</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-2xl">
            <div className="space-y-3">
              {agentLogs.map((log, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-black border border-gray-800 rounded animate-fadeIn"
                >
                  <div className="flex-shrink-0">
                    {log.agent === 'Orchestrator' ? (
                      <CheckCircle2 className="text-green-500" size={20} />
                    ) : (
                      <div className="w-2 h-2 mt-2 rounded-full bg-purple-500 animate-pulse"></div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-purple-400">{log.agent}</div>
                    <div className="text-sm text-gray-300">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="flex h-screen bg-black text-gray-100">
      {/* Left Sidebar */}
      <div className="w-64 bg-gray-950 flex flex-col border-r border-gray-800">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Brain className="text-purple-500" size={24} />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              StudyOS
            </h1>
          </div>
        </div>
        
        <nav className="flex-1 p-3">
          <div className="space-y-1">
            <button 
              onClick={() => setActiveView('your_study')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeView === 'your_study' 
                  ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-white border border-blue-800' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              # your_study
            </button>
            <button 
              onClick={() => setActiveView('journey')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeView === 'journey' 
                  ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-white border border-blue-800' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              # journey_map
            </button>
            <button 
              onClick={() => setActiveView('agents')}
              className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                activeView === 'agents' 
                  ? 'bg-gradient-to-r from-blue-900 to-purple-900 text-white border border-blue-800' 
                  : 'text-gray-400 hover:bg-gray-900 hover:text-white'
              }`}
            >
              # agent_logs
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="text-xs text-gray-500 uppercase mb-2 px-3">Voice Rooms</div>
            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white flex items-center gap-2 transition-all">
              <Headphones size={16} className="text-blue-500" />
              <span>Focus</span>
              <span className="ml-auto text-xs text-green-400">3 active</span>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-900 hover:text-white flex items-center gap-2 transition-all">
              <Headphones size={16} className="text-purple-500" />
              <span>Co-study</span>
              <span className="ml-auto text-xs text-green-400">7 active</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <div>
              <div className="text-sm font-semibold text-white">{formData.exam || 'JEE Advanced 2024'}</div>
              <div className="text-xs text-gray-400">{formData.deadline || '42'} days to deadline</div>
            </div>
          </div>

          <button 
            onClick={() => setShowReasoningModal('system')}
            className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-2 ${getModeColor()} text-white hover:opacity-90 transition-all`}
          >
            {systemMode}
            <Info size={14} />
          </button>

          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-xs text-gray-400">Cognitive Load</div>
              <div className="text-sm font-medium text-blue-400">Medium</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400">Streak</div>
              <div className="text-sm font-medium text-purple-400">7 days</div>
            </div>
          </div>
        </div>

        {/* Main Surface */}
        <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-950 via-black to-gray-950">
          {activeView === 'your_study' && (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Today's Mission */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Target className="text-purple-500" size={24} />
                    <h2 className="text-xl font-semibold text-white">Today's Mission</h2>
                  </div>
                  <button 
                    onClick={() => setShowReasoningModal('planning')}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Info size={18} />
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task.id} className="flex items-start gap-3 p-4 rounded-lg bg-black border border-gray-800 hover:border-purple-900 transition-all">
                      <button 
                        onClick={() => toggleTask(task.id)}
                        className="mt-0.5 flex-shrink-0"
                      >
                        {task.completed ? (
                          <CheckCircle2 className="text-purple-500" size={20} />
                        ) : (
                          <Circle className="text-gray-600" size={20} />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className={`text-sm ${task.completed ? 'line-through text-gray-600' : 'text-gray-200'}`}>
                          {task.text}
                        </div>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-gray-500">Effort: {task.effort}</span>
                          <span className="text-xs text-blue-400 italic">→ {task.reason}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-800">
                  <details className="text-sm text-gray-400">
                    <summary className="cursor-pointer hover:text-purple-400 transition-colors">Agent Reasoning</summary>
                    <p className="mt-2 text-gray-500 italic bg-black border border-gray-800 rounded p-3">
                      "Strategy Agent prioritized weak area strengthening before advancing to new topics. Planning Agent allocated time based on your {formData.studyHours}-hour daily availability."
                    </p>
                  </details>
                </div>
              </div>

              {/* Drift Radar */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-white">Drift Detection Radar</h2>
                  <button 
                    onClick={() => setShowReasoningModal('drift')}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    <Info size={18} />
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 bg-opacity-20 border-4 border-blue-500 flex items-center justify-center">
                      <TrendingUp className="text-blue-500" size={24} />
                    </div>
                    <div className="mt-2 text-sm text-gray-300">Pace vs Plan</div>
                    <div className="text-xs text-blue-400">Normal</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-purple-500 bg-opacity-20 border-4 border-purple-500 flex items-center justify-center">
                      <AlertCircle className="text-purple-500" size={24} />
                    </div>
                    <div className="mt-2 text-sm text-gray-300">Cognitive Load</div>
                    <div className="text-xs text-purple-400">Optimal</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-blue-500 bg-opacity-20 border-4 border-blue-500 flex items-center justify-center">
                      <Calendar className="text-blue-500" size={24} />
                    </div>
                    <div className="mt-2 text-sm text-gray-300">Consistency</div>
                    <div className="text-xs text-blue-400">Strong</div>
                  </div>
                </div>
              </div>

              {/* Social Presence */}
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 shadow-xl">
                <div className="flex items-center gap-3 text-sm text-gray-400">
                  <Users size={16} className="text-purple-500" />
                  <span>5 peers studying now</span>
                  <div className="flex gap-1 ml-2">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'journey' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-8 shadow-xl">
                <div className="flex items-center gap-2 mb-8">
                  <Map className="text-purple-500" size={28} />
                  <h2 className="text-2xl font-semibold text-white">JEE Advanced Learning Journey</h2>
                </div>
                
                {/* Animated Path Visualization */}
                <div className="relative py-12">
                  {/* Vertical animated path line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-blue-600 transform -translate-x-1/2 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                  </div>

                  {/* Journey Nodes */}
                  <div className="space-y-16">
                    {/* Week 1-2: Foundation */}
                    <div className="relative flex items-center">
                      <div className="w-1/2 pr-12 text-right">
                        <div className="inline-block bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-purple-500 rounded-lg p-4 shadow-xl animate-fadeIn">
                          <div className="text-xs text-purple-400 font-semibold mb-1">WEEK 1-2 • FOUNDATION</div>
                          <h3 className="text-lg font-bold text-white mb-2">Mathematics Fundamentals</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Calculus: Limits & Derivatives</div>
                            <div>• Algebra: Complex Numbers</div>
                            <div>• Trigonometry: Identities</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-purple-800">
                            <div className="text-xs text-blue-400">20 hours • 15 topics</div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-gray-900 shadow-lg z-10 animate-pulse">
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <div className="w-1/2 pl-12">
                        <div className="inline-block bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-blue-500 rounded-lg p-4 shadow-xl animate-fadeIn" style={{animationDelay: '0.2s'}}>
                          <div className="text-xs text-blue-400 font-semibold mb-1">WEEK 1-2 • FOUNDATION</div>
                          <h3 className="text-lg font-bold text-white mb-2">Physics Core Concepts</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Mechanics: Laws of Motion</div>
                            <div>• Thermodynamics: Heat Transfer</div>
                            <div>• Waves: SHM Basics</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-800">
                            <div className="text-xs text-purple-400">18 hours • 12 topics</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Week 3-4: Deep Dive */}
                    <div className="relative flex items-center">
                      <div className="w-1/2 pr-12 text-right">
                        <div className="inline-block bg-gradient-to-r from-purple-900 to-blue-900 border-2 border-purple-500 rounded-lg p-4 shadow-xl animate-fadeIn" style={{animationDelay: '0.4s'}}>
                          <div className="text-xs text-purple-400 font-semibold mb-1">WEEK 3-4 • DEEP DIVE</div>
                          <h3 className="text-lg font-bold text-white mb-2">Advanced Problem Solving</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Integration Techniques</div>
                            <div>• Rotational Dynamics</div>
                            <div>• Chemical Equilibrium</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-purple-800">
                            <div className="text-xs text-blue-400">25 hours • 18 topics</div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-gray-900 shadow-lg z-10">
                        <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
                      </div>
                      <div className="w-1/2 pl-12">
                        <div className="inline-block bg-gradient-to-r from-purple-900 to-blue-900 border-2 border-blue-500 rounded-lg p-4 shadow-xl animate-fadeIn" style={{animationDelay: '0.6s'}}>
                          <div className="text-xs text-blue-400 font-semibold mb-1">WEEK 3-4 • DEEP DIVE</div>
                          <h3 className="text-lg font-bold text-white mb-2">Chemistry Applications</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Organic Reactions Mastery</div>
                            <div>• Electrochemistry Numericals</div>
                            <div>• Coordination Compounds</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-800">
                            <div className="text-xs text-purple-400">22 hours • 14 topics</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Week 5: Mock Tests */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full border-4 border-gray-900 shadow-lg z-10 animate-pulse">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
                      </div>
                      <div className="bg-gradient-to-r from-purple-900 via-blue-900 to-purple-900 border-2 border-purple-500 rounded-lg p-6 shadow-xl max-w-xl animate-fadeIn" style={{animationDelay: '0.8s'}}>
                        <div className="text-xs text-purple-400 font-semibold mb-1 text-center">WEEK 5 • TESTING PHASE</div>
                        <h3 className="text-xl font-bold text-white mb-3 text-center">Full-Length Mock Tests</h3>
                        <div className="grid grid-cols-2 gap-3 text-sm text-gray-300">
                          <div>• Mock Test 1: Math Focus</div>
                          <div>• Mock Test 2: Physics Focus</div>
                          <div>• Mock Test 3: Chemistry Focus</div>
                          <div>• Mock Test 4: Full Syllabus</div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-purple-800 text-center">
                          <div className="text-xs text-blue-400">30 hours • Performance Analysis</div>
                        </div>
                      </div>
                    </div>

                    {/* Week 6: Revision Sprint */}
                    <div className="relative flex items-center">
                      <div className="w-1/2 pr-12 text-right">
                        <div className="inline-block bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-blue-500 rounded-lg p-4 shadow-xl animate-fadeIn" style={{animationDelay: '1s'}}>
                          <div className="text-xs text-blue-400 font-semibold mb-1">WEEK 6 • REVISION</div>
                          <h3 className="text-lg font-bold text-white mb-2">Quick Revision Topics</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Formula Sheet Review</div>
                            <div>• Common Mistake Analysis</div>
                            <div>• Speed Practice</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-800">
                            <div className="text-xs text-purple-400">15 hours • Revision</div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-purple-600 rounded-full border-4 border-gray-900 shadow-lg z-10">
                        <div className="absolute inset-0 bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1.2s'}}></div>
                      </div>
                      <div className="w-1/2 pl-12">
                        <div className="inline-block bg-gradient-to-r from-blue-900 to-purple-900 border-2 border-purple-500 rounded-lg p-4 shadow-xl animate-fadeIn" style={{animationDelay: '1.2s'}}>
                          <div className="text-xs text-purple-400 font-semibold mb-1">WEEK 6 • FINAL PREP</div>
                          <h3 className="text-lg font-bold text-white mb-2">Exam Day Strategy</h3>
                          <div className="space-y-1 text-sm text-gray-300">
                            <div>• Time Management Practice</div>
                            <div>• Previous Year Analysis</div>
                            <div>• Rest & Recovery</div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-purple-800">
                            <div className="text-xs text-blue-400">10 hours • Strategy</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Final Goal */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-gray-900 shadow-2xl z-10 animate-bounce">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Target className="text-white" size={20} />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 border-2 border-purple-400 rounded-lg p-6 shadow-2xl max-w-md animate-fadeIn" style={{animationDelay: '1.4s'}}>
                        <h3 className="text-2xl font-bold text-white mb-2 text-center">🎯 JEE Advanced 2024</h3>
                        <p className="text-center text-gray-200 text-sm">Ready to achieve your target rank!</p>
                        <div className="mt-4 pt-4 border-t border-purple-400 text-center">
                          <div className="text-xs text-blue-200">Total: 140+ hours • 60+ topics covered</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Agent Insight */}
                <div className="mt-8 bg-black border border-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Brain className="text-purple-500 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <div className="text-sm font-medium text-purple-400 mb-1">Strategy Agent Insight</div>
                      <p className="text-sm text-gray-300">
                        This journey prioritizes weak areas in weeks 1-2, intensifies problem-solving in weeks 3-4, validates learning through mocks in week 5, and optimizes retention in week 6. The path adapts based on your daily performance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeView === 'agents' && (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-xl">
                <div className="flex items-center gap-2 mb-6">
                  <Brain className="text-purple-500" size={24} />
                  <h2 className="text-xl font-semibold text-white">Multi-Agent System Logs</h2>
                </div>
                <div className="space-y-3">
                  {agentLogs.map((log, idx) => (
                    <div key={idx} className="p-4 bg-black border border-gray-800 rounded-lg">
                      <div className="text-sm font-medium text-purple-400">{log.agent}</div>
                      <div className="text-sm text-gray-300 mt-1">{log.action}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reasoning Modal */}
      {showReasoningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50" onClick={() => setShowReasoningModal(null)}>
          <div className="bg-gray-900 border border-purple-800 rounded-lg p-6 max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <Brain className="text-purple-500" size={20} />
              Agent Reasoning
            </h3>
            {showReasoningModal === 'system' && (
              <div className="space-y-2 text-sm bg-black border border-gray-800 rounded p-4">
                <div><span className="text-purple-400">Context Agent:</span> <span className="text-gray-300">Student model stable, no drift signals</span></div>
                <div><span className="text-purple-400">Monitoring Agent:</span> <span className="text-gray-300">7-day consistency streak detected</span></div>
                <div><span className="text-purple-400">Decision:</span> <span className="text-gray-300">Maintain current strategy</span></div>
              </div>
            )}
            {showReasoningModal === 'planning' && (
              <div className="space-y-2 text-sm bg-black border border-gray-800 rounded p-4">
                <div><span className="text-purple-400">Strategy Agent:</span> <span className="text-gray-300">Weak areas prioritized based on input</span></div>
                <div><span className="text-purple-400">Planning Agent:</span> <span className="text-gray-300">Tasks fitted to {formData.studyHours}-hour daily window</span></div>
                <div><span className="text-purple-400">Execution Agent:</span> <span className="text-gray-300">High-effort tasks scheduled for peak hours</span></div>
              </div>
            )}
            {showReasoningModal === 'drift' && (
              <div className="space-y-2 text-sm bg-black border border-gray-800 rounded p-4">
                <div className="text-gray-300">Monitoring Agent continuously tracks pace, consistency, and cognitive load. No drift patterns detected. System will auto-adjust if signals emerge.</div>
              </div>
            )}
            <button 
              onClick={() => setShowReasoningModal(null)}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded text-sm text-white w-full transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyOS;