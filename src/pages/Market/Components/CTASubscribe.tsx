import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "components/misc";
import useIsMobile from "hooks/isMobile";
import { ADD_USER_TO_NEWSLETTER } from "pages/LandingPage/Components/NewsletterRequest";
import { useForm } from "react-hook-form";
import {
  Market_Modal,
  BlueLCircle,
  MarketModal_Mobile,
} from "./../../../icons/index";
import { Container } from "../../../components/layout/Container";
import { NotificationAlert } from "../../../components/layout/NotificationAlert";

interface ICTASubscribe {
  className?: string;
}

export const CTASubscribe: React.FC<ICTASubscribe> = ({ className }) => {
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
      className="flex flex-col justify-center | p-6
    | mt-6 text-center w-full bg-yellowL"
      itemsCenter
    >
      {isMobile ? (
        <div className="flex flex-col items-center">
          <h3>
            🎁 &nbsp; 🎉 <br />
          </h3>
          <h3 className="leading-6 mt-1">
            Pour patienter avant le lancement, <br />
            nous t'offrons
          </h3>
          <div className="flex mt-1">
            <i className="bx bxs-discount rotate-90 text-3xl mt-1"></i>
            <h1 className="text-4xl"> -15 %</h1>
          </div>
          <p className="text-xs mt-2">
            valable dès le lancement de Greenit Market
          </p>
        </div>
      ) : (
        <div className="flex flex-col">
          <div className="flex items-center">
            <h3 className="leading-6 mt-1">
              🎁 &nbsp; 🎉 &nbsp; Pour patienter avant le lancement, nous
              t'offrons
            </h3>
            <div className="flex ml-3">
              <i className="bx bxs-discount rotate-90 text-3xl mt-2"></i>
              <h1 className="text-4xl"> -15 %</h1>
            </div>
          </div>
          <p className="text-xs mt-2">
            valable dès le lancement de Greenit Market
          </p>
        </div>
      )}

      <form
        className="flex flex-col md:flex-row md:gap-4 | mt-4 md:mb-4"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          className="rounded-md text-sm h-11 w-full px-3 text-darkBlue min-w-18 border-1 border-darkBlue | focus:outline-none focus:shadow-outline"
          id="landingPage-newsletter-email"
          placeholder="Ton e-mail pour recevoir la promotion"
          type="email"
          {...register("email")}
        ></input>

        <Button
          id="modalMarket-interest"
          type="yellow"
          className="mt-2 md:w-80 md:mt-0"
        >
          Ça m’intéresse !
        </Button>
        {errors.email?.message}
      </form>
      {data?.createNewsletter?.success && (
        <NotificationAlert
          title="Adresse e-mail bien reçue."
          text="Tu receveras un code promo dès le lancement !"
          type={"success"}
        />
      )}
    </Container>
  );
};
