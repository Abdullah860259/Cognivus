"use client";

import { useState } from "react";
import Settings from "@/Components/Settings";

const services = [
    { name: "Solve MCQs", component: <div>Solve MCQs Screen</div> },
    { name: "Access PDFs", component: <div>Access PDFs Screen</div> },
    { name: "More Services", component: <div>More Services Screen</div> },
    { name: "Profile", component: <div>Profile Screen</div> },
    { name: "Settings", component: <Settings /> },
];

export default function PcDashboard() {
    const [active, setActive] = useState(services[0].name);

    // get currently active component
    const activeComponent = services.find(s => s.name === active)?.component;

    return (
        <div className="flex h-screen">
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
                                className={`w-full text-left px-3 py-2 rounded mb-2 hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
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
                                className={`w-full text-left px-3 py-2 rounded hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
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
