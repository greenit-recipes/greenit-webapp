import { gql } from "@apollo/client";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
    ) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export const LOGIN_ACCOUNT = gql`
  mutation LoginAccount($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      success
      errors
      unarchiving
      token
      refreshToken
      unarchiving
      user {
        id
        username
      }
    }
  }
`;

export const ME = gql`
  query Me{
    me {
      username
      lastName
      email
      verified
    }
  }
`;

class AuthService {
  storageLoginToken(token: string) {
    localStorage.setItem("token", JSON.stringify("JWT " + token));
  }

  storageLoginRefreshToken(token: string) {
    localStorage.setItem("refreshToken", JSON.stringify(token));
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();
