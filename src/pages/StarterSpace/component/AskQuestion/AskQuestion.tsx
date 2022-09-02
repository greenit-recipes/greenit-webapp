import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Button } from "components";
import { EMAIL_ASK_QUESTION_STARTER_PAGE } from "pages/StarterSpace/component/AskQuestion/askQuestionRequest";
import { NotificationAlert } from "components/layout/NotificationAlert";

export const AskQuestion: React.FC = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("L'email n'est pas valide.")
      .required("L'email est obligatoire."),
    question: yup.string().required("vous devez remplir ce champ"),
  });

  const [addUserToAskQuestion, { data, loading, error }] = useMutation(
    EMAIL_ASK_QUESTION_STARTER_PAGE,
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
    <div className="flex flex-col self-center mb-20 justify-items-center w-full lg:w-96">
      <form
        className="flex flex-col w-full gap-2"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <textarea
          className="bg-white shadow-flat focus:outline-none | rounded-md p-4"
          id="starter-page-askquestion"
          placeholder="Nous sommes là pour vous aider !"
          rows={6}
          cols={34}
          {...register("question")}
        ></textarea>
        <div>
          <p className="text-xs italic text-red-500">
            {errors.question?.message}
          </p>
        </div>
        <input
          className="h-12 bg-white rounded-md shadow-flat focus:outline-none | p-4"
          id="starter-page-askquestion-email"
          placeholder="Ton email"
          type="email"
          {...register("email")}
        ></input>
        <div>
          <p className="text-xs italic text-red">{errors.email?.message}</p>
        </div>
        <div className="grid w-full justify-items-center">
          <Button id="send_question" type="darkBlue" className="h-10 p-4 mt-4">
            Envoyer
          </Button>
        </div>
      </form>
      {data?.emailAskQuestionStartePage?.success && (
        <NotificationAlert
          type="success"
          titre="Ta question a bien été envoyée !"
          text="Nous y répondrons d'ici 48 heures"
        />
      )}
    </div>
  );
};
