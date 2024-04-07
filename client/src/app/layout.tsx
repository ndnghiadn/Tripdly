import type { Metadata } from "next";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import NextTopLoader from "nextjs-toploader";
import { mainColors } from "@/lib/constants";

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
        <NextTopLoader
          color={mainColors.secondaryColor}
          initialPosition={0.08}
          crawlSpeed={200}
          height={5}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={500}
          shadow={`0 0 10px ${mainColors.primaryBgColor},0 0 5px ${mainColors.secondaryBgColor}`}
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1701}
          showAtBottom={false}
        />
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
