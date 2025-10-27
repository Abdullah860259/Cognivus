// /context/LoadingContext.jsx
"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [snippets, setsnippets] = useState([]);
    const [currentSnippet, setcurrentSnippet] = useState("");

    const fetchSnippets = async () => {
        try {
            let res = await fetch(`/api/snippets`);
            let data = await res.json();
            console.log(data);
            setsnippets(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch snippets");
        }
    }

    useEffect(() => {
        if (snippets.length === 0) {
            fetchSnippets();
        }
    }, [])

    useEffect(() => {
        if (loading && snippets.length > 0) {
            const random = snippets[Math.floor(Math.random() * snippets.length)];
            setcurrentSnippet(random);
        }
    }, [loading, snippets])



    return (
        <LoadingContext.Provider value={{ loading, setLoading, currentSnippet }}>
            {children}
        </LoadingContext.Provider>
    );
};

export const useLoading = () => useContext(LoadingContext);
