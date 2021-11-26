import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading, RecipeCard } from "components";
import { getImagePath } from "helpers/image.helper";
import { imageValidation, videoValidation } from "helpers/yup-validation.helper";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { ME, UPDATE_IMAGE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import "../App.css";
import { Container, Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";

const ProfilPage: React.FC = () => {
  const isMobile = useIsMobile();

  const schema = yup.object().shape({
    image: imageValidation(),
  }); // _ - .

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);



  const { loading, error, data, refetch, networkStatus } = useQuery(ME);
  const history = useHistory();

  if (!loading && isEmpty(data?.me)) {
    history.push({
      pathname: "/",
    });
  }
  const user = data?.me;

  const [updatePhoto, { data: dataImageUpdate }] = useMutation(UPDATE_IMAGE_ACCOUNT, {
    errorPolicy: "all",
  });

    // Image
  const [userImage, setImage] = useState(
    user?.imageProfile
  );
  
  useEffect(() => {
     setImage(getImagePath(user?.imageProfile));
  }, [user]);

  const onSubmitHandler = (dataForm: { image: string[]; }) => {
    updatePhoto({
      variables: {
        imageProfile: dataForm.image,
      },
    }).then(() => refetch());
  };

  const refetchMe = () => refetch();

  const [visible, setVisible] = React.useState(false);

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Container
        className="flex flex-col | items-center | mt-8 md:mt-20"
        padding
      >
        <div className="grid grid-cols-2 gap-4 mb-8 max-w-xs md:mb-20">
          <div className="">
            <img
              src={ userImage }
              className="border-4 border-white shadow-xl | rounded-full"
              alt="photo profil"
            />
          </div>
          <div className="flex flex-col | self-center">
            <div className="flex-inline overflow-clip overflow-hidden ...">
              <h2 className="text-xl md:text-2xl">{user?.username}</h2>
            </div>
            <div className="mt-3">
              <button className="text-xs bg-white text-black p-2 border-2 border-gray-600 shadow-md rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
                Paramètres
              </button>
            </div>

            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleSubmit(onSubmitHandler)}
            >
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Upload l'image
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="file"
                  {...register("image")}
                ></input>
              </div>
              <p className="text-red-500 text-xs italic">
            {errors?.image?.message}
          </p>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Envoi ta photo belle bête
              </button>
            </form>
          </div>
        </div>
      </Container>

      <div className="grid grid-cols-2 mb-10 px-4 gap-4 | md:px-20">
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue-400" +
            (!visible ? "outline-none border-blue-500" : "")
          }
          onClick={() => setVisible(false)}
        >
          <h3 className="text-base md:text-2xl">Recettes favorites</h3>
        </button>
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green-600 |" +
            (visible ? "outline-none border-green-600" : "")
          }
          onClick={() => setVisible(true)}
        >
          <h3 className="text-base md:text-2xl">Vos recettes</h3>
        </button>
      </div>

      <Container className="flex flex-col mb-20 | items-center" padding>
        <div className={"bg-blue-500 text-center" + (visible ? " hidden" : "")}>
          {!visible && (
            <div>
              {isEmpty(user?.recipeFavorite) && (
                <div
                  className={
                    "bg-green-600 text-center" + (visible ? " hidden" : "")
                  }
                >
                  <h3 className="p-36 text-2xl">
                    Vous n'avez pas de recette favorites 
                  </h3>
                </div>
              )}
              {user?.recipeFavorite?.map((recipe: any, index: any) => (
                <>
                  {isMobile ? (
                    <div
                      key={index}
                      className="w-full flex justify-center mb-2 pt-10"
                    >
                      <RecipeCard
                        parentFunction={refetchMe}
                        recipe={recipe}
                        key={index}
                        inCarousel={false}
                        isProfilPage={true}
                      />
                    </div>
                  ) : (
                    <RecipeCard
                      parentFunction={refetchMe}
                      recipe={recipe}
                      key={index}
                      inCarousel={false}
                      isProfilPage={true}
                    />
                  )}
                </>
              ))}
            </div>
          )}
        </div>
        {visible && (
          <div>
            {isEmpty(user?.recipeAuthor) && (
              <div
                className={
                  "bg-green-600 text-center" + (!visible ? " hidden" : "")
                }
              >
                <h3 className="p-36 text-2xl">
                  Vous n'avez pas de recette pour l'instant
                </h3>
              </div>
            )}
            {user?.recipeAuthor?.map((recipe: any, index: any) => (
              <>
                {isMobile ? (
                  <div
                    key={index}
                    className="w-full flex justify-center mb-2 pt-10"
                  >
                    <RecipeCard
                      parentFunction={refetchMe}
                      recipe={recipe}
                      key={index}
                      isProfilPage={true}
                      inCarousel={false}
                    />
                  </div>
                ) : (
                  <RecipeCard
                    parentFunction={refetchMe}
                    recipe={recipe}
                    key={index}
                    isProfilPage={true}
                    inCarousel={false}
                  />
                )}
              </>
            ))}
          </div>
        )}
      </Container>

      <Footer />
    </div>
  );
};

export default ProfilPage;
