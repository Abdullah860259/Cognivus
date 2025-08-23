"use client"
import { useEffect, useState } from "react"
import Timer from "@/Components/Timer"
import { toast } from "sonner"
import { getSession } from "next-auth/react"

export default function McqPage() {
    const questions = [
        {
            id: 1,
            question: "What is the capital of Pakistan?",
            options: ["Karachi", "Lahore", "Islamabad", "Quetta"],
            answer: "Islamabad",
        },
        {
            id: 2,
            question: "2 + 2 = ?",
            options: ["3", "4", "5", "6"],
            answer: "4",
        },
    ]

    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [timerStop, setTimerStop] = useState(finished);
    const [seconds, setseconds] = useState(0);
    const [timeSpans, settimeSpans] = useState([0])
    useEffect(() => {
        const handleUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }

        window.addEventListener("beforeunload", handleUnload)
        return () => { window.removeEventListener("beforeunload", handleUnload) };
    }, [])


    const handleReattempt = () => {
        setResetTimer(true)
        setSelected(null)
        setCurrent(0)
        setScore(0)
        setFinished(false)
        setTimerStop(false);
        settimeSpans([0])
    }

    const handleOptionClick = (option) => {
        if (timerStop) {
            toast.error("First Continue The Timer")
            return
        }
        setSelected(option)
    }

    const handleNext = () => {
        settimeSpans([...timeSpans, seconds - timeSpans[timeSpans.length - 1]]);
        if (selected === null) {
            toast.error("Select an option please")
            return
        }
        if (selected === questions[current].answer) {
            setScore(score + 1)
        }
        if (current + 1 < questions.length) {
            setCurrent(current + 1)
            setSelected(null)
        } else {
            setFinished(true)
            setTimerStop(true)
        }
    }

    return (
        <div className=" text-black flex flex-col gap-8 justify-center items-center min-h-screen  bg-gray-100 p-4">
            {!finished && (<Timer seconds={seconds} setSeconds={setseconds} timerStop={timerStop} setTimerStop={setTimerStop} resetTimer={resetTimer} setResetTimer={setResetTimer} />)}
            <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-2xl">
                {!finished ? (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Q{current + 1}. {questions[current].question}
                        </h2>
                        <div className="grid gap-3">
                            {questions[current].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className={` cursor-pointer w-full px-4 py-2 rounded-lg border font-medium transition-colors duration-200 text-left 
                    ${selected === option ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-100 border-gray-400'}`}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                        <div className="flex justify-between mt-6">
                            <div className="flex items-center px-3 rounded-2xl bg-[#5754e8] justify-center gap-2 text-lg font-semibold text-gray-700">
                                <span className=" text-white rounded-full shadow">{current + 1}</span>
                                <span className="text-white">/ {questions.length}</span>
                            </div>

                            <button
                                onClick={handleNext}
                                className={`px-4 py-2 ${selected === null ? "opacity-50" : ""} rounded-lg bg-green-600 text-white font-medium cursor-pointer hover:bg-green-700 disabled:bg-green-300`}
                            >
                                {current + 1 === questions.length ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center select-none bg-white  rounded-2xl p-6 max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-[#5754e8] mb-4">
                            Result
                        </h2>

                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Your Score:</span> {score} / {questions.length}
                        </p>

                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Time Taken:</span> {seconds} sec
                        </p>

                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Wrong Attempt:</span> {questions.length - score}
                        </p>

                        <p className="text-lg text-gray-700 mb-4 text-left">
                            <span className="font-semibold">Average Time:</span>{" "}
                            {(seconds / questions.length).toFixed(2)} sec/question
                        </p>

                        <div className="flex my-3 gap-3 justify-center">
                            <button
                                onClick={handleReattempt}
                                className="px-4 py-2 rounded-xl border border-[#5754e8] text-[#5754e8] font-semibold hover:bg-[#5754e8] cursor-pointer hover:text-white transition"
                            >
                                Reattempt
                            </button>
                            <button className="px-4 py-2 cursor-pointer rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">
                                Go to Home
                            </button>
                        </div>
                        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto mt-6">
                            <h2 className="text-xl font-bold text-center text-[#5754e8] mb-6">
                                Time Taken
                            </h2>

                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                                    >
                                        {/* Question text */}
                                        <div className="flex-1">
                                            <p className="text-gray-600 text-sm text-left">{q.question}</p>
                                        </div>

                                        {/* Time spent */}
                                        <div className="text-left sm:text-right">
                                            <p className="text-lg font-bold text-[#5754e8]">
                                                {timeSpans[index + 1]}s
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                )}
            </div>
        </div>
    )
}
