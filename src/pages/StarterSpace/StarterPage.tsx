import { RouteName } from "App";
import { Container, Footer, Navbar } from "components";
import useIsMobile from "hooks/isMobile";
import { CategoryCircle } from "pages/LandingPage/Components/CategoryCircle";
import { AskQuestion } from "pages/StarterSpace/component/AskQuestion/AskQuestion";
import { FirstStep } from "pages/StarterSpace/component/FirstStep/FirstStep";
import { SectionStarterPage } from "pages/StarterSpace/SectionStarterPage";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { RWebShare } from "react-web-share";
import authService from "services/auth.service";
import { landingPageCategories } from "utils";
import { Button } from "../../components";
import {
  Balance,
  BeurreKarite,
  BicarSoude,
  Bocal,
  Bol,
  Bouteille,
  Catherine,
  Christelle,
  CireAbeille,
  Conseil,
  Cooking,
  CremeCorp,
  Eau,
  EcorceArgume,
  Fouet,
  HuileRicin,
  Lessive,
  logo,
  Maryse,
  SavonMarseille,
  Ustensil,
  BadgeJeDebute,
} from "../../icons";
import "./StarterPage.css";
const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

const StarterPage = () => {
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  const isLoggedIn = authService.isLoggedIn();

  const fieldRefEtape3 = useRef<HTMLInputElement>(null);
  const fieldRefEtape1 = useRef<HTMLInputElement>(null);
  const fieldRefEtape2 = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();

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

  const [isActive, setIsActive] = useState(false);
  const [toggle, setToggle] = useState(false);

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

      <Container className="flex justify-center w-full pt-10 pb-20 md:py-16 bg-blueL">
        <div className="flex flex-col gap-2 w-10/12">
          <h1 className="font-medium">Comment se lancer ?</h1>
          <h3>
            Pour tous les curieux qui ne savent pas par où commencer dans le
            DIY, <br /> ce guide est fait pour vous !
          </h3>
          <h4 className="font-light">
            Voici 3 étapes simples pour vous lancer dans le fait-maison en
            débutant pas à pas.
          </h4>
        </div>
      </Container>

      <Container className="grid md:w-10/12 justify-items-end mb-10">
        <div className="invisible lg:visible lg:relative w-full">
          <img
            className="absolute -top-11 -rotate-12 w-36 h-36"
            src={BadgeJeDebute}
          />{" "}
        </div>
        <div className="grid grid-cols-3 | gap-4 -mt-10 md:-mt-20">
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
          ].map(item => (
            <div
              className="w-28 h-28 lg:w-40 lg:h-40 grid bg-white rounded-md shadow-flat m-1 p-2 | cursor-pointer transform hover:border-1 hover:br-darkBlue hover:scale-105 duration-100"
              onClick={() => item.fonction()}
            >
              <div className="grid absolute w-8 h-8 -mt-2 -ml-2 bg-white rounded-full shadow-sm m-2">
                <h2 className="text-center self-center text-lg">
                  {item.number}
                </h2>
              </div>
              <div className="grid justify-items-center">
                <img
                  src={item.icon}
                  className="w-10 lg:w-16 self-center items-center"
                  alt="conseils_diy"
                  loading="lazy"
                />{" "}
              </div>
              <h3 className="text-sm  text-center font-regular">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
        <div ref={fieldRefEtape1} />
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
            userPresentationTitle: "Le conseil de Catherine",
            userPresentationTitleSubtitle:
              "Ingénieure et ambassadrice contre le changement climatique",
            citation:
              "Remplacer vos produits petit à petit et commencer par des recettes simples !",
            shortDescription:
              "Remplacer vos produits petit à petit et de commencer par trouver l’huile végétale qui vous convient.",
            longDescription:
              "<br/>La plus grosse erreur que je vois quand on veut se lancer en cosmétique maison, c'est de vouloir essayer plein de choses en même temps avec plein d'ingrédients. On dépense beaucoup, on s'éparpille, cela prend du temps et on s'arrête rapidement parce qu'on est perdu. 😱<br> <br> Mon conseil est donc : <br/> Remplacer vos produits petit à petit et de commencer par trouver l’huile végétale qui vous convient.<br/>  La question à vous poser est : quelle est ma problématique principale ? La peau qui tire ? Des boutons ? Des zones de brillance ? <br/> <br/> Ensuite, trouver l’huile végétale qui répond à cette problématique.  Cette huile végétale peut s’utiliser seule à la place de votre crème de jour ou crème de nuit. C’est la solution la plus naturelle et la plus économique ! Testez avant de réaliser une crème compliquée 😉",
          },
          {
            imgProfil: Christelle,
            altImgProfil: "Photo Christelle",
            userPresentationTitle: "Le conseil de Christelle",
            userPresentationTitleSubtitle:
              "Naturopathe et animatrice d’atelier",
            citation:
              "Sélectionner ses ingrédients en fonction de votre type de peau. ",
            shortDescription: "",
            longDescription:
              "Il est important de déterminer les ingrédients qui vont vous faire du bien en fonction des besoins de votre peau et d’en maîtriser les propriétés.<br> Pour les peaux grasses à imperfections, on va préférer une huile sèche de noisette ou de jojoba pour se démaquiller, un hydrolat d’hamamélis ou de lavande pour purifier la peau et de l’huile de nigelle avec de l’aloe vera pour l’hydrater.<br> Pour une peau normale à mixte, on opte pour une huile végétale de noyaux d’abricot ou de macadamia, et un hydrolat de rose ou fleur d’oranger.<br> En cas de peau sèche, on se démaquille à l’huile de coco, avocat ou carthame, on tonifie avec un hydrolat de camomille ou bleuet et on hydrate avec une huile d’amande douce avec du gel d’aloe vera.<br> <br> Il me parait aussi intéressant de suivre un atelier découverte ou d’investir dans un bon livre pour intégrer les principes de base.Une bonne recette de cosmétique maison ne doit pas contenir trop d’ingrédients. Il vaut mieux faire moins d’ingrédients mais bien sélectionnés et plus efficaces ! Commencez par une recette simple, avec seulement quelques étapes. Vous serez satisfaite du résultat et cela vous donnera envie d’en faire plein d’autres ! <br> <br> À vous de jouer !",
          },
          {
            imgProfil: logo,
            altImgProfil: "Greenit Logo",
            userPresentationTitle: "Nos conseils",
            userPresentationTitleSubtitle: "Greenit Community",
            citation: "Respectons les règles de base",
            shortDescription:
              "Comme pour la cuisine, vous devez respecter quelques règles :",
            longDescription:
              "<br/> • L’utilisation des huiles essentielles <br/> Certaines d’entre elles sont très irritantes et allergènes. Optez pour 3 huiles essentielles, selon vos problématiques, et apprenez leurs propriétés, posologie et risques. <br/> <br/> • La conservation des produits <br/> Les produits maisons n’étant pas boostés aux conservateurs chimiques, ils se gardent moins longtemps. Lorsque vous réalisez une émulsion eau/huile, il est vivement recommandé d’utiliser un conservateur naturel. Pour une phase huileuse uniquement, de la vitamine E suffit. En règle générale, dès que votre préparation change d’aspect, de couleurs, d’odeur, il est préférable de la jeter, de la même façon que vos ingrédients du frigo. <br/> <br/> •  Respecter les règles d’hygiène <br/> Enfin, toujours respecter les règles d’hygiène lors de la préparation de vos produits : un plan de travail et des ustensiles nettoyés ainsi que des mains propres.",
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

      <Container className="grid lg:justify-center w-full mt-4 mb-20">
        <div className="flex flex-row overflow-x-auto w-full px-4">
          <div className="flex gap-4 p-4 lg:gap-0">
            {[
              {
                icon: Bol,
                maintitle: "Bol en inox",
                title: "Pour la cuisson au bain-marie",
                subtitle:
                  "Le bol permet de faire vos préparations avant de les verser dans les contenants. Certaines préparations nécessitent une chauffe au bain-marie, l’inox est donc idéal.",
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
                className="grid bg-white rounded-md shadow-flat m-2 p-6 w-72"
                key={index}
              >
                <div className="grid justify-items-center h-20">
                  <img
                    src={item.icon}
                    className="w-16 lg:w-18 self-center items-center"
                    alt={item.maintitle}
                    loading="lazy"
                  />{" "}
                </div>
                <h3 className="text-center font-semibold h-8">
                  {item.maintitle}
                </h3>
                <h4 className="text-center mb-2 h-8">{item.title}</h4>
                <p className="text-center h-32">{item.subtitle}</p>
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
      <Container className="flex| lg:w-10/12 w-11/12 p-3 lg:mt-6">
        <h2 className="text-2xl mb-1">Recette 1 :</h2>
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex-col flex">
            <h2 className="text-xl font-regular mb-4 mr-4">
              Crème nourrissante
            </h2>
            <div className="relative place-self-center lg:place-self-start">
              <Button
                className="absolute bottom-0 right-0 mx-3 mb-1 md:mb-2 md:ml-2 shadow-flat"
                type="darkBlue"
                onClick={() => {
                  window.open(
                    "https://greenitcommunity.com/recettes/creme-pour-le-corps-hydratante-a-la-vanille",
                  );
                }}
              >
                Voir la recette
              </Button>
              <img
                src={CremeCorp}
                className={`${isMobile ? "rounded-md w-36 h-45" : "img-dim"}`}
                loading="lazy"
                alt="creme corps"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex mt-2">
                <p>Quantité : </p>
                <p>&nbsp;70 g</p>
              </div>
              <div className="flex mb-2">
                <p>Prix : </p>
                <p>&nbsp;2,80 €</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-2/4">
            <div className="flex mb-4">
              <h2 className="text-xl font-regular self-end">Les ingrédients</h2>
            </div>
            <div className="flex items-center overflow-x-auto lg mb-4">
              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={BeurreKarite}
                    className="w-24 h-24 max-w-none"
                    alt="Beurre de Karité"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    50 g
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Beurre de karité
                  </p>
                </div>
                <h4 className="text-xs lg:text-sm font-regular text-center">
                  3,90 € / 100 g{" "}
                </h4>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={HuileRicin}
                    className="w-24 h-24 max-w-none"
                    alt="Huile de Ricin"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    20 g{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Huile végétale de ricin{" "}
                  </p>
                </div>
                <h4 className="text-xs lg:text-sm font-regular text-center">
                  2,60 € / 100 g{" "}
                </h4>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={CireAbeille}
                    className="w-24 h-24 max-w-none"
                    alt="Cire d'Abeille"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    2 g{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Cire d’abeille{" "}
                  </p>
                </div>
                <h4 className="text-xs lg:text-sm font-regular text-center">
                  2,90 € / 30 g{" "}
                </h4>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={Bocal}
                    className="w-24 h-24 max-w-none"
                    alt="Bocal_icon"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-darkBlue rounded-full -mt-8 lg:ml-4 relative z-20">
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
            <div className="flex flex-col">
              <button
                id="starterPage-info-ingredients"
                className="flex cursor-pointer hover:text-yellow"
                onClick={() => setIsActive(!isActive)}
              >
                <i className="bx bx-info-circle text-2xl mt-1 cursor-pointer"></i>
                <p id="info_ingredients" className="self-center ml-3">
                  {" "}
                  Pourquoi ces ingrédients ?
                </p>
              </button>
              <div
                className={
                  isActive ? "ingredient_fadeIn" : "ingredient_fadeOut"
                }
              >
                <div className="flex justify-self-center p-3 mt-1 bg-yellowL rounded-md">
                  <h4 className="font-regular text-sm">
                    Le beurre de karité permet de réparer les peaux abîmées. Il
                    pénètre rapidement et nourrit en profondeur. L’huile
                    végétale de ricin est utilisée pour ses propriétés sur la
                    peau : adoucissante, réparatrice et purifiante. La cire
                    d’abeille est utilisée pour donner de la texture.
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:w-1/5 mt-4 lg:mt-0">
            <h2 className="text-lg text-center lg:text-xl lg:mb-5 font-regular">
              Où acheter ?{" "}
            </h2>
            <div className="flex flex-col m-4 w-60 items-center self-center p-4 | lg:col-span-1 lg:m-0 | bg-white rounded-md shadow-flat">
              <p className="text-center text-sm font-light  mb-2">
                Nous conseillons Mycosmetik 🇫🇷 pour l'acessibilité et la qualité
                des produits. 👇
              </p>
              <div>
                <p className="text-center mb-4">9,40 €</p>
                <Button
                  id="page-debutant-order-jolieessence"
                  onClick={() => {
                    window.open(
                      "https://www.mycosmetik.fr/#ae411                      ",
                    );
                  }}
                  type="green"
                  className="w-32 h-10"
                >
                  {" "}
                  Commander
                </Button>
              </div>
            </div>
            <p className="lg:text-center text-sm text-sm font-light lg:mt-6">
              En achetant ces ingrédients, vous pouvez faire{" "}
              <span className="bold">2</span> crèmes. La cire d’abeille pour
              tous type de baumes.
            </p>
          </div>
        </div>
      </Container>
      {/* Etape 3 Recette 2 */}
      <Container className="flex| lg:w-10/12 w-11/12 p-3 lg:mt-6 mb-20">
        <h2 className="text-2xl mb-1">Recette 2 :</h2>
        <div className="flex flex-col justify-between lg:flex-row">
          <div className="flex-col flex">
            <h2 className="text-xl font-regular mb-4 mr-4">Lessive minute</h2>
            <div className="relative place-self-center lg:place-self-start">
              <Button
                className="absolute bottom-0 right-0 mx-3 mb-1 md:mb-2 md:ml-2 shadow-flat"
                type="darkBlue"
                onClick={() => {
                  window.open(
                    "https://greenitcommunity.com/recettes/lessive-express/",
                  );
                }}
              >
                Voir la recette
              </Button>
              <img
                src={Lessive}
                className={`${isMobile ? "rounded-md w-36 h-45" : "img-dim"}`}
                loading="lazy"
                alt="lessive"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <div className="flex mt-2">
                <p>Quantité : </p>
                <p>&nbsp;1 L</p>
              </div>
              <div className="flex mt-2 mb-3">
                <p>Prix : </p>
                <p>&nbsp;0,50 €</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:w-2/4">
            <div className="flex mb-4">
              <h2 className="text-xl self-end font-regular">Les ingrédients</h2>
            </div>
            <div className="flex items-center overflow-x-auto lg mb-4">
              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={BicarSoude}
                    className="w-24 h-24 max-w-none"
                    alt="Bicarbonate de Soude"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    10 g
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Bicarbonate de Soude
                  </p>
                </div>
                <h4 className="text-xs lg:text-sm font-light text-center mt-8">
                  4,30 € / 1 kg{" "}
                </h4>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={SavonMarseille}
                    className="w-24 h-24 max-w-none"
                    alt="Huile de Ricin"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    30 g{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Savon de Marseille
                  </p>
                </div>
                <h4 className="text-xs lg:text-sm font-light text-center mt-8">
                  2,30 € / 100 g{" "}
                </h4>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={Eau}
                    className="w-24 h-24 max-w-none"
                    alt="Eau"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    1 L{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Eau{" "}
                  </p>
                </div>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={EcorceArgume}
                    className="w-24 h-24 max-w-none"
                    alt="Ecorce Agrumes"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-blueL rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-sm self-center font-medium">
                    2 à 3{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    2 Écorces d'agrumes pour l'odeur
                  </p>
                </div>
              </div>

              <div className="flex justify-center h-1/2 lg:h-1/3 mx-1">
                <p className="self-center font-regular text-xl">+</p>
              </div>

              <div className="m-2 w-32 h-60">
                <div className="flex justify-center">
                  <img
                    src={Bouteille}
                    className="w-24 h-24 max-w-none"
                    alt="Bouteille en verre"
                    loading="lazy"
                  />{" "}
                </div>
                <div className="flex justify-center w-12 h-12 bg-darkBlue rounded-full -mt-8 lg:ml-4 relative z-20">
                  <p className="text-center text-white text-xs self-center font-medium">
                    ≈ 1 L{" "}
                  </p>
                </div>
                <div className="h-18 pt-2">
                  <p className="text-sm lg:text-lg font-regular text-center">
                    Bouteille en verre{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <button
                className="flex cursor-pointer hover:text-yellow"
                onClick={() => setToggle(!toggle)}
              >
                <i className="bx bx-info-circle text-2xl mt-1 cursor-pointer"></i>
                <p id="info_ingredients" className="self-center ml-3">
                  {" "}
                  Pourquoi ces ingrédients ?
                </p>
              </button>
              <div
                className={toggle ? "ingredient_fadeIn" : "ingredient_fadeOut"}
              >
                <div className="flex justify-self-center p-3 mt-1 bg-yellowL rounded-md">
                  <h4 className="font-regular text-sm">
                    Le savon de Marseille est un nettoyant et un désinfectant.
                    Il dégraisse les surfaces et agit comme un antiseptique. Le
                    bicarbonate de soude ravive le blanc, adoucit et élimine les
                    odeurs. Pour ajouter une odeur, vous pouvez utiliser des
                    écorces d'agrumes en les laissant macérer.
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:w-1/5 mt-4 lg:mt-0">
            <h2 className="text-lg text-center lg:text-xl lg:mb-5 font-regular">
              Où acheter ?
            </h2>
            <div className="flex flex-col m-4 w-60 items-center self-center justify-between p-4 | lg:col-span-1 lg:m-0 | bg-white rounded-md shadow-lg">
              <p className="text-center text-sm font-light mb-4">
                Ces ingredients sont trouvables dans ta biocop ou ton
                supermarché du coin !
              </p>
              <div>
                <Button
                  id="page-debutant-order-biocop"
                  onClick={() => {
                    window.open(
                      "https://www.biocoop.fr/magasins-bio/Trouver-mon-magasin-Biocoop",
                    );
                  }}
                  type="green"
                  className="w-46 h-10"
                >
                  Trouver une biocop
                </Button>
              </div>
              <p className="pt-4 text-center text-sm font-light self-end">
                Ceci n'est pas un lien sponsorisé. Greenit ne touche pas
                d'argent. 🌱
              </p>
            </div>
            <p className="lg:text-center text-sm text-sm font-light lg:mt-6">
              Le bicarbonate de soude le savon de Marseille vont être réutilisés
              dans plein d'autres recettes maison.
            </p>
          </div>
        </div>
      </Container>

      <SectionStarterPage
        color="blueL"
        step={false}
        maintitle="Pour aller plus loin"
        title="À la recherche des prochaines étapes ?"
      ></SectionStarterPage>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:w-10/12 w-11/12 p-3 md:pt-10 mb-20">
        <div className="grid">
          <h3 className="font-regular text-lg text-center">
            D’autres catégories qui pourraient te plaire
          </h3>
          <div className="flex justify-center pt-6">
            <div className="transform sm:hover:scale-105 ease-linear transition-all duration-150">
              {landingPageCategories.slice(1, 2).map(item => (
                <CategoryCircle
                  name={item.title}
                  icon={item.icon}
                  key={item.title}
                />
              ))}
            </div>
            <div className="transform sm:hover:scale-105 ease-linear transition-all duration-150">
              {landingPageCategories.slice(0, 1).map(item => (
                <CategoryCircle
                  name={item.title}
                  icon={item.icon}
                  key={item.title}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:w-2/3 justify-center">
          <h3 className="font-regular text-lg text-center">
            Répandons le fait-maison ensemble !
          </h3>
          <p className="text-center text-sm ">
            Partage le guide autour de toi et enregistre tes recettes préférées
            de la communauté !
          </p>
          <div className="flex justify-center gap-3 mt-6 md:mt-0">
            <RWebShare
              data={{
                url: window.location.href,
              }}
            >
              <Button
                id="starterPage-guide-partager"
                type="darkBlue"
                className="h-10"
              >
                <i className="bx bx-share bx-flip-horizontal bx-sm mr-2"></i>
                Partager le guide
              </Button>
            </RWebShare>
            {isLoggedIn ? (
              <Link
                id="starterPage-access-profil-loggedIn"
                to={RouteName.profil}
              >
                <Button id="SP_go_profil" type="blue">
                  Accéder à mon profil
                </Button>
              </Link>
            ) : (
              <ModalLogGreenit
                btn={
                  <Button id="starterPage-create-profil" type="blue">
                    Créer un profil
                  </Button>
                }
              ></ModalLogGreenit>
            )}
          </div>
        </div>
      </div>
      <SectionStarterPage
        color="blueL"
        step={false}
        maintitle="Espace d'aide"
        title="Des questions persistent, écris-nous !"
      ></SectionStarterPage>
      <h3 className="text-sm lg:text-lg font-light px-6 text-center mt-4 mb-6">
        👇 Ici 👇
      </h3>
      <div className="lg:w-10/12 w-11/12 p-3 flex justify-center">
        <AskQuestion></AskQuestion>
      </div>
      <Footer />
    </div>
  );
};

export default StarterPage;
