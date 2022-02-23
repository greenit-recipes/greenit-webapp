import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Button } from "components";
import { EMAIL_ASK_QUESTION_STARTER_PAGE } from "pages/StarterSpace/component/AskQuestion/askQuestionRequest";

export const AskQuestion: React.FC = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("L'email n'est pas valide.")
      .required("L'email est obligatoire."),
    question: yup.string().required("vous devez remplir ce champ"),
  });

  const [addUserToAskQuestion, { data, loading, error }] = useMutation(
    EMAIL_ASK_QUESTION_STARTER_PAGE
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: { question: string; email: string }) => {
    addUserToAskQuestion({
      variables: {
        email: data?.email,
        question: data?.question,
      },
    }).then(() => reset());
  };
  return (
    <div className="hidden | lg:grid col-span-2 mb-5 gap-4 justify-items-center self-center">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          className="w-56 h-10 bg-white rounded-full shadow-lg focus:outline-none | pl-4 | border-2 border-blue"
          id="email"
          placeholder="Email"
          type="email"
          {...register("email")}
        ></input>
        <div>
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
        <textarea
          className="bg-white shadow-lg focus:outline-none | pl-4 | border-2 border-blue"
          id="question"
          placeholder="Message"
          rows={12}
          cols={34}
          {...register("question")}
        ></textarea>
        <div>
          <p className="text-red-500 text-xs italic">
            {errors.question?.message}
          </p>
        </div>
        <div className="grid w-full justify-items-center">
          <Button type="blue" className="p-4 h-10">
            Envoyer
          </Button>
        </div>
      </form>
      {data?.emailAskQuestionStartePage?.success && (
        <div className="text-green text-base md:text-base mb-2 | text-center whitespace-pre-line">
          Ta question à bien été envoyé
        </div>
      )}
    </div>
  );
};
