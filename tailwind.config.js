const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    mode: 'jit',
    darkMode: false, // or 'media' or 'class'
    content: [
        './src/**/*.{js,jsx,ts,tsx,css}', "./public/index.html"
    ],
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
            blue: "#5A99ED",
            darkBlue: "#192A51",
            yellow: "#FBC14B",
            orange: "#FFA781",
            black: "#1C1C1C",
            grey: "#707070",
            red: "#DE563F",
            white: '#FFFFFF',
            green: "#41C863",
        },
        extend: {
            fontSize: {
                '3.5xl': '2rem'
            },
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
                    "50%": {transform: "rotate(90deg)"},
                }
            },
            colors: {
                greenL: "#E9FAEC",
                blueL: "#F0F5FD",
                orangeL: "#FFF3EF",
                yellowL: "#FFF7E7",
                greyL: "#F0F0F0",
                redL: "#ED6D6D",
                inactive: "#F2F2F2",
                active: "#1CC466",
            },
            animation: {
                rotate: "rotate 200ms ease-in"
            },
            fontFamily: {
                light: ['ZenMaruGothic_Light'],
                medium: ['ZenMaruGothic_Medium'],
                regular: ['ZenMaruGothic-Regular'],
                semibold: ['ZenMaruGothic-Regular'],
                bold: ['ZenMaruGothic_Bold'],
                body: ["ZenMaruGothic_Medium"],
                legend: ["ZenMaruGothic_Light"],
            },
        }
    },
};
