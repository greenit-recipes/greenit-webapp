import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { includes } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import authServiceService, {
  LOGIN_ACCOUNT,
  CREATE_USER_FROM_AUTH,
} from "services/auth.service";
import * as yup from "yup";
import { Footer, Navbar } from "components";
import { BackgroundImage } from "components/layout/BackgroundImage";
import { Helmet } from "react-helmet";
import FacebookLogin from "react-facebook-login";

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

const Login: React.FC = () => {
  if (window.pageYOffset > 0) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
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
        setErrorLoginFb(response?.data?.createUserFromAuth?.errors)
        // Quelque chose c'est mal passé affichier message
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
        authServiceService.setStorageLoginToken(
          response?.data?.tokenAuth?.token
        );
        authServiceService.setStorageLoginRefreshToken(
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
    reset({...getValues(), password: ""});
  };

  // Rajouter un loader pendant tous le traitement de fb
  return (
    <div className="grid justify-items-center w-full">
      <Navbar />
      <FacebookLogin
        // @ts-ignore
        appId={process.env.REACT_APP_FACEBOOK_ID}
        fields="name,email,picture"
        callback={responseFacebook}
      />
     { errorLoginFb && (<div className="mt-4 text-red text-xs italic">{errorLoginFb}</div>)}
      <Helmet>
        <title>Connexion - Espace DIY | Greenit Community</title>
        <meta
          name="description"
          content="Connectez vous. Accédez à votre compte et espace personnel DIY. Vous pouvez ajouter des recettes maison et sauvegarder vos recettes préférées."
        />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />
      <h1 className="text-xl font-medium w-2/3 md:text-2xl | mt-16 text-center">
        Connexion vers ton espace DIY <br />
      </h1>
      <div className="w-full max-w-xs md:max-w-lg mt-10 mb-20">
        <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 w-4/5">
          <h3 className="text-sm md:text-base self-center">
            Si tu veux créer un compte :
          </h3>
          <Link to={RouteName.register}>
            <button
              className="flex items-center cursor-pointer
              ml-2 bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
            hover:bg-white hover:border-green hover:text-green"
            >
              <h3 className="text-sm align-middle">Créer un compte</h3>
            </button>
          </Link>
        </div>
        <form
          className="bg-white shadow-lg rounded-xl p-10 mb-4 mt-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2">
              Email
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full sm:w-80 py-2 px-3 text-gray-700 h-12 leading-tight focus:outline-none focus:shadow-outline mb-6"
              id="email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-red text-xs italic">{errors.email?.message}</p>
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2">
              Mot de passe
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full sm:w-80 py-2 px-3 text-gray-700 mb-3 h-12 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            <p className="text-red text-xs italic">
              {errors.password?.message}
            </p>
            <label className="block text-gray-700 text-sm mb-2">
              Mot de passe (Le mot de passe doit contenir 8 caractères, une
              majuscule, une minuscule)
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center cursor-pointer align-middle
              bg-blue rounded-lg p-3 h-10  mr-5 text-base md:text-lg bold text-white border-2 border-transparent
              hover:bg-white hover:border-blue hover:text-blue"
            >
              Connexion
            </button>
            <a
              className="inline-block align-baseline font-medium text-sm hover:text-blue"
              href={RouteName.resetPassword}
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
