import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button } from "components";
import useIsMobile from "hooks/isMobile";
import {
  confirmpwd,
  gifModalProfil,
  loginMail,
  loginPassword,
  mdpNonVisible,
  mdpVisible,
  userlogo,
} from "icons";
import { omit } from "lodash";
import {
  optionsUserCategoryAge,
  optionsUserCategoryLvl,
  schemaRegister,
} from "pages/Register/registerHelper";
import React, { useEffect, useState } from "react";
import FacebookLogin from "react-facebook-login";
import { Controller, useForm } from "react-hook-form";
import { BiLoaderAlt } from "react-icons/bi";
import { IoLogoFacebook } from "react-icons/io5";
import { Link, useHistory, useLocation } from "react-router-dom";
import Select from "react-select";
import authService, {
  CREATE_ACCOUNT,
  CREATE_USER_FROM_AUTH,
  LOGIN_ACCOUNT,
  UPDATE_PARTICULARITIES_ACCOUNT,
} from "services/auth.service";
import {
  beginnerBoxCookieExist,
  HAS_PURCHASED_BEGINNER_BOX,
  persistBoxPurchaseOnFirstLogin,
  persistBoxPurchaseOnRegister,
} from "services/boxfullxp.service";
import { gapi } from "gapi-script";
import "./register.css";
import GoogleLogin from "react-google-login";
import { ADD_OR_REMOVE_INGREDIENT_AT_HOME } from "../recipe/SinglePage/SinglePage-helper";
import {
  persistIngredientAtHomeOnFirstLogin,
  persistParticularityOnFirstLogin,
} from "../../components/personalization/PersonalizationHelper";

export const RegisterModal: React.FC<{
  loginOpen: any;
  enabledGif?: boolean;
  enabledSectionIcon?: boolean;
}> = ({ loginOpen, enabledGif = false, enabledSectionIcon = true }) => {
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

  const [
    loginAccount,
    { data: dataLogin, loading: loadingLogin, error: errorLogin },
  ] = useMutation(LOGIN_ACCOUNT, {
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
  const [
    createAccount,
    { data: createAccountData, loading: loadingCreateAccount, error },
  ] = useMutation(CREATE_ACCOUNT, { errorPolicy: "all" });

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

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_GOOGLE_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

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
      onSubmitHandlerConnect(data);
    });
  };

  const errorGoogle = (response: any) => {
    setErrorLoginGoogle("Une erreur est survenue");
  };

  const responseFacebook = (responseFb: any) => {
    //Todo (zack): create a custom object augmentation function to add the field optionally
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
    }).then(response => {
      if (response?.data?.tokenAuth?.token) {
        authService.setStorageLoginToken(response?.data?.tokenAuth?.token);
        authService.setStorageLoginRefreshToken(
          response?.data?.tokenAuth?.refreshToken,
        );
        if (beginnerBoxCookieExist()) {
          persistBoxPurchaseOnFirstLogin(hasPurchasedBeginnerBox);
        }
        persistParticularityOnFirstLogin(updateParticularitiesAccount);
        persistIngredientAtHomeOnFirstLogin(createOrDeleteIngredientAtHomeUser);
        if (authService.isRedirectToProfil(location?.pathname)) {
        }
        history.push("/profil");
        //history.goBack()
      }
    });
  };
  const isMobile = useIsMobile();

  const onSubmitHandler = (data: {
    email: string;
    utilisateur: string;
    password: string;
    passwordConfirmation: string;
    userCategoryLvl: string;
    userCategoryAge: string;
    isFollowNewsletter: boolean;
    isBeginnerBox?: boolean;
  }) => {
    const getValue = (field: any) => field.value;
    const setValue = (object: any, field: any, value: any) =>
      (object[field] = value);
    let variables: any = {
      email: data.email,
      username: data.utilisateur,
      password1: data.password,
      password2: data.passwordConfirmation,
      userCategoryLvl: getValue(data.userCategoryLvl),
      userCategoryAge: getValue(data.userCategoryAge),
      isFollowNewsletter: data.isFollowNewsletter,
      isBeginnerBox: true,
    };
    //Add the field optionally to avoid defaults
    if (!persistBoxPurchaseOnRegister()) {
      variables = omit(variables, ["isBeginnerBox"]);
    }

    authService.removeToken();
    authService.setStorageEmail(data.email);
    createAccount({
      variables,
    }).then(dataAccount => {
      if (!dataAccount?.data?.register?.success) return;
      history.push(RouteName.accountCreated);
    });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);

  return (
    <div
      className={`flex justify-center   ${
        !isMobile ? "register-modal-size" : ""
      } items-center`}
    >
      <div className="flex flex-col items-center bg-white rounded-3xl">
        <div className="mb-4 text-xl font-bold text-center">
          Créer un compte
          <br />
        </div>
        <div>
          <p
            onClick={() => loginOpen(true)}
            id="modal-register-deja-un-compte"
            className="mb-4 text-sm text-center text-darkBlue underline cursor-pointer md:text-base"
          >
            Déjà un compte ? Se connecter ici !
          </p>
        </div>
        <div className="mb-4 w-10/12 lg:mb-1 mt-2">
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
                <IoLogoFacebook className="w-6 h-6 ml-5 mr-10" />
              )
            }
          />
          {errorLoginFb && (
            <div className="mt-6 text-xs italic text-red">{errorLoginFb}</div>
          )}
        </div>
        <div className="mb-4 w-10/12 lg:mb-1 mt-2">
          <GoogleLogin
            // @ts-ignore
            clientId={process.env.REACT_APP_GOOGLE_ID}
            buttonText="Login"
            className=" w-full text-center"
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

        {enabledGif && (
          <img
            className="mr-2 w-60 h-70 "
            src={gifModalProfil}
            alt="gif email"
          />
        )}
        <div className="w-full text-darkBlue-700 separator mb-5 md:m-4">OU</div>
        {enabledSectionIcon && (
          <>
            <h2 className="mb-4 text-base text-darkBlue font-semibold md:text-lg">
              Quel type de compte te correspond le mieux ?
            </h2>
            <div className="flex flex-row w-5/6 gap-8 justify-evenly">
              <div className="flex flex-col w-2/4 ">
                <div className="flex flex-col py-5 items-center transition border-2 shadow-lg cursor-pointer rounded-md h-34 border-darkBlue">
                  <div className="size-emoji-modal mb-8">🕵️‍♀️</div>
                  <div className="text-darkBlue">Explorateur</div>
                </div>
                <div className="mt-2 mb-2 text-xs w-full text-center fontQSregular">
                  Trouve de l’inspiration réalise tes recettes en toute
                  simplicité !
                </div>
              </div>
              <div className="flex flex-col w-2/4 ">
                <Link
                  to={RouteName.register}
                  id="modal-register-createur"
                  className="flex flex-col py-5 items-center transition shadow-lg cursor-pointer rounded-md h-34"
                >
                  <div className="size-emoji-modal mb-8">🧑‍🎨</div>
                  <div className="">Créateur</div>
                </Link>

                <div className="mt-2 mb-2 text-xs w-full text-center fontQSregular">
                  Partage tes créations avec la communauté !
                </div>
              </div>
            </div>
          </>
        )}

        <div className="w-10/12 lg:w-8/12">
          <form
            className="flex flex-col "
            // @ts-ignore
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            <div className="flex flex-row items-center w-full mt-6 ">
              <i className="bx bx-envelope mr-2 text-darkBlue text-3xl"></i>
              <input
                className="w-full h-10 px-3 leading-tight text-gray-700 border shadow-lg appearance-none rounded-md py-1 focus:outline-none focus:shadow-outline "
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              ></input>
            </div>
            <p className="text-xs italic text-red">{errors.email?.message}</p>

            <div className="flex flex-row items-center w-full mt-6 ">
              <i className="bx bx-user mr-2 text-darkBlue text-3xl"></i>
              <input
                className="w-full h-10 px-3 leading-tight text-gray-700 border shadow-lg appearance-none rounded-md py-1 focus:outline-none focus:shadow-outline "
                id="utilisateur"
                placeholder="Nom d'utilisateur"
                type="text"
                {...register("utilisateur")}
              ></input>
            </div>
            <p className="text-xs italic text-red">
              {errors.utilisateur?.message}
            </p>

            <div className="flex flex-row items-center w-full mt-6">
              <i className="bx bx-lock-alt mr-2 text-darkBlue text-3xl"></i>
              <div className="flex flex-row items-center w-full h-10 leading-tight text-gray-700 border shadow-lg rounded-md focus:shadow-outline ">
                <input
                  className="w-full h-full px-3 appearance-none py-1 rounded-xl focus:outline-none"
                  id="password"
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
              <p className="text-xs italic text-red">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex flex-row items-center w-full mt-6">
              <i className="bx bx-lock-open-alt mr-2 text-darkBlue text-3xl"></i>
              <div className="flex flex-row items-center w-full h-10 leading-tight text-gray-700 border shadow-lg rounded-md focus:shadow-outline ">
                <input
                  className="w-full h-full px-3 appearance-none py-1 rounded-xl focus:outline-none"
                  id="passwordConfirmation"
                  type={isRevealPwd ? "text" : "password"}
                  placeholder="Confirmer le mot de passe"
                  {...register("passwordConfirmation")}
                />
                <img
                  className="mr-2"
                  src={isRevealPwd ? mdpVisible : mdpNonVisible}
                  alt="voir le mot de passe"
                  onClick={() => setIsRevealPwd(prevState => !prevState)}
                />
              </div>
              <p className="text-xs italic text-red">
                {errors.passwordConfirmation?.message}
              </p>
            </div>
            <div className="flex items-center mt-6 ">
              <Controller
                name="userCategoryLvl"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsUserCategoryLvl}
                    className={`w-full shadow-lg text-darkBlue rounded-md border-1 border-darkBlue`}
                    placeholder="Qui es-tu ?"
                  />
                )}
              />
            </div>
            <p className="text-xs italic text-red">
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
                    className={`w-full shadow-lg text-darkBlue rounded-md border-1 border-darkBlue`}
                    placeholder="A quel groupe appartiens-tu ?"
                  />
                )}
              />
            </div>
            <p className="text-xs italic text-red">
              {errors.userCategoryAge?.message}
            </p>
            <div className="flex self-center w-full ml-10 mt-6">
              <input
                type="checkbox"
                className="w-6 h-6 border border-darkBlue"
                {...register("isFollowNewsletter")}
                id="Modal-Register-is-Follow-Newsletter"
              />
              <label className="self-center ml-2 text-sm text-darkBlue">
                Coche la case si tu veux recevoir nos dernières actualités et
                les tendances du secteur du DIY.
              </label>
            </div>
            <Button
              type="blue"
              id="modal-register-button-cree-profil"
              className="mt-4 font-extrabold"
              isLoading={loadingCreateAccount}
            >
              Créer ton profil
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
