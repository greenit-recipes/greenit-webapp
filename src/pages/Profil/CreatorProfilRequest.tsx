import { gql } from '@apollo/client';

export const EMAIL_PROFIL_PAGE_CREATOR = gql`
  mutation emailProfilPage($question: String!) {
    emailProfilPage(question: $question) {
      success
    }
  }
`;
