// Dashboard.jsx
"use client";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";

const services = [
    { name: "Solve MCQs", component: <div>Solve MCQs Screen</div> },
    { name: "Access PDFs", component: <div>Access PDFs Screen</div> },
    { name: "More Services", component: <div>More Services Screen</div> },
];

export default function MobileDashboard() {
    const [active, setActive] = useState(services[0].name);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const activeComponent = services.find(s => s.name === active)?.component;

    return (
        <div className="flex h-screen">
            {/* Mobile menu button */}
            <button
                className="absolute top-4 left-4 md:hidden p-2 bg-gray-800 text-white rounded"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                <HiMenu size={24} />
            </button>

            {/* Sidebar */}
            <div
                className={`fixed md:relative z-20 h-full bg-gray-800 text-white w-64 p-4 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:translate-x-0`}
            >
                <div>
                    <h1 className="text-xl font-bold mb-6">MCQ Dashboard</h1>
                    {services.map(service => (
                        <button
                            key={service.name}
                            onClick={() => { setActive(service.name); setSidebarOpen(false); }}
                            className={`w-full text-left px-3 py-2 rounded mb-2 hover:bg-gray-700 ${active === service.name ? "bg-gray-700" : ""
                                }`}
                        >
                            {service.name}
                        </button>
                    ))}
                </div>
                <div className="mt-auto space-y-2">
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Profile</button>
                    <button className="w-full text-left px-3 py-2 rounded hover:bg-gray-700">Settings</button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-100 p-6 md:ml-64 overflow-auto">
                {activeComponent}
            </div>
        </div>
    );
}
