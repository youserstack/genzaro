import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";
import { Provider } from "@/components/context/Context";
import Header from "@/components/header/Header";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "genzaro",
  description: "genzaro is e-commerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="x-default-color"
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider
        // mode={mode}
        >
          {/* <Header /> */}
          {children}
        </Provider>
      </body>
    </html>
  );
}
