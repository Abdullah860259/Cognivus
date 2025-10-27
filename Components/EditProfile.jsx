import { useState } from "react";
import { toast } from "sonner";
import UploadProfilePic from "./UploadProfileImage";
import { useSession } from "next-auth/react";

export default function ProfileEditPopup({ user, fetchUser }) {
    const { data: session } = useSession();
    const [formData, setFormData] = useState({
        _id: session?.user.id || "",
        name: user?.name || "",
        email: user?.email || "",
        contact: user?.contact || "",
        city: user?.city || "",
        college: user?.college || "",
        age: user?.age || "",
        gender: user?.gender || "Male",
        class: user?.class || "",
        board: user?.board || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (!formData.age || !formData.gender || !formData.name || !formData.college) {
            toast.error("Please fill in all the required fields.");
            return;
        }

        fetch("/api/getuser", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        }).then((response) => {
            if (response.ok) {
                toast.success("Profile updated successfully!");
                fetchUser();
            } else {
                toast.error("Failed to update profile.");
            }
        });

        document.getElementById("profileModal").close();
    };

    return (
        <div className="bg-white text-black">
            {/* Trigger button */}
            <button
                onClick={() => document.getElementById("profileModal").showModal()}
                className="px-5 py-2.5 rounded-xl cursor-pointer border bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow-lg hover:scale-105 hover:from-blue-600 hover:to-indigo-700 transition"
            >
                Edit Profile
            </button>

            {/* Modal */}
            <dialog
                id="profileModal"
                className="rounded-2xl p-6 sm:p-8 max-w-2xl w-full bg-white shadow-2xl backdrop:bg-black/40 
                fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
                <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
                    Edit Profile
                </h2>

                <div className="grid gap-5">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-xl text-black p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            name="email"
                            value={formData.email}
                            disabled
                            className="w-full border rounded-xl p-3 mt-1 bg-gray-100 text-gray-500 cursor-not-allowed"
                        />
                    </div>

                    {/* Contact + City */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact</label>
                            <input
                                type="number"
                                name="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-xl text-black  p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-xl text-black  p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                    </div>
                    {/* College  + Group*/}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">College</label>
                            <input
                                name="college"
                                value={formData.college}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-xl text-black  p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Group</label>
                            <select
                                name="group"
                                required
                                value={formData.group}
                                onChange={handleChange}
                                className="w-full border rounded-xl text-black  p-3 mt-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            >
                                <option value="" disabled>Select Group</option>
                                <option value="Medical">Medical</option>
                                <option value="Engineering">Engineering</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                    </div>
                    {/* Age + Gender + Class */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                required
                                onChange={handleChange}
                                className="w-full border rounded-xl text-black  p-3 mt-1 focus:ring-2 focus:ring-blue-500 outline-none transition"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <select
                                name="gender"
                                required
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full border rounded-xl text-black  p-3 mt-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            >
                                <option value="" disabled>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Class</label>
                            <select
                                name="class"
                                required
                                value={formData.class}
                                onChange={handleChange}
                                className="w-full border rounded-xl text-black  p-3 mt-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none transition"
                            >
                                <option value="" disabled>Class</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="EntryTest">Entry Test</option>
                            </select>
                        </div>
                    </div>

                    {/* Board */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Board</label>
                        <select
                            name="board"
                            required
                            value={formData.board}
                            onChange={handleChange}
                            className="w-full border rounded-xl p-3 mt-1 bg-white text-black focus:ring-2 focus:ring-blue-500 outline-none transition"
                        >
                            <option value="" disabled>Board</option>
                            <option value="FBISE">Federal Board (FBISE)</option>
                            <option value="PB">Punjab Board (PB)</option>
                            <option value="SB">Sindh Board (SB)</option>
                            <option value="KPKB">Khyber Pakhtunkhwa Board (KPKB)</option>
                            <option value="AJKB">Azad Jammu Kashmir Board (AJKB)</option>
                        </select>
                    </div>

                    {/* Upload Profile Picture */}
                    <UploadProfilePic fetchUser={fetchUser} />
                </div>

                {/* Footer buttons */}
                <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                    <button
                        onClick={() => document.getElementById("profileModal").close()}
                        className="px-5 py-2.5 rounded-xl border bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition w-full sm:w-auto"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium shadow hover:scale-105 hover:from-blue-600 hover:to-indigo-700 transition w-full sm:w-auto"
                    >
                        Save
                    </button>
                </div>
            </dialog>
        </div>
    );
}
