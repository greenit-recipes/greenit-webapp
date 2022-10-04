import isMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import { useEffect, useState } from "react";

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

  const [brandInfo, setBrandinfo] = useState(producer);

  function updateBrandinfo(brandInfo: string) {
    switch (brandInfo) {
      case "Aroma-zone":
        return "Azoma-zone is well nowjsjsjsjs";
      case "Cosmaé":
        return "cosmaé is well nowjsjsjsjs";
      case "mycometik":
        return "test";
      default:
        return "Nothing found";
    }
  }

  useEffect(() => {
    const updatedBrandInfo = updateBrandinfo(brandInfo);
    if (updatedBrandInfo) {
      setBrandinfo(updatedBrandInfo); // please update the current brandInfo state with the setBrandInfo function
    }
    console.log(brandInfo);
  }, []);

  return (
    <div className="grid">
      {isMobile() ? (
        <div className="overflow-x-auto w-full">
          <div className="flex w-max pb-1">
            <button
              id="ingredientPage-information"
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
              id="ingredientPage-indications"
              className={`flex px-6 bg-white items-center h-14 ${
                isIndicationsActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
              id="ingredientPage-precaution"
              className={`flex px-6 bg-white items-center h-14 ${
                isCautionActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
              id="ingredientPage-à-propos-de-la-marque"
              className={`flex px-6 bg-white items-center h-14 ${
                isBrandInfoActive
                  ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
            id="ingredientPage-information"
            className={`flex px-6 bg-white items-center h-14 ${
              isInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
            id="ingredientPage-indication"
            className={`flex px-6 bg-white items-center h-14 ${
              isIndicationsActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
            id="ingredientPage-precaution"
            className={`flex px-6 bg-white items-center h-14 ${
              isCautionActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
            id="ingredientPage-à-propos-de-la-marque"
            className={`flex px-6 bg-white items-center h-14 ${
              isBrandInfoActive
                ? "border-b-4 border-b-darkBlue shadow-flat bg-white z-30"
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
            <p>{HTMLReactParser(brandInfo)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
