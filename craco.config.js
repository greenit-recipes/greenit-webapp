// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require("postcss-preset-env")({ stage: 0 }),
        require("tailwindcss"),
        require("autoprefixer"),
      ],
    },
  },
};
