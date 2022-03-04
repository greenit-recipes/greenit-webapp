import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Modal } from "components/layout/Modal/Modal";
import { mdpNonVisible, mdpVisible } from "icons";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Controller, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import authService, { CREATE_ACCOUNT } from "services/auth.service";
import { EditorGreenit, Footer, Navbar } from "../../components";
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
      <div className=" flex justify-center items-center">
     

      <div className="w-full max-w-xs md:max-w-lg mt-10 mb-20">
        <div className="grid grid-cols-3 md:grid-cols-2">
          <h3 className="col-span-2 text-sm mr-4 self-center justify-self-start | md:text-base md:justify-self-end md:col-span-1">
            Si tu as déjà un compte:
          </h3>
          <Modal isModalLogin={true} btn={ <button
              className="flex items-center cursor-pointer align-middle
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
            >
              <h3 className="text-sm align-middle">Se connecter</h3>
            </button>}></Modal>
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
              id="email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
            <p className="text-red text-xs italic">
              {errors.email?.message}
            </p>


        <div className="flex flex-row items-center justify-evenly w-5/6 gap-8">
        <div className=" flex flex-col shadow-lg justify-center items-center border rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition cursor-pointer">

          <img className="rounded-full shadow-lg  w-14"src={explorer} alt="logo explorateur" />
         Explorateur
          </div>
        <div className="bg-grey-300 flex flex-col cursor-pointer shadow-lg justify-center items-center rounded-xl w-2/4 h-28 hover:bg-grey hover:text-white transition border-4 border-blue">

          
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
                  className="mr-2 cursor-pointer"
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
                  className="mr-2 cursor-pointer"
                  src={isRevealPwd ? mdpVisible : mdpNonVisible}
                  alt="voir le mot de passe"
                  onClick={() => setIsRevealPwd((prevState) => !prevState)}
                />
              </div>
              <p className="text-red text-xs italic">
                {errors.passwordConfirmation?.message}
              </p>
            </div>

            <div className="">
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

          <div className="flex  flex-col gap-2">
            <label className="block text-gray-700 text-xl ">
              Ajouter un lien
            </label>
            <h3 className="block text-gray-700 text-sm">
              Ajoute un ou plusieurs lien vers tes réseaux sociaux <br />
              Par exemple :
            </h3>
            <div className="flex flex-row gap-2 mb-4">
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
                        className={`shadow-lg appearance-none border lg:text-xl rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline `}
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

          <div className="flex w-full  self-center ">
              <input
                type="checkbox"
                className="w-6 h-6 cursor-pointer"
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

    </div>
      <Footer />
    </div>
  );
};

export default Register;
