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
];

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const priorityColors = {
  High: "bg-red-400",
  Medium: "bg-yellow-400",
  Low: "bg-green-400",
};

const user = {
  name: "Ajmer",
  photo:
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&q=80",
};

// MOCK: Previous day data
const previousDayData = {
  date: "Yesterday, May 29, 2025",
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
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  // Tasks state (today)
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

  // Today’s progress
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.done).length;
  const chaptersCompleted = 7;
  const flashcardsMastered = 120;
  const studyStreakDays = 5;

  // Pomodoro timer states (same as before)
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
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // Sidebar toggle
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Page navigation state
  const [page, setPage] = useState("dashboard"); // "dashboard" or "history"

  // Render Tasks List (common for today and history)
  const TasksList = ({ taskList, onToggle, isDraggable = false }) => {
    if (isDraggable) {
      return (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-3 flex-1 overflow-auto max-h-96"
              >
                {taskList.map(({ id, text, priority, done }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <motion.li
                        layout
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.03 }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex items-center justify-between p-3 rounded-xl shadow cursor-pointer select-none ${
                          snapshot.isDragging
                            ? "bg-indigo-100 dark:bg-indigo-700"
                            : darkMode
                            ? "bg-gray-700"
                            : "bg-gray-100"
                        }`}
                        onClick={() => onToggle(id)}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                              done
                                ? "bg-indigo-600 border-indigo-600"
                                : "border-gray-400"
                            } transition-colors`}
                          >
                            {done && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-black"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={3}
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
                            className={`select-none ${
                              done
                                ? "line-through text-gray-400 dark:text-gray-500"
                                : ""
                            }`}
                          >
                            {text}
                          </p>
                        </div>
                        <div
                          className={`${priorityColors[priority]} text-white px-3 py-1 rounded-full text-xs font-semibold`}
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
        <ul className="space-y-3 max-h-96 overflow-auto">
          {taskList.map(({ id, text, priority, done }) => (
            <li
              key={id}
              className={`flex items-center justify-between p-3 rounded-xl shadow select-none ${
                darkMode ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                    done ? "bg-indigo-600 border-indigo-600" : "border-gray-400"
                  } transition-colors`}
                >
                  {done && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
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
                  className={`select-none ${
                    done ? "line-through text-gray-400 dark:text-gray-500" : ""
                  }`}
                >
                  {text}
                </p>
              </div>
              <div
                className={`${priorityColors[priority]} text-white px-3 py-1 rounded-full text-xs font-semibold`}
              >
                {priority}
              </div>
            </li>
          ))}
        </ul>
      );
    }
  };

  // Progress Summary component
  const ProgressSummary = ({ progress }) => (
    <section className="bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-600 rounded-2xl shadow-lg p-6 text-white flex flex-col gap-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
        {/* <img
          src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/ffffff/external-progress-study-flaticons-lineal-color-flat-icons.png"
          alt="Progress Icon"
          className="w-10 h-10"
        /> */}
       📈  Progress Summary
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="flex flex-col items-center">
          <CircularProgressbar
            value={(progress.completedTasks / progress.totalTasks) * 100 || 0}
            text={`${progress.completedTasks}/${progress.totalTasks}`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#fbbf24",
              trailColor: "rgba(255,255,255,0.3)",
              strokeLinecap: "round",
            })}
          />
          <p className="mt-3">Tasks Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <CircularProgressbar
            value={(progress.chaptersCompleted / 10) * 100}
            text={`${progress.chaptersCompleted} Chaps`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#34d399",
              trailColor: "rgba(255,255,255,0.3)",
              strokeLinecap: "round",
            })}
          />
          <p className="mt-3">Chapters Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <CircularProgressbar
            value={(progress.flashcardsMastered / 150) * 100}
            text={`${progress.flashcardsMastered}`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#60a5fa",
              trailColor: "rgba(255,255,255,0.3)",
              strokeLinecap: "round",
            })}
          />
          <p className="mt-3">Flashcards Mastered</p>
        </div>
        <div className="flex flex-col items-center">
          <CircularProgressbar
            value={(progress.studyStreakDays / 7) * 100}
            text={`${progress.studyStreakDays} Days`}
            styles={buildStyles({
              textColor: "#fff",
              pathColor: "#f87171",
              trailColor: "rgba(255,255,255,0.3)",
              strokeLinecap: "round",
            })}
          />
          <p className="mt-3">Study Streak</p>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black z-30"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: sidebarOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 left-0 h-full w-64 bg-indigo-700 text-white z-40 flex flex-col`}
      >
        <div className="p-6 flex flex-col items-center border-b border-indigo-600">
          <img
            src={user.photo}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-white mb-3"
          />
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-indigo-300 text-sm">Study Enthusiast </p> <Link to="/profile" ><button>👁</button></Link>
        </div>
        

        <nav className="flex flex-col mt-6 gap-2 px-3">
          
          <button
            onClick={() => {
              setPage("dashboard");
              setSidebarOpen(false);
            }}
            className={`relative px-2 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "dashboard" ? "bg-indigo-600" : ""
            }`}
          >
            Home
          </button>
            <Link to="/notes"  className={`relative px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "dashboard" ? "bg-indigo-600" : ""
            }`}><button
           
          >
            Notes
          </button></Link>
          <Link to="/planning"   className={`relative px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "dashboard" ? "bg-indigo-600" : ""
            }`}> <button
            // onClick={() => {
            //   setPage("dashboard");
            //   setSidebarOpen(false);
            // }}
           
          >
            Planning
          </button></Link>
           <Link to="/progress"  className={`relative px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "dashboard" ? "bg-indigo-600" : ""
            }`}><button
           
          >
            Progress
          </button></Link> 

          <Link to="/rivision"   className={`relative px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "dashboard" ? "bg-indigo-600" : ""
            }`}>

          <button
           
          >
            Rivision
          </button></Link>
          
          <button
            onClick={() => {
              setPage("history");
              setSidebarOpen(false);
            }}
            className={`relative px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md shadow-indigo-400/50 hover:scale-105 hover:shadow-lg hover:shadow-indigo-600/70 transition transform duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 overflow-hidden ${
              page === "history" ? "bg-indigo-600" : ""
            }`}
          >
            History
          </button>
         <button
  onClick={() => {
    alert("Logging out...");
    setSidebarOpen(false);
  }}
  className="
    flex items-center gap-2 px-4 py-2 rounded-lg
    bg-gradient-to-r from-red-600 to-red-700
    text-white font-semibold shadow-lg
    hover:from-red-700 hover:to-red-800
    hover:scale-105 transition-transform duration-300
    focus:outline-none focus:ring-4 focus:ring-red-400
  "
>
  {/* <AiOutlineLogout size={20} /> */}
  Logout
</button> 
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div
        className={`min-h-screen flex flex-col ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
        } transition-colors duration-300`}
      >
        {/* Header */}
        <header className="flex justify-between items-center px-6 py-4 bg-indigo-600 shadow-lg sticky top-0 z-20">
          <button
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle sidebar"
            className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode((d) => !d)}
              aria-label="Toggle dark mode"
              className="text-white focus:outline-none focus:ring-2 focus:ring-white rounded-md"
              title="Toggle Dark Mode"
            >
              {darkMode ? (
                
               <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                 >
                <path
                 strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />


                </svg>
              ) : (
                <svg
                 xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3C7.03 3 3 7.03 3 12c0 4.97 4.03 9 9 9 4.97 0 9-4.03 9-9 0-4.97-4.03-9-9-9z"
                  />
                </svg>
              )}
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-6 max-w-7xl mx-auto">
          {page === "dashboard" && (
            <>
              {/* Welcome Section */}
              <section className="mb-8 flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <div className="flex items-center gap-4">
                  <img
                    src={user.photo}
                    alt="User Profile"
                    className="w-16 h-16 rounded-full border-2 border-indigo-600"
                  />
                  <div>
                    <h1 className="text-2xl font-bold">
                      {getGreeting()}, {user.name}!
                    </h1>
                    <p className="italic text-indigo-600 dark:text-indigo-400 mt-1">
                      {quotes[quoteIndex]}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Motivated? Let's study!")}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                >
                  Motivate Me
                </button>
              </section>

              {/* Tasks & Progress Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {/* <img
                      src="https://img.icons8.com/ios-glyphs/30/000000/todo-list.png"
                      alt="Tasks Icon"
                      className="w-6 h-6"
                    /> */}
                  🥇  Today's Tasks
                  </h2>

                  <TasksList taskList={tasks} onToggle={toggleDone} isDraggable />

                  <div className="mt-4 flex gap-2">
                    <input
                      type="text"
                      placeholder="New task"
                      value={newTaskText}
                      onChange={(e) => setNewTaskText(e.target.value)}
                      className="flex-grow px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <select
                      value={newTaskPriority}
                      onChange={(e) => setNewTaskPriority(e.target.value)}
                      className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                    <button
                      onClick={addTask}
                      className="bg-indigo-600 text-white px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                      Add
                    </button>
                  </div>
                </section>

                <ProgressSummary
                  progress={{
                    totalTasks,
                    completedTasks,
                    chaptersCompleted,
                    flashcardsMastered,
                    studyStreakDays,
                  }}
                />

                {/* Pomodoro Timer */}
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col items-center max-w-xs mx-auto">
                  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {/* <img
                      src="https://img.icons8.com/ios-filled/50/000000/timer.png"
                      alt="Timer Icon"
                      className="w-6 h-6"
                    /> */}
                   🧭 Pomodoro Timer
                  </h2>

                  <div className="text-5xl font-mono mb-4 select-none">
                    {formatTime(timeLeft)}
                  </div>

                  <div className="flex gap-4">
                    {!isRunning ? (
                     <Link to="/timer" ><button
                        onClick={() => setIsRunning(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                      >
                        Start
                      </button> </Link> 
                    ) : (
                      <button
                        onClick={() => setIsRunning(false)}
                        className="bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
                      >
                        Pause
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsRunning(false);
                        setTimeLeft(mode === "work" ? workDuration : breakDuration);
                      }}
                      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                    >
                      Reset
                    </button>
                  </div>

                  <p className="mt-3 text-sm italic">
                    Mode: {mode === "work" ? "Work" : "Break"}
                  </p>
                </section>
              </div>
            </>
          )}

          {page === "history" && (
            <>
              <section className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
                <h1 className="text-3xl font-bold mb-3">{previousDayData.date}</h1>
                <p className="italic text-indigo-600 dark:text-indigo-400 mb-6">
                  Here's a look at your previous day's study activities.
                </p>

                <h2 className="text-xl font-semibold mb-3">Tasks Completed</h2>
                <TasksList taskList={previousDayData.tasks} onToggle={() => {}} />

                <div className="mt-8">
                  <h2 className="text-xl font-semibold mb-3">Progress Summary</h2>
                  <ProgressSummary progress={previousDayData.progress} />
                </div>
              </section>
            </>
          )}
        </main>
      </div>
    </>
  );
}
