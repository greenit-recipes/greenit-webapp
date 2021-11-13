import { gql } from "@apollo/client";
import { client } from "index";
import { isEmpty } from "lodash";

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
  query Me {
    me {
      username
      lastName
      email
      verified
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
mutation {
  verifyToken(
    token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6InNreXdhbGtlciIsImV4cCI6MTU3OTQ1ODY3Miwib3JpZ0lhdCI6MTU3OTQ1ODM3Mn0.rrB4sMA-v7asrr8Z2ru69U1x-d98DuEJVBnG2F1C1S0"
  ) {
    success,
    errors,
    payload
  }
}`;

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
    localStorage.removeItem("user");
    localStorage.removeItem("refreshToken");
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
