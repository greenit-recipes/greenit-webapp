const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: false, // or 'media' or 'class'
  purge: {
    enabled: true,
    content: [
      './src/**/*.{js,jsx,ts,tsx,css}', "./public/index.html"
    ],
    options: {
      safelist: [ // TO REMOVE COLOR DONT WORK WHEN PURGING
        "rounded-md",
        "md:h-14",
        "md:h-9",
        /hover:text-/,
        /hover:bg-/,
        /hover:border-/
      ],
    },
  }, variants: {
    extend: {},
  },
  plugins: [],
  theme: {
    screens: {
      'mlg': {'max': '1024px'},
      'mmd': {'max': '768px'},
      'msm': {'max': '640px'},
      ...defaultTheme.screens
    },
    colors: {
      // Base COLOR
      transparent: 'transparent',
      current: 'currentColor',
      blue: "#609DED",
      yellow: "#FCCB6C",
      orange: "#FFA781",
      grey: "#707070",
      black: "#1C1C1C",
      red: "#E24E51",
      white: '#ffffff',
      green: "#4BCB6A",
    },
    extend: {
      // fontSize: {
      //   xl: ['20px', '24px'],
      // },
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
        '14': '3.5rem', /* 56px */
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

      keyframes: {
        rotate: {
          "50%": { transform: "rotate(90deg)" },
        }
      },
      colors: {
        greenL: "#DEF7E4",
        blueL: "#D6E6FA",
        orangeL: "#FCDED1",
        yellowL: "#FFEAC1",
        greyL: "#F0F0F0",
        redL: "#ED6D6D",
        inactive: "#F2F2F2",
        active: "#1CC466",
      },
      animation: {
        rotate: "rotate 200ms ease-in"
      },
      fontFamily: {
        light: ['QuickSand_Light.ttf'],
        medium: ['QuickSand_Medium.ttf'],
        regular: ['QuickSand_Regular.ttf'],
        semibold: ['QuickSand_SemiBold.ttf'],
        bold: ['QuickSand_Bold.ttf'],
        body: ["Quicksand-Medium"],
        legend: ["Quicksand-Light"],
      },
    }
  },

};