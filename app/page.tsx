"use client";

import React, { useState, useEffect } from 'react';
import { Clock, User, Settings, Play, BookOpen, Trophy, Target, AlertCircle, ChevronRight, CheckCircle2, LayoutDashboard, TrendingUp, TrendingDown, XCircle } from 'lucide-react';

export interface QuizConfig {
  name: string;
  numQuestions: number;
  difficulty: string;
  totalTime: number;
}

export interface ScoreRecord {
  name: string;
  score: number;
  total: number;
  difficulty: string;
  date: string;
}

export interface Question {
  topic: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

// Track what the user actually clicked
export interface UserAnswerRecord {
  questionIndex: number;
  selectedOption: string | null;
  isCorrect: boolean;
}

interface SetupFormProps {
  onStart: (config: QuizConfig) => void;
}

interface QuizAreaProps {
  config: QuizConfig;
  onExit: () => void;
}

// --- SETUP FORM (DASHBOARD) ---
function SetupForm({ onStart }: SetupFormProps) {
  const [formData, setFormData] = useState<QuizConfig>({
    name: '',
    numQuestions: 10,
    difficulty: 'medium',
    totalTime: 10,
  });

  const [pastScores, setPastScores] = useState<ScoreRecord[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem('aptitudeScores');
      if (saved) setPastScores(JSON.parse(saved));
    } catch (e) {
      console.error("Could not load past scores", e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = (name === 'numQuestions' || name === 'totalTime') ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter candidate name to proceed.");
      return;
    }
    onStart(formData);
  };

  const secondsPerQuestion = Math.max(1, Math.floor((formData.totalTime * 60) / (formData.numQuestions || 1)));

  if (!isMounted) return null;

  return (
    <div className="w-full animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto mt-[-4rem] relative z-10 px-4 sm:px-0">
        
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
          
          <div className="bg-slate-50 border-b border-slate-100 px-8 py-6">
            <h2 className="text-xl font-bold text-slate-800 flex items-center">
              <LayoutDashboard className="w-5 h-5 mr-2 text-indigo-600" />
              Assessment Configuration
            </h2>
            <p className="text-slate-500 text-sm mt-1">Set up your placement mock test parameters before starting.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                Candidate Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  placeholder="Enter your full name" 
                  className="block w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white text-slate-900 font-medium transition-all outline-none"
                  required 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Test Length
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Target className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <select 
                    name="numQuestions" 
                    value={formData.numQuestions} 
                    onChange={handleChange} 
                    className="block w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white text-slate-900 font-medium transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value={5}>5 Questions (Quick Check)</option>
                    <option value={10}>10 Questions (Standard)</option>
                    <option value={20}>20 Questions (Extended)</option>
                    <option value={50}>50 Questions (Full Mock Exam)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronRight className="h-4 w-4 text-slate-400 rotate-90" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
                  Difficulty Level
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Settings className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                  </div>
                  <select 
                    name="difficulty" 
                    value={formData.difficulty} 
                    onChange={handleChange} 
                    className="block w-full pl-12 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 focus:bg-white text-slate-900 font-medium transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="easy">Easy (Fundamentals)</option>
                    <option value="medium">Medium (Placement Standard)</option>
                    <option value="hard">Hard (Advanced Level)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronRight className="h-4 w-4 text-slate-400 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100/50">
              <div className="flex justify-between items-center mb-6">
                <label className="block text-sm font-bold text-slate-800 flex items-center uppercase tracking-wide">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                  Time Allocation
                </label>
                <span className="text-sm font-bold text-indigo-700 bg-white px-3 py-1 rounded-full border border-indigo-200 shadow-sm">
                  {formData.totalTime} Minutes
                </span>
              </div>
              
              <input 
                type="range" 
                name="totalTime" 
                min="5" 
                max="120" 
                step="5" 
                value={formData.totalTime} 
                onChange={handleChange} 
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-700 transition-all mb-6" 
              />
              
              <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-slate-100 shadow-sm">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Pacing Guide</p>
                  <p className="text-sm font-medium text-slate-700">Time allowed per question</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-indigo-600">{secondsPerQuestion}</span>
                  <span className="text-slate-500 font-medium ml-1 text-sm">sec</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 transition-all flex items-center justify-center group"
            >
              Start Placement Test
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        {pastScores.length > 0 && (
          <div className="mt-8 mb-12 animate-in slide-in-from-bottom-4 duration-700">
            <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center px-2">
              <Trophy className="w-4 h-4 mr-2 text-amber-500" /> 
              Recent Performance
            </h3>
            <div className="grid gap-3">
              {pastScores.slice(0, 3).map((record, index) => {
                const accuracy = Math.round((record.score / Math.max(1, record.total)) * 100);
                return (
                  <div key={index} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all flex justify-between items-center group">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        accuracy >= 70 ? 'bg-emerald-100 text-emerald-700' : 
                        accuracy >= 40 ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                      }`}>
                        {accuracy}%
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{record.name}</p>
                        <p className="text-sm text-slate-500 font-medium">{record.date} • <span className="capitalize">{record.difficulty}</span> Level</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Score</p>
                      <p className="text-2xl font-black text-slate-800">{record.score} <span className="text-base text-slate-400 font-medium">/ {record.total}</span></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- QUIZ AREA ---
function QuizArea({ config, onExit }: QuizAreaProps) {
  const secondsPerQuestion = Math.max(1, Math.floor((config.totalTime * 60) / (config.numQuestions || 1)));

  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswerRecord[]>([]); // NEW: Tracks user choices
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(secondsPerQuestion);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: config.numQuestions, difficulty: config.difficulty })
        });

        if (!response.ok) throw new Error("Failed to compile assessment");
        const data: Question[] = await response.json();
        
        if (!data || !Array.isArray(data) || data.length === 0) {
           throw new Error("Invalid response format");
        }

        const formattedData = data
          .sort(() => Math.random() - 0.5) 
          .map((q) => ({
            ...q,
            options: [...(q.options || [])].sort(() => Math.random() - 0.5)
          }));

        if (isMounted) {
          setQuestions(formattedData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to connect to assessment server. Please try again.");
        if (isMounted) onExit();
      }
    };
    
    fetchQuestions();
    return () => { isMounted = false; };
  }, [config, onExit]);

  useEffect(() => {
    if (isFinished && questions.length > 0) {
      try {
        const newRecord: ScoreRecord = {
          name: config.name,
          score: score,
          total: questions.length,
          difficulty: config.difficulty,
          date: new Date().toLocaleDateString(),
        };
        const existingRecords: ScoreRecord[] = JSON.parse(localStorage.getItem('aptitudeScores') || '[]');
        localStorage.setItem('aptitudeScores', JSON.stringify([newRecord, ...existingRecords]));
      } catch (e) {
        console.error("Failed to save record", e);
      }
    }
  }, [isFinished, score, questions.length, config]);

  useEffect(() => {
    if (isFinished || isLoading) return; 

    if (timeLeft <= 0) {
      // Time ran out for this question, mark it incorrect and move on
      handleNextQuestion(false, null);
      return;
    }

    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft, isFinished, isLoading]);

  const handleNextQuestion = (isCorrect: boolean, selectedOption: string | null) => {
    // Record the answer
    setUserAnswers(prev => [...prev, {
      questionIndex: currentIndex,
      selectedOption: selectedOption,
      isCorrect: isCorrect
    }]);

    if (isCorrect) setScore((prev) => prev + 1);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setTimeLeft(secondsPerQuestion);
    } else {
      setIsFinished(true);
    }
  };

  const handleOptionClick = (selectedOption: string) => {
    const isCorrect = selectedOption === questions[currentIndex]?.correctAnswer;
    handleNextQuestion(isCorrect, selectedOption);
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto mt-[-2rem] relative z-10 p-12 bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 text-center animate-in zoom-in duration-500">
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Generating Assessment Engine</h2>
        <p className="text-slate-500 font-medium">Securing and analyzing questions for {config.name}. Please wait...</p>
      </div>
    );
  }

  // --- FINAL ANALYSIS DASHBOARD ---
  if (isFinished) {
    const accuracy = (score / questions.length) * 100;
    const isPass = accuracy >= 60;

    // Calculate Topic Analytics
    const topicStats: Record<string, { total: number, correct: number }> = {};
    questions.forEach((q, index) => {
      const t = q.topic || "General Aptitude";
      if (!topicStats[t]) topicStats[t] = { total: 0, correct: 0 };
      topicStats[t].total += 1;
      
      const record = userAnswers.find(a => a.questionIndex === index);
      if (record?.isCorrect) topicStats[t].correct += 1;
    });

    const strongTopics: string[] = [];
    const weakTopics: string[] = [];

    Object.keys(topicStats).forEach(topic => {
      const pct = (topicStats[topic].correct / topicStats[topic].total) * 100;
      if (pct >= 60) strongTopics.push(topic);
      else weakTopics.push(topic);
    });

    // Identify incorrectly answered questions for review
    const incorrectRecords = userAnswers.filter(a => !a.isCorrect);

    return (
      <div className="max-w-4xl mx-auto mt-[-3rem] relative z-10 pb-12 animate-in slide-in-from-bottom-8 duration-500 px-4 sm:px-0">
        
        {/* Main Score Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 text-center p-10 mb-8">
          <div className={`inline-flex items-center justify-center p-5 rounded-full mb-6 ${isPass ? 'bg-emerald-100' : 'bg-amber-100'}`}>
            {isPass ? <CheckCircle2 className="w-12 h-12 text-emerald-600" /> : <AlertCircle className="w-12 h-12 text-amber-600" />}
          </div>
          
          <h2 className="text-3xl font-black text-slate-900 mb-2">Assessment Completed</h2>
          <p className="text-lg text-slate-600 mb-8 font-medium">Candidate: <span className="font-bold text-slate-900">{config.name}</span></p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-2">Total Score</p>
              <p className="text-5xl font-black text-indigo-600">{score} <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span></p>
            </div>
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-2">Overall Accuracy</p>
              <p className={`text-5xl font-black ${accuracy >= 70 ? 'text-emerald-600' : accuracy >= 40 ? 'text-amber-500' : 'text-rose-600'}`}>
                {Math.round(accuracy)}%
              </p>
            </div>
          </div>
        </div>

        {/* Chapter Analysis */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Strong Chapters */}
          <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center mb-6">
              <TrendingUp className="w-5 h-5 mr-2 text-emerald-500" />
              Strong Chapters
            </h3>
            {strongTopics.length > 0 ? (
              <ul className="space-y-3">
                {strongTopics.map(topic => (
                  <li key={topic} className="flex justify-between items-center p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                    <span className="font-medium text-slate-700">{topic}</span>
                    <span className="text-sm font-bold text-emerald-600">
                      {topicStats[topic].correct}/{topicStats[topic].total}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">No chapters hit the 60% mastery threshold yet. Keep practicing!</p>
            )}
          </div>

          {/* Weak Chapters */}
          <div className="bg-white p-8 rounded-2xl shadow-lg shadow-slate-200/40 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 flex items-center mb-6">
              <TrendingDown className="w-5 h-5 mr-2 text-rose-500" />
              Areas for Improvement
            </h3>
            {weakTopics.length > 0 ? (
              <ul className="space-y-3">
                {weakTopics.map(topic => (
                  <li key={topic} className="flex justify-between items-center p-3 bg-rose-50/50 rounded-lg border border-rose-100">
                    <span className="font-medium text-slate-700">{topic}</span>
                    <span className="text-sm font-bold text-rose-600">
                      {topicStats[topic].correct}/{topicStats[topic].total}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">Incredible! You showed strong mastery across all tested chapters.</p>
            )}
          </div>
        </div>

        {/* Incorrect Answer Review */}
        {incorrectRecords.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden mb-8">
            <div className="bg-slate-50 border-b border-slate-100 px-8 py-6">
              <h3 className="text-xl font-bold text-slate-800 flex items-center">
                <XCircle className="w-5 h-5 mr-2 text-rose-500" />
                Review Mistakes
              </h3>
              <p className="text-slate-500 text-sm mt-1">Review the questions you missed to improve your accuracy.</p>
            </div>
            
            <div className="divide-y divide-slate-100">
              {incorrectRecords.map((record, i) => {
                const q = questions[record.questionIndex];
                return (
                  <div key={i} className="p-8 hover:bg-slate-50/50 transition-colors">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-slate-100 text-slate-500 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">Q{record.questionIndex + 1}</span>
                      <span className="text-indigo-600 text-sm font-bold">{q.topic || 'General Math'}</span>
                    </div>
                    <p className="text-lg font-medium text-slate-800 mb-6">{q.question}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-start p-3 bg-rose-50 rounded-lg border border-rose-100">
                        <span className="text-rose-600 font-bold w-24 flex-shrink-0 text-sm mt-0.5">Your Answer:</span>
                        <span className="text-slate-700 font-medium">{record.selectedOption || "Time Ran Out (No Answer)"}</span>
                      </div>
                      <div className="flex items-start p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                        <span className="text-emerald-600 font-bold w-24 flex-shrink-0 text-sm mt-0.5">Correct:</span>
                        <span className="text-slate-700 font-medium">{q.correctAnswer}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button onClick={onExit} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-5 px-8 rounded-xl transition-all shadow-lg text-lg">
          Finish Review & Return to Dashboard
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  if (!currentQ) return null;

  return (
    <div className="max-w-3xl mx-auto mt-[-3rem] relative z-10 px-4 sm:px-0">
      
      <div className="bg-white rounded-t-2xl border-x border-t border-slate-200 p-6 shadow-sm flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1 block">Progress</span>
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-slate-800">Q. {currentIndex + 1}</span>
            <span className="text-slate-400 font-medium">of {questions.length}</span>
          </div>
        </div>
        
        <div className={`flex items-center px-4 py-2 rounded-lg border-2 transition-colors ${
          timeLeft <= 10 ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse' : 'bg-slate-50 border-slate-200 text-slate-700'
        }`}>
          <Clock className="w-5 h-5 mr-2" />
          <span className="font-mono text-lg font-bold">
            {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      <div className="w-full bg-slate-100 h-2 overflow-hidden border-x border-slate-200">
        <div 
          className="bg-indigo-600 h-full transition-all duration-500 ease-out" 
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 shadow-xl shadow-slate-200/50 p-8 sm:p-10 mb-8">
        
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="w-5 h-5 text-indigo-500" />
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">{currentQ.topic || "Quantitative Aptitude"}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-10 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className="w-full flex items-center p-5 rounded-xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all text-left group"
            >
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 font-bold text-sm mr-5 group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                {String.fromCharCode(65 + index)}
              </div>
              <span className="text-slate-700 font-medium text-lg leading-snug">{option}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-end pb-12">
        <button onClick={onExit} className="flex items-center px-4 py-2 text-slate-500 hover:text-rose-600 text-sm font-bold uppercase tracking-wider transition-colors rounded-lg hover:bg-rose-50">
          <AlertCircle className="w-4 h-4 mr-2" />
          Abandon Test
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<'setup' | 'quiz'>('setup');
  const [quizConfig, setQuizConfig] = useState<QuizConfig | null>(null);

  const handleStart = (configData: QuizConfig) => {
    setQuizConfig(configData);
    setView('quiz');
  };

  const handleExit = () => {
    setView('setup');
    setQuizConfig(null);
  };

  return (
    <main className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-200">
      <div className="h-72 bg-slate-900 w-full absolute top-0 left-0 z-0 border-b border-indigo-900/50 flex flex-col items-center pt-12">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center">
          <div className="bg-indigo-600 p-2 rounded-lg mr-3">
            <Target className="w-6 h-6 text-white" />
          </div>
          Placement Pro
        </h1>
        <p className="text-indigo-200 mt-3 font-medium">Quantitative Aptitude & Logical Reasoning</p>
      </div>

      <div className="relative z-10 pt-48 pb-12">
        {view === 'setup' && <SetupForm onStart={handleStart} />}
        {view === 'quiz' && quizConfig && <QuizArea config={quizConfig} onExit={handleExit} />}
      </div>
    </main>
  );
}