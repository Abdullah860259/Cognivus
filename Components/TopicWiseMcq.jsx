import React, { useEffect, useInsertionEffect, useState } from "react";
import topicsData from "@/data/topics.json";
import { toast } from "sonner";
const TopicWiseMcq = ({ navigate }) => {
    const [subject, setSubject] = useState("");
    const [className, setClassName] = useState("");
    const [topic, setTopic] = useState("");

    useEffect(() => {
        console.log(navigate)
        if (className === "Class 9" || className === "Class 10") {
            toast.info("Matric Classes are coming soon!");
            setClassName("");
        }
    }, [className])


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-center text-xl font-semibold mb-6">Select Topic to Practice</h2>

                {/* Subject */}
                <select
                    value={subject}
                    onChange={(e) => { setSubject(e.target.value); setClassName(""); setTopic(""); }}
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Select Subject</option>
                    {Object.keys(topicsData).map((subj) => (
                        <option key={subj} value={subj}>{subj}</option>
                    ))}
                </select>

                {/* Class */}
                {subject && (
                    <select
                        value={className}
                        onChange={(e) => { setClassName(e.target.value); setTopic(""); }}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Class</option>
                        {Object.keys(topicsData[subject]).map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                        ))}
                    </select>
                )}

                {/* Topic */}
                {className && (
                    <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Topic</option>
                        {topicsData[subject][className].map((tpc) => (
                            <option key={tpc} value={tpc}>{tpc}</option>
                        ))}
                    </select>
                )}

                {/* Start Button */}
                {topic && (
                    <button
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
                        onClick={() => console.log(navigate)}
                    >
                        Start Practicing
                    </button>
                )}
            </div>
        </div >
    );
};

export default TopicWiseMcq;