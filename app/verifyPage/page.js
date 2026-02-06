import React from "react";

export default function VerifyEmailPage() {
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.heading}>Check Your Inbox!</h1>
                <p style={styles.text}>
                    We’ve sent a verification email. Please confirm your email to continue.
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "1rem",
        backgroundColor: "#f5f5f5",
    },
    card: {
        textAlign: "center",
        padding: "2rem",
        borderRadius: "10px",
        backgroundColor: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        maxWidth: "400px",
        width: "100%",
    },
    heading: {
        fontSize: "1.8rem",
        marginBottom: "1rem",
        color: "#333",
    },
    text: {
        fontSize: "1rem",
        color: "#555",
    },
};
