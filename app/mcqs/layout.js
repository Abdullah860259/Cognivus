import { Suspense } from "react";

export default function McqsLayout({ children }) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            {children}
        </Suspense>
    );
}
