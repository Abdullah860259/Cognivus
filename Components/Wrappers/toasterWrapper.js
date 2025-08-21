import { Toaster } from 'sonner'; // ✅ named import

export default function ToasterWrapper({ children }) {
    return (
        <>
            <Toaster
                position="top-right"
                richColors
                closeButton={true}
                duration={4000}  // milliseconds, default is 5000
                toastOptions={{
                    success: {
                        style: { background: '#22c55e', color: '#fff' },
                        icon: '✅',
                    },
                    error: {
                        style: { background: '#ef4444', color: '#fff' },
                        icon: '❌',
                    },
                }}
            />
            {children}
        </>
    );
}


