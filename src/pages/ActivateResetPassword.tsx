import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Footer } from "components";
import { Navbar } from "components/layout/Navbar";
import { NotificationAlert } from "components/layout/NotificationAlert";
import React from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { RESET_PASSWORD } from "services/auth.service";
import * as yup from "yup";
const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

const schema = yup.object().shape({
  password: yup
    .string()
    .max(
      32,
      "Mot de passe trop long, il doit être moins de 32 caractères maximum.",
    )
    .required("Le mot de passe est obligatoire.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.{8,})/,
      "Le mot de passe doit contenir 8 caractères, une majuscule, une minuscule.",
    ),
  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref("password"), null],
      "Les mots de passe ne correspondent pas.",
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

  const { tokenActivationAccount } = useParams<{
    tokenActivationAccount: string;
  }>();

  const [resetPassword, { data: dataResetPassword }] = useMutation(
    RESET_PASSWORD,
    {
      errorPolicy: "all",
    },
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
      <div className="w-4/5 mt-10 md:mt-16">
        <h2 className="text-xl text-center md:text-2xl mb-10">
          Réinitialisation du mot de passe.
        </h2>
      </div>
      <form
        className="flex flex-col gap-3 p-12 mt-2 mb-4 bg-white shadow-flat rounded"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <label className="font-medium">Mot de passe</label>
        <input
          className="w-full px-3 py-2 rounded shadow-flat border-1 appearance-none focus:outline-none focus:shadow-outline"
          id="resetPswrd-page-password-field1"
          type="password"
          placeholder="******************"
          {...register("password")}
        />
        <p className="text-xs italic text-red">{errors.password?.message}</p>
        <label>
          Le mot de passe doit contenir 8 caractères, une majuscule, une
          minuscule
        </label>
        <label className="font-medium">Confirmation mot de passe</label>
        <input
          className="w-full px-3 py-2 rounded shadow-flat border-1 appearance-none focus:outline-none focus:shadow-outline"
          id="resetPswrd-page-password-field2"
          type="password"
          placeholder="******************"
          {...register("passwordConfirmation")}
        />
        <p className="text-xs italic text-red">
          {errors.passwordConfirmation?.message}
        </p>
        <Button type="darkBlue" className="w-24">
          Envoyer
        </Button>
      </form>
      <div>
        {dataResetPassword?.passwordReset?.success && (
          <NotificationAlert
            type="success"
            title="Mot de passe réinitialisé !"
            text="Tu peux maintenant te connecter."
          ></NotificationAlert>
        )}
      </div>
      <div className="mt-28">
        <Footer />
      </div>
    </div>
  );
};

export default ActivateResetPassword;
