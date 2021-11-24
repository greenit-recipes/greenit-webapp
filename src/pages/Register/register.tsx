import { Button, Navbar } from "../../components";
import { likedIconOn, likedIconOff } from "../../icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import authService, {
  CREATE_ACCOUNT,
  RESEND_ACTIVATION_EMAIL,
} from "services/auth.service";
import { BackgroundImage } from "../LandingPage/Components/BackgroundImage";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
  utilisateur: yup
    .string()
    .min(4, "Le nom d'utilisateur doit contenir au moins 4 caractères.")
    .max(
      20,
      "Le nom d'utilisateur est trop long, il doit être moins de 20 caractères maximum."
    )
    .required("Le nom d'utilisateur est obligatoire.")
    .matches(
      /^[^$&+,:;=?@#¨|'<>^()%!¿§«»ω⊙¤°℃℉€¥£¢¡®©]*$/,
      "Le mot de passe ne doit pas contenir de caractère spécial sauf('.', '_', '-')"
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
}); // _ - .

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  authService.removeToken();
  const [createAccount, { data, loading, error }] = useMutation(
    CREATE_ACCOUNT,
    { errorPolicy: "all" }
  );

  const [resendActivationEMail] = useMutation(RESEND_ACTIVATION_EMAIL, {
    errorPolicy: "all",
  });

  const [email, setEmail] = useState<string>("");

  React.useEffect(() => {
    if (data?.register?.success === false || error) {
      if (data?.register?.errors?.email[0]?.code === "unique") {
        setError("email", {
          message: "Cet email éxiste déjà.",
        });
      }
      if (data?.register?.errors?.username[0]?.code === "unique") {
        setError("utilisateur", {
          message: "Ce nom existe déjà.",
        });
      }
    }
  }, [setError, error, data]);
  const onSubmitHandler = (data: {
    email: string;
    utilisateur: string;
    password: string;
    passwordConfirmation: string;
    userCategoryLvl: string;
    userCategoryAge: string;
    userWantFromGreenit: string;
  }) => {
    setEmail(data.email);
    createAccount({
      variables: {
        email: data.email,
        username: data.utilisateur,
        password1: data.password,
        password2: data.passwordConfirmation,
        userCategoryLvl: data.userCategoryLvl,
        userCategoryAge: data.userCategoryAge,
        userWantFromGreenit: data.userWantFromGreenit,
      },
    });
  };
  return (
    <div className="grid justify-items-center w-screen">
      <Navbar />
      <BackgroundImage className="overflow-hidden" />
      <div className="w-full max-w-xs md:max-w-sm">
        <form
          className="bg-white shadow-lg rounded p-10 mb-4 mt-10 md:mt-28"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
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
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              A quelle catégorie t'identifies-tu ?
            </label>

            <select {...register("userCategoryLvl")}>
              <option value="beginner">
                Petit.e curieux.se, je débute dans le DIY.
              </option>
              <option value="intermediate">
                Explorateur.ice avisé.e, j'ai déjà des notions en DIY.
              </option>
              <option value="advanced">
                Adepte convaincu.e, adepte convaincu.e
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Pour quoi Greenit peut-il t'aider ?
            </label>

            <select {...register("userWantFromGreenit")}>
              <option 
                value="shared_talk"
              >
                Partager et discuter mes connaissances sur le DIY
              </option>
              <option value="meet">Rencontrer des adeptes du DIY</option>
              <option value="find_inspiration">
                Trouver de l'inspiration auprès de la communauté
              </option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              A quel groupe t'identifies-tu ?
            </label>

            <select {...register("userCategoryAge")}>
              <option value="young">
                Jeune mais pas trop (Moins de 20 ans)
              </option>
              <option value="young_adult">
                Adulte mais pas trop non plus (Adulte mais pas trop non plus)
              </option>
              <option value="adult">
                Adulte dynamique et j'aime ça (Entre 35 et 50 ans)
              </option>
              <option value="senior">
                Je vous interdis de m'appeler senior (Plus de 50 ans)
              </option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="submit"
            >
              Sign In
            </Button>
          </div>
        </form>
        <div>
          {data?.register?.success && (
            <div>
              <p>Un mail à été envoyé afin de confirmer votre compte</p>
              <button
                onClick={() => {
                  resendActivationEMail({ variables: { email: email } });
                }}
              >
                Renvoyer l'email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
