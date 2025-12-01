import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import FoodPage from "./pages/FoodPage";
import WorkoutPage from "./pages/WorkoutPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      <Navbar />
      <main style={{ paddingTop: 80 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workout" element={<WorkoutPage />} />
          <Route path="/food" element={<FoodPage />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
