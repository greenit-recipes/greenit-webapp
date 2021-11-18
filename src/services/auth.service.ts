import { gql } from "@apollo/client";
import { history } from "App";
import { client } from "index";
import { isEmpty } from "lodash";

export const CREATE_ACCOUNT = gql`
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

export const RESEND_ACTIVATION_EMAIL = gql`
  mutation ResendActivationEmail($email: String!) {
    resendActivationEmail(email: $email) {
      success
      errors
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
  query Me {
    me {
      username
      lastName
      email
      verified
      recipeAuthor {
        id
        urlId
        name
        image
        duration
        difficulty
        category {
          name
        }
      }
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation RefreshToken($refreshToken: String!) {
    refreshToken(refreshToken: $refreshToken) {
      token
      payload
      success
      errors
      refreshToken
    }
  }
`;

export const VERIFY_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      success
      errors
      payload
    }
  }
`;

export const VERIFY_ACCOUNT = gql`
  mutation VerifyAccount($token: String!) {
    verifyAccount(token: $token) {
      success
      errors
    }
  }
`;

class Auth {
  setStorageLoginToken(token: string) {
    localStorage.setItem("token", token);
  }

  setStorageLoginRefreshToken(token: string) {
    localStorage.setItem("refreshToken", token);
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  logout() {
    // Ne pas oublier de révoquer les tokens
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    history.push("/");
  }

  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  isLoggedIn() {
    return !isEmpty(this.getToken());
  }

  requestRefreshToken = async () => {
    return await client.mutate({
      mutation: REFRESH_TOKEN,
      variables: {
        refreshToken: this.getRefreshToken(),
      },
    });
  };

  verifyToken = async () => {
    const response = await client.mutate({
      mutation: VERIFY_TOKEN,
      variables: {
        token: this.getToken(),
      },
    });
    return response;
  };
}

export default new Auth();
