import { RouteName } from "App";
import { Helmet } from "react-helmet";

<Helmet>
  <title>Toutes les recettes pour vos produits fait maison</title>
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          url: "https://greenitcommunity.com/recipes/deodorant-solide-facile/",
        },
      ],
    })}
  </script>
</Helmet>;
