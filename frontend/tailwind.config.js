/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: "#F6EFE3",
          soft: "#FBF7EF",
          deep: "#EDE2CC",
        },
        char: {
          DEFAULT: "#14100C", // premium black sections
          soft: "#1F1811",
        },
        espresso: {
          DEFAULT: "#3A2318",
          light: "#5A3A28",
          deep: "#241309",
        },
        ember: {
          DEFAULT: "#D9591C", // signature burnt-orange accent
          light: "#F0793E",
          deep: "#B9440F",
        },
        sage: {
          DEFAULT: "#5B6B3E",
          light: "#7C8F58",
          deep: "#414D2C",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      backgroundImage: {
        "grain": "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.035%22/></svg>')",
      },
      keyframes: {
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: "0" },
          "15%": { opacity: "0.55" },
          "50%": { transform: "translateY(-40px) scaleX(1.4)", opacity: "0.35" },
          "100%": { transform: "translateY(-90px) scaleX(1.8)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(4deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        steam1: "steam 3.2s ease-in-out infinite",
        steam2: "steam 3.2s ease-in-out 1s infinite",
        steam3: "steam 3.2s ease-in-out 2s infinite",
        float: "float 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
