import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import useIsMobile from "hooks/isMobile";
import { filter, map, sum } from "lodash";
import { CircleGreenit } from "pages/recipe/SinglePage/CircleGreenit/CircleGreenit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsWallet2 } from "react-icons/bs";
import { IoEarthOutline, IoFlaskOutline } from "react-icons/io5";
import { UPDATE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";

interface IUser {
  recipeMadeUser: any;
  parentFunction?: any;
}

export const ExplorateurProfil: React.FC<IUser> = ({
  recipeMadeUser,
  parentFunction,
}) => {
  const substancesRecipes = sum(
    map(recipeMadeUser, (x) => x.amount * x.recipe.numberOfSubstances)
  );
  const moneySavedRecipes = sum(
    map(recipeMadeUser, (x) => x.amount * x.recipe.moneySaved)
  );
  const plasticSavedRecipes = sum(
    map(recipeMadeUser, (x) => x.amount * x.recipe.plasticSaved)
  );
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

  console.log("recipeMadeUser -->", recipeMadeUser);
  const isMobile = useIsMobile();

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

  const [isEditLink, setEditLink] = useState(false);
  const [isEditor, setEditor] = useState(true);
  const [isDisplayStat, setDisplayStat] = useState(false);
  return (
    <div className="mb-14">
      <div>
        <div>Ton impact</div>
      </div>
      <div>Le select</div>
      <div>
        <div
          className={`flex items-center btnProfilPage ingredient-shadow max-h-32 mt-4 ${
            !isMobile ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            if (!isMobile) return;
          }}
        >
          <div className="flex justify-between items-center w-1/6">
            <img
              className="h-12 w-12 rounded"
              //alt={data?.name}
              loading="lazy"
              //src={getImagePath(data?.image)}
            ></img>
          </div>
          <div className="w-4/6 ml-14"> Gel de lin maison</div>
          <div className="w-1/6">
            <div className="flex items-center justify-end w-full">
              <p>Un truc</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center mt-10">
        <CircleGreenit
          colorCircle="bg-orange"
          icon={
            <IoFlaskOutline className="h-10 w-10 absolute icon-position-circle rotate-singlePage-chimie" />
          }
          symbol=""
          number={substancesRecipes}
          text="Total des substances épargnées"
        />
        <CircleGreenit
          colorCircle="bg-yellow"
          icon={
            <BsWallet2 className="h-9 w-9 absolute icon-position-circle rotate-singlePage-wallet" />
          }
          customClassName="ml-16"
          symbol="€"
          number={moneySavedRecipes}
          text="Total argent économisé"
        />
        <CircleGreenit
          colorCircle="bg-green"
          icon={
            <IoEarthOutline className="h-10 w-10 absolute icon-position-circle" />
          }
          customClassName="ml-16"
          symbol="g"
          number={plasticSavedRecipes}
          text="Total de plastiques évités"
        />
      </div>
    </div>
  );
};
