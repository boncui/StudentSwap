import React, { useEffect, useState } from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import type { ThemeProviderProps } from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    console.log("Current Theme:", theme); // ✅ Debug theme updates
  }, [theme]);

  if (!mounted) return <>{children}</>; // Prevents hydration issues

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
