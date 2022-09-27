import isMobile from "hooks/isMobile";
import { useState } from "react";

interface MenuMultiSelect {
  title?: string;
}

export const MenuMultiSelect: React.FC<MenuMultiSelect> = ({ title }) => {
  //Tabs
  const [isInfoActive, setIsInfoActive] = useState(true);
  const [isIndicationsActive, setIsIndicationsActive] = useState(false);
  const [isCautionActive, setIsCautionActive] = useState(false);
  const [isBrandInfoActive, setIsBrandInfoActive] = useState(false);
  return (
    <div className="grid">
      {isMobile() ? (
        <div className="overflow-x-auto w-full">
          <div className="flex w-max pb-1">
            <button
              className={`flex px-6 bg-white items-center h-14 ${
                isInfoActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20"
                  : "border-b-4 border-b-greyL"
              }`}
              onClick={() => {
                !isInfoActive && setIsInfoActive(!isInfoActive);
                isIndicationsActive &&
                  setIsIndicationsActive(!isIndicationsActive);
                isCautionActive && setIsCautionActive(!isCautionActive);
                isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
              }}
            >
              <h3>Informations</h3>
            </button>

            <button
              className={`flex px-6 bg-white items-center h-14 ${
                isIndicationsActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                  : "border-b-4 border-b-greyL"
              }`}
              onClick={() => {
                !isIndicationsActive &&
                  setIsIndicationsActive(!isIndicationsActive);
                isInfoActive && setIsInfoActive(!isInfoActive);
                isCautionActive && setIsCautionActive(!isCautionActive);
                isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
              }}
            >
              <h3>Indications</h3>
            </button>

            <button
              className={`flex px-6 bg-white items-center h-14 ${
                isCautionActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                  : "border-b-4 border-b-greyL"
              }`}
              onClick={() => {
                !isCautionActive && setIsCautionActive(!isCautionActive);
                isIndicationsActive &&
                  setIsIndicationsActive(!isIndicationsActive);
                isInfoActive && setIsInfoActive(!isInfoActive);
                isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
              }}
            >
              <h3>Précautions d’utilisations</h3>
            </button>

            <button
              className={`flex px-6 bg-white items-center h-14 ${
                isBrandInfoActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                  : "border-b-4 border-b-greyL"
              }`}
              onClick={() => {
                !isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
                isIndicationsActive &&
                  setIsIndicationsActive(!isIndicationsActive);
                isCautionActive && setIsCautionActive(!isCautionActive);
                isInfoActive && setIsInfoActive(!isInfoActive);
              }}
            >
              <h3>À propos de la marque</h3>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex pb-1">
          <button
            className={`flex px-6 bg-white items-center h-14 ${
              isInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                : "border-b-4 border-b-greyL"
            }`}
            onClick={() => {
              !isInfoActive && setIsInfoActive(!isInfoActive);
              isIndicationsActive &&
                setIsIndicationsActive(!isIndicationsActive);
              isCautionActive && setIsCautionActive(!isCautionActive);
              isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
            }}
          >
            <h4>Informations</h4>
          </button>

          <button
            className={`flex px-6 bg-white items-center h-14 ${
              isIndicationsActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                : "border-b-4 border-b-greyL"
            }`}
            onClick={() => {
              !isIndicationsActive &&
                setIsIndicationsActive(!isIndicationsActive);
              isInfoActive && setIsInfoActive(!isInfoActive);
              isCautionActive && setIsCautionActive(!isCautionActive);
              isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
            }}
          >
            <h4>Indications</h4>
          </button>

          <button
            className={`flex px-6 bg-white items-center h-14 ${
              isCautionActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                : "border-b-4 border-b-greyL"
            }`}
            onClick={() => {
              !isCautionActive && setIsCautionActive(!isCautionActive);
              isIndicationsActive &&
                setIsIndicationsActive(!isIndicationsActive);
              isInfoActive && setIsInfoActive(!isInfoActive);
              isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
            }}
          >
            <h4>Précautions d’utilisations</h4>
          </button>

          <button
            className={`flex px-6 bg-white items-center h-14 ${
              isBrandInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-50"
                : "border-b-4 border-b-greyL"
            }`}
            onClick={() => {
              !isBrandInfoActive && setIsBrandInfoActive(!isBrandInfoActive);
              isIndicationsActive &&
                setIsIndicationsActive(!isIndicationsActive);
              isCautionActive && setIsCautionActive(!isCautionActive);
              isInfoActive && setIsInfoActive(!isInfoActive);
            }}
          >
            <h4>À propos de la marque</h4>
          </button>
        </div>
      )}
      <div className="w-full mb-5 pt-4">
        {isInfoActive && (
          <div className="w-full px-4 lg:px-0">
            <p>
              L’huile végétale d’Avocat est un excellent adoucissant : elle
              redonne de l’élasticité à la peau et lutte contre les rides. Elle
              est très nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire. L’huile
              végétale d’Avocat est un excellent adoucissant : elle redonne de
              l’élasticité à la peau et lutte contre les rides. Elle est très
              nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire.
            </p>
          </div>
        )}
        {isIndicationsActive && (
          <div className="w-full px-4 lg:px-0 text-red">
            <p>
              L’huile végétale d’Avocat est un excellent adoucissant : elle
              redonne de l’élasticité à la peau et lutte contre les rides. Elle
              est très nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire. L’huile
              végétale d’Avocat est un excellent adoucissant : elle redonne de
              l’élasticité à la peau et lutte contre les rides. Elle est très
              nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire.
            </p>
          </div>
        )}
        {isCautionActive && (
          <div className="w-full px-4 lg:px-0 text-yellow">
            <p>
              L’huile végétale d’Avocat est un excellent adoucissant : elle
              redonne de l’élasticité à la peau et lutte contre les rides. Elle
              est très nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire. L’huile
              végétale d’Avocat est un excellent adoucissant : elle redonne de
              l’élasticité à la peau et lutte contre les rides. Elle est très
              nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire.
            </p>
          </div>
        )}
        {isBrandInfoActive && (
          <div className="w-full px-4 lg:px-0 text-green">
            <p>
              L’huile végétale d’Avocat est un excellent adoucissant : elle
              redonne de l’élasticité à la peau et lutte contre les rides. Elle
              est très nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire. L’huile
              végétale d’Avocat est un excellent adoucissant : elle redonne de
              l’élasticité à la peau et lutte contre les rides. Elle est très
              nourrissante (comme la majorité des huiles) et elle agit
              particulièrement sur les peaux abîmées (les cicatrices d’acné par
              exemple). C’est un véritable cocktail de vitamine E qui limite le
              vieillissement cutané. Elle agit de la même façon sur les cheveux
              avec un petit plus : elle stimule la pousse capillaire.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
