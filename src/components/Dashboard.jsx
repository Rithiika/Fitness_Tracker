import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const Dashboard = () => {
  const [summary, setSummary] = useState([]);
  const [weekly, setWeekly] = useState([]);
  const [monthly, setMonthly] = useState([]);
  const [stats, setStats] = useState({
    totalDuration: 0,
    totalCalories: 0,
    avgDuration: 0,
    goalProgress: 0,
    activeDays: 0,
    mostFrequent: "",
  });

  const [tab, setTab] = useState("weekly");
  const GOAL = 600; // 10 min weekly goal

  const processData = (log) => {
    const totals = {};
    const weekData = Array(7).fill(0);
    const monthData = Array(31).fill(0);
    const today = new Date();

    log.forEach((entry) => {
      if (!entry) return;
      totals[entry.activity] = (totals[entry.activity] || 0) + entry.duration;

      const d = new Date(entry.timeStamp);
      const dayOfWeek = d.getDay(); // 0=Sun, 1=Mon...
      const dayOfMonth = d.getDate() - 1;

      // Weekly data (Monday to Sunday)
      const mondayDiff = (today.getDay() + 6) % 7; // days since Monday
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - mondayDiff);

      if (d >= weekStart) weekData[dayOfWeek] += entry.duration;

      // Monthly data (first to last day)
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      if (d >= monthStart) monthData[dayOfMonth] += entry.duration;
    });

    const totalDuration = log.reduce((a, b) => a + (b.duration || 0), 0);
    const totalCalories = log.reduce((a, b) => a + (parseFloat(b.calories) || 0), 0);
    const avgDuration = log.length ? (totalDuration / log.length).toFixed(1) : 0;
    const activeDays = weekData.filter((v) => v > 0).length;
    const goalProgress = Math.min((totalDuration / GOAL) * 100, 100).toFixed(1);
    const mostFrequent = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

    setStats({ totalDuration, totalCalories, avgDuration, goalProgress, activeDays, mostFrequent });

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    setWeekly(days.map((day, i) => ({ day, total: weekData[i] })));

    const monthLabels = Array.from({ length: 31 }, (_, i) => `Day ${i + 1}`);
    setMonthly(monthLabels.map((day, i) => ({ day, total: monthData[i] })));

    setSummary(Object.entries(totals).map(([a, d]) => ({ activity: a, duration: d })));
  };

  const updateDashboard = () => {
    const log = JSON.parse(localStorage.getItem("workoutLog")) || [];
    processData(log);
  };

  // Update whenever a workout is added
  useEffect(() => {
    updateDashboard();
    window.addEventListener("workoutUpdated", updateDashboard);
    return () => window.removeEventListener("workoutUpdated", updateDashboard);
  }, []);

  // Inactivity reminder
  useEffect(() => {
    const lastActive = localStorage.getItem("lastActiveDate");
    if (lastActive) {
      const diff = (new Date() - new Date(lastActive)) / (1000 * 60 * 60 * 24);
      if (diff > 2) alert("You’ve been inactive for 2+ days! Time to move 💪");
    }
  }, []);

  const chartData = tab === "weekly" ? weekly : monthly;

  return (
    <div className="container mt-5 text-center dashboard">
      <h2 className="text-warning mb-4 glow-text">📊 Smart Fitness Dashboard</h2>

      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="summary-card bg-dark p-3 rounded-3 shadow-glow">
            <h5>🔥 Total Duration</h5>
            <h4>{stats.totalDuration}s</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="summary-card bg-dark p-3 rounded-3 shadow-glow">
            <h5>⚡ Calories Burned</h5>
            <h4>{stats.totalCalories.toFixed(1)} kcal</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="summary-card bg-dark p-3 rounded-3 shadow-glow">
            <h5>📅 Active Days</h5>
            <h4>{stats.activeDays} days</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="summary-card bg-dark p-3 rounded-3 shadow-glow">
            <h5>🏆 Most Frequent</h5>
            <h4>{stats.mostFrequent}</h4>
          </div>
        </div>
      </div>

      {/* Goal Progress */}
      <div className="progress mt-4 mb-5 gradient-progress" style={{ height: "30px" }}>
        <div
          className="progress-bar progress-bar-striped"
          role="progressbar"
          style={{ width: `${stats.goalProgress}%` }}
        >
          🎯 {stats.goalProgress}% of Weekly Goal
        </div>
      </div>

      {/* Chart Tabs */}
      <div className="mb-3">
        <button className={`btn me-2 ${tab==="weekly"?"btn-info":"btn-secondary"}`} onClick={()=>setTab("weekly")}>Weekly</button>
        <button className={`btn ${tab==="monthly"?"btn-info":"btn-secondary"}`} onClick={()=>setTab("monthly")}>Monthly</button>
      </div>

      {/* Activity Chart */}
      <div className="chart-card mb-5">
        <h4 className="text-info mb-3">{tab === "weekly" ? "Weekly Activity" : "Monthly Activity"}</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip />
            <Bar dataKey="total" fill="url(#gradient)" />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#00ffcc" />
                <stop offset="100%" stopColor="#ffcc00" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity Duration Chart */}
      <div className="chart-card mb-5">
        <h4 className="text-primary mb-3">Activity Duration</h4>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={summary}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="activity" stroke="#fff" />
            <YAxis stroke="#fff" />
            <Tooltip formatter={(value) => `${value}s`} />
            <Bar dataKey="duration" fill="url(#grad2)" />
            <defs>
              <linearGradient id="grad2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ff00cc" />
                <stop offset="100%" stopColor="#ffcc00" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recommendation */}
      <div className="recommend-card bg-dark p-4 rounded-4 shadow-glow">
        <h4 className="text-success">💡 Recommendation</h4>
        {stats.activeDays >= 5 ? (
          <p className="text-light mt-2">Excellent! You’ve been very consistent this week 🌟</p>
        ) : stats.activeDays >= 3 ? (
          <p className="text-light mt-2">Good job! Try to stay active a few more days 💪</p>
        ) : (
          <p className="text-light mt-2">Let’s move more this week! Start small and stay consistent 🚶‍♀️</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
