"use client";

import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { X } from "lucide-react";
import { useLoading } from "@/context/LoadingContext";
import { toast } from "sonner";

export default function IssuesBoard() {
    const [active, setActive] = useState("On Going");
    const { data: session, status } = useSession();
    const [issues, setIssues] = useState(null);
    const { setLoading } = useLoading();
    const [createIssue, setCreateIssue] = useState(false);
    const [form, setForm] = useState({ title: "", description: "" });

    // Fetch all issues of current user
    const fetchIssues = async () => {
        if (status !== "authenticated") return;
        try {
            setLoading(true);
            const res = await fetch(`/api/issues?userid=${session?.user.id}`);
            const data = await res.json();
            setIssues(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchIssues();
        }
    }, [status]);

    // Create a new issue
    async function handleSubmit(e) {
        e.preventDefault();
        if (form.title.trim() === "" || form.description.trim() === "") {
            toast.error("Please fill in all fields.");
            return;
        }
        try {
            const body = {
                title: form.title,
                description: form.description,
                status: "open",
                createdBy: session?.user.id,
            };
            const res = await fetch("/api/issues", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newIssue = await res.json();
            setIssues([newIssue, ...(issues || [])]);
            setForm({ title: "", description: "" });
            setCreateIssue(false);
        } catch (err) {
            console.error(err);
        }
    }

    // Dissolve an issue
    const handleDissolve = (issueId) => async () => {
        try {
            const res = await fetch(`/api/issues?id=${issueId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to dissolve issue");
            toast.success("Issue dissolved successfully");
            fetchIssues();
        } catch (err) {
            console.error(err);
            toast.error("Failed to dissolve issue");
        }
    };

    // Confirm resolution
    const handleResolve = (issueId) => async () => {
        try {
            const response = await fetch(`/api/issues?id=${issueId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "closed" }),
            });
            if (!response.ok) throw new Error("Failed to update issue status");
            toast.success("Issue status updated to closed");
            fetchIssues();
        } catch (error) {
            toast.error(error.message);
            console.error("Error updating issue status:", error);
        }
    };

    // ✅ FIX: Keep filteredIssues in scope
    const filteredIssues = useMemo(() => {
        if (!issues) return [];
        return issues.filter((issue) => {
            if (active === "On Going") {
                return issue.status === "open" || issue.status === "in-progress";
            } else if (active === "Completed") {
                return (
                    issue.status === "resolved" ||
                    issue.status === "dissolved" ||
                    issue.status === "closed"
                );
            }
            return false;
        });
    }, [issues, active]);

    return (
        <div className="p-6 w-full h-full overflow-y-auto bg-gray-100">
            {/* Case 1: No issues yet */}
            {issues === null && !createIssue && (
                <div className="flex items-center justify-center h-full">
                    <div className="text-center border rounded-xl shadow-md p-10 bg-white max-w-md">
                        <h2 className="text-2xl font-bold mb-3">No Issues Found</h2>
                        <p className="text-gray-600 mb-6">
                            You haven’t raised any issues yet. Create your first one below.
                        </p>
                        <button
                            onClick={() => setCreateIssue(true)}
                            className="px-5 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        >
                            Raise New Issue
                        </button>
                    </div>
                </div>
            )}

            {/* Case 2: Create issue form */}
            {createIssue && (
                <div className="relative max-w-lg mx-auto border rounded-xl shadow-lg p-6 bg-white">
                    <button
                        onClick={() => setCreateIssue(false)}
                        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                        <X size={20} />
                    </button>

                    <h2 className="text-2xl font-bold mb-4">Raise A New Issue</h2>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Issue title"
                            value={form.title}
                            onChange={(e) => setForm({ ...form, title: e.target.value })}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <textarea
                            placeholder="Describe the issue..."
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={4}
                            className="w-full border rounded-lg px-3 py-2"
                        />
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
                        >
                            Submit Issue
                        </button>
                    </form>
                </div>
            )}

            {/* Case 3: Issues exist */}
            {issues !== null && !createIssue && (
                <div className="w-full mb-auto">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">My Issues</h2>
                        <button
                            onClick={() => setCreateIssue(true)}
                            className="mt-3 sm:mt-0 px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer shadow-sm"
                        >
                            Raise Another Issue
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-3 mb-6">
                        {["On Going", "Completed"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setActive(status)}
                                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer
            ${active === status
                                        ? "bg-blue-600 text-white shadow-md scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {status}
                            </button>
                        ))}
                    </div>

                    <hr className="mb-6" />

                    {/* Grid of Cards */}
                    {filteredIssues.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredIssues.map((issue) => (
                                <div
                                    key={issue._id}
                                    className="border rounded-2xl p-5 shadow-sm bg-white hover:shadow-md transition flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">{issue.title}</h3>
                                            <span
                                                className={`px-3 py-1 text-xs rounded-full font-semibold
                    ${issue.status === "open"
                                                        ? "bg-red-100 text-red-700"
                                                        : issue.status === "in-progress"
                                                            ? "bg-yellow-100 text-yellow-700"
                                                            : issue.status === "resolved"
                                                                ? "bg-green-100 text-green-700"
                                                                : issue.status === "dissolved"
                                                                    ? "bg-gray-200 text-gray-700"
                                                                    : "bg-gray-200 text-gray-600"
                                                    }`}
                                            >
                                                {issue.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                            {issue.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 text-xs">
                                            <span className="text-blue-600 font-medium">
                                                {new Date(issue.createdAt).toLocaleDateString()}
                                            </span>
                                        </p>

                                        <div className="flex space-x-2">
                                            {issue.status !== "resolved" &&
                                                issue.status !== "closed" &&
                                                issue.status !== "dissolved" && (
                                                    <button
                                                        onClick={handleDissolve(issue._id)}
                                                        className="px-3 py-2 text-xs font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition cursor-pointer"
                                                    >
                                                        Dissolve
                                                    </button>
                                                )}

                                            {issue.status === "resolved" && (
                                                <button
                                                    onClick={handleResolve(issue._id)}
                                                    className="px-3 py-2 text-xs font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 transition cursor-pointer"
                                                >
                                                    Confirm Resolution
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-left bg-gray-50 rounded-xl border border-dashed p-4">
                            <p className="text-gray-600">No {active} issues available.</p>
                        </div>

                    )}
                </div>
            )}

        </div>
    );
}
