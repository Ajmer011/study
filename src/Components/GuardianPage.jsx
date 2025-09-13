import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { LinearProgress } from '@mui/material'; // Assuming Material-UI for attractive progress bars

// Mock data for students
const mockStudents = [
  {
    id: 1,
    name: "Ajmer Singh",
    studyHours: 45,
    maxStudyHours: 50,
    homeworkCompletion: 80, // Percentage
    notesTaken: 15,
    maxNotes: 20,
    growthRate: 75,
    tasks: [
      { text: "Review Math Chapter 3", completed: true, dueDate: "2025-09-01", priority: "High" },
      { text: "Write History notes", completed: false, dueDate: "2025-08-30", priority: "Medium" },
      { text: "Practice flashcards", completed: true, dueDate: "2025-08-29", priority: "Low" },
    ],
  },
  {
    id: 2,
    name: "Jane Doe",
    studyHours: 32,
    maxStudyHours: 50,
    homeworkCompletion: 78,
    notesTaken: 12,
    maxNotes: 20,
    growthRate: 68,
    tasks: [
      { text: "Complete Physics lab", completed: false, dueDate: "2025-09-02", priority: "High" },
      { text: "Read Literature book", completed: true, dueDate: "2025-08-31", priority: "Medium" },
    ],
  },
  // Add more students
];

export default function TeacherPanel() {
  const navigate = useNavigate();
  const [selectedStudentId, setSelectedStudentId] = useState(mockStudents[0].id);
  const [searchTerm, setSearchTerm] = useState("");
  const [newHomework, setNewHomework] = useState("");
  const [newDueDate, setNewDueDate] = useState("");
  const [newPriority, setNewPriority] = useState("Medium");
  const [students, setStudents] = useState(mockStudents);
  const [message, setMessage] = useState("");
  const [sortBy, setSortBy] = useState("dueDate");

  const selectedStudent = students.find(s => s.id === selectedStudentId) || mockStudents[0];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = [...selectedStudent.tasks].sort((a, b) => {
    if (sortBy === "dueDate") return new Date(a.dueDate) - new Date(b.dueDate);
    if (sortBy === "priority") {
      const priorities = { High: 3, Medium: 2, Low: 1 };
      return priorities[b.priority] - priorities[a.priority];
    }
    return 0;
  });

  const handleAssignHomework = () => {
    if (!newHomework.trim()) return;
    updateStudent({
      tasks: [...selectedStudent.tasks, { text: newHomework, completed: false, dueDate: newDueDate, priority: newPriority }],
      homeworkCompletion: calculateHomeworkCompletion([...selectedStudent.tasks, { completed: false }]),
    });
    setNewHomework("");
    setNewDueDate("");
    setNewPriority("Medium");
  };

  const toggleTaskComplete = (taskIndex) => {
    const updatedTasks = selectedStudent.tasks.map((task, idx) =>
      idx === taskIndex ? { ...task, completed: !task.completed } : task
    );
    updateStudent({
      tasks: updatedTasks,
      homeworkCompletion: calculateHomeworkCompletion(updatedTasks),
    });
  };

  const deleteTask = (taskIndex) => {
    const updatedTasks = selectedStudent.tasks.filter((_, idx) => idx !== taskIndex);
    updateStudent({
      tasks: updatedTasks,
      homeworkCompletion: calculateHomeworkCompletion(updatedTasks),
    });
  };

  const calculateHomeworkCompletion = (tasks) => {
    if (tasks.length === 0) return 0;
    return Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100);
  };

  const updateStudent = (updates) => {
    setStudents(students.map(s => s.id === selectedStudentId ? { ...s, ...updates } : s));
  };

  const sendMessage = () => {
    if (!message.trim()) return;
    alert(`Message sent to ${selectedStudent.name}: ${message}`);
    setMessage("");
    // In real app, integrate with messaging system
  };

  const exportData = () => {
    const data = JSON.stringify(selectedStudent, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedStudent.name}_progress.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-indigo-900 dark:to-blue-900 p-8 text-gray-800 dark:text-white">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center justify-between"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition font-medium"
          aria-label="Go back"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-extrabold">Teacher Panel - Student Monitoring</h1>
      </motion.header>

      {/* Student Search and Selector */}
      <motion.section
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Find Student
        </h2>
        <input
          type="text"
          placeholder="Search student by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 transition text-lg"
          aria-label="Search students"
        />
        <ul className="mt-4 space-y-3 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
          {filteredStudents.map(student => (
            <li key={student.id}>
              <button
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full text-left p-4 rounded-xl transition shadow-md ${
                  selectedStudentId === student.id
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
                aria-selected={selectedStudentId === student.id}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {student.name[0]}
                  </div>
                  <span className="text-lg font-medium">{student.name}</span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Progress Bars Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Study Hours
          </h3>
          <LinearProgress
            variant="determinate"
            value={(selectedStudent.studyHours / selectedStudent.maxStudyHours) * 100}
            className="h-3 rounded-full mb-2"
            sx={{
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': { backgroundColor: '#10b981' },
            }}
          />
          <p className="text-center font-medium">{selectedStudent.studyHours} / {selectedStudent.maxStudyHours} hours</p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Homework Completion
          </h3>
          <LinearProgress
            variant="determinate"
            value={selectedStudent.homeworkCompletion}
            className="h-3 rounded-full mb-2"
            sx={{
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': { backgroundColor: '#3b82f6' },
            }}
          />
          <p className="text-center font-medium">{selectedStudent.homeworkCompletion}%</p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Notes Taken
          </h3>
          <LinearProgress
            variant="determinate"
            value={(selectedStudent.notesTaken / selectedStudent.maxNotes) * 100}
            className="h-3 rounded-full mb-2"
            sx={{
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': { backgroundColor: '#f59e0b' },
            }}
          />
          <p className="text-center font-medium">{selectedStudent.notesTaken} / {selectedStudent.maxNotes}</p>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 8" />
            </svg>
            Growth Rate
          </h3>
          <LinearProgress
            variant="determinate"
            value={selectedStudent.growthRate}
            className="h-3 rounded-full mb-2"
            sx={{
              backgroundColor: '#e5e7eb',
              '& .MuiLinearProgress-bar': { backgroundColor: '#8b5cf6' },
            }}
          />
          <p className="text-center font-medium">{selectedStudent.growthRate}%</p>
        </div>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Tasks Monitoring */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Student Tasks
            </h2>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500"
              aria-label="Sort tasks by"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500 scrollbar-track-gray-200 dark:scrollbar-track-gray-700">
            {sortedTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-100/50 dark:bg-gray-700/50 rounded-xl shadow-md transition hover:scale-105">
                <div className="flex-1">
                  <span className={`text-base font-medium ${task.completed ? "line-through text-gray-500" : ""}`}>{task.text}</span>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Due: {task.dueDate} | Priority: {task.priority}</p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => toggleTaskComplete(index)}
                    className={`px-4 py-2 rounded-lg text-white font-medium ${task.completed ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"} transition`}
                    aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
                  >
                    {task.completed ? "Completed" : "Pending"}
                  </button>
                  <button
                    onClick={() => deleteTask(index)}
                    className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600 transition font-medium"
                    aria-label="Delete task"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Assign Homework & Message Panel */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-2xl p-6"
        >
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Manage Student
          </h2>
          <h3 className="text-lg font-semibold mb-3">Assign Homework</h3>
          <input
            type="text"
            value={newHomework}
            onChange={(e) => setNewHomework(e.target.value)}
            placeholder="Homework description..."
            className="w-full p-4 mb-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 transition text-lg"
            aria-label="Homework description"
          />
          <div className="flex gap-3 mb-4">
            <input
              type="date"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              className="flex-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 transition"
              aria-label="Due date"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value)}
              className="flex-1 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 transition"
              aria-label="Priority"
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <button
            onClick={handleAssignHomework}
            className="w-full bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-bold text-lg mb-6"
            aria-label="Assign homework"
          >
            Assign Now
          </button>

          <h3 className="text-lg font-semibold mb-3">Send Message/Feedback</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message or feedback..."
            className="w-full h-32 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-purple-500 transition resize-none text-lg"
            aria-label="Message to student"
          />
          <button
            onClick={sendMessage}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-bold text-lg mt-3"
            aria-label="Send message"
          >
            Send Message
          </button>

          <button
            onClick={exportData}
            className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition font-bold text-lg mt-6"
            aria-label="Export data"
          >
            Export Student Data
          </button>
        </motion.section>
      </div>
    </div>
  );
}