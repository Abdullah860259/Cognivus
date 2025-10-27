import { useEffect } from "react";
import { Pause, Play } from "lucide-react";

export default function ReverseTimer({
    seconds,
    setSeconds,
    timerStop,
    setTimerStop,
    resetTimer,
    setResetTimer,
    startHours, // countdown start (hours)
}) {
    const startTime = startHours * 3600; // convert to seconds

    // Initialize on mount
    useEffect(() => {
        if (seconds === 0) {
            setSeconds(startTime);
        }
    }, [startTime, seconds, setSeconds]);

    useEffect(() => {
        if (timerStop) return;

        if (resetTimer) {
            setSeconds(startTime);
            setResetTimer(false);
        }

        if (seconds <= 0) {
            setTimerStop(true);
            return;
        }

        const interval = setInterval(() => {
            setSeconds((s) => (s > 0 ? s - 1 : 0));
        }, 1000);

        return () => clearInterval(interval);
    }, [timerStop, resetTimer, setResetTimer, seconds, startTime, setTimerStop, setSeconds]);

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
                    color: seconds <= 10 ? "red" : "black",
                }}
            >
                {hrs}:{mins}:{secs}
            </div>

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
