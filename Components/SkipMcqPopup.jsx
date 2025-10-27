"use client";
import { useState } from "react";
import { CircleArrowOutUpRight } from "lucide-react"
import { toast } from "sonner";
import { useSession } from "next-auth/react";
export default function SkipMcqPopup({ mcq, current, setCurrent, questionslength, setFinished, attemptedMcqs, setAttemptedMcqs, questions, setLastSecond, settimeSpans, seconds }) {
    const [open, setOpen] = useState(false);
    const { data: session, status } = useSession();

    const handleSkip = async () => {
        if (status !== "authenticated") return;
        setOpen(false);
        const res = await fetch(`/api/skipmcq?mcqid=${mcq._id}&userid=${session.user.id}`);
        const data = await res.json();
        if (data.error) {
            toast.info("You have also skipped this mcq in past");
        } else {
            toast.success("MCQ skipped successfully");
        }
        if (current + 1 < questionslength) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
        }
        let obj = {
            question: questions[current].statement,
            correctOption: questions[current].options[questions[current].correctOption],
            selectedOption: null,
            skipped: true,
        }
        setAttemptedMcqs((prev) => [...prev, obj]);
        settimeSpans((prev) => [...prev, null]);
        setLastSecond(seconds);
    };

    const handleReport = async () => {
        if (status !== "authenticated") return;
        console.log(mcq, '🙃🙃🙃🙃')
        const body = {
            title: "MCQ ISSUE",
            description: JSON.stringify(mcq, null, 2), // makes it readable
            status: "open",
            createdBy: session?.user.id,
        };
        const res = await fetch("/api/issues", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const newIssue = await res.json();
        toast.success("Issue reported successfully");
        console.log(newIssue)
    };


    const handleSkipAndReport = () => {
        setOpen(false);
        handleSkip();
        handleReport();
    };

    return (
        <div>
            {/* Open popup button */}
            <div className="ml-auto w-full " >
                <button
                    onClick={() => setOpen(true)}
                    className="text-gray-600 flex ml-auto mb-3 items-center gap-1 hover:text-gray-800 cursor-pointer"
                >
                    <CircleArrowOutUpRight size={15} />
                    skip
                </button>
            </div>

            {/* Popup overlay */}
            {open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-lg w-auto relative">
                        {/* Cross button */}
                        <button
                            onClick={() => { setOpen(false); }}
                            className=" mb-3 absolute top-2 right-2 text-gray-500 hover:text-gray-800 cursor-pointer "
                        >
                            ✕
                        </button>


                        <div className="flex flex-col gap">
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={handleSkip}
                                    className="px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg"
                                >
                                    Skip
                                </button>
                                <button
                                    onClick={handleSkipAndReport}
                                    className="px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg"
                                >
                                    Skip and <span className="text-red-100" >Report</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}
