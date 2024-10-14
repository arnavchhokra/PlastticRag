// src/components/ClientWrapper.tsx

"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { RecoilRoot } from "recoil";
import { Toaster } from "@/components/ui/toaster";

interface ClientWrapperProps {
  children: React.ReactNode;
}

export default function ClientWrapper({ children }: ClientWrapperProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <RecoilRoot>
        {children}
        <Toaster />
      </RecoilRoot>
    </ThemeProvider>
  );
}
