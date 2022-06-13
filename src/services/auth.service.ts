import { gql } from "@apollo/client";
import { history, RouteName } from "App";
import { client } from "index";
import { isEmpty } from "lodash";
import { includes } from "lodash";

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount(
    $email: String!
    $username: String!
    $password1: String!
    $password2: String!
    $isFollowNewsletter: String!
    $isBeginnerBox: Boolean
    $userCategoryLvl: String
    $userCategoryAge: String
    $urlsSocialMedia: JSONString
    $biographie: String
    $isCreatorProfil: String
  ) {
    register(
      email: $email
      username: $username
      password1: $password1
      password2: $password2
      userCategoryLvl: $userCategoryLvl
      userCategoryAge: $userCategoryAge
      isFollowNewsletter: $isFollowNewsletter
      isBeginnerBox: $isBeginnerBox
      urlsSocialMedia: $urlsSocialMedia
      biographie: $biographie
      isCreatorProfil: $isCreatorProfil
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

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $token: String!
    $password1: String!
    $password2: String!
  ) {
    passwordReset(
      token: $token
      newPassword1: $password1
      newPassword2: $password2
    ) {
      success
      errors
    }
  }
`;

export const SEND_EMAIL_RESET_PASSWORD = gql`
  mutation SendEmailResetPassword($email: String!) {
    sendPasswordResetEmail(email: $email) {
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

export const CREATE_USER_FROM_AUTH = gql`
  mutation CreateUserFromAuth(
    $email: String!
    $username: String!
    $password: String!
    $isFollowNewsletter: String
    $isBeginnerBox: Boolean
    $idFacebook: String
    $idGoogle: String
    $imageUrl: String
  ) {
    createUserFromAuth(
      email: $email
      username: $username
      password: $password
      isFollowNewsletter: $isFollowNewsletter
      isBeginnerBox: $isBeginnerBox
      idFacebook: $idFacebook
      idGoogle: $idGoogle
      imageUrl: $imageUrl
    ) {
      isUserAlreadyCreated
      errors
    }
  }
`;

export const UPDATE_IMAGE_ACCOUNT = gql`
  mutation UpdateImageAccount($imageProfile: Upload!) {
    updateImageAccount(imageProfile: $imageProfile) {
      success
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation updateAccount($urlsSocialMedia: JSONString, $biographie: String) {
    updateAccount(urlsSocialMedia: $urlsSocialMedia, biographie: $biographie) {
      success
      errors
    }
  }
`;

export const PLUS_OR_LESS_RECIPE = gql`
  mutation plusOrLessMadeRecipe($recipeId: String!, $isLess: Boolean!) {
    plusOrLessMadeRecipe(recipeId: $recipeId, isLess: $isLess) {
      success
    }
  }
`;

export const ME = gql`
  query Me {
    me {
      username
      lastName
      photoUrl
      email
      idFacebook
      verified
      imageProfile
      biographie
      isCreatorProfil
      urlsSocialMedia
      isBeginnerBox
      isRecipeMadeBeginnerBox
      recipeAuthor {
        id
        urlId
        name
        image
        duration
        difficulty
        numberOfLikes
        numberOfIngredients
        nbrView
      }
      recipeMadeUser {
        recipe {
          id
          urlId
          name
          image
          moneySaved
          plasticSaved
          numberOfSubstances
        }
        amount
      }
      recipeFavorite {
        id
        urlId
        name
        image
        duration
        difficulty
        numberOfLikes
        numberOfFavorites
        numberOfIngredients
        isLikedByCurrentUser
        isAddToFavoriteByCurrentUser
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

export const WELCOME_NEW_USER = gql`
  mutation EmailWelcomeNewUser($email: String!) {
    emailWelcomeNewUser(email: $email) {
      success
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

  setStorageEmail(email: string) {
    localStorage.setItem("email", email);
  }

  getEmail(): string | null {
    return localStorage.getItem("email");
  }

  getToken(): string | null {
    return localStorage.getItem("token");
  }

  getRefreshToken(): string | null {
    return localStorage.getItem("refreshToken");
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    history.push("/");
  }

  removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  }

  //Todo : Check Auth State securely
  isLoggedIn() {
    return !isEmpty(this.getToken());
  }

  isRedirectToProfil(pathname: string) {
    return (
      pathname === RouteName.activateResetPassword ||
      includes(pathname, RouteName.resetPassword) ||
      includes(pathname, "activate") ||
      includes(pathname, RouteName.tokenActivationAccount) ||
      includes(pathname, RouteName.accueil) ||
      pathname === RouteName.register ||
      //Full Xp Params
      pathname === RouteName.qrFullXp
    );
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
