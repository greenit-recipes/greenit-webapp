import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { ModalLogGreenit } from "components/layout/ModalLogGreenit/ModalLogGreenit";
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
    }).then((dataAccount) => {
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
        <div className="w-full max-w-xs md:max-w-lg mt-1 lg:w-4/12">
          <div className="grid grid-cols-3 md:grid-cols-2">
            <h3 className="col-span-2 text-sm mr-4 self-center justify-self-start | md:text-base md:justify-self-end md:col-span-1">
              Si tu as déjà un compte:
            </h3>
            <ModalLogGreenit
              isModalLogin={true}
              btn={
                <button
                  className="flex items-center cursor-pointer align-middle
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
                >
                  <h3 className="text-sm align-middle">Se connecter</h3>
                </button>
              }
            ></ModalLogGreenit>
          </div>
          <div className="flex flex-row items-center justify-center w-full gap-8 mt-4">
            <ModalLogGreenit
              btn={
                <div className="flex flex-col shadow-lg justify-center items-center border rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition cursor-pointer">
                  <img
                    className="rounded-full shadow-lg  w-14"
                    src={explorer}
                    alt="logo explorateur"
                  />
                  <div>Explorateur</div>
                </div>
              }
            ></ModalLogGreenit>

            <div className="bg-grey-300 flex flex-col cursor-pointer shadow-lg justify-center items-center rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition border-4 border-blue">
              <img
                className="rounded-full shadow-lg w-14"
                src={creator}
                alt="logo créateur"
              />
              <div>Créateur</div>
            </div>
          </div>
        </div>
        <form
          className="my-6 flex flex flex-col w-10/12 lg:w-4/12"
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
          <p className="text-red text-xs italic mt-2">
            {errors.email?.message}
          </p>

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
          <p className="text-red text-xs italic mt-2">
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
          </div>
          <p className="text-red text-xs italic mt-2">
            {errors.password?.message}
          </p>

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
          </div>
          <p className="text-red text-xs italic mt-2">
            {errors.passwordConfirmation?.message}
          </p>

          <div className="mt-8">
            <label className="block text-gray-700 text-xl mb-2">
              Biographie
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Pourquoi tu utilises ces ingrédients ?
              <br /> Comment tu utilises le produit ?
            </h3>
            <Controller
              name="biographie"
              render={({ field }) => <EditorGreenit {...field} />}
              control={control}
            />
          </div>
          <p className="text-red text-xs italic mt-2">
            {errors.biographie?.message}
          </p>
          <div className="flex mt-4 flex-col">
            <label className="block text-gray-700 text-xl ">
              Ajouter un lien
            </label>
            <h3 className="block text-gray-700 text-sm">
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
                        <p className="text-red text-xs italic mt-2">
                          {errors?.urlsSocialMedia?.[index]?.url?.message}
                        </p>
                      )}

                      <div
                        className="justify-self-end cursor-pointer mb-2 mt-2 bg-red text-white rounded-lg py-1 px-2"
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
                  className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-40 text-center"
                >
                  Ajouter un lien
                </div>
              </div>
            </div>
          </div>
          <p className="text-red text-xs italic mt-2">
            {errors.urlsSocialMedia?.message}
          </p>

          <div className="flex w-full self-center mt-2">
            <input
              type="checkbox"
              className="w-6 h-6 cursor-pointer"
              {...register("isFollowNewsletter")}
              id="isFollowNewsletter"
            />
            <label className="text-gray-700 text-sm ml-2 self-center">
              Coche la case si tu veux recevoir nos dernières actualités et les
              tendances du secteur du DIY.
            </label>
          </div>
          <Button type="blue" className="font-extrabold mt-4">
            Créer ton profil
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
