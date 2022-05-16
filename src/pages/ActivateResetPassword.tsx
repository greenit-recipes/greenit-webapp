import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { BackgroundImage } from "components/layout/BackgroundImage";
import { Navbar } from "components/layout/Navbar";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RESET_PASSWORD } from "services/auth.service";
import * as yup from "yup";
const ModalLogGreenit = React.lazy(() => import("components/layout/ModalLogGreenit/ModalLogGreenit"));

const schema = yup.object().shape({
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

const ActivateResetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { tokenActivationAccount } =
    useParams<{ tokenActivationAccount: string }>();

  const [resetPassword, { data: dataResetPassword }] = useMutation(
    RESET_PASSWORD,
    {
      errorPolicy: "all",
    }
  );

  const onSubmitHandler = (data: {
    password: string;
    passwordConfirmation: string;
  }) => {
    resetPassword({
      variables: {
        token: tokenActivationAccount,
        password1: data.password,
        password2: data.passwordConfirmation,
      },
    }).then(() => reset());
  };
  return (
    <div className="grid w-full justify-items-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />
      <h3 className="text-xl w-2/3 md:text-3xl | mt-16 text-center">
        Réinitialisation du mot de passe. <br />
      </h3>

      <div className="w-full max-w-xs mt-10 md:max-w-lg">
        <div className="grid grid-cols-2 md:w-96">
          <ModalLogGreenit
            isModalLogin={true}
            btn={
              <button
                className="flex items-center h-8 p-2 text-xl text-white border-2 border-transparent rounded-lg cursor-pointer bg-green bold hover:bg-white hover:border-green hover:text-green"
              >
                <h3 className="text-sm">Se connecter</h3>
              </button>
            }
          ></ModalLogGreenit>
        </div>
        <form
          className="p-12 mt-2 mb-4 bg-white shadow-lg rounded-xl"
            // @ts-ignore
            onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold text-gray-700">
              Mot de passe
            </label>
            <input
              className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 rounded shadow-lg appearance-none focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            <p className="text-xs italic text-red-500">
              {errors.password?.message}
            </p>
            <label className="block mb-2 text-sm text-gray-700">
              Le mot de passe doit contenir 8 caractères, une majuscule, une
              minuscule
            </label>
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold text-gray-700">
              Confirmation mot de passe
            </label>
            <input
              className="w-full px-3 py-2 mb-4 leading-tight text-gray-700 rounded shadow-lg appearance-none focus:outline-none focus:shadow-outline"
              id="passwordConfirmation"
              type="password"
              placeholder="******************"
              {...register("passwordConfirmation")}
            />
            <p className="text-xs italic text-red-500">
              {errors.passwordConfirmation?.message}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="flex items-center justify-center h-10 p-3 mr-5 text-lg text-white border-2 border-transparent rounded-lg cursor-pointer bg-blue bold hover:bg-white hover:border-blue hover:text-blue"
            >
              Envoyer
            </button>
          </div>
        </form>
        <div>
          {dataResetPassword?.passwordReset?.success && (
            <div>
              <p>Mot de passe réinitialisé, tu peux maintenant te connecter.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateResetPassword;
