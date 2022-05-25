import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { Button } from 'components';
import { EMAIL_ASK_QUESTION_STARTER_PAGE } from 'pages/StarterSpace/component/AskQuestion/askQuestionRequest';

export const AskQuestion: React.FC = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("L'email n'est pas valide.")
      .required("L'email est obligatoire."),
    question: yup.string().required('vous devez remplir ce champ'),
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
    <div className="flex flex-col self-center mb-20 justify-items-center lg:w-1/3">
      <form
        className="flex flex-col w-full gap-2"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <textarea
          className="bg-white shadow-sm focus:outline-none | border-2 border-blue rounded-lg p-4"
          id="question"
          placeholder="Une question ? Nous sommes là pour vous aider !"
          rows={6}
          cols={34}
          {...register('question')}
        ></textarea>
        <div>
          <p className="text-xs italic text-red-500">
            {errors.question?.message}
          </p>
        </div>
        <input
          className="w-2/3 h-10 bg-white rounded-lg shadow-sm focus:outline-none | p-4 | border-2 border-blue"
          id="email"
          placeholder="Ton email"
          type="email"
          {...register('email')}
        ></input>
        <div>
          <p className="text-xs italic text-red-500">{errors.email?.message}</p>
        </div>
        <div className="grid w-full justify-items-center">
          <Button id="send_question" type="blue" className="h-10 p-4 mt-4">
            Envoyer
          </Button>
        </div>
      </form>
      {data?.emailAskQuestionStartePage?.success && (
        <div className="text-green  md: mt-6 | text-center whitespace-pre-line">
          Ta question a bien été envoyée !
        </div>
      )}
    </div>
  );
};
