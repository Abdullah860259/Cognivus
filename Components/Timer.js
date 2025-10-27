"use client"
import { useEffect } from "react"
import { Pause, Play } from "lucide-react"
import { EyeOff, EyeClosed } from "lucide-react";

export default function Timer({
  seconds,
  setSeconds,
  timerStop,
  setTimerStop,
  resetTimer,
  setResetTimer,
  startTime = 0,   // if reverse, this is hours in seconds
  reverse = false,
  settimerHide,
  timerHide,
}) {
  useEffect(() => {
    if (timerStop) return;

    if (resetTimer) {
      setSeconds(reverse ? startTime : 0);
      setResetTimer(false);
    }

    if (reverse && seconds <= 0) {
      setTimerStop(true);
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) =>
        reverse ? (s > 0 ? s - 1 : 0) : s + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStop, resetTimer, reverse, seconds, startTime, setResetTimer, setSeconds, setTimerStop]);

  const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      {!timerHide && (<div
        style={{
          textAlign: "center",
          fontSize: "1.5rem",
          fontWeight: "bold",
          fontFamily: "monospace",
          color: reverse && seconds <= 10 ? "red" : "black",
        }}
      >
        {hrs}:{mins}:{secs}
      </div>)}

      <button
        onClick={() => setTimerStop(!timerStop)}
        className={`p-2 rounded-full cursor-pointer ${timerStop
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-200 hover:bg-gray-300"
          }`}
      >
        {timerStop ? (
          <Play className="w-4 h-4 text-white" />
        ) : (
          <Pause className="w-4 h-4 text-gray-700" />
        )}
      </button>

      {timerHide ? (
        <EyeClosed className="w-4 h-4  text-gray-700 cursor-pointer " onClick={() => settimerHide(false)} />
      ) : (
        <EyeOff className="w-4 h-4 text-gray-700 cursor-pointer " onClick={() => settimerHide(true)} />
      )}
    </div>
  )
}
