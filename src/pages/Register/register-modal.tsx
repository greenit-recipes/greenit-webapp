import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button } from "components";
import useIsMobile from "hooks/isMobile";
import {
  confirmpwd,
  creator,
  explorer,
  loginMail,
  loginPassword,
  mdpNonVisible,
  mdpVisible,
  userlogo,
} from "icons";
import { includes } from "lodash";
import {
  optionsUserCategoryAge,
  optionsUserCategoryLvl,
  schemaRegister,
} from "pages/Register/registerHelper";
import React, { useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Controller, useForm } from "react-hook-form";
import { IoLogoFacebook } from "react-icons/io5";
import { Link, useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import authService, {
  CREATE_ACCOUNT,
  CREATE_USER_FROM_AUTH,
  LOGIN_ACCOUNT,
} from "services/auth.service";
import "./register.css";

export const RegisterModal: React.FC<{ loginOpen: any }> = ({ loginOpen }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schemaRegister),
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
          message: "Cet email existe déjà.",
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
      onSubmitHandlerConnect(data);
    });
  };

  const onSubmitHandlerConnect = (data: {
    email: string;
    password: string;
  }) => {
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
        }
        history.push("/profil");
        //history.goBack()
      }
    });
  };
  const isMobile = useIsMobile()

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
    <div className={`flex justify-center   ${!isMobile ? "register-modal-size" : ""} items-center`}>
      <div className="bg-white flex flex-col rounded-3xl items-center">
        <div className="text-lg font-bold lg:text-2xl text-center mb-4">
          Création de ton espace DIY <br />
        </div>
        <h2 className="text-base md:text-lg mb-4">
          Quel type de compte veux-tu créer ?
        </h2>
        <div className="mb-4 lg:mb-1">
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
            <div className="mt-6 text-red text-xs italic">{errorLoginFb}</div>
          )}
        </div>
        <div className="separator  text-gray-700 md:m-4">Ou</div>

        <div className="flex flex-row items-center justify-evenly w-5/6 gap-8">
          <div className="flex flex-col cursor-pointer shadow-lg justify-center items-center rounded-xl w-2/4 h-34 hover:bg-grey hover:text-white transition border-4 border-blue">
            <img
              className="rounded-full shadow-lg w-12 mt-2"
              src={explorer}
              alt="logo explorateur"
            />
            <div>Explorateur</div>
            <div className="w-5/6 text-xs text-center mt-2 mb-2 fontQSregular">Inspire-toi des recettes de la communauté ! Supporte les créateurs et ajoute tes recettes préférées en favoris !</div>
          </div>
          <Link
            to={RouteName.register}
            className="flex flex-col shadow-lg justify-center items-center border rounded-xl w-2/4 h-34 hover:bg-grey hover:text-white transition cursor-pointer"
          >
            <img
              className="rounded-full shadow-lg w-12 mt-2"
              src={creator}
              alt="logo créateur"
            />
            <div>Créateur</div>
            <div className="w-5/6 text-xs text-center mt-2 mb-2 fontQSregular">Partage tes recettes avec la communauté ! Ajoute des liens vers tes réseaux/site internet et accède à tes statistiques.</div>
          </Link>
        </div>

        <div className="w-10/12 lg:w-8/12">
          <form
            className="flex flex-col my-5 "
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex flex-row items-center w-full mt-6 ">
              <img
                className="md:w-6 md:h-6 mr-2"
                src={loginMail}
                alt="icone email"
              />
              <input
                className="shadow-lg appearance-none border rounded-xl w-full  py-1 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              ></input>
            </div>
            <p className="text-red text-xs italic">{errors.email?.message}</p>

            <div className="flex flex-row items-center w-full mt-6 ">
              <img
                className="md:w-6 md:h-6 mr-2"
                src={userlogo}
                alt="icone email"
              />
              <input
                className="shadow-lg appearance-none border rounded-xl w-full  py-1 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline "
                id="utilisateur"
                placeholder="Nom d'utilisateur"
                type="text"
                {...register("utilisateur")}
              ></input>
            </div>
            <p className="text-red text-xs italic">
              {errors.utilisateur?.message}
            </p>

            <div className="flex flex-row items-center w-full mt-6 ">
              <img
                className="md:w-6 md:h-6 mr-2"
                src={loginPassword}
                alt="icone mot de passe"
              />
              <div className="flex flex-row items-center shadow-lg  border rounded-xl w-full text-gray-700 leading-tight  focus:shadow-outline ">
                <input
                  className="appearance-none py-1 px-3 rounded-xl  focus:outline-none w-full h-full"
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
              <p className="text-red text-xs italic">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex flex-row items-center w-full mt-6">
              <img
                className="md:w-6 md:h-6 mr-2"
                src={confirmpwd}
                alt="icone mot de passe"
              />
              <div className="flex flex-row  items-center shadow-lg  border rounded-xl w-full text-gray-700 leading-tight  focus:shadow-outline ">
                <input
                  className="appearance-none py-1 px-3 rounded-xl  focus:outline-none w-full h-full"
                  id="passwordConfirmation"
                  type={isRevealPwd ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  {...register("passwordConfirmation")}
                />
                <img
                  className="mr-2"
                  src={isRevealPwd ? mdpVisible : mdpNonVisible}
                  alt="voir le mot de passe"
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
              </div>
              <p className="text-red text-xs italic">
                {errors.passwordConfirmation?.message}
              </p>
            </div>
            <div className=" flex items-center mt-6">
              <Controller
                name="userCategoryLvl"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsUserCategoryLvl}
                    className={`w-full shadow-lg`}
                    placeholder="Qui est-tu ?"
                  />
                )}
              />
            </div>
            <p className="text-red text-xs italic">
              {errors.userCategoryLvl?.message}
            </p>
            <div className="flex items-center mt-6">
              <Controller
                name="userCategoryAge"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsUserCategoryAge}
                    className={`w-full shadow-lg `}
                    placeholder="A quel groupe appartiens-tu ?"
                  />
                )}
              />
            </div>
            <p className="text-red text-xs italic">
              {errors.userCategoryAge?.message}
            </p>
            <div className="flex w-full self-center mt-6">
              <input
                type="checkbox"
                className="w-6 h-6"
                {...register("isFollowNewsletter")}
                id="isFollowNewsletter"
              />
              <label className="text-gray-700 text-sm ml-2 self-center">
                Coche la case si tu veux recevoir nos dernières actualités et
                les tendances du secteur du DIY.
              </label>
            </div>
            <Button type="blue" className="font-extrabold mt-4">
              Créer ton profil
            </Button>
          </form>
        </div>

        <div>
          <p
            onClick={() => loginOpen(true)}
            className="underline mt-4 mb-4 text-sm md:text-base text-center cursor-pointer text-gray-700"
          >
            Déjà un compte ? Se connecter ici !
          </p>
        </div>
      </div>
    </div>
  );
};
