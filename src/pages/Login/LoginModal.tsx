import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button } from "components";
import { mdpNonVisible, mdpVisible, loginMail, loginPassword, FBIcon } from "icons";
import { includes } from "lodash";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
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
    }
  }, [setError, error, data]);

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
        history.listen((prev) => {
          if (
            prev?.pathname === RouteName.activateResetPassword ||
            includes(prev?.pathname, RouteName.resetPassword) ||
            includes(prev?.pathname, "activate") ||
            includes(prev?.pathname, RouteName.tokenActivationAccount) ||
            prev?.pathname === RouteName.register
          ) {
            history.push("/");
          }
        });
        history.goBack();
      }
    });
    reset({ ...getValues(), password: "" });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <>
      <div className=" flex flex-col items-center justify-items-center w-full">
        <div className="lg:flex flex-row  w-10/12  md:w-7/12">
          <div className="desktopbg"> </div>
          <div className="mobile flex flex-col items-center">
            <h1 className=" text-xl  md:text-2xl font-bold lg:text-3xl my-6 text-center">
              Connexion vers ton espace DIY <br />
            </h1>
          <div className="flex flex-col">
            
              <div className="flex flex-row items-center w-full">
              <img className="w-8 h-8" src={loginMail} alt="icone email" />
              <input
                className="shadow-lg appearance-none border lg:text-xl rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline m-4"
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              ></input>
              <p className="text-red text-xs italic">{errors.email?.message}</p>
              </div>

              <div className="flex flex-row items-center w-full">
                <img className="w-8 h-8" src={loginPassword} alt="icone mot de passe" />
                <div className="flex flex-row  items-center shadow-lg  border rounded-xl md:h-12 w-full text-gray-700 h-10 leading-tight  focus:shadow-outline m-4">
                  <input
                    className="appearance-none py-2 px-3 lg:text-xl rounded-xl  focus:outline-none w-full h-full"
                    id="password"
                    type={isRevealPwd ? "text" : "password"}
                    placeholder="Mot de passe"
                    {...register("password")}
                  />
                  <img
                  src={isRevealPwd ? mdpVisible : mdpNonVisible}
                  alt="voir le mot de passe"
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
                </div>
                <p className="text-red text-xs italic">
                  {errors.password?.message}
                </p>
              </div>

            <a
              className="self-end mt-2 mb-6 px-4 text-sm lg:text-base text-blue font-bold"
              href={RouteName.resetPassword}
            >
              Mot de passe oublié ?
            </a>
            </div>
            <Button type="blue" className="h-10 font-bold">Crée ton profil</Button>

            <div className="separator m-4 text-gray-700 md:m-10">Ou</div>

            <FacebookLogin
              // @ts-ignore
              appId={process.env.REACT_APP_FACEBOOK_ID}
              fields="name,email,picture"
              callback={responseFacebook}
              cssClass="my-facebook-button-class"
              textButton="Connexion avec Facebook"
              
              icon={<img src={FBIcon} alt="facebook icon" className="w-6 h-6 mr-4" />}
              
            />
            
            {errorLoginFb && (
              <div className="mt-4 text-red text-xs italic">{errorLoginFb}</div>
            )}

            <div>
              <p onClick={() => loginOpen(false)} className="underline mb-4 md:m-10 text-sm md:text-base text-center cursor-pointer text-gray-700">Pas encore de compte ? - Créer son compte</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
