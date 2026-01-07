

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
                brand: {
                    base: "#0064E0", // Classic Blue
                    dark: "#004DAD",
                    light: "#1877F2",
                    surface: "#EBF5FF",
                },
                aesthetic: {
                    50: "#f0f9ff",
                    100: "#e0f2fe",
                    200: "#bae6fd",
                    300: "#7dd3fc",
                    400: "#38bdf8",
                    500: "#0ea5e9", // Sky blue for vibrant gradients
                    600: "#0284c7",
                    700: "#0369a1",
                    800: "#075985",
                    900: "#0c4a6e",
                },
                glass: {
                    border: "rgba(255, 255, 255, 0.2)",
                    surface: "rgba(255, 255, 255, 0.1)",
                    highlight: "rgba(255, 255, 255, 0.5)",
                },
                pastel: {
                    teal: "#99F2C8",
                    lavender: "#C5B9FF",
                    coral: "#FFB7B2",
                    sky: "#A0E7E5",
                    mint: "#B4F8C8",
                    sunny: "#FBE7C6",
                }
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "brand-gradient": "linear-gradient(135deg, #0064E0 0%, #00C6FF 100%)",
                "pastel-dream": "linear-gradient(to top right, #fff1eb 0%, #ace0f9 100%)",
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
