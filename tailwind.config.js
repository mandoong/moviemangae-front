/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FCE7F3",
        sub: "",
        mainText: "#4B5563",
        subText: "",
      },

      width: {
        w_main: "700px",
      },

      fontSize: {
        xxs: "10px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
