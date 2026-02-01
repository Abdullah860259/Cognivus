// Dashboard.jsx
"use client";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { X } from "lucide-react";
import TopicWiseMcq from "@/Components/TopicWiseMcq";
import AptitudeExam from "@/Components/AptitudeExam";
import ComingSoon from "@/Components/ComingSoon";
import IssuesBoard from "@/Components/RaiseAnIssue";
import PastPapers from "@/Components/PastPapers";
import Settings from "@/Components/Settings";
import ProfilePage from "@/Components/Profile";
import NewBadge from "@/Components/NewBadge";

const services = [
    { name: "Leaderboard", component: <ComingSoon /> },
    { name: "Solve Topic wise MCQs", component: <TopicWiseMcq navigate={(url) => router.push(url)} /> },
    { name: "Aptitude Test", component: <AptitudeExam /> },
    { name: "Past Papers", component: <PastPapers /> },
    { name: "Access PDFs", component: <ComingSoon /> },
    { name: "Raise An Issue", component: <IssuesBoard /> },
    { name: "More Services", component: <ComingSoon /> },
    { name: "Profile", component: <ProfilePage /> },
    { name: "Settings", component: <Settings /> },
    { name: "History", component: <ComingSoon /> }
];

export default function MobileDashboard() {
    const [active, setActive] = useState(services[0].name);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeComponent = services.find(s => s.name === active)?.component;

    return (
        <div className="flex flex-col h-[100dvh] ">
            {/* Mobile menu button */}
            <button
                className=" flex justify-between items-center cursor-pointer h-16 md:hidden p-2 bg-gray-800 text-white "
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <div>
                    ARSALAN
                </div>
                <HiMenu size={32} />
            </button>

            {/* Sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-10 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            <div
                className={`fixed right-0 md:relative z-20 h-full bg-gray-800 text-white w-64 p-4 transform ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
                      transition-transform duration-300 flex flex-col md:translate-x-0`}
            >
                <div>
                    <div className="flex justify-between cursor-pointer" >
                        <h1 className="text-xl font-bold mb-6">ARSALAN</h1>
                        <X size={20} onClick={() => setSidebarOpen(!sidebarOpen)} />
                    </div>
                    {services.map(service => {
                        return (
                            <>
                                <div className="flex items-center justify-between flex-row" >
                                    <button
                                        key={service.name}
                                        onClick={() => { setActive(service.name); setSidebarOpen(false); }}
                                        className={`w-full text-left px-3 py-2 rounded mb-2 hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
                                            }`}
                                    >
                                        {service.name}
                                    </button>
                                    {service.name == "Past Papers" && (
                                        <NewBadge />
                                    )}
                                </div>
                            </>
                        )
                    })}
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 md:p-6 md:ml-64 overflow-auto">
                {activeComponent}
            </div>
        </div>
    );
}
