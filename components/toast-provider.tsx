"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return <Toaster position="top-center" toastOptions={{ duration: 3200, style: { fontFamily: "inherit", borderRadius: "14px" } }} />;
}
