import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SessionWrapper from "./components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Your Paper Helper",
  description: "Your Paper helper- Your own paper helper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-[85vh] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <SessionWrapper>
          <Navbar />
          <div className="min-h-[85vh]">

            {children}
          </div>


          <Footer />
        </SessionWrapper>
      </body>

    </html>

  );
}
