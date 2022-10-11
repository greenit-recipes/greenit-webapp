import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import {
  confirmpwd,
  loginMail,
  loginPassword,
  mdpNonVisible,
  mdpVisible,
  userlogo,
} from "icons";
import { schemaRegisterCreatorProfil } from "pages/Register/registerHelper";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import authService, { CREATE_ACCOUNT } from "services/auth.service";
import { Button, Footer, Navbar } from "../../components";
import "./register.css";
import { PellGreenit } from "../../components/layout/Editor/PellEditor";

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
      <div className="flex flex-col items-center bg-white rounded-3xl">
        <div className="text-xl font-bold text-center mt-8">
          <h3>Créer un compte créateur.ice</h3>
        </div>
        <div>
          <ModalLogGreenit
            isModalLogin={true}
            btn={
              <p
                id="modal-register-deja-un-compte"
                className="md:my-4 text-sm text-center text-darkBlue underline cursor-pointer md:text-base"
              >
                Déjà un compte ? Se connecter ici !
              </p>
            }
          ></ModalLogGreenit>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:w-4/5 p-4 mb-10">
          <div className="row-span-2 md:pt-20 md:border-r-1 br-darkBlue">
            <h2 className="mt-6 md:mb-6 mb-4 text-darkBlue text-base md:text-lg text-center font-regular">
              Quel type de compte te correspond le mieux ?
            </h2>
            <div className="grid grid-cols-2 md:px-10 justify-items-center">
              <div className="grid justify-items-center">
                <ModalLogGreenit
                  btn={
                    <button className="grid justify-items-center hover:border-2 br-darkBlue w-40 h-28 bg-white shadow-flat rounded-lg text-5xl pt-2">
                      🕵️‍♀️
                      <p>Explorateur.ice</p>
                    </button>
                  }
                ></ModalLogGreenit>
                <div className="block text-xs w-10/12 md:w-2/3 text-center mt-2">
                  Trouve de l’inspiration pour tes recettes !
                </div>
              </div>
              <div className="grid justify-items-center">
                <div className="grid justify-items-center border-2 br-darkBlue w-40 h-28 bg-white shadow-flat rounded-lg text-5xl pt-2">
                  🧑‍🍳
                  <p>Créateur.ice</p>
                </div>
                <div className="text-xs w-10/12 md:w-2/3 text-center mt-2">
                  Partage tes créations avec la communauté !
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 md:mt-0 md:px-10 grid justify-items-center">
            <form
              className="flex flex-col gap-1 w-11/12 md:w-9/12 lg:mt-6"
              // @ts-ignore
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <h2 className="my-2 text-lg font-regular">Identifiants</h2>
              <div className="flex flex-row items-center">
                <img
                  className="mr-2 md:w-6 md:h-6"
                  src={loginMail}
                  alt="icone email"
                />
                <input
                  className="w-full px-3 border rounded-md py-1 focus:outline-none focus:shadow-outline "
                  id="email"
                  placeholder="Email"
                  type="email"
                  {...register("email")}
                ></input>
              </div>
              <p className="mt-2 text-xs italic text-red">
                {errors.email?.message}
              </p>

              <div className="flex flex-row items-center">
                <img
                  className="mr-2 md:w-6 md:h-6"
                  src={userlogo}
                  alt="icone user"
                />
                <input
                  className="w-full px-3 border rounded-md py-1 focus:outline-none focus:shadow-outline "
                  id="utilisateur"
                  placeholder="Nom d'utilisateur"
                  type="text"
                  {...register("utilisateur")}
                ></input>
              </div>
              <p className="mt-2 text-xs italic text-red">
                {errors.utilisateur?.message}
              </p>

              <div className="flex flex-row items-center">
                <img
                  className="mr-2 md:w-6 md:h-6"
                  src={loginPassword}
                  alt="icone mot de passe"
                />
                <div className="flex flex-row items-center w-full border rounded-md focus:shadow-outline ">
                  <input
                    className="w-full h-full px-3 py-1 rounded-xl focus:outline-none"
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

              <div className="flex flex-row items-center">
                <img
                  className="mr-2 md:w-6 md:h-6"
                  src={confirmpwd}
                  alt="icone mot de passe"
                />
                <div className="flex flex-row items-center w-full border rounded-md focus:shadow-outline ">
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

              <h2 className="my-2 text-lg font-regular">Biographie</h2>
              <Controller
                name="biographie"
                render={({ field }) => <PellGreenit {...field} />}
                control={control}
              />
              <p className="mt-2 text-xs italic text-red">
                {errors.biographie?.message}
              </p>
              <div className="flex flex-col mt-4">
                <h2 className="text-lg font-regular">Ajouter un lien</h2>
                <h3 className="font-light text-sm">
                  Ajoute un ou plusieurs liens vers tes réseaux sociaux <br />
                  Par exemple :
                </h3>
                <div className="flex flex-row my-2 gap-2">
                  <i className="bx bx-globe text-3xl" />
                  <i className="bx bxl-instagram-alt text-3xl" />
                  <i className="bx bxl-pinterest text-3xl" />
                  <i className="bx bxl-youtube text-3xl" />
                  <i className="bx bxl-tiktok text-3xl" />
                </div>
                <div>
                  <ul>
                    {urlsSocialMediaFields.map((item, index) => (
                      <>
                        <li key={index} className={`flex mb-4`}>
                          <input
                            placeholder="www.exemple.com"
                            className={`border rounded-md w-full h-10 px-2 focus:outline-none focus:shadow-outline `}
                            {...register(`urlsSocialMedia.${index}.url`)}
                          />

                          {errors?.urlsSocialMedia && (
                            <p className="mt-2 text-xs italic text-red">
                              {
                                //@ts-ignore
                                errors?.urlsSocialMedia?.[index]?.url?.message
                              }
                            </p>
                          )}

                          <Button
                            type="red"
                            className="w-10 h-10 ml-2"
                            onClick={() => urlsSocialMediaRemove(index)}
                          >
                            X
                          </Button>
                        </li>
                      </>
                    ))}
                  </ul>
                  <div className="flex justify-end mb-2 ">
                    <Button
                      type="darkBlue"
                      id="registerCreator-add-SMlink"
                      onClick={() =>
                        urlsSocialMediaAppend({}, { shouldFocus: true })
                      }
                    >
                      Ajouter un lien
                    </Button>
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
                <label className="self-center ml-2 text-sm">
                  Coche la case si tu veux recevoir nos dernières actualités et
                  les tendances du secteur du DIY.
                </label>
              </div>
              <Button type="green" className="mt-4">
                Créer ton profil
              </Button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
