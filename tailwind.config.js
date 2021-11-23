const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      maxWidth: {
        '26': '26rem',
      },
      minWidth: {
        '18': '18rem',
      },
      fontFamily: {
        'body': ["Quicksand-Medium"],
        'legend': ["Quicksand-Light"],

        'light': ['Quicksand-Light'],
        'medium': ['Quicksand-Medium'],
        'regular': ['Quicksand-Regular'],
        'semiBold': ['Quicksand-SemiBold'],
        'bold': ['Quicksand-Bold'],
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
      
        signin: "#8fb5e7",
        success: "#f9d58e",
        error: "#fec4b0",
        info: "83d489",

        blue: "#8fb5e7",
        yellow: "#f9d58e",
        orange: "#fec4b0",
        green: "#83d489"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
