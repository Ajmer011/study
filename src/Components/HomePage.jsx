import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "Success is the sum of small efforts repeated daily.",
  "Don’t watch the clock; do what it does. Keep going.",
  "Study hard, dream big, achieve greatness!",
  "The future belongs to those who believe in the beauty of their dreams.",
  "Your only limit is your mind.",
];

const studyTips = [
  "Take regular breaks to improve focus.",
  "Use active recall for better retention.",
  "Set specific, achievable goals daily.",
  "Stay hydrated and get enough sleep.",
  "Review material in spaced intervals.",
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const priorityColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

const user = {
  name: "Ajmer",
  photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=80",
};

const previousDayData = {
  date: "Yesterday, August 27, 2025",
  tasks: [
    { id: "a1", text: "Finish Science assignment", priority: "High", done: true },
    { id: "a2", text: "Read English literature", priority: "Medium", done: false },
    { id: "a3", text: "Review flashcards", priority: "Low", done: true },
  ],
  progress: {
    totalTasks: 3,
    completedTasks: 2,
    chaptersCompleted: 6,
    flashcardsMastered: 110,
    studyStreakDays: 4,
  },
};

const mockCalendarEvents = [
  { date: "2025-08-29", event: "Math Exam", image: "https://images.unsplash.com/photo-1631897724271-0c31d0138959?auto=format&fit=crop&q=80" },
  { date: "2025-08-30", event: "History Project Due", image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80" },
  { date: "2025-09-01", event: "Study Group Meeting", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80" },
  { date: "2025-09-05", event: "Science Fair", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80" },
];

const mockResources = [
  { title: "Khan Academy", url: "https://www.khanacademy.org", icon: "https://img.icons8.com/color/48/000000/khan-academy.png" },
  { title: "Coursera", url: "https://www.coursera.org", icon: "https://img.icons8.com/color/48/000000/coursera.png" },
  { title: "Quizlet", url: "https://quizlet.com", icon: "https://img.icons8.com/color/48/000000/quizlet.png" },
  { title: "Duolingo", url: "https://www.duolingo.com", icon: "https://img.icons8.com/color/48/000000/duolingo.png" },
];

const mockRecentActivity = [
  { id: "1", action: "Completed Math Chapter 3 review", time: "2 hours ago", icon: "https://img.icons8.com/color/48/000000/math.png" },
  { id: "2", action: "Added new History notes", time: "4 hours ago", icon: "https://img.icons8.com/color/48/000000/history.png" },
  { id: "3", action: "Mastered 20 vocabulary flashcards", time: "Yesterday", icon: "https://img.icons8.com/color/48/000000/flash-card.png" },
];

export default function DashboardWithHistory() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const [quoteIndex, setQuoteIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((i) => (i + 1) % quotes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const [tipIndex, setTipIndex] = useState(0);
  useEffect(() => {
    setTipIndex(Math.floor(Math.random() * studyTips.length));
  }, []);

  const [tasks, setTasks] = useState([
    { id: "1", text: "Review Math Chapter 3", priority: "High", done: false },
    { id: "2", text: "Write History notes", priority: "Medium", done: false },
    { id: "3", text: "Practice vocabulary flashcards", priority: "Low", done: true },
  ]);
  const [newTaskText, setNewTaskText] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const newList = Array.from(tasks);
    const [moved] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, moved);
    setTasks(newList);
  };

  const toggleDone = (id) => {
    setTasks((t) =>
      t.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
    );
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
    setTasks((t) => [
      ...t,
      {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        priority: newTaskPriority,
        done: false,
      },
    ]);
    setNewTaskText("");
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const chaptersCompleted = 7;
  const flashcardsMastered = 120;
  const studyStreakDays = 5;

  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const workDuration = 25 * 60;
  const breakDuration = 5 * 60;

  useEffect(() => {
    if (!isRunning) return;

    const timerId = setInterval(() => {
      setTimeLeft((t) => {
        if (t === 0) {
          playBeep();
          if (mode === "work") {
            setMode("break");
            return breakDuration;
          } else {
            setMode("work");
            return workDuration;
          }
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isRunning, mode]);

  const playBeep = () => {
    const audioCtx = new AudioContext();
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
    oscillator.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.2);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [quickNote, setQuickNote] = useState("");
  const [dailyGoal, setDailyGoal] = useState("Complete 3 tasks and study for 2 hours");
  const [searchQuery, setSearchQuery] = useState("");

  const TasksList = ({ taskList, onToggle, isDraggable = false }) => {
    if (isDraggable) {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3 flex-1 overflow-auto max-h-80"
              >
                {taskList.map(({ id, text, priority, done }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <motion.li
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-4 rounded-xl shadow-md cursor-pointer select-none transition-all duration-200 ${
                          snapshot.isDragging
                            ? "bg-blue-100 dark:bg-blue-900 scale-105"
                            : darkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-white hover:bg-gray-50"
                        }`}
                        onClick={() => onToggle(id)}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                              done
                                ? "bg-blue-600 border-blue-600"
                                : "border-gray-300"
                            }`}
                          >
                            {done && (
                              <svg
                                className="h-4 w-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          <p
                            className={`text-base ${
                              done
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : "text-gray-800 dark:text-gray-200"
                            }`}
                          >
                            {text}
                          </p>
                        </div>
                        <div
                          className={`${priorityColors[priority]} text-white px-3 py-1 rounded-full text-sm font-medium`}
                        >
                          {priority}
                        </div>
                      </motion.li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      );
    } else {
      return (
        <ul className="space-y-3 max-h-80 overflow-auto">
          {taskList.map(({ id, text, priority, done }) => (
            <li
              key={id}
              className={`flex items-center justify-between p-4 rounded-xl shadow-md select-none transition-all duration-200 ${
                darkMode ? "bg-gray-800" : "bg-white"
              } hover:scale-102`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${
                    done ? "bg-blue-600 border-blue-600" : "border-gray-300"
                  }`}
                >
                  {done && (
                    <svg
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <p
                  className={`text-base ${
                    done
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {text}
                </p>
              </div>
              <div
                className={`${priorityColors[priority]} text-white px-3 py-1 rounded-full text-sm font-medium`}
              >
                {priority}
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  const ProgressSummary = ({ progress }) => (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-blue-700 to-indigo-900 rounded-2xl shadow-xl p-8 text-white overflow-hidden"
    >
      <img
        src="https://images.unsplash.com/photo-1461749289074-4fbb9603e2d0?auto=format&fit=crop&q=80"
        alt="Progress background"
        className="absolute inset-0 object-cover opacity-20"
      />
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 relative z-10">
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Progress Overview
      </h2>
      <div className="grid grid-cols-2 gap-6 relative z-10">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(progress.completedTasks / progress.totalTasks) * 100 || 0}
              text={`${progress.completedTasks}/${progress.totalTasks}`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#fbbf24",
                trailColor: "rgba(255,255,255,0.15)",
                strokeLinecap: "round",
              })}
            />
          </div>
          <p className="mt-3 text-sm font-medium">Tasks Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(progress.chaptersCompleted / 10) * 100}
              text={`${progress.chaptersCompleted} Ch`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#34d399",
                trailColor: "rgba(255,255,255,0.15)",
                strokeLinecap: "round",
              })}
            />
          </div>
          <p className="mt-3 text-sm font-medium">Chapters</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(progress.flashcardsMastered / 150) * 100}
              text={`${progress.flashcardsMastered}`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#60a5fa",
                trailColor: "rgba(255,255,255,0.15)",
                strokeLinecap: "round",
              })}
            />
          </div>
          <p className="mt-3 text-sm font-medium">Flashcards Mastered</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-24 h-24">
            <CircularProgressbar
              value={(progress.studyStreakDays / 7) * 100}
              text={`${progress.studyStreakDays} Days`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#f87171",
                trailColor: "rgba(255,255,255,0.15)",
                strokeLinecap: "round",
              })}
            />
          </div>
          <p className="mt-3 text-sm font-medium">Study Streak</p>
        </div>
      </div>
    </motion.section>
  );

  return (
    <div className={`min-h-screen scroll-smooth ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-blue-800 to-indigo-900 text-white z-50 shadow-2xl overflow-y-auto md:hidden"
      >
        <div className="p-8 flex flex-col items-center border-b border-indigo-700">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center text-3xl font-bold text-white shadow-md">
            {user.name[0]}
          </div>
          <h3 className="mt-4 text-xl font-bold">{user.name}</h3>
          <p className="text-indigo-200 text-sm">Dedicated Learner</p>
          <Link to="/profile" className="mt-3 text-indigo-300 hover:text-white transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 5.523-4.477 10-10 10S1 17.523 1 12 5.477 2 11 2s10 4.477 10 10z" />
            </svg>
          </Link>
        </div>
        <nav className="flex flex-col gap-2 p-6">
          {[
            { to: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
            { to: "/notes", label: "Notes", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
            { to: "/planning", label: "Planning", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
            { to: "/progress", label: "Progress", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
            { to: "/rivision", label: "Revision", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
          ].map(({ to, label, icon }) => (
            <Link
              key={label}
              to={to}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl text-base font-medium hover:bg-indigo-800 transition duration-200 ${
                page === label.toLowerCase() ? "bg-indigo-700 shadow-md" : ""
              }`}
              onClick={() => {
                setPage(label.toLowerCase());
                setSidebarOpen(false);
              }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={icon} />
              </svg>
              {label}
            </Link>
          ))}
          <button
            onClick={() => {
              alert("Logging out...");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-6 py-3 rounded-xl text-base font-medium text-white bg-red-600 hover:bg-red-700 transition duration-200 mt-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h3a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </nav>
      </motion.aside>

      <div className="flex flex-col min-h-screen">
        <header className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen((open) => !open)}
              aria-label="Toggle sidebar"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 hover:bg-indigo-600 transition md:hidden"
            >
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <Link to="/dashboard" className="text-2xl font-bold flex items-center gap-4 pl-8">
              {/* <img src="https://img.icons8.com/color/48/000000/study.png" alt="Logo" className="w-8 h-8" /> */}
              StudyHub
            </Link>
          <div>
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg transform transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Dashboard
        </div>
        <ul className="mt-4 space-y-4 p-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">🏠 Home</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">⚙️ Settings</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">📝 Notes</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">📚 Homework</li>
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer text-red-400">
            🚪 Logout
          </li>
        </ul>
      </div>

      {/* Overlay (click to close) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
             
              { to: "/", label: "LandingPage" },
              { to: "/notes", label: "Notes" },
              { to: "/planning", label: "Planning" },
              { to: "/progress", label: "Progress" },
              { to: "/rivision", label: "Rivision" },
           
            ].map(({ to, label }) => (
              <Link
                key={label}
                to={to}
                className={`text-base font-medium hover:text-indigo-200 transition ${page === label.toLowerCase() ? "text-indigo-100 underline" : ""}`}
                onClick={() => setPage(label.toLowerCase())}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-full bg-indigo-800 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white hidden lg:block"
            />
            <button
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
              className="focus:outline-none focus:ring-2 focus:ring-white rounded-full p-2 hover:bg-indigo-600 transition"
            >
              {darkMode ? (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <Link to="/profile" className="flex items-center gap-2">
              <img src={user.photo} alt="Profile" className="w-8 h-8 rounded-full" />
            </Link>
          </div>
        </header>

        <main className="flex-grow p-8 max-w-7xl mx-auto w-full space-y-12">
          {page === "dashboard" && (
            <>
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl shadow-xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80"
                  alt="Study hero"
                  className="absolute inset-0 object-cover h-64 w-full opacity-90"
                />
                <div className="relative z-10 p-8 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                        {user.name[0]}
                      </div>
                      <div>
                        <h1 className="text-3xl font-extrabold">
                          {getGreeting()}, {user.name}!
                        </h1>
                        <p className="text-lg italic mt-2">
                          {quotes[quoteIndex]}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => alert("Stay motivated and keep pushing forward!")}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
                    >
                      Daily Motivation
                    </button>
                  </div>
                </div>
              </motion.section>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Today's Tasks
                  </h2>
                  <TasksList taskList={tasks} onToggle={toggleDone} isDraggable />
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="Enter new task..."
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="flex-grow px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base transition"
                    />
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      onClick={addTask}
                      className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold"
                    >
                      Add Task
                    </button>
                  </div>
                </motion.section>

                <ProgressSummary
                  progress={{
                    totalTasks,
                    completedTasks,
                    chaptersCompleted,
                    flashcardsMastered,
                    studyStreakDays,
                  }}
                />

                <motion.section
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 flex flex-col items-center"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pomodoro Focus
                  </h2>
                  <div className="text-5xl font-mono mb-6 text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 px-8 py-4 rounded-xl shadow-inner">
                    {formatTime(timeLeft)}
                  </div>
                  <div className="flex gap-4">
                    {!isRunning ? (
                      <Link to="/timer">
                        <button
                          onClick={() => setIsRunning(true)}
                          className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition font-semibold"
                        >
                          Start Session
                        </button>
                      </Link>
                    ) : (
                      <button
                        onClick={() => setIsRunning(false)}
                        className="bg-yellow-600 text-white px-6 py-3 rounded-xl hover:bg-yellow-700 transition font-semibold"
                      >
                        Pause
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(mode === "work" ? workDuration : breakDuration);
                      }}
                      className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition font-semibold"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="mt-4 text-base text-gray-500 dark:text-gray-400 font-medium">
                    Current Mode: {mode === "work" ? "Focus Time" : "Break Time"}
                  </p>
                </motion.section>
              </div>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Upcoming Events
                  </h2>
                  <ul className="space-y-4">
                    {mockCalendarEvents.map((event, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm"
                      >
                        <img src={event.image} alt={event.event} className="w-12 h-12 rounded-md object-cover" />
                        <div className="flex-1">
                          <span className="text-base font-medium block">{event.event}</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{event.date}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold">
                    View Full Calendar
                  </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Quick Notes
                  </h2>
                  <textarea
                    value={quickNote}
                    onChange={(e) => setQuickNote(e.target.value)}
                    placeholder="Jot down your thoughts or key points..."
                    className="w-full h-40 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white resize-none text-base"
                  />
                  <button className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold">
                    Save Note
                  </button>
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Daily Goals
                </h2>
                <input
                  type="text"
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-base mb-4"
                />
                <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold">
                  Set Goal
                </button>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Study Resources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockResources.map((resource, index) => (
                    <motion.a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-md hover:shadow-lg transition duration-200 text-center flex flex-col items-center"
                    >
                      <img src={resource.icon} alt={`${resource.title} icon`} className="w-12 h-12 mb-3" />
                      <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-400">{resource.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Explore courses and materials</p>
                    </motion.a>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Recent Activity
                </h2>
                <ul className="space-y-4">
                  {mockRecentActivity.map((activity) => (
                    <li key={activity.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl shadow-sm">
                      <img src={activity.icon} alt="Activity icon" className="w-10 h-10" />
                      <div className="flex-1">
                        <span className="text-base font-medium block">{activity.action}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.section>

              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl shadow-xl p-8 text-white"
              >
                <h2 className="text-2xl font-bold mb-4">Study Tip of the Day</h2>
                <p className="text-lg italic">{studyTips[tipIndex]}</p>
              </motion.section>
            </>
          )}

          <Link to="/chat">
            <motion.button
              className="fixed bottom-8 right-8 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-base shadow-2xl hover:shadow-3xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 flex items-center gap-3 overflow-hidden z-50"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Chat with AI Tutor
              <span className="absolute inset-0 bg-white opacity-0 hover:opacity-5 transition-opacity duration-300" />
            </motion.button>
          </Link>

          {page === "history" && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            >
              <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
                {previousDayData.date}
              </h1>
              <p className="text-lg text-blue-600 dark:text-blue-400 mb-8">
                Reflect on your previous day's achievements and areas for improvement.
              </p>
              <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Completed Tasks</h2>
              <TasksList taskList={previousDayData.tasks} onToggle={() => {}} />
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Progress Insights</h2>
                <ProgressSummary progress={previousDayData.progress} />
              </div>
            </motion.section>
          )}
        </main>
      </div>
    </div>
  );
}