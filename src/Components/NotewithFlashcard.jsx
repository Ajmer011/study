import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { FaBook, FaPen, FaSyncAlt, FaSearch, FaStickyNote, FaTag, FaTrash, FaFilter } from "react-icons/fa";

// Mock categories for notes
const categories = ["Lecture Notes", "Revision", "Summary", "Concepts"];

const NotesAndFlashcards = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [form, setForm] = useState({ subject: "", content: "", category: "Lecture Notes" });
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); // all or specific category

  const addNote = () => {
    if (!form.subject.trim() || !form.content.trim()) return;
    setNotes([...notes, { ...form, createdAt: new Date().toISOString() }]);
    setForm({ subject: "", content: "", category: "Lecture Notes" });
  };

  const deleteNote = (index) => {
    setNotes(notes.filter((_, i) => i !== index));
    setFlashcards(flashcards.filter(card => card.id !== index));
  };

  const convertToFlashcards = () => {
    const newFlashcards = notes.map((note, idx) => ({
      front: note.subject,
      back: note.content,
      id: idx,
      category: note.category,
    }));
    setFlashcards(newFlashcards);
  };

  const filteredFlashcards = flashcards.filter(
    (card) =>
      (filter === "all" || card.category === filter) &&
      (card.front.toLowerCase().includes(search.toLowerCase()) ||
       card.back.toLowerCase().includes(search.toLowerCase()))
  );

  const getNoteCount = () => notes.length;
  const getFlashcardCount = () => flashcards.length;

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
          <FaStickyNote /> Notes & Flashcards
        </h1>
      </motion.header>

      {/* Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <FaBook /> Overview
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <p className="text-lg font-medium">
            Total Notes: <span className="text-blue-600 dark:text-blue-400">{getNoteCount()}</span>
          </p>
          <p className="text-lg font-medium">
            Flashcards Generated: <span className="text-blue-600 dark:text-blue-400">{getFlashcardCount()}</span>
          </p>
        </div>
      </motion.div>

      {/* Note Input Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <FaPen /> Add New Note
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
            aria-label="Subject"
          />
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
          <textarea
            placeholder="Write your note here..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="p-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition h-32 col-span-2"
            aria-label="Note content"
          />
          <button
            onClick={addNote}
            className="bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-semibold flex items-center justify-center gap-2 col-span-2"
            aria-label="Save note"
          >
            <FaPen /> Save Note
          </button>
          <button
            onClick={convertToFlashcards}
            className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700 transition font-semibold flex items-center justify-center gap-2 col-span-2"
            aria-label="Convert to flashcards"
          >
            <FaSyncAlt /> Convert to Flashcards
          </button>
        </div>
      </motion.div>

      {/* Notes List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 mb-8"
      >
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600 dark:text-blue-300">
          <FaBook /> Notes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {notes.map((note, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="p-4 rounded-xl shadow-md bg-white dark:bg-gray-800 border-l-4 border-indigo-500 hover:shadow-lg transition-transform duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{note.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{note.content}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      <FaTag className="inline mr-1" /> {note.category} | Created: {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteNote(index)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                    aria-label={`Delete note ${note.subject}`}
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Flashcards Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-blue-600 dark:text-blue-300">
            <FaStickyNote /> Flashcards
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FaFilter className="text-blue-600 dark:text-blue-300" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition"
                aria-label="Filter flashcards"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-2">
              <FaSearch className="text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search flashcards..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-transparent focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition w-64"
                aria-label="Search flashcards"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredFlashcards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-indigo-100 to-white dark:from-indigo-900 dark:to-gray-800 p-6 rounded-xl shadow-lg border border-indigo-200 dark:border-indigo-700 hover:shadow-2xl transition-transform duration-300 transform cursor-pointer"
                onClick={() => {
                  const updated = [...flashcards];
                  [updated[index].front, updated[index].back] = [updated[index].back, updated[index].front];
                  setFlashcards(updated);
                }}
                role="button"
                aria-label={`Flip flashcard ${card.front}`}
              >
                <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300 text-center line-clamp-3">
                  {card.front}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <FaTag className="inline mr-1" /> {card.category}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default NotesAndFlashcards;