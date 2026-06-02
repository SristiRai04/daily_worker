// src/pages/Login.jsx

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const [emailError, setEmailError] =
    useState("");

  const [passwordError, setPasswordError] =
    useState("");

  const loginUser = async (e) => {

    e.preventDefault();

    setPasswordError("");

    if (!email.includes("@gmail.com")) {

      setEmailError(
        "Should contain @gmail.com"
      );

      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
          role
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      if (role === "customer") {

        nav("/customer-dashboard");

      } else {

        nav("/labour-dashboard");

      }

    } catch (err) {

      setPasswordError(
        "Wrong Password"
      );

    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.glow1}></div>
      <div style={styles.glow2}></div>

      <div style={styles.card}>

        <h1 style={styles.brand}>
          DailyMajdoor
        </h1>

        <h2 style={styles.title}>
          Login
        </h2>

        <p style={styles.subtitle}>
          Welcome back
        </p>

        <form onSubmit={loginUser}>

          {/* ROLE */}

          <select
            style={styles.input}
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >

            <option value="customer">
              Customer
            </option>

            <option value="labour">
              Labour
            </option>

          </select>

          {/* EMAIL */}

          <input
            type="email"
            placeholder="Email"
            style={{
              ...styles.input,
              border: emailError
                ? "1.5px solid red"
                : "1.5px solid #f97316"
            }}
            required
            value={email}
            onChange={(e) => {

              const value =
                e.target.value;

              setEmail(value);

              if (
                !value.includes(
                  "@gmail.com"
                )
              ) {

                setEmailError(
                  "Should contain @gmail.com"
                );

              } else {

                setEmailError("");

              }

            }}
          />

          {emailError && (

            <p style={styles.error}>
              {emailError}
            </p>

          )}

          {/* PASSWORD */}

          <input
            type="password"
            placeholder="Password"
            style={{
              ...styles.input,
              border: passwordError
                ? "1.5px solid red"
                : "1.5px solid #f97316"
            }}
            required
            value={password}
            onChange={(e) => {

              setPassword(
                e.target.value
              );

              setPasswordError("");

            }}
          />

          {passwordError && (

            <p style={styles.error}>
              {passwordError}
            </p>

          )}

          <button style={styles.button}>
            Login
          </button>

        </form>

        <p style={styles.bottomText}>

          No account?

          <span
            style={styles.link}
            onClick={() =>
              nav("/register")
            }
          >
            Register
          </span>

        </p>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#0f172a",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Arial",
    margin: 0
  },

  glow1: {
    position: "absolute",
    width: "280px",
    height: "280px",
    borderRadius: "50%",
    background: "#f97316",
    filter: "blur(140px)",
    top: "-80px",
    left: "-80px",
    opacity: 0.35
  },

  glow2: {
    position: "absolute",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background: "#fb923c",
    filter: "blur(120px)",
    bottom: "-80px",
    right: "-80px",
    opacity: 0.3
  },

  card: {
    width: "320px",
    background: "#111827",
    border: "2px solid #f97316",
    borderRadius: "22px",
    padding: "28px",
    boxShadow:
      "0 10px 40px rgba(0,0,0,0.45)",
    position: "relative",
    zIndex: 2
  },

  brand: {
    textAlign: "center",
    color: "#fb923c",
    margin: 0,
    marginBottom: "18px",
    fontSize: "28px",
    fontWeight: "bold"
  },

  title: {
    textAlign: "center",
    color: "white",
    margin: 0,
    fontSize: "26px"
  },

  subtitle: {
    textAlign: "center",
    color: "#9ca3af",
    marginTop: "8px",
    marginBottom: "24px",
    fontSize: "13px"
  },

  input: {
    width: "100%",
    padding: "13px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1.5px solid #f97316",
    background: "#1f2937",
    color: "white",
    boxSizing: "border-box",
    outline: "none",
    fontSize: "13px"
  },

  error: {
    color: "red",
    fontSize: "11px",
    marginTop: "-4px",
    marginBottom: "10px",
    paddingLeft: "4px",
    fontWeight: "bold"
  },

  button: {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg,#f97316,#fb923c)",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
    marginTop: "5px"
  },

  bottomText: {
    textAlign: "center",
    marginTop: "20px",
    color: "#9ca3af",
    fontSize: "13px"
  },

  link: {
    color: "#fb923c",
    marginLeft: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }

};