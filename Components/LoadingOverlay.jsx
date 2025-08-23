import { useLoading } from "@/context/LoadingContext";

export default function LoadingOverlay() {
    const { loading } = useLoading();
    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="flex space-x-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full animate-bounce delay-150"></div>
                <div className="w-4 h-4 bg-purple-500 rounded-full animate-bounce delay-300"></div>
            </div>
        </div>
    );
}
