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
        <div className="text-xl font-bold text-center">
          <h3>Créer un compte</h3>
        </div>
        <div>
          <p
            onClick={() => loginOpen(true)}
            id="modal-register-deja-un-compte"
            className="md:my-4 text-sm text-center text-darkBlue underline cursor-pointer md:text-base"
          >
            Déjà un compte ? Se connecter ici !
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:p-4">
          <div className="row-span-2 md:pt-40 md:border-r-1 br-darkBlue">
            {enabledSectionIcon && (
              <>
                <h2 className="mt-6 md:mt-0 mb-4 text-base text-darkBlue font-regular md:text-lg text-center">
                  Quel type de compte te correspond le mieux ?
                </h2>
                <div className="grid grid-cols-2 md:px-10 justify-items-center">
                  <div className="grid justify-items-center">
                    <div className="grid justify-items-center border-2 br-darkBlue w-40 h-28 bg-white shadow-flat rounded-lg text-5xl pt-2">
                      🕵️‍♀️
                      <p>Explorateur.ice</p>
                    </div>
                    <div className="block text-xs w-10/12 md:w-2/3 text-center mt-2">
                      Trouve de l’inspiration pour tes recettes !
                    </div>
                  </div>
                  <div className="grid justify-items-center">
                    <Link to={RouteName.register} id="modal-register-createur">
                      <button className="grid justify-items-center hover:border-2 br-darkBlue w-40 h-28 bg-white shadow-flat rounded-lg text-5xl pt-2">
                        🧑‍🍳
                        <p>Créateur.ice</p>
                      </button>
                    </Link>

                    <div className="text-xs w-10/12 md:w-2/3 text-center mt-2">
                      Partage tes créations avec la communauté !
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="mt-8 md:mt-0 md:px-10 grid justify-items-center">
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
                  <IoLogoFacebook className="w-6 h-6 mr-3" />
                )
              }
            />
            {errorLoginFb && (
              <div className="mt-6 text-xs italic text-red">{errorLoginFb}</div>
            )}
            <GoogleLogin
              // @ts-ignore
              clientId={process.env.REACT_APP_GOOGLE_ID}
              buttonText="Login"
              className="w-80 rounded-lg mt-3 grid justify-center"
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

            <div className="w-full text-darkBlue-700 separator mt-4">OU</div>

            {enabledGif && (
              <img
                className="mr-2 w-60 h-70 "
                src={gifModalProfil}
                alt="gif email"
              />
            )}

            <div className="px-4">
              <form
                className="flex flex-col gap-2"
                // @ts-ignore
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                <div className="flex flex-row items-center w-full mt-6 ">
                  <i className="bx bx-envelope mr-2 text-darkBlue text-3xl"></i>
                  <input
                    className="w-full h-10 px-3 leading-tight text-gray-700 border appearance-none rounded-md py-1 focus:outline-none focus:shadow-outline "
                    id="email"
                    placeholder="Email"
                    type="email"
                    {...register("email")}
                  ></input>
                </div>
                <p className="text-xs italic text-red">
                  {errors.email?.message}
                </p>

                <div className="flex flex-row items-center w-full">
                  <i className="bx bx-user mr-2 text-darkBlue text-3xl"></i>
                  <input
                    className="w-full h-10 px-3 leading-tight text-gray-700 border appearance-none rounded-md py-1 focus:outline-none focus:shadow-outline "
                    id="utilisateur"
                    placeholder="Nom d'utilisateur"
                    type="text"
                    {...register("utilisateur")}
                  ></input>
                </div>
                <p className="text-xs italic text-red">
                  {errors.utilisateur?.message}
                </p>

                <div className="flex flex-row items-center w-full">
                  <i className="bx bx-lock-alt mr-2 text-darkBlue text-3xl"></i>
                  <div className="flex flex-row items-center w-full h-10 leading-tight text-gray-700 border rounded-md focus:shadow-outline ">
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
                </div>
                <p className="text-xs italic text-red">
                  {errors.password?.message}
                </p>

                <div className="flex flex-row items-center w-full">
                  <i className="bx bx-lock-open-alt mr-2 text-darkBlue text-3xl"></i>
                  <div className="flex flex-row items-center w-full h-10 leading-tight text-gray-700 border rounded-md focus:shadow-outline ">
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
                </div>
                <p className="text-xs italic text-red">
                  {errors.passwordConfirmation?.message}
                </p>
                <div className="flex items-center">
                  <Controller
                    name="userCategoryLvl"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsUserCategoryLvl}
                        className={`w-full text-darkBlue rounded-md border-1 border-darkBlue`}
                        placeholder="Qui es-tu ?"
                      />
                    )}
                  />
                </div>
                <p className="text-xs italic text-red">
                  {errors.userCategoryLvl?.message}
                </p>
                <div className="flex items-center">
                  <Controller
                    name="userCategoryAge"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={optionsUserCategoryAge}
                        className={`w-full text-darkBlue rounded-md border-1 border-darkBlue`}
                        placeholder="A quel groupe appartiens-tu ?"
                      />
                    )}
                  />
                </div>
                <p className="text-xs italic text-red">
                  {errors.userCategoryAge?.message}
                </p>
                <div className="flex self-center w-full ml-10">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border border-darkBlue"
                    {...register("isFollowNewsletter")}
                    id="Modal-Register-is-Follow-Newsletter"
                  />
                  <label className="self-center ml-2 mb-2 text-sm text-darkBlue">
                    Coche la case si tu veux recevoir nos dernières actualités
                    et les tendances du secteur du DIY.
                  </label>
                </div>
                <Button
                  type="darkBlue"
                  id="modal-register-button-cree-profil"
                  isLoading={loadingCreateAccount}
                >
                  Créer ton profil
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
