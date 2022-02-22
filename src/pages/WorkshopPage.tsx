import { RouteName } from "App";
import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
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
  logo,
  LCParfum,
  LCBougie,
  LCPAtelier,
  LCShampoing,
} from "../../src/icons";
import { includes } from "lodash";
import { Helmet } from "react-helmet";

const WorkshopPage = () => {
  const [isIncoming, setIsIncoming] = useState(false);

  const params = new URLSearchParams(window.location.search);
  const isMobile = useIsMobile();
  const fieldRef = React.useRef<HTMLInputElement>(null);
  const fieldRefSuggestWorkshop = React.useRef<HTMLInputElement>(null);
  const fieldRefOnlineWorkshop = React.useRef<HTMLInputElement>(null);
  const fieldRefPhysiqueWorkshop = React.useRef<HTMLInputElement>(null);
  const history = useHistory();

  const scrollIntoReview = () => {
    setIsIncoming(true);

    if (!fieldRef) return;
    // @ts-ignore
    fieldRef?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    history.listen((prev: any) => {
      if (includes(prev?.pathname, RouteName.workshops)) {
        window.location.reload();
      }
    });
  }, [history]);

  const scrollIntoSuggestWorkshop = () => {
    if (!fieldRefSuggestWorkshop) return;
    // @ts-ignore
    fieldRefSuggestWorkshop?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollIntoFieldRefOnlineWorkshop = () => {
    if (!fieldRefOnlineWorkshop) return;
    // @ts-ignore
    fieldRefOnlineWorkshop?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollIntoFieldRefPhysiqueWorkshop = () => {
    if (!fieldRefPhysiqueWorkshop) return;
    // @ts-ignore
    fieldRefPhysiqueWorkshop?.current.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const sectionPageAutoScrool = params.get("scroolTo");
    if (sectionPageAutoScrool) {
      if (sectionPageAutoScrool === "suggestWorkshop") {
        setTimeout(() => scrollIntoSuggestWorkshop(), 300);
      } else if (sectionPageAutoScrool === "onlineWorkshop") {
        setTimeout(() => scrollIntoFieldRefOnlineWorkshop(), 300);
      } else if (sectionPageAutoScrool === "physiqueWorkshop") {
        setTimeout(() => scrollIntoFieldRefPhysiqueWorkshop(), 300);
      }
      return;
    }
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);
  return (
    <div>
      <Helmet>
        <title>
          Ateliers DIY : Fais-toi aider par des experts en cosmétique maison !
        </title>
        <meta
          name="description"
          content="Greenit Community propose des ateliers partout en France et en ligne pour commencer pas à pas la fabrication de tes cosmétiques et produits ménagers maison."
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: "Les Ateliers de Greenit",
            startDate: "2022-02-26T11:00-00:00",
            endDate: "2022-02-26T12:00-00:00",
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
            location: {
              "@type": "VirtualLocation",
              url: "https://www.google.com/url?q=https://codeuniversity.zoom.us/j/96947694632&sa=D&source=calendar&ust=1644223969305824&usg=AOvVaw2NOCSfCKKGfqgnbi2iRQVl",
            },

            image: [
              "https://greenitcommunity.com/static/media/PhotoAtelier.86d8bb41.jpg",
            ],
            description:
              "Cet atelier est destiné aux débutants ! Quelles sont les premières étapes ? Quelles huiles choisir ? Quelles compositions ? Où acheter ? Nous parlerons de l’expansion du fait-maison, nous répondrons à vos questions !",
            offers: {
              "@type": "Offer",
              url: "https://www.eventbrite.fr/e/221952414647",
              price: "0",
              priceCurrency: "EUR",
              availability: "https://schema.org/InStock",
              validFrom: "2022-01-01T12:00-00:00",
            },
            performer: {
              "@type": "PerformingGroup",
              name: "Andréa & Adrien",
            },
            organizer: {
              "@type": "Organization",
              name: "Greenit",
              url: "https://greenitcommunity.com/",
            },
          })}
        </script>
      </Helmet>
      <div className="flex flex-col | items-center self-center">
        <Navbar />
        <Container className="flex flex-col | items-center | w-5/6 md:w-full mt-16 lg:mt-28 p-4">
          <h1 className="text-2xl font-medium md:text-3xl | text-center">
            Tous les ateliers DIY proches de chez toi !
          </h1>

          <h3
            className="mt-2 text-1xl md:text-2xl | md:pb-10 text-center"
            ref={fieldRefOnlineWorkshop}
          >
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
              <div className="flex justify-start">
                <div>
                  <img src={logo} className="w-16 lg:w-18" alt="Greenit Logo" />
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
                  années. Adrien et Andrea vous proposent un atelier gratuit
                  pensé pour les curieux et nouveaux arrivants dans le monde du
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
              <div className="h-9/12 static">
                <div className="static">
                  <h2>Prochain ateliers :</h2>
                </div>
                <div className="p-4 inline-block shadow-lg rounded-2xl">
                  <h5 className="text-base">Samedi 26 février</h5>
                  <h5 className="text-sm">11h - 12h00 (CEST)</h5>
                  <h5 className="text-sm">Gratuit 0€</h5>
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href="https://www.eventbrite.fr/e/billets-premiers-pas-en-diy-greenit-community-221951201017"
                      target="_blank"
                    >
                      <button className="button_reserver">Reserver</button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:col-span-2">
              <div className="static">
                <h2>Description :</h2>
                <h5 className="text-sm mt-2 md:text-base">
                  Cet atelier est destiné aux débutants ! Quelles sont les
                  premières étapes ? Quelles huiles choisir ? Quelles
                  compositions ? Où acheter ? Nous parlerons de l’expansion du
                  fait-maison, nous répondrons à vos questions !
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="w-4/5 mt-10 flex flex-col">
          <div className="bg-transparent border-b-4 border-gray-300"></div>
          <div className="grid md:grid-cols-2">
            <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
              <div className="flex justify-start">
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
                  Le Kaba regroupe de nombreux comparatifs, articles et
                  formations pour te guider à la consommation éco-responsable !
                  Formez-vous avec un expert de la consommation éco-responsable
                  pour agir, à votre échelle, face à l’urgence climatique.
                </h3>
                <h2 className="text-green mt-2">
                  🌱 10 EUROS OFFERTS : avec le code GREENIT10
                </h2>
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
              <div className="h-9/12 static">
                <div className="static">
                  <h2>La classe verte :</h2>
                </div>
                <div className="p-4 inline-block shadow-lg rounded-2xl w-44 mb-6">
                  <h5 className="text-base">Jeudi 24 février</h5>
                  <h5 className="text-sm">12h30 - 14h</h5>
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
                  <h5 className="text-base">Mardi 15 mars</h5>
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
              </div>
            </div>
            <div className="mt-4 md:col-span-2">
              <div className="static">
                <h2>Description :</h2>
                <h5 className="text-sm mt-2 md:text-base">
                  🕑 1h30 minutes de formation et 30 minutes de
                  questions/réponses
                  <br /> 📝 Des conseils concrets, faciles à mettre en place
                  pour transformer votre quotidien
                  <br />
                  🗒 Un plan d’action personnalisé
                  <br /> 🎁 Offert : un guide complet des 30 gestes qui
                  changeront durablement votre quotidien
                  <br /> 🔍 Découvrez les chiffres clés de la conso responsable
                  et tous les gestes à mettre en place dans la cuisine, la salle
                  de bain, pour l’entretien de la maison, au travail et dans
                  votre dressing pour une vie éco-responsable
                  <br />
                  📍 En ligne
                  <br /> 🎤 Présenté par un expert de la consommation
                  responsable
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div ref={fieldRefPhysiqueWorkshop}></div>
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
              <div className="flex justify-start">
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
                  fournis) le but est d’apprendre à formuler ses propres
                  produits cosmétiques afin de les refaire chez soi plus tard.
                  Les ateliers se déroulent à Gardanne et alentours dans la
                  bonne humeur et la bienveillance.
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
              <div className="h-9/12 static">
                <div className="static">
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
              <div className="static">
                <h2>Description :</h2>
                <h5 className="text-sm mt-2 md:text-base">
                  Fourchette de prix : 29€ à 55€
                  <br /> Cosmétiques proposés : crème de jour, shampoing solide
                  et liquide, déodorant, sérum huileux, démaquillant, baume à
                  lèvres, liniment oléo-calcaire, chantilly de karité, savon
                  saponifié à froid, dentifrice, gel hydroalcoolique et plein
                  d’autres…
                  <br />
                  <br /> Lieux des ateliers : Gardanne et alentours (environ
                  20km autour)
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
              <div className="flex justify-start">
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
                  Passionnée par le DIY et diplômée en aromathérapie, j'anime
                  des ateliers pour vous initier à l’élaboration de vos propres
                  cosmétiques naturels ainsi qu’à l’utilisation des huiles
                  essentielles. Les recettes sont testées et approuvées. Si vous
                  avez envie de réaliser vos cosmétiques naturels et BIO, ou
                  d'en savoir plus sur l'aromathérapie, il y a forcément un
                  atelier pour vous. Partagez un moment unique entre amis ou en
                  famille !
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
                <div className="static">
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
            <div className="mt-10 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="static ">
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
            <div className="mt-10 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="static">
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
                  Soin complet du visage en cosmétique naturel bio. Réalisation
                  en groupe d’une recette 'cosmétique' : masque purifiant et
                  régénérant.
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
                    Lyon
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
              <div className="flex justify-start">
                <div>
                  <img
                    src={LCPAtelier}
                    className="w-28 lg:w-32 rounded-lg"
                    alt="Greenit Logo"
                  />
                </div>
                <div className="items-center self-center">
                  <h3 className="pl-3 text-lg md:text-xl">
                    Lavande et Camomille
                  </h3>
                  <h5 className="pl-3 text-base"> Le diy tout naturellement</h5>
                </div>
              </div>
            </div>
            <div className="bg-transparent rounded mt-2">
              <div className="flex items-center align-middle h-full md:justify-end">
                <a
                  href={"https://www.lavandeetcamomille.com/contact"}
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
                  Créer ses cosmétiques maison, ses produits ménagers, ses
                  bougies et parfums aux essences naturelles...le rêve non? Les
                  Ateliers Lavande et Camomille accompagnent particuliers et
                  professionnels dans l’aventure du DIY, de la création
                  éco-responsable et du fait-maison bio et sain. ...Tout
                  naturellement !”
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
                  src={LCParfum}
                  className="rounded-2xl"
                  style={{ width: "100%", maxWidth: "200px" }}
                />
                {isMobile ? (
                  <div></div>
                ) : (
                  <div>
                    <img
                      src={LCShampoing}
                      className="rounded-2xl mt-2"
                      style={{ width: "100%", maxWidth: "200px" }}
                    />

                    <img
                      src={LCBougie}
                      className="rounded-2xl mt-2"
                      style={{ width: "100%", maxWidth: "200px" }}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="static">
                  <h2>
                    {" "}
                    Création de parfum <br /> aux essences naturelles
                  </h2>
                </div>
                <div className="p-4 inline-block shadow-lg rounded-2xl w-44 mb-6">
                  <h5 className="text-base">Samedi 26 Mars</h5>
                  <h5 className="text-sm">10h00 – 12h30</h5>
                  <h5 className="text-sm">50€</h5>
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href="https://www.lavandeetcamomille.com/events/atelier-creation-de-parfum-personnalise-aux-essences-naturelles-14"
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
                  Venez participer à cet atelier DIY ou j’aurais le plaisir de
                  vous guider dans la création de votre parfum personnel aux
                  fragrances et essences naturelles. Exercez votre nez grâce à
                  ce workshop d’initiation à la parfumerie et créez un parfum
                  qui vous ressemble.
                </h5>
              </div>
            </div>
            <div className="mt-12 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="static">
                  <h2>
                    Shampoing solide et <br /> soin après shampoing
                  </h2>
                </div>
                <div className="p-4 inline-block shadow-lg rounded-2xl w-44 mb-6">
                  <h5 className="text-base">Mardi 15 Mars</h5>
                  <h5 className="text-sm">18h30 – 20h45</h5>
                  <h5 className="text-sm">45€</h5>
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href="https://www.lavandeetcamomille.com/events/soins-cheveux-shampoing-solide-et-soin-apres-shampoing-16"
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
                  Venez participer à cet atelier DIY où j'aurais le plaisir de
                  vous guider dans la réalisation de vos 2 soins naturels pour
                  vos cheveux : un shampoing solide aux poudres de plantes et un
                  soin après-shampoing démêlant et réparateur. Cet atelier de
                  2H30 vous initiera pas à pas à la cosmétique naturelle et vous
                  permettra de personnaliser vos recettes en fonction de votre
                  type de cheveux et de vos envies.
                </h5>
              </div>
            </div>
            <div className="mt-20 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="static">
                  <h2>
                  Atelier bougie naturelle <br/> et fleurie eco friendly 
                  </h2>
                </div>
                <div className="p-4 inline-block shadow-lg rounded-2xl w-44 mb-6">
                  <h5 className="text-base">Jeudi 17 Mars</h5>
                  <h5 className="text-sm">18h30 – 20h30</h5>
                  <h5 className="text-sm">40€</h5>
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href="https://www.lavandeetcamomille.com/events/atelier-bougie-naturelle-et-fleurie-eco-friendly-56"
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
                  Venez participer à cet atelier DIY ou j'aurais le plaisir de
                  vous guider dans la fabrication d’une bougie 100% naturelle,
                  parfumée et décorée aux fleurs séchées. Ce workshop vous
                  guidera pas à pas dans les différentes étapes de réalisation
                  d’une bougie et de son parfum que vous personnaliserez en
                  fonction de vos envies.
                </h5>
              </div>
            </div>
          </div>
        </div>

        <Container className="flex flex-col | items-center | mt-6 md:mt-16 p-6">
          <h2 className="text-xl md:text-2xl | text-center">
            Clique sur la region où tu aimerais avoir un atelier :
          </h2>
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
              // @ts-ignore
              ref={fieldRefSuggestWorkshop}
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
          <h2 className=" p-2 text-xl mb-10 | md:text-2xl | text-center">
            Tu es un.e passioné.e de DIY et tu aimerais proposer des ateliers ?{" "}
            <br />
            Ça nous intéresse !
          </h2>
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
    </div>
  );
};

export default WorkshopPage;
