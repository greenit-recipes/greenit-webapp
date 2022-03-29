// craco.config.js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require("tailwindcss"),
        require("autoprefixer"),
        
      ],
    },
  },
  webpack: {
    plugins: [
      //new BundleAnalyzerPlugin()
    ]
  },
  babel: {
    "plugins": [
      ["transform-imports", {
        "lodash": {
          "transform": "lodash/${member}",
          "preventFullImport": true
        }
      }]]
  }
};
