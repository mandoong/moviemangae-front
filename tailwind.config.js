/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#FCE7F3",
        prime: "#101322",
        sub: "#25304a",
        sub2: "#172036",
        primeText: "#efefef",
        subText: "#98a4b7",
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
