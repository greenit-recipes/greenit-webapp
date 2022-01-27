import { RouteName } from "App";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useIsMobile from "../hooks/isMobile";
import { Container, Footer, Navbar } from "../components";
import { Button } from "components/misc/Button";
import {
  PhotoAtelier,
  KabaAtelier1,
  KabaAtelier2,
  KabaLogo,
  MargauxAtelier,
  MargauxLogo,
  ChristelleAtelier,
  ChristelleAtelier1,
  ChristelleAtelier2,
  ChristelleLogo,
} from "../../src/icons";

const WorkshopPage = () => {
  const [isIncoming, setIsIncoming] = useState(false);

  const isMobile = useIsMobile();
  const fieldRef = React.useRef<HTMLInputElement>(null);

  const scrollIntoReview = () => {
    setIsIncoming(true);

    if (!fieldRef) return;
    // @ts-ignore
    fieldRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <Container className="flex flex-col | items-center | w-2/3 md:w-full mt-16 lg:mt-28 p-4">
        <h1 className="text-2xl md:text-3xl | text-center">
          Tous les ateliers DIY proches de chez toi !
        </h1>

        <h3 className="mt-2 text-1xl md:text-2xl | md:pb-10 text-center">
          Fais-toi aider et rencontre d’autres passionnés
        </h3>
      </Container>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
                <img
                  src={"https://pic.onlinewebfonts.com/svg/img_280333.png"}
                  className="w-auto h-6 lg:h-9"
                  alt="icon Location"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">
                  En ligne
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
            <div className="flex justify-start ...">
              <div>
                <img
                  src="/static/media/logo.223c90e0.png"
                  className="w-16 lg:w-18"
                  alt="Greenit Logo"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-lg md:text-xl">
                  Les Ateliers Greenit
                </h3>
                <h5 className="pl-3 text-base">Adrien et Andrea </h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <Link to={RouteName.contact}>
                <Button type="green" className="md:text-xl">
                  Contacter
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Nous sommes passionnés de fait-maison depuis de nombreuses
                années. Adrien et Andrea vous proposent un atelier gratuit pensé
                pour les curieux et nouveaux arrivants dans le monde du
                fait-maison. C’est aussi l’occasion d’échanger sur ce mode de
                consommation et de comprendre les raisons et les motivations
                associées !
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 mt-5 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                src={PhotoAtelier}
                className="rounded-2xl"
                style={{ width: "100%", maxWidth: "200px" }}
              />
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 static ...">
              <div className="static ...">
                <h2>Prochain ateliers :</h2>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 15 janvier</h5>
                <h5 className="text-sm">10h - 11h00 (CEST)</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href="https://www.eventbrite.fr/e/221952414647"
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Cet atelier est destiné aux débutants ! Quelles sont les
                premières étapes ? Quelles huiles choisir ? Quelles compositions
                ? Où acheter ? Nous parlerons de l’expansion du fait-maison,
                nous répondrons à vos questions !
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="bg-transparent border-b-4 border-gray-300"></div>
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
            <div className="flex justify-start ...">
              <div>
                <img src={KabaLogo} className="w-16 lg:w-18" alt="Le Kaba" />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-lg md:text-xl">
                  Les formations : classe découverte et classe verte
                </h3>
                <h5 className="pl-3 text-base">Le Kaba </h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <a href={"https://www.lekaba.fr/"} target="_blank">
                <Button type="green" className="md:text-xl">
                  Contacter
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Le Kaba regroupe de nombreux comparatifs, articles et formations
                pour te guider à la consommation éco-responsable ! Formez-vous
                avec un expert de la consommation éco-responsable pour agir, à
                votre échelle, face à l’urgence climatique.
              </h3>
              <h2 className="text-green mt-2">
                🌱 10 EUROS OFFERTS : avec le code GREENIT10
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-8 mt-6 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                src={KabaAtelier1}
                className="rounded-2xl"
                style={{ width: "100%", maxWidth: "200px" }}
              />
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 static ...">
              <div className="static ...">
                <h2>L’atelier découverte :</h2>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-44">
                <h5 className="text-base">Samedi 8 février</h5>
                <h5 className="text-sm">18h - 18h30</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href="https://www.eventbrite.fr/e/billets-latelier-decouverte-du-kaba-163663494919"
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                🕑 30 minutes de visio en groupe avec un expert de la conso
                responsable
                <br /> 🔟 10 conseils pour bien débuter
                <br /> 🎁 Offert : un guide de 10 éco-gestes à mettre en place
                immédiatement
                <br /> 🔍 Découvrez les chiffres clés de la conso responsable et
                les éco-gestes primordiaux à mettre en place dans son quotidien.
                <br /> 📍 En ligne
                <br /> 🎤 Présenté par un expert de la consommation responsable
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                src={KabaAtelier2}
                className="rounded-2xl"
                style={{ width: "100%", maxWidth: "200px" }}
              />
            </div>
          </div>
          <div className="mt-10 rounded">
            <div className="h-9/12 static ...">
              <div className="static ...">
                <h2>La classe verte :</h2>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-44 mb-6">
                <h5 className="text-base">Mardi 1 février</h5>
                <h5 className="text-sm">21h - 22h30</h5>
                <h5 className="text-sm">25€</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href="https://www.eventbrite.fr/e/billets-les-classes-vertes-du-kaba-atelier-de-1h30-en-visio-pour-passer-a-laction-160817869577"
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-44">
                <h5 className="text-base">Jeudi 24 février</h5>
                <h5 className="text-sm">12h30 - 14h00</h5>
                <h5 className="text-sm">25€</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href="https://www.eventbrite.fr/e/billets-les-classes-vertes-du-kaba-atelier-de-1h30-en-visio-pour-passer-a-laction-160817869577"
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                🕑 1h30 minutes de formation et 30 minutes de questions/réponses
                <br /> 📝 Des conseils concrets, faciles à mettre en place pour
                transformer votre quotidien
                <br />
                🗒 Un plan d’action personnalisé
                <br /> 🎁 Offert : un guide complet des 30 gestes qui changeront
                durablement votre quotidien
                <br /> 🔍 Découvrez les chiffres clés de la conso responsable et
                tous les gestes à mettre en place dans la cuisine, la salle de
                bain, pour l’entretien de la maison, au travail et dans votre
                dressing pour une vie éco-responsable
                <br />
                📍 En ligne
                <br /> 🎤 Présenté par un expert de la consommation responsable
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
                <img
                  src={"https://pic.onlinewebfonts.com/svg/img_280333.png"}
                  className="w-auto h-6 lg:h-9"
                  alt="icon Location"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">
                  Aix-en-Provence
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
            <div className="flex justify-start ...">
              <div>
                <img
                  src={MargauxLogo}
                  className="w-24 lg:w-18"
                  alt="Greenit Logo"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-lg md:text-xl">
                  L’atelier cosmétique de Margaux
                </h3>
                <h5 className="pl-3 text-base">
                  {" "}
                  Animatrice d’ateliers cosmétiques et formée en cosmétologie
                  naturelle{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <a
                href={"https://lateliercosmetiquedemargaux.fr/contact/"}
                target="_blank"
              >
                <Button type="green" className="md:text-xl">
                  Contacter
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Experte en cosmétologie naturelle, je propose des ateliers
                cosmétique clef en main (ingrédients, matériels, contenants
                fournis) le but est d’apprendre à formuler ses propres produits
                cosmétiques afin de les refaire chez soi plus tard. Les ateliers
                se déroulent à Gardanne et alentours dans la bonne humeur et la
                bienveillance.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 mt-5 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                src={MargauxAtelier}
                className="rounded-2xl"
                style={{ width: "100%", maxWidth: "200px" }}
              />
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 static ...">
              <div className="static ...">
                <h2>Prochain atelier :</h2>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-48">
                <h5 className="text-base">
                  Contacter Margaux pour la date et le lieu
                </h5>
                <h5 className="text-sm">à partir de 29 euros</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href={"https://lateliercosmetiquedemargaux.fr/home/"}
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Fourchette de prix : 29€ à 55€
                <br /> Cosmétiques proposés : crème de jour, shampoing solide et
                liquide, déodorant, sérum huileux, démaquillant, baume à lèvres,
                liniment oléo-calcaire, chantilly de karité, savon saponifié à
                froid, dentifrice, gel hydroalcoolique et plein d’autres…
                <br />
                <br /> Lieux des ateliers : Gardanne et alentours (environ 20km
                autour)
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
                <img
                  src={"https://pic.onlinewebfonts.com/svg/img_280333.png"}
                  className="w-auto h-6 lg:h-9"
                  alt="icon Location"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">
                  Angers
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
            <div className="flex justify-start ...">
              <div>
                <img
                  src={ChristelleLogo}
                  className="w-28 lg:w-32 rounded-lg"
                  alt="Greenit Logo"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-lg md:text-xl">
                  Ateliers Éclat d'essences
                </h3>
                <h5 className="pl-3 text-base">
                  {" "}
                  Ateliers de cosmétiques bio DIY et d'aromathérapie !{" "}
                </h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <a
                href={"https://www.instagram.com/eclatdessences/"}
                target="_blank"
              >
                <Button type="green" className="md:text-xl">
                  Contacter
                </Button>
              </a>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Passionnée par le DIY et diplômée en aromathérapie, j'anime des
                ateliers pour vous initier à l’élaboration de vos propres
                cosmétiques naturels ainsi qu’à l’utilisation des huiles
                essentielles. Les recettes sont testées et approuvées. Si vous
                avez envie de réaliser vos cosmétiques naturels et BIO, ou d'en
                savoir plus sur l'aromathérapie, il y a forcément un atelier
                pour vous. Partagez un moment unique entre amis ou en famille !
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 mt-8 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="rounded md:row-span-3">
            <div className="flex flex-wrap justify-center items-center align-middle h-full">
              <img
                src={ChristelleAtelier1}
                className="rounded-2xl"
                style={{ width: "100%", maxWidth: "200px" }}
              />
              {isMobile ? (
                <div></div>
              ) : (
                <div>
                  <img
                    src={ChristelleAtelier}
                    className="rounded-2xl mt-2"
                    style={{ width: "100%", maxWidth: "200px" }}
                  />

                  <img
                    src={ChristelleAtelier2}
                    className="rounded-2xl mt-2"
                    style={{ width: "100%", maxWidth: "200px" }}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 grid md:justify-items-center">
              <div className="static ...">
                <h2> Atelier découverte DIY </h2>
                <h3> Cosmétiques naturels </h3>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-48">
                <h5 className="text-base">
                  Contacter Eclat d'Essences pour la date et le lieu.
                </h5>
                <h5 className="text-sm">à partir de 30 euros</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href={"https://www.instagram.com/eclatdessences/"}
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:col-span-2 mt-2">
            <div className="self-center">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Réalisation en groupe d'une recette 'cosmétique' et d'une
                recette 'produit ménager'.
              </h5>
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 grid md:justify-items-center">
              <div className="static ...">
                <h2>Atelier Aromatherapie :</h2>
                <h3> La trousse aroma de l'hiver </h3>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-48">
                <h5 className="text-base">
                  Contacter Eclat d'Essences pour la date et le lieu.
                </h5>
                <h5 className="text-sm">à partir de 30 euros</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href={"https://www.instagram.com/eclatdessences/"}
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:col-span-2 mt-2">
            <div className="self-center">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Réalisation d’un roll-on ‘Immunité’ par participant.
              </h5>
            </div>
          </div>
          <div className="mt-6 rounded">
            <div className="h-9/12 grid md:justify-items-center">
              <div className="static ...">
                <h2> Atelier 'Un temps pour soi'</h2>
              </div>
              <div className="p-4 inline-block shadow-lg rounded-2xl w-48">
                <h5 className="text-base">
                  Contacter Eclat d'Essences pour la date et le lieu.
                </h5>
                <h5 className="text-sm">à partir de 30 euros</h5>
                <div className="flex justify-center items-center align-middle">
                  <a
                    href={"https://www.instagram.com/eclatdessences/"}
                    target="_blank"
                  >
                    <button className="button_reserver">Reserver</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:col-span-2 mt-2">
            <div className="self-center">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Soin complet du visage en cosmétique naturel bio. Réalisation en
                groupe d’une recette 'cosmétique' : masque purifiant et
                régénérant.
              </h5>
            </div>
          </div>
        </div>
      </div>

      <Container className="flex flex-col | items-center | mt-6 md:mt-16 p-6">
        <h1 className="text-xl md:text-2xl | text-center">
          Clique sur la region où tu aimerais avoir un atelier :
        </h1>
      </Container>

      <div className="p-5 mb-4 mt-4 flex items-center justify-center">
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Ile-de-France
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Grand-Est
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Auvergne-Rhône Alpes
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Bourgogne-Franche Comté
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Pays de la Loire
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Bretagne
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Occitanie
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Normandie
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Hauts-de-France
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Nouvelle-Aquitaine
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
            // @ts-ignore
            ref={fieldRef}
          >
            Centre-Val de Loire
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            PACA
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Corse
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => scrollIntoReview()}
          >
            Régions Outre-mer
          </button>
        </div>
      </div>
      {isIncoming && (
        <div className="text-lg p-4 text-blue">
          Ton avis est pris en compte !
        </div>
      )}

      <Container
        className="flex flex-col | items-center | mt-6 mb-40 md:mt-10 md:mb-50"
        padding
      >
        <h1 className=" p-2 text-xl mb-10 | md:text-2xl | text-center">
          Tu es un.e passioné.e de DIY et tu aimerais proposer des ateliers ?{" "}
          <br />
          Ça nous intéresse !
        </h1>
        <a
          href="mailto:hello@greenitcommunity.com"
          className="inline-flex gap-x-4"
        >
          <button className="button_contact">
            <h3 className="text-lg md:text-xl">Proposer un atelier</h3>
          </button>
        </a>
      </Container>

      <Footer />
    </div>
  );
};

export default WorkshopPage;
