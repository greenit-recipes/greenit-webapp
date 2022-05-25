import { gql } from '@apollo/client';

export const EMAIL_ASK_QUESTION_STARTER_PAGE = gql`
  mutation emailAskQuestionStartePage($email: String!, $question: String!) {
    emailAskQuestionStartePage(email: $email, question: $question) {
      success
    }
  }
`;
