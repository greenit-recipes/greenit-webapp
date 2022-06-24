import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder(
    $firstName: String!
    $lastName: String!
    $email: String!
    $adressse: String!
    $postalCode: String!
    $city: String!
    $complementAdresse: String!
    $phone: String!
  ) {
    createOrder(
      data: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        adressse: $adressse
        postalCode: $postalCode
        city: $city
        complementAdresse: $complementAdresse
        phone: $phone
      }
    ) {
      success
    }
  }
`;

export const EMAIL_GREENIT_FULL_XP = gql`
  mutation EmailGreenitFullXp($question: String!, $typeEmail: String!) {
    emailGreenitFullXp(question: $question, typeEmail: $typeEmail) {
      success
    }
  }
`;
