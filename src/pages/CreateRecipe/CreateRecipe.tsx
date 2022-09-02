import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button, Footer, Navbar } from "components";
import { imageValidation } from "helpers/yup-validation.helper";
import CreateRecipeForm from "pages/CreateRecipe/CreateRecipeForm";
import { EMAIL_LINK_SHARED_RECIPE } from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import authService from "services/auth.service";
import * as yup from "yup";
import {
  fblogo,
  instalogo,
  pintlogo,
  tiktoklogo,
  wwwlogo,
  ytlogo,
} from "../../icons";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

const schemaLink = yup.object().shape({
  link: yup.string().required("Ce champ est obligatoire."),
});

const schema = yup.object().shape({
  image: imageValidation(),
  videoUrl: yup.string(),
  name: yup.string().required("Ce champ est obligatoire."),
  duration: yup.string().required("Ce champ est obligatoire."),
  description: yup.string().required("Ce champ est obligatoire."),
  difficulty: yup.object().required("Ce champ est obligatoire."),
  category: yup.object().required("Ce champ est obligatoire."),
  expiry: yup.string().required("Ce champ est obligatoire."),
  ingredients: yup // Ne marche pas
    .array(
      yup.object({
        quantity: yup.string().required("Ce champ est obligatoire."),
        name: yup.object().required("Ce champ est obligatoire."),
      }),
    )
    .min(1, "Ce champ est obligatoire"),
  instructions: yup
    .array(
      yup.object({
        instruction: yup.string().required("Ce champ est obligatoire."),
      }),
    )
    .min(1, "Ce champ est obligatoire"),
  utensils: yup
    .array(
      yup.object({
        quantity: yup.string().required("Ce champ est obligatoire."),
        name: yup.object().required("Ce champ est obligatoire."),
      }),
    )
    .min(1, "Ce champ est obligatoire"),

  tags: yup.array().required("Ce champ est obligatoire."),
  notes_from_author: yup.string(),
  text_associate: yup.string(),
});

const CreateRecipe: React.FC = () => {
  const {
    register: registerLink,
    handleSubmit: handleSubmitLink,
    formState: { errors: errosLink },
  } = useForm({
    resolver: yupResolver(schemaLink),
  });

  const history = useHistory();

  const [emailLinkSharedRecipe, { loading: loadingLink }] = useMutation(
    EMAIL_LINK_SHARED_RECIPE,
  );

  const isLoggedIn = authService.isLoggedIn();

  const onSubmitHandlerLink = (dataLink: { link: string }) => {
    emailLinkSharedRecipe({
      variables: {
        link: dataLink.link,
      },
    }).then((res: any) => history.push(RouteName.recipeCreated));
  };

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  if (loadingLink) {
    return (
      <div className="flex flex-col items-center justify-center h-screen mt-5 ">
        <h2>
          Minute papillon ! 🦋 Ne quitte pas cette page, nous te rédigerons une
          fois l'email envoyé.
        </h2>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Navbar></Navbar>
      <Helmet>
        <title>Ajoutez vos recettes DIY | Inspirez la communauté</title>
        <meta
          name="description"
          content="Sur Greenit Community, vous pouvez ajouter vos recettes maison et naturelles pour inspirer la communauté du fait-maison. Chaque recette ajoutée est ensuite validée avant d’être publiée."
        />
      </Helmet>
      <div className="grid w-full justify-items-center mb-20">
        <div className="w-4/5 mt-10 md:mt-16">
          <h2 className="text-xl text-center md:text-2xl">
            Partage ta recette avec la communauté
          </h2>
          <h3 className="mt-2 text-lg font-regular text-center md:text-xl">
            Merci pour ta contribution ! 🙏
          </h3>
        </div>
        <form
          className="flex flex-col gap-2 bg-blueL p-4 md:p-8 mt-6 md:mt-10 rounded"
          // @ts-ignore
          onSubmit={handleSubmitLink(onSubmitHandlerLink)}
        >
          <h3 className="text-lg md:text-xl">À partir d’un lien existant</h3>
          <p className="text-sm font-regular">
            Tu souhaites partager une recette de ton blog, ton Instagram ou une
            publication Facebook ? Ajoute le lien de ta recette et nous la
            partagerons avec la communauté !{" "}
          </p>
          <div className="flex gap-2 mt-2">
            <input
              className="h-10 w-3/4 max-w-32 px-3 pl-3 leading-tight border rounded focus:outline-none py-1"
              placeholder="Lien de la recette"
              type="text"
              {...registerLink("link")}
            ></input>
            <Button className="w-24 h-10" type="darkBlue">
              Envoyer
            </Button>
          </div>
          <p className="mt-1 text-xs italic text-red">
            {errosLink.link?.message}
          </p>
          <p className="block text-sm">
            Nous nous assurons qu’il n’y ait pas de duplication de contenu et
            que le.a créateur.ice soit crédité.e.
          </p>
          <div className="flex items-center">
            <p className="block mr-4 text-sm">Exemples de liens :</p>
            <div className="flex flex-row gap-2">
              <i className="bx bx-globe text-3xl" />
              <i className="bx bxl-instagram-alt text-3xl" />
              <i className="bx bxl-pinterest text-3xl" />
              <i className="bx bxl-youtube text-3xl" />
              <i className="bx bxl-tiktok text-3xl" />
            </div>
          </div>
        </form>

        <h3 className="text-xl my-8">Ou</h3>

        {isLoggedIn ? (
          <CreateRecipeForm />
        ) : (
          <div className="flex flex-col gap-2 px-4">
            <h3 className="text-lg md:text-xl leading-6">
              Pour ajouter une recette en utilisant un formulaire, connecte-toi
              !
            </h3>

            <h4 className="text-sm font-regular leading-5">
              Personnalise entièrement les éléments de ta recette et ajoute tes
              conseils de créateurs.ices.
            </h4>
            <ModalLogGreenit
              btn={
                <Button
                  id="createRecipe-page-create-profil"
                  type="blue"
                  rounded="lg"
                  className="self-center mt-4"
                >
                  Accéder au profil
                </Button>
              }
            ></ModalLogGreenit>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
