import { gql } from '@apollo/client';

export const ADD_USER_TO_NEWSLETTER = gql`
  mutation addUserNotLogToNewsletter($data: NewsletterInput!) {
    createNewsletter(data: $data) {
      success
    }
  }
`;
