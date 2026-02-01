import React, { useState, useEffect } from "react";

const launchDate = new Date("2026-03-01T00:00:00");

function getTimeLeft() {
  const now = new Date();
  const diff = launchDate - now;

  return {
    days: Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0),
    hours: Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0),
    minutes: Math.max(Math.floor((diff / 1000 / 60) % 60), 0),
    seconds: Math.max(Math.floor((diff / 1000) % 60), 0),
  };
}

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Coming Soon</h1>
        <p style={styles.subtitle}>We are launching something awesome!</p>

        <div style={styles.timer}>
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} style={styles.box}>
              <span style={styles.value}>{value}</span>
              <span style={styles.unit}>{unit}</span>
            </div>
          ))}
        </div>

        <p style={styles.note}>Stay tuned for updates</p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#2d2d34",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    padding: "40px 30px",
    borderRadius: "20px",
    background: "rgba(123,31,162,0.08)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    textAlign: "center",
    color: "#e1bee7",
  },
  title: {
    fontSize: "clamp(2.2rem, 6vw, 4rem)",
    color: "#bb86fc",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "clamp(1rem, 3vw, 1.5rem)",
    marginBottom: "40px",
    opacity: 0.9,
  },
  timer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  box: {
    padding: "18px 10px",
    borderRadius: "12px",
    background: "#7b1fa2",
    color: "white",
    boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
  },
  value: {
    display: "block",
    fontSize: "clamp(1.8rem, 5vw, 2.5rem)",
    fontWeight: "bold",
  },
  unit: {
    fontSize: "0.8rem",
    textTransform: "uppercase",
    opacity: 0.9,
    letterSpacing: "1px",
  },
  note: {
    fontSize: "0.9rem",
    opacity: 0.7,
  },
};
