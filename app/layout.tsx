import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
});

export const metadata: Metadata = {
  title: "SYS.INIT // I.A. SEYAM",
  description: "Terminal Boot Sequence - Irfan Ahamed Seyam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${vt323.variable} font-sans antialiased bg-black text-[#4af626] selection:bg-[#4af626] selection:text-black overflow-x-hidden`}
      >
        <div className="crt pointer-events-none fixed inset-0 z-50"></div>
        <div className="crt-overlay h-screen h-[100dvh] w-full relative max-w-4xl mx-auto flex flex-col overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
