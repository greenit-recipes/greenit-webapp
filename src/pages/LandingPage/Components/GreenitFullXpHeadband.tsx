import { boxGreenit } from "icons";

interface GreenitFullXpHeadbandProps {
  showModal: any;
}

export const GreenitFullXpHeadband: React.FC<GreenitFullXpHeadbandProps> = ({
  showModal,
}) => {
  return (
    <div className="flex flex-col w-full ">
      <div className="flex flex-col lg:flex-row px-6 lg:ml-16 bg-white">
        <div className="">
          <p className="text-2xl text-center lg:text-left text-green">
            Bientôt disponible !
          </p>
          <p className="text-xl mt-4 text-center lg:text-left">
            Notre box <span className="text-green">Premiers Pas</span> pour se
            lancer <br></br> dans le fait maison !{" "}
          </p>
          <p className="mt-4">
            🧼 3 recettes simples et validées par la communauté
          </p>
          <p className="mt-2">
            🌱 Juste l’essentiel : pas de gâchis et des contenants en verre
          </p>
          <p className="mt-2 mb-2">
            💪 12 substances toxiques épargnées, 26 g de plastique évitées et
            30% d’économie
          </p>
        </div>
        <img
          loading="lazy"
          className="h-40 lg:h-72 w-full lg:w-3/6 | flex place-self-center"
          src={boxGreenit}
          alt="box"
        ></img>
      </div>

      <div className="flex bg-greenL pl-10 h-16 items-center">
        <button
          id="landing_tenez_moi_au_courant"
          className="p-1 ml-6 mr-4 w-80 text-white  text-base  lg:text-lg rounded-lg bg-green"
          onClick={() => {
            showModal(true);
          }}
        >
          Tenez-moi au courant !
        </button>
        <p className="p-2 mr-1 text-center lg:text-left">
          Inscris-toi pour être au courant de sa sortie !
        </p>
      </div>
    </div>
  );
};
