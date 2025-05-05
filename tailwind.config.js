/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                white: "#ffffff",
                "blue-text": "#040433",
            },
            fontFamily: {
                comic: ['"Comic Relief"', "cursive"],
            },
        },
    },
    plugins: [],
};
