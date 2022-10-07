import isMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import { useState } from "react";

interface MenuMultiSelect {
  informationMarket: string;
  indication: string;
  precaution: string;
  producer: string;
}

export const MenuMultiSelect: React.FC<MenuMultiSelect> = ({
  informationMarket,
  indication,
  precaution,
  producer,
}) => {
  //Tabs
  const [isInfoActive, setIsInfoActive] = useState(true);
  const [isIndicationsActive, setIsIndicationsActive] = useState(false);
  const [isCautionActive, setIsCautionActive] = useState(false);
  const [isBrandInfoActive, setIsBrandInfoActive] = useState(false);

  const updateBrandinfo = (brandInfo: string) => {
    switch (brandInfo) {
      case "Joli’Essence":
        return "Marque du Laboratoire Propos’Nature, c’est au cœur de la Provence que Joli’Essence voit le jour en septembre 2013. Cette boutique en ligne, spécialisée dans la cosmétique maison naturelle, a une double vocation : mettre à disposition de tous des ingrédients naturels et bio et éduquer le grand public à leurs bienfaits et leur utilisation. Mission accomplie : aujourd’hui, Joli’essence vous propose + 200 ingrédients naturels et bio, du matériel de formulation de professionnel, ainsi que des kits pour s’initier facilement à la cosmétique maison.";
      case "Cosmaé":
        return "Cosmaé est fabricant français d'ingrédients cosmétiques naturels, bio et durables. La marque vous propose tous les ingrédients et le matériel nécessaires à la fabrication de vos produits cosmétiques maison (crème, savon, shampooing, gel douche,…). Elle offre une multitude de recettes cosmétiques simples et rapides à réaliser soi-même, 100% certifiées pour assurer la sécurité des utilisateurs. Que vous soyez apprenti chimiste ou expert aguerri, la marque offre une multitude d'ingrédients cosmétiques, fabriqués dans son usine en Bretagne, dans une logique de développement durable avec une qualité professionnelle.";
      case "MyCosmetik":
        return "MyCosmetik est une marque dédiée à l'aromathérapie, aux produits naturels (huiles essentielles, végétales, hydrolats...) et aux cosmétiques maison. Ils proposent une gamme de soins qui se concentrent uniquement sur les besoins de la peau avec des ingrédients simples et efficaces. Une cosmétique écologique, qui n’utilise pas d’ingrédients synthétiques ou dérivés de la pétrochimie, sans composants inactifs (les paraffines, les silicones, …) ou toxiques (parabènes, poudres d’aluminium…). MyCosmetik prône l’authenticité des ingrédients naturels qu’elle utilise et la compréhension de leurs actions sur notre corps et notre esprit.";
      default:
        return "Information manquante.";
    }
  };

  return (
    <div className="grid">
      {isMobile() ? (
        <div className="overflow-x-auto w-full">
          <div className="flex w-max pb-1">
            <button
              id="ingredientPage-information"
              className={`flex px-6 bg-white items-center h-14 ${
                isInfoActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
              <h3 id="ingredientPage-information">Informations</h3>
            </button>

            <button
              id="ingredientPage-indications"
              className={`flex px-6 bg-white items-center h-14 ${
                isIndicationsActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
              <h3 id="ingredientPage-indications">Indications</h3>
            </button>

            <button
              id="ingredientPage-precaution"
              className={`flex px-6 bg-white items-center h-14 ${
                isCautionActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
              <h3 id="ingredientPage-precaution">Précautions d’utilisations</h3>
            </button>

            <button
              id="ingredientPage-à-propos-de-la-marque"
              className={`flex px-6 bg-white items-center h-14 ${
                isBrandInfoActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
              <h3 id="ingredientPage-à-propos-de-la-marque">
                À propos de la marque
              </h3>
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex pb-1">
          <button
            id="ingredientPage-information"
            className={`flex px-6 bg-white items-center h-14 ${
              isInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
            <h4 id="ingredientPage-information">Informations</h4>
          </button>

          <button
            id="ingredientPage-indication"
            className={`flex px-6 bg-white items-center h-14 ${
              isIndicationsActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
            <h4 id="ingredientPage-indication">Indications</h4>
          </button>

          <button
            id="ingredientPage-precaution"
            className={`flex px-6 bg-white items-center h-14 ${
              isCautionActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
            <h4 id="ingredientPage-precaution">Précautions d’utilisations</h4>
          </button>

          <button
            id="ingredientPage-à-propos-de-la-marque"
            className={`flex px-6 bg-white items-center h-14 ${
              isBrandInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-20 rounded-md"
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
            <h4 id="ingredientPage-à-propos-de-la-marque">
              À propos de la marque
            </h4>
          </button>
        </div>
      )}
      <div className="w-full mb-5 pt-4">
        {isInfoActive && (
          <div className="w-full px-4 lg:px-0">
            <p>{HTMLReactParser(informationMarket)}</p>
          </div>
        )}
        {isIndicationsActive && (
          <div className="w-full px-4 lg:px-0">
            <p>{HTMLReactParser(indication)}</p>
          </div>
        )}
        {isCautionActive && (
          <div className="w-full px-4 lg:px-0">
            <p>{HTMLReactParser(precaution)}</p>
          </div>
        )}
        {isBrandInfoActive && (
          <div className="w-full px-4 lg:px-0">
            <p>{HTMLReactParser(updateBrandinfo(producer))}</p>
          </div>
        )}
      </div>
    </div>
  );
};
