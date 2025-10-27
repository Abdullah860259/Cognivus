"use client";

import { useEffect, useState } from "react";
import Settings from "@/Components/Settings";
import IssuesBoard from "@/Components/RaiseAnIssue";
import Emailverificationcheckbox from "./emailverificationcheckbox";
import ProfilePage from "@/Components/Profile";
import PastPapers from "@/Components/PastPapers";
import TopicWiseMcq from "@/Components/TopicWiseMcq";
import AptitudeExam from "@/Components/AptitudeExam";
import { useRouter } from "next/navigation";

const services = [
    { name: "Leaderboard", component: <div>Leaderboard Screen</div> },
    { name: "Solve Topic wise MCQs", component: <TopicWiseMcq navigate={(url) => router.push(url)} /> },
    { name: "Give an Aptitude Test", component: <AptitudeExam /> },
    { name: "Attempt Past Papers", component: <PastPapers /> },
    { name: "Access PDFs", component: <div>Access PDFs Screen</div> },
    { name: "Raise An Issue", component: <IssuesBoard /> },
    { name: "More Services", component: <div>More Services Screen</div> },
    { name: "Profile", component: <ProfilePage /> },
    { name: "Settings", component: <Settings /> },
    { name: "History", component: <div>History Screen</div> }
];

export default function PcDashboard() {
    const router = useRouter();
    const [active, setActive] = useState(services[0].name);

    // get currently active component
    const activeComponent = services.find(s => s.name === active)?.component;

    return (
        <div className="flex h-screen">
            <Emailverificationcheckbox />
            {/* Sidebar */}
            <div className="flex flex-col justify-between w-64 bg-gray-800 text-white p-4">
                <div>
                    <h1 className="text-xl font-bold mb-6">MCQ Dashboard</h1>
                    {/* Top services */}
                    {services
                        .filter(s => s.name !== "Profile" && s.name !== "Settings")
                        .map(service => (
                            <button
                                key={service.name}
                                onClick={() => setActive(service.name)}
                                className={`w-full text-left cursor-pointer px-3 py-2 rounded mb-2 hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
                                    }`}
                            >
                                {service.name}
                            </button>
                        ))}
                </div>

                {/* Bottom: Profile & Settings */}
                <div className="space-y-2">
                    {services
                        .filter(s => s.name === "Profile" || s.name === "Settings")
                        .map(service => (
                            <button
                                key={service.name}
                                onClick={() => setActive(service.name)}
                                className={`w-full cursor-pointer text-left px-3 py-2 rounded hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
                                    }`}
                            >
                                {service.name}
                            </button>
                        ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 overflow-auto">
                {activeComponent}
            </div>
        </div>
    );
}
