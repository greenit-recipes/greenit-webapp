import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Button } from "components";
import { EMAIL_PROFIL_PAGE_CREATOR } from "pages/Profil/CreatorProfilRequest";
import React from "react";

export const StatProfilForm: React.FC = () => {
  const schema = yup.object().shape({
    question: yup.string().required("Le champ ne doit pas être vide."),
  });

  const [emailProfilPage, { data, loading, error }] = useMutation(
    EMAIL_PROFIL_PAGE_CREATOR,
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: { question: string }) => {
    emailProfilPage({
      variables: {
        question: data?.question,
      },
    }).then(() => reset());
  };
  return (
    <div className="grid lg:col-span-2 gap-4 w-full md:w-3/5 justify-items-center self-center | lg:mt-0">
      <div className="underline decoration-solid text-green font-medium">
        De quelle statistique as-tu besoin ?
      </div>
      <form
        className="flex flex-col w-full"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="w-full flex justify-between md:items-center space-x-4 mb-7">
          <input
            id="profil-creator-page-question-stat"
            className={`py-2 px-3 ml-10 border w-11/12 rounded-md appearance-none text-sm lg:text-base placeholder:text-darkBlue xfocus:outline-none focus:shadow-outline h-full`}
            placeholder="statistiques souhaitées…"
            {...register("question")}
          />

          <div className="">
            <Button
              id="what_do_u_need"
              type="darkBlue"
              className="border-darkBlue bg-white h-10 p-4 mr-5"
            >
              Envoyer
            </Button>
          </div>
          <div>
            <p className="text-xs italic text-red-500">
              {errors.question?.message}
            </p>
          </div>
        </div>
      </form>
      {data?.emailProfilPage?.success && (
        <div className="text-green text-base md:text-base mb-2 | text-center whitespace-pre-line">
          Ton message a bien été reçu, on revient vers toi au plus vite !
        </div>
      )}
    </div>
  );
};
