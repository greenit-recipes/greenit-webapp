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
import { FiEdit } from "react-icons/fi";
import { FaRegEye } from "react-icons/fa";
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
    <div className="flex flex-col items-center w-10/12 md:w-11/12">
      {/* Stat */}
      <div className="flex flex-row justify-center w-full gap-2">
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-lg justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-blueL">
          <img
            className="w-8 h-8 p-1 bg-white rounded-full lg:w-12 lg:h-12"
            src={Cooking}
            alt="logo recette"
          />
          <div>
            <p className="text-xs lg:text-sm">Recettes </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {user?.recipeAuthor.length}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-lg justify-evenly md:justify-center md:gap-2 bg-orangeL md:w-40 md:h-20 lg:py-6">
          <img
            className="w-8 h-8 bg-white rounded-full lg:w-12 lg:h-12"
            src={clapIconOff}
            alt="logo clap"
          />
          <div>
            <p className="text-xs lg:text-sm">claps </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrLikes)}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-lg justify-evenly md:justify-center md:gap-2 bg-yellowL md:w-40 md:h-20 lg:py-6">
          <FaRegEye className="w-8 h-8 p-1 bg-white rounded-full lg:w-12 lg:h-12" />
          <div>
            <p className="text-xs lg:text-sm">Vues </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrView)}
            </p>
          </div>
        </div>
      </div>
      <div
        className="my-6 text-sm font-semibold text-center cursor-pointer lg:my-10 lg:sm"
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
      <div className="flex flex-col gap-12 lg:flex-row lg:w-4/6">
        {/* Biographie */}

        <div className="flex flex-col gap-4 lg:w-2/4">
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
              onSubmit={handleSubmitBio(onSubmitHandlerBio)}>
                <Controller
                  name="bio"
                  render={({ field }) => {
                    return <EditorGreenit {...field} />;
                  }}
                  control={controlBio}
                  defaultValue={user?.biographie}
                />
                <div className="flex items-center justify-between">
                  <button className="flex items-center justify-center h-10 p-3 mt-4 mr-5 text-lg text-white align-middle border-2 border-transparent rounded-lg cursor-pointer bg-green bold hover:bg-white hover:border-green hover:text-green">
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
                  !isEmpty(JSON.parse(socialMedias)) && JSON.parse(socialMedias)?.map((data: any, index: any) => (
                      <a href={data?.url} key={index}>
                        <div className="flex flex-row items-center justify-center gap-2 p-1 border rounded-lg shadow-lg lg:p-2">
                          <img
                            src={getLogoAndNameByUrl(data?.url)?.icon}
                            className="w-5 h-5"
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
                className="mt-4 mb-4 text-sm text-center cursor-pointer lg:text-base"
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
                          className={`flex justify-between items-center shadow-lg appearance-none border lg:text-lg rounded-xl w-full  py-2 px-3 text-gray-700 h-10 md:h-12  leading-tight focus:outline-none focus:shadow-outline mb-2`}
                        >
                          <p className="text-sm lg:text-base whitespace-nowrap">
                            {index + 1}{" "}
                          </p>
                          <div className="h-full border align-self-start"></div>
                          <input
                            className={`appearance-none text-sm lg:text-base  focus:outline-none focus:shadow-outline h-full`}
                            placeholder="Nouveau lien"
                            {...register(`urlsSocialMedia.${index}.url`)}
                          />

                          <p className="text-xs italic text-red">
                            {errors?.urlsSocialMedia?.[index]?.url?.message}
                          </p>

                          <div
                            className="p-1 text-sm text-white rounded-lg cursor-pointer bg-red lg:text-base"
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
                    className="w-40 px-2 text-center text-white rounded-lg cursor-pointer py-1 bg-blue"
                  >
                    Ajouter un lien
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button className="flex items-center justify-center h-10 p-3 mb-4 mr-5 text-lg text-white align-middle border-2 border-transparent rounded-lg cursor-pointer bg-green bold hover:bg-white hover:border-green hover:text-green">
                    Valider
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-11/12 h-px mb-5 bg-grey grow lg:w-5/12 lg:my-10"></div>
      <Button
        type="grey"
        rounded="lg"
        className="md:hidden w-full inline justify-end self-center text-base | cursor-pointer mb-4"
      >
        <Link to={RouteName.createRecipe} className="flex">
          <h3 id="shareRecipe" className="cursor-pointer hover:text-green">
            Partager une recette
          </h3>
        </Link>
      </Button>
    </div>
  );
};
