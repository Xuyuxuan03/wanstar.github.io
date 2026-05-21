/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#050812",
        panel: "rgba(10, 18, 36, 0.66)",
        line: "rgba(148, 163, 184, 0.18)"
      },
      boxShadow: {
        glow: "0 0 40px rgba(88, 166, 255, 0.22)",
        violet: "0 0 36px rgba(139, 92, 246, 0.22)"
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at 20% 12%, rgba(66, 153, 225, .28), transparent 28%), radial-gradient(circle at 82% 18%, rgba(168, 85, 247, .22), transparent 24%), radial-gradient(circle at 50% 88%, rgba(20, 184, 166, .13), transparent 28%)"
      }
    }
  },
  plugins: []
};
