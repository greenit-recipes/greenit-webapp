import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { getLogByUrl } from "helpers/social-media.helper";
import { mdpNonVisible, mdpVisible } from "icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import authService, { CREATE_ACCOUNT, CREATE_USER_FROM_AUTH, LOGIN_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import "./register.css";
import FacebookLogin from "react-facebook-login";
import { includes } from "lodash";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  utilisateur: yup
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères.")
    .max(
      16,
      "Le nom d'utilisateur est trop long, il doit être moins de 16 caractères maximum."
    )
    .required("Le nom d'utilisateur est obligatoire.")
    .matches(
      /^[^$&+,:;=?@#¨|'<>^()%!¿§«»ω⊙¤°℃℉€¥£¢¡®©]*$/,
      "Le nom d'utilisateur ne doit pas contenir de caractères spéciaux sauf('.', '_', '-')"
    ),
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
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas."
    ),
  userCategoryLvl: yup.object().required("Ce champ est obligatoire."),
  userCategoryAge: yup.object().required("Ce champ est obligatoire."),
}); // _ - .

export const RegisterModal: React.FC<{ loginOpen: any }> = ({ loginOpen }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [loginAccount] = useMutation(LOGIN_ACCOUNT, {
    errorPolicy: "all",
  });

  const [errorLoginFb, setErrorLoginFb] = useState("");

  const [
    authLogin,
    { data: dataAuth, loading: loadingAuth, error: errorAuth },
  ] = useMutation(CREATE_USER_FROM_AUTH, {
    errorPolicy: "all",
  });
  const [createAccount, { data: createAccountData, loading, error }] =
    useMutation(CREATE_ACCOUNT, { errorPolicy: "all" });

  const optionsUserCategoryLvl = [
    { value: "beginner", label: "Petit.e curieux.se, je débute dans le DIY." },
    {
      value: "intermediate",
      label: "Explorateur.ice avisé.e, j'ai déjà des notions en DIY.",
    },
    {
      value: "advanced",
      label: "Adepte convaincu.e, je suis passioné.e de DIY !",
    },
  ];

  const optionsUserCategoryAge = [
    { value: "young", label: "Moins de 20 ans, jeune mais pas trop." },
    {
      value: "young_adult",
      label: "Entre 20 et 35 ans, adulte mais pas trop non plus.",
    },
    { value: "adult", label: "Entre 35 et 50 ans, adulte mais pas que." },
    {
      value: "senior",
      label: "Plus de 50 ans, interdit de m'appeler senior !",
    },
  ];

  console.log(")--->", getLogByUrl("https://www.instagram.com/?hl=en"));

  React.useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (createAccountData?.register?.success === false || error) {
      if (createAccountData?.register?.errors?.email?.[0]?.code === "unique") {
        setError("email", {
          message: "Cet email éxiste déjà.",
        });
      }
      if (
        createAccountData?.register?.errors?.username?.[0]?.code === "unique"
      ) {
        setError("utilisateur", {
          message: "Ce nom existe déjà.",
        });
      }
    }
  }, [setError, error, createAccountData]);


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
      onSubmitHandlerConnect(data);
    });
  };

  const onSubmitHandlerConnect = (data: { email: string; password: string }) => {
    loginAccount({
      variables: {
        email: data.email,
        password: data.password,
      },
    }).then((response) => {
      if (response?.data?.tokenAuth?.token) {
        authService.setStorageLoginToken(
          response?.data?.tokenAuth?.token
        );
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
  };

  const onSubmitHandler = (data: {
    email: string;
    utilisateur: string;
    password: string;
    passwordConfirmation: string;
    userCategoryLvl: string;
    userCategoryAge: string;
    isFollowNewsletter: boolean;
  }) => {
    const getValue = (field: any) => field.value;

    authService.removeToken();
    authService.setStorageEmail(data.email);
    createAccount({
      variables: {
        email: data.email,
        username: data.utilisateur,
        password1: data.password,
        password2: data.passwordConfirmation,
        userCategoryLvl: getValue(data.userCategoryLvl),
        userCategoryAge: getValue(data.userCategoryAge),
        isFollowNewsletter: data.isFollowNewsletter,
      },
    }).then((dataAccount) => {
      if (!dataAccount?.data?.register?.success) return;
      history.push(RouteName.accountCreated);
    });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  return (
    <div className="grid justify-items-center w-full">
      <p className="text-xl font-medium w-2/3 md:text-2xl | mt-16 text-center">
        Création de ton espace DIY <br />
      </p>

      <div className="w-full max-w-xs md:max-w-lg mt-10 mb-20">
        <div className="grid grid-cols-3 md:grid-cols-2">
          <h3 className="col-span-2 text-sm mr-4 self-center justify-self-start | md:text-base md:justify-self-end md:col-span-1">
            Si tu as déjà un compte:
          </h3>
          <button
            onClick={() => loginOpen(true)}
            className="flex items-center cursor-pointer align-middle
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
          >
            <h3 className="text-sm align-middle">Se connecter</h3>
          </button>
        </div>
        <form
          className="bg-white shadow-lg rounded-xl p-8 mb-4 mt-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4 md:max-w-md">
            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2">
              Email
            </label>
            <input
              className="shadow-lg appearance-none rounded py-2 px-3 mb-4 text-gray-700 h-12 w-full sm:w-80 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-red text-xs italic">{errors.email?.message}</p>

            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2 mt-4">
              Nom d'utilisateur
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full sm:w-80 py-2 px-3 text-gray-700 mb-4 h-12 leading-tight focus:outline-none focus:shadow-outline"
              id="utilisateur"
              placeholder="nom utilisateur"
              type="text"
              {...register("utilisateur")}
            ></input>
            <p className="text-red text-xs italic">
              {errors.utilisateur?.message}
            </p>
            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2 mt-4">
              Mot de passe
            </label>
            <div className="flex flex-row justify-between items-center shadow-lg appearance-none rounded w-full sm:w-80 py-2 px-3 text-gray-700 mb-4 h-12 leading-tight focus:outline-none focus:shadow-outline">
              <input
                className=" appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type={isRevealPwd ? "text" : "password"}
                placeholder="******************"
                {...register("password")}
              />
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? mdpVisible : mdpNonVisible}
                alt="logo visible"
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
            <p className="text-red text-xs italic">
              {errors.password?.message}
            </p>
            <label className="block text-gray-700 text-xs md:text-base mb-2">
              Le mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule
            </label>
            <label className="block text-gray-700 text-base md:text-lg font-bold mb-2 mt-6">
              Confirmation du mot de passe
            </label>
            <div className="flex flex-row items-center justify-between shadow-lg appearance-none rounded w-full sm:w-80 py-2 px-3 text-gray-700 mb-4 h-12 leading-tight">
              <input
                className="appearance-none focus:outline-none focus:shadow-outline"
                id="passwordConfirmation"
                type={isRevealPwd ? "text" : "password"}
                placeholder="******************"
                {...register("passwordConfirmation")}
              />
              <img
                title={isRevealPwd ? "Hide password" : "Show password"}
                src={isRevealPwd ? mdpVisible : mdpNonVisible}
                alt="logo visible"
                onClick={() => setIsRevealPwd((prevState) => !prevState)}
              />
            </div>
            <p className="text-red text-xs italic">
              {errors.passwordConfirmation?.message}
            </p>
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 text-base font-bold md:text-lg mb-2">
              Qui es-tu ?
            </label>
            <Controller
              name="userCategoryLvl"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsUserCategoryLvl}
                  className={`w-2/3 md:w-1/2`}
                />
              )}
            />
            <p className="text-red text-xs italic">
              {errors.userCategoryLvl?.message}
            </p>
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 font-bold text-base md:text-lg mb-2">
              A quel groupe appartiens-tu ?
            </label>
            <Controller
              name="userCategoryAge"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsUserCategoryAge}
                  className={`w-2/3 md:w-1/2`}
                />
              )}
            />
            <p className="text-red text-xs italic">
              {errors.userCategoryAge?.message}
            </p>
          </div>

          <div className="flex w-full mb-4 mt-10 self-center ">
            <input
              type="checkbox"
              className="w-6 h-6"
              {...register("isFollowNewsletter")}
              id="isFollowNewsletter"
            />
            <label className="text-gray-700 text-sm ml-2 self-center">
              Coche la case si tu veux recevoir nos dernières actualités et les
              tendances du secteur du DIY.
            </label>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center cursor-pointer align-middle
              bg-blue rounded-lg p-3 h-10  mr-5 text-lg bold text-white border-2 border-transparent
              hover:bg-white hover:border-blue hover:text-blue"
            >
              Crée ton profil
            </button>
          </div>
        </form>
      </div>
      <div>
      <FacebookLogin
              // @ts-ignore
              appId={process.env.REACT_APP_FACEBOOK_ID}
              fields="name,email,picture"
              callback={responseFacebook}
            />
            {errorLoginFb && (
              <div className="mt-4 text-red text-xs italic">{errorLoginFb}</div>
            )}
          </div>
    </div>
  );
};
