// src/pages/Hero.jsx

import {
  FaHammer,
  FaBolt,
  FaPaintRoller,
  FaTruck,
  FaBroom,
  FaTools,
} from "react-icons/fa";

export default function Hero() {
  return (
    <div style={styles.page}>
      
      {/* BACKGROUND */}
      <div style={styles.blur1}></div>
      <div style={styles.blur2}></div>

      {/* NAVBAR */}
      <div style={styles.navbar}>
        
        <div style={styles.logoBox}>
          <div style={styles.logoCircle}>D</div>
          <h2 style={styles.logo}>DailyMajdoor</h2>
        </div>

        <div style={styles.navButtons}>
          <button
            style={styles.loginBtn}
            onClick={() => (window.location = "/login")}
          >
            Login
          </button>

          <button
            style={styles.registerBtn}
            onClick={() => (window.location = "/register")}
          >
            Register
          </button>
        </div>
      </div>

      {/* HERO */}
      <div style={styles.heroContainer}>

        {/* LEFT SIDE */}
        <div style={styles.leftSection}>

          <div style={styles.badge}>
            Trusted Daily Worker Hiring Platform
          </div>

          <h1 style={styles.title}>
            Hire Skilled <br />
            <span style={styles.orange}>Workers</span> Instantly
          </h1>

          <p style={styles.subtitle}>
            Find trusted electricians, plumbers,
            painters, cleaners, drivers and skilled
            workers near your location with secure
            and modern hiring.
          </p>

          <div style={styles.buttonRow}>
            <button
              style={styles.startBtn}
              onClick={() => (window.location = "/register")}
            >
              Get Started
            </button>

            <button
              style={styles.exploreBtn}
              onClick={() => (window.location = "/login")}
            >
              Explore
            </button>
          </div>

          {/* STATS */}
          <div style={styles.statsRow}>

            <div style={styles.statCard}>
              <h2 style={styles.statNumber}>10K+</h2>
              <p style={styles.statText}>Workers</p>
            </div>

            <div style={styles.statCard}>
              <h2 style={styles.statNumber}>5K+</h2>
              <p style={styles.statText}>Customers</p>
            </div>

            <div style={styles.statCard}>
              <h2 style={styles.statNumber}>24/7</h2>
              <p style={styles.statText}>Support</p>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightSection}>

          <div style={styles.serviceBox}>

            <div style={styles.serviceHeader}>
              <h3 style={styles.serviceTitle}>
                Popular Services
              </h3>

              <div style={styles.liveBadge}>
                ● LIVE
              </div>
            </div>

            <div style={styles.grid}>

              <div style={styles.card}>
                <FaBolt size={24} />
                <p>Electrician</p>
              </div>

              <div style={styles.card}>
                <FaTools size={24} />
                <p>Plumber</p>
              </div>

              <div style={styles.card}>
                <FaPaintRoller size={24} />
                <p>Painter</p>
              </div>

              <div style={styles.card}>
                <FaHammer size={24} />
                <p>Carpenter</p>
              </div>

              <div style={styles.card}>
                <FaBroom size={24} />
                <p>Cleaner</p>
              </div>

              <div style={styles.card}>
                <FaTruck size={24} />
                <p>Driver</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background: "#0f172a",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Arial",
    color: "white",
  },

  blur1: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "#f97316",
    filter: "blur(140px)",
    top: "-120px",
    left: "-120px",
    opacity: 0.4,
  },

  blur2: {
    position: "absolute",
    width: "300px",
    height: "300px",
    borderRadius: "50%",
    background: "#2563eb",
    filter: "blur(130px)",
    bottom: "-100px",
    right: "-100px",
    opacity: 0.4,
  },

  navbar: {
    height: "85px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 70px",
    position: "relative",
    zIndex: 10,
  },

  logoBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoCircle: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
  },

  logo: {
    margin: 0,
    fontSize: "22px",
  },

  navButtons: {
    display: "flex",
    gap: "14px",
  },

  loginBtn: {
    padding: "11px 22px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  registerBtn: {
    padding: "11px 22px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  heroContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "40px 70px 70px",
    gap: "40px",
    position: "relative",
    zIndex: 2,
  },

  leftSection: {
    width: "52%",
  },

  badge: {
    display: "inline-block",
    padding: "10px 18px",
    borderRadius: "40px",
    background: "rgba(255,255,255,0.08)",
    color: "#f97316",
    fontWeight: "bold",
    fontSize: "13px",
    marginBottom: "24px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  title: {
    fontSize: "54px",
    lineHeight: "68px",
    marginBottom: "20px",
    fontWeight: "800",
  },

  orange: {
    color: "#f97316",
  },

  subtitle: {
    fontSize: "17px",
    color: "#cbd5e1",
    lineHeight: "30px",
    width: "85%",
    marginBottom: "35px",
  },

  buttonRow: {
    display: "flex",
    gap: "18px",
    marginBottom: "45px",
  },

  startBtn: {
    background: "linear-gradient(135deg,#f97316,#fb923c)",
    border: "none",
    padding: "15px 32px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  exploreBtn: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    padding: "15px 32px",
    borderRadius: "14px",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  statsRow: {
    display: "flex",
    gap: "18px",
  },

  statCard: {
    width: "130px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.08)",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  statNumber: {
    margin: 0,
    fontSize: "24px",
    color: "#f97316",
  },

  statText: {
    marginTop: "8px",
    color: "#cbd5e1",
    fontSize: "14px",
  },

  rightSection: {
    width: "40%",
    display: "flex",
    justifyContent: "center",
  },

  serviceBox: {
    width: "100%",
    padding: "28px",
    borderRadius: "28px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(18px)",
  },

  serviceHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },

  serviceTitle: {
    margin: 0,
    fontSize: "20px",
  },

  liveBadge: {
    background: "#22c55e",
    padding: "7px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "16px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "24px 18px",
    borderRadius: "18px",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,0.08)",
    fontWeight: "bold",
    fontSize: "14px",
    cursor: "pointer",
  },
};