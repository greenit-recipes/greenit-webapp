const {override, addBabelPlugin, disableEsLint, addWebpackPlugin} = require("customize-cra");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = override(
  disableEsLint(),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  //Babel Plugins
  addBabelPlugin([
    "transform-imports", {
    "lodash": {
      "transform": "lodash/${member}",
      "preventFullImport": true
    }
  }]),
  addBabelPlugin([
    "transform-react-remove-prop-types",
    {
      "removeImport": true
    }
  ]),
)
