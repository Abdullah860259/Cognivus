"use client"
import { useEffect, useState } from "react"
import Timer from "@/Components/Timer"
import { toast } from "sonner"


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

    const [current, setCurrent] = useState(0)
    const [selected, setSelected] = useState(null)
    const [score, setScore] = useState(0)
    const [finished, setFinished] = useState(false)

    const handleReattempt = () =>{
        setSelected(null)
        setCurrent(0)
        setScore(0)
        setFinished(false)
    }

    const handleOptionClick = (option) => {
        setSelected(option)
    }

    const handleNext = () => {
        if(selected === null) {
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
        }
    }

    return (
        <div className=" text-black flex flex-col gap-8 justify-center items-center min-h-screen  bg-gray-100 p-4">
            <Timer/>
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
                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleNext}
                                className={`px-4 py-2 ${selected===null ? "opacity-50" : ""} rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 disabled:bg-green-300`}
                            >
                                {current + 1 === questions.length ? "Finish" : "Next"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Quiz Finished 🎉</h2>
                        <p className="text-lg">Your Score: {score} / {questions.length}</p>
                        <div className="flex gap-2  justify-center mt-2 " >
                            <button
                            onClick={handleReattempt}
                            className="btn border-1 border-[#5754e8] bg-white hover:bg-[#5754e8] btn-soft btn-primary">Reattemp</button>
                            <button className="btn btn-outline btn-secondary">Go to Home</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
