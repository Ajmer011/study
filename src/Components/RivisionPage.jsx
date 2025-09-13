import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion, AnimatePresence } from "framer-motion";

const RevisionPage = () => {
  const [studyText, setStudyText] = useState("");
  const [subject, setSubject] = useState("General");
  const [records, setRecords] = useState([]);
  const [filterSubject, setFilterSubject] = useState("All");
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    const savedRecords = JSON.parse(localStorage.getItem("revisionRecords")) || [];
    setRecords(savedRecords);
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem("revisionRecords", JSON.stringify(records));
  }, [records]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Add new record
  const handleAdd = () => {
    if (studyText.trim() === "") return;

    const newRecord = {
      id: Date.now(),
      date: dayjs().format("DD MMM YYYY, HH:mm"),
      text: studyText,
      subject,
    };

    setRecords([newRecord, ...records]);
    setStudyText("");
    setSubject("General");
  };

  // Delete record
  const handleDelete = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  // Filter records by subject
  const filteredRecords = filterSubject === "All"
    ? records
    : records.filter((record) => record.subject === filterSubject);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${isDarkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white' : 'bg-gradient-to-br from-blue-100 via-indigo-50 to-purple-100 text-gray-800'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-8"
        >
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100 transition font-semibold mr-4"
              aria-label="Go back to dashboard"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            <h1 className="text-4xl font-extrabold text-blue-400 drop-shadow-lg">
              📘 Revision Dashboard
            </h1>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 hover:bg-gray-700 dark:hover:bg-gray-300 transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="bg-[#1e2a38] dark:bg-[#2c3e50] p-6 rounded-2xl shadow-xl mb-8"
        >
          <h2 className="text-xl font-semibold text-blue-300 mb-4">Add Today’s Study</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="What did you study today?"
              className="flex-1 p-3 rounded-lg bg-[#2c3e50] dark:bg-[#3b4a5e] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={studyText}
              onChange={(e) => setStudyText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            />
            <select
              className="p-3 rounded-lg bg-[#2c3e50] dark:bg-[#3b4a5e] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option>General</option>
              <option>DSA</option>
              <option>React</option>
              <option>DBMS</option>
              <option>OS</option>
              <option>CN</option>
            </select>
            <button
              onClick={handleAdd}
              className="px-5 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold shadow-md transition transform hover:scale-105"
            >
              Add
            </button>
          </div>
        </motion.div>

        {/* Filter */}
        <div className="flex justify-start items-center mb-6">
          <select
            className="p-2 rounded-lg bg-[#2c3e50] dark:bg-[#3b4a5e] border border-gray-600 focus:outline-none"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option>All</option>
            <option>General</option>
            <option>DSA</option>
            <option>React</option>
            <option>DBMS</option>
            <option>OS</option>
            <option>CN</option>
          </select>
        </div>

        {/* Records Section */}
        <div>
          {filteredRecords.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-[#1e2a38] dark:bg-[#2c3e50] p-6 rounded-2xl text-gray-400 text-center shadow-lg"
            >
              No revision records yet.
            </motion.div>
          ) : (
            <div className="space-y-4">
              <AnimatePresence>
                {filteredRecords.map((record) => (
                  <motion.div
                    key={record.id}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="bg-[#1e2a38] dark:bg-[#2c3e50] p-5 rounded-2xl shadow-lg flex justify-between items-center hover:bg-[#243447] dark:hover:bg-[#3b4a5e] transition"
                  >
                    <div>
                      <p className="text-lg font-semibold text-blue-300">{record.subject}</p>
                      <p className="text-white">{record.text}</p>
                      <p className="text-sm text-gray-400 mt-1">{record.date}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(record.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition transform hover:scale-105"
                      aria-label="Delete record"
                    >
                      🗑️
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RevisionPage;