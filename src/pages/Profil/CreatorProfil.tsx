import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorGreenit, Button } from "components";
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import { filter, map, sum } from "lodash";
import { StatProfilForm } from "pages/Profil/Stat";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UPDATE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import HTMLReactParser from "html-react-parser";
import { Cooking, clapIconOff } from "../../icons";
import { RouteName } from "App";
import { Link } from "react-router-dom";
import { FiEdit } from 'react-icons/fi';
import { FaRegEye } from "react-icons/fa"
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
  parentFunction?: any
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
            })
          )
          .min(1, "Ce champ est obligatoire"),
      })
    ),
  });

  const {
    formState: { errors },
    handleSubmit: handleSubmitBio,
    control: controlBio,
  } = useForm();

  const onSubmitHandler = (data: { urlsSocialMedia: [{ url: string }] }) => {
    const socialsMedia = filter(data?.urlsSocialMedia, (x) => !!x?.url);
    updateAccount({
      variables: {
        urlsSocialMedia: JSON.stringify(socialsMedia),
      },
    }).then(() => {
      return parentFunction ? parentFunction().then(() => setEditLink(!isEditLink)) : null;
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

  // @ts-ignore
  const socialMedias = user?.urlsSocialMedia === "{}" ? null : user?.urlsSocialMedia;

  useEffect(() => {
    // @ts-ignore
    JSON.parse(socialMedias)?.map((data: any, index: any) =>
      urlsSocialMediaAppend({ url: data?.url }, { shouldFocus: false })
    );
    urlsSocialMediaAppend({}, { shouldFocus: true });
  }, []);

  const [isEditLink, setEditLink] = useState(false);
  const [isEditor, setEditor] = useState(true);
  const [isDisplayStat, setDisplayStat] = useState(false);
  return (
    <div className="flex items-center flex-col w-10/12 md:w-11/12">
      {/* Stat */}
      <div className="flex flex-row gap-2  items-center w-full lg:w-5/12">
        <div className="flex flex-row justify-evenly md:justify-center md:gap-2 bg-blue rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <img
            className="bg-white rounded-full w-9 h-9 lg:w-14 lg:h-14 p-2"
            src={Cooking}
            alt="logo recette"
          />
          <div>
            <p className="text-sm lg:text-base">Recettes </p>
            <span className="font-extrabold text-2xl lg:text-3xl">
              {user?.recipeAuthor.length}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-evenly md:justify-center md:gap-2 bg-orange rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <img
            className="bg-white rounded-full w-10 h-10 lg:w-14 lg:h-14"
            src={clapIconOff}
            alt="logo clap"
          />
          <div>
            <p className="text-sm lg:text-base">claps </p>
            <span className="font-extrabold text-2xl lg:text-3xl">
              {sum(nbrLikes)}
            </span>
          </div>
        </div>
        <div className="flex flex-row justify-evenly md:justify-center md:gap-2 bg-yellow rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <FaRegEye
          className="bg-white rounded-full w-10 h-10 lg:w-14 lg:h-14 p-2"
          />
          <div>
            <p className="text-sm lg:text-base">Vues </p>
            <span className="font-extrabold text-2xl lg:text-3xl">
              {sum(nbrView)}
            </span>
          </div>
        </div>
      </div>
      <div
        className=" my-6 lg:my-10  cursor-pointer text-center text-sm lg:text-base"
        onClick={() => {
          setDisplayStat(!isDisplayStat);
        }}
      >
        {" "}
        {!isDisplayStat ? "+ Plus " : "- Moins"} de statistiques
      </div>
      {isDisplayStat && <StatProfilForm></StatProfilForm>}
      <div className="flex items-center w-11/12 h-px bg-grey grow mb-5 lg:w-5/12 "></div>
      {updateAccountData?.updateAccount?.success && (
        <div className="text-green mb-2 | text-center whitespace-pre-line">
          Vos modifications ont été enregistrées
        </div>
      )}
      <div className="flex lg:flex-row flex-col gap-12 lg:w-4/6">
        {/* Biographie */}

        <div className="flex flex-col gap-4 lg:w-2/4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <h2 className="text-lg lg:text-xl font-semibold">Biographie</h2>
              <FiEdit
              className="cursor-pointer w-6 h-6"
              onClick={() => {
                setEditor(!isEditor);
              }}
              />
            </div>
            <p className="leading-tight text-sm lg:text-base">
              {user?.biographie && HTMLReactParser(user?.biographie)}
            </p>
          </div>
          {!isEditor ? (
            <div>
              <form onSubmit={handleSubmitBio(onSubmitHandlerBio)}>
                <Controller
                  name="bio"
                  render={({ field }) => {
                    return <EditorGreenit {...field} />;
                  }}
                  control={controlBio}
                  defaultValue={user?.biographie}
                />
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
          ) : null}
        </div>
        {/* Link */}

        <div className="flex flex-col lg:w-2/4 gap-4">
          <div className="flex flex-row items-center gap-4">
            <h2 className="text-lg lg:text-xl font-semibold">
              Liens vers vos espaces
            </h2>

            <FiEdit
            className="cursor-pointer w-6 h-6"
            onClick={() => {
              setEditLink(!isEditLink);
            }}
            />
          </div>
          {!isEditLink ? (
            <div>
              <div className="flex flex-row flex-wrap gap-2">
                {
                  // @ts-ignore
                  isEmpty(socialMedias) && JSON.parse(socialMedias)?.map((data: any, index: any) => (
                    <a href={data?.url} key={index}>
                      <div className="flex flex-row gap-2 shadow-lg rounded-lg items-center justify-center border p-1 lg:p-2">
                        <img
                          src={getLogoAndNameByUrl(data?.url)?.icon}
                          className="w-7 h-7"
                          alt={getLogoAndNameByUrl(data?.url)?.name}
                        />
                        <div className="text-sm lg:text-base">
                          {getLogoAndNameByUrl(data?.url)?.name}
                        </div>
                      </div>
                    </a>
                  ))
                }
              </div>
              <div
                onClick={() => setEditLink(!isEditLink)}
                className="mt-4 mb-4  cursor-pointer text-center text-sm lg:text-base"
              >
                + Ajouter un lien
              </div>
            </div>
          ) : (
            <div>
              <form onSubmit={handleSubmit(onSubmitHandler)}>
                {" "}
                <div className="mb-10">
                  <ul>
                    {urlsSocialMediaFields.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className={`flex justify-between items-center shadow-lg appearance-none border lg:text-xl rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline mb-2`}
                        >
                          <p className="text-sm lg:text-base">
                            Lien {index + 1}{" "}
                          </p>
                          <div className="border h-full align-self-start"></div>
                          <input
                            className={`appearance-none text-sm lg:text-base  focus:outline-none focus:shadow-outline h-full`}
                            placeholder="Nouveau lien"
                            {...register(`urlsSocialMedia.${index}.url`)}
                          />

                          <p className="text-red text-xs italic">
                            {errors?.urlsSocialMedia?.[index]?.url?.message}
                          </p>

                          <div
                            className=" cursor-pointer  bg-red text-sm lg:text-base text-white rounded-lg p-1 "
                            onClick={() => urlsSocialMediaRemove(index)}
                          >
                            Supprimer
                          </div>
                        </li>
                      </>
                    ))}
                  </ul>
                  <div
                    onClick={() =>
                      urlsSocialMediaAppend({}, { shouldFocus: true })
                    }
                    className="bg-blue cursor-pointer text-white rounded-lg py-1 px-2 w-40 text-center"
                  >
                    Ajouter un lien
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="flex justify-center items-center cursor-pointer align-middle
              bg-green rounded-lg p-3 h-10  mr-5 text-lg bold text-white border-2 border-transparent
              hover:bg-white hover:border-green hover:text-green mb-4"
                  >
                    Valider
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-11/12 h-px bg-grey grow mb-5 lg:w-5/12 lg:my-10"></div>
      <Button
        type="grey"
        rounded="lg"
        className="md:hidden w-full inline justify-end self-center text-xl | cursor-pointer mb-4"
      >
        <Link to={RouteName.createRecipe} className="flex">
          <h3 id="shareRecipe" className=" cursor-pointer hover:text-green">
            Partager une recette
          </h3>
        </Link>
      </Button>
    </div>
  );
};
