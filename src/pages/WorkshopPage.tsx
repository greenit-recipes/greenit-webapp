import { RouteName } from "App";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Footer, Navbar } from "../components";

const WorkshopPage = () => {
  const [isIncoming, setIsIncoming] = useState(false);
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
      <Container
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <h1 className="text-2xl md:text-3xl | text-center">
          Tous les ateliers DIY proches de chez toi !
        </h1>

        <h3 className="mt-2 text-1xl md:text-2xl | pb-10 text-center">
          Fais-toi aider et rencontre d’autres passionnés
        </h3>
      </Container>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
                <img
                  src="https://pic.onlinewebfonts.com/svg/img_280333.png"
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
                  className="w-autoauto h-16 lg:h-18"
                  alt="Greenit Logo"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-xl md:text-2xl text-center">
                  Les Ateliers Greenit
                </h3>
                <h5 className="pl-3 text-base">Adrien et Andrea </h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <Link to={RouteName.contact}>
                <button className="button_contact">
                  <h2 className="text-base md:text-xl">Contacter</h2>
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Nous sommes passionnés de fait-maison depuis de nombreuses
                années Adrien et Andrea vous propose un atelier gratuit pensé
                pour les curieux et nouveaux arrivants dans le monde du
                fait-maison. C’est aussi l’occasion d’échanger sur ce mode de
                consommation et comprendre les raisons et les motivations
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
                src={`https://i0.wp.com/manayin.com/wp-content/uploads/2019/02/recette-savon-maison-diy-fete-des-meres-11.jpg?resize=1440%2C2160&ssl=1`}
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
                  <a href="https://www.eventbrite.fr/e/221952414647">
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
                premières étapes ? Quelles huiles utiliser ? Quelles
                compositions ? Où acheter ? Nous parlerons de l’expansion du
                fait-maison, nous répondrons à vos questions !
              </h5>
            </div>
          </div>
          <div className="mt-8 rounded">
            <div className="h-9/12 static ...">
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">11h - 11h30 (CEST</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="button_reserver">Reserver</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                En continuité du premier atelier, nous vous proposons de
                réaliser une recette de crème pour le corps au beurre de karité.
                Simplissime. C’est l’occasion de faire un premier pas dans le
                monde du DIY gratuitement.
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mt-10 md:mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
                <img
                  src="https://pic.onlinewebfonts.com/svg/img_280333.png"
                  className="h-6 lg:h-9"
                  alt="icon Location"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">
                  Hauts-de-France / Paris
                </h3>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4">
            <div className="flex justify-start ...">
              <div>
                <img
                  src="https://tse3.mm.bing.net/th?id=OIP.mVe87vPyxoj4NAcZD2RvJgDIDI&pid=Api"
                  className="h-16 lg:h-18 rounded-full"
                  alt="Greenit Logo"
                />
              </div>
              <div className="items-center self-center">
                <h3 className="pl-3 text-xl md:text-2xl text-center">
                  Les sens de la nature
                </h3>
                <h5 className="pl-3 text-base">Anne-Cécile Meriau</h5>
              </div>
            </div>
          </div>
          <div className="bg-transparent rounded mt-2">
            <div className="flex items-center align-middle h-full md:justify-end">
              <button className="button_contact">
                <h2 className="text-base md:text-xl">Contacter</h2>
              </button>
            </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                Je m'appelle Anne-Cécile, défenseur du fait-maison et du
                zéro-déchet. <br />
                J’ai à cœur de partager avec vous mon mode de vie au travers
                d’ateliers de création de produits cosmétiques, ménagers, …
                autour de valeurs écologiques.
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
                src={`https://i0.wp.com/manayin.com/wp-content/uploads/2019/02/recette-savon-maison-diy-fete-des-meres-11.jpg?resize=1440%2C2160&ssl=1`}
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
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">10h - 10h40 (CEST)</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="button_reserver">Reserver</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Cet atelier est destiné aux débutants ! Quelles sont les
                premières étapes ? Quelles huiles utiliser ? Quelles
                compositions ? Où acheter ? Nous parlerons de l’expansion du
                fait-maison, nous répondrons à vos questions !
              </h5>
            </div>
          </div>
          <div className="mt-8 rounded">
            <div className="h-9/12 static ...">
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">11h - 11h30 (CEST</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="button_reserver">Reserver</button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                En continuité du premier atelier, nous vous proposons de
                réaliser une recette de crème pour le corps au beurre de karité.
                Simplissime. C’est l’occasion de faire un premier pas dans le
                monde du DIY gratuitement.
              </h5>
            </div>
          </div>
        </div>
      </div>

      <Container
        className="flex flex-col | items-center | mt-6 md:mt-16"
        padding
      >
        <h2 className="mt-10 text-1xl md:text-2xl | text-center">
          Clique sur la region où tu aimerais avoir un atelier :
        </h2>
      </Container>

      <div className="p-5 mb-10 mt-4 flex items-center justify-center">
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Ile-de-France
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Grand-Est
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Auvergne-Rhône Alpes
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Bourgogne-Franche Comté
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Pays de la Loire
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Bretagne
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Occitanie
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Normandie
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Hauts-de-France
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Nouvelle-Aquitaine
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Centre-Val de Loire
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            PACA
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Corse
          </button>
          <button
            className="button_region text-sm | md:text-base"
            onClick={() => setIsIncoming(true)}
          >
            Régions Outre-mer
          </button>
        </div>
      </div>
      {isIncoming && (
        <div className="text-xl">
          Ton avis est pris en compte ! Greenit étend ses ateliers, nous serons
          bientôt dans ta région !
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
            <h2 className="text-xl md:text-2xl">Proposer un atelier</h2>
          </button>
        </a>
      </Container>

      <Footer />
    </div>
  );
};

export default WorkshopPage;
