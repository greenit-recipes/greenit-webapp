import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { RouteName } from "App";
import { Navbar, Button, Footer } from "components";
import { BackgroundImage } from "components/layout/BackgroundImage";
import {
  imageValidation,
  videoValidation,
} from "helpers/yup-validation.helper";
import {
  CREATE_EMAIL_RECIPE,
  GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS,
} from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useEffect } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import { RecipeDifficulty } from "../../graphql";

const schema = yup.object().shape({
  image: imageValidation(),
  video: videoValidation(),
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

  const optionsDifficulty = [
    { value: RecipeDifficulty.Beginner, label: "Facile" },
    { value: RecipeDifficulty.Intermediate, label: "Moyen" },
    { value: RecipeDifficulty.Advanced, label: "Difficile" },
  ];

  useEffect(() => {
    ingredientsAppend({});
    utensilsAppend({});
    instructionsAppend({});
  }, []);

  useEffect(() => {
    if (data?.register?.success === false || error) {
      if (data?.register?.errors?.email[0]?.code === "unique") {
        setError("email", {
          message: "Cet email éxiste déjà.",
        });
      }
      if (data?.register?.errors?.username[0]?.code === "unique") {
        setError("utilisateur", {
          message: "Ce nom existe déjà.",
        });
      }
    }
  }, [setError, error, data]);

  const onSubmitHandler = (dataForm: {
    name: string;
    userEmail: string;
    userUsername: string;
    userId: string;
    description: string;
    image: string[];
    video: string[];
    difficulty: string;
    ingredients: string[];
    duration: number;
    tags: string[];
    category: string;
    instructions: string[];
    expiry: string;
    utensils: string;
    notes_from_author: string;
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
        video: dataForm.video,
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
      },
    });
    history.push(RouteName.recipeCreated)
  };
  return (
    <div className="w-screen">
      <Navbar></Navbar>
      <BackgroundImage />
      <div className="grid justify-items-center w-screen">
        <div className="w-4/5">
          <h1 className="text-center text-xl md:text-2xl md:text-3xl mt-16">
            Publie ta recette et aide la communauté.
          </h1>
          <h3 className="text-center text-lg md:text-xl mt-2">
            Un grand merci pour ton engagement !
          </h3>
        </div>
        <form
          className="bg-white shadow-lg rounded-lg p-4 md:p-10 my-10 md:w-1/2"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          {/* Input */}
          <div className="mb-10">
            <label className="block text-gray-700 text-xl">
              Nom de la recette
            </label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Par exemple : Masque à la coco
            </h4>
            <textarea
              className="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              placeholder="nom de la recette"
              {...register("name")}
            ></textarea>
            <p className="text-red-500 text-xs italic">
              {errors.name?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Description
            </label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Pourquoi tu utilises ces ingrédients ?
              <br /> Comment tu utilises le produit ?
            </h4>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="description"
              rows={12}
              cols={34}
              {...register("description")}
            ></textarea>
            <p className="text-red-500 text-xs italic">
              {errors.description?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">Photos</label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Upload une jolie photo du résultat !
            </h4>
            <input
              className="p-4 border-2"
              type="file"
              {...register("image")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.image?.message}
            </p>
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
            <p className="text-red-500 text-xs italic">
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
            <p className="text-red-500 text-xs italic">
              {errors.category?.message}
            </p>
          </div>

          {/* Time */}

          <div className="mb-10 w-2/3">
            <label className="block text-gray-700 text-xl mb-2">Durée</label>
            <h4 className="block text-gray-700 text-sm mb-2">
              10m, 15m, 30m ...
            </h4>

            <input
              className="shadow appearance-none border rounded w-full text-sm lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="durée en minutes"
              type="number"
              {...register("duration")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.duration?.message}
            </p>
          </div>

          {/* Select multiple */}

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">Tags</label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Ces tags faciliteront le référencement de ta recette.
            </h4>

            <Controller
              name="tags"
              control={control}
              render={({ field }) => {
                const optionsTags = data?.allTags?.map((tags: any) => ({
                  value: tags?.name,
                  label: tags?.name,
                }));
                return (
                  <Select
                    {...field}
                    placeholder={`sélectionne...`}
                    isMulti={true}
                    options={optionsTags}
                    className={`w-2/3 md:w-1/2`}
                  />
                );
              }}
            />
            <p className="text-red-500 text-xs italic">
              {errors.tags?.message}
            </p>
          </div>
          {/* dynamic */}

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Ingrédients et quantité
            </label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Ajoute les ingrédients ainsi que la quantité.
            </h4>
            <h4 className="block text-gray-700 text-sm mb-4">
              Exemple : 2 cuillères à café | beurre de karité
            </h4>
            <ul>
              {ingredientsFields.map((item, index) => (
                <li className="grid grid-cols-3 gap-2">
                  <input
                    className="col-span-1 | p-2 text-sm border-2 border-gray-300 rounded"
                    placeholder=" 10g 0.5l..."
                    {...register(`ingredients.${index}.quantity`)}
                  />
                                    <p className="text-red-500 text-xs italic">
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
                      return (
                        <Select
                          {...field}
                          placeholder={`sélectionne...`}
                          options={optionsIngredients}
                          className={`col-span-2`}
                        />
                      );
                    }}
                  />
                                                  <p className="text-red-500 text-xs italic">
                    {errors?.ingredients?.[index]?.name?.message}
                  </p>
                  <div
                    className="col-span-3 | flex justify-self-end mb-2"
                    onClick={() => ingredientsRemove(index)}
                  >
                    Supprimer
                  </div>
                </li>
              ))}
            </ul>
            <div onClick={() => ingredientsAppend({}, { shouldFocus: true })}>
              Ajouter un ingrédient
            </div>
            <p className="text-red-500 text-xs italic">
              {errors.ingredients?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Upload video
            </label>
            <input
              className="p-4 border-2"
              type="file"
              {...register("video")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.video?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Liste d'instructions
            </label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Comment réalises-tu ta recette ?
            </h4>
            <h4 className="block text-gray-700 text-sm mb-4">
              Par exemple : <br />
              1 Ajouter l'huile de noisette dans le chauffe-tout <br />
              2 Remuer rapidement jusqu'à ce que la préparation devienne liquide{" "}
              <br />3 ...
            </h4>

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

                      <div
                        className="justify-self-end mb-2"
                        onClick={() => instructionsRemove(index)}
                      >
                        Delete
                      </div>
                    </li>
                    <p className="text-red-500 text-xs italic">
                      {errors?.instructions?.[index]?.instruction?.message}
                    </p>
                  </>
                ))}
              </ul>
              <div
                onClick={() => instructionsAppend({}, { shouldFocus: true })}
              >
                Ajouter une étape
              </div>
            </div>
            <p className="text-red-500 text-xs italic">
              {errors.instructions?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Ustensiles et quantité
            </label>
            <h4 className="block text-gray-700 text-sm mb-2">
              Indique les ustensiles et leurs quantités.
            </h4>
            <h4 className="block text-gray-700 text-sm mb-4">
              Exemple: 2 fouets | 1 balance...
            </h4>
            <ul>
              {utensilsFields.map((item, index) => (
                <li className="grid grid-cols-3 gap-2">
                  <input
                    className="col-span-1 | text-sm border-2 border-gray-300 rounded p-1"
                    placeholder="nombre"
                    {...register(`utensils.${index}.quantity`)}
                  />
                  <p className="text-red-500 text-xs italic">
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
                      return (
                        <Select
                          {...field}
                          placeholder={`sélectionne...`}
                          options={optionsUtensilss}
                          className={`col-span-2`}
                        />
                      );
                    }}
                  />
                  <p className="text-red-500 text-xs italic">
                    {errors?.utensils?.[index]?.name?.message}
                  </p>
                  <div
                    onClick={() => utensilsRemove(index)}
                    className="col-span-3 | flex justify-self-end mb-2"
                  >
                    Supprimer
                  </div>
                </li>
              ))}
            </ul>
            <div onClick={() => utensilsAppend({}, { shouldFocus: true })}>
              Ajouter un ustensile
            </div>
            <p className="text-red-500 text-xs italic">
              {errors.utensils?.message}
            </p>
          </div>

          <div className="mb-10">
            <label className="block text-gray-700 text-xl mb-2">
              Conservation
            </label>
            <h4 className="block text-gray-700 text-sm">
              Comment et combien de temps conserves-tu ton produit ?
            </h4>
            <h4 className="block text-gray-700 text-sm mb-4">
              Exemple : 4 mois à température ambiante
            </h4>

            <input
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expiry"
              placeholder="temps de conservation"
              type="text"
              {...register("expiry")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.expiry?.message}
            </p>
          </div>

          <div className="mb-12">
            <label className="block text-gray-700 text-xl mb-2">
              Note de l'auteur.e
            </label>
            <h4 className="block text-gray-700 text-sm mb-4 w-11/12">
              Par exemple : Vous pouvez ajouter une huile de Jojoba si vous avez
              la peau grasse.
            </h4>
            <input
              className="shadow appearance-none border rounded w-full lg:w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="notes_from_author"
              placeholder="tes conseils et astuces"
              type="text"
              {...register("notes_from_author")}
            ></input>
            <p className="text-red-500 text-xs italic">
              {errors.notes_from_author?.message}
            </p>
          </div>

          {/* Submit */}

          <div className="grid justify-items-center w-full">
            <Button
              className="px-2 py-3"
              type="green"
              disabled={loadingCreateRecipe}
            >
              <h1 className="text-lg text-white hover:text-green">
                Envoyer ma recette
              </h1>
            </Button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateRecipe;
