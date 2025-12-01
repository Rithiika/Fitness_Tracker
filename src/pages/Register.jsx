import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { username, email, password, confirmPassword } = formData;

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Save user in localStorage (for demo)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      setError("User already exists with this email.");
      return;
    }

    users.push({ username, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    navigate("/login");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #74ebd5, #acb6e5)",
    },
    card: {
      backgroundColor: "white",
      padding: "40px 30px",
      borderRadius: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      width: "350px",
      textAlign: "center",
    },
    heading: {
      marginBottom: "20px",
      color: "#007bff",
    },
    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      marginTop: "10px",
      borderRadius: "8px",
      border: "none",
      backgroundColor: "#007bff",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
    },
    footer: {
      marginTop: "15px",
      fontSize: "14px",
    },
    footerSpan: {
      color: "#007bff",
      cursor: "pointer",
    },
    errorText: {
      color: "red",
      marginBottom: "10px",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Fitness App Registration</h2>
        {error && <p style={styles.errorText}>{error}</p>}
        <input
          type="text"
          name="username"
          placeholder="Username"
          style={styles.input}
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={styles.input}
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={styles.input}
          value={formData.password}
          onChange={handleChange}
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          style={styles.input}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button style={styles.button} onClick={handleSubmit}>
          Register
        </button>
        <p style={styles.footer}>
          Already have an account?{" "}
          <span style={styles.footerSpan} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
