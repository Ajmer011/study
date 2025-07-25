import React, { useState } from "react";
import { FaBook, FaPen, FaSyncAlt, FaSearch, FaStickyNote, FaLayerGroup, FaListUl, FaMagic } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

const NotesAndFlashcards = () => {
  const [notes, setNotes] = useState([]);
  const [flashcards, setFlashcards] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [subject, setSubject] = useState("");
  const [search, setSearch] = useState("");

  const addNote = () => {
    if (subject && noteText) {
      setNotes([...notes, { subject, content: noteText }]);
      setNoteText("");
      setSubject("");
    }
  };

  const convertToFlashcards = () => {
    const newFlashcards = notes.map((note, idx) => ({
      front: note.subject,
      back: note.content,
      id: idx,
    }));
    setFlashcards(newFlashcards);
  };

  const filteredFlashcards = flashcards.filter(
    (card) =>
      card.front.toLowerCase().includes(search.toLowerCase()) ||
      card.back.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-10 bg-gradient-to-br from-indigo-50 to-white min-h-screen font-sans">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold text-indigo-700 flex items-center gap-3">
            <FaStickyNote className="text-3xl" /> Smart Notes & Flashcards
          </h1>
          <div className="flex gap-4 text-indigo-500">
            <FaListUl size={24} title="Organize Notes" />
            <FaLayerGroup size={24} title="Group Subjects" />
            <FaMagic size={24} title="Auto Convert" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-10 bg-white p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="Subject"
            className="border p-3 rounded-md col-span-1 shadow-sm focus:outline-indigo-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
          <textarea
            placeholder="Write your note here..."
            className="border p-3 rounded-md col-span-2 h-32 shadow-sm focus:outline-indigo-400"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
          />
          <button
            onClick={addNote}
            className="bg-indigo-600 text-white rounded-md p-3 hover:bg-indigo-700 col-span-1 flex items-center justify-center gap-2 mt-2 shadow-md"
          >
            <FaPen /> Save Note
          </button>
          <button
            onClick={convertToFlashcards}
            className="bg-pink-500 text-white rounded-md p-3 hover:bg-pink-600 col-span-2 flex items-center justify-center gap-2 mt-2 shadow-md"
          >
            <FaSyncAlt /> Convert to Flashcards
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FaSearch className="text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search flashcards..."
              className="border p-3 rounded-md w-64 focus:outline-indigo-400"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFlashcards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-100 to-white p-6 rounded-xl shadow-lg cursor-pointer border border-indigo-200 hover:shadow-2xl"
              onClick={() => {
                const updated = [...flashcards];
                [updated[index].front, updated[index].back] = [updated[index].back, updated[index].front];
                setFlashcards(updated);
              }}
            >
              <p className="text-lg font-semibold text-indigo-700 whitespace-pre-line text-center">{card.front}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NotesAndFlashcards;