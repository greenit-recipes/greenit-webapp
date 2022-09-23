import { useQuery } from "@apollo/client";
import { RouteName } from "App";
import { Button, Container, Footer, Loading, Navbar } from "components";
import { getObjectSession } from "helpers/session-helper";
import useIsMobile from "hooks/isMobile";
import { corps, maison, retourIcon, visage } from "icons";
import { Body } from "node-fetch";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

const IngredientSinglePage = () => {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <title>
          Toutes vos recettes DIY pour une consommation fait-maison | Greenit
        </title>
        <meta
          name="description"
          content="Votre espace de partage de recette DIY, des astuces écologiques pour la maison, des ateliers pour débuter dans le fait-maison et des pages sur les bienfaits des ingrédients."
        />
      </Helmet>

      <div className="flex flex-wrap w-11/12 pt-4">
        <div
          className="absolute flex justify-center left-0 top-12 lg:top-16 z-20 bg-white w-10 h-10 ml-3 rounded-full cursor-pointer"
          onClick={() => {
            if (getObjectSession("pathname"))
              history.goBack(); // need to have previous path
            else history.push(RouteName.market);
          }}
        >
          <i className="bx bx-arrow-back text-3xl" />
        </div>

        {!isMobile ? (
          <div className="bg-white w-10 h-10"></div>
        ) : (
          <>
            <div className="w-full overflow-x-auto mt-8">
              <div className="flex w-max gap-4 pb-4">
                <img
                  className="object-cover w-60 rounded-md"
                  src={visage}
                  alt="img-ingredient"
                  loading="lazy"
                />
                <img
                  className="object-cover w-60 rounded-md"
                  src={visage}
                  alt="img-ingredient"
                  loading="lazy"
                />
                <img
                  className="object-cover w-60 rounded-md"
                  src={visage}
                  alt="img-ingredient"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h2>Huile végétale d’avocat BIO</h2>
              <p>MyCosmetik</p>
              <div className="flex gap-3">
                <div className="flex border-1 br-darkBlue h-10 w-14 items-center justify-center rounded">
                  <h4>5 ml</h4>
                </div>
                <div className="flex items-center | bg-yellow text-white rounded-br-md rounded-tl-md px-4 py-1">
                  <span> ★ 5/5</span>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                {[
                  {
                    tag: "Cheveux : Abîmés",
                  },
                  {
                    tag: "Peaux : Grasses",
                  },
                  {
                    tag: "Stress",
                  },
                  {
                    tag: "Pellicules",
                  },
                  { tag: "Tous les ingrédients" },
                ].map((item, index) => (
                  <div
                    className="flex inline h-8 px-3 text-white rounded bg-darkBlue items-center"
                    key={index}
                  >
                    <p>{item.tag}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default IngredientSinglePage;
