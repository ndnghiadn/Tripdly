import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/utils/shadcn";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Tripdly",
  description:
    "Friendly Trip | Meet English learners/ Free Tour Guide on your vacation!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <Header/> */}
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
