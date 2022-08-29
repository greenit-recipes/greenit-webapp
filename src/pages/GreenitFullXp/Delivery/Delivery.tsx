import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { CREATE_ORDER } from "pages/GreenitFullXp/GreenitFullXpRequest";
import { menuFullXp } from "pages/GreenitFullXp/MenuFullXp/MenuHelper";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  firstName: yup.string().required("Le prénom est obligatoire."),
  lastName: yup.string().required("Le nom est obligatoire."),
  email: yup.string().email().required("L'email est obligatoire."),
  adressse: yup.string().required("L'adresse est obligatoire."),
  postalCode: yup.string().required("Le code postal est obligatoire."),
  city: yup.string().required("La ville est obligatoire."),
  complementAdresse: yup.string().required("L'adresse obligatoire."),
  phone: yup
    .string()
    .matches(phoneRegExp, "Le téléphone n'est pas valide")
    .required("Le téléphone est obligatoire."),
}); // _ - .

interface IHeadBand {
  setNavigation: any;
}

const DeliveryGreenitFullXp: React.FC<IHeadBand> = ({ setNavigation }) => {
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

  const [errorRequest, setErrorRequest] = useState("");

  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);

  const onSubmitHandler = (data: any) => {
    createOrder({
      variables: {
        ...data,
      },
    }).then(res => {
      if (!res?.data?.createOrder?.success) {
        setErrorRequest("error");
      }
      setNavigation(menuFullXp[3]?.name);
    });
  };
  return (
    <div className="flex flex-col lg:items-center justify-center mt-0 lg:mt-20">
      <div className="flex flex-col">
        <div className="ml-10 lg:ml-0">
          {" "}
          <h1 className="text-2xl font-medium">Livraison sur ton paillasson</h1>
        </div>
      </div>

      <div className="ml-10 lg:ml-0">
        <div className="mt-4">
          <p className="mt-1">📦 Livraison en 5 à 7 jours ouvrés</p>
          <p className="mt-1">🤫 Confidentialité des informations</p>
        </div>
      </div>
      <form
        className="p-5 mt-2 bg-white shadow-lg rounded-xl"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <p className="mt-2 mb-4 text-xl text-center">
          Information de livraison
        </p>

        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Prénom
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="firstName"
            placeholder="Prénom"
            type="firstName"
            {...register("firstName")}
          ></input>
          <p className="text-xs italic text-red">{errors.firstName?.message}</p>
        </div>
        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Nom
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="lastName"
            placeholder="Nom"
            type="lastName"
            {...register("lastName")}
          ></input>
          <p className="text-xs italic text-red">{errors.lastName?.message}</p>
        </div>
        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Email
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="fullXPBox-delivery-page-email"
            placeholder="Email"
            type="email"
            {...register("email")}
          ></input>
          <p className="text-xs italic text-red">{errors.email?.message}</p>
        </div>
        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Adresse
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="adressse"
            placeholder="Adresse"
            type="adressse"
            {...register("adressse")}
          ></input>
          <p className="text-xs italic text-red">{errors.adressse?.message}</p>
        </div>
        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Code postal
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="postalCode"
            placeholder="Code postal"
            type="postalCode"
            {...register("postalCode")}
          ></input>
          <p className="text-xs italic text-red">
            {errors.postalCode?.message}
          </p>
        </div>
        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Ville
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="city"
            placeholder="Ville"
            type="city"
            {...register("city")}
          ></input>
          <p className="text-xs italic text-red">{errors.city?.message}</p>
        </div>

        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Pays
          </label>
          <p className="text-lg mb-2">France</p>
        </div>

        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Complément d'adresse
          </label>

          <textarea
            className="w-full px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="complementAdresse"
            placeholder="complementAdresse"
            rows={6}
            cols={24}
            {...register("complementAdresse")}
          ></textarea>
          <p className="text-xs italic text-red">
            {errors.complementAdresse?.message}
          </p>
        </div>

        <div className="">
          <label className="block mb-2 font-bold text-gray-700 md:text-lg">
            Numéro de téléphone
          </label>
          <input
            className="w-full h-12 px-3 py-2 mb-6 leading-tight text-gray-700 border rounded shadow-lg appearance-none sm:w-80 focus:outline-none focus:shadow-outline"
            id="phone"
            placeholder=" Numéro de téléphone"
            type="phone"
            {...register("phone")}
          ></input>
          <p className="text-xs italic text-red">{errors.phone?.message}</p>
        </div>
        {errorRequest && (
          <div className="text-red">Un problème est survenu </div>
        )}
        <div className="flex items-center justify-between">
          <button className="flex items-center justify-center h-10 p-3 mr-5 text-white align-middle border-2 border-transparent rounded-lg cursor-pointer bg-green md:text-lg bold hover:bg-white hover:border-green hover:text-green">
            Envoyer
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryGreenitFullXp;
