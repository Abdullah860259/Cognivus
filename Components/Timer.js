import { useState, useEffect } from "react";
import { Pause, Play } from "lucide-react";

export default function Timer({ seconds, setSeconds, timerStop, setTimerStop, resetTimer, setResetTimer }) {
  // const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (timerStop) return;

    if (resetTimer) {
      setSeconds(0);
      setResetTimer(false);
    }

    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [timerStop, resetTimer, setResetTimer]);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        style={{
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          fontFamily: "monospace",
          color: "black",
        }}
      >
        {hrs}:{mins}:{secs}
      </div>

      {/* Toggle Control */}
      <button
        onClick={() => setTimerStop(!timerStop)}
        className={`p-2 rounded-full cursor-pointer ${timerStop
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-200 hover:bg-gray-300"
          }`}
      >
        {timerStop ? (
          <Play className="w-6 h-6 text-white" />
        ) : (
          <Pause className="w-6 h-6 text-gray-700" />
        )}
      </button>
    </div>

  );
}
