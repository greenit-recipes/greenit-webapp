import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Button } from "components";
import { EMAIL_PROFIL_PAGE_CREATOR } from "pages/Profil/CreatorProfilRequest";

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
    <div className="grid lg:col-span-2 gap-4 justify-items-center self-center | mt-8 lg:mt-0">
      <div>De quoi as-tu besoin ?</div>
      <form
        className="flex flex-col gap-4"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <textarea
          className="self-center w-full p-4 mb-4 leading-tight text-gray-700 border rounded appearance-none sm:w-3/4 focus:outline-none focus:shadow-outline"
          id="question"
          rows={5}
          cols={55}
          placeholder="Message..."
          {...register("question")}
        ></textarea>

        <div className="grid w-full justify-items-center">
          <Button id="what_do_u_need" type="green" className="h-10 p-4">
            Envoyer
          </Button>
        </div>
        <div>
          <p className="text-xs italic text-red-500">
            {errors.question?.message}
          </p>
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
