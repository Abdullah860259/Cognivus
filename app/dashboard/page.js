"use client";
import React, { useState, useEffect } from "react";
import MobileDashboard from "./mobiledashboard";
import PcDashboard from "./pcdashboard";
import LoadingOverlay from "@/Components/LoadingOverlay";
import { useLoading } from "@/context/LoadingContext";

const Page = () => {
    const { loading, setLoading } = useLoading();
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        setLoading(true); // start loading

        const checkScreen = () => setIsMobile(window.innerWidth < 640);
        checkScreen(); // initial check

        const handleResize = () => setIsMobile(window.innerWidth < 640);
        window.addEventListener("resize", handleResize);

        setLoading(false); // stop loading after first render

        return () => window.removeEventListener("resize", handleResize);
    }, [setLoading]);

    if (isMobile === null) return <LoadingOverlay />;

    return (
        <>
            {loading && <LoadingOverlay />}
            {isMobile ? <MobileDashboard /> : <PcDashboard />}
        </>
    );
};

export default Page;
