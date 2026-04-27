import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // Using Inter/Jetbrains as placeholders for Geist if undefined
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { AppProviders } from "@/components/providers/AppProviders";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AntigravityTrade | Professional Trading Dashboard",
  description: "Next-generation trading platform for professional traders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-page text-text-primary antialiased selection:bg-accent/20 selection:text-accent`}>
        <AppProviders>
          <div className="relative flex min-h-screen flex-col">
            <Sidebar />
            <div className="flex flex-1 flex-col lg:pl-64">
              <TopBar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
                {children}
              </main>
            </div>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}


