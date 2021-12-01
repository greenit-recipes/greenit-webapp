import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { imageValidation, videoValidation } from "helpers/yup-validation.helper";
import {
  CREATE_EMAIL_RECIPE,
  GET_ALL_CATEGORIES_TAGS_UTENSILS_INGREDIENTS,
} from "pages/CreateRecipe/CreateRecipeRequest";
import React, { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as yup from "yup";
import { RecipeDifficulty } from "../../graphql";

const schema = yup.object().shape({
  image: imageValidation(),
  video: videoValidation(),
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
  const [createEmailRecipe] = useMutation(CREATE_EMAIL_RECIPE);

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
    createEmailRecipe({
      variables: {
        name: dataForm.name,
        userEmail: data.me.email,
        userUsername: data.me.username,
        userId: data.me.id,
        image: dataForm.image,
        video: dataForm.video,
        description: dataForm.description,
        difficulty: dataForm.difficulty,
        ingredients: dataForm.ingredients,
        duration: dataForm.duration,
        tags: dataForm.tags,
        category: dataForm.category,
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
          <p className="text-red text-xs italic">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Description de la recette
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="description"
            type="text"
            {...register("description")}
          ></input>
          <p className="text-red text-xs italic">
            {errors.description?.message}
          </p>
        </div>

        {/* Select */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Difficulté de la recette
          </label>

          <select {...register("difficulty")}>
            <option value={RecipeDifficulty.Beginner}>Facile</option>
            <option value={RecipeDifficulty.Intermediate}>Moyen</option>
            <option value={RecipeDifficulty.Advanced}>Difficile</option>
          </select>
        </div>

        {/* Time */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Durée de la recette
          </label>

          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="duration"
            placeholder="duration"
            type="number"
            min="1"
            max="300"
            {...register("duration")}
          ></input>
        </div>

        {/* Select multiple */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner le(s) tags de la recette
          </label>

          <select {...register("tags")} id="tags" multiple>
            {data?.allTags.map((tags: any, i: number) => (
              <option value={tags?.name} key={i}>
                {tags?.name}
              </option>
            ))}
          </select>
        </div>
        {/* dynamic */}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner les ingrédients et la quantité
          </label>
          <ul>
            {ingredientsFields.map((item, index) => (
              <li key={item.id}>
                <select
                  {...register(`ingredients.${index}.name`)}
                  id="ingredients"
                >
                  {data?.allIngredients?.map((ingredient: any, i: number) => (
                    <option value={ingredient?.name} key={i}>
                      {" "}
                      {/* A changer quand on sera plus par mail */}
                      {ingredient?.name}
                    </option>
                  ))}
                </select>
                <input {...register(`ingredients.${index}.quantity`)} />

                <button type="button" onClick={() => ingredientsRemove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => ingredientsAppend({})}>
            Ajouter
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner la catégorie
          </label>

          <select {...register("category")} id="category">
            {data?.allCategories?.map((category: any, i: number) => (
              <option value={category?.name} key={i}>
                {category?.name}
              </option>
            ))}
          </select>
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
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Séléctionner les ustensiles et la quantité
          </label>
          <ul>
            {utensilsFields.map((item, index) => (
              <li key={item.id}>
                <select {...register(`utensils.${index}.name`)} id="utensils">
                  {data?.allUtensils?.map((ingredient: any, i: number) => (
                    <option value={ingredient?.name} key={i}>
                      {" "}
                      {/* A changer quand on sera plus par mail */}
                      {ingredient?.name}
                    </option>
                  ))}
                </select>
                <input {...register(`utensils.${index}.quantity`)} />

                <button type="button" onClick={() => utensilsRemove(index)}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => utensilsAppend({})}>
            Ajouter
          </button>
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
            {...register("expiry")}
          ></input>
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
          <p className="text-red text-xs italic">{errors.name?.message}</p>
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
          <p className="text-red text-xs italic">{errors.image?.message}</p>
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
          <p className="text-red text-xs italic">{errors.video?.message}</p>
        </div>

        {/* Submit */}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue hover:bg-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Soumettre ma recette
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateRecipe;
