// src/components/Navbar.jsx

import {
  FaHome,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Navbar() {

  const logout = () => {
    localStorage.removeItem("user");
    window.location = "/";
  };

  return (

    <div style={styles.wrapper}>

      <div style={styles.navbar}>

        {/* LEFT */}
        <div style={styles.logoBox}>

          <div style={styles.logoCircle}>
            D
          </div>

          <div>
            <h2 style={styles.logoText}>
              DailyMajdoor
            </h2>

            <p style={styles.logoSub}>
              Worker Hiring Platform
            </p>
          </div>

        </div>

        {/* RIGHT */}
        <div style={styles.menu}>

          <button
            style={styles.homeBtn}
            onClick={() => window.location = "/"}
          >
            <FaHome />
            Home
          </button>

          <button
            style={styles.logoutBtn}
            onClick={logout}
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

const styles = {

  wrapper: {
    width: "100%",
    background: "#0f172a",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    boxShadow: "0 8px 25px rgba(0,0,0,0.25)"
  },

  navbar: {
    height: "82px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 60px",
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "14px"
  },

  logoCircle: {
    width: "46px",
    height: "46px",
    borderRadius: "14px",
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "20px",
    boxShadow: "0 8px 20px rgba(249,115,22,0.4)"
  },

  logoText: {
    margin: 0,
    color: "white",
    fontSize: "24px",
    fontWeight: "700",
    letterSpacing: "0.4px"
  },

  logoSub: {
    margin: 0,
    marginTop: "2px",
    color: "#94a3b8",
    fontSize: "12px",
    letterSpacing: "1px"
  },

  menu: {
    display: "flex",
    gap: "16px"
  },

  homeBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "white",
    padding: "12px 22px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
    backdropFilter: "blur(12px)"
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    boxShadow: "0 8px 25px rgba(249,115,22,0.35)",
    transition: "0.3s"
  }

};