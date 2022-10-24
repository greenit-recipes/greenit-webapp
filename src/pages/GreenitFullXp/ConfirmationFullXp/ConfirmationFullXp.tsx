import { useMutation } from "@apollo/client";
import { RouteName } from "App";
import useIsMobile from "hooks/isMobile";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  HAS_PURCHASED_BEGINNER_BOX,
  persistBoxPurchaseOnConfirmation,
} from "services/boxfullxp.service";
import { boxFullXpIngredients } from "utils";
import { NumberedCircle } from "components/misc/NumberedCircle";
import Auth from "services/auth.service";
import { boxConfirmation, arrowFullXp, arrowFullXpMobile } from "icons";
import { Button } from "components";

const ModalLogGreenit = React.lazy(
  () => import("components/layout/ModalLogGreenit/ModalLogGreenit"),
);

const ConfirmationFullXp: React.FC = () => {
  const isMobile = useIsMobile();
  const isLoggedIn = Auth.isLoggedIn();

  const [hasPurchasedBeginnerBox] = useMutation(HAS_PURCHASED_BEGINNER_BOX, {
    errorPolicy: "all",
  });

  useEffect(() => {
    persistBoxPurchaseOnConfirmation(isLoggedIn, hasPurchasedBeginnerBox);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-start justify-around">
      <div className="flex flex-col mlg:self-center mlg:text-center mx-9 mt-2 md:mt-16 lg:ml-32">
        <div>
          <h2>Confirmation de commande</h2>
          <p className="text-sm mt-2">
            Tu recevras un email de confirmation de ta commande dans les
            prochaines minutes. <br />
            Regarde également tes spams.
          </p>
        </div>

        {isLoggedIn ? (
          <>
            <h4 className="my-6 md:w-2/3 leading-5">
              Une fois que tu as reçu ta box, rendez-vous sur ton profil pour
              avoir accès aux recettes et aux vidéos d’accompagnement !
            </h4>
            <Link to={RouteName.profil}>
              <Button
                type="blue"
                id="commande-box-confirmation-mon-espace-diy"
                className="h-10 mb-10 w-full md:w-40"
              >
                Mon espace DIY
              </Button>
            </Link>
          </>
        ) : (
          <div className="flex flex-col mt-6">
            <h4 className="text-blue mb-4">
              Crée-toi un compte pour avoir accès aux recettes
              {!isMobile ? <br /> : <span className="mx-0.5"></span>}
              et aux vidéos d’accompagnement !
            </h4>
            <div className="relative">
              <ModalLogGreenit
                btn={
                  <>
                    <Button
                      type="darkBlue"
                      id="commande-box-confirmation-creer-un-compte"
                      className="h-10 lg:w-60"
                    >
                      Créer un compte
                    </Button>
                  </>
                }
              ></ModalLogGreenit>
              {isMobile && (
                <img
                  src={arrowFullXpMobile}
                  alt="flèche mobile"
                  className="absolute right-0 top-12"
                />
              )}
            </div>
            {/* Image placeholder */}
            <div className="relative self-center md:self-start rounded-lg bg-blueL my-8">
              {!isMobile && (
                <img
                  src={arrowFullXp}
                  alt="flèche"
                  className="absolute -top-4 -right-6 arrow-desktop"
                />
              )}
              <img
                src={boxConfirmation}
                alt="Confirmation Box Full Xp"
                className="object-cover w-52 h-36 rounded-lg"
              />
              <i className="bx bx-play-circle text-white text-5xl absolute right-20 top-12 z-20"></i>
            </div>
          </div>
        )}

        {!isMobile && (
          <>
            <h4 className="mb-40">
              Une question ? Écris nous à
              <a
                href="mailto:hello@greenitcommunity.com"
                className="inline-block ml-1 hover:text-green"
              >
                hello@greenitcommunity.com
              </a>
            </h4>
          </>
        )}
      </div>
      <div className="flex mlg:items-center justify-center flex-col w-full md:mt-12 lg:w-4/12 bg-blueL lg:rounded-md lg:mr-24 py-6">
        <h2 className="text-lg md:text-xl mb-3 px-10">Bientôt chez toi 😉</h2>

        <div
          className={`flex flex-wrap justify-center mt-4 md:space-x-8 lg:space-x-4 lg:px-8`}
        >
          {boxFullXpIngredients.map(item => (
            <NumberedCircle
              quantity={item.quantity}
              name={item.title}
              icon={item.icon}
              key={item.id}
            />
          ))}
        </div>
      </div>
      {/*Todo : Find a better alternative*/}
      {isMobile && (
        <h4 className="mt-12 mb-20 text-center w-10/12 self-center">
          Une question ? Écris nous à
          <a
            href="mailto:hello@greenitcommunity.com"
            className="inline-block ml-1 hover:text-green"
          >
            hello@greenitcommunity.com
          </a>
        </h4>
      )}
    </div>
  );
};

export default ConfirmationFullXp;
