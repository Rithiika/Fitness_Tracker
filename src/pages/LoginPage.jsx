import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (!user) {
      setError("Invalid email or password.");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    navigate("/dashboard");
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
    buttonHover: {
      backgroundColor: "#0056b3",
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
        <h2 style={styles.heading}>Fitness App Login</h2>
        {error && <p style={styles.errorText}>{error}</p>}
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
        <button style={styles.button} onClick={handleSubmit}>
          Login
        </button>
        <p style={styles.footer}>
          Don't have an account?{" "}
          <span style={styles.footerSpan} onClick={() => navigate("/register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
