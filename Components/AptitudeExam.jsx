import React from "react";
import examsData from "@/Data/AvailableTests.json";

const AptitudeExam = () => {
    return (
        <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {examsData.tests.map((exam) => (
                <div
                    key={exam.name}
                    className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-xl transition flex flex-col justify-between"
                >
                    <div>
                        <h2 className="text-xl font-bold text-blue-600">{exam.name}</h2>
                        <p className="text-gray-600">Time: {exam.time} hrs</p>
                        <p className="text-gray-600">Total MCQs: {exam.mcqs}</p>
                        <h3 className="mt-3 font-semibold text-gray-700">Subjects:</h3>
                        <ul className="list-disc list-inside text-gray-700">
                            {Object.entries(exam.subjects).map(([subj, count]) => (
                                <li key={subj}>
                                    {subj}: <span className="font-medium">{count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Button */}
                    <button
                        onClick={() => handleAttempt(exam.name)}
                        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
                    >
                        Attempt Test
                    </button>
                </div>
            ))}
        </div>
    );
};

export default AptitudeExam;
