import "./globals.css";
import ToasterWrapper from "@/Components/Wrappers/toasterWrapper";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-[100dvh] bg-white" >
        <ToasterWrapper>
          {children}
        </ToasterWrapper>
      </body>
    </html>
  );
}
