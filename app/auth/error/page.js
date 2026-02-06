"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function ErrorPage() {
    const params = useSearchParams();
    const message = params.get("message") || "Something went wrong!";

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #f06, #f79)",
                color: "#fff",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                textAlign: "center",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    backgroundColor: "rgba(0,0,0,0.6)",
                    padding: "2rem 3rem",
                    borderRadius: "15px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                    maxWidth: "500px",
                }}
            >
                <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚠️ Error</h1>
                <p style={{ fontSize: "1.2rem", marginBottom: "2rem" }}>{message}</p>
                <Link
                    href="/"
                    style={{
                        backgroundColor: "#fff",
                        color: "#f06",
                        padding: "0.7rem 1.5rem",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "bold",
                        transition: "0.3s",
                    }}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#f3f3f3")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#fff")}
                >
                    Go Home
                </Link>
            </div>
        </div>
    );
}
