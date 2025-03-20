import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./theme/theme-provider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
