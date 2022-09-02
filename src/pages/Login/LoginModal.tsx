import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button } from "components";
import useIsMobile from "hooks/isMobile";
import { mdpNonVisible, mdpVisible } from "icons";
import { IoLogoFacebook } from "react-icons/io5";
import { omit } from "lodash";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import authService, {
  CREATE_USER_FROM_AUTH,
  LOGIN_ACCOUNT,
  UPDATE_PARTICULARITIES_ACCOUNT,
} from "services/auth.service";
import * as yup from "yup";
import "./LoginModal.css";
import { BiLoaderAlt } from "react-icons/bi";
import {
  beginnerBoxCookieExist,
  HAS_PURCHASED_BEGINNER_BOX,
  persistBoxPurchaseOnFirstLogin,
  persistBoxPurchaseOnRegister,
} from "../../services/boxfullxp.service";
import { gapi } from "gapi-script";
import {
  persistIngredientAtHomeOnFirstLogin,
  persistParticularityOnFirstLogin,
} from "../../components/personalization/PersonalizationHelper";
import { ADD_OR_REMOVE_INGREDIENT_AT_HOME } from "../recipe/SinglePage/SinglePage-helper";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  password: yup
    .string()
    .max(
      32,
      "Mot de passe trop long, il doit être moins de 32 caractères maximum.",
    )
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule.",
    ),
}); // _ - .

export const LoginModal: React.FC<{ loginOpen: any }> = ({ loginOpen }) => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [loginAccount, { data, loading, error }] = useMutation(LOGIN_ACCOUNT, {
    errorPolicy: "all",
  });
  const [hasPurchasedBeginnerBox] = useMutation(HAS_PURCHASED_BEGINNER_BOX, {
    errorPolicy: "all",
  });
  const [updateParticularitiesAccount] = useMutation(
    UPDATE_PARTICULARITIES_ACCOUNT,
    { errorPolicy: "all" },
  );
  const [
    createOrDeleteIngredientAtHomeUser,
    { data: createOrDeleteICMdata, loading: loadingICM, error: errorICM },
  ] = useMutation(ADD_OR_REMOVE_INGREDIENT_AT_HOME, { errorPolicy: "all" });

  const [errorLoginFb, setErrorLoginFb] = useState("");
  const [errorLoginGoogle, setErrorLoginGoogle] = useState("");

  const [
    authLogin,
    { data: dataAuth, loading: loadingAuth, error: errorAuth },
  ] = useMutation(CREATE_USER_FROM_AUTH, {
    errorPolicy: "all",
  });

  const responseGoogle = (responseGoogle: any) => {
    let variables: any = {
      email: responseGoogle?.profileObj.email,
      username: responseGoogle?.profileObj.name,
      password: process.env.REACT_APP_PASSWORD + responseGoogle?.profileObj.id,
      idGoogle: responseGoogle?.profileObj.googleId,
      isFollowNewsletter: "false",
      imageUrl: responseGoogle?.profileObj.imageUrl,
      isBeginnerBox: true,
    };
    //Add the field optionally to avoid defaults
    if (!persistBoxPurchaseOnRegister()) {
      variables = omit(variables, ["isBeginnerBox"]);
    }
    // Error si pas d'email

    if (responseGoogle?.profileObj.status === "unknown") {
      return;
    }

    authLogin({
      variables,
    }).then(response => {
      // @ts-ignore
      if (response?.data?.createUserFromAuth?.errors) {
        setErrorLoginFb(response?.data?.createUserFromAuth?.errors);
        return;
      }
      const data = {
        email: responseGoogle?.profileObj.email,
        password:
          process.env.REACT_APP_PASSWORD + responseGoogle?.profileObj.id,
      };
      onSubmitHandler(data);
    });
  };

  const errorGoogle = (response: any) => {
    setErrorLoginGoogle("Une erreur est survenue");
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);
  // Error for graphql call
  React.useEffect(() => {
    if (data?.tokenAuth?.success === false || error) {
      if (
        data?.tokenAuth?.errors?.nonFieldErrors?.[0]?.code ===
        "invalid_credentials"
      ) {
        setError("email", {
          message: "L'email ou le mot de passe est invalide.",
        });
        setError("password", {
          message: "L'email ou le mot de passe est invalide.",
        });
      }

      if (
        data?.tokenAuth?.errors?.nonFieldErrors?.[0]?.code === "not_verified"
      ) {
        setError("password", {
          message: "Activer votre compte dans les mails.",
        });
      }
    }
  }, [setError, error, data]);

  const isMobile = useIsMobile();
  const location = useLocation();

  const responseFacebook = (responseFb: any) => {
    let variables: any = {
      email: responseFb.email,
      username: responseFb.name,
      password: process.env.REACT_APP_PASSWORD + responseFb.id,
      idFacebook: responseFb.id,
      isFollowNewsletter: "false",
      isBeginnerBox: true,
    };
    //Add the field optionally to avoid defaults
    if (!persistBoxPurchaseOnRegister()) {
      variables = omit(variables, ["isBeginnerBox"]);
    }
    // Error si pas d'email

    if (responseFb.status === "unknown") {
      return;
    }

    authLogin({
      variables,
    }).then(response => {
      // @ts-ignore
      if (response?.data?.createUserFromAuth?.errors) {
        setErrorLoginFb(response?.data?.createUserFromAuth?.errors);
        return;
      }
      const data = {
        email: responseFb.email,
        password: process.env.REACT_APP_PASSWORD + responseFb.id,
      };
      console.log("google login");
      onSubmitHandler(data);
    });
  };

  // En faite une function (log)
  const onSubmitHandler = (data: { email: string; password: string }) => {
    loginAccount({
      variables: {
        email: data.email,
        password: data.password,
      },
    }).then(response => {
      if (response?.data?.tokenAuth?.token) {
        //Persisting Temporary cookies
        if (beginnerBoxCookieExist()) {
          persistBoxPurchaseOnFirstLogin(hasPurchasedBeginnerBox);
        }
        persistParticularityOnFirstLogin(updateParticularitiesAccount);
        persistIngredientAtHomeOnFirstLogin(createOrDeleteIngredientAtHomeUser);

        authService.setStorageLoginToken(response?.data?.tokenAuth?.token);
        authService.setStorageLoginRefreshToken(
          response?.data?.tokenAuth?.refreshToken,
        );
        if (authService.isRedirectToProfil(location?.pathname)) {
          history.push("/profil");
        }
        window.location.reload();
      }
    });
    reset({ ...getValues(), password: "" });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <>
      <div
        className={`flex ${
          isMobile ? "" : "login-modal-size"
        } flex-col items-center justify-items-center`}
      >
        <div className="flex flex-col items-center justify-center mobile">
          <div className="text-xl font-bold text-center">
            <h3>Connexion</h3>
          </div>
          <div>
            <p
              onClick={() => loginOpen(false)}
              id="modal-connexion-pas-encore-de-compte"
              className="md:my-4 text-sm text-center text-darkBlue underline cursor-pointer md:text-base"
            >
              Pas encore de compte ? Crée ton compte
            </p>
          </div>
          <div className="flex flex-col md:space-x-8">
            <div className="mb-4 ml-0 lg:mb-1 mt-2">
              <GoogleLogin
                // @ts-ignore
                clientId={process.env.REACT_APP_GOOGLE_ID}
                buttonText="Login"
                className="h-[50px] w-full text-center rounded-2xl"
                onSuccess={responseGoogle}
                onFailure={errorGoogle}
                // @ts-ignore
                buttonText={"Connexion avec Google"}
                id="connexion-google-login"
              />
              {errorLoginGoogle && (
                <div className="mt-6 text-xs italic text-red">
                  {errorLoginGoogle}
                </div>
              )}
            </div>
            <div className="mb-4 ml-0 lg:mb-1 mt-2 margin-0">
              <FacebookLogin
                // @ts-ignore
                appId={process.env.REACT_APP_FACEBOOK_ID}
                fields="name,email,picture"
                callback={responseFacebook}
                disableMobileRedirect={true}
                cssClass="my-facebook-button-class"
                id="modal-register-facebook"
                textButton={"Connexion avec Facebook"}
                icon={
                  loadingAuth ? (
                    <div className="animate-spin mr-4">
                      <BiLoaderAlt />
                    </div>
                  ) : (
                    <IoLogoFacebook className="w-6 h-6 mr-4" />
                  )
                }
              />
              {errorLoginFb && (
                <div className="mt-6 text-xs italic text-red">
                  {errorLoginFb}
                </div>
              )}
            </div>
          </div>
          <div className="my-4 w-full text-darkBlue separator md:my-8">OU</div>
          <form
            className="flex flex-col w-11/12 lg:w-96 md:my-2"
            // @ts-ignore
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex flex-row items-center w-full">
              <i className="bx bx-envelope mr-2 text-darkBlue text-3xl"></i>
              <input
                className="w-full h-10 px-3 leading-tight text-gray-700 border appearance-none rounded-md py-1 focus:outline-none focus:shadow-outline "
                id="modal-login-email"
                placeholder="Email"
                type="email"
                {...register("email")}
              ></input>
            </div>
            <p className="text-xs italic text-red">{errors.email?.message}</p>

            <div className="flex flex-row items-center w-full">
              <i className="bx bx-lock-alt mr-2 mt-1 text-darkBlue text-3xl"></i>
              <div className="flex flex-row items-center w-full h-10 mt-3 leading-tight text-gray-700 border rounded-md focus:shadow-outline">
                <input
                  className="w-full h-full px-3 appearance-none rounded-xl py-1 focus:outline-none"
                  id="login-page-password"
                  type={isRevealPwd ? "text" : "password"}
                  placeholder="Mot de passe"
                  {...register("password")}
                />
                <img
                  className="mr-2"
                  src={isRevealPwd ? mdpVisible : mdpNonVisible}
                  alt="voir le mot de passe"
                  onClick={() => setIsRevealPwd(prevState => !prevState)}
                />
              </div>
            </div>
            <p className="text-xs italic text-red">
              {errors.password?.message}
            </p>
            <a
              className="self-end px-4 mt-2 mb-6 text-sm decoration-solid underline lg:text-base text-darkBlue"
              id="modal-login-mot-de-passe-oublie"
              href={RouteName.resetPassword}
            >
              Mot de passe oublié ?
            </a>
            <Button
              type="green"
              id="login-modal-button-connexion"
              className="w-40 self-center my-4"
              isLoading={loading}
            >
              Connexion
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
