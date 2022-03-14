import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { Button } from "components";
import { SHARED_WITH_FRIENDS_STARTER_PAGE } from "pages/StarterSpace/component/SharedWithFriend/SharedWIthFriendRequest";

export const SharedWithFriend: React.FC = () => {
  const schema = yup.object().shape({
    email: yup.string().email("L'email n'est pas valide.").required("L'email est obligatoire."),
  });

  const [addUserToSharedWithFriend, { data, loading, error }] = useMutation(
    SHARED_WITH_FRIENDS_STARTER_PAGE
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: { email: string }) => {
    addUserToSharedWithFriend({
      variables: {
        email: data?.email,
      },
    }).then(() => reset());
  };
  return (
    <div className="grid lg:col-span-2 gap-4 justify-items-center self-center | mt-8 lg:mt-0">
      <h2 className="text-sm lg: font-regular text-center">
        Motivez-vous avec vos ami.e.s :
      </h2>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          className="w-56 h-10 bg-white rounded-full shadow-lg focus:outline-none | pl-4 | border-2 border-blue"
          id="email"
          placeholder="son email"
          type="email"
          {...register("email")}
        ></input>

        <div className="grid w-full justify-items-center">
          <Button id="share_friends" type="blue" className="p-4 h-10">
            Envoyer le lien du guide
          </Button>
        </div>
        <div>
          <p className="text-red-500 text-xs italic">
            {
              errors.email?.message
            }
          </p>
        </div>
      </form>
      {
        data?.emailSharedWithFriend?.success && (
        <div className="text-green  md: mb-2 | text-center whitespace-pre-line">
        L'e-mail a bien été envoyé ! 
        </div>
        )
      }
    </div>
  );
};
