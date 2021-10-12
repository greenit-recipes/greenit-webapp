import React from "react";
import {
  RecipeCard,
  Navbar,
  Grid,
  Container,
  NewContainer,
  Loading,
  Button,
  Footer,
} from "../components";
import useIsMobile from "../hooks/isMobile";
import ReactPlayer from "react-player";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


const WorkshopPage = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col | items-center self-center">
      <Navbar />
      <NewContainer
        className="flex flex-col | items-center | mt-16 lg:mt-28"
        padding
      >
        <h1 className="text-2xl md:text-3xl | text-center">
          Tous les ateliers DIY proches de chez toi !
        </h1>
      
        <h2 className="mt-2 text-1xl md:text-2xl | pb-10 text-center">
          Fais-toi aider et rencontre d’autres passionnés
        </h2>

      </NewContainer>

      <div className="w-4/5 mt-10 flex flex-col">
        <div className="grid md:grid-cols-2">
          <div className="bg-transparent border-b-4 border-gray-600 | md:col-span-2">
            <div className="flex justify-start | md:mb-2">
              <div>
              <img src="https://pic.onlinewebfonts.com/svg/img_280333.png" className="w-full h-6 lg:h-9" alt="icon Location"/>
              </div>
              <div className="items-center self-center">                
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">En ligne</h3>
              </div> 
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4"> 
            <div className="flex justify-start ...">
                <div>
                  <img src="/static/media/logo.61b805cb.png" className="w-full h-16 lg:h-18" alt="Greenit Logo"/>
                </div>
                <div className="items-center self-center">
                  <h3 className="pl-3 text-xl md:text-2xl text-center">Les Ateliers Greenit</h3>
                  <h5 className="pl-3 text-base">Adrien et Andrea </h5>
                </div>
              </div>
          </div>
          <div className="bg-transparent rounded mt-2">
              <div className="flex items-center align-middle h-full md:justify-end">
                <button className="bg-green-500 text-white py-1 px-4 border-2 border-green-500 shadow-lg rounded | hover:bg-transparent hover:text-green-500 hover:border-green-500 md:mt-4 md:py-1.5">
                  <h2 className="text-base md:text-xl">Contacter</h2>
                </button>  
              </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
                  Nous sommes passionnés de fait-maison depuis de nombreuses années Adrien et Andrea vous 
                  propose un atelier gratuit pensé pour les curieux et nouveaux arrivants dans le monde du fait-maison. 
                  C’est aussi l’occasion d’échanger sur ce mode de consommation et comprendre les raisons et les motivations associées !
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 mt-5 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="bg-white rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                  src={`https://i0.wp.com/manayin.com/wp-content/uploads/2019/02/recette-savon-maison-diy-fete-des-meres-11.jpg?resize=1440%2C2160&ssl=1`}
                  className="rounded-2xl"
                  style={{width:"100%", maxWidth:"200px"}}
              />
            </div>
          </div>
          <div className="bg-white mt-6 rounded">
            <div className="h-9/12 static ...">
              <div className="static ..."><h2>Prochain ateliers :</h2></div>
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">10h - 10h40 (CEST)</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="bg-blue-300 mt-4 text-white py-1 px-4 border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 rounded">
                    Reserver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Cet atelier est destiné aux débutants ! Quelles sont les premières étapes ? Quelles huiles utiliser ? Quelles compositions ? Où acheter ? 
                Nous parlerons de l’expansion du fait-maison, nous répondrons à vos questions ! 
              </h5>
            </div>
          </div>
          <div className="bg-white mt-8 rounded">
            <div className="h-9/12 static ...">
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">11h - 11h30 (CEST</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="bg-blue-300 mt-4 text-white py-1 px-4 border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 rounded">
                    Reserver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                En continuité du premier atelier, nous vous proposons de réaliser une recette de crème pour le corps au beurre de karité. Simplissime. 
                C’est l’occasion de faire un premier pas dans le monde du DIY gratuitement.
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
              <img src="https://pic.onlinewebfonts.com/svg/img_280333.png" className="w-full h-6 lg:h-9" alt="icon Location"/>
              </div>
              <div className="items-center self-center">                
                <h3 className="pl-3 pb-1 text-xl lg:text-2xl text-center">Hauts-de-France / Paris</h3>
              </div> 
            </div>
          </div>
          <div className="bg-transparent rounded-lg mt-5 p-2 shadow-lg md:p-4"> 
            <div className="flex justify-start ...">
                <div>
                  <img src="https://tse3.mm.bing.net/th?id=OIP.mVe87vPyxoj4NAcZD2RvJgDIDI&pid=Api" className="w-full h-16 lg:h-18 rounded-full" alt="Greenit Logo"/>
                </div>
                <div className="items-center self-center">
                  <h3 className="pl-3 text-xl md:text-2xl text-center">Les sens de la nature</h3>
                  <h5 className="pl-3 text-base">Anne-Cécile Meriau</h5>
                </div>
              </div>
          </div>
          <div className="bg-transparent rounded mt-2">
              <div className="flex items-center align-middle h-full md:justify-end">
                <button className="bg-green-500 text-white py-1 px-4 border-2 border-green-500 shadow-lg rounded | hover:bg-transparent hover:text-green-500 hover:border-green-500 md:mt-4 md:py-1.5">
                  <h2 className="text-base md:text-xl">Contacter</h2>
                </button>  
              </div>
          </div>
          <div className="bg-transparent mt-4 rounded md:col-span-2">
            <div>
              <h3 className="text-ms md:text-base">
              Je m'appelle Anne-Cécile, défenseur du fait-maison et du zéro-déchet. <br/>
              J’ai à cœur de partager avec vous mon mode de vie au travers d’ateliers de création de produits cosmétiques, 
              ménagers, … autour de valeurs écologiques.
              </h3>
            </div>
          </div>
        </div>
      </div>

      <div className="w-4/5 mb-10 mt-5 flex flex-col">
        <div className="grid md:grid-cols-4">
          <div className="bg-white rounded md:row-span-2">
            <div className="flex justify-center items-center align-middle h-full">
              <img
                  src={`https://i0.wp.com/manayin.com/wp-content/uploads/2019/02/recette-savon-maison-diy-fete-des-meres-11.jpg?resize=1440%2C2160&ssl=1`}
                  className="rounded-2xl"
                  style={{width:"100%", maxWidth:"200px"}}
              />
            </div>
          </div>
          <div className="bg-white mt-6 rounded">
            <div className="h-9/12 static ...">
              <div className="static ..."><h2>Prochain ateliers :</h2></div>
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">10h - 10h40 (CEST)</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="bg-blue-300 mt-4 text-white py-1 px-4 border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 rounded">
                    Reserver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                Cet atelier est destiné aux débutants ! Quelles sont les premières étapes ? Quelles huiles utiliser ? Quelles compositions ? Où acheter ? 
                Nous parlerons de l’expansion du fait-maison, nous répondrons à vos questions ! 
              </h5>
            </div>
          </div>
          <div className="bg-white mt-8 rounded">
            <div className="h-9/12 static ...">
              <div className="p-4 inline-block shadow-lg rounded-2xl">
                <h5 className="text-base">Samedi 16 octobre</h5>
                <h5 className="text-sm">11h - 11h30 (CEST</h5>
                <h5 className="text-sm">Gratuit 0€</h5>
                <div className="flex justify-center items-center align-middle">
                  <button className="bg-blue-300 mt-4 text-white py-1 px-4 border-2 border-blue-300 hover:bg-transparent hover:text-blue-300 hover:border-blue-300 rounded">
                    Reserver
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 md:col-span-2">
            <div className="static ...">
              <h2>Description :</h2>
              <h5 className="text-sm mt-2 md:text-base">
                En continuité du premier atelier, nous vous proposons de réaliser une recette de crème pour le corps au beurre de karité. Simplissime. 
                C’est l’occasion de faire un premier pas dans le monde du DIY gratuitement.
              </h5>
            </div>
          </div>
        </div>
      </div>
    
      <NewContainer
        className="flex flex-col | items-center | mt-6 md:mt-16"
        padding
      >
        <h2 className="mt-10 text-1xl md:text-2xl | text-center">
        Clique sur la region où tu aimerais avoir un atelier :      
        </h2>
      </NewContainer>

      <div className="p-5 mb-10 mt-4 flex items-center justify-center">
        <div className=" grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Ile-de-France
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Grand-Est
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Auvergne-Rhône Alpes
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Bourgogne-Franche Comté
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Pays de la Loire
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Bretagne
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Occitanie
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Normandie
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Hauts-de-France
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Nouvelle-Aquitaine
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Centre-Val de Loire
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          PACA
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Corse
          </button>
          <button className="text-sm bg-white text-black py-4 px-4 border-2 border-white shadow-xl rounded-lg hover:bg-gray-500 hover:border-gray-500 hover:text-white md:text-base">
          Régions Outre-mer
          </button>
        </div>
      </div>
      
      <NewContainer
        className="flex flex-col | items-center | mt-6 mb-40 md:mt-10 md:mb-50"
        padding
      >
        <h2 className=" p-2 text-xl md:text-2xl | text-center">
          Tu es un.e passioné.e de DIY et tu aimerais proposer des ateliers ? <br/>
          Ça nous intéresse !  
        </h2> 
        
        <button className="bg-green-400 mt-10 text-white p-3 px-4 border-2 border-green-400 rounded-lg hover:bg-transparent hover:text-green-400 hover:border-green-400 ">
          <h2 className="text-base md:text-xl">Proposer un atelier</h2>
        </button>
      
      </NewContainer>

      <Footer />
    </div>
  );
};

export default WorkshopPage;
