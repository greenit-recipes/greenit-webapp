import { RouteName } from "App";
import { Button } from "components";
import useIsMobile from "hooks/isMobile";
import { boxGreenit, boxGreenitMobile } from "icons";
import { useHistory } from "react-router-dom";

interface GreenitFullXpHeadbandProps {
  showModal: any;
  isOutOfStock: boolean;
}

export const GreenitFullXpHeadband: React.FC<GreenitFullXpHeadbandProps> = ({
  isOutOfStock,
  showModal,
}) => {
  const isMobile = useIsMobile();
  const history = useHistory();

  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col lg:flex-row px-6 lg:ml-16 bg-white">
        <div className="">
          <p className="text-xl mt-4 text-center lg:text-left">
            Notre box <span className="text-green">Premiers Pas</span> pour se
            lancer <br></br> dans le fait maison !{" "}
          </p>
          {isMobile && (
            <img
              className="h-full w-full lg:w-2/5 | flex place-self-center"
              src={boxGreenitMobile}
              alt="box"
            ></img>
          )}
          <p className="mt-4 text-sm">
            🧼 3 recettes simples et validées par la communauté
          </p>
          <p className="mt-2 text-sm">
            🌱 Juste l’essentiel : pas de gâchis et des contenants en verre
          </p>
          <p className="mt-2 mb-2 text-sm">
            💪 20 substances toxiques épargnées, 190 g de plastique évités et
            32% d’économie
          </p>
        </div>
        {!isMobile && (
          <img
            style={{ width: "40rem" }}
            className="h-full lg:h-60  | flex place-self-center"
            src={boxGreenit}
            alt="box"
          ></img>
        )}
      </div>

      <div className="flex bg-greenL lg:pl-20 h-16 items-center justify-center lg:justify-start">
        <Button
          id="landing_tenez_moi_au_courant"
          type="green"
          onClick={() =>
            isOutOfStock
              ? showModal(true)
              : history.push(RouteName.startDiyGreenitFullXp)
          }
        >
          Je commande
        </Button>

        <p className="p-2 mr-1 text-center pl-10 order-1 lg:order-2 text-sm lg:text-left">
          Offre limitée : 50 box à commander !
        </p>
      </div>
    </div>
  );
};
