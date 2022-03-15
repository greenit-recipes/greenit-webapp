import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { getLogByUrl } from "helpers/social-media.helper";
import { mdpNonVisible, mdpVisible, loginMail, loginPassword, FBIcon, confirmpwd, userlogo, creator, explorer } from "icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import authService, {
  CREATE_ACCOUNT,
  CREATE_USER_FROM_AUTH,
  LOGIN_ACCOUNT,
} from "services/auth.service";
import * as yup from "yup";
import "./register.css";
import FacebookLogin from "react-facebook-login";
import { includes } from "lodash";
import { Button } from "components";

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
    <div className=" flex justify-center items-center">
     

      <div className="bg-white flex flex-col rounded-3xl items-center w-10/12 md:w-8/12 lg:w-2/6 gap-4">
        
        <h1 className=" text-xl  md:text-2xl font-bold lg:text-3xl text-center mt-10">
          Création de ton espace DIY <br />
        </h1>
        <h2 className="text-base md:text-lg ">Quel type de compte veux-tu créer ?</h2>
        <div>
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
        </div>
        <div className="separator  text-gray-700 md:m-4">Ou</div>

        <div className="flex flex-row items-center justify-evenly w-5/6 gap-8">
        <div className="flex flex-col cursor-pointer shadow-lg justify-center items-center rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition border-4 border-blue">

          <img className="rounded-full shadow-lg  w-14"src={explorer} alt="logo explorateur" />
         Explorateur
          </div>
        <div className=" flex flex-col shadow-lg justify-center items-center border rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition cursor-pointer">

          
          <img className="rounded-full shadow-lg w-14" src={creator} alt="logo créateur" />
          Créateur
          </div>
      </div>

        <div className="w-10/12">
          <form className="flex flex-col gap-4 md:gap-8 my-6  md:my-10" onSubmit={handleSubmit(onSubmitHandler)}>
            <div className="flex flex-row gap-4 items-center w-full">
              <img className="md:w-8 md:h-8" src={loginMail} alt="icone email" />
              <input
                className="shadow-lg appearance-none border lg:text-xl rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline "
                id="email"
                placeholder="Email"
                type="email"
                {...register("email")}
              ></input>
              <p className="text-red text-xs italic">{errors.email?.message}</p>
            </div>

            <div className="flex flex-row gap-4 items-center w-full">
              <img className="md:w-8 md:h-8" src={userlogo} alt="icone email" />
              <input
                className="shadow-lg appearance-none border lg:text-xl rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline "
                id="utilisateur"
                placeholder="Nom d'utilisateur"
                type="text"
                {...register("utilisateur")}
              ></input>
              <p className="text-red text-xs italic">{errors.email?.message}</p>
            </div>

            <div className="flex flex-row gap-4 items-center w-full">
              <img
                className="md:w-8 md:h-8"
                src={loginPassword}
                alt="icone mot de passe"
              />
              <div className="flex flex-row gap-4 items-center shadow-lg  border rounded-xl md:h-12 w-full text-gray-700 h-10 leading-tight  focus:shadow-outline ">
                <input
                  className="appearance-none py-2 px-3 lg:text-xl rounded-xl  focus:outline-none w-full h-full"
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

            <div className="flex flex-row gap-4 items-center w-full">
              <img
                className="md:w-8 md:h-8"
                src={confirmpwd}
                alt="icone mot de passe"
              />
              <div className="flex flex-row  items-center shadow-lg  border rounded-xl md:h-12 w-full text-gray-700 h-10 leading-tight  focus:shadow-outline ">
                <input
                  className="appearance-none py-2 px-3 lg:text-xl rounded-xl  focus:outline-none w-full h-full"
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
            <div className=" flex items-center">
              <Controller
                name="userCategoryLvl"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsUserCategoryLvl}
                    className={`w-full shadow-lg lg:text-xl`}
                    placeholder="Qui est-tu ?"
                  />
                )}
              />
              <p className="text-red text-xs italic">
                {errors.userCategoryLvl?.message}
              </p>
            </div>
            <div className="flex   items-center">
              <Controller
              
                name="userCategoryAge"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={optionsUserCategoryAge}
                    className={`w-full shadow-lg lg:text-xl `}
                    placeholder="A quel groupe appartiens-tu ?"
                  />
                )}
              />
              <p className="text-red text-xs italic">
                {errors.userCategoryAge?.message}
              </p>
            </div>

            <div className="flex w-full  self-center ">
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
          </form>
        </div>
        <Button type="blue" className="h-10  font-extrabold">Crée ton profil</Button>


        <div>
              <p onClick={() => loginOpen(true)} className="underline m-4 md:m-10 text-sm md:text-base text-center cursor-pointer text-gray-700">Deja un compte ? - Se connecter</p>
            </div>
      </div>
    </div>
  );
};
