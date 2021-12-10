const colors = require("tailwindcss/colors");

module.exports = {
  // purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  purge: {
    enabled: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx,css}', "./public/index.html"
    ],
    options: {
      safelist: [
        "overflow-hidden", 
        "gap-14",
        "order-last",
        "fixed",
        "gap-20",
        "rounded-2xl",
        "rounded-3xl",
        "relative",
        "md:text-2xl",
        "mb-9",
        "ml-9",
        "z-10",
        "h-18",
        "h-20",
        "w-16",
        "w-20",
        "md:w-16",
        "md:h-20",
        "md:h-14",
        "grid-cols-1",
        "md:grid-cols-3",
        "grid-cols-7",
        "md:grid-cols-2",
        "grid-cols-2",
        "sm:grid-cols-4",
        "lg:grid-cols-2",
        "text-green-400",
        "text-pink-700",
      ],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        "light-blue": colors.lightBlue,
        cyan: colors.cyan,
        blue: "#8fb5e7",
        yellow: "#f9d58e",
        orange: "#fec4b0",
        green: "83d489"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};