import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaClock, FaBookOpen, FaChartBar } from "react-icons/fa";

const initialChapters = [
  { id: 1, subject: "Math", chapter: "Algebra", due: "2025-06-01", status: "pending", history: {} },
  { id: 2, subject: "Science", chapter: "Motion", due: "2025-06-02", status: "pending", history: {} },
  { id: 3, subject: "History", chapter: "World War II", due: "2025-06-03", status: "completed", history: {} },
  { id: 4, subject: "English", chapter: "Grammar Basics", due: "2025-06-01", status: "pending", history: {} },
];

// Helper: get days difference from today to due date
const daysUntilDue = (dueDate) => {
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // days
};

// Format date as YYYY-MM-DD
const formatDate = (date) => date.toISOString().slice(0, 10);

const getStatusColor = (status) => {
  if (status === "completed") return "text-green-600";
  return "text-red-600";
};

const RevisionReminder = () => {
  const [chapterList, setChapterList] = useState(initialChapters);
  const [newChapter, setNewChapter] = useState({ subject: "", chapter: "", due: "" });

  // Mark completion toggles and records today's revision in history as 100% if completed
  const toggleCompletion = (id) => {
    const today = formatDate(new Date());
    const updated = chapterList.map((c) => {
      if (c.id === id) {
        const newStatus = c.status === "completed" ? "pending" : "completed";
        let newHistory = { ...c.history };
        if (newStatus === "completed") {
          newHistory[today] = 100; // 100% revision for today
        } else {
          newHistory[today] = 0; // mark 0 if toggled back to pending
        }
        return { ...c, status: newStatus, history: newHistory };
      }
      return c;
    });
    setChapterList(updated);
  };

  // Add new chapter
  const addChapter = () => {
    if (!newChapter.subject || !newChapter.chapter || !newChapter.due) return alert("Please fill all fields");

    const newId = chapterList.length ? Math.max(...chapterList.map((c) => c.id)) + 1 : 1;
    setChapterList([
      ...chapterList,
      { id: newId, ...newChapter, status: "pending", history: {} },
    ]);
    setNewChapter({ subject: "", chapter: "", due: "" });
  };

  // Get last 7 days dates array
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(formatDate(d));
    }
    return days;
  };

  // Calculate daily revision % (across all chapters) for last week
  const dailyRevisionPercent = () => {
    const days = getLast7Days();
    return days.map((day) => {
      let total = 0;
      let count = 0;
      chapterList.forEach((c) => {
        if (c.history && c.history[day] !== undefined) {
          total += c.history[day];
          count++;
        }
      });
      // Average % revision for this day, or 0 if none
      return { day, percent: count ? Math.round(total / count) : 0 };
    });
  };

  const pendingChapters = chapterList.filter((c) => c.status === "pending");
  const dailyStats = dailyRevisionPercent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white p-10">
      <h1 className="text-3xl font-bold text-center text-purple-800 mb-6">
        🧠 Chapter-wise Revision Tracker
      </h1>

      <div className="mb-6 text-center text-gray-700">
        <FaChartBar className="inline text-2xl mr-2" />
        <strong>{pendingChapters.length}</strong> Chapters Pending — Don’t Forget to Revise Today!
      </div>

      {/* Add new chapter */}
      <div className="mb-8 max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-purple-700">Add New Chapter to Revise</h2>
        <input
          type="text"
          placeholder="Subject"
          value={newChapter.subject}
          onChange={(e) => setNewChapter({ ...newChapter, subject: e.target.value })}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="text"
          placeholder="Chapter Name"
          value={newChapter.chapter}
          onChange={(e) => setNewChapter({ ...newChapter, chapter: e.target.value })}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <input
          type="date"
          placeholder="Due Date"
          value={newChapter.due}
          onChange={(e) => setNewChapter({ ...newChapter, due: e.target.value })}
          className="w-full mb-3 px-3 py-2 border rounded"
        />
        <button
          onClick={addChapter}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold"
        >
          Add Chapter
        </button>
      </div>

      {/* Daily revision stats last 7 days */}
      <div className="mb-6 max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">Last 7 Days Revision Progress (%)</h2>
        <div className="flex space-x-2 justify-between text-sm text-gray-600">
          {dailyStats.map(({ day, percent }) => (
            <div key={day} className="text-center w-10">
              <div
                className="bg-purple-400 rounded"
                style={{ height: `${percent}px`, marginBottom: '4px' }}
                title={`${percent}%`}
              ></div>
              <div>{day.slice(5)}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chapterList.map((c) => {
          const daysLeft = daysUntilDue(c.due);
          return (
            <div
              key={c.id}
              className="bg-white shadow-md rounded-lg p-6 border-l-4 border-purple-400 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                <FaBookOpen className="inline mr-2 text-blue-500" /> {c.chapter} ({c.subject})
              </h2>
              <p className="text-sm text-gray-500 mb-1">
                <FaClock className="inline mr-1" /> Revise by: <strong>{c.due}</strong>
              </p>
              <p className="text-sm mb-3">
                {daysLeft > 0
                  ? `Next revision in ${daysLeft} day${daysLeft > 1 ? "s" : ""}`
                  : daysLeft === 0
                  ? "Revision due today!"
                  : `Overdue by ${-daysLeft} day${-daysLeft > 1 ? "s" : ""}`}
              </p>
              <p className={`font-bold ${getStatusColor(c.status)} mb-4`}>Status: {c.status}</p>
              <button
                onClick={() => toggleCompletion(c.id)}
                className={`px-4 py-2 rounded-md text-white font-semibold ${
                  c.status === "completed"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-red-500 hover:bg-red-600"
                }`}
              >
                {c.status === "completed" ? "Mark as Pending" : "Mark as Done"}{" "}
                <FaCheckCircle className="inline ml-1" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RevisionReminder;
