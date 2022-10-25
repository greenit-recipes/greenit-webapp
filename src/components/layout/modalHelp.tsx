import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { EMAIL_GREENIT_FULL_XP } from "pages/GreenitFullXp/GreenitFullXpRequest";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

interface IProfilGreenitFullXp {
  messageModal: string;
  subMessageModal: string;
  otherMesssageModal?: string;
}
const ModalHelp: React.FC<IProfilGreenitFullXp> = ({
  messageModal,
  subMessageModal,
  otherMesssageModal,
}) => {
  const schema = yup.object().shape({
    msg: yup.string().required("Votre message est vide"),
  }); // _ - .

  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [emailGreenitFullXp, { data, loading, error }] = useMutation(
    EMAIL_GREENIT_FULL_XP,
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
    emailGreenitFullXp({
      variables: {
        question: data?.msg,
        typeEmail: messageModal,
      },
    }).then(dataReponse => {
      reset();
      if (dataReponse?.data?.emailGreenitFullXp?.success) {
        setMessage(
          "C’est envoyé👌 On reviendra vers toi le plus vite possible !",
        );
      } else {
        setErrorEmail("Un problème est survenu");
      }
    });
  };

  return (
    <div>
      <p className="text-xl mt-5 text-center font-medium md:font-normal whitespace-pre-wrap">
        {messageModal}
      </p>
      <p className="text-center mt-5 text-base font-medium md:font-normal whitespace-pre-wrap">
        {subMessageModal}
      </p>
      {otherMesssageModal && (
        <p className="text-center mt-5 text-lg font-medium md:font-normal whitespace-pre-wrap">
          {otherMesssageModal}
        </p>
      )}
      <div className="">
        <form
          className="p-5 mt-2 bg-white text-center"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <textarea
            className="w-full px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="msg"
            placeholder="Ton message"
            rows={10}
            cols={24}
            {...register("msg")}
          ></textarea>
          <p className="text-xs italic text-red">{errors.msg?.message}</p>
          <p className="text-xs italic text-red">{errorEmail}</p>
          <p className="text-green mb-4">{message}</p>
          <button className="flex items-center justify-center h-10 p-3 mr-5 w-full lg:m-auto lg:w-60 align-middle border-2 border-transparent rounded-lg cursor-pointer bg-white border-green hover:text-white text-green hover:bg-green bold">
            Envoyer ma demande
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalHelp;
