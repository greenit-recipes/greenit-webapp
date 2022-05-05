import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button } from "components";
import useIsMobile from "hooks/isMobile";
import { mdpNonVisible, mdpVisible, loginMail, loginPassword } from "icons";
import { IoLogoFacebook } from "react-icons/io5";
import { includes } from "lodash";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import authService, {
  CREATE_USER_FROM_AUTH,
  LOGIN_ACCOUNT,
} from "services/auth.service";
import * as yup from "yup";
import "./LoginModal.css";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  password: yup
    .string()
    .max(
      32,
      "Mot de passe trop long, il doit être moins de 32 caractères maximum."
    )
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule."
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

  const [errorLoginFb, setErrorLoginFb] = useState("");

  const [
    authLogin,
    { data: dataAuth, loading: loadingAuth, error: errorAuth },
  ] = useMutation(CREATE_USER_FROM_AUTH, {
    errorPolicy: "all",
  });
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
        data?.tokenAuth?.errors?.nonFieldErrors?.[0]?.code ===
        "not_verified"
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
    // Error si pas d'email

    if (responseFb.status === "unknown") {
      return;
    }

    authLogin({
      variables: {
        email: responseFb.email,
        username: responseFb.name,
        password: process.env.REACT_APP_PASSWORD + responseFb.id,
        idFacebook: responseFb.id,
        isFollowNewsletter: "false",
      },
    }).then((response) => {
      // @ts-ignore
      if (response?.data?.createUserFromAuth?.errors) {
        setErrorLoginFb(response?.data?.createUserFromAuth?.errors);
        return;
      }
      const data = {
        email: responseFb.email,
        password: process.env.REACT_APP_PASSWORD + responseFb.id,
      };
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
    }).then((response) => {
      if (response?.data?.tokenAuth?.token) {
        authService.setStorageLoginToken(response?.data?.tokenAuth?.token);
        authService.setStorageLoginRefreshToken(
          response?.data?.tokenAuth?.refreshToken
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
        <div className="flex-row w-full lg:flex">
          <div className="desktopbg"> </div>
          <div className="flex flex-col items-center mobile">
            <div className="text-xl font-bold text-center">
              Connexion vers ton espace DIY <br />
            </div>
            <form
              className="flex flex-col lg:w-72 md:my-2"
                          // @ts-ignore
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div className="flex flex-row items-center w-full">
                <img
                  className="w-6 h-6 ml-2"
                  src={loginMail}
                  alt="icone email"
                />
                <input
                  className="w-full h-8 px-3 m-4 leading-tight text-gray-700 border shadow-lg appearance-none rounded-xl py-1 focus:outline-none focus:shadow-outline"
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                ></input>
              </div>
              <p className="text-xs italic text-red">
                {errors.password?.message}
              </p>

              <div className="flex flex-row items-center w-full">
                <img
                  className="w-6 h-6 ml-2"
                  src={loginPassword}
                  alt="icone mot de passe"
                />
                <div className="flex flex-row items-center w-full h-8 m-4 leading-tight text-gray-700 border shadow-lg rounded-xl focus:shadow-outline">
                  <input
                    className="w-full h-full px-3 appearance-none rounded-xl py-1 focus:outline-none"
                    id="password"
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="Mot de passe"
                    {...register("password")}
                  />
                  <img
                    className="mr-2"
                    src={isRevealPwd ? mdpVisible : mdpNonVisible}
                    alt="voir le mot de passe"
                    onClick={() => setIsRevealPwd((prevState) => !prevState)}
                  />
                </div>
              </div>
              <p className="text-xs italic text-red">
                {errors.password?.message}
              </p>
              <a
                className="self-end px-4 mt-2 mb-6 text-sm font-bold lg:text-base text-blue"
                href={RouteName.resetPassword}
              >
                Mot de passe oublié ?
              </a>
              <Button type="blue" className="mt-4 font-extrabold">
                Connexion
              </Button>
            </form>

            <div className="m-4 text-gray-700 separator md:m-10">Ou</div>

            <FacebookLogin
              // @ts-ignore
              appId={process.env.REACT_APP_FACEBOOK_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              disableMobileRedirect={true}
              cssClass="my-facebook-button-class"
              textButton="Connexion avec Facebook"
              icon={<IoLogoFacebook className="w-6 h-6 mr-4" />}
            />

            {errorLoginFb && (
              <div className="mt-4 text-xs italic text-red">{errorLoginFb}</div>
            )}

            <div>
              <p
                onClick={() => loginOpen(false)}
                className="m-4 text-sm text-center text-gray-700 underline cursor-pointer md:m-10"
              >
                Pas encore de compte ? - Créer son compte
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
