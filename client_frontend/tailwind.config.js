/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(222.2, 47.4%, 11.2%)",
        secondary: "hsl(210, 40%, 96.1%)",
        "primary-light": "hsl(222.2, 47.4%, 20%)", // ✅ Light version for better visibility
        "secondary-light": "hsl(210, 40%, 90%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(222.2, 47.4%, 11.2%)",
        muted: "hsl(210, 40%, 96.1%)",
        "muted-foreground": "hsl(215.4, 16.3%, 46.9%)",
        border: "hsl(214.3, 31.8%, 91.4%)",
      },
    },
  },
  plugins: [],
};
