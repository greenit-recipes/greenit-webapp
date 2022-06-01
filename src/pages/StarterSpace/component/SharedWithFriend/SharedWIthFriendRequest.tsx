import { gql } from "@apollo/client";

export const SHARED_WITH_FRIENDS_STARTER_PAGE = gql`
  mutation emailSharedWithFriend($email: String!) {
    emailSharedWithFriend(email: $email) {
      success
    }
  }
`;
