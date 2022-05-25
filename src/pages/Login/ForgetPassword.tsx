import { useMutation } from '@apollo/client';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SEND_EMAIL_RESET_PASSWORD } from 'services/auth.service';
import * as yup from 'yup';
import { Navbar } from 'components/layout/Navbar';
import { BackgroundImage } from '../../components/layout/BackgroundImage';
import { Helmet } from 'react-helmet';

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

  const [message, setMessage] = useState('');
  const [sendEmailResetPassword, { data, loading, error }] = useMutation(
    SEND_EMAIL_RESET_PASSWORD,
    {
      errorPolicy: 'all',
    },
  );

  const onSubmitHandler = (data: { email: string }) => {
    sendEmailResetPassword({
      variables: {
        email: data.email,
      },
    });
    setMessage('Tu as reçu un email si tu as déjà un compte chez Greenit');
    reset();
  };

  return (
    <div className="grid w-full justify-items-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
      <BackgroundImage className="overflow-hidden" />
      <h3 className="text-2xl w-2/3 md:text-3xl | mt-16 text-center">
        Réinitialise ton mot de passe depuis ta boîte mail.
        <br />
      </h3>
      <div className="w-full max-w-xs mt-10 md:max-w-lg">
        <form
          className="p-10 mt-5 mb-4 bg-white shadow-lg rounded-xl"
          // @ts-ignore
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className="mb-4">
            <label className="block mb-2 text-lg font-bold text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 mb-6 leading-tight text-gray-700 rounded shadow-lg appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              placeholder="email"
              type="email"
              {...register('email')}
            ></input>
          </div>
          <div className="flex items-center justify-between">
            <button className="flex items-center justify-center h-10 p-3 mr-5 text-lg text-white border-2 border-transparent rounded-lg cursor-pointer bg-blue bold hover:bg-white hover:border-blue hover:text-blue">
              Envoyer
            </button>
          </div>
          {message && (
            <div className="flex items-center justify-between">
              Mail de réinitialisation de mot de passe envoyé
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
