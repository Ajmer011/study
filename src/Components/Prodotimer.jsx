// App.jsx
import React, { useState, useEffect } from "react";

const formatTime = (seconds) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, "0");
  const s = String(seconds % 60).padStart(2, "0");
  return `${m}:${s}`;
};

const App = () => {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("pomodoroHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    setSecondsLeft(workMinutes * 60);
  }, [workMinutes]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isRunning && secondsLeft > 0) {
        setSecondsLeft((prev) => prev - 1);
      } else if (isRunning && secondsLeft === 0) {
        const today = new Date().toISOString().slice(0, 10);
        setHistory((prev) => {
          const updated = {
            ...prev,
            [today]: (prev[today] || 0) + workMinutes,
          };
          localStorage.setItem("pomodoroHistory", JSON.stringify(updated));
          return updated;
        });
        setIsRunning(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, workMinutes]);

  const handleStartPause = () => setIsRunning((prev) => !prev);
  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(workMinutes * 60);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl text-center space-y-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Pomodoro Timer</h1>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div>
            <label className="block text-gray-400 mb-1">
              Work Duration (minutes)
            </label>
            <input
              type="number"
              min="1"
              value={workMinutes}
              onChange={(e) => setWorkMinutes(+e.target.value)}
              className="w-32 text-center text-white font-bold p-2 rounded-lg"
            />
          </div>
        </div>

        <div className="text-8xl font-mono tracking-widest">
          {formatTime(secondsLeft)}
        </div>

        <div className="space-x-4 mt-6">
          <button
            onClick={handleStartPause}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl text-lg"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
          <button
            onClick={handleReset}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="mt-12 w-full max-w-xl">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2">
          Work History (per day)
        </h2>
        <ul className="space-y-2">
          {Object.entries(history)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, minutes]) => (
              <li
                key={date}
                className="flex justify-between px-4 py-2 bg-gray-800 rounded-lg"
              >
                <span>{date}</span>
                <span>{(minutes / 60).toFixed(2)} hrs</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
