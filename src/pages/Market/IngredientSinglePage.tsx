import { RouteName } from "App";
import {
  Button,
  Container,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
} from "components";
import { useRecipesQuery } from "../../graphql";
import { getObjectSession } from "helpers/session-helper";
import useIsMobile from "hooks/isMobile";
import { visage } from "icons";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { AddtoCartBanner } from "./Components/AddtoCartBanner";
import { IngredientCard } from "./Components/IngredientCard";
import { MenuMultiSelect } from "./Components/MenuMultiSelect";
import { ReviewCard } from "./Components/ReviewCard";
import { EngagementBanner } from "./Components/EngagementBanner";
import { FAQMarket } from "./Components/FAQMarket/FAQMarket";

const IngredientSinglePage = () => {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

  const { data: dataById } = useRecipesQuery({
    variables: { filter: { id: ["8485c5ae-4175-474b-9107-9aa306874c5f"] } },
  });

  if (!dataById) {
    return <Loading />;
  }

  const dataByIds = dataById.allRecipes?.edges || [];

  console.log(dataById);

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

      {isMobile && <AddtoCartBanner Formobile={true} />}

      <div className="flex flex-wrap w-11/12 pt-4 lg:gap-10 lg:pt-14">
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
          <div className="grid grid-cols-3 grid-row-2 gap-4 w-2/5 h-fit">
            <img
              className="col-span-2 row-span-2 w-full rounded-md"
              src={visage}
              alt="img-ingredient"
              loading="lazy"
            />
            <img
              className="w-full rounded-md"
              src={visage}
              alt="img-ingredient"
              loading="lazy"
            />
            <img
              className="w-full rounded-md"
              src={visage}
              alt="img-ingredient"
              loading="lazy"
            />
          </div>
        ) : (
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
        )}

        <div className="flex flex-col gap-3 mb-6 lg:w-1/2">
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
            ]
              .slice(0, 4)
              .map((item, index) => (
                <>
                  <div
                    className="flex inline h-8 px-3 text-white rounded bg-darkBlue items-center"
                    key={index}
                  >
                    <p>{item.tag}</p>
                  </div>
                </>
              ))}

            {[
              {
                tag: "autre : autre",
              },
              {
                tag: "autre : autre",
              },
              {
                tag: "autre",
              },
              {
                tag: "autre",
              },
              { tag: "autre les ingrédients" },
              {
                tag: "autre",
              },
              {
                tag: "autre",
              },
              {
                tag: "autre",
              },
            ]
              .slice(4)
              .map((item, index) => (
                <>
                  <div
                    className={
                      toggle
                        ? "hidden"
                        : "visible" +
                          " flex inline h-8 px-3 text-white rounded bg-darkBlue items-center"
                    }
                  >
                    <p>{item.tag}</p>
                  </div>
                </>
              ))}
            <button
              className="flex cursor-pointer items-center underline m-2"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? "voir plus" : "voir moins"}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full">
            {[
              {
                icon: "bx bxs-check-shield",
                title: "paiement sécurisé",
              },
              {
                icon: "bx bx-home-smile",
                title: "entreprise française",
              },
              {
                icon: "bx bx-package",
                title: " expédition en 24h",
              },
            ].map((item, index) => (
              <>
                <i className={`${item.icon} text-3xl`}></i>
                <p className="w-20 lg:w-fit lg:mr-3 leading-5 text-sm">
                  {item.title}
                </p>
              </>
            ))}
          </div>
          {!isMobile && <AddtoCartBanner Formobile={false} />}
        </div>
      </div>
      <div className="w-11/12 mb-10">
        <MenuMultiSelect />
      </div>

      {/*<div className="flex flex-col | w-full lg:w-11/12 | gap-3 | pl-6 lg:pl-0">
        <h3>Ingrédients associés :</h3>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-8 lg:gap-5 w-max p-6">
            <IngredientCard
              keyID={"IngredientCard"}
              ingredient={"ingredient"}
            ></IngredientCard>

            <IngredientCard
              keyID={"IngredientCard"}
              ingredient={"ingredient"}
            ></IngredientCard>

            <IngredientCard
              keyID={"IngredientCard"}
              ingredient={"ingredient"}
            ></IngredientCard>

            <IngredientCard
              keyID={"IngredientCard"}
              ingredient={"ingredient"}
            ></IngredientCard>

            <IngredientCard
              keyID={"IngredientCard"}
              ingredient={"ingredient"}
              isCTA={true}
            ></IngredientCard>
          </div>
        </div>
            </div>*/}

      <div className="flex flex-col | w-full lg:w-11/12 | gap-3 | pl-6 lg:pl-0 mt-6">
        <h3>Recettes associées :</h3>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-3 w-max p-6">
            <RecipeCard
              recipe={dataByIds[0]?.node}
              key={dataByIds[0]?.node?.id}
            />
            <RecipeCard
              recipe={dataByIds[0]?.node}
              key={dataByIds[0]?.node?.id}
            />
            <RecipeCard
              recipe={dataByIds[0]?.node}
              key={dataByIds[0]?.node?.id}
            />
            <RecipeCard
              recipe={dataByIds[0]?.node}
              key={dataByIds[0]?.node?.id}
            />
          </div>
        </div>
      </div>

      <div className="grid justify-items-center bg-greenL w-full mt-10 py-6">
        <div className="w-11/12 flex flex-col gap-4">
          <h3>Avis et questions à propos de Greenit</h3>
          <div className="flex flex-row w-full gap-2 items-center">
            <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
              <span className="font-normal">4.9/5</span>
            </div>
            <p className="text-sm w-14 text-center">5 avis</p>

            {!isMobile && (
              <div className="flex gap-4 w-full justify-end">
                <Button className="w-40" type="darkBlue">
                  Écrire un avis
                </Button>
                <Button className="w-40" type="darkBlue">
                  Poser une question
                </Button>
              </div>
            )}
          </div>

          <Container className="flex flex-wrap gap-4 w-full mt-4">
            <ReviewCard
              PersonName={"Samantha"}
              Review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              Rating={"4/5"}
            />
            <ReviewCard
              PersonName={"Amélie"}
              Review={
                "Les recettes sont hypers accessibles, j’ai réalisé avec mes enfants, super activité !"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Maxime"}
              Review={
                "Je soutiens le projet depuis ses débuts. La box est en continuité de rendre accessible le fait maison. Bravo"
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Valentine"}
              Review={
                "J’aime l’odeur de la lessive. Super pour une première fois."
              }
              Rating={"5/5"}
            />
            <ReviewCard
              PersonName={"Maria"}
              Review={"Simple et accessible. Je recommande."}
              Rating={"5/5"}
            />
          </Container>

          {isMobile && (
            <div className="flex gap-4 w-full justify-center mt-4">
              <Button className="w-40" type="darkBlue">
                Écrire un avis
              </Button>
              <Button className="w-40" type="darkBlue">
                Poser une question
              </Button>
            </div>
          )}

          <div className="flex flex-col gap-4 mt-4">
            <h3>FAQ</h3>

            <FAQMarket />
          </div>
        </div>
      </div>
      <EngagementBanner />

      <Footer />
    </div>
  );
};

export default IngredientSinglePage;
