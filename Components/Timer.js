import { useState, useEffect } from "react";

export default function Timer() {
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hrs = String(Math.floor(secondsElapsed / 3600)).padStart(2, "0");
  const mins = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, "0");
  const secs = String(secondsElapsed % 60).padStart(2, "0");

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "1em",
      width: "90%",
      maxWidth: "400px",
      margin: "auto",
      fontFamily: "'Orbitron', sans-serif",
      fontSize: "clamp(1.5rem, 6vw, 2.5rem)",
      color: "#00FFF7",
      background: "linear-gradient(135deg, #1D1F3B, #4A90E2)",
      borderRadius: "20px",
      boxShadow: "0 0 20px #00FFF7, 0 0 40px #4A90E2, 0 0 60px #00FFF7",
      letterSpacing: "0.15em",
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
    }}>
      ⏱ {`${hrs}:${mins}:${secs}`}
    </div>
  );
}
