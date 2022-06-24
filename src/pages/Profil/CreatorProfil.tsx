import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "components";
import { PellGreenit } from "components/layout/Editor/PellEditor";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import { filter, map, sum } from "lodash";
import { StatProfilForm } from "pages/Profil/Stat";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UPDATE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import HTMLReactParser from "html-react-parser";
import { rondIcon } from "../../icons";
import { RouteName } from "App";
import { Link } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { isEmpty } from "lodash";

interface IUser {
  user: {
    biographie: string;
    urlsSocialMedia: string[];
    recipeAuthor: {
      numberOfLikes: string;
      nbrView: string;
    }[];
  };
  parentFunction?: any;
}

export const CreatorProfil: React.FC<IUser> = ({ user, parentFunction }) => {
  const nbrLikes = map(user?.recipeAuthor, "numberOfLikes");
  const nbrView = map(user?.recipeAuthor, "nbrView");

  const [updateAccount, { data: updateAccountData, loading, error }] =
    useMutation(UPDATE_ACCOUNT, { errorPolicy: "all" });

  const { register, handleSubmit, setError, reset, control } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        urlSocialMedia: yup
          .array(
            yup.object({
              url: yup.string().required("Ce champ est obligatoire."),
            }),
          )
          .min(1, "Ce champ est obligatoire"),
      }),
    ),
  });

  const {
    formState: { errors },
    handleSubmit: handleSubmitBio,
    control: controlBio,
  } = useForm();

  const onSubmitHandler = (data: { urlsSocialMedia: [{ url: string }] }) => {
    const socialsMedia = filter(data?.urlsSocialMedia, x => !!x?.url);
    updateAccount({
      variables: {
        urlsSocialMedia: JSON.stringify(socialsMedia),
      },
    }).then(() => {
      return parentFunction
        ? parentFunction().then(() => setEditLink(!isEditLink))
        : null;
    });
  };

  const onSubmitHandlerBio = (data: { bio: string }) => {
    updateAccount({
      variables: {
        biographie: data?.bio,
      },
    }).then(() => {
      return parentFunction ? parentFunction() : null;
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

  const socialMedias =
    /* @ts-ignore */
    user?.urlsSocialMedia === "{}" ? null : user?.urlsSocialMedia;

  useEffect(() => {
    // @ts-ignore
    JSON.parse(socialMedias)?.map((data: any, index: any) =>
      urlsSocialMediaAppend({ url: data?.url }, { shouldFocus: false }),
    );
    urlsSocialMediaAppend({}, { shouldFocus: true });
  }, []);

  const [isEditLink, setEditLink] = useState(false);
  const [isEditor, setEditor] = useState(true);
  const [isDisplayStat, setDisplayStat] = useState(false);
  return (
    <div className="flex flex-col items-center text-darkBlue md:w-11/12 lg:w-full">
      {/* Stat */}
      <div className="flex flex-row text-center justify-center w-11/12 gap-2">
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-blueL">
          <i
            className={`bx bxs-bowl-hot bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-white rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Recettes </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {user?.recipeAuthor.length}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 bg-greenL md:w-40 md:h-20 lg:py-6">
          <i
            className={`bx bxs-donate-heart bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-white rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Soutien</p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrLikes)}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 bg-yellowL md:w-40 md:h-20 lg:py-6">
          <i
            className={`bx bxs-low-vision bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-white rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Vues </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrView)}
            </p>
          </div>
        </div>
      </div>
      <div
        className="my-6 text-sm font-semibold text-center text-darkBlue underline decoration-solid cursor-pointer lg:my-10 lg:sm"
        onClick={() => {
          setDisplayStat(!isDisplayStat);
        }}
      >
        {" "}
        {!isDisplayStat ? "+ Plus " : "- Moins"} de statistiques
      </div>
      {isDisplayStat && <StatProfilForm></StatProfilForm>}
      <div className="flex items-center w-11/12 h-px mb-5 bg-grey grow lg:w-5/12 "></div>
      {updateAccountData?.updateAccount?.success && (
        <div className="text-green mb-2 | text-center whitespace-pre-line">
          Vos modifications ont été enregistrées
        </div>
      )}
      <div className="flex flex-col justify-start mx-12 md:space-x-24 w-11/12 lg:flex-row lg:w-5/6">
        {/* Biographie */}

        <div className="flex flex-col gap-4 lg:w-2/4 mb-3">
          <div className="flex flex-col gap-4 ">
            <div className="flex flex-row items-center gap-4 md:justify-center">
              <h3 className="text-lg font-semibold lg:text-xl">Biographie</h3>
              <FiEdit
                className="w-6 h-6 cursor-pointer"
                onClick={() => {
                  setEditor(!isEditor);
                }}
              />
            </div>
            <p className="text-sm leading-tight lg:text-lg md:self-center">
              {user?.biographie && HTMLReactParser(user?.biographie)}
            </p>
          </div>
          {!isEditor ? (
            <div>
              <form
                // @ts-ignore
                onSubmit={handleSubmitBio(onSubmitHandlerBio)}
              >
                <Controller
                  name="bio"
                  render={({ field }) => {
                    return <PellGreenit {...field} />;
                  }}
                  control={controlBio}
                  defaultValue={user?.biographie}
                />
                <div className="flex justify-end">
                  <button className="flex items-center justify-center h-10 py-3 px-6 mt-5 mb-4 text-base shadow-lg font-medium text-darkBlue align-middle border-2 border-darkBlue rounded-lg cursor-pointer bold hover:bg-white hover:border-green hover:text-green">
                    Valider
                  </button>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        {/* Link */}

        <div className="flex flex-col gap-4 lg:w-2/4">
          <div className="flex flex-row items-center gap-4 md:justify-center">
            <h3 className="text-lg font-semibold lg:text-xl">
              Liens vers vos espaces
            </h3>

            <FiEdit
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setEditLink(!isEditLink);
              }}
            />
          </div>
          {!isEditLink ? (
            <div>
              <div className="flex flex-row flex-wrap gap-2 md:justify-center">
                {
                  // @ts-ignore
                  !isEmpty(JSON.parse(socialMedias)) &&
                    /* @ts-ignore */
                    JSON.parse(socialMedias)?.map((data: any, index: any) => (
                      <div
                        className="relative mr-2 w-9 h-9 justify-center flex items-center "
                        key={index}
                      >
                        <a href={data?.url}>
                          <img
                            src={rondIcon}
                            className="absolute hover:fill-yellow top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            alt="icon rond"
                          ></img>

                          <i
                            className={`bx  mt-1 ${
                              getLogoAndNameByUrl(data?.url)?.icon
                            } bx-sm`}
                          ></i>
                        </a>
                      </div>
                    ))
                }
              </div>
              <div
                onClick={() => setEditLink(!isEditLink)}
                className="md:ml-16 mt-4 mb-4 text-sm font-medium underline decoration-solid cursor-pointer lg:text-base"
              >
                + Ajouter un lien
              </div>
            </div>
          ) : (
            <div>
              <form
                // @ts-ignore
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                {" "}
                <div className="mb-10">
                  <ul>
                    {urlsSocialMediaFields.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className={`flex space-x-10 items-center appearance-none lg:text-lg w-full  text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline mb-2`}
                        >
                          <p className="ml-5 text-sm lg:text-base whitespace-nowrap">
                            {index + 1}{" "}
                          </p>
                          <div className="flex justify-between py-2 px-3 border rounded-md w-5/6">
                            <input
                              className={`appearance-none text-sm lg:text-base placeholder:text-darkBlue focus:outline-none focus:shadow-outline h-full`}
                              placeholder="Nouveau lien"
                              {...register(`urlsSocialMedia.${index}.url`)}
                            />

                            <p className="text-xs italic text-red">
                              {errors?.urlsSocialMedia?.[index]?.url?.message}
                            </p>

                            <div
                              className="text-sm font-medium underline decoration-solid hover:text-red"
                              onClick={() => urlsSocialMediaRemove(index)}
                            >
                              Supprimer
                            </div>
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                  <div className="flex justify-between">
                    <div
                      onClick={() =>
                        urlsSocialMediaAppend({}, { shouldFocus: true })
                      }
                      className="mt-5 ml-10 text-sm font-semibold underline decoration-solid cursor-pointer"
                    >
                      Ajouter un lien
                    </div>
                    <div className="flex items-center justify-between">
                      <button className="flex items-center justify-center h-10 py-3 px-6 mb-4 text-base shadow-lg font-medium text-darkBlue align-middle border-2 border-darkBlue rounded-lg cursor-pointer bold hover:bg-white hover:border-green hover:text-green">
                        Valider
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-11/12 h-px mb-5 bg-grey grow lg:w-5/12 lg:my-10"></div>
      <Button
        type="green"
        rounded="lg"
        className="md:hidden w-11/12 inline justify-end self-center text-base | cursor-pointer mb-4"
      >
        <Link to={RouteName.createRecipe} className="flex">
          <h3
            id="shareRecipe"
            className="cursor-pointer text-base hover:text-green"
          >
            Partager une recette
          </h3>
        </Link>
      </Button>
    </div>
  );
};
