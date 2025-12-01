import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const loc = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm fixed-top">
      <div className="container">
        {/* Bigger site name */}
        <Link
          className="navbar-brand fw-bold text-info"
          to="/home"
          style={{ fontSize: "1.8rem" }}
        >
          Fitness Tracker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navMenu"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/home" ? "active" : ""}`}
                to="/home"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/workout" ? "active" : ""}`}
                to="/workout"
              >
                Workout
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${loc.pathname === "/food" ? "active" : ""}`}
                to="/food"
              >
                Food
              </Link>
            </li>

            {currentUser ? (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${loc.pathname === "/dashboard" ? "active" : ""}`}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <span
                    className="nav-link text-warning"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      localStorage.removeItem("currentUser");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${loc.pathname === "/login" ? "active" : ""}`}
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${loc.pathname === "/register" ? "active" : ""}`}
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
