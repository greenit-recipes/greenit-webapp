import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import Select from "react-select";
import authService, {
  CREATE_ACCOUNT
} from "services/auth.service";
import * as yup from "yup";
import { Footer, Navbar } from "../../components";
import { BackgroundImage } from "../../components/layout/BackgroundImage";
import "./register.css";

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
  userWantFromGreenit: yup.object().required("Ce champ est obligatoire."),
  userCategoryAge: yup.object().required("Ce champ est obligatoire."),
}); // _ - .

const Register: React.FC = () => {
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
  const [createAccount, { data: createAccountData, loading, error }] =
    useMutation(CREATE_ACCOUNT, { errorPolicy: "all" });

  const [email, setEmail] = useState<string>("");

  const optionsUserCategoryLvl = [
    { value: "beginner", label: "Petit.e curieux.se, je débute dans le DIY." },
    {
      value: "intermediate",
      label: "Explorateur.ice avisé.e, j'ai déjà des notions en DIY.",
    },
    { value: "advanced", label: "Adepte convaincu.e, adepte convaincu.e" },
  ];

  const optionsUserWantFromGreenit = [
    {
      value: "shared_talk",
      label: "Partager et discuter mes connaissances sur le DIY.",
    },
    { value: "meet", label: "Rencontrer des adeptes du DIY." },
    {
      value: "find_inspiration",
      label: "Trouver de l'inspiration auprès de la communauté.",
    },
  ];

  const optionsUserCategoryAge = [
    { value: "young", label: "Moins de 20 ans" },
    { value: "young_adult", label: "Entre 20 et 35 ans" },
    { value: "adult", label: "Entre 35 et 50 ans" },
    { value: "senior", label: "Plus de 50 ans" },
  ];

  React.useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    if (createAccountData?.register?.success === false || error) {
      if (createAccountData?.register?.errors?.email[0]?.code === "unique") {
        setError("email", {
          message: "Cet email éxiste déjà.",
        });
      }
      if (createAccountData?.register?.errors?.username[0]?.code === "unique") {
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
      },
    }).then((dataAccount) => {
      if (!dataAccount?.data?.register?.success) return;
      
      console.log(authService.getEmail());
      history.push(RouteName.accountCreated);
    });
  };
  return (
    <div className="grid justify-items-center w-screen">
      <Navbar />
      <BackgroundImage className="overflow-hidden" />
      <h3 className="text-xl w-2/3 md:text-3xl | mt-16 text-center">
        Création de ton espace DIY <br />
      </h3>

      <div className="w-screen md:w-2/3 mt-10">
        <div className="grid grid-cols-2">
          <h3 className="text-sm md:text-base self-center place-self-end mr-4">
            Si tu as déjà un compte:
          </h3>
          <Link to="/connexion">
            <button
              className="flex items-center cursor-pointer
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
            >
              <h3 className="text-sm">Se connecter</h3>
            </button>
          </Link>
        </div>
        <form
          className="bg-white shadow-lg rounded-xl p-8 mb-4 mt-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4 md:max-w-md">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Email
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.email?.message}
            </p>

            <label className="block text-gray-700 text-lg font-bold mb-2 mt-4">
              Nom d'utilisateur
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="utilisateur"
              placeholder="nom utilisateur"
              type="text"
              {...register("utilisateur")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.utilisateur?.message}
            </p>
            <label className="block text-gray-700 text-lg font-bold mb-2 mt-4">
              Mot de passe
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.password?.message}
            </p>
            <label className="block text-gray-700 text-sm mb-2">
              Le mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule
            </label>
            <label className="block text-gray-700 text-lg font-bold mb-2 mt-6">
              Confirmation mot de passe
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full py-2 px-3 text-gray-700 mb-4 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordConfirmation"
              type="password"
              placeholder="******************"
              {...register("passwordConfirmation")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.passwordConfirmation?.message}
            </p>
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              A quelle catégorie t'identifies-tu ?
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
            <p className="text-red-500 text-xs italic">
              {errors.userCategoryLvl?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Pour quoi Greenit peut-il t'aider ?
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
            <p className="text-red-500 text-xs italic">
              {errors.userWantFromGreenit?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              A quel groupe t'identifies-tu ?
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
            <p className="text-red-500 text-xs italic">
              {errors.userCategoryAge?.message}
            </p>
          </div>

          <div className="mb-4 flex mt-10 self-center">
            <input
              type="checkbox"
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
              className="flex justify-center items-center cursor-pointer
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
