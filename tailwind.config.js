/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
    theme: {
        extend: {
            fontFamily: {
                // Montserrat: ["Montserrat", "sans-serif"],
            },
            colors: {
                primary: {
                    DEFAULT: "#7C3AED",
                    dark: "#6D28D9",
                    light: "#DDD6FE",
                },
                error: {
                    DEFAULT: "#FF3D33",
                    dark: "#ea2d24",
                    light: "#ffe1df",
                },
                warning: {
                    DEFAULT: "#FFCC17",
                    dark: "#e2b81e",
                    light: "#ffedaa",
                },
                gray: {
                    DEFAULT: "#525866",
                    dark: "#263238",
                    light: "#E1E4EA",
                },
                pending: {
                    DEFAULT: "#FE5900",
                    dark: "#f56c28",
                    light: "#FFE5D8",
                },
                success: {
                    DEFAULT: "#54BF00",
                    light: "#E0FAEC",
                },
                purple: {
                    DEFAULT: "#7C3AED",
                    dark: "#6D28D9",
                    light: "#DDD6FE",
                },
                indigo: {
                    DEFAULT: "#6366F1",
                    dark: "#4F46E5",
                    light: "#E0E7FF",
                },
                green: {
                    DEFAULT: "#15803D",
                    dark: "#053116",
                    light: "#F0FDF4",
                    custom: "#04A42A",
                },
                blue: {
                    DEFAULT: "#F0F6FF",
                    dark: "#00A4E1",
                    light: "#1347CC",
                },
                black: "#263238",
            },
            animation: {
                progress: "progress 1s infinite linear",
            },
            keyframes: {
                progress: {
                    "0%": { transform: " translateX(0) scaleX(0)" },
                    "40%": { transform: "translateX(0) scaleX(0.4)" },
                    "100%": { transform: "translateX(100%) scaleX(0.5)" },
                },
            },
            transformOrigin: {
                "left-right": "0% 50%",
            },
        },
    },
    plugins: [flowbite.plugin()],
};
