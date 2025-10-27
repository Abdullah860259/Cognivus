"use client"
import { useLoading } from "@/context/LoadingContext";
import { Heart } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react"; // ✅ assuming next-auth
import { toast } from "sonner";

export default function LoadingOverlay({ label = "Loading..." }) {
    const { loading, currentSnippet } = useLoading();
    const { data: session } = useSession();
    const [like, setLike] = useState(false);

    if (!loading || !currentSnippet) return null;

    const handleLike = async () => {
        if (!session?.user?.id) return; // safety check
        try {
            setLike(true); // optimistic UI update

            await fetch(`/api/snippets/${currentSnippet._id}/like`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: session.user.id }),
            });
        } catch (err) {
            console.error("Error liking snippet", err);
            toast.error("Failed to like snippet");
            setLike(false); // rollback if failed
        }
    };

    return (
        <div
            className="fixed select-none inset-0 z-[1000] bg-black/40 backdrop-blur-sm flex items-center justify-center"
            aria-live="polite"
            aria-busy="true"
        >
            <div
                className="flex flex-col items-center gap-4 rounded-2xl 
                   bg-gradient-to-br from-white/20 to-white/10 
                   px-6 py-5 shadow-2xl border border-white/25 
                   animate-pulse-slow"
            >
                {/* Loader Row */}
                <div className="flex text-black items-center gap-3">
                    <span className="h-6 w-6 animate-spin rounded-full border-[3px] border-black border-t-transparent drop-shadow-lg" />
                    <span className="text-Black font-semibold text-base tracking-wide">{label}</span>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-white/20" />

                {/* Fact Row */}
                <div className="text-white/90 text-sm text-center leading-snug">
                    <div>
                        <span className="font-semibold text-black">💡 Did you know?</span><br />
                        <span className="text-black">{currentSnippet.text}</span>
                    </div>
                    <button onClick={handleLike} className="ml-2">
                        <Heart
                            className={`w-5 h-5 inline-block transition-colors ${like ? "fill-red-600 text-red-600" : "text-red-700"
                                }`}
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
