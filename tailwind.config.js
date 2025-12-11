/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{js,ts,jsx,tsx}",
        "./src/app/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            keyframes: {
                aurora: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                    "100%": { backgroundPosition: "0% 50%" },
                },
            },
            animation: {
                aurora: "aurora 8s ease infinite",
            },
        },
    },
    plugins: [],
};
