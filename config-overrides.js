const {override, addBabelPlugin, disableEsLint, addWebpackPlugin} = require("customize-cra");
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = override(
  disableEsLint(),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  addWebpackPlugin(new PrerenderSPAPlugin({
    routes: ['/', '/recettes','/recettes/deodorant-solide-facile','/recettes/serum-hydratant-naturel-a-laloe-vera'],
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
