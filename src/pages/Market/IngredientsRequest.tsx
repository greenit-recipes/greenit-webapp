import { gql } from "@apollo/client";

export const GET_ALL_INGREDIENTS = gql`
  query {
    allIngredients {
      id
      name
      description
      informationMarket
      indication
      precaution
      contenance
      rating
      price
      producer
      image
      tags {
        id
        name
      }
      categoryIngredient {
        id
        name
      }
    }
    allCategories {
      id
      name
    }
  }
`;
