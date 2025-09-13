import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaCheck, FaTimes, FaCalendarAlt, FaTag, FaTrash } from "react-icons/fa";
import dayjs from "dayjs";

// Mock categories for tasks
const categories = ["Study", "Revision", "Practice", "Project"];

// Mock auto-generated plan suggestions
const autoPlanSuggestions = [
  { subject: "Math", topic: "Algebra Basics", time: "14:00", deadline: dayjs().add(2, 'day').format('YYYY-MM-DD'), priority: "High", category: "Study" },
  { subject: "Science", topic: "Physics Laws", time: "16:00", deadline: dayjs().add(3, 'day').format('YYYY-MM-DD'), priority: "Medium", category: "Revision" },
  { subject: "English", topic: "Essay Draft", time: "10:00", deadline: dayjs().add(1, 'day').format('YYYY-MM-DD'), priority: "Low", category: "Practice" },
];

const StudyPlanner = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ subject: "", topic: "", time: "", deadline: "", priority: "Medium", category: "Study" });
  const [filter, setFilter] = useState("all"); // all, pending, done, skipped

  const addPlan = () => {
    if (!form.subject.trim() || !form.topic.trim()) return;
    setPlans([...plans, { ...form, status: "pending", createdAt: dayjs().format('YYYY-MM-DD') }]);
    setForm({ subject: "", topic: "", time: "", deadline: "", priority: "Medium", category: "Study" });
  };

  const autoGeneratePlan = () => {
    const randomPlan = autoPlanSuggestions[Math.floor(Math.random() * autoPlanSuggestions.length)];
    setPlans([...plans, { ...randomPlan, status: "pending", createdAt: dayjs().format('YYYY-MM-DD') }]);
  };

  const updateStatus = (index, status) => {
    const updated = [...plans];
    updated[index].status = status;
    setPlans(updated);
  };

  const deletePlan = (index) => {
    setPlans(plans.filter((_, i) => i !== index));
  };

  const filteredPlans = plans.filter(plan => filter === "all" || plan.status === filter);

  const getProgress = () => {
    if (plans.length === 0) return 0;
    const completed = plans.filter(p => p.status === "done").length;
    return Math.round((completed / plans.length) * 100);
  };

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
        <h1 className="text-3xl font-extrabold flex items-center gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          <FaCalendarAlt /> Study Planner
        </h1>
      </motion.header>

      {/* Progress Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <FaCheck /> Plan Progress
        </h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 text-lg font-medium text-center">
          {plans.filter(p => p.status === "done").length} / {plans.length} Plans Completed ({getProgress()}%)
        </p>
        <div className="mt-4 flex justify-center gap-6">
          <p className="text-sm font-medium">
            Pending: <span className="text-blue-600 dark:text-blue-400">{plans.filter(p => p.status === "pending").length}</span>
          </p>
          <p className="text-sm font-medium">
            Skipped: <span className="text-red-600 dark:text-red-400">{plans.filter(p => p.status === "skipped").length}</span>
          </p>
        </div>
      </motion.div>

      {/* Plan Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <FaPlus /> Create Study Plan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Subject"
          />
          <input
            type="text"
            placeholder="Topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Topic"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Study time"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Deadline"
          />
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Priority"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Category"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <button
            onClick={addPlan}
            className="col-span-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2"
            aria-label="Add study plan"
          >
            <FaPlus /> Add Plan
          </button>
          <button
            onClick={autoGeneratePlan}
            className="col-span-2 bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2"
            aria-label="Auto-generate study plan"
          >
            <FaCalendarAlt /> Auto-Generate
          </button>
        </div>
      </motion.div>

      {/* Filter Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 flex gap-4 items-center justify-center"
      >
        <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl p-3 shadow-md">
          <FaTag className="text-blue-600 dark:text-blue-300" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Filter plans"
          >
            <option value="all">All Plans</option>
            <option value="pending">Pending</option>
            <option value="done">Completed</option>
            <option value="skipped">Skipped</option>
          </select>
        </div>
      </motion.div>

      {/* Plans List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`p-6 rounded-xl shadow-lg border-l-4 ${
                plan.status === "done"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/50"
                  : plan.status === "skipped"
                  ? "border-red-500 bg-red-50 dark:bg-red-900/50"
                  : "border-blue-500 bg-white dark:bg-gray-800/80"
              } hover:shadow-xl transition-transform duration-300 transform hover:scale-105`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-bold text-gray-800 dark:text-white">{plan.subject}</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{plan.topic}</p>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  plan.priority === "High" ? "bg-red-100 text-red-600" :
                  plan.priority === "Medium" ? "bg-yellow-100 text-yellow-600" :
                  "bg-green-100 text-green-600"
                }`}>{plan.priority}</span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex flex-wrap gap-2">
                <span>⏰ {plan.time}</span>
                <span>| 📅 {dayjs(plan.deadline).format("DD MMM YYYY")}</span>
                <span>| <FaTag className="inline" /> {plan.category}</span>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => updateStatus(index, "done")}
                  className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                  aria-label={`Mark ${plan.subject} as completed`}
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => updateStatus(index, "skipped")}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                  aria-label={`Mark ${plan.subject} as skipped`}
                >
                  <FaTimes />
                </button>
                <button
                  onClick={() => deletePlan(index)}
                  className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition"
                  aria-label={`Delete ${plan.subject} plan`}
                >
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StudyPlanner;