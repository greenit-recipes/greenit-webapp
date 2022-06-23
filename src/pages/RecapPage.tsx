import { Helmet } from "react-helmet";
import { gql, useQuery } from "@apollo/client";
import { map } from "lodash";
import { RouteName } from "App";

const GET_ALL_RECIPE_SEO = gql`
  query allRecipesSeo {
    allRecipesSeo {
      urlId
    }
  }
`;

const RecapPage = () => {
  const { loading, data, refetch } = useQuery(GET_ALL_RECIPE_SEO, {
    fetchPolicy: "no-cache",
  });
  const itemList = map(data?.allRecipesSeo, (x, index) => {
    return {
      "@type": "ListItem",
      position: index + 1,
      url: "https://greenitcommunity.com" + RouteName.recipes + "/" + x?.urlId,
    };
  });
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: itemList,
        })}
      </script>
    </Helmet>
  );
};

export default RecapPage;
