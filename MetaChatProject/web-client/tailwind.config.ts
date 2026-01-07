

import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                meta: {
                    base: "#0064E0", // Classic Meta Blue
                    dark: "#004DAD",
                    light: "#1877F2",
                    surface: "#EBF5FF",
                },
                pastel: {
                    teal: "#2dd4bf",     // Teal-400
                    lavender: "#a78bfa", // Violet-400
                    coral: "#fb7185",    // Rose-400
                    sky: "#38bdf8",      // Sky-400
                    mint: "#6ee7b7",     // Emerald-300
                    sunny: "#fcd34d",    // Amber-300
                },
                glass: {
                    border: "rgba(255, 255, 255, 0.2)",
                    surface: "rgba(255, 255, 255, 0.1)",
                    highlight: "rgba(255, 255, 255, 0.5)",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "meta-gradient": "linear-gradient(135deg, #0064E0 0%, #00C6FF 100%)",
                "pastel-dream": "linear-gradient(to right bottom, #f0f9ff, #cbebff, #e0e7ff, #fae8ff, #ffe4e6)",
                "deep-space": "linear-gradient(to bottom, #020617, #0f172a, #1e293b)",
            },
            animation: {
                "float": "float 5s ease-in-out infinite",
                "spin-slow": "spin 6s linear infinite",
                "pulse-slow": "pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};
