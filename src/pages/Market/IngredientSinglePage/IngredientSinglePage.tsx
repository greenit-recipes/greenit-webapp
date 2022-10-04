import { RouteName } from "App";
import {
  Button,
  Container,
  Footer,
  Loading,
  Navbar,
  RecipeCard,
} from "components";
import { useIngredientQuery, useRecipesQuery } from "../../../graphql";
import { getObjectSession } from "helpers/session-helper";
import useIsMobile from "hooks/isMobile";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory, useParams } from "react-router-dom";
import { AddtoCartBanner } from "../Components/AddtoCartBanner";
import { MenuMultiSelect } from "../Components/MenuMultiSelect";
import { ReviewCard } from "../Components/ReviewCard";
import { EngagementBanner } from "../Components/EngagementBanner";
import { FAQMarket } from "../Components/FAQMarket/FAQMarket";
import { getImagePath } from "helpers/image.helper";
import { IngredientAssociateSection } from "./IngredientAssociateSection";

const IngredientSinglePage = () => {
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const { id } = useParams<{ id: string }>();

  const { data } = useIngredientQuery({
    fetchPolicy: "no-cache",
    variables: {
      id: id,
    },
  });
  //
  const [brandInfo, setBrandinfo] = useState("Cosmaé");

  function updateBrandinfo(brandInfo: string) {
    switch (brandInfo) {
      case "Aroma-zone":
        return "Azoma-zone is well nowjsjsjsjs";
      case "Cosmaé":
        return "cosmaé is well nowjsjsjsjs";
      case "mycometik":
        return "test";
      default:
        return "Nothing found";
    }
  }

  useEffect(() => {
    const updatedBrandInfo = updateBrandinfo(brandInfo);
    if (updatedBrandInfo) {
      setBrandinfo(updatedBrandInfo); // please update the current brandInfo state with the setBrandInfo function
    }
    console.log(brandInfo);
  }, []);

  const [IngredientName, setIngredientName] = useState("Beurre de Karité");

  const { data: RecipeSimilar } = useRecipesQuery({
    variables: { first: 8, filter: { ingredients: [IngredientName] } },
  });

  console.log(RecipeSimilar);

  if (!RecipeSimilar) {
    return <Loading />;
  }
  const recipeSimilar = RecipeSimilar?.allRecipes?.edges || [];

  console.log(recipeSimilar);

  const Ingredient = data?.ingredient?.map((ingredient: any) => ({
    key: Math.random,
    name: ingredient?.name,
    image: ingredient?.image,
    image2: ingredient?.imageOptional2,
    image3: ingredient?.imageOptional3,
    contenance: ingredient?.contenance,
    informationMarket: ingredient?.informationMarket,
    indication: ingredient?.indication,
    precaution: ingredient?.precaution,
    price: ingredient?.price,
    producer: ingredient?.producer,
    rating: ingredient?.rating,
    tags: ingredient?.tags,
    categoryIngredient: ingredient?.categoryIngredient,
  }));

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        {Ingredient?.map((Object: { name: string }) => (
          <title>{Object?.name} - Greenit Market</title>
        ))}
        <meta
          name="description"
          content="Découvrez une sélection d’huiles végétales, beurres végétaux, macérât huileux, huiles essentielles, poudres végétales, argiles, base de préparation, ingrédients d’entretien..."
        />
      </Helmet>

      {isMobile && (
        <div className="w-full">
          {Ingredient?.map((Object: { price: string }) => (
            <AddtoCartBanner price={Object?.price} Formobile={true} />
          ))}
        </div>
      )}

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
          <div className="grid grid-cols-3 grid-row-2 gap-4 sm:w-2/3 lg:w-5/12 h-fit">
            {Ingredient?.map((Object: { image: any }) => (
              <img
                className="w-84 h-84 object-cover col-span-2 row-span-2 h-full rounded-md"
                src={getImagePath(Object?.image)}
                alt={"photo de l'ingredient"}
                loading="lazy"
              />
            ))}
            {Ingredient?.map((Object: { image2: any }) => (
              <img
                className="w-41 h-41 object-cover rounded-md"
                src={getImagePath(Object?.image2)}
                alt={""}
                loading="lazy"
              />
            ))}
            {Ingredient?.map((Object: { image3: any }) => (
              <img
                className="w-41 h-41 object-cover rounded-md"
                src={getImagePath(Object?.image3)}
                alt={""}
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="w-full overflow-x-auto mt-8">
            <div className="flex w-max gap-4 pb-4">
              {Ingredient?.map((Object: { image: any }) => (
                <img
                  className="object-cover w-60 h-60 rounded-md"
                  src={getImagePath(Object?.image)}
                  alt="photo de l'ingredient"
                  loading="lazy"
                />
              ))}
              {Ingredient?.map((Object: { image2: any }) => (
                <img
                  className="object-cover w-60 h-60 rounded-md"
                  src={getImagePath(Object?.image2)}
                  loading="lazy"
                />
              ))}
              {Ingredient?.map((Object: { image3: any }) => (
                <img
                  className="object-cover w-60 h-60 rounded-md"
                  src={getImagePath(Object?.image3)}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        )}
        {Ingredient?.map(
          (Object: {
            name: string;
            producer: string;
            contenance: string;
            rating: string;
            tags: Array<any>;
          }) => (
            <div className="flex flex-col gap-3 mb-6 lg:w-1/2">
              <h2>{Object?.name}</h2>
              <p>{Object?.producer}</p>
              <div className="flex gap-3">
                <div className="flex border-1 br-darkBlue h-10 w-14 items-center justify-center rounded">
                  <h4>{Object?.contenance}</h4>
                </div>
                <div className="flex items-center | bg-green text-white rounded-br-md rounded-tl-md px-4 py-1">
                  <span> ★ {Object?.rating}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-start gap-2">
                {Object?.tags.slice(0, 5).map(({ name, index }) => (
                  <>
                    <div
                      className="flex inline h-8 px-3 text-white rounded bg-darkBlue items-center"
                      key={index}
                    >
                      <p>{name}</p>
                    </div>
                  </>
                ))}
                {Object?.tags.slice(5).map(({ name, index }) => (
                  <>
                    <div className={toggle ? "hidden" : "visible"}>
                      <div className=" flex inline h-8 px-3 text-white rounded bg-darkBlue items-center">
                        <p>{name}</p>
                      </div>
                    </div>
                  </>
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

              {!isMobile && (
                <div>
                  {Ingredient?.map((Object: { price: string }) => (
                    <AddtoCartBanner price={Object?.price} Formobile={false} />
                  ))}
                </div>
              )}
            </div>
          ),
        )}
      </div>
      <div className="w-11/12 mb-10">
        {Ingredient?.map(
          (Object: {
            informationMarket: string;
            indication: string;
            precaution: string;
            producer: string;
          }) => (
            <MenuMultiSelect
              informationMarket={Object?.informationMarket}
              indication={Object?.indication}
              precaution={Object?.precaution}
              producer={Object?.producer}
            />
          ),
        )}
      </div>

      <div className="flex flex-col | w-full lg:w-11/12 | gap-3 | pl-6 lg:pl-0">
        <h3>Ingrédients associés :</h3>

        {Ingredient?.map(
          (Object: { categoryIngredient: any; name: string }) => (
            <>
              {Object &&
              Object?.categoryIngredient &&
              Object?.categoryIngredient?.["name"] ? (
                <IngredientAssociateSection
                  categoryIngredient={Object?.categoryIngredient?.["name"]}
                  name={Object?.name}
                />
              ) : (
                <></>
              )}
            </>
          ),
        )}
      </div>

      <div className="flex flex-col | w-full lg:w-11/12 | gap-3 | pl-6 lg:pl-0 mt-6">
        <h3>Recettes associées :</h3>
        <div className="w-full overflow-x-auto">
          <div className="flex flex-row gap-3 w-max p-6">
            {recipeSimilar?.slice(0, 5).map(recipe => (
              <div className="flex mr-2">
                <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
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
              <span className="font-normal">4.9/5</span>
            </div>
            <p className="text-sm w-14 text-center">5 avis</p>

            {!isMobile && (
              <div className="flex gap-4 w-full justify-end">
                <Button
                  className="w-40"
                  type="darkBlue"
                  id="ingredientPage-ecrire-avis"
                >
                  Écrire un avis
                </Button>
                <Button
                  className="w-40"
                  type="darkBlue"
                  id="ingredientPage-poser-question"
                >
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
              <Button
                className="w-40"
                type="darkBlue"
                id="ingredientPage-ecrire-avis"
              >
                Écrire un avis
              </Button>
              <Button
                className="w-40"
                type="darkBlue"
                id="ingredientPage-poser-question"
              >
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
function ingredient(arg0: { variables: { filter: { name: string } } }): {
  loading: any;
  error: any;
  data: any;
} {
  throw new Error("Function not implemented.");
}
