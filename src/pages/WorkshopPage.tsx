import { RouteName } from "App";
import { Button } from "components/misc/Button";
import { includes } from "lodash";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { logo, PhotoAtelier, Webcam } from "../../src/icons";
import { Container, Footer, Navbar } from "../components";
import useIsMobile from "../hooks/isMobile";

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
        <Container className="flex flex-col | items-center | w-5/6 md:w-full mt-10 lg:mt-10 p-4">
          <h1>Tous les ateliers DIY proches de chez toi !</h1>

          <h3
            className="mt-2 md:pb-10 text-center"
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
                    src={Webcam}
                    className="w-auto h-6 lg:h-9"
                    alt="icon Webcam"
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
                  <h5 className="pl-3 ">Adrien et Andrea </h5>
                </div>
              </div>
            </div>
            <div className="bg-transparent rounded mt-2">
              <div className="flex items-center align-middle h-full md:justify-end">
                <Link to={RouteName.contact}>
                  <Button id="contactWs1" type="green">
                    Contacter
                  </Button>
                </Link>
              </div>
            </div>
            <div className="bg-transparent mt-4 rounded md:col-span-2">
              <div>
                <h4>
                  Nous sommes passionnés de fait-maison depuis de nombreuses
                  années. Adrien et Andrea vous proposent un atelier gratuit
                  pensé pour les curieux et nouveaux arrivants dans le monde du
                  fait-maison. C’est aussi l’occasion d’échanger sur ce mode de
                  consommation et de comprendre les raisons et les motivations
                  associées !
                </h4>
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
                  <h5 className="">Mardi 28 Juin</h5>
                  <h5 className="text-sm">19-20h</h5>
                  <h5 className="text-sm">Prix : 5€</h5>
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href="https://www.eventbrite.fr/e/billets-premiers-pas-en-diy-et-recette-de-lessive-greenit-community-347098720617"
                      target="_blank"
                    >
                      <button id="book1" className="button_reserver">
                        Reserver
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 md:col-span-2">
              <div className="static">
                <h2>Description :</h2>
                <h5 className="text-sm mt-2">
                  Cet atelier est destiné aux débutants ! Quelles sont les
                  premières étapes ? Quelles huiles choisir ? Quelles
                  compositions ? Où acheter ? Nous parlerons de l’expansion du
                  fait-maison, nous répondrons à vos questions !
                </h5>
              </div>
            </div>
          </div>
        </div>
        <div className="w-4/5 mb-10 mt-8 flex-col hidden">
          <div className="grid md:grid-cols-4">
            <div className="mt-6 rounded">
              <div className="h-9/12 grid md:justify-items-center">
                <div className="p-4 inline-block shadow-lg rounded-2xl w-48">
                  <div className="flex justify-center items-center align-middle">
                    <a
                      href={"https://www.instagram.com/eclatdessences/"}
                      target="_blank"
                    >
                      <button id="book4-1" className="button_reserver">
                        Reserver
                      </button>
                    </a>
                  </div>
                </div>
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
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Ile-de-France
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Grand-Est
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Auvergne-Rhône Alpes
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Bourgogne-Franche Comté
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Pays de la Loire
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Bretagne
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Occitanie
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Normandie
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Hauts-de-France
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Nouvelle-Aquitaine
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
              // @ts-ignore
              ref={fieldRef}
            >
              Centre-Val de Loire
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              PACA
            </button>
            <button
              className="button_region text-sm |"
              onClick={() => scrollIntoReview()}
            >
              Corse
            </button>
            <button
              // @ts-ignore
              ref={fieldRefSuggestWorkshop}
              className="button_region text-sm |"
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
            Tu es un.e passioné.e de DIY et tu aimerais proposer des ateliers ?
            <br />
            Ça nous intéresse !
          </h2>
          <a
            href="mailto:hello@greenitcommunity.com"
            className="inline-flex gap-x-4"
          >
            <Button type="green" id="workshop-proposer-atelier">
              Proposer un atelier
            </Button>
          </a>
        </Container>

        <Footer />
      </div>
    </div>
  );
};

export default WorkshopPage;
