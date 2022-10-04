import HTMLReactParser from "html-react-parser";
import { useState } from "react";
import "../FAQMarket/FAQMarket.css";

interface FAQMarket {
  className?: string;
}

export const FAQMarket: React.FC<FAQMarket> = ({ className }) => {
  const [isQuestion1Active, setIsQuestion1Active] = useState(false);
  const [isQuestion2Active, setIsQuestion2Active] = useState(false);
  const [isQuestion3Active, setIsQuestion3Active] = useState(false);
  const [isQuestion4Active, setIsQuestion4Active] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <button
        id="FAQ-question1"
        className="grid grid-cols-6 w-full bg-white h-10 rounded-md px-3"
        onClick={() => {
          setIsQuestion1Active(!isQuestion1Active);
        }}
      >
        <h4 className="col-span-5 text-start self-center font-regular">
          Pourquoi le coffret Premiers Pas ?
        </h4>
        {isQuestion1Active ? (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion1Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Se lancer dans le DIY peut paraître un peu compliqué aux premiers
            abords, nous avons alors lancé le coffret premiers pas avec 3
            recettes spécialement conçues pour les débutants. Le coffret
            Premiers Pas a été impulsé par la communauté Greenit ! Nous avons
            ensemble choisis des recettes du coffret en fonction du niveau de
            difficulté.
          </p>
        </div>
      </div>
      <button
        id="FAQ-question2"
        className="grid grid-cols-6 w-full bg-white h-10 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion2Active(!isQuestion2Active);
        }}
      >
        <h4 className="col-span-5 text-start self-center font-regular">
          Comment j’accède aux recettes du coffret ?
        </h4>
        {isQuestion2Active ? (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion2Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Dans le coffret, vous trouverez tous les ingrédients ainsi qu’un
            document informatif qui vous donne accès aux recettes du coffret.
            Vous serez ensuite redirigé vers le site de Greenit : avec les
            recettes du coffret en vidéo, une vidéo d’accompagnement pour se
            lancer dans le DIY.
          </p>
        </div>
      </div>
      <button
        id="FAQ-question3"
        className="grid grid-cols-6 w-full bg-white h-10 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion3Active(!isQuestion3Active);
        }}
      >
        <h4 className="col-span-5 text-start self-center font-regular">
          Qui contacter en cas de questions ?
        </h4>
        {isQuestion3Active ? (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion3Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            En cas de questions ou problèmes avec le coffret, n’hésitez pas à
            nous contacter par email : hello@greenitcommunity.com. Nous nous
            engageons à répondre dans les 24 heures. En cas de questions lors de
            la réalisation du coffret, adressez-nous vos questions au bouton SOS
            dans votre espace d’accompagnement.
          </p>
        </div>
      </div>

      <button
        id="FAQ-question4"
        className="grid grid-cols-6 w-full bg-white h-10 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion4Active(!isQuestion4Active);
        }}
      >
        <h4 className="col-span-5 text-start self-center font-regular">
          Comment fonctionne la livraison ?
        </h4>
        {isQuestion4Active ? (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion4Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            En cas de questions ou problèmes avec le coffret, n’hésitez pas à
            nous contacter par email : hello@greenitcommunity.com. Nous nous
            engageons à répondre dans les 24 heures. En cas de questions lors de
            la réalisation du coffret, adressez-nous vos questions au bouton SOS
            dans votre espace d’accompagnement.
          </p>
        </div>
      </div>
    </div>
  );
};
