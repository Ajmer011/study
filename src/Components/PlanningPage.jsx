import React, { useState } from "react";
import { FaPlus, FaCheck, FaTimes, FaCalendarAlt, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import dayjs from "dayjs";

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const StudyPlanner = () => {
  const [plans, setPlans] = useState([]);
  const [form, setForm] = useState({ subject: "", topic: "", time: "", deadline: "" });

  const addPlan = () => {
    if (form.subject && form.topic) {
      setPlans([...plans, { ...form, status: "pending" }]);
      setForm({ subject: "", topic: "", time: "", deadline: "" });
    }
  };

  const updateStatus = (index, status) => {
    const updated = [...plans];
    updated[index].status = status;
    setPlans(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-10">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold mb-6 text-blue-800 flex items-center gap-2">
          <FaCalendarAlt /> Study Planner
        </h1>

        <div className="bg-white p-6 rounded-xl shadow-lg grid md:grid-cols-4 gap-4 mb-8">
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="text"
            placeholder="Topic"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="border p-2 rounded-md"
          />
          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="border p-2 rounded-md"
          />
          <button
            onClick={addPlan}
            className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 col-span-2 flex items-center justify-center gap-2"
          >
            <FaPlus /> Add Plan
          </button>
          <button
            className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 col-span-2 flex items-center justify-center gap-2"
          >
            <FaMagic /> Auto-generate Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-5 rounded-xl shadow-lg border-l-4 ${
                plan.status === "done"
                  ? "border-green-500 bg-green-50"
                  : plan.status === "skipped"
                  ? "border-red-500 bg-red-50"
                  : "border-blue-500 bg-white"
              }`}
            >
              <h2 className="text-lg font-bold">{plan.subject}</h2>
              <p className="text-sm text-gray-600">{plan.topic}</p>
              <p className="text-xs text-gray-400">⏰ {plan.time} | 📅 {dayjs(plan.deadline).format("DD MMM YYYY")}</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => updateStatus(index, "done")}
                  className="text-green-600 hover:text-green-800"
                >
                  <FaCheck />
                </button>
                <button
                  onClick={() => updateStatus(index, "skipped")}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTimes />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default StudyPlanner;