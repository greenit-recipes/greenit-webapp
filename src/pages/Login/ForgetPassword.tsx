import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SEND_EMAIL_RESET_PASSWORD } from "services/auth.service";
import * as yup from "yup";
import { Navbar } from "components/layout/Navbar";
import { Helmet } from "react-helmet";
import { Button } from "components";
import { NotificationAlert } from "components/layout/NotificationAlert";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
}); // _ - .

const ForgetPassword: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [message, setMessage] = useState("");
  const [sendEmailResetPassword, { data, loading, error }] = useMutation(
    SEND_EMAIL_RESET_PASSWORD,
    {
      errorPolicy: "all",
    },
  );

  const onSubmitHandler = (data: { email: string }) => {
    sendEmailResetPassword({
      variables: {
        email: data.email,
      },
    });
    setMessage("Tu as reçu un email si tu as déjà un compte chez Greenit");
    reset();
  };

  return (
    <div className="grid w-full justify-items-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="w-4/5 mt-10 md:mt-16">
        <h2 className="text-xl text-center md:text-2xl">
          Réinitialise ton mot de passe.
        </h2>
        <h3 className="mt-2 text-lg font-regular text-center md:text-xl">
          Tu recevras un email de réinitialisation 📥
        </h3>
      </div>
      <div className="w-full max-w-xs mt-10 md:max-w-lg">
        <form
          className="p-10 mt-5 mb-4 bg-white shadow-flat rounded"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block mb-2 text-lg">Email</label>
            <input
              className="w-full px-3 py-2 mb-6 rounded border-1 appearance-none focus:outline-none focus:shadow-outline"
              id="resetPswrd-page-email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <Button type="darkBlue">Envoyer</Button>
          </div>
        </form>
      </div>
      {message && (
        <NotificationAlert
          type="success"
          title="L'email de réinitialisation a été envoyé !"
          text="Jette aussi un coup d'oeil à tes spams 😉"
        ></NotificationAlert>
      )}
    </div>
  );
};

export default ForgetPassword;
