import { useState } from "react";
import "./FAQMarket.css";

interface FAQMarket {
  className?: string;
}

export const FAQMarket: React.FC<FAQMarket> = ({ className }) => {
  const [isQuestion1Active, setIsQuestion1Active] = useState(false);
  const [isQuestion2Active, setIsQuestion2Active] = useState(false);
  const [isQuestion3Active, setIsQuestion3Active] = useState(false);
  const [isQuestion4Active, setIsQuestion4Active] = useState(false);
  const [isQuestion5Active, setIsQuestion5Active] = useState(false);

  return (
    <div className="flex flex-col w-full">
      <button
        id="FAQ-question1"
        className="grid grid-cols-6 w-full bg-white h-11 rounded-md px-3"
        onClick={() => {
          setIsQuestion1Active(!isQuestion1Active);
        }}
      >
        <h4
          id="FAQ-question1"
          className="col-span-5 text-start self-center font-regular"
        >
          Qui contacter en cas de questions ?
        </h4>
        {isQuestion1Active ? (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion1Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            En cas de questions ou problème avec votre commande ou votre
            livraison, n’hésitez pas à nous contacter par e-mail :
            hello@greenitcommunity.com. Nous nous engageons à répondre dans les
            48 heures. Vous pouvez également nous contacter via nos réseaux
            sociaux : Instagram ou Facebook.
          </p>
        </div>
      </div>
      <button
        id="FAQ-question2"
        className="grid grid-cols-6 w-full bg-white h-11 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion2Active(!isQuestion2Active);
        }}
      >
        <h4
          id="FAQ-question2"
          className="col-span-5 text-start self-center font-regular"
        >
          Comment fonctionne la livraison ?
        </h4>
        {isQuestion2Active ? (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion2Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Une fois, la commande validée, le délai de préparation est de 24h à
            48h. (72h selon les périodes de fortes influences). Les commandes
            passées avant 10h30 sont expédiées le jour même. La livraison est de
            5 à 7 jours ouvrés selon le prestataire de livraison choisi. Nous ne
            livrons pour le moment qu’en France métropolitaine.
          </p>
        </div>
      </div>
      <button
        id="FAQ-question3"
        className="grid grid-cols-6 w-full bg-white h-11 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion3Active(!isQuestion3Active);
        }}
      >
        <h4
          id="FAQ-question3"
          className="col-span-5 text-start self-center font-regular"
        >
          Comment utiliser mon code de réduction ?
        </h4>
        {isQuestion3Active ? (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion3Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Au moment de valider votre panier, ouvrez le champ « ajout d’un code
            promotionnel ». Entrez votre code et validez. Le nouveau montant
            doit apparaître.
          </p>
        </div>
      </div>

      <button
        id="FAQ-question4"
        className="grid grid-cols-6 w-full bg-white h-11 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion4Active(!isQuestion4Active);
        }}
      >
        <h4
          id="FAQ-question4"
          className="col-span-5 text-start self-center font-regular"
        >
          Je souhaite retourner des produits, comment faire ?
        </h4>
        {isQuestion4Active ? (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion4Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Les retours des produits sont possibles s’ils n’ont pas été utilisés
            : ils doivent être fermés, encore dans leurs emballages d’origine,
            et non utilisés sous les 10 jours ouvrés suivant la date de
            livraison. Les frais de retours sont à la charge du client. Une fois
            le colis réceptionné et validé par nos équipes, nous lancerons la
            procédure de remboursement.
          </p>
        </div>
      </div>
      <button
        id="FAQ-question5"
        className="grid grid-cols-6 w-full bg-white h-11 rounded-md px-3 mt-4"
        onClick={() => {
          setIsQuestion5Active(!isQuestion5Active);
        }}
      >
        <h4
          id="FAQ-question5"
          className="col-span-5 text-start self-center font-regular"
        >
          J’ai reçu un colis endommagé ou avec des produits manquants, que faire
          ?{" "}
        </h4>
        {isQuestion5Active ? (
          <i className="bx bx-chevron-up self-center text-3xl text-end"></i>
        ) : (
          <i className="bx bx-chevron-down self-center text-3xl text-end"></i>
        )}
      </button>
      <div
        className={isQuestion5Active ? "container_fadeIn" : "container_fadeOut"}
      >
        <div className="flex w-full -mt-3 p-4">
          <p>
            Il est possible que lors de la livraison de votre colis, un incident
            se produise et qu’un (ou plusieurs produits) soit endommagé. Si le
            colis est visiblement endommagé, vous pouvez refuser le colis à la
            livraison pour cause de « colis détérioré ». Une réclamation auprès
            du transporteur sera alors possible. Autrement, envoyez-nous au plus
            vite une photo de votre produit ainsi que du produit endommagé par
            e-mail (hello@greenitcommunity.com). Nous procéderons ainsi à un
            renvoi ou au remboursement du produit dans les plus brefs délai.
          </p>
        </div>
      </div>
    </div>
  );
};
