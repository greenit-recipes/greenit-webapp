const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  purge: false,
  theme: {
    extend: {
      borderWidth: { 
        '1': '1px'
      },
      width: {
        '26': '6.5rem',
        '38': '9.5rem',
        '50': '12.6rem',
        '66': '18rem',
        '84': '22rem',
        '99': '30rem',
      },
      height: {
        '18': '4.5rem',
        '26': '6.5rem',
        '38': '9.5rem',
        '50': '12.6rem',
        '66': '18rem',
        '84': '22rem',
        '98': '26rem',
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
        '90': '90rem',
        '26': '26rem',
        '20': '20rem',
        '12': '16rem',
        '8': '12rem',
      },
      minWidth: {
        '10': '2.5rem',
        '14': '14rem',
        '18': '18rem',
        '64': '16rem',
        '96': '24rem',
      },
      margin: {        
        '100': '33rem',
        '99': '28rem',            
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
        grey: "#707070",
        red: "#f07b73",
        bluelight: "#e0eaf8",
      },

      keyframes: {
        rotate: {
          "50%": { transform: "rotate(90deg)" },
        }
      },
      animation: {
        rotate: "rotate 200ms ease-in"
      },
      fontFamily: {
        medium: ['QuickSand_Medium.tff'],
        bold: ['QuickSand_Bold.tff'],    
      },
    },
  },
};
