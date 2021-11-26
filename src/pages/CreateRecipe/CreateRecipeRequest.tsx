import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation CreateAccount(
    $name: String!
    $description: String!
    $difficulty: String!
    $duration: String!
    $tags: String!
    $category: String!
    $ingredients: String!
    $utensils: String!
    $instructions: String!
    $notes_from_author: String!
  ) {
    register(
      name: $name
      description: $description
      difficulty: $difficulty
      duration: $duration
      tags: $tags
      category: $category
      ingredients: $ingredients
      utensils: $utensils
      instructions: $instructions
      notes_from_author: $notes_from_author
    ) {
      success
      errors
    }
  }
`;

export const CREATE_EMAIL_RECIPE = gql`
  mutation CreateEmailRecipe(
    $name: String!
    $userEmail: String!
    $userUsername: String!
    $userId: String!
    $description: String!
    $image: Upload!
    $video: Upload!
    $duration: Int!
    $tags: [String]!
    $ingredients: [String]!
    $utensils: [String]!
    $notesFromAuthor: String!
    $category: [String]!
    $instructions: [String]!
    $expiry: String!
    $difficulty: DifficultyChoice!
  ) {
    sendEmailRecipe(
      name: $name
      userEmail: $userEmail
      userUsername: $userUsername
      userId: $userId
      description: $description
      image: $image
      video: $video
      duration: $duration
      tags: $tags
      ingredients: $ingredients
      utensils: $utensils
      notesFromAuthor: $notesFromAuthor
      category: $category
      instructions: $instructions
      expiry: $expiry
      difficulty: $difficulty
    ) {
      success
    }
  }
`;

export const GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS = gql`
  query {
    me {
      id
      username
      email
    }
    allCategories {
      id
      name
    }
    allTags {
      id
      name
    }
    allUtensils {
      id
      name
      description
    }
    allIngredients {
      id
      name
      description
    }
  }
`;

export const ADD_OR_REMOVE_LIKE_RECIPE = gql`
  mutation addOrRemoveLikeRecipe($recipeId: String!) {
    addOrRemoveLikeRecipe(recipeId: $recipeId) {
      success
    }
  }
`;


export const ADD_OR_REMOVE_FAVORITE_RECIPE = gql`
  mutation addOrRemoveFavoriteRecipe($recipeId: String!) {
    addOrRemoveFavoriteRecipe(recipeId: $recipeId) {
      success
    }
  }
`;
