import React, { useEffect } from "react";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import { sum, map, filter } from "lodash";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { UPDATE_ACCOUNT } from "services/auth.service";
import { useMutation } from "@apollo/client";

interface IUser {
  user: {
    biographie: string;
    urlsSocialMedia: string[];
    recipeAuthor: {
      numberOfLikes: string;
      nbrView: string;
    }[];
  };
}

export const CreatorProfil: React.FC<IUser> = ({ user }) => {
  const nbrLikes = map(user?.recipeAuthor, "numberOfLikes");
  const nbrView = map(user?.recipeAuthor, "nbrView");

  const [updateAccount, { data: updateAccountData, loading, error }] =
    useMutation(UPDATE_ACCOUNT, { errorPolicy: "all" });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        urlSocialMedia: yup
          .array(
            yup.object({
              url: yup.string().required("Ce champ est obligatoire."),
            })
          )
          .min(1, "Ce champ est obligatoire"),
      })
    ),
  });

  const onSubmitHandler = (data: { urlsSocialMedia: [{ url: string }] }) => {
    const socialsMedia = filter(data?.urlsSocialMedia, (x) => !!x?.url);
    console.log("passe la ")
    updateAccount({
      variables: {
        urlsSocialMedia: JSON.stringify(socialsMedia),
      },
    });
  };

  const {
    fields: urlsSocialMediaFields,
    append: urlsSocialMediaAppend,
    remove: urlsSocialMediaRemove,
  } = useFieldArray({
    control,
    name: "urlsSocialMedia",
  });

  useEffect(() => {
    // @ts-ignore
    JSON.parse(user?.urlsSocialMedia)?.map((data: any, index: any) =>
      urlsSocialMediaAppend({ url: data?.url }, { shouldFocus: false })
    );
    urlsSocialMediaAppend({}, { shouldFocus: false });
  }, []);

  return (
    <div>
      <div className="flex">
        <p>Nombre de recette: {user?.recipeAuthor.length}</p>
        <p>Nombre de clap: {sum(nbrLikes)}</p>

        <p>Nombre de vue: {sum(nbrView)}</p>
      </div>
      <div className="flex">
        <div>
          <p>biographie : {user?.biographie}</p>
        </div>

        <div className="flex flex-col">
          <p>Liens vers vos espaces (icon)</p>
          {
            // @ts-ignore
            JSON.parse(user?.urlsSocialMedia)?.map((data: any, index: any) => (
              <a href={data?.url} key={index}>
                <div className="col-span-1 w-full sm:mb-6 justify-center">
                  Lien {index + 1} :{/* @ts-ignore*/}
                  <img
                    src={getLogoAndNameByUrl(data?.url)?.icon}
                    className="w-7 h-7 self-center"
                    alt={getLogoAndNameByUrl(data?.url)?.name}
                  />
                  <div>{getLogoAndNameByUrl(data?.url)?.name}</div>
                </div>
              </a>
            ))
          }

          <form
            className="bg-white shadow-lg rounded-xl p-8 mb-4 mt-2"
            onSubmit={handleSubmit(onSubmitHandler)}
          >
            {" "}
            <div className="mb-10">
              <ul>
                {urlsSocialMediaFields.map((item, index) => (
                  <>
                    <li key={index} className={`grid grid-rows-2 grid-cols-1`}>
                      <p>Lien {index + 1} </p>
                      <input
                        className={`border-2 mb-2`}
                        placeholder="Nouveau lien"
                        {...register(`urlsSocialMedia.${index}.url`)}
                      />

                      <p className="text-red text-xs italic">
                        {errors?.urlsSocialMedia?.[index]?.url?.message}
                      </p>

                      <div
                        className="justify-self-end cursor-pointer mb-2 bg-red text-white rounded-lg py-1 px-2"
                        onClick={() => urlsSocialMediaRemove(index)}
                      >
                        Supprimer
                      </div>
                    </li>
                  </>
                ))}
              </ul>
              <div
                onClick={() => urlsSocialMediaAppend({}, { shouldFocus: true })}
                className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-40 text-center"
              >
                Ajouter un lien
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="flex justify-center items-center cursor-pointer align-middle
              bg-green rounded-lg p-3 h-10  mr-5 text-lg bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green"
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
