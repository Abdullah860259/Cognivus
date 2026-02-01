import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const launchDate = new Date("2026-03-01T00:00:00"); // Set your launch date
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = new Date();
    const difference = launchDate - now;
    return {
      days: Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0),
      hours: Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0),
      minutes: Math.max(Math.floor((difference / 1000 / 60) % 60), 0),
      seconds: Math.max(Math.floor((difference / 1000) % 60), 0),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Coming Soon</h1>
      <p style={styles.subtitle}>We are launching something awesome!</p>
      <div style={styles.timer}>
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} style={styles.timeBox}>
            <span style={styles.timeValue}>{value}</span>
            <span style={styles.timeUnit}>{unit.toUpperCase()}</span>
          </div>
        ))}
      </div>
      <p style={styles.note}>Stay tuned for updates!</p>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2d2d34", // gray background
    color: "#d1c4e9", // soft purple text
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "4rem",
    margin: "0",
    fontWeight: "bold",
    color: "#7b1fa2", // bold purple
  },
  subtitle: {
    fontSize: "1.5rem",
    margin: "10px 0 30px 0",
    color: "#b39ddb",
  },
  timer: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
  },
  timeBox: {
    backgroundColor: "#7b1fa2",
    color: "#fff",
    padding: "15px 20px",
    borderRadius: "10px",
    minWidth: "80px",
  },
  timeValue: {
    display: "block",
    fontSize: "2rem",
    fontWeight: "bold",
  },
  timeUnit: {
    fontSize: "0.8rem",
    marginTop: "5px",
  },
  note: {
    fontSize: "1rem",
    opacity: 0.8,
  },
};

export default ComingSoon;
