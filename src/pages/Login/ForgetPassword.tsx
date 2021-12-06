import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SEND_EMAIL_RESET_PASSWORD } from "services/auth.service";
import * as yup from "yup";
import { Navbar } from "components/layout/Navbar";
import { BackgroundImage } from "../../components/layout/BackgroundImage";

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
  const [sendEmailResetPassword, { data, loading, error }] = useMutation(SEND_EMAIL_RESET_PASSWORD, {
    errorPolicy: "all",
  });

  const onSubmitHandler = (data: { email: string; }) => {
    sendEmailResetPassword({
      variables: {
        email: data.email,
      },
    })
    setMessage("Tu as reçu un email si tu as déjà un compte chez Greenit")
    reset();
  };
  
  return (
    <div className="grid justify-items-center w-screen">
      <Navbar />
      <BackgroundImage className="overflow-hidden" />
      <h3 className="text-2xl w-2/3 md:text-3xl | mt-16 text-center">
      Réinitialise ton mot de passe depuis ta boîte mail.<br />
      </h3>
      <div className="w-full max-w-xs md:max-w-lg mt-10">
        <form
          className="bg-white shadow-lg rounded-xl p-10 mb-4 mt-5"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Email
            </label>
            <input
              className="shadow-lg appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6"
              id="email"
              placeholder="email"
              type="email"
              {...register("email")}
            ></input>
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
         {message && <div className="flex items-center justify-between">
          Mail de réinitialisation de mot de passe envoyé
          </div> }
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
