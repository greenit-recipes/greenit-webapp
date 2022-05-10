import useIsMobile from "hooks/isMobile";
import { boxGreenit, boxGreenitMobile } from "icons";

interface GreenitFullXpHeadbandProps {
  showModal: any;
}

export const GreenitFullXpHeadband: React.FC<GreenitFullXpHeadbandProps> = ({
  showModal,
}) => {
  const isMobile = useIsMobile();

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
            loading="lazy"
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
            💪 20 substances toxiques épargnées, 190 g de plastique évités et 32% d’économie
          </p>
        </div>
        {!isMobile && (
          <img
            loading="lazy"
            className="h-full lg:h-60 w-full lg:w-2/5 | flex place-self-center"
            src={boxGreenit}
            alt="box"
          ></img>
        )}
      </div>

      <div className="flex bg-greenL lg:pl-10 h-16 items-center">
        <button
          id="landing_tenez_moi_au_courant"
          className="p-1 ml-2 mr-4 w-52 text-sm lg:text-base order-2 lg:order-1 text-white rounded-lg bg-green"
          onClick={() => {
            showModal(true);
          }}
        >
          Tenez-moi au courant !
        </button>
        <p className="p-2 mr-1 text-center pl-10 order-1 lg:order-2 text-sm lg:text-left">
        Bientôt disponible !
        </p>
      </div>
    </div>
  );
};
