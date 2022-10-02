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

  var brandInfo = "cosmaé";
  console.log(producer);

  function setBrandinfo(brandInfo: string | null) {
    if (brandInfo != null) {
      brandInfo = "2";
    } else if (producer === "Azoma-zone") {
      brandInfo = "1";
    } else if (producer === "cosmaé") {
      brandInfo = "2";
    } else if (producer === "mycometik") {
      brandInfo = "3";
    }
    return () => brandInfo;
  }

  useEffect(() => {
    setBrandinfo(brandInfo);
    console.log(brandInfo);
  }, [brandInfo]);

  var up = 1;
  useEffect(() => {
    if (up === 1) {
      brandInfo = "2";
    }
  });

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
