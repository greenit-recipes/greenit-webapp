require("babel-register")({
  presets: ["es2015", "react"]
});

const router = require("./sitemap-routes.tsx").default;
const Sitemap = require("react-router-sitemap").default;
const fetch = require("node-fetch").default;

  async function generateSitemap() {
    try {

      fetch('https://greenitcommunity.com/graphql/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query allRecipesSeo {
            allRecipesSeo {
                urlId
            }
          }
            `
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          let urlName = [];

          for(var i = 0; i < result.data.allRecipesSeo.length; i++) {
            console.log(result.data.allRecipesSeo[i])
            urlName.push({ name: result.data.allRecipesSeo[i].urlId });
          }
      
          const paramsConfig = {
            "/recettes/:name": urlName
          };
          console.log('paramsConfig', paramsConfig)
          console.log('QUAND LE SITE MAP EST EN PROD VOUS DEVEZ PING GOOGLE QUE LE SITE MAP A CHANGE')
          return (
            new Sitemap(router)
                .applyParams(paramsConfig)
                .build("https://greenitcommunity.com/")
                .save("./public/sitemap.xml")
          );
        });
    } catch(e) {
      console.log(e);
    } 
}

generateSitemap();