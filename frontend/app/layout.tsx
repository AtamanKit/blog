import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React, { Suspense } from 'react';

import { ThemeProvider } from "@/context/ThemeContext";
import { AuthHandlerWrapper } from "@/components/auth/AuthHandlerWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rodion Atamaniuc's blog",
  description: "My personal blog where I write about programming and other things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased container mx-auto`}
      >
        <Suspense fallback={null}>
          <AuthHandlerWrapper />
        </Suspense>
        <main>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}
