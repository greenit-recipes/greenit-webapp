import { Container, Button } from "../../../components";
import { NotificationAlert } from "../../../components/layout/NotificationAlert";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ADD_USER_TO_NEWSLETTER } from "pages/LandingPage/Components/NewsletterRequest";
import { useMutation } from "@apollo/client";
import useIsMobile from "../../../hooks/isMobile";

export const Newsletter: React.FC = () => {
  const isMobile = useIsMobile();
  const schema = yup.object().shape({
    email: yup.string().email().required("L'email est obligatoire."),
  });

  const [addUserToNewsletter, { data, loading, error }] = useMutation(
    ADD_USER_TO_NEWSLETTER,
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
    addUserToNewsletter({
      variables: {
        data,
      },
    }).then(() => reset());
  };
  return (
    <Container
      className="flex flex-col items-center | px-4
    | pt-9 pb-9 md:mt-4 text-center w-full bg-greenL"
      itemsCenter
    >
      <h2 className="text-xl font-semibold mt-4">
        Inscris-toi à la newsletter pour découvrir {isMobile && <br></br>} des
        astuces DIY {!isMobile && <br />} et être au courant des{" "}
        {isMobile && <br></br>} nouvelles recettes !
      </h2>

      <form
        className="flex mt-4 mb-4"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          className="shadow-lg rounded-lg h-12 w-full px-3 text-gray-700 min-w-18 border-2 border-grey-200 | focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Ton email"
          type="email"
          {...register("email")}
        ></input>

        <Button type="darkBlue" className="ml-2">
          Rejoindre
        </Button>
        <div>
          <p className="text-xs italic text-red-500">{errors.email?.message}</p>
        </div>
      </form>
      {data?.createNewsletter?.success && (
        <div className="text-green  md: mb-2 | text-center whitespace-pre-line">
          <h1>
            "Votre inscription a bien été prise en compte. À très vite dans
            votre boite mail !"
          </h1>
        </div>
      )}
      <div className="w-10/12 md:w-1/2 text-sm text-center md:text-base lg:mx-80">
        Nous utilisons cette newsletter uniquement pour garder notre communauté
        informée. Vous pouvez vous désinscrire à tout moment en nous contactant
        à hello@greenitcommunity.com.
      </div>
    </Container>
  );
};
