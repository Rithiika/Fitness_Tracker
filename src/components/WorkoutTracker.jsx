import React, { useState, useEffect } from "react";

const WorkoutTracker = () => {
  const [activity, setActivity] = useState("");
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(false);
  const [goal, setGoal] = useState(300); // default goal: 300 seconds/day
  const [streak, setStreak] = useState(() => Number(localStorage.getItem("streak") || 0));
  const [log, setLog] = useState(() => {
    try {
      const saved = localStorage.getItem("workoutLog");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    let interval;
    if (active) {
      interval = setInterval(() => setCount((p) => p + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    try {
      localStorage.setItem("workoutLog", JSON.stringify(log));
    } catch {}
  }, [log]);

  const calcCalories = (activity, seconds) => {
    const caloriesPerMin = {
      Running: 10,
      Walking: 4,
      Cycling: 8,
      "Gym Workout": 12,
      Yoga: 5,
      Swimming: 9,
    };
    return ((caloriesPerMin[activity] || 6) * seconds) / 60;
  };

  const handleStart = () => {
    if (!activity) {
      alert("Please select an activity before starting!");
      return;
    }
    setCount(0);
    setActive(true);
  };

  const handleStop = () => {
    setActive(false);
    if (activity && count > 0) {
      const calories = calcCalories(activity, count);
      const now = new Date();
      const dateTime = now.toLocaleString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const newEntry = {
        activity,
        duration: count,
        calories: Number(calories.toFixed(1)),
        time: dateTime,
        timeStamp: now.getTime(),
      };

      const updated = [...log, newEntry];
      setLog(updated);
      localStorage.setItem("workoutLog", JSON.stringify(updated));
      window.dispatchEvent(new Event("workoutUpdated"));
      updateStreak();
    }
    setCount(0);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const lastActive = localStorage.getItem("lastActiveDate");

    if (lastActive !== today) {
      const newStreak = lastActive ? streak + 1 : 1;
      setStreak(newStreak);
      localStorage.setItem("streak", newStreak);
      localStorage.setItem("lastActiveDate", today);
    }
  };

  const handleReset = () => {
    setActive(false);
    setCount(0);
  };

  const progress = Math.min((count / goal) * 100, 100);
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - count / goal);

  return (
    <div className="container text-center mt-5">
      <h2 className="text-info mb-3">Smart Workout Tracker</h2>

      {/* Activity Selector */}
      <div className="mb-4">
        <select
          className="form-select w-50 mx-auto"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        >
          <option value="">-- Select Activity --</option>
          <option value="Running">Running</option>
          <option value="Walking">Walking</option>
          <option value="Cycling">Cycling</option>
          <option value="Yoga">Yoga</option>
          <option value="Gym Workout">Gym Workout</option>
          <option value="Swimming">Swimming</option>
        </select>
      </div>

      {/* Circular Timer */}
      <div className="circle-wrapper mx-auto my-4" style={{ width: "160px", height: "160px" }}>
        <svg width="160" height="160" className="circle-svg">
          <circle
            className="circle-bg"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="10"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
          />
          <circle
            className="circle-progress"
            cx="80"
            cy="80"
            r={radius}
            strokeWidth="10"
            fill="none"
            stroke="#00ffcc"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.5s linear" }}
          />
        </svg>
        <div
          className="circle-text position-absolute top-50 start-50 translate-middle"
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#00ffcc" }}
        >
          {count}s
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={handleStart}>
          Start
        </button>
        <button className="btn btn-danger me-2" onClick={handleStop}>
          Stop
        </button>
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset
        </button>
      </div>

      {/* Goal Progress */}
      <div className="progress mt-4 w-75 mx-auto" style={{ height: "20px" }}>
        <div
          className="progress-bar bg-info"
          style={{ width: `${progress}%` }}
          role="progressbar"
        >
          {Math.floor(progress)}%
        </div>
      </div>

      <p className="text-light mt-2">
        Daily Goal: {goal}s | Streak: {streak} days
      </p>

      {/* Summary */}
      {log.length > 0 && (
        <div className="mt-5 text-start w-75 mx-auto">
          <h4 className="text-warning">Workout Summary</h4>
          <ul className="list-group mt-3">
            {log.slice(-10).reverse().map((item, i) => (
              <li
                key={i}
                className="list-group-item bg-dark text-light d-flex justify-content-between"
              >
                <span>
                  {item.activity} — {item.duration}s ({item.calories} kcal)
                </span>
                <span>{item.time}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
