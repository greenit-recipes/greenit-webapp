import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { BackgroundImage } from "components/layout/BackgroundImage";
import { Modal } from "components/layout/Modal/Modal";
import { Navbar } from "components/layout/Navbar";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RESET_PASSWORD } from "services/auth.service";
import * as yup from "yup";

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
    <div className="grid justify-items-center w-full">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />
      <h3 className="text-xl w-2/3 md:text-3xl | mt-16 text-center">
        Réinitialisation du mot de passe. <br />
      </h3>

      <div className="w-full max-w-xs md:max-w-lg mt-10">
        <div className="grid grid-cols-2 md:w-96">
          <Modal
            isModalLogin={true}
            btn={
              <button
                className="flex items-center cursor-pointer
              bg-green rounded-lg p-2 h-8 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
              >
                <h3 className="text-sm">Se connecter</h3>
              </button>
            }
          ></Modal>
        </div>
        <form
          className="bg-white shadow-lg rounded-xl p-12 mb-4 mt-2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
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

          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center cursor-pointer
              bg-blue rounded-lg p-3 h-10  mr-5 text-lg bold text-white border-2 border-transparent
              hover:bg-white hover:border-blue hover:text-blue"
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
