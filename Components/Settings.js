"use client";
import React from "react";
import { signOut } from "next-auth/react";

const Settings = () => {
    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6 sm:mt-10">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Settings</h2>

            {/* Logout Section */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 text-lg mb-3 sm:mb-0">Logout from your account</p>
                <button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors w-full sm:w-auto text-center"
                >
                    Logout
                </button>
            </div>

            {/* Additional settings (optional) */}
            <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700">Change Password</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700">Notification Preferences</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
