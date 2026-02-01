export default function NewBadge({ className = "" }) {
    return (
        <div
            className={`inline-flex items-center px-4 py-2 text-xs rounded-full
      bg-purple-600 text-white animate-pulse ${className}`}
        >
            COMPLETED
        </div>
    );
}
