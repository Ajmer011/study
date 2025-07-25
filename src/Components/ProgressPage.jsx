import React from "react";
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { FaChartBar, FaBookOpen, FaClock, FaCheckCircle } from "react-icons/fa";

const subjectProgress = [
  { subject: "Math", completed: 70 },
  { subject: "Science", completed: 55 },
  { subject: "English", completed: 90 },
  { subject: "History", completed: 45 }
];

const studyHours = [
  { day: "Mon", hours: 2 },
  { day: "Tue", hours: 3 },
  { day: "Wed", hours: 1.5 },
  { day: "Thu", hours: 2.5 },
  { day: "Fri", hours: 2 },
  { day: "Sat", hours: 3.5 },
  { day: "Sun", hours: 4 }
];

const accuracyData = [
  { name: "Correct", value: 80 },
  { name: "Incorrect", value: 20 }
];

const COLORS = ["#00C49F", "#FF8042"];

const ProgressTracker = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 flex items-center gap-3">
        <FaChartBar /> Progress Tracker
      </h1>

      <div className="grid md:grid-cols-2 gap-10 mb-10">
        {/* Subject Progress Bars */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <FaBookOpen /> Subject Completion
          </h2>
          {subjectProgress.map((subj, index) => (
            <div key={index} className="mb-4">
              <p className="mb-1 text-sm font-medium text-gray-700">{subj.subject}</p>
              <div className="w-full bg-gray-200 h-4 rounded-full">
                <div
                  className="bg-blue-500 h-4 rounded-full"
                  style={{ width: `${subj.completed}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Study Hours Chart */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <FaClock /> Weekly Study Hours
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={studyHours}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hours" fill="#8884d8" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Flashcard Accuracy Pie */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <FaCheckCircle /> Flashcard Accuracy
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={accuracyData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {accuracyData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Completion Stats */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center gap-2">
            <FaCheckCircle /> Completion Summary
          </h2>
          <p className="text-lg text-gray-700 font-medium">✅ Chapters Completed: <span className="text-blue-600 font-bold">20</span> / 30</p>
          <p className="mt-2 text-lg text-gray-700 font-medium">🧠 Flashcards Reviewed: <span className="text-blue-600 font-bold">150</span></p>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;