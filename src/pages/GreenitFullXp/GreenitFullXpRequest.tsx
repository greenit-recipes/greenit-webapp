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
