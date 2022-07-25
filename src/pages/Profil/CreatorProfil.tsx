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
    <div className="flex flex-col items-center text-darkBlue w-full md:w-11/12 lg:w-full">
      {/* Stat */}
      <div className="flex flex-row text-center justify-center w-11/12 gap-2">
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-bowl-hot bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-blueL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Recettes </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {user?.recipeAuthor.length}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-donate-heart bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-greenL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Soutien</p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrLikes)}
            </p>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center w-4/12 p-2 rounded-2xl justify-evenly md:justify-center md:gap-2 md:w-40 md:h-20 lg:py-6 bg-white">
          <i
            className={`bx bxs-low-vision bx-sm text-darkBlue w-8 h-8 p-1 md:p-3 bg-yellowL rounded-full lg:w-12 lg:h-12`}
          ></i>
          <div className="flex flex-col items-center">
            <p className="font-medium text-sm">Vues </p>
            <p className="text-2xl font-extrabold lg:text-3xl">
              {sum(nbrView)}
            </p>
          </div>
        </div>
      </div>
      {/*Modal Biography and Social media*/}
      <Button className="w-11/12 mt-2 mb-4 shadow-md" type="darkBlue">
        Modifier mon profil créateur
      </Button>

      {/* Recommend Stats */}
      {/*<div*/}
      {/*  className="my-6 text-sm font-semibold text-center text-darkBlue underline decoration-solid cursor-pointer lg:my-10 lg:sm"*/}
      {/*  onClick={() => {*/}
      {/*    setDisplayStat(!isDisplayStat);*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {" "}*/}
      {/*  {!isDisplayStat ? "+ Plus " : "- Moins"} de statistiques*/}
      {/*</div>*/}
      {/*{isDisplayStat && <StatProfilForm></StatProfilForm>}*/}
      {updateAccountData?.updateAccount?.success && (
        <div className="text-green mb-2 | text-center whitespace-pre-line">
          Vos modifications ont été enregistrées
        </div>
      )}
    </div>
  );
};
