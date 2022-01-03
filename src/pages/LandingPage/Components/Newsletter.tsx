import { Container, Button } from "../../../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ADD_USER_TO_NEWSLETTER } from "pages/LandingPage/Components/NewsletterRequest";
import { useMutation } from "@apollo/client";
import { useTranslation } from "react-i18next";

export const Newsletter: React.FC = () => {
  const { t, i18n } = useTranslation("common");

  const schema = yup.object().shape({
    email: yup.string().email().required("L'email est obligatoire."),
  });

  const [addUserToNewsletter, { data, loading, error }] = useMutation(
    ADD_USER_TO_NEWSLETTER
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
    <Container className="w-full md:w-3/5 h-full" margin={10} itemsCenter>
      <h1 className="text-xl md:text-2xl sm:w-3/4 | p-5 text-center">
        {t("landingPage.newsletter.title1")}
        {"\n"} {t("landingPage.newsletter.title2")}
      </h1>

      <form className="md:flex p-6" onSubmit={handleSubmit(onSubmitHandler)}>
        <input
          className="shadow-lg rounded-lg h-12 w-full px-3 text-gray-700 min-w-18 border-2 border-grey-200 | focus:outline-none focus:shadow-outline"
          id="email"
          placeholder="Ton email"
          type="email"
          {...register("email")}
        ></input>

        <div className="grid w-full justify-items-center mt-4 md:mt-0 md:ml-4">
          <Button type="green" className="p-4 sm:h-12">
          {t("landingPage.newsletter.button")}
          </Button>
        </div>
        <div>
          <p className="text-red-500 text-xs italic">{errors.email?.message}</p>
        </div>
      </form>
      {data?.createNewsletter?.success && (
        <div className="text-green text-base md:text-base mb-2 | text-center whitespace-pre-line">
                    {t("landingPage.newsletter.success")}
        </div>
      )}
      <div className="w-3/4 mb-20 text-xs md:text-sm text-center lg:mx-80">
      {t("landingPage.newsletter.info")}
      </div>
    </Container>
  );
};
