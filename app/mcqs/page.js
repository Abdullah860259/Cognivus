"use client"
import { useEffect, useState } from "react"
import Timer from "@/Components/Timer"
import { toast } from "sonner"
import { useRouter, useSearchParams } from "next/navigation"
import { useLoading } from "@/context/LoadingContext"
import LoadingOverlay from "@/Components/LoadingOverlay"
import { ChevronRight, ChevronLeft, ChevronsLeft } from "lucide-react"
import DifficultyIndicator from "@/Components/DifficultyIndicator"
import SkipMcqPopup from "@/Components/SkipMcqPopup"

export default function McqPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = {
        referenceName: searchParams?.get("referenceName") || "",
        conductor: searchParams?.get("conductor") || "",
        year: Number(searchParams?.get("year")) || 0,
        time: Number(searchParams?.get("time")) || 0,
        pastPaper: searchParams?.get("pastPaper") === "true",
        reverseTime: searchParams?.get("reverseTime") === "true",
    };

    const { loading, setLoading } = useLoading();
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);
    const [timerStop, setTimerStop] = useState(false);
    const [lastSecond, setLastSecond] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeSpans, settimeSpans] = useState([0])
    const [questions, setquestions] = useState([]);
    const [review, setreview] = useState(false);
    const [timerHide, settimerHide] = useState(false);
    const [attemptedMcqs, setAttemptedMcqs] = useState([]);

    useEffect(() => {
        if (params.time) {
            setSeconds(params.reverseTime ? params.time * 3600 : 0);
            setLastSecond(params.reverseTime ? params.time * 3600 : 0);
        }
        console.log(params.time, params.reverseTime);
    }, [params.time, params.reverseTime]);

    const fetchQuestions = async () => {
        try {
            const res = await fetch(
                `/api/getmcq?referenceName=${params.referenceName}&conductor=${params.conductor}&year=${params.year}&time=${params.time}&pastPaper=${params.pastPaper}`
            );
            const data = await res.json();
            const firstFive = data.slice(0, 10);
            setquestions(firstFive);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchQuestions();
    }, [params.referenceName, params.conductor, params.year, params.time, params.pastPaper]);

    useEffect(() => {
        if (!params.referenceName || !params.conductor || !params.year || !params.time) {
            toast.error("Invalid parameters");
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        }
    }, [])

    useEffect(() => {
        const handleUnload = (e) => {
            e.preventDefault();
            e.returnValue = "";
        }
        window.addEventListener("beforeunload", handleUnload)
        return () => window.removeEventListener("beforeunload", handleUnload);
    }, [])

    const handleReattempt = () => {
        setResetTimer(true);
        setSelected(null);
        setCurrent(0);
        setScore(0);
        setFinished(false);
        setTimerStop(false);
        settimeSpans([0]);
        setLastSecond(params.reverseTime ? params.time * 3600 : 0);
        setAttemptedMcqs([]);
    };

    const handleReview = () => {
        setreview(true);
        setFinished(false);
        setCurrent(0);
        setSelected(null);
    };

    const handleOptionClick = (option) => {
        if (review) return;
        if (timerStop) {
            toast.error("First Continue The Timer")
            return
        }
        setSelected(option)
    }

    const handleNext = () => {
        if (review && current + 1 < attemptedMcqs.length) {
            setCurrent(current + 1)
            return
        } else if (review) {
            setreview(false);
            setFinished(true)
            return
        }
        if (selected === null && review === false) {
            toast.error("Select an option please")
            return
        }
        let duration;
        if (current === 0) {
            duration = params.reverseTime
                ? (params.time * 3600) - seconds
                : seconds;
        } else {
            duration = params.reverseTime
                ? lastSecond - seconds
                : seconds - lastSecond;
        }
        settimeSpans([...timeSpans, duration]);
        setLastSecond(seconds);

        if (selected === questions[current].options[questions[current].correctOption]) {
            setScore(score + 1);
        }
        if (current + 1 < questions.length) {
            let obj = {
                question: questions[current].statement,
                correctOption: questions[current].options[questions[current].correctOption],
                selectedOption: selected
            }
            setAttemptedMcqs(prev => [...prev, obj]);
            setCurrent(current + 1)
            setSelected(null);
        } else {
            let obj = {
                question: questions[current].statement,
                correctOption: questions[current].options[questions[current].correctOption],
                selectedOption: selected
            }
            setAttemptedMcqs(prev => [...prev, obj]);
            console.log(attemptedMcqs);
            setFinished(true)
            setTimerStop(true)
        }
    }

    if (loading || questions.length === 0) {
        return <LoadingOverlay />;
    }

    return (
        <div className="text-black flex flex-col gap-8 justify-center items-center min-h-screen bg-gray-100 p-4">
            <div>
                <button
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center cursor-pointer gap-2 text-gray-600 hover:text-gray-800 font-medium"
                >
                    <ChevronsLeft size={20} />
                    Back to Dashboard
                </button>
            </div>
            {!finished && !review && (
                <Timer
                    seconds={seconds}
                    setSeconds={setSeconds}
                    timerStop={timerStop}
                    setTimerStop={setTimerStop}
                    resetTimer={resetTimer}
                    setResetTimer={setResetTimer}
                    startTime={params.time * 3600}
                    reverse={params.reverseTime}
                    settimerHide={settimerHide}
                    timerHide={timerHide}
                />
            )}



            <div className="w-full max-w-2xl bg-white p-6 shadow-lg rounded-2xl">
                {!finished ? (
                    <div className="select-none ">
                        <div className="flex justify-between items-center mb-3" >
                            <DifficultyIndicator level={questions[current].difficultyLevel} />
                            <div className="items-center w-full  flex justify-end" >
                                {!review && (<SkipMcqPopup
                                    mcq={questions[current]}
                                    current={current}
                                    setCurrent={setCurrent}
                                    questionslength={questions.length}
                                    setFinished={setFinished}
                                    attemptedMcqs={attemptedMcqs}
                                    setAttemptedMcqs={setAttemptedMcqs}
                                    questions={questions}
                                    setLastSecond={setLastSecond}
                                    settimeSpans={settimeSpans}
                                    seconds={seconds}
                                />)}
                            </div>
                            {review && (<div className="flex gap-3 items-center" >
                                <ChevronLeft className="cursor-pointer" size={20}
                                    onClick={() => {
                                        if (current - 1 >= 0) {
                                            setCurrent(current - 1)
                                        }
                                    }} />
                                <ChevronRight className="cursor-pointer" size={20}
                                    onClick={() => {
                                        if (current + 1 < attemptedMcqs.length) {
                                            setCurrent(current + 1)
                                        } else {
                                            setFinished(true)
                                            setreview(false)
                                        }
                                    }} />
                            </div>)}
                            {review && attemptedMcqs[current].skipped && (
                                <div className="w-full flex justify-end mb-3" >
                                    <p className="text-red-500 font-bold" >Skipped</p>
                                </div>
                            )}
                        </div>
                        <h2 className="text-xl font-semibold mb-4">
                            {review
                                ? `Q${current + 1}. ${attemptedMcqs[current].question}`
                                : `Q${current + 1}. ${questions[current].statement}`
                            }
                        </h2>
                        <div className="grid gap-3">
                            {console.log(current, "🙃🙃🙃🙃")}
                            {questions[current].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleOptionClick(option)}
                                    className={`cursor-pointer w-full px-4 py-2 rounded-lg border font-medium transition-colors duration-200 text-left
                                            ${review
                                            ? option === attemptedMcqs[current].correctOption
                                                ? "bg-green-500 text-white"
                                                : option === attemptedMcqs[current].selectedOption
                                                    ? "bg-red-500 text-white"
                                                    : "bg-white"
                                            : selected === option
                                                ? "bg-blue-500 text-white"
                                                : "bg-white hover:bg-gray-100 border-gray-400"
                                        }`}
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

                            {params.pastPaper && (
                                <span className="text-sm text-gray-500 content-center ">
                                    {questions[current].reference.conductor.toUpperCase()} {questions[current].reference.year}
                                </span>
                            )}

                            <button
                                onClick={handleNext}
                                className={`px-4 py-2 ${review ? "" : selected === null ? "opacity-50" : ""} 
                                rounded-lg bg-green-600 text-white font-medium cursor-pointer hover:bg-green-700 disabled:bg-green-300`}
                            >
                                {review
                                    ? current + 1 === attemptedMcqs.length
                                        ? "Finish Review"
                                        : "Next"
                                    : current + 1 === questions.length
                                        ? "Finish"
                                        : "Next"}
                            </button>

                        </div>
                    </div>
                ) : (
                    <div className="text-center select-none bg-white rounded-2xl p-6 max-w-md mx-auto">
                        <h2 className="text-3xl font-bold text-[#5754e8] mb-4">Result</h2>

                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Your Score:</span> {score} / {questions.length}
                        </p>

                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Time Taken:</span>{" "}
                            {params.reverseTime
                                ? (params.time * 3600 - seconds) + " sec"
                                : seconds + " sec"}
                        </p>
                        <p className="text-lg text-gray-700 mb-2 text-left">
                            <span className="font-semibold">Wrong Attempt:</span>{" "}
                            {questions.length - score - attemptedMcqs.filter(q => q.skipped).length}
                        </p>

                        <p className="text-lg text-gray-700 mb-4 text-left">
                            <span className="font-semibold">Average Time:</span>{" "}
                            {(
                                (params.reverseTime
                                    ? (params.time * 3600 - seconds)
                                    : seconds) / questions.length
                            ).toFixed(2)} sec/question
                        </p>

                        <div className="flex my-3 gap-3 justify-center">
                            <button
                                onClick={handleReattempt}
                                className="px-4 py-2 rounded-xl border border-[#5754e8] text-[#5754e8] font-semibold hover:bg-[#5754e8] cursor-pointer hover:text-white transition"
                            >
                                Reattempt
                            </button>
                            <button
                                onClick={() => router.push("/dashboard")} className="px-4 py-2 cursor-pointer rounded-xl bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300 transition">
                                Go to Home
                            </button>
                        </div>
                        <button
                            onClick={handleReview}
                            className="px-4 py-2 rounded-xl border border-[#5754e8] text-white bg-[#5754e8] font-semibold hover:bg-white cursor-pointer hover:text-[#5754e8] transition"
                        >
                            Review
                        </button>

                        <div className="bg-white shadow-lg rounded-2xl p-6 max-w-3xl mx-auto mt-6">
                            <h2 className="text-xl font-bold text-center text-[#5754e8] mb-6">Time Taken</h2>

                            <div className="space-y-4">
                                {questions.map((q, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4 rounded-xl border border-gray-200 hover:shadow-md transition"
                                    >
                                        <div className="flex-1">
                                            <p className="text-gray-600 text-sm text-left">{q.statement}</p>
                                        </div>
                                        <div className="text-left sm:text-right">
                                            <p className="text-lg font-bold text-[#5754e8]">
                                                {timeSpans[index + 1] === null ? "Skipped" : `${timeSpans[index + 1]}s`}
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
