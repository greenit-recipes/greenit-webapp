const fs = require('fs');
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
          urlName.push( '/recettes/'+ result.data.allRecipesSeo[i].urlId );
        }
        console.log(urlName)
        fs.writeFile('recettes.json', JSON.stringify(urlName), (err) => {
          if (err) {
            throw err;
          }
          console.log("Recettes Data is saved.");
        })
      });
  } catch(e) {
    console.log(e);
  }
}

generateSitemap();
