import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Button, Footer, Navbar } from "components";
import { BackgroundImage } from "components/layout/BackgroundImage";
import { imageValidation } from "helpers/yup-validation.helper";
import { cloneDeep } from "lodash";
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
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    register: registerLink,
    handleSubmit: handleSubmitLink,
    formState: { errors: errosLink },
  } = useForm({
    resolver: yupResolver(schemaLink),
  });

  const {
    fields: ingredientsFields,
    append: ingredientsAppend,
    remove: ingredientsRemove,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: instructionsFields,
    append: instructionsAppend,
    remove: instructionsRemove,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const {
    fields: utensilsFields,
    append: utensilsAppend,
    remove: utensilsRemove,
  } = useFieldArray({
    control,
    name: "utensils",
  });
  const history = useHistory();

  const { loading, error, data } = useQuery(
    GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS
  );

  const [createEmailRecipe, { loading: loadingCreateRecipe }] =
    useMutation(CREATE_EMAIL_RECIPE);

  const [emailLinkSharedRecipe, { loading: loadingLink }] = useMutation(
    EMAIL_LINK_SHARED_RECIPE
  );

  const optionsDifficulty = [
    { value: RecipeDifficulty.Beginner, label: "Facile" },
    { value: RecipeDifficulty.Intermediate, label: "Moyen" },
    { value: RecipeDifficulty.Advanced, label: "Difficile" },
  ];

  useEffect(() => {
    if (data?.register?.success === false || error) {
      if (data?.register?.errors?.email[0]?.code === "unique") {
        setError("email", {
          message: "Cet email existe déjà.",
        });
      }
      if (data?.register?.errors?.username[0]?.code === "unique") {
        setError("utilisateur", {
          message: "Ce nom existe déjà.",
        });
      }
    }
  }, [setError, error, data]);

  const onSubmitHandlerLink = (dataLink: { link: string }) => {
    emailLinkSharedRecipe({
      variables: {
        link: dataLink.link,
      },
    }).then((res: any) => history.push(RouteName.recipeCreated));
  };

  const onSubmitHandler = (dataForm: {
    name: string;
    userEmail: string;
    userUsername: string;
    userId: string;
    description: string;
    image: string[];
    videoUrl: string;
    difficulty: string;
    ingredients: string[];
    duration: number;
    tags: string[];
    category: string;
    instructions: string[];
    expiry: string;
    utensils: string;
    notes_from_author: string;
    text_associate: string;
  }) => {
    if (loadingCreateRecipe) return;
    const getValue = (field: any) => field.value;
    const getValues = (field: any[]) => field.map((x) => x?.value);
    createEmailRecipe({
      variables: {
        name: dataForm.name,
        userEmail: data.me.email,
        userUsername: data.me.username,
        userId: data.me.id,
        image: dataForm.image,
        videoUrl: dataForm.videoUrl,
        description: dataForm.description,
        difficulty: getValue(dataForm.difficulty),
        ingredients: dataForm.ingredients,
        duration: dataForm.duration,
        tags: getValues(dataForm.tags),
        category: getValue(dataForm.category),
        instructions: dataForm.instructions,
        expiry: dataForm.expiry,
        utensils: dataForm.utensils,
        notesFromAuthor: dataForm.notes_from_author,
        textAssociate: dataForm.text_associate,
      },
    }).then((res) => {
      if (res?.data?.sendEmailRecipe?.success)
        history.push(RouteName.recipeCreated);
    });
  };
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  useEffect(() => {
    ingredientsAppend({}, { shouldFocus: false });
    utensilsAppend({}, { shouldFocus: false });
    instructionsAppend({}, { shouldFocus: false });
  }, []);

  if (loadingCreateRecipe) {
    return (
      <div className="flex flex-col items-center justify-center mt-5 h-screen ">
        <h2>
          Minute papillon ! 🦋 <br />
          Tes médias sont en train de se télécharger.
          <br />
          Ne quitte pas cette page, nous te rédigerons une fois l’upload
          terminé.
        </h2>
      </div>
    );
  }

  if (loadingLink) {
    return (
      <div className="flex flex-col items-center justify-center mt-5 h-screen ">
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
      <div className="grid justify-items-center w-full">
        <div className="w-4/5">
          <h1 className="text-center text-xl md:text-2xl md:text-3xl mt-16 font-semibold">
            Partage ta recette avec la communauté
          </h1>
          <h3 className="text-center text-lg md:text-xl mt-2 font-semibold">
            Merci pour ton engagement !
          </h3>
        </div>
        <form
          className="bg-white shadow-lg rounded-lg p-4 md:p-10 my-10 md:w-1/2"
          onSubmit={handleSubmitLink(onSubmitHandlerLink)}
        >
          <div className="mb-4">
            <h2 className="text-lg md:text-2xl font-semibold">
              Partage ta recette à partir d'un lien existant
            </h2>
            <h3 className="block text-sm mt-2 font-semibold">
              Tu souhaites partager une recette de ton blog, ton instagram ou
              une publication facebook ?
            </h3>
            <h3 className="block text-sm mt-2 font-semibold">
              Nous faisons attention à la duplication de contenu et nous
              t'enverrons un mail quand ta recette sera publiée !
            </h3>
            <h3 className="block text-sm font-bold">
              Ajoute le lien de la recette et nous la partagerons avec la
              communauté.
            </h3>
          </div>
          <div className="flex flex-col lg:flex-row items-center">
            <input
              className="text-gray-700 width: w-5/6 lg:w-4/6 focus:outline-none px-3 py-1 focus:shadow-outline shadow border rounded pl-3 leading-tight focus:outline-none focus:shadow-outline  "
              placeholder="Lien de la recette"
              type="text"
              {...registerLink("link")}
            ></input>
            <div className="h-3 w-8"></div>
            <Button className="px-0 py-0" type="green">
              Envoyer ma recette
            </Button>
          </div>
          <p className="text-red text-xs italic mt-2">
            {errosLink.link?.message}
          </p>
          <div className="mt-4">
            <h3 className="block text-gray-700 text-sm mt-2">
              Toutes les recettes sont automatiquement créditées au profil du
              créateur.ice. <br></br>
              Nous avons accès uniquement aux comptes Instagram et publications
              publics.
            </h3>
            <div className="flex flex-col lg:flex-row mt-4 lg:items-center">
              <h3 className="block text-gray-700 text-sm mr-4">
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
        <h2 className="text-lg md:text-2xl font-bold">Ou</h2>
        <form
          className="bg-white shadow-lg rounded-lg p-4 md:p-10 my-10 md:w-1/2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Input */}
          <div className="mb-10">
            <h2 className="text-lg md:text-2xl mt-2 font-bold">
              Utilise le formulaire pour partager ta recette
            </h2>
            <label className="block text-gray-700 text-xl">
              Nom de la recette
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Par exemple : Masque à la coco
            </h3>
            <textarea
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              placeholder="nom de la recette"
              {...register("name")}
            ></textarea>
            <p className="text-red text-xs italic">{errors.name?.message}</p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Description
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Pourquoi tu utilises ces ingrédients ?
              <br /> Comment tu utilises le produit ?
            </h3>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="description"
              rows={12}
              cols={34}
              {...register("description")}
            ></textarea>
            <p className="text-red text-xs italic">
              {errors.description?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">Photos</label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Upload une jolie photo du résultat !
            </h3>
            <input
              className="p-4 border-2"
              type="file"
              {...register("image")}
            ></input>
            <p className="text-red text-xs italic">{errors.image?.message}</p>
          </div>

          {/* Select */}
          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Difficulté
            </label>
            <Controller
              name="difficulty"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  placeholder={`sélectionne...`}
                  options={optionsDifficulty}
                  className={`w-2/3 md:w-1/2`}
                />
              )}
            />
            <p className="text-red text-xs italic">
              {errors.difficulty?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Catégorie
            </label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => {
                const optionsCategory = data?.allCategories?.map(
                  (category: any) => ({
                    value: category?.name,
                    label: category?.name,
                  })
                );
                return (
                  <Select
                    {...field}
                    placeholder={`sélectionne...`}
                    className={`w-2/3 md:w-1/2`}
                    options={optionsCategory}
                  />
                );
              }}
            />
            <p className="text-red text-xs italic">
              {errors.category?.message}
            </p>
          </div>

          {/* Time */}

          <div className="mb-10 w-2/3">
            <label className="block text-gray-700 text-xl mb-2">Durée</label>
            <h3 className="block text-gray-700 text-sm mb-2">
              10m, 15m, 30m ...
            </h3>

            <input
              className="shadow appearance-none border rounded w-full text-sm lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="durée en minutes"
              type="number"
              {...register("duration")}
            ></input>
            <p className="text-red text-xs italic">
              {errors.duration?.message}
            </p>
          </div>

          {/* Select multiple */}

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">Tags</label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Ces tags faciliteront le référencement de ta recette.
            </h3>

            <Controller
              name="tags"
              control={control}
              render={({ field }) => {
                const optionsTags = data?.allTags?.map((tags: any) => ({
                  value: tags?.name,
                  label: tags?.name,
                }));
                const tagWithUserValue = cloneDeep(optionsTags);
                const handleChange = (textType: string) => {
                  tagWithUserValue.push({
                    value: textType,
                    label: textType,
                  });
                };
                return (
                  <Select
                    {...field}
                    onInputChange={handleChange}
                    placeholder={`sélectionne...`}
                    isMulti={true}
                    options={tagWithUserValue}
                    className={`w-2/3 md:w-1/2`}
                  />
                );
              }}
            />
            <p className="text-red text-xs italic">{errors.tags?.message}</p>
          </div>
          {/* dynamic */}

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Ingrédients et quantité
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Ajoute les ingrédients ainsi que la quantité.
            </h3>
            <h3 className="block text-gray-700 text-sm mb-4">
              Exemple : 2 cuillères à café | beurre de karité
            </h3>
            <ul>
              {ingredientsFields.map((item, index) => (
                <li className="grid grid-cols-3 gap-2">
                  <input
                    className="col-span-1 | p-2 text-sm border-2 border-gray-300 rounded"
                    placeholder=" 10g 0.5l..."
                    {...register(`ingredients.${index}.quantity`)}
                  />
                  <p className="text-red text-xs italic">
                    {errors?.ingredients?.[index]?.quantity?.message}
                  </p>
                  <Controller
                    name={`ingredients.${index}.name`}
                    control={control}
                    render={({ field }) => {
                      const optionsIngredients = data?.allIngredients?.map(
                        (ingredient: any) => ({
                          value: ingredient?.name,
                          label: ingredient?.name,
                        })
                      );
                      const ingredientsUserValue =
                        cloneDeep(optionsIngredients);
                      const handleChange = (textType: string) => {
                        ingredientsUserValue.push({
                          value: textType,
                          label: textType,
                        });
                      };
                      return (
                        <Select
                          {...field}
                          onInputChange={handleChange}
                          placeholder={`sélectionne...`}
                          options={ingredientsUserValue}
                          className={`col-span-2`}
                        />
                      );
                    }}
                  />
                  <p className="text-red text-xs italic">
                    {errors?.ingredients?.[index]?.name?.message}
                  </p>
                  <div
                    className="col-span-3 | cursor-pointer flex justify-self-end mb-2 bg-red text-white rounded-lg py-1 px-2"
                    onClick={() => ingredientsRemove(index)}
                  >
                    Supprimer
                  </div>
                </li>
              ))}
            </ul>
            <div
              onClick={() => ingredientsAppend({}, { shouldFocus: true })}
              className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-44 text-center"
            >
              Ajouter un ingrédient
            </div>
            <p className="text-red text-xs italic">
              {errors.ingredients?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Lien de ton post ou de ta vidéo
            </label>
            <input
              {...register("videoUrl")}
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Lien de ton post ou de ta vidéo"
              type="text"
            ></input>
            <p className="text-red text-xs italic">
              {errors.videoUrl?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Liste d'instructions
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Comment réalises-tu ta recette ?
            </h3>
            <h3 className="block text-gray-700 text-sm mb-4">
              Par exemple : <br />
              1 Ajouter l'huile de noisette dans le chauffe-tout <br />2 Remuer
              rapidement jusqu'à ce que la préparation devienne liquide <br />3
              ...
            </h3>

            <div className="mb-10">
              <ul>
                {instructionsFields.map((item, index) => (
                  <>
                    <li
                      key={item.id}
                      className={`grid grid-rows-2 grid-cols-1`}
                    >
                      <input
                        className={`border-2 mb-2`}
                        {...register(`instructions.${index}.instruction`)}
                      />

                      <p className="text-red text-xs italic">
                        {errors?.instructions?.[index]?.instruction?.message}
                      </p>

                      <div
                        className="justify-self-end cursor-pointer mb-2 bg-red text-white rounded-lg py-1 px-2"
                        onClick={() => instructionsRemove(index)}
                      >
                        Supprimer
                      </div>
                    </li>
                  </>
                ))}
              </ul>
              <div
                onClick={() => instructionsAppend({}, { shouldFocus: true })}
                className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-40 text-center"
              >
                Ajouter une étape
              </div>
            </div>
            <p className="text-red text-xs italic">
              {errors.instructions?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Ustensiles et quantité
            </label>
            <h3 className="block text-gray-700 text-sm mb-2">
              Indique les ustensiles et leurs quantités.
            </h3>
            <h3 className="block text-gray-700 text-sm mb-4">
              Exemple: 2 fouets | 1 balance...
            </h3>
            <ul>
              {utensilsFields.map((item, index) => (
                <li className="grid grid-cols-3 gap-2">
                  <input
                    className="col-span-1 | text-sm border-2 border-gray-300 rounded p-1"
                    placeholder="nombre"
                    {...register(`utensils.${index}.quantity`)}
                  />
                  <p className="text-red text-xs italic">
                    {errors?.utensils?.[index]?.quantity?.message}
                  </p>
                  <Controller
                    name={`utensils.${index}.name`}
                    control={control}
                    render={({ field }) => {
                      const optionsUtensilss = data?.allUtensils?.map(
                        (ustenil: any) => ({
                          value: ustenil?.name,
                          label: ustenil?.name,
                        })
                      );
                      const optionsUtensilssUserValue =
                        cloneDeep(optionsUtensilss);
                      const handleChange = (textType: string) => {
                        optionsUtensilssUserValue.push({
                          value: textType,
                          label: textType,
                        });
                      };
                      return (
                        <Select
                          {...field}
                          onInputChange={handleChange}
                          placeholder={`sélectionne...`}
                          options={optionsUtensilss}
                          className={`col-span-2`}
                        />
                      );
                    }}
                  />
                  <p className="text-red text-xs italic">
                    {errors?.utensils?.[index]?.name?.message}
                  </p>
                  <div
                    onClick={() => utensilsRemove(index)}
                    className="col-span-3 | flex cursor-pointer justify-self-end mb-2 bg-red text-white rounded-lg py-1 px-2"
                  >
                    Supprimer
                  </div>
                </li>
              ))}
            </ul>
            <div
              onClick={() => utensilsAppend({}, { shouldFocus: true })}
              className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-44 text-center"
            >
              Ajouter un ustensile
            </div>
            <p className="text-red text-xs italic">
              {errors.utensils?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Conservation
            </label>
            <h3 className="block text-gray-700 text-sm">
              Comment et combien de temps conserves-tu ton produit ?
            </h3>
            <h3 className="block text-gray-700 text-sm mb-4">
              Exemple : 4 mois à température ambiante
            </h3>

            <input
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiry"
              placeholder="temps de conservation"
              type="text"
              {...register("expiry")}
            ></input>
            <p className="text-red text-xs italic">{errors.expiry?.message}</p>
          </div>

          <div className="mb-12">
            <label className="block text-gray-700 text-xl mb-2">
              Note de l'auteur.e
            </label>
            <h3 className="block text-gray-700 text-sm mb-4 w-11/12">
              Par exemple : Vous pouvez ajouter une huile de Jojoba si vous avez
              la peau grasse.
            </h3>
            <input
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="notes_from_author"
              placeholder="tes conseils et astuces"
              type="text"
              {...register("notes_from_author")}
            ></input>
            <p className="text-red text-xs italic">
              {errors.notes_from_author?.message}
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-gray-700 text-xl mb-2">
              Rajoute le lien de ton site (si tu en as un)
            </label>
            <input
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="text_associate"
              placeholder="ton lien vers ton site :) "
              type="text"
              {...register("text_associate")}
            ></input>
            <p className="text-red text-xs italic">
              {errors.text_associate?.message}
            </p>
          </div>

          {/* Submit */}

          <div className="grid justify-items-center w-full">
            <Button
              className="px-2 py-3 text-lg"
              type="green"
              disabled={loadingCreateRecipe}
            >
              Envoyer ma recette
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
