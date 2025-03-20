import React from "react";
import "./styles/globals.css"; // ✅ Ensure the correct path
import { ThemeProvider } from "./theme/theme-provider";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen">{children}</div>
    </ThemeProvider>
  );
};

export default Layout;
