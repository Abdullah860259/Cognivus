import "./globals.css";
import ToasterWrapper from "@/Components/Wrappers/toasterWrapper";
import LoadingOverlay from "@/Components/LoadingOverlay";

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

export const metadata = {
  verification: {
    google: "5lzn5Oj3hlYXIvZsseopznWIGgudZNSmhp7WHgrpNws",
  },
};
