import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { FaChartBar, FaBookOpen, FaClock, FaCheckCircle, FaStar } from "react-icons/fa";

// Mock data with additional metrics
const subjectProgress = [
  { subject: "Math", completed: 70, target: 100 },
  { subject: "Science", completed: 55, target: 100 },
  { subject: "English", completed: 90, target: 100 },
  { subject: "History", completed: 45, target: 100 },
];

const studyHours = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 4 },
];

const accuracyData = [
  { name: "Correct", value: 80 },
  { name: "Incorrect", value: 20 },
];

const performanceTrend = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 70 },
  { week: "Week 3", score: 75 },
  { week: "Week 4", score: 80 },
];

const COLORS = ["#10b981", "#f87171"];

const ProgressTracker = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 dark:from-gray-900 dark:via-indigo-900 dark:to-purple-900 p-8 text-gray-800 dark:text-white">
      {/* Header with Back Button */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition font-semibold"
          aria-label="Go back to dashboard"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <h1 className="text-4xl font-extrabold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          <FaChartBar className="text-blue-600" /> Progress Dashboard
        </h1>
      </motion.header>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex gap-4 border-b border-gray-200 dark:border-gray-700"
      >
        {["overview", "subjects", "hours", "accuracy"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-4 text-lg font-medium transition-all duration-300 ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-300"
                : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-300"
            }`}
            aria-selected={activeTab === tab}
            role="tab"
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {/* Completion Summary */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <FaCheckCircle /> Completion Summary
              </h2>
              <div className="space-y-4">
                <p className="text-lg font-medium">
                  <span className="text-blue-600 dark:text-blue-400">Chapters Completed:</span>{" "}
                  <span className="font-bold">20 / 30</span>
                </p>
                <p className="text-lg font-medium">
                  <span className="text-blue-600 dark:text-blue-400">Flashcards Reviewed:</span>{" "}
                  <span className="font-bold">150</span>
                </p>
                <p className="text-lg font-medium">
                  <span className="text-blue-600 dark:text-blue-400">Study Streak:</span>{" "}
                  <span className="font-bold">5 Days</span>
                </p>
                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-semibold"
                  aria-label="View detailed report"
                >
                  View Detailed Report
                </button>
              </div>
            </motion.div>

            {/* Performance Trend */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <FaStar /> Performance Trend
              </h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceTrend}>
                  <XAxis dataKey="week" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
            >
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
                <FaChartBar /> Quick Stats
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <p>Average Study Time: <span className="font-bold">2.7h/day</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <p>Completion Rate: <span className="font-bold">80%</span></p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <p>Active Subjects: <span className="font-bold">4</span></p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === "subjects" && (
          <motion.div
            key="subjects"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-300">
              <FaBookOpen /> Subject Completion
            </h2>
            <div className="space-y-6">
              {subjectProgress.map((subj, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <div className="flex justify-between mb-2">
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-200">{subj.subject}</p>
                    <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{subj.completed}%</p>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-3 rounded-full overflow-hidden">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${subj.completed}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "hours" && (
          <motion.div
            key="hours"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-300">
              <FaClock /> Weekly Study Hours
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={studyHours}>
                <XAxis dataKey="day" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey="hours"
                  fill="#8884d8"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                >
                  {studyHours.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? '#3b82f6' : '#8b5cf6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        {activeTab === "accuracy" && (
          <motion.div
            key="accuracy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600 dark:text-blue-300">
              <FaCheckCircle /> Flashcard Accuracy
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accuracyData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={50}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  labelLine={{ stroke: '#6b7280' }}
                >
                  {accuracyData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button for Quick Actions */}
      <motion.button
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all flex items-center gap-2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Export progress data"
        onClick={() => {
          const data = JSON.stringify({ subjectProgress, studyHours, accuracyData }, null, 2);
          const blob = new Blob([data], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'progress_data.json';
          a.click();
          URL.revokeObjectURL(url);
        }}
      >
        <FaStar className="text-xl" />
        Export Data
      </motion.button>
    </div>
  );
};

export default ProgressTracker;