const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        '26': '6.5rem',
        '38': '9.5rem',
        '50': '12.6rem',
        '66': '18rem',
        '84': '22rem',
      },
      height: {
        '26': '6.5rem',
        '38': '9.5rem',
        '50': '12.6rem',
        '66': '18rem',
        '84': '22rem',
      },
      inset: {
        '2/7': '28%',
        '26': '6.5rem',
        '38': '9.5rem',
        '50': '12.6rem',
        '66': '18rem',
        '84': '22rem',
      },
      maxWidth: {
        '26': '26rem',
      },
      minWidth: {
        '10': '2.5rem',
        '18': '18rem',
        '64': '16rem',
        '96': '24rem',
      },
      fontFamily: {
        'body': ["Quicksand-Medium"],
        'legend': ["Quicksand-Light"],
      
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
      
        submit: "#8fb5e7",
        success: "#f9d58e",
        error: "#fec4b0",
        info: "83d489",

        blue: "#8fb5e7",
        yellow: "#f9d58e",
        orange: "#fec4b0",
        green: "#83d489",
        grey: "#a3a3a3"
      },
    },
  },
  variants: {
    extend: {
      animation: ['motion-safe'],
    },
  },
  plugins: [],
};
