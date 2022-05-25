import { gql } from '@apollo/client';

export const ADD_COMMENT_TO_RECIPE = gql`
  mutation addCommentToRecipe($comment: String!, $recipeId: String!) {
    addCommentToRecipe(comment: $comment, recipeId: $recipeId) {
      success
    }
  }
`;

export const ADD_OR_REMOVE_LIKE_COMMENT = gql`
  mutation addOrRemoveLikeComment($commentId: String!) {
    addOrRemoveLikeComment(commentId: $commentId) {
      success
    }
  }
`;
