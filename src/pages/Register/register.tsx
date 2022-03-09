import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { mdpNonVisible, mdpVisible } from "icons";
import {
  optionsUserCategoryAge,
  optionsUserCategoryLvl,
  optionsUserWantFromGreenit,
  schemaRegister
} from "pages/Register/registerHelper";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import authService, { CREATE_ACCOUNT } from "services/auth.service";
import { EditorGreenit, Footer, Navbar } from "../../components";
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
    resolver: yupResolver(schemaRegister),
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
    userCategoryLvl: string;
    userCategoryAge: string;
    userWantFromGreenit: string;
    urlsSocialMedia: string[];
    biographie: string;
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
        userWantFromGreenit: getValue(data.userWantFromGreenit),
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
    <div className="grid justify-items-center w-full">
      <Navbar />
      <Helmet>
        <title>Créer un compte Greenit - Ton espace personnel DIY</title>
        <meta
          name="description"
          content="Avec la création de ton compte sur Greenit Community, tu peux partager tes premières recettes maison, commenter et supporter les membres de la communauté et sauvegarder tes recettes préférées."
        />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />
      <h1 className="text-xl font-medium w-2/3 md:text-2xl | mt-16 text-center">
        Création de ton espace DIY <br />
      </h1>

      <div className="w-full max-w-xs md:max-w-lg mt-10 mb-20">
        <div className="grid grid-cols-3 md:grid-cols-2">
          <h3 className="col-span-2 text-sm mr-4 self-center justify-self-start | md: md:justify-self-end md:col-span-1">
            Si tu as déjà un compte:
          </h3>
          <Link to={RouteName.connexion}>
            <button
              className="flex items-center cursor-pointer align-middle
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
            >
              <h3 className="text-sm align-middle">Se connecter</h3>
            </button>
          </Link>
        </div>
        <form
          className="bg-white shadow-lg rounded-xl p-8 mb-4 mt-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4 md:max-w-md">
            <label className="block text-gray-700  md:text-lg font-bold mb-2">
              Email
            </label>
            <input
              className="shadow-lg appearance-none rounded py-2 px-3 mb-4 text-gray-700 h-12 w-full sm:w-80 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-red text-xs italic">{errors.email?.message}</p>

            <label className="block text-gray-700  md:text-lg font-bold mb-2 mt-4">
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
            <label className="block text-gray-700  md:text-lg font-bold mb-2 mt-4">
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
            <label className="block text-gray-700 text-xs md: mb-2">
              Le mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule
            </label>
            <label className="block text-gray-700  md:text-lg font-bold mb-2 mt-6">
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
            <label className="block text-gray-700  font-bold md:text-lg mb-2">
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
            <label className="block text-gray-700 font-bold  md:text-lg mb-2">
              En quoi Greenit peut-il t'aider ?
            </label>
            <Controller
              name="userWantFromGreenit"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={optionsUserWantFromGreenit}
                  className={`w-2/3 md:w-1/2`}
                />
              )}
            />
            <p className="text-red text-xs italic">
              {errors.userWantFromGreenit?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 font-bold  md:text-lg mb-2">
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
          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Biographie
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Pourquoi tu utilises ces ingrédients ?
              <br /> Comment tu utilises le produit ?
            </h3>
            <Controller
              name="bio"
              render={({ field }) => (<EditorGreenit {...field} />) }
              control={control}
            />
            <p className="text-red text-xs italic">
              {errors.biographie?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Les urls des reseaux sociaux
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">BRK CHANGE</h3>
            <h3 className="block text-gray-700 text-sm mb-4">
              Par exemple : <br />
              1 Ajouter l'huile de noisette dans le chauffe-tout <br />2 Remuer
              rapidement jusqu'à ce que la préparation devienne liquide <br />3
              ...
            </h3>

            <div className="mb-10">
              <ul>
                {urlsSocialMediaFields.map((item, index) => (
                  <>
                    <li key={index} className={`grid grid-rows-2 grid-cols-1`}>
                      <input
                        className={`border-2 mb-2`}
                        {...register(`urlsSocialMedia.${index}.url`)}
                      />

                      <p className="text-red text-xs italic">
                        {errors?.urlsSocialMedia?.[index]?.url?.message}
                      </p>

                      <div
                        className="justify-self-end cursor-pointer mb-2 bg-red text-white rounded-lg py-1 px-2"
                        onClick={() => urlsSocialMediaRemove(index)}
                      >
                        Supprimer
                      </div>
                    </li>
                  </>
                ))}
              </ul>
              <div
                onClick={() => urlsSocialMediaAppend({}, { shouldFocus: true })}
                className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-40 text-center"
              >
                Ajouter une étape
              </div>
            </div>
            <p className="text-red text-xs italic">
              {errors.urlsSocialMedia?.message}
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
      <Footer />
    </div>
  );
};

export default Register;
