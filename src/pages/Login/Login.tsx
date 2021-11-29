import { Button, Navbar } from "../../components";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import authServiceService, { LOGIN_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import { BackgroundImage } from "../LandingPage/Components/BackgroundImage";

const schema = yup.object().shape({
  email: yup.string().email().required("L'email est obligatoire."),
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
}); // _ - .

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [loginAccount, { data, loading, error }] = useMutation(LOGIN_ACCOUNT, {
    errorPolicy: "all",
  });
  // Error for graphql call
  React.useEffect(() => {
    if (data?.tokenAuth?.success === false || error) {
      if (
        data?.tokenAuth?.errors?.nonFieldErrors[0]?.code ===
        "invalid_credentials"
      ) {
        setError("email", {
          message: "L'email ou le mot de passe est invalide.",
        });
        setError("password", {
          message: "L'email ou le mot de passe est invalide.",
        });
      }
    }
  }, [setError, error, data]);

  const onSubmitHandler = (data: { email: string; password: string }) => {
    loginAccount({
      variables: {
        email: data.email,
        password: data.password,
      },
    }).then((response) => {
      if (response?.data?.tokenAuth?.token) {
        authServiceService.setStorageLoginToken(
          response?.data?.tokenAuth?.token
        );
        authServiceService.setStorageLoginRefreshToken(
          response?.data?.tokenAuth?.refreshToken
        );
        history.push({
          pathname: "/profil",
          state: { detail: response?.data?.tokenAuth?.user },
        });
      }
    });
    reset();
  };
  return (
    <div className="grid justify-items-center w-screen">
      <Navbar />
      <BackgroundImage className="overflow-hidden" />
      <div className="flex max-w-xs md:max-w-sm">
        <form
          className="bg-white shadow-lg rounded p-10 mb-4 mt-36"
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
            <p className="text-red-500 text-xs italic">
              {errors.email?.message}
            </p>
          </div>
          <div className="mb-10">
            <label className="block text-gray-700 text-lg font-bold mb-2">
              Mot de passe
            </label>
            <input
              className="shadow-lg appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              {...register("password")}
            />
            <p className="text-red-500 text-xs italic">
              {errors.password?.message}
            </p>
            <label className="block text-gray-700 text-sm mb-2">
              Mot de passe (Le mot de passe doit contenir 8 caractères, une
              majuscule, une minuscule)
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="flex justify-center items-center cursor-pointer
              bg-blue rounded-lg p-3 h-12 text-xl bold text-white border-2 border-transparent
              hover:bg-white hover:border-blue hover:text-blue"
            >
              Connexion
            </button>
            <a
              className="inline-block align-baseline font-medium text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Mot de passe oublié ?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
