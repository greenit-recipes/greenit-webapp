import { gql, useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { boxGreenit, boxGreenitMobile } from "icons";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useIsMobile from "hooks/isMobile";

const EMAIL_HEADBAND = gql`
  mutation EmailHeadband($email: String!) {
    emailHeadband(email: $email,) {
      success
    }
  }
`;

const GreenitFullXpModal = () => {
  const schema = yup.object().shape({
    email: yup.string().email("L'email n'est pas valide.").required("L'email est obligatoire."),
  }); // _ - .

 const isMobile = useIsMobile()

  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [emailHeadband, { data, loading, error }] = useMutation(
    EMAIL_HEADBAND
  );

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: any) => {
    emailHeadband({
      variables: {
        email: data?.email,
      },
    }).then((dataReponse) => {
      reset();
      if (dataReponse?.data?.emailHeadband?.success) {
        setMessage(
          "C’est envoyé 👌 On reviendra vers toi le plus vite possible !"
        );
      } else {
        setErrorEmail("Un problème est survenu");
      }
    });
  };

  return (
    <div>
      <p className="text-2xl mt-5 text-center text-green">
        Bientôt disponible !
      </p>
      <p className="text-lg text-center mt-5">
        Envie de découvrir notre box{" "}
        <span className="text-green">Premiers Pas ?</span>
      </p>
      <p className="text-center">
        Ajoute ton adresse email pour être informé{" "}
        <b>de sa sortie !</b>
      </p>
      <img
        loading="lazy"
        className="mt-4 lg:mt-0 lg:h-60 m-auto w-full| flex place-self-center"
        src={isMobile ? boxGreenitMobile : boxGreenit}
        alt="box"
      ></img>{" "}
      <div className="flex justify-center">
        <form
          className="p-5 mt-2 bg-white text-center"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="flex justify-center">
            <div className="flex flex-col w-full">
              <label className="mb-2 text-xs text-gray-700 text-left">
                Email
              </label>

              <input
                className="w-full px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
                placeholder="Email"
                {...register("email")}
              ></input>
            </div>
          </div>
          <button className="flex items-center justify-center h-10 p-3 w-full m-auto bg-white border-green text-green hover:text-white align-middle border-2 border-transparent rounded-lg cursor-pointer hover:bg-green bold ">
          Rejoindre la liste d’attente
          </button>
          <p className="text-xs italic text-red">{errors.email?.message}</p>
          <p className="text-xs italic text-red">{errorEmail}</p>
          <p className="text-green mb-4">{message}</p>
        </form>
      </div>
    </div>
  );
};

export default GreenitFullXpModal;
