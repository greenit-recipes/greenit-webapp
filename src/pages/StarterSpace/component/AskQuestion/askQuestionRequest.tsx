import { gql } from "@apollo/client";

export const ASK_QUESTION_STARTER_PAGE = gql`
  mutation emailSharedWithFriend($email: String!) {
    emailSharedWithFriend(email: $email) {
      success
    }
  }
`;