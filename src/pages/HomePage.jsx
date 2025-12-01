import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/image-117.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Overlay */}
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.6)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        {/* Title and Subtitle */}
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            color: "#e6dedeff",
            textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
            marginBottom: "20px",
          }}
        >
          Elevate Your Fitness
        </h1>
        <p
          style={{
            fontSize: "1.5rem",
            color: "white",
            marginBottom: "40px",
            maxWidth: "700px",
            textShadow: "1px 1px 5px rgba(0,0,0,0.7)",
          }}
        >
          Achieve your health goals effortlessly. Track workouts, scan meals instantly for calories, protein, and fat, and see your progress in a personalized dashboard.
        </p>

        {/* Buttons with Images */}
        <div
          style={{
            display: "flex",
            gap: "25px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* Workout Button */}
          <Link
            to="/workout"
            style={{
              backgroundColor: "transparent",
              border: "2px solid #aa9090ff",
              borderRadius: "15px",
              overflow: "hidden",
              textDecoration: "none",
              width: "200px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/break-workout_602724.jpg"
              alt="Workout"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              style={{
                display: "block",
                padding: "10px",
                color: "#d5b8b8ff",
                fontWeight: "600",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              Start Workout
            </span>
          </Link>

          {/* Food Scan Button */}
          <Link
            to="/food"
            style={{
              backgroundColor: "transparent",
              border: "2px solid white",
              borderRadius: "15px",
              overflow: "hidden",
              textDecoration: "none",
              width: "200px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/48069B7F00000578-0-image-a-14_1515705381567.jpg"
              alt="Scan Food"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              style={{
                display: "block",
                padding: "10px",
                color: "white",
                fontWeight: "600",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              Scan Food
            </span>
          </Link>

          {/* Dashboard Button */}
          <Link
            to="/dashboard"
            style={{
              backgroundColor: "#deaaaaff",
              borderRadius: "15px",
              overflow: "hidden",
              textDecoration: "none",
              width: "200px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={e => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src="/infographic-dashboard-charts-bars-and-diagrams-mockup-700-347601877.jpg"
              alt="Dashboard"
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                display: "block",
              }}
            />
            <span
              style={{
                display: "block",
                padding: "10px",
                color: "white",
                fontWeight: "600",
                textAlign: "center",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              View Dashboard
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
