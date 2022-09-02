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
import { Helmet } from "react-helmet";
import FacebookLogin from "react-facebook-login";
import { mdpNonVisible, mdpVisible } from "icons";

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
        authServiceService.setStorageLoginToken(
          response?.data?.tokenAuth?.token,
        );
        authServiceService.setStorageLoginRefreshToken(
          response?.data?.tokenAuth?.refreshToken,
        );
        history.listen(prev => {
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
        history.push("/");
        //history.goBack();
      }
    });
    reset({ ...getValues(), password: "" });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <div className="grid w-full justify-items-center">
      <Navbar />
      <div className="hidden">
        <FacebookLogin
          // @ts-ignore
          appId={process.env.REACT_APP_FACEBOOK_ID}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>
      {errorLoginFb && (
        <div className="mt-4 text-xs italic text-red">{errorLoginFb}</div>
      )}
      <Helmet>
        <title>Connexion - Espace DIY | Greenit Community</title>
        <meta
          name="description"
          content="Connectez vous. Accédez à votre compte et espace personnel DIY. Vous pouvez ajouter des recettes maison et sauvegarder vos recettes préférées."
        />
      </Helmet>
      <h1 className="text-xl font-medium w-2/3 md:text-2xl | mt-16 text-center">
        Connexion vers ton espace DIY <br />
      </h1>
      <div className="w-full max-w-xs mt-10 mb-20 md:max-w-lg">
        <div className="grid w-4/5 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
          <h3 className="self-center text-sm md:">
            Si tu veux créer un compte :
          </h3>
          <Link to={RouteName.register}>
            <button className="flex items-center h-8 p-2 ml-2 text-xl text-white border-2 border-transparent rounded-lg cursor-pointer bg-green bold hover:bg-white hover:border-green hover:text-green">
              <h3 className="text-sm align-middle">Créer un compte</h3>
            </button>
          </Link>
        </div>
        <form
          className="p-10 mt-5 mb-4 bg-white shadow-lg rounded-xl"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block mb-2 font-bold text-gray-700 md:text-lg">
              Email
            </label>
            <input
              className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
              id="modal-login-email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-xs italic text-red">{errors.email?.message}</p>
          </div>
          <div className="mb-10">
            <label className="block mb-2 font-bold text-gray-700 md:text-lg">
              Mot de passe
            </label>
            <div className="flex flex-row items-center justify-between w-full h-12 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow-lg sm:w-80 focus:shadow-outline">
              <input
                className="appearance-none focus:outline-none"
                id="login-page-password"
                type={isRevealPwd ? "text" : "password"}
                placeholder="******************"
                {...register("password")}
              />

              <img
                src={isRevealPwd ? mdpVisible : mdpNonVisible}
                alt="voir le mot de passe"
                onClick={() => setIsRevealPwd(prevState => !prevState)}
              />
            </div>
            <p className="text-xs italic text-red">
              {errors.password?.message}
            </p>
            <label className="block mb-2 text-sm text-gray-700">
              Mot de passe (Le mot de passe doit contenir 8 caractères, une
              majuscule, une minuscule)
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center justify-center h-10 p-3 mr-5 text-white align-middle border-2 border-transparent rounded-lg cursor-pointer bg-blue md:text-lg bold hover:bg-white hover:border-blue hover:text-blue">
              Connexion
            </button>
            <a
              className="inline-block text-sm font-medium align-baseline hover:text-blue"
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
