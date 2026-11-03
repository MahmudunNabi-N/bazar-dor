import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { ToastProvider } from "@/components/toast-provider";

export const metadata: Metadata = {
  title: "বাজার দর — প্রতিদিনের বাজারদর এক নজরে",
  description: "চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর তুলনা করুন।",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="bn">
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  );
}
