import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useLoading } from "@/context/LoadingContext";

const ChangePassword = () => {
    const [showPopup, setShowPopup] = useState(false);
    const { data: session, status } = useSession();
    const { loading, setLoading } = useLoading();
    const [user, setuser] = useState(null);
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const getUser = async () => {
        const res = await fetch(`/api/getuser?userid=${session.user.id}`);
        const data = await res.json();
        setuser(data);
        setLoading(false);
        return;
    };

    useEffect(() => {
        if (status == "authenticated") {
            setLoading(true);
            getUser();
        }
    }, [status])


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        // TODO: Call your API to update password

        try {
            const res = await fetch("/api/changePassword", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.error) {
                toast.error(data.error);
                return;
            }
            toast.success("Password updated successfully");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update password");
        }

        setShowPopup(false);
        setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    };

    if (status !== "authenticated") return null;
    if (loading) return null;
    return (
        <>
            {/* Trigger Button */}
            {user?.provider === "credentials" && (<button
                onClick={() => setShowPopup(true)}
                className="btn btn-primary"
            >
                Change Password
            </button>)
            }
            {/* Popup */}
            {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-96 p-6">
                        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder="Current Password"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white text-black border-[1px] border-black"
                                required
                            />

                            <input
                                type="password"
                                name="newPassword"
                                placeholder="New Password"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white text-black border-[1px] border-black"
                                required
                            />

                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm New Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="input input-bordered w-full bg-white text-black border-[1px] border-black"
                                required
                            />

                            <div className="flex justify-end gap-2 mt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowPopup(false)}
                                    className="btn btn-outline"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ChangePassword;
