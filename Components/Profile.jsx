import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { useLoading } from "@/context/LoadingContext"
import ProfileEditPopup from "./EditProfile"

const ProfilePage = () => {
    const [user, setuser] = useState()
    const { data: session } = useSession();
    const { setLoading } = useLoading();

    const fetchUser = async () => {
        setLoading(true)
        const res = await fetch(`/api/getuser?userid=${session.user.id}`);
        const data = await res.json();
        setuser(data)
        setLoading(false)
    }

    useEffect(() => {
        fetchUser();
    }, [])

    if (!user) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 text-lg">No user data found.</p>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto mt-14">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">

                {/* Profile Header */}
                <div className="px-8 py-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                    <img
                        src={user.image || "/default-avatar.png"}
                        alt="User avatar"
                        className="w-32 h-32 rounded-full border-4 border-gray-100 shadow-lg object-cover"
                    />
                    <div className="flex-1 text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-gray-800">{user.name || "Unnamed User"}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                {user.provider}
                            </span>
                            <span
                                className={`px-3 py-1 text-xs font-semibold rounded-full ${user.isVerified
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-600"
                                    }`}
                            >
                                {user.isVerified ? "Verified" : "Not Verified"}
                            </span>
                        </div>
                    </div>
                    <div className="ml-auto">
                        <ProfileEditPopup user={user} fetchUser={fetchUser} />
                    </div>
                </div>

                {/* Details */}
                <div className="px-8 pb-10">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Profile Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            { label: "Contact", value: user.contact },
                            { label: "College", value: user.college },
                            { label: "Gender", value: user.gender },
                            { label: "Age", value: user.age },
                            { label: "City", value: user.city },
                            { label: "Group", value: user.group },
                            { label: "Class", value: user.class },
                            { label: "Board", value: user.board },
                        ].map((item, idx) => (
                            <div
                                key={idx}
                                className="p-5 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                            >
                                <p className="text-sm text-gray-500">{item.label}</p>
                                <p className="text-gray-800 font-medium mt-1">
                                    {item.value || "Not provided"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage
