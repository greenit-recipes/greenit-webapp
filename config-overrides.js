const {override, addBabelPlugin, disableEsLint, addWebpackPlugin} = require("customize-cra");
const PrerenderSPAPlugin = require('@dreysolano/prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
const path = require('path');
const fs = require('fs');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const recettes = [
  "/recettes/creme-pour-les-mains-seches",
  "/recettes/masque-cheveux-secs",
  "/recettes/cataplasme-aux-algues-pour-maigrir",
  "/recettes/lotion-nettoyante-au-miel-et-verveine",
  "/recettes/liquide-vaisselle-bio",
  "/recettes/deodorant-solide-facile",
  "/recettes/masque-a-lavocat",
  "/recettes/liquide-vaisselle-au-savon-noir",
  "/recettes/soin-cheveux-demelant-a-la-poudre-de-guimauve",
  "/recettes/shampoing-solide-au-lotus",
  "/recettes/nettoyant-toutes-surfaces",
  "/recettes/baume-deodorant",
  "/recettes/baume-anti-moustiques",
  "/recettes/gel-douche-liquide-saveur-agrumes",
  "/recettes/bain-dhuile-cheveux",
  "/recettes/dentifrice-solide-personnalisable",
  "/recettes/creme-reparatrice-peaux-abimees",
  "/recettes/masque-detoxifant-visage",
  "/recettes/shampooing-solide-a-la-mangue",
  "/recettes/baume-contour-des-yeux",
  "/recettes/lait-demaquillant-pour-peaux-matures",
  "/recettes/creme-de-jour-coup-declat",
  "/recettes/nettoyant-pour-parquet",
  "/recettes/gommage-visage-naturel-au-bicarbonate-de-soude",
  "/recettes/shampooing-solide-anti-squames",
  "/recettes/huile-de-massage-detente",
  "/recettes/huile-de-beaute-regeneratrice",
  "/recettes/beewrap",
  "/recettes/masque-visage-antioxydant",
  "/recettes/masque-anti-rougeurs",
  "/recettes/bougies-detente",
  "/recettes/shampooing-solide-coco-argile",
  "/recettes/savon-solide-saveur-gourmande",
  "/recettes/gel-de-lin-maison",
  "/recettes/huile-de-massage-anti-crampes",
  "/recettes/masque-cheveux-gras",
  "/recettes/gommage-cafe-et-argan",
  "/recettes/creme-anti-cernes-et-anti-poches",
  "/recettes/sel-de-bain-pour-une-meilleure-circulation",
  "/recettes/baume-a-levres-colore",
  "/recettes/apres-shampooing-demelant-a-laloe-vera",
  "/recettes/sel-de-bain-detente-a-la-lavande",
  "/recettes/shampooing-solide-aux-odeurs-florales",
  "/recettes/baume-levres-gercees-et-mains-abimees",
  "/recettes/creme-pour-les-pieds-secs",
  "/recettes/masque-visage-anti-oxydant",
  "/recettes/creme-solide-pour-les-mains",
  "/recettes/lessive",
  "/recettes/lotion-tonique-a-la-mandarine",
  "/recettes/creme-apres-rasage-apaisante",
  "/recettes/masque-visage-anti-point-noir",
  "/recettes/pastille-wc",
  "/recettes/gommage-cafe-et-miel",
  "/recettes/autobronzant-naturel",
  "/recettes/desodorisant-chaussures",
  "/recettes/creme-de-jour-peaux-a-problemes",
  "/recettes/dentifrice-solide",
  "/recettes/masque-apaisant-visage",
  "/recettes/spray-nettoyant-anti-calcaire",
  "/recettes/bi-phase-ultra-purifiante-peau-dado",
  "/recettes/beurre-corporel-nourrissant-pour-peaux-seches",
  "/recettes/creme-pour-le-corps-hydratante-a-la-vanille",
  "/recettes/creme-de-jour-anti-rides",
  "/recettes/masque-purifiant-peaux-grasses",
  "/recettes/masque-visage-detox",
  "/recettes/savon-solide-tout-en-un",
  "/recettes/galet-de-gommage",
  "/recettes/masque-cheveux-au-monoi",
  "/recettes/adoucissant-ecolo-et-zero-dechet",
  "/recettes/chantilly-de-karite",
  "/recettes/nettoyant-pour-vitre-aux-agrumes",
  "/recettes/creme-anti-cernes",
  "/recettes/masque-pour-peaux-acneiques",
  "/recettes/sauna-facial-purifiant",
  "/recettes/lessive-au-geranium",
  "/recettes/shampooing-barre-pour-des-cheveux-brillants",
  "/recettes/nettoyant-sec-pour-tissu",
  "/recettes/lessive-express",
  "/recettes/shampooing-sec",
  "/recettes/lait-demaquillant-a-lhuile-dolive",
  "/recettes/macerat-huileux-de-calendula-maison",
  "/recettes/liquide-vaisselle",
  "/recettes/no-poo-a-lhibiscus",
  "/recettes/deodorant-solide",
  "/recettes/lotion-nettoyante-simplissime",
  "/recettes/anti-envahisseur-acne",
  "/recettes/desodorisant-maison",
  "/recettes/creme-pour-peau-dado",
  "/recettes/poudre-apaisante-pour-les-dents",
  "/recettes/baume-demaquillant-au-geranium",
  "/recettes/apres-shampooing-a-la-coco",
  "/recettes/apres-shampooing-solide-fruite",
  "/recettes/synergie-cure-detox",
  "/recettes/gommage-pour-le-corps-facile",
  "/recettes/savon-doux-pour-bebe",
  "/recettes/shampooing-pour-cheveux-colores",
  "/recettes/apres-shampooing-karite",
  "/recettes/dosette-machine-a-laver",
  "/recettes/lotion-apres-rasage-rafraichissante",
  "/recettes/baume-nourrissant-karite",
  "/recettes/gloss-ultra-brillant",
  "/recettes/soins-des-cils",
  "/recettes/creme-de-jour-debutant",
  "/recettes/serum-anti-age",
  "/recettes/bougie-de-massage-aphrodisiaque",
  "/recettes/demaquillant-bi-phase",
  "/recettes/brume-de-reveil-regenerante",
  "/recettes/mousse-a-raser",
  "/recettes/masque-cheveux-brillants",
  "/recettes/creme-de-jour-fouettee-hydratante",
  "/recettes/shampooing-vegetale-minute",
  "/recettes/roll-on-anti-stress",
  "/recettes/serum-hydratant-naturel-a-laloe-vera",
  "/recettes/creme-apaisante-coup-de-soleil",
  "/recettes/savon-simple-melt-and-pour",
  "/recettes/masque-cheveux-anti-pellicules-et-anti-squames",
  "/recettes/huile-circulatoire-pour-les-jambes",
  "/recettes/dentifrice-haleine-fraiche",
  "/recettes/masque-visage-au-chocolat",
  "/recettes/masque-repulpant-a-la-spiruline",
  "/recettes/mascara-100-naturel",
  "/recettes/masque-a-largile-pour-peaux-sensibles",
  "/recettes/creme-hydratante-gardenia-et-oranger",
  "/recettes/film-alimentaire-zero-dechet",
  "/recettes/pain-dargile-rouge",
  "/recettes/lessive-liquide-maison",
  "/recettes/baume-demaquillant-aux-senteurs-fruitees",
  "/recettes/masque-sos-cheveux-plats",
  "/recettes/no-poo-gainant",
  "/recettes/synergie-calmante",
  "/recettes/spray-anti-acarien",
  "/recettes/gommage-pour-le-corps-coco-et-cafe",
  "/recettes/bougie-a-la-vanille",
  "/recettes/serum-pointes-seches-pour-les-cheveux-frises",
  "/recettes/no-poo-anti-demangeaisons",
  "/recettes/soin-cheveux-nourrissant-a-leau-de-riz",
  "/recettes/synergie-anti-ballonnements",
  "/recettes/shampoing-sauvetage-pour-cheveux-deprimes",
  "/recettes/cataplasme-pour-soigner-lacne",
  "/recettes/anti-taches-vetements",
  "/recettes/vinaigre-de-rincage-pour-cheveux",
  "/recettes/shampooing-liquide-aux-odeurs-fleuries",
  "/recettes/elixir-reparateur-pointes-seches-et-abimees",
  "/recettes/eau-douceur-pour-bebe",
  "/recettes/huile-seche-pailletee",
  "/recettes/masque-extra-pousse",
  "/recettes/masque-cheveux-gras-a-rengraissant-vite",
  "/recettes/baume-a-levres",
  "/recettes/masque-nettoyant-pour-peaux-a-problemes"
]

module.exports = override(
  disableEsLint(),
  // addWebpackPlugin(new BundleAnalyzerPlugin()),
  process.env.NODE_ENV === "production" && addWebpackPlugin(new PrerenderSPAPlugin({
    routes: ['/', '/recettes'].concat(recettes),
    staticDir: path.join(__dirname, 'build'),
    renderer: new Renderer({
      renderAfterTime: 3000,
      timeout: 60000,
      injectProperty: "__PRERENDER_INJECTED",
      inject: {
        prerendered: false,
      },
      headless: true,
      ignoreHTTPSErrors: true,
      maxConcurrentRoutes: 4,
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
  process.env.NODE_ENV === "production" && addBabelPlugin([
    "transform-react-remove-prop-types",
    {
      "removeImport": true
    }
  ]),
)
