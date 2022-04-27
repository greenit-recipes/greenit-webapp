import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button, Footer, ModalLogGreenit, Navbar } from "components";
import { BackgroundImage } from "components/layout/BackgroundImage";
import { imageValidation } from "helpers/yup-validation.helper";
import { cloneDeep } from "lodash";
import CreateRecipeForm from "pages/CreateRecipe/CreateRecipeForm";
import {
  CREATE_EMAIL_RECIPE,
  EMAIL_LINK_SHARED_RECIPE,
  GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS,
} from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import authService from "services/auth.service";
import * as yup from "yup";
import { RecipeDifficulty } from "../../graphql";
import {
  fblogo,
  instalogo,
  pintlogo,
  tiktoklogo,
  wwwlogo,
  ytlogo,
} from "../../icons";

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
      })
    )
    .min(1, "Ce champ est obligatoire"),
  instructions: yup
    .array(
      yup.object({
        instruction: yup.string().required("Ce champ est obligatoire."),
      })
    )
    .min(1, "Ce champ est obligatoire"),
  utensils: yup
    .array(
      yup.object({
        quantity: yup.string().required("Ce champ est obligatoire."),
        name: yup.object().required("Ce champ est obligatoire."),
      })
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
    EMAIL_LINK_SHARED_RECIPE
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
      <BackgroundImage />
      <div className="grid w-full justify-items-center">
        <div className="w-4/5">
          <h1 className="mt-16 text-xl font-semibold text-center md:text-2xl">
            Partage ta recette avec la communauté
          </h1>
          <h3 className="mt-2 text-lg font-semibold text-center md:text-xl">
            Merci pour ton engagement !
          </h3>
        </div>
        <form
          className="p-4 my-10 bg-white rounded-lg shadow-lg md:p-10 md:w-1/2"
          // @ts-ignore
          onSubmit={handleSubmitLink(onSubmitHandlerLink)}
        >
          <div className="mb-4">
            <h2 className="text-lg font-semibold md:text-2xl">
              Partage ta recette à partir d'un lien existant
            </h2>
            <h3 className="block mt-2 text-sm font-semibold">
              Tu souhaites partager une recette de ton blog, ton instagram ou
              une publication facebook ?
            </h3>
            <h3 className="block text-sm font-semibold">
              Nous faisons attention à la duplication de contenu et nous
              t'enverrons un mail quand ta recette sera publiée !
            </h3>
            <h3 className="block text-sm font-bold">
              Ajoute le lien de la recette et nous la partagerons avec la
              communauté.
            </h3>
          </div>
          <div className="flex flex-col items-center lg:flex-row">
            <input
              className="w-5/6 px-3 pl-3 leading-tight text-gray-700 border rounded shadow width: lg:w-4/6 focus:outline-none py-1 focus:shadow-outline "
              placeholder="Lien de la recette"
              type="text"
              {...registerLink("link")}
            ></input>
            <div className="w-8 h-3"></div>
            <Button className="px-0 py-1-0" type="green">
              Envoyer ma recette
            </Button>
          </div>
          <p className="mt-2 text-xs italic text-red">
            {errosLink.link?.message}
          </p>
          <div className="mt-4">
            <h3 className="block mt-2 text-sm text-gray-700">
              Toutes les recettes sont automatiquement créditées au profil du
              créateur.ice. <br></br>
              Nous avons accès uniquement aux comptes Instagram et publications
              publics.
            </h3>
            <div className="flex flex-col mt-4 lg:flex-row lg:items-center">
              <h3 className="block mr-4 text-sm text-gray-700">
                Exemples de liens :
              </h3>
              <div className="flex flex-row gap-2">
                <img className="w-8" src={wwwlogo} alt="www-logo" />
                <img className="w-8" src={fblogo} alt="facebook-logo" />
                <img className="w-8" src={instalogo} alt="instagram-logo" />
                <img className="w-8" src={ytlogo} alt="youtube-logo" />
                <img className="w-8" src={tiktoklogo} alt="tiktok-logo" />
                <img className="w-8" src={pintlogo} alt="pinterest-logo" />
              </div>
            </div>
          </div>
        </form>
        <h2 className="text-lg font-bold md:text-2xl">Ou</h2>
        {isLoggedIn ? (
          <CreateRecipeForm />
        ) : (
          <div
            className="p-4 my-10 bg-white rounded-lg shadow-lg md:p-10 md:w-1/2"
            // @ts-ignore
          >
            <div className="text-xl mb-2">Pour ajouter une recette en utilisant un formulaire, connecte-toi !</div>
            <h3 className="text-sm font-semibold">Personnalise entiérement les éléments de ta recette et ajoute tes conseils de créateurs</h3>
            <ModalLogGreenit
              btn={
                <div className="flex m-auto mt-6">
                  <Button
                    id="Create_Profil"
                    type="blue"
                    rounded="lg"
                    className="inline justify-end self-center | cursor-pointer mr-2"
                  >
                    Accéder au profil
                  </Button>
                </div>
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
