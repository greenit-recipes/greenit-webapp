import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import {
  confirmpwd,
  creator,
  explorer,
  fblogo,
  instalogo,
  loginMail,
  loginPassword,
  mdpNonVisible,
  mdpVisible,
  pintlogo,
  tiktoklogo,
  userlogo,
  wwwlogo,
  ytlogo,
} from "icons";
import { schemaRegisterCreatorProfil } from "pages/Register/registerHelper";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import authService, { CREATE_ACCOUNT } from "services/auth.service";
import { Button, EditorGreenit, Footer, Navbar } from "../../components";
import { BackgroundImage } from "../../components/layout/BackgroundImage";
import "./register.css";
const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schemaRegisterCreatorProfil),
  });

  const {
    fields: urlsSocialMediaFields,
    append: urlsSocialMediaAppend,
    remove: urlsSocialMediaRemove,
  } = useFieldArray({
    control,
    name: "urlsSocialMedia",
  });
  const history = useHistory();
  const [createAccount, { data: createAccountData, loading, error }] =
    useMutation(CREATE_ACCOUNT, { errorPolicy: "all" });

  useEffect(() => {
    urlsSocialMediaAppend({}, { shouldFocus: false });
  }, []);

  useEffect(() => {
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
  const onSubmitHandler = (data: {
    email: string;
    utilisateur: string;
    password: string;
    passwordConfirmation: string;
    urlsSocialMedia: string[];
    biographie: string;
    isFollowNewsletter: boolean;
  }) => {
    authService.removeToken();
    authService.setStorageEmail(data.email);
    createAccount({
      variables: {
        email: data.email,
        username: data.utilisateur,
        password1: data.password,
        password2: data.passwordConfirmation,
        isFollowNewsletter: data.isFollowNewsletter,
        urlsSocialMedia: JSON.stringify(data.urlsSocialMedia),
        biographie: data.biographie,
        isCreatorProfil: true,
      },
    }).then(dataAccount => {
      if (!dataAccount?.data?.register?.success) return;
      history.push(RouteName.accountCreated);
    });
  };
  const [isRevealPwd, setIsRevealPwd] = useState(false);
  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Créer un compte Greenit - Ton espace personnel DIY</title>
        <meta
          name="description"
          content="Avec la création de ton compte sur Greenit Community, tu peux partager tes premières recettes maison, commenter et supporter les membres de la communauté et sauvegarder tes recettes préférées."
        />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />

      <div className="flex flex-col items-center justify-center mt-5 lg:mt-0">
        <div className="w-full max-w-xs mt-1 md:max-w-lg lg:w-4/12">
          <div className="grid grid-cols-3 md:grid-cols-2">
            <h3 className="col-span-2 text-sm mr-4 self-center justify-self-start | md:text-base md:justify-self-end md:col-span-1">
              Si tu as déjà un compte:
            </h3>
            <ModalLogGreenit
              isModalLogin={true}
              btn={
                <button className="flex items-center h-8 p-2 text-xl text-white align-middle border-2 border-transparent rounded-lg cursor-pointer bg-green bold hover:bg-white hover:border-green hover:text-green">
                  <h3 className="text-sm align-middle">Se connecter</h3>
                </button>
              }
            ></ModalLogGreenit>
          </div>
          <div className="flex flex-row items-center justify-center w-full gap-8 mt-4">
            <ModalLogGreenit
              btn={
                <div className="flex flex-col items-center justify-center w-32 transition border shadow-lg cursor-pointer rounded-xl lg:w-52 h-28 hover:bg-grey hover:text-white">
                  <div className="size-emoji-modal">🕵️‍♀️</div>
                  <div className="mb-2">Explorateur</div>
                </div>
              }
            ></ModalLogGreenit>

            <div className="flex flex-col items-center justify-center w-32 transition border-4 shadow-lg cursor-pointer bg-grey-300 rounded-xl lg:w-52 h-28 hover:bg-grey hover:text-white border-blue">
              <div className="size-emoji-modal">🧑‍🎨</div>
              <div className="mb-2">Créateur</div>
            </div>
          </div>
        </div>
        <form
          className="flex flex-col w-10/12 my-6 lg:w-4/12"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex flex-row items-center w-full mt-6 ">
            <img
              className="mr-2 md:w-6 md:h-6"
              src={loginMail}
              alt="icone email"
            />
            <input
              className="w-full px-3 leading-tight text-gray-700 border shadow-lg appearance-none rounded-xl py-1 focus:outline-none focus:shadow-outline "
              id="email"
              placeholder="Email"
              type="email"
              {...register("email")}
            ></input>
          </div>
          <p className="mt-2 text-xs italic text-red">
            {errors.email?.message}
          </p>

          <div className="flex flex-row items-center w-full mt-6 ">
            <img
              className="mr-2 md:w-6 md:h-6"
              src={userlogo}
              alt="icone email"
            />
            <input
              className="w-full px-3 leading-tight text-gray-700 border shadow-lg appearance-none rounded-xl py-1 focus:outline-none focus:shadow-outline "
              id="utilisateur"
              placeholder="Nom d'utilisateur"
              type="text"
              {...register("utilisateur")}
            ></input>
          </div>
          <p className="mt-2 text-xs italic text-red">
            {errors.utilisateur?.message}
          </p>

          <div className="flex flex-row items-center w-full mt-6 ">
            <img
              className="mr-2 md:w-6 md:h-6"
              src={loginPassword}
              alt="icone mot de passe"
            />
            <div className="flex flex-row items-center w-full leading-tight text-gray-700 border shadow-lg rounded-xl focus:shadow-outline ">
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
          <p className="mt-2 text-xs italic text-red">
            {errors.password?.message}
          </p>

          <div className="flex flex-row items-center w-full mt-6">
            <img
              className="mr-2 md:w-6 md:h-6"
              src={confirmpwd}
              alt="icone mot de passe"
            />
            <div className="flex flex-row items-center w-full leading-tight text-gray-700 border shadow-lg rounded-xl focus:shadow-outline ">
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
          <p className="mt-2 text-xs italic text-red">
            {errors.passwordConfirmation?.message}
          </p>

          <div className="mt-8">
            <label className="block mb-2 text-xl text-gray-700">
              Biographie
            </label>
            <Controller
              name="biographie"
              render={({ field }) => <EditorGreenit {...field} />}
              control={control}
            />
          </div>
          <p className="mt-2 text-xs italic text-red">
            {errors.biographie?.message}
          </p>
          <div className="flex flex-col mt-4">
            <label className="block text-xl text-gray-700 ">
              Ajouter un lien
            </label>
            <h3 className="block text-sm text-gray-700">
              Ajoute un ou plusieurs lien vers tes réseaux sociaux <br />
              Par exemple :
            </h3>
            <div className="flex flex-row mb-4">
              <img className="w-8" src={wwwlogo} alt="www-logo" />
              <img className="w-8" src={fblogo} alt="facebook-logo" />
              <img className="w-8" src={instalogo} alt="instagram-logo" />
              <img className="w-8" src={ytlogo} alt="youtube-logo" />
              <img className="w-8" src={tiktoklogo} alt="tiktok-logo" />
              <img className="w-8" src={pintlogo} alt="pinterest-logo" />
            </div>
            <div className="">
              <ul>
                {urlsSocialMediaFields.map((item, index) => (
                  <>
                    <li key={index} className={`grid grid-rows-2 grid-cols-1`}>
                      <input
                        placeholder="www.exemple.com"
                        className={`shadow-lg appearance-none border rounded-xl w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
                        {...register(`urlsSocialMedia.${index}.url`)}
                      />

                      {errors?.urlsSocialMedia && (
                        <p className="mt-2 text-xs italic text-red">
                          {errors?.urlsSocialMedia?.[index]?.url?.message}
                        </p>
                      )}

                      <div
                        className="px-2 mt-2 mb-2 text-white rounded-lg cursor-pointer justify-self-end bg-red py-1"
                        onClick={() => urlsSocialMediaRemove(index)}
                      >
                        Supprimer
                      </div>
                    </li>
                  </>
                ))}
              </ul>
              <div className="flex justify-end mb-2 ">
                <div
                  onClick={() =>
                    urlsSocialMediaAppend({}, { shouldFocus: true })
                  }
                  className="w-40 px-2 text-center text-white rounded-lg cursor-pointer bg-blue py-1"
                >
                  Ajouter un lien
                </div>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs italic text-red">
            {errors.urlsSocialMedia?.message}
          </p>

          <div className="flex self-center w-full mt-2">
            <input
              type="checkbox"
              className="w-6 h-6 cursor-pointer"
              {...register("isFollowNewsletter")}
              id="isFollowNewsletter"
            />
            <label className="self-center ml-2 text-sm text-gray-700">
              Coche la case si tu veux recevoir nos dernières actualités et les
              tendances du secteur du DIY.
            </label>
          </div>
          <Button type="blue" className="mt-4 font-extrabold">
            Créer ton profil
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
