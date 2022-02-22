import { BackgroundImage, Container, Footer, Navbar } from "components";
import { Helmet } from "react-helmet";
import {
  logo,
  Conseil,
  Cooking,
  Ustensil,
  Christelle,
  Catherine,
  HuileRicin,
  EcorceArgume,
  Eau,
  CremeCorp,
  Lessive,
  SavonMarseille,
  CireAbeille,
  BeurreKarite,
  BicarSoude,
  Bouteille,
  Bocal,
  IconAtelier,
  Balance,
  Bol,
  Fouet,
  IconInternet,
  Livre,
  IconMarche,
  Maryse,
  IconSite,
  Producteur,
  landingPageCategories,
} from "../../icons";
import { Button, RecipeCard } from "../../components";
import authService from "services/auth.service";
import { useRecipesQuery } from "../../graphql";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "App";
import { CategoryCircle } from "pages/LandingPage/Components/CategoryCircle";
import { SectionStarterPage } from "pages/StarterSpace/SectionStarterPage";
import { SharedWithFriend } from "pages/StarterSpace/component/SharedWithFriend/SharedWithFriend";
import { FirstStep } from "pages/StarterSpace/component/FirstStep/FirstStep";

const StarterPage = () => {
  const { data } = useRecipesQuery({
    fetchPolicy: "no-cache",
    variables: {filter: { id: [ "605f0ef2-b39a-42aa-aa9e-062222bf114d", "8485c5ae-4175-474b-9107-9aa306874c5f"] } },
  });

  const isLoggedIn = authService.isLoggedIn();
  const recipes = data?.allRecipes?.edges || [];

  const fieldRefEtape3 = useRef<HTMLInputElement>(null);
  const fieldRefEtape1 = useRef<HTMLInputElement>(null);
  const fieldRefEtape2 = useRef<HTMLInputElement>(null);

  const scrollIntoFieldRefEtape1 = () => {
    if (!fieldRefEtape1) return;
    // @ts-ignore
    fieldRefEtape1?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollIntoFieldRefEtape2 = () => {
    if (!fieldRefEtape2) return;
    // @ts-ignore
    fieldRefEtape2?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollIntoFieldRefEtape3 = () => {
    if (!fieldRefEtape3) return;
    // @ts-ignore
    fieldRefEtape3?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>
          Guide pour les débutants en DIY - Cosmétiques maison et produits
          d’hygiène
        </title>
        <meta
          name="description"
          content="Un guide simple pour débutant en DIY : des conseils et astuces, les ingrédients indispensables et des recettes simples pour débuter."
        />
      </Helmet>
      <BackgroundImage />

      <Container className="flex flex-col | w-10/12 mt-8 lg:my-20">
        <div className="lg:mb-4">
          <h1 className="text-2xl lg:text-4xl text-blue font-semibold | mb-2">
            Comment se lancer ?
          </h1>
          <h2 className="text-lg lg:text-xl mb-2">
            Pour tous les curieux qui ne savent pas par où commencer dans le
            DIY, <br /> ce guide est fait pour vous !
          </h2>
          <h3 className="text-sm lg:text-base font-light">
            Débuter dans une nouvelle pratique comme le DIY peut paraître
            compliqué, tous le monde est passé par là. Voici 3 étapes simples
            pour vous lancer dans le fait-maison en débutant pas à pas.
          </h3>
        </div>

        <div className="grid grid-rows-3 | lg:grid-rows-1 lg:grid-cols-5 lg:ml-10 gap-2 my-6 justify-items-center">
          {[
            {
              icon: Conseil,
              fonction: scrollIntoFieldRefEtape1,
              title: "3 meilleurs conseils pour débuter",
              number: "1",
            },
            {
              icon: Ustensil,
              fonction: scrollIntoFieldRefEtape2,
              title: "Les ingrédients & ustensiles",
              number: "2",
            },
            {
              icon: Cooking,
              fonction: scrollIntoFieldRefEtape3,
              title: "2 Recettes simples",
              number: "3",
            },
          ].map((item) => (
            <div
              className="w-32 h-32 lg:w-40 lg:h-40 grid bg-white rounded-xl shadow-lg m-2 p-2 | cursor-pointer transform sm:hover:scale-105 ease-linear transition-all duration-150"
              onClick={() => item.fonction()}
            >
              <div className="grid absolute w-10 h-10 -mt-4 -ml-4 bg-white rounded-full shadow-sm m-2">
                <h2 className="text-center self-center font-bold">
                  {item.number}
                </h2>
              </div>
              <div className="grid justify-items-center">
                <img
                  src={item.icon}
                  className="w-14 lg:w-16 self-center items-center"
                  alt="conseils_diy"
                />{" "}
              </div>
              <h3 className="text-sm  text-center font-light">{item.title}</h3>
            </div>
          ))}
          <SharedWithFriend></SharedWithFriend>
          <div ref={fieldRefEtape1}></div>
        </div>
      </Container>

      <SectionStarterPage
        step={true}
        maintitle="Étape"
        title="3 meilleurs conseils pour débuter"
        text="Que devez-vous savoir avant de vous lancer ? Nous avons posé la
            question à des experts de la pratique."
        number="1"
      ></SectionStarterPage>

      <Container className="flex flex-col | lg:w-10/12 lg:mt-4 px-6 mb-10 lg:mb-24">
        {[
          {
            imgProfil: Catherine,
            altImgProfil: "Photo Catherine",
            userPresentationTitle: "Bol en inox",
            userPresentationTitleSubtitle: "Pour la cuisson au bain-marie",
            citation:
              "Le bol permet de faire vos préparations avant de les verser dans les contenants. Certaines préparations nécessitent une chauffe au bain-marie, l’inox est donc idéal. Il permet une cuisson uniforme tout en étant facilement lavables.",
            shortDescription: "Pour la cuisson au bain-marie",
            longDescription:
              " La plus grosse erreur que je vois quand on veut se lancer en cosmétique maison, c’est de vouloir essayer plein de choses en même temps avec plein d’ingrédients. On dépense beaucoup, on s’éparpille, cela prend du temps et on s’arrête rapidement parce qu’on est perdu 😱 <br /><br /> Mon conseil est donc : <br /> Remplacer vos produits petit à petit et de commencer par trouver l’huile végétale qui vous convient. <br /><br /> La question à vous poser est : quelle est ma problématique principale ? La peau qui tire ? Des boutons ? Des zones de brillance ?<br /> Ensuite, trouver l’huile végétale qui répond à cette problématique. Cette huile végétale peut s’utiliser seule à la place de votre crème de jour ou crème de nuit. C’est la solution la plus naturelle et la plus économique ! Testez avant de réaliser une crème compliquée 😉",
          },
          {
            imgProfil: Christelle,
            altImgProfil: "Photo Christelle",
            userPresentationTitle: "Le conseil de Christelle",
            userPresentationTitleSubtitle:
              "Naturopathe et animatrice d’atelier",
            citation: "Rester sur des recettes qui fonctionnent !",
            shortDescription:
              "Remplacer vos produits petit à petit et de commencer par trouver l’huile végétale qui vous convient.",
            longDescription:
              "Empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
          },
          {
            imgProfil: logo,
            altImgProfil: "Greenit Logo",
            userPresentationTitle: "Nos conseils",
            userPresentationTitleSubtitle: "Greenit Community",
            citation: "Respectons quelques règles de base.",
            shortDescription:
              "Remplacer vos produits petit à petit et de commencer par trouver l’huile végétale qui vous convient.",
            longDescription:
              "Comme pour la cuisine, vous devez respecter quelques règles              <br />           <br />          • L’utilisation des huiles essentielles Certaines d’entre elles sont          très irritantes et allergènes. Optez pour 3 huiles essentielles, selon          vos problématiques, et apprenez leurs propriétés, posologie et          risques.  <br />           <br />          • La conservation des produits Les produits maisons n’étant pas          boostés aux conservateurs chimiques, ils se gardent moins longtemps.          Lorsque vous réalisez une émulsion eau/huile, il est vivement          recommandé d’utiliser un conservateur naturel. Pour une phase huileuse          uniquement, de la vitamine E suffit. En règle générale, dès que votre          préparation change d’aspect, de couleurs, d’odeur, il est préférable          de la jeter, de la même façon que vos ingrédients du frigo.  <br />           <br />• Respecter les règles d’hygiène Enfin, toujours respecter les          règles d’hygiène lors de la préparation de vos produits : un plan de          travail et des ustensiles nettoyés ainsi que des mains propres. ",
          },
        ].map((item, index) => (
          <FirstStep item={item} key={index}></FirstStep>
        ))}
        <div ref={fieldRefEtape2}></div>
      </Container>

      <SectionStarterPage
        step={true}
        maintitle="Étape"
        title="Les ustensiles indispensables"
        text="Quelques ustensiles sont indispensables pour se lancer dans le
        fait-maison (que tout le monde a déjà dans sa cuisine)."
        number="2"
      ></SectionStarterPage>

      <Container className="grid justify-items-center w-full mt-4 mb-20">
        <div className="flex flex-row overflow-x-auto w-full lg:w-11/12 lg:w-auto pb-6 px-4 mb-2">
          <div className="flex gap-4 lg:gap-0">
            {[
              {
                icon: Bol,
                maintitle: "Bol en inox",
                title: "Pour la cuisson au bain-marie",
                subtitle:
                  "Le bol permet de faire vos préparations avant de les verser dans les contenants. Certaines préparations nécessitent une chauffe au bain-marie, l’inox est donc idéal. Il permet une cuisson uniforme tout en étant facilement lavables.",
              },
              {
                icon: Fouet,
                maintitle: "Fouet",
                title: "Pour les émulsions",
                subtitle:
                  "Idéal pour mélanger uniformément les préparations. L’homogénéité de vos produits leur permet de se conserver plus longtemps grâce une meilleure stabilité.",
              },
              {
                icon: Balance,
                maintitle: "Balance",
                title: "Pour être précis",
                subtitle:
                  "De la même façon qu’en pâtisserie, pour une bonne texture et des effets maîtrisés, il faut être précis ! Une balance aux grammes près est donc recommandé.",
              },
              {
                icon: Maryse,
                maintitle: "Maryse",
                title: "Pour éviter le gaspillage",
                subtitle:
                  "Pour racler les fonds de bol et contenant, une maryse peut être utile. Plus de préparations pour vous et moins au fond de la poubelle.",
              },
            ].map((item, index) => (
              <div
                className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72"
                key={index}
              >
                <div className="grid justify-items-center">
                  <img
                    src={item.icon}
                    className="w-16 lg:w-18 self-center items-center"
                    alt={item.maintitle}
                  />{" "}
                </div>
                <h3 className="text-lg text-center font-semibold">
                  {item.maintitle}
                </h3>
                <h2 className="text-base text-center mb-2 ">{item.title}</h2>
                <h3 className="text-sm  text-center font-light w-64">
                  {item.subtitle}
                </h3>
              </div>
            ))}
          </div>
        </div>
        <div ref={fieldRefEtape3}></div>
      </Container>

      <SectionStarterPage
        step={true}
        maintitle="Étape"
        title="2 recettes avec 5 ingrédients"
        text="Voici une sélection de recettes simples pour débuter."
        number="3"
      ></SectionStarterPage>

      {/* Etape 3 Recette 1 */}
      <Container className="flex flex-col | w-11/12 p-3 lg:p-6 mt-6 border-1 border-black bg-white rounded-lg">
        <div className="grid grid-cols-2 auto-rows-auto gap-y-2 | lg:grid-cols-5">
          <div className="hidden lg:block lg:col-span-1 self-center">
            <h2 className="text-2xl font-semibold mb-2">Recette 1 :</h2>
            <h2 className="text-xl font-medium">Crème nourrissante</h2>
            <div className="flex gap-3">
              <p>Quantité :</p>
              <p className="font-semibold">70 g</p>
            </div>
            <div className="flex gap-3">
              <p>Prix :</p>
              <p className="font-semibold">2,80 €</p>
            </div>
          </div>

          <h2 className="hidden lg:block text-xl self-end font-medium col-span-3">
            Les ingrédients :
          </h2>
          <p className="hidden lg:block text-center text-sm font-light self-end">
            En achetant avec ce lien, vous aidez Greenit à se rémunérer 🙏
          </p>
          <div className="place-self-center lg:place-self-start">
            <img src={CremeCorp} className="rounded-xl w-32 lg:w-52" />
          </div>
          <div className="flex-inline lg:hidden self-center">
            <h3 className="text-xl font-semibold">Recette 1 :</h3>
            <h2 className="text-base font-medium mb-3">Crème nourrissante</h2>
            <div className="flex gap-3">
              <p>Quantité :</p>
              <p className="font-semibold">70 g</p>
            </div>
            <div className="flex gap-3">
              <p>Prix :</p>
              <p className="font-semibold">2,80 €</p>
            </div>
          </div>
          <h2 className="flex lg:hidden text-base font-medium col-span-2 mt-4 ml-2">
            Les ingrédients :
          </h2>
          <div className="flex col-span-2 lg:col-span-3 overflow-x-auto content-center py-4">
            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={BeurreKarite}
                  className="w-24 h-24 max-w-none"
                  alt="Beurre de Karité"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  50 g
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Beurre de karité
                </p>
              </div>
              <h4 className="text-xs lg:text-sm font-light text-center">
                3,90 € / 100 g{" "}
              </h4>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={HuileRicin}
                  className="w-24 h-24 max-w-none"
                  alt="Huile de Ricin"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  20 g{" "}
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Huile végétale de ricin{" "}
                </p>
              </div>
              <h4 className="text-xs lg:text-sm font-light text-center ">
                2,60 € / 100 g{" "}
              </h4>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={CireAbeille}
                  className="w-24 h-24 max-w-none"
                  alt="Cire d'Abeille"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  2 g{" "}
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Cire d’abeille{" "}
                </p>
              </div>
              <h4 className="text-xs lg:text-sm font-light text-center">
                2,90 € / 30 g{" "}
              </h4>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={Bocal}
                  className="w-24 h-24 max-w-none"
                  alt="Bocal_icon"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-grey rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-white text-xs self-center font-medium">
                  ≈ 100ml{" "}
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Pot en verre{" "}
                </p>
              </div>
            </div>
          </div>

          {/* A FAIRE onlick button la description apparait */}
          <div className="flex col-span-2 justify-self-center | lg:hidden">
            {/* A FAIRE onlick button la description apparait */}
            <button className="flex cursor-pointer">
              <div className="flex h-8 w-8 bg-grey rounded-full justify-center">
                <p className="self-center text-white font-bold">𝓲</p>
              </div>
              <p className="self-center ml-3"> Pourquoi ces ingrédients ?</p>
            </button>
          </div>
          {/* A FAIRE la description apparait si le boutton est on */}
          <div className="flex col-span-2 justify-self-center mx-4 p-4 bg-grey rounded-lg | lg:hidden">
            <h3 className="text-sm text-white">
              Le beurre de karité pénètre rapidement dans la peau, nourrit
              intensément. Il a une texture plus fondante que le beurre de
              karité normal et est plus facilement applicable. L'huile de
              macadamia apaise les peaux sèches et tiraillées. L'arôme de
              vanille se lie parfaitement avec le beurre de karité et parfume la
              crème.
            </h3>
          </div>

          <div className="grid gap-3 col-span-2 m-4 justify-items-center p-4 | lg:col-span-1 lg:m-0 | bg-white rounded-xl shadow-lg">
            <h2 className="flex text-lg lg:text-xl font-medium">
              Où acheter ?{" "}
            </h2>
            <p className="text-center text-sm font-light">
              Profitez d’un tarif préférentiel chez notre partenaire 👇
            </p>
            <p>9,40 €</p>
            <Button type="orange" className="w-32 h-10">
              Commander
            </Button>
            <p className="text-center text-sm text-sm font-light">
              En achetant ces ingrédients, vous pouvez faire 10 shampooings. Le
              bicarbonate de soude va être réutilisé dans les recettes maison.
            </p>
          </div>

          <div className="hidden lg:block lg:col-span-1"></div>

          {/* A FAIRE onlick button la description apparait */}
          <div className="hidden lg:block col-span-3">
            {/* A FAIRE onlick button la description apparait */}
            <button className="flex -mt-10 cursor-pointer ml-6">
              <div className="flex h-8 w-8 bg-grey rounded-full justify-center">
                <p className="self-center text-white font-bold">𝓲</p>
              </div>
              <p className="self-center ml-3"> Pourquoi ces ingrédients ?</p>
            </button>
            {/* A FAIRE la description apparait si le boutton est on */}
            <div className="hidden lg:flex justify-self-center ml-6 p-4 mt-4 bg-grey rounded-lg">
              <h3 className="text-white">
                Le beurre de karité pénètre rapidement dans la peau, nourrit
                intensément. Il a une texture plus fondante que le beurre de
                karité normal et est plus facilement applicable. L'huile de
                macadamia apaise les peaux sèches et tiraillées. L'arôme de
                vanille se lie parfaitement avec le beurre de karité et parfume
                la crème.
              </h3>
            </div>
          </div>
        </div>
      </Container>
      {/* Etape 3 Recette 2 */}
      <Container className="flex flex-col | w-11/12 p-3 lg:p-6 mt-6 mb-20 border-1 border-black rounded-lg bg-white">
        <div className="grid grid-cols-2 auto-rows-auto gap-y-2 | lg:grid-cols-5">
          <div className="hidden lg:block lg:col-span-1 self-center">
            <h2 className="text-2xl font-semibold mb-2">Recette 2 :</h2>
            <h2 className="text-xl font-medium"> Lessive minute</h2>
            <div className="flex gap-3">
              <p>Quantité :</p>
              <p className="font-semibold">1 L</p>
            </div>
            <div className="flex gap-3">
              <p>Prix :</p>
              <p className="font-semibold">0,50 €</p>
            </div>
          </div>
          <h2 className="hidden lg:block text-xl self-end font-medium col-span-3">
            Les ingrédients :
          </h2>
          <p className="hidden lg:block text-center text-sm font-light self-end">
            En achetant avec ce lien, vous aidez Greenit à se rémunérer 🙏
          </p>
          <div className="place-self-center lg:place-self-start">
            <img src={Lessive} className="rounded-xl w-32 lg:w-52" />
          </div>
          <div className="flex-inline lg:hidden self-center">
            <h3 className="text-xl font-semibold">Recette 2 :</h3>
            <h2 className="text-base font-medium mb-3">Lessive minute</h2>
            <div className="flex gap-3">
              <p>Quantité :</p>
              <p className="font-semibold">1 L</p>
            </div>
            <div className="flex gap-3">
              <p>Prix :</p>
              <p className="font-semibold">0,50 €</p>
            </div>
          </div>
          <h2 className="flex lg:hidden text-base font-medium col-span-2 mt-4 ml-2">
            Les ingrédients :
          </h2>
          <div className="flex col-span-2 lg:col-span-3 overflow-x-auto content-center py-4">
            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={BicarSoude}
                  className="w-24 h-24 max-w-none"
                  alt="Bicarbonate de Soude"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  10 g
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Bicarbonate de Soude
                </p>
              </div>
              <h4 className="text-xs lg:text-sm font-light text-center">
                4,30 € / 1 kg
              </h4>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={SavonMarseille}
                  className="w-24 h-24 max-w-none"
                  alt="Savon de Marseille"
                />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  30 g{" "}
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Savon de Marseille
                </p>
              </div>
              <h4 className="text-xs lg:text-sm font-light text-center ">
                2,30 € / 150g
              </h4>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img src={Eau} className="w-24 h-24 max-w-none" alt="Eau" />{" "}
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  1 L{" "}
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Eau
                </p>
              </div>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={EcorceArgume}
                  className="w-24 h-24 max-w-none"
                  alt="Eau"
                />
              </div>
              <div className="flex justify-center w-12 h-12 bg-blue rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-sm self-center font-medium">
                  2 à 3
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Ecorces d’agrumes pour l’odeur
                </p>
              </div>
            </div>

            <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
              <p className="self-center font-regular text-xl">+</p>
            </div>

            <div className="m-2 w-32">
              <div className="flex justify-center">
                <img
                  src={Bouteille}
                  className="w-24 h-24 max-w-none"
                  alt="Bocal_icon"
                />
              </div>
              <div className="flex justify-center w-12 h-12 bg-grey rounded-full -mt-8 lg:ml-4 relative z-20">
                <p className="text-center text-white text-xs self-center font-medium">
                  ≈ 1 L
                </p>
              </div>
              <div className="h-18 pt-2">
                <p className="text-sm lg:text-lg font-regular text-center">
                  Bouteille en verre
                </p>
              </div>
            </div>
          </div>

          <div className="flex col-span-2 justify-self-center | lg:hidden">
            {/* A FAIRE onlick button la description apparait */}
            <button className="flex cursor-pointer">
              <div className="flex h-8 w-8 bg-grey rounded-full justify-center">
                <p className="self-center text-white font-bold">𝓲</p>
              </div>
              <p className="self-center ml-3"> Pourquoi ces ingrédients ?</p>
            </button>
          </div>
          {/* A FAIRE la description apparait si le boutton est on */}
          <div className="flex col-span-2 justify-self-center mx-4 p-4 bg-grey rounded-lg | lg:hidden">
            <h3 className="text-white text-sm">
              Le savon de Marseille est un nettoyant et un désinfectant. Il
              dégraisse les surfaces et agit comme un antiseptique. Le
              bicarbonate de soude ravive le blanc, adoucit et élimine les
              odeurs. L'hydrolat de Tea Tree permet de parfumer. Elle a des
              propriétés antibactériennes également.{" "}
            </h3>
          </div>

          <div className="grid gap-3 col-span-2 m-4 justify-items-center p-4 | lg:col-span-1 lg:m-0 | bg-white rounded-xl shadow-lg">
            <h2 className="flex text-lg lg:text-xl font-medium">
              Où acheter ?{" "}
            </h2>
            <p className="text-center text-sm font-light">
              Profitez d’un tarif préférentiel chez notre partenaire 👇
            </p>
            <p>6,60 €</p>
            <Button type="orange" className="w-32 h-10">
              Commander
            </Button>
            <p className="text-center text-sm text-sm font-light">
              En achetant ces ingrédients, vous pouvez faire 10 shampooings. Le
              bicarbonate de soude va être réutilisé dans les recettes maison.
            </p>
          </div>
          <div className="hidden lg:block lg:col-span-1"></div>
          <div className="hidden lg:block col-span-3">
            {/* A FAIRE onlick button la description apparait */}
            <button className="flex -mt-10 cursor-pointer ml-6">
              <div className="flex h-8 w-8 bg-grey rounded-full justify-center">
                <p className="self-center text-white font-bold">𝓲</p>
              </div>
              <p className="self-center ml-3"> Pourquoi ces ingrédients ?</p>
            </button>
            {/* A FAIRE la description apparait si le boutton est on */}
            <div className="hidden lg:flex justify-self-center ml-6 p-4 mt-4 bg-grey rounded-lg">
              <h3 className="text-white">
                Le savon de Marseille est un nettoyant et un désinfectant. Il
                dégraisse les surfaces et agit comme un antiseptique. Le
                bicarbonate de soude ravive le blanc, adoucit et élimine les
                odeurs. L'hydrolat de Tea Tree permet de parfumer. Elle a des
                propriétés antibactériennes également.{" "}
              </h3>
            </div>
          </div>
        </div>
      </Container>

      <SectionStarterPage
        step={false}
        maintitle="Création"
        title="Rendez-vous ici dès que tu reçois tes ingrédients !"
        text="En attendant, tu peux créer ton profil et appuyer sur le ♥︎ des
        recettes pour les sauvegarder."
      ></SectionStarterPage>

      {isLoggedIn ? (
        <Link className="mt-4" to={RouteName.profil}>
          <Button type="blue">Profil</Button>
        </Link>
      ) : (
        <Link className="mt-4" to={RouteName.register}>
          <Button type="green">Créer un profil</Button>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-x-2 | mt-10 mb-20">
        {recipes.map((recipe) => (
          <RecipeCard recipe={recipe?.node} key={recipe?.node?.id} />
        ))}
      </div>

      <SectionStarterPage
        color="green"
        step={false}
        maintitle="Aller plus loin"
        title="Où acheter les ingrédients ?"
        text="Il est parfois difficile de trouver des ingrédients de bonne qualité
        sans faire plein d’enseignes différentes. Nous proposons quelques
        conseils et marques pour vous aiguiller dans cette recherche."
      ></SectionStarterPage>

      <Container className="grid justify-items-center w-full lg:w-10/12 mt-6 mb-6">
        <div className="flex flex-row overflow-x-auto w-full lg:w-11/12 pb-6 px-4 mb-2">
          <div className="flex lg:gap-10">
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={Producteur}
                  className="w-16 lg:w-20 self-center items-center"
                  alt="Producteur_icon"
                />
              </div>
              <h2 className="text-base text-center font-light">
                Producteurs locaux
              </h2>
              <p className="text-sm text-center font-light">
                Le top, c’est de faire appel à nos producteurs locaux pour vos
                ingrédients. Ils sont toutefois plus compliqués à trouver et ne
                s’éparpillent pas avec la productions de plusieurs type
                ingrédients. Pour les huiles essentielles : Distillerie Bel Air,
                pour les huiles végétales : Huiles Bertin, Daniel Rouillard. Le
                must serait de vous fournir à votre voisin producteur.
              </p>
            </div>
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={IconMarche}
                  className="w-16 lg:w-20 self-center items-center"
                  alt="Marché_icon"
                />{" "}
              </div>
              <h2 className="text-base text-center font-light">
                Biocoop ou grande surface{" "}
              </h2>
              <p className="text-sm text-center font-light">
                La grande majorité des produits utilisée en fait-maison est
                accessible dans vos supermarchés. Nous préconisons des magasins
                bios (Naturalia, La Vie Claire, Biocoop, l’Eau Vive…) et magasin
                bio en ligne (Kazidomi, La Fourche…). Vous pouvez y trouver
                facilement du bicarbonate de soude, du savon de Marseille et
                certaines huiles végétales.
              </p>
            </div>
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={IconInternet}
                  className="w-12 lg:w-16 self-center items-center"
                  alt="Internet_icon"
                />{" "}
              </div>
              <h2 className="text-base text-center font-light">
                Sur les sites marchands{" "}
              </h2>
              <p className="text-sm text-center font-light">
                En ligne, l’offre est bien plus grande, mais attention à la
                qualité ! Nous recommandons certaines marques françaises comme :
                Vos huiles, La compagnie des sens ou Joli essence. Sur ces
                sites, vous trouverez absolument tout ce dont vous avez besoin :
                ingrédients cosmétiques, huiles essentielles, poudres végétales
                et ingrédients pour le ménage.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <SectionStarterPage
        color="green"
        step={false}
        maintitle="Aller plus loin"
        title="Où trouver les informations nécessaires ?"
        text="Les informations sur le fait-maison sont éparpillées sur internet
        entre les blogs, c’est la raison pour laquelle Greenit existe !
        Greenit c’est des recettes simples, des ateliers et les information
        ingrédients (bientôt). En attendant, nous vous proposons une
        sélection de sources pour débuter en fait-maison."
      ></SectionStarterPage>

      <Container className="grid justify-items-center w-full lg:w-10/12 lg:mt-6 mb-6">
        <div className="flex flex-row overflow-x-auto w-full lg:w-11/12 pb-6 mb-2 px-4">
          <div className="flex gap-6 lg:gap-10">
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={IconAtelier}
                  className="w-16 lg:w-18 self-center items-center"
                  alt="Atelier_icon"
                />{" "}
              </div>
              <h2 className="text-base text-center font-light">Ateliers </h2>
              <p className="text-sm text-center font-light">
                L’atelier du D.I.Y : https://www.atelier-diy.com La bonne <br />
                <br />
                composition à Paris: https://labonnecomposition.fr Lavande et{" "}
                <br />
                <br />
                Camomille à Lyon : https://www.lavandeetcamomille.com <br />
                <br />
              </p>
            </div>
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={Livre}
                  className="w-16 lg:w-18 self-center items-center"
                  alt="Livre_icon"
                />{" "}
              </div>
              <h2 className="text-base text-center font-light">
                Livres recommandés{" "}
              </h2>
              <p className="text-sm text-center font-light">
                Ma bible des huiles essentielles de Danièle Festy (Editions
                Leduc) <br />
                <br />
                Ma bible de la slow cosmétique de Julien Kaibeck (Editions
                Leduc) <br />
                <br />
                INCI BEAUTY - Bien choisir ses produits cosmétiques de
                Jean-Christophe Janicot (Larousse) <br />
              </p>
            </div>
            <div className="grid bg-white rounded-xl shadow-lg m-2 p-6 w-72">
              <div className="grid justify-items-center">
                <img
                  src={IconSite}
                  className="w-16 lg:w-18 self-center items-center"
                  alt="Site_icon"
                />{" "}
              </div>
              <h2 className="text-base text-center font-light">
                Site internet{" "}
              </h2>
              <p className="text-sm text-center font-light">
                Le site de la Slow Cosmétique : https://www.slow-cosmetique.org{" "}
                <br />
                <br /> <br /> Le site d’Aroma-Zone pour leurs informations :
                https://www.aroma-zone.com
                <br /> <br /> Le site de la Compagnie des Sens :
                https://www.compagnie-des-sens.fr
              </p>
            </div>
          </div>
        </div>
      </Container>

      <SectionStarterPage
        color="green"
        step={false}
        maintitle="Explorer plus"
        title="À la recherche d'autres recettes simples pour débuter ?"
      ></SectionStarterPage>

      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 justify-self-center justify-content-center w-10/12 lg:w-3/5 mt-6 mb-16">
        <h3 className="text-sm lg:text-base lg:col-span-2 font-light mt-6">
          <p>
            "Avec les ingrédients de la cuisine" réuni toutes les recettes avec
            des ingredients que l'on peut déjà avoir chez soi.
          </p>
        </h3>
        {landingPageCategories.slice(2, 3).map((item) => (
          <CategoryCircle name={item.title} icon={item.icon} key={item.title} />
        ))}
        {landingPageCategories.slice(0, 1).map((item) => (
          <CategoryCircle name={item.title} icon={item.icon} key={item.title} />
        ))}
        <h3 className="text-sm lg:text-base lg:col-span-2 font-light mt-6 text-right">
          <p>"Premier pas" réuni toutes les recettes les plus simples.</p>
        </h3>
      </div>

      <SectionStarterPage
        color="green"
        step={false}
        maintitle="Des questions ?"
        title="N'hesitez pas à nous partager vos questions et retours pour que l'on
        puisse mieux vous accompagner."
      ></SectionStarterPage>
      <h3 className="text-sm lg:text-lg font-light px-6 text-center mt-4 mb-20">
        👇 Ici 👇
      </h3>

      {/* A FAIRE - comment les gens peuvent-ils nous adresser leurs quetsion super facilement ? */}
      <Footer />
    </div>
  );
};

export default StarterPage;
