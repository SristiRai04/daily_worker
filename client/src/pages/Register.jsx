// src/pages/Register.jsx

import { useState } from "react";
import axios from "axios";

export default function Register() {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [form, setForm] = useState({
    role: "customer",
    skills: []
  });

  const jobs = [
    "Electrician",
    "Plumber",
    "Painter",
    "Carpenter",
    "Cleaner",
    "Technician",
    "Welder",
    "Driver"
  ];

  const handleSkills = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      option => option.value
    );

    setForm({
      ...form,
      skills: values
    });
  };

  const register = async () => {

    setEmailError("");
    setPasswordError("");

    // EMAIL VALIDATION
    if (!form.email?.includes("@gmail.com")) {
      setEmailError("Should contain @gmail.com");
      return;
    }

    // PASSWORD VALIDATION (FIXED)
    if (!form.password || form.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    // PHONE VALIDATION
    if (!form.phone || form.phone.length !== 10) {
      alert("Phone number must be 10 digits");
      return;
    }

    try {

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        form
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.location =
        form.role === "customer"
          ? "/customer-dashboard"
          : "/labour-dashboard";

    } catch (err) {
      alert("Registration Failed");
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.brand}>DailyMajdoor</h1>
        <h2 style={styles.title}>Register</h2>

        {/* ROLE */}
        <div style={styles.field}>
          <select
            style={styles.input}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="customer">Customer</option>
            <option value="labour">Labour</option>
          </select>
        </div>

        {/* NAME */}
        <div style={styles.field}>
          <input
            style={styles.input}
            placeholder="Full Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* EMAIL */}
        <div style={styles.field}>
          <input
            style={styles.input}
            placeholder="Email"
            value={form.email || ""}
            onChange={(e) => {

              const value = e.target.value;
              setForm({ ...form, email: value });

              if (!value.includes("@gmail.com")) {
                setEmailError("Should contain @gmail.com");
              } else {
                setEmailError("");
              }
            }}
          />

          {emailError && (
            <p style={styles.error}>{emailError}</p>
          )}
        </div>

        {/* PASSWORD (FIXED + CLEAN) */}
        <div style={styles.field}>
          <input
            type="password"
            style={styles.input}
            placeholder="Password"
            value={form.password || ""}
            onChange={(e) => {

              const value = e.target.value;
              setForm({ ...form, password: value });

              if (value.length < 6) {
                setPasswordError("Password must be at least 6 characters");
              } else {
                setPasswordError("");
              }
            }}
          />

          {passwordError && (
            <p style={styles.error}>{passwordError}</p>
          )}
        </div>

        {/* PHONE */}
        <div style={styles.field}>
          <input
            type="tel"
            style={styles.input}
            placeholder="Phone Number"
            maxLength={10}
            value={form.phone || ""}
            onChange={(e) => {

              const value =
                e.target.value.replace(/\D/g, "");

              setForm({ ...form, phone: value });
            }}
          />
        </div>

        {/* CITY + AREA */}
        <div style={styles.fieldRow}>
          <input
            style={styles.smallInput}
            placeholder="City"
            onChange={(e) =>
              setForm({ ...form, city: e.target.value })
            }
          />

          <input
            style={styles.smallInput}
            placeholder="Area"
            onChange={(e) =>
              setForm({ ...form, area: e.target.value })
            }
          />
        </div>

        {/* SKILLS */}
        {form.role === "labour" && (
          <div style={styles.field}>
            <select
              multiple
              style={styles.multi}
              onChange={handleSkills}
            >
              {jobs.map((job, i) => (
                <option key={i} value={job}>
                  {job}
                </option>
              ))}
            </select>
          </div>
        )}

        <button style={styles.button} onClick={register}>
          Create Account
        </button>

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
    fontFamily: "Arial",
    margin: 0
  },

  card: {
    width: "360px",
    background: "#111827",
    border: "2px solid #f97316",
    borderRadius: "18px",
    padding: "24px"
  },

  brand: {
    textAlign: "center",
    color: "#fb923c",
    marginBottom: "8px"
  },

  title: {
    textAlign: "center",
    color: "white",
    marginBottom: "18px"
  },

  field: {
    marginBottom: "12px"
  },

  fieldRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "12px"
  },

  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #f97316",
    background: "#1f2937",
    color: "white",
    outline: "none",
    boxSizing: "border-box"
  },

  smallInput: {
    width: "50%",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #f97316",
    background: "#1f2937",
    color: "white",
    outline: "none"
  },

  multi: {
    width: "100%",
    height: "85px",
    borderRadius: "10px",
    border: "1px solid #f97316",
    background: "#1f2937",
    color: "white",
    padding: "10px"
  },

  error: {
    color: "red",
    fontSize: "11px",
    marginTop: "4px"
  },

  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background: "#f97316",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "6px"
  }
};