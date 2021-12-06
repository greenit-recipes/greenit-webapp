import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
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
    .array().min(1, "Ce champ est obligatoire")
    .required("Ce champ est obligatoire."),
  instructions: yup // Ne marche pas
    .array(yup.string())
    .min(1, "Ce champ est obligatoire")
    .required("Ce champ est obligatoire."),
  utensils: yup // Ne marche pas
    .array()
    .min(1, "Ce champ est obligatoire")
    .required("Ce champ est obligatoire."),

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

  const { loading, error, data } = useQuery(
    GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS
  );
  const [createEmailRecipe, { loading: loadingCreateRecipe}] = useMutation(CREATE_EMAIL_RECIPE);

  const optionsDifficulty = [
    { value: RecipeDifficulty.Beginner, label: "Facile" },
    { value: RecipeDifficulty.Intermediate, label: "Moyen" },
    { value: RecipeDifficulty.Advanced, label: "Difficile" },
  ];

  useEffect(() => {
    ingredientsAppend({});
    utensilsAppend({});
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
  };
  return (
    <div className="w-full  max-w-xs">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        {/* Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom de la recette
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            placeholder="name"
            type="text"
            {...register("name")}
          ></input>
          <p className="text-red-500 text-xs italic">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description de la recette
          </label>
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

        {/* Select */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Difficulté de la recette
          </label>
          <Controller
            name="difficulty"
            control={control}
            render={({ field }) => (
              <Select {...field} options={optionsDifficulty} />
            )}
          />
          <p className="text-red-500 text-xs italic">
            {errors.difficulty?.message}
          </p>
        </div>

        {/* Time */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Durée de la recette (minutes)
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="duration"
            type="number"
            min="1"
            max="1000"
            {...register("duration")}
          ></input>
          <p className="text-red-500 text-xs italic">
            {errors.duration?.message}
          </p>
        </div>

        {/* Select multiple */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner le(s) tags de la recette
          </label>

          <Controller
            name="tags"
            control={control}
            render={({ field }) => {
              const optionsTags = data?.allTags?.map((tags: any) => ({
                value: tags?.name,
                label: tags?.name,
              }));
              return <Select {...field} isMulti={true} options={optionsTags} />;
            }}
          />
          <p className="text-red-500 text-xs italic">{errors.tags?.message}</p>
        </div>
        {/* dynamic */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner les ingrédients et la quantité
          </label>
          <ul>
            {ingredientsFields.map((item, index) => (
              <li>
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
                    return <Select {...field} options={optionsIngredients} />;
                  }}
                />
                <input
                  placeholder="(kg,littre,cm)"
                  {...register(`ingredients.${index}.quantity`)}
                />
                <button type="button" onClick={() => ingredientsRemove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => ingredientsAppend({})}>
            Ajouter
          </button>
          <p className="text-red-500 text-xs italic">
            {errors.ingredients?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner la catégorie
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
              return <Select {...field} options={optionsCategory} />;
            }}
          />
          <p className="text-red-500 text-xs italic">
            {errors.category?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Liste d'instruction
          </label>
          <div className="mb-4">
            <ul>
              {instructionsFields.map((item, index) => (
                <li key={item.id}>
                  <input {...register(`instructions.${index}.instruction`)} />

                  <button
                    type="button"
                    onClick={() => instructionsRemove(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => instructionsAppend({})}>
              Ajouter
            </button>
          </div>
          <p className="text-red-500 text-xs italic">
            {errors.instructions?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner les ustensiles et la quantité
          </label>
          <ul>
            {utensilsFields.map((item, index) => (
              <li>
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
                    return <Select {...field} options={optionsUtensilss} />;
                  }}
                />
                <input
                  placeholder=""
                  {...register(`utensils.${index}.quantity`)}
                />
                <button type="button" onClick={() => utensilsRemove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => utensilsAppend({})}>
            Ajouter
          </button>
          <p className="text-red-500 text-xs italic">
            {errors.utensils?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Conservation
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="expiry"
            placeholder="expiry"
            type="number"
            min="1"
            max="1000"
            {...register("expiry")}
          ></input>
          <p className="text-red-500 text-xs italic">
            {errors.expiry?.message}
          </p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Note de l'auteur
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="notes_from_author"
            placeholder="notes_from_author"
            type="text"
            {...register("notes_from_author")}
          ></input>
          <p className="text-red-500 text-xs italic">
            {errors.notes_from_author?.message}
          </p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload l'image
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            {...register("image")}
          ></input>
          <p className="text-red-500 text-xs italic">{errors.image?.message}</p>
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Upload video
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="file"
            {...register("video")}
          ></input>
          <p className="text-red-500 text-xs italic">{errors.video?.message}</p>
        </div>

        {/* Submit */}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loadingCreateRecipe}
          >
            Soumettre ma recette
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
