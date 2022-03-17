import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditorGreenit } from "components";
import htmlToDraft from 'html-to-draftjs';
import { getLogoAndNameByUrl } from "helpers/social-media.helper";
import { filter, map, sum } from "lodash";
import { StatProfilForm } from "pages/Profil/Stat";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UPDATE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import HTMLReactParser from "html-react-parser";
import { Cooking, clapIconOff, mdpVisible } from "../../icons"

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
    });
  };

  const onSubmitHandlerBio = (data: { bio: string }) => {
    updateAccount({
      variables: {
        biographie: data?.bio,
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

   // @ts-ignore
   const socialMedias = user?.urlsSocialMedia === "{}" ? null : user?.urlsSocialMedia

  useEffect(() => {
    // @ts-ignore
    JSON.parse(socialMedias)?.map((data: any, index: any) =>
      urlsSocialMediaAppend({ url: data?.url }, { shouldFocus: false })
    );
    urlsSocialMediaAppend({}, { shouldFocus: true });
  }, []);

  const [isEditLink, setEditLink] = useState(false);
  const [isEditor, setEditor] = useState(false);
  const [isDisplayStat, setDisplayStat] = useState(false);
  return (
    <div className="flex items-center flex-col w-11/12">
      {/* Stat */}
      {updateAccountData?.updateAccount?.success && (
        <div className="text-green text-base md:text-base mb-2 | text-center whitespace-pre-line">
          Vos modifications ont été enregistrées
        </div>
      )}

        <div className="flex flex-row gap-2  items-center w-full lg:w-4/6">


        <div className="flex flex-row gap-2 bg-blue rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <img className="bg-white rounded-full w-10 h-10 lg:w-14 lg:h-14" src={Cooking} alt="logo recette" />
          <div>
        <p className="text-sm">Recettes </p>
        <span className="font-extrabold text-2xl lg:text-3xl">{user?.recipeAuthor.length}</span>
        </div>
        </div>
        <div className="flex flex-row gap-2 bg-orange rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <img className="bg-white rounded-full w-10 h-10 lg:w-14 lg:h-14" src={clapIconOff} alt="logo clap" />
        <div>
        <p className="text-sm">claps </p>
        <span className="font-extrabold text-2xl lg:text-3xl">{sum(nbrLikes)}</span>
        </div>
        </div>
        <div className="flex flex-row gap-2 bg-yellow rounded-lg items-center justify-center w-2/6 p-2 lg:py-6">
          <img className="bg-white rounded-full w-10 h-10 lg:w-14 lg:h-14" src={mdpVisible} alt="logo vues" />
          <div>
        <p className="text-sm">Vues </p>
        <span className="font-extrabold text-2xl lg:text-3xl">{sum(nbrView)}</span>
        </div>
        </div>
      
      
      </div>
      <div
        className="mt-4 mb-4 lg:my-10  cursor-pointer text-center text-sm lg:text-base"
        onClick={() => {
          setDisplayStat(!isDisplayStat);
        }}
      >
        {" "}
        {!isDisplayStat ? "+ Plus " : "- Moins"} de statistiques
      </div>
      {isDisplayStat && <StatProfilForm></StatProfilForm>}
      <div className="flex items-center w-11/12 h-px bg-grey grow mb-5 lg:w-4/6 lg:my-10"></div>
      
      
      <div className="flex lg:flex-row flex-col gap-12 lg:w-4/6">
        {/* Biographie */}

        <div className="flex flex-col gap-4 lg:w-2/4">
        <div className="">
          <div>
            <h2 className="mb-2 text-lg lg:text-xl font-bold">biographie</h2> 
            <p
              onClick={() => {
                setEditor(!isEditor);
              }}
            >
              ICON A METTRE
            </p>
            <p className="leading-tight lg:text-lg">{user?.biographie && HTMLReactParser(user?.biographie)}</p>
            </div>
        </div>
        {!isEditor ? 
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
          : null  }
          </div>
        {/* Link */}

        <div className="flex flex-col lg:w-2/4">
          <div>
            <h2 className="text-lg lg:text-xl font-bold">Liens vers vos espaces</h2>
            <p
              onClick={() => {
                setEditLink(!isEditLink);
              }}
            >
              ICON A METTRE
            </p>
          </div>
          {!isEditLink ? (
            <div >
              <div className="flex flex-row gap-2">
              {
                // @ts-ignore
                JSON.parse(socialMedias)?.map(
                  (data: any, index: any) => (
                    <a href={data?.url} key={index}>
                      <div className="flex flex-row gap-2 shadow-lg rounded-lg items-center justify-center border p-1">
                        <img
                          src={getLogoAndNameByUrl(data?.url)?.icon}
                          className="w-7 h-7"
                          alt={getLogoAndNameByUrl(data?.url)?.name}
                        />
                        <div>{getLogoAndNameByUrl(data?.url)?.name}</div>
                      </div>
                    </a>
                  )
                )
              }
              <div className="flex flex-col items-center">


              </div>
              
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
              <form
                className="bg-white shadow-lg rounded-xl p-8 mb-4 mt-2"
                onSubmit={handleSubmit(onSubmitHandler)}
              >
                {" "}
                <div className="mb-10">
                  <ul>
                    {urlsSocialMediaFields.map((item, index) => (
                      <>
                        <li
                          key={index}
                          className={`flex`}
                        >
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
              hover:bg-white hover:border-green hover:text-green"
                  >
                    Valider
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center w-11/12 h-px bg-grey grow mb-5 lg:w-4/6 lg:my-10"></div>
    </div>
  );
};
