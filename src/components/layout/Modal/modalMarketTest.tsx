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
import { Container } from "../Container";
import { NotificationAlert } from "../NotificationAlert";

interface ModalMarketTest {
  className?: string;
}

export const ModalMarketTest: React.FC<ModalMarketTest> = ({ className }) => {
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
      className="flex flex-col items-center | px-4 pt-10
    | md:mt-4 text-center w-full"
      itemsCenter
    >
      {isMobile ? (
        <img src={MarketModal_Mobile} className="absolute top-30 z-0"></img>
      ) : (
        <img
          src={Market_Modal}
          className="w-3/5 absolute top-28 z-0 scale-105"
        ></img>
      )}
      <div className="z-20 fixed top-10">
        <h2 className="leading-6">
          <span className="text-yellow"> Greenit Market</span> est en
          construction !
        </h2>
        <h5 className="text-sm leading-5 mt-2">
          L’achat des ingrédients sera disponible
          <br />
          en décembre 2022.
        </h5>
      </div>
      <h3 className="mt-28 z-10 leading-6">
        Pour te remercier de ta <br /> confiance, nous t'offrons
      </h3>
      <div className="flex mt-3 z-10">
        <i className="bx bxs-discount rotate-90 text-4xl mt-3"></i>
        <h1 className="text-5xl"> -15 %</h1>
      </div>
      <p className="text-sm z-10 mt-4">
        lors du futur lancement <br />
        de Greenit Market
      </p>
      <div className="h-24 md:h-36"></div>

      <form
        className="flex flex-col mt-4 mb-4 md:w-1/2"
        // @ts-ignore
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <input
          className="rounded-md text-sm h-11 w-full px-3 text-darkBlue min-w-18 border-1 border-darkBlue | focus:outline-none focus:shadow-outline z-10"
          id="landingPage-newsletter-email"
          placeholder="Ton e-mail pour recevoir la promotion"
          type="email"
          {...register("email")}
        ></input>

        <Button id="modalMarket-interest" type="yellow" className="mt-2 z-10">
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
