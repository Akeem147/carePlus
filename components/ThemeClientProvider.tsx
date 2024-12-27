// components/ThemeClientProvider.tsx
"use client";

import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider"; // Import your ThemeProvider component

const ThemeClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  // Use `useEffect` to only run this logic on the client side
  useEffect(() => {
    setMounted(true); // Set mounted to true once client-side rendering is done
  }, []);

  // Return nothing or loading indicator until mounted (to prevent SSR mismatches)
  if (!mounted) return null;

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};

export default ThemeClientProvider;
