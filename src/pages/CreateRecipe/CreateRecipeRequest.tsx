import { gql } from "@apollo/client";

export const CREATE_RECIPE = gql`
  mutation CreateAccount(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
    $userCategoryLvl: String!
    $userCategoryAge: String!
    $userWantFromGreenit: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
      userCategoryLvl: $userCategoryLvl
      userCategoryAge: $userCategoryAge
      userWantFromGreenit: $userWantFromGreenit
    ) {
      success
      errors
    }
  }
`;