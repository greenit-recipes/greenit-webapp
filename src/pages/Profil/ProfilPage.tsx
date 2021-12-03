import { useMutation, useQuery } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loading, RecipeCard } from "components";
import { getImagePath } from "helpers/image.helper";
import {
  imageValidation,
  videoValidation,
} from "helpers/yup-validation.helper";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import "reactjs-popup/dist/index.css";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import authService, { ME, UPDATE_IMAGE_ACCOUNT } from "services/auth.service";
import * as yup from "yup";
import "App.css";
import { Container, Footer, Navbar } from "../../components";
import { Modal } from "pages/Profil/ModalProfil";
import { ModalImageProfil } from "pages/Profil/ModalImageProfil";

const ProfilPage: React.FC = () => {

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const { loading, error, data, refetch, networkStatus } = useQuery(ME, {
    fetchPolicy: "no-cache",
  });

  const history = useHistory();

  if (!loading && isEmpty(data?.me)) {
    history.push({
      pathname: "/",
    });
  }
  const user = data?.me;

  // Image
  const [userImage, setImage] = useState(user?.imageProfile);

  useEffect(() => {
    setImage(getImagePath(user?.imageProfile));
  }, [user]);

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
        <div className="grid grid-cols-2 gap-4 mb-8 md:mb-20">
          <div className="h-32 w-32 md:h-40 md:w-40 rounded-full bg-white shadow-xl">
            <ModalImageProfil parentFunction={refetch} />
            <img
              className={`object-cover h-32 w-32 md:h-40 md:w-40
              rounded-full | justify-self-center`}
              // @ts-ignore
              src={userImage}
            ></img>
            {/* userImage == "defaultImage" && (<div></div>)*/}
          </div>
          <div className="flex flex-col | self-center">
            <div className="flex-inline overflow-clip overflow-hidden ...">
              <h2 className="text-xl md:text-2xl">{user?.username}</h2>
            </div>
            <Modal />
          </div>
        </div>
      </Container>

      <div className="grid grid-cols-2 px-4 gap-4 | md:px-20">
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-blue" +
            (!visible ? "outline-none border-blue" : "")
          }
          onClick={() => setVisible(false)}
        >
          <h3 className="text-base md:text-2xl">Recettes favorites</h3>
        </button>
        <button
          className={
            "py-2 text-center text-xl mb-2 cursor-pointer border-b-4 | hover:border-green |" +
            (visible ? "outline-none border-green" : "")
          }
          onClick={() => setVisible(true)}
        >
          <h3 className="text-base md:text-2xl">Vos recettes</h3>
        </button>
      </div>

      <Container className="flex flex-col mb-20 | items-center" padding>
        <div className={"text-center" + (visible ? " hidden" : "")}>
          {!visible && (
            <div className="grid grid-cols-3 gap-y-4 auto-rows-auto">
              {isEmpty(user?.recipeFavorite) && (
                <div className={"text-center" + (visible ? " hidden" : "")}>
                  <h3 className="p-36 text-2xl">
                    Tu n'as pas de recette favorites
                  </h3>
                </div>
              )}

              {user?.recipeFavorite?.map((recipe: any, index: any) => (
                <>
                  <div
                    key={index}
                    className="col-span-1 w-full justify-center mb-2 mt-5"
                  >
                    <RecipeCard
                      parentFunction={refetchMe}
                      recipe={recipe}
                      key={index}
                      inCarousel={false}
                      isProfilPage={true}
                    />
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
        {visible && (
          <div className="grid grid-cols-3 gap-y-4 auto-rows-auto">
            {isEmpty(user?.recipeAuthor) && (
              <div className={"text-center" + (!visible ? " hidden" : "")}>
                <h3 className="p-36 text-2xl">Publie ta première recette !</h3>
              </div>
            )}
            {user?.recipeAuthor?.map((recipe: any, index: any) => (
              <>
                <div
                  key={index}
                  className="col-span-1 w-full justify-center mb-2 mt-5"
                  >
                  <RecipeCard
                    parentFunction={refetchMe}
                    recipe={recipe}
                    key={index}
                    isProfilPage={true}
                    inCarousel={false}
                  />
                </div>
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
