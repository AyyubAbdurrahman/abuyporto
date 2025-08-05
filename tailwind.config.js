import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "./resources/js/**/*.js",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                slate: {
                    850: "#1a202c",
                    950: "#0d1117",
                },
                sky: {
                    350: "#7dd3fc",
                    450: "#38bdf8",
                },
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-in-out",
                "slide-in": "slideIn 0.3s ease-out",
                "slide-up": "slideUp 0.3s ease-out",
                "bounce-slow": "bounce 2s infinite",
                "pulse-slow": "pulse 3s infinite",
                float: "float 3s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite alternate",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideIn: {
                    "0%": { transform: "translateX(-100%)" },
                    "100%": { transform: "translateX(0)" },
                },
                slideUp: {
                    "0%": { transform: "translateY(100%)", opacity: "0" },
                    "100%": { transform: "translateY(0)", opacity: "1" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(56, 189, 248, 0.3)" },
                    "100%": { boxShadow: "0 0 30px rgba(56, 189, 248, 0.6)" },
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "gradient-tech":
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
                "gradient-hero":
                    "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
            },
            spacing: {
                18: "4.5rem",
                88: "22rem",
                120: "30rem",
            },
            screens: {
                xs: "475px",
                "3xl": "1920px",
            },
            backdropBlur: {
                xs: "2px",
            },
            borderRadius: {
                "4xl": "2rem",
            },
            boxShadow: {
                glow: "0 0 20px rgba(56, 189, 248, 0.3)",
                "glow-lg": "0 0 40px rgba(56, 189, 248, 0.4)",
                "inner-glow": "inset 0 0 20px rgba(56, 189, 248, 0.1)",
            },
            typography: {
                slate: {
                    css: {
                        "--tw-prose-body": "#cbd5e1",
                        "--tw-prose-headings": "#f1f5f9",
                        "--tw-prose-lead": "#94a3b8",
                        "--tw-prose-links": "#38bdf8",
                        "--tw-prose-bold": "#f1f5f9",
                        "--tw-prose-counters": "#94a3b8",
                        "--tw-prose-bullets": "#64748b",
                        "--tw-prose-hr": "#334155",
                        "--tw-prose-quotes": "#f1f5f9",
                        "--tw-prose-quote-borders": "#334155",
                        "--tw-prose-captions": "#94a3b8",
                        "--tw-prose-code": "#f1f5f9",
                        "--tw-prose-pre-code": "#cbd5e1",
                        "--tw-prose-pre-bg": "#1e293b",
                        "--tw-prose-th-borders": "#334155",
                        "--tw-prose-td-borders": "#1e293b",
                    },
                },
            },
        },
    },

    plugins: [
        forms,
        require("@tailwindcss/typography"),
        // Custom plugin for additional utilities
        function ({ addUtilities, addComponents, theme }) {
            const newUtilities = {
                ".text-shadow": {
                    textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                },
                ".text-shadow-lg": {
                    textShadow: "0 4px 8px rgba(0,0,0,0.7)",
                },
                ".backdrop-blur-xs": {
                    backdropFilter: "blur(2px)",
                },
                ".glass": {
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    border: "1px solid rgba(56, 189, 248, 0.1)",
                },
                ".gradient-text": {
                    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
                    "-webkit-background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                    "background-clip": "text",
                },
            };

            const newComponents = {
                ".btn": {
                    padding: `${theme("spacing.2")} ${theme("spacing.4")}`,
                    borderRadius: theme("borderRadius.md"),
                    fontWeight: theme("fontWeight.medium"),
                    transition: "all 0.2s ease-in-out",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    "&:disabled": {
                        opacity: "0.5",
                        cursor: "not-allowed",
                    },
                },
                ".btn-primary": {
                    backgroundColor: theme("colors.sky.500"),
                    color: theme("colors.white"),
                    "&:hover:not(:disabled)": {
                        backgroundColor: theme("colors.sky.600"),
                    },
                },
                ".btn-secondary": {
                    backgroundColor: "transparent",
                    color: theme("colors.slate.300"),
                    border: `1px solid ${theme("colors.slate.600")}`,
                    "&:hover:not(:disabled)": {
                        backgroundColor: theme("colors.slate.700"),
                        color: theme("colors.sky.400"),
                        borderColor: theme("colors.sky.400"),
                    },
                },
                ".card": {
                    backgroundColor: theme("colors.slate.800"),
                    borderRadius: theme("borderRadius.lg"),
                    border: `1px solid ${theme("colors.slate.700")}`,
                    padding: theme("spacing.6"),
                },
                ".input": {
                    width: "100%",
                    padding: `${theme("spacing.3")} ${theme("spacing.4")}`,
                    backgroundColor: theme("colors.slate.800"),
                    border: `1px solid ${theme("colors.slate.700")}`,
                    borderRadius: theme("borderRadius.lg"),
                    color: theme("colors.slate.100"),
                    "&::placeholder": {
                        color: theme("colors.slate.400"),
                    },
                    "&:focus": {
                        outline: "none",
                        borderColor: theme("colors.sky.400"),
                        boxShadow: `0 0 0 1px ${theme("colors.sky.400")}`,
                    },
                },
            };

            addUtilities(newUtilities);
            addComponents(newComponents);
        },
    ],
};
