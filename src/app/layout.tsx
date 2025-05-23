import type { Metadata } from "next";
import ContextProvider from "@/components/context/stateContext";
import "./globals.css";
import Header from "@/components/header/header";

import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <ContextProvider>
          <Header/>
          {children}
        </ContextProvider>
      </body>
    </html>
  );
}
