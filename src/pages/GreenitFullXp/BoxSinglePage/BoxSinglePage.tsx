import { RouteName } from "App";
import { RecipeCard, Button, Container } from "components";
import useIsMobile from "hooks/isMobile";
import {
  visage,
  nathalier,
  domie,
  hugues,
  defaultImageProfil,
  anne,
  BoxCreme,
  BoxSavon,
  Box,
} from "icons";
import { EngagementBanner } from "pages/Market/Components/EngagementBanner";
import { FAQMarket } from "pages/Market/Components/FAQMarket/FAQMarket";
import { MenuMultiSelect } from "pages/Market/Components/MenuMultiSelect";
import { ReviewCard } from "pages/Market/Components/ReviewCard";
import { useState } from "react";
import { Link } from "react-router-dom";
import { tagsBox, boxInfo, recipesBegginerFullXp } from "../FullXpHelper";
import HeadBand from "../headband";

const CheckoutFullXp: React.FC = () => {
  const [toggle, setToggle] = useState(true);
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col | items-center self-center">
      {isMobile && (
        <div className="w-full">
          <HeadBand Formobile={true} />
        </div>
      )}
      <div className="flex flex-wrap w-11/12 pt-4 lg:gap-10 lg:pt-14">
        {!isMobile ? (
          <div className="grid grid-cols-3 grid-row-2 gap-4 sm:w-2/3 lg:w-5/12 h-fit">
            <img
              className="w-84 h-84 object-cover col-span-2 row-span-2 h-full rounded-md"
              src={Box}
              alt={"photo de l'ingredient"}
              loading="lazy"
            />
            <img
              className="w-41 h-41 object-cover rounded-md"
              src={BoxCreme}
              alt={""}
              loading="lazy"
            />
            <img
              className="w-41 h-41 object-cover rounded-md"
              src={BoxSavon}
              alt={""}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full overflow-x-auto mt-8">
            <div className="flex w-max gap-4 pb-4">
              <img
                className="object-cover w-60 h-60 rounded-md"
                src={Box}
                alt="photo de l'ingredient"
                loading="lazy"
              />
              <img
                className="object-cover w-60 h-60 rounded-md"
                src={BoxCreme}
                loading="lazy"
              />
              <img
                className="object-cover w-60 h-60 rounded-md"
                src={BoxSavon}
                loading="lazy"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col gap-3 mb-6 lg:w-1/2">
          <h2>{"Coffret DIY « Premiers Pas » - 3 recettes pour débuter"}</h2>
          <p>{"Greenit Community"}</p>

          <div className="flex gap-3">
            <div className="flex border-1 br-darkBlue h-10 w-14 items-center justify-center rounded">
              <h4>{"1"}</h4>
            </div>
            <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
              <span> ★ {"4.9/5"}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-start gap-2">
            {tagsBox.slice(0, 4).map(tags => (
              <div className="flex inline h-8 px-3 text-white rounded bg-darkBlue items-center">
                <p>{tags}</p>
              </div>
            ))}
            {tagsBox?.slice(4, 8).map(tags => (
              <div
                className={
                  toggle
                    ? "hidden"
                    : "visible flex inline h-8 px-3 text-white rounded bg-darkBlue items-center"
                }
              >
                <p>{tags}</p>
              </div>
            ))}
            <button
              id="ingredientPage-tags-voir-plus"
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
                title: "expédition en 24h",
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
          {!isMobile && (
            <div>
              <HeadBand Formobile={false} />
            </div>
          )}
        </div>
      </div>
      <div className="w-11/12 mb-10">
        {boxInfo.slice(0, 4).map(boxInfo => (
          <MenuMultiSelect
            informationMarket={boxInfo.Information}
            indication={boxInfo.Indications}
            precaution={boxInfo.Precaution}
            producer={"Greenit Community"}
          ></MenuMultiSelect>
        ))}
      </div>

      <div className="flex flex-col | w-full lg:w-11/12 | gap-3 | pl-6 lg:pl-0 mt-6">
        <h3>Recettes associées :</h3>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-3 w-max p-6">
            {recipesBegginerFullXp?.slice(0, 5).map(recipe => (
              <div className="flex mr-2">
                <RecipeCard recipe={recipe} key={recipe.id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grid justify-items-center bg-greenL w-full mt-10 py-6">
        <div className="w-11/12 flex flex-col gap-4">
          <h3>Avis et questions à propos de Greenit</h3>
          <div className="flex flex-row w-full gap-2 items-center">
            <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
              <span className="font-normal">4.8/5</span>
            </div>
            <p className="text-sm w-14 text-center">5 avis</p>

            {!isMobile && (
              <div className="flex gap-4 w-full justify-end">
                <Button
                  className="w-40"
                  type="darkBlue"
                  id="ingredientPage-ecrire-avis"
                  onClick={() => {
                    window.open("https://g.page/r/CfPxVJ2Eh-SYEAI/review");
                  }}
                >
                  Écrire un avis
                </Button>
                <Link to={RouteName.contact}>
                  <Button
                    className="w-40"
                    type="darkBlue"
                    id="ingredientPage-poser-question"
                  >
                    Poser une question
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <Container className="flex flex-wrap gap-4 w-full mt-4 justify-center md:justify-start">
            <ReviewCard
              image={nathalier}
              personName={"Samantha"}
              review={
                "Première fois que j’achète, je suis livrée en 4 jours ! Merci"
              }
              rating={"★ 4/5"}
            />
            <ReviewCard
              image={domie}
              personName={"Amélie"}
              review={
                "Les recettes sont hypers accessibles, j’ai réalisé avec mes enfants, super activité !"
              }
              rating={"★ 5/5"}
            />
            <ReviewCard
              image={hugues}
              personName={"Maxime"}
              review={
                "Je soutiens le projet depuis ses débuts. Greenit rend accessible le fait maison ! Bravo"
              }
              rating={"5/5"}
            />
            <ReviewCard
              image={defaultImageProfil}
              personName={"Valentine"}
              review={
                "J’aime l’odeur de la lessive. Super pour une première fois."
              }
              rating={"★ 4.5/5"}
            />
            <ReviewCard
              image={defaultImageProfil}
              personName={"Maria"}
              review={"Simple et accessible. Je recommande."}
              rating={"★ 5/5"}
            />
            <ReviewCard
              image={anne}
              personName={"MLou"}
              review={
                "J’ai bien été aiguillé pour mes premières recettes maison, merci !"
              }
              rating={"5/5"}
            />
          </Container>

          {isMobile && (
            <div className="flex gap-4 w-full justify-center mt-4">
              <Button
                className="w-40"
                type="darkBlue"
                id="ingredientPage-ecrire-avis"
                onClick={() => {
                  window.open("https://g.page/r/CfPxVJ2Eh-SYEAI/review");
                }}
              >
                Écrire un avis
              </Button>
              <Link to={RouteName.contact}>
                <Button
                  className="w-40"
                  type="darkBlue"
                  id="ingredientPage-poser-question"
                >
                  Poser une question
                </Button>
              </Link>
            </div>
          )}

          <div className="flex flex-col gap-4 mt-4">
            <h3>FAQ</h3>

            <FAQMarket />
          </div>
        </div>
      </div>
      <EngagementBanner />
    </div>
  );
};

export default CheckoutFullXp;
