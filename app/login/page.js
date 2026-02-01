"use client"

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import LoadingOverlay from "@/Components/LoadingOverlay";

export default function LoginPage() {
    const { data: session, status } = useSession();
    const [form, setform] = useState({ email: "", password: "" })
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleChange = (e) => {
        setform((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        if (!form.email || !form.password) {
            toast.error("Fill all the fields")
            setIsLoading(false);
            return;
        }
        const res = await signIn("credentials", {
            email: form.email,
            password: form.password,
            redirect: false,
        });
        if (res?.error) {
            toast.error(res.error); // show the message on screen
        } else {
            toast.success("Login successful");
            router.push("/dashboard");
        }
        setIsLoading(false);
    };

    if (status == "loading") {
        return <LoadingOverlay />
    }
    if (status == "authenticated") {
        router.push("/dashboard")
    }
    if (status == "unauthenticated") {

        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
                <div className="w-full max-w-md">
                    <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl border-0">
                        <div className="p-8 space-y-6">
                            <h2 className="text-3xl font-bold text-center text-indigo-700">
                                Login to MCQ Portal
                            </h2>
                            <p className="text-center text-gray-500 text-sm">
                                Access your account to practice MCQs
                            </p>


                            <form className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Email</label>
                                    <input type="email" name="email" onChange={handleChange} placeholder="you@example.com" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>


                                <div>
                                    <label className="block text-sm font-medium text-gray-600">Password</label>
                                    <input type="password" name="password" onChange={handleChange} placeholder="••••••••" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    onClick={handleSubmit}
                                    className="w-full px-4 py-2 pointer bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                                    ) : (
                                        "Login"
                                    )}
                                </button>
                            </form>
                            {/* google */}
                            <button
                                onClick={() => {
                                    signIn("google", { callbackUrl: "/dashboard" });
                                }}
                                className="flex items-center justify-center cursor-pointer w-full mt-4 gap-2 px-4 py-2 rounded-lg bg-white text-purple-800 border border-purple-600 hover:bg-purple-50 shadow-md transition"
                                aria-label="Login with Google"
                            >
                                <svg
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path fill="#4285F4" d="M113 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                                    <path fill="#34A853" d="M90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                                    <path fill="#FBBC05" d="M386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                                    <path fill="#EA4335" d="M153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                                </svg>
                                Continue with Google
                            </button>

                            <div className="text-center text-sm text-gray-500">
                                Don’t have an account? <Link href="/signup" className="text-indigo-600 font-semibold hover:underline">Sign up</Link>
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}