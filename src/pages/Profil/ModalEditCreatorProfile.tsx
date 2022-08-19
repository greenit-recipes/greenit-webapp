import Modal from "components/layout/Modal/Modal";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@apollo/client";
import { UPDATE_ACCOUNT } from "../../services/auth.service";
import { filter, isEmpty } from "lodash";
import { rondIcon } from "../../icons";
import { getLogoAndNameByUrl } from "../../helpers/social-media.helper";
import { PellGreenit } from "../../components/layout/Editor/PellEditor";
import HTMLReactParser from "html-react-parser";
import useIsMobile from "../../hooks/isMobile";

interface IModalEditCreatorProfile {
  btn: any;
  show?: boolean;
  parentFunction?: any;
  user: {
    biographie: string;
    urlsSocialMedia: string[];
    recipeAuthor: {
      numberOfLikes: string;
      nbrView: string;
    }[];
  };
}

//Todo: Load the component lazily
export const ModalEditCreatorProfile: React.FC<IModalEditCreatorProfile> = ({
  btn,
  user,
  parentFunction,
}) => {
  const [showModal, setShowModal] = useState(false);
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
  const [updateAccount, { data: updateAccountData, loading, error }] =
    useMutation(UPDATE_ACCOUNT, { errorPolicy: "all" });

  const {
    formState: { errors },
    handleSubmit: handleSubmitBio,
    control: controlBio,
  } = useForm();

  const isMobile = useIsMobile();

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

  //Todo: Position the modal in the center
  useEffect(() => {
    if (showModal) {
      // à voir
      document.body.classList.add("no-scroll");

      return () => {
        document.body.classList.remove("no-scroll");
      };
    }
  }, []);

  return (
    <div>
      <div
        className="justify-items-center flex flex-col"
        onClick={() => setShowModal(true)}
      >
        {btn}
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <div className="md:w-[800px] md:space-x-12 md:space-y-4">
          <div className="text-center mb-2 -mt-5">
            <div className="w-full flex items-center justify-center space-x-2">
              <h2 className="text-xl font-semibold">
                Modifier mon profil créateur
              </h2>
            </div>
            <span className="text-2xl font-diy">
              Quelques mots pour te présenter ! <br />
              Ta bio et tes liens seront présents sur chacune de tes recettes.
            </span>
          </div>
          <div className="flex flex-col justify-start md:space-x-24 lg:flex-row lg:w-5/6">
            {/* Biographie */}

            <div className="flex flex-col gap-4 lg:w-2/4 mb-3 ml-5">
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-row items-center gap-4 md:justify-center">
                  <h3 className="text-lg font-semibold lg:text-xl">
                    Biographie
                  </h3>
                  <span
                    className="underline text-sm font-medium cursor-pointer"
                    onClick={() => {
                      setEditor(!isEditor);
                    }}
                  >
                    Modifier
                  </span>
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

            {isMobile && (
              <div className="flex items-center w-full h-px mb-5 bg-darkBlue"></div>
            )}

            {/* Link */}

            <div className="flex flex-col gap-4 lg:w-2/4 ml-5">
              <div className="flex flex-row items-center gap-4 md:justify-center">
                <h3 className="text-lg font-semibold lg:text-xl">
                  Liens vers vos espaces
                </h3>
                <span
                  className="underline text-sm font-medium cursor-pointer"
                  onClick={() => {
                    setEditLink(!isEditLink);
                  }}
                >
                  Modifier
                </span>
              </div>
              {!isEditLink ? (
                <div>
                  <div className="flex flex-row flex-wrap gap-2 md:justify-center">
                    {
                      // @ts-ignore
                      !isEmpty(JSON.parse(socialMedias)) &&
                        /* @ts-ignore */
                        JSON.parse(socialMedias)?.map(
                          (data: any, index: any) => (
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
                          ),
                        )
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
                                  {
                                    errors?.urlsSocialMedia?.[index]?.url
                                      ?.message
                                  }
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
            {updateAccountData?.updateAccount?.success && (
              <div className="text-green mb-2 | text-center whitespace-pre-line">
                Vos modifications ont été enregistrées
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
