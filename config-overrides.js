const {override, addBabelPlugin, disableEsLint, addWebpackPlugin} = require("customize-cra");
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path');
const fs = require('fs');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let recettes = []
fs.readFile('scripts/recettes.json', 'utf-8', (err, data) => {
  if (err) {
    throw err;
  }

  // parse JSON object
  recettes = JSON.parse(data.toString());
})

module.exports = override(
  disableEsLint(),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackPlugin(new PrerenderSPAPlugin({
    routes: ['/', '/recettes'] + recettes,
    staticDir: path.join(__dirname, 'build'),
    renderer: new Renderer({
      renderAfterTime: 5000
    }),
  })),
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
