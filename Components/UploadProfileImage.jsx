"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UploadProfilePic({ fetchUser, previousImage }) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (!selected) return;

        // ✅ size check (2 MB limit)
        if (selected.size > 2 * 1024 * 1024) {
            toast.error("File size must be less than 2MB.");
            return;
        }

        // ✅ type check (only jpg, png, webp)
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(selected.type)) {
            toast.error("Only JPG, PNG, or WEBP images allowed.");
            return;
        }

        // ✅ If all checks pass
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    };


    useEffect(() => {
        return () => { if (preview) URL.revokeObjectURL(preview); };
    });

    const handleUpload = async () => {
        if (!file) {
            toast.error("Please select a file to upload.");
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setLoading(false);
        toast.success("Profile Picture Updated");
        setFile(null);
        fetchUser();
    };

    return (
        <div className="p-4 border rounded-xl text-black max-w-sm mx-auto">
            <h2 className="text-lg font-bold mb-2">Upload Profile Picture</h2>

            <input type="file" onChange={handleFileChange} />

            {preview && (
                <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 object-cover rounded-full mt-2"
                />
            )}

            {file && (<button
                onClick={handleUpload}
                disabled={loading}
                className="mt-3 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>)}
        </div>
    );
}
