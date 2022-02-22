import { Button } from "../../../../components";
import HTMLReactParser from "html-react-parser";
import { useState } from "react";
import "./FirstStep.css";

interface IFirstStep {
  item: {
    imgProfil: string;
    altImgProfil: string;
    userPresentationTitle: string;
    userPresentationTitleSubtitle: string;
    citation: string;
    shortDescription: string;
    longDescription: string;
  };
}

export const FirstStep: React.FC<IFirstStep> = ({ item }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <div className="flex flex-cols w-full mt-8 mb-2">
        <div className="border-r-2 border-blue">
          <img
            src={item.imgProfil}
            className="w-14 h-14 lg:w-18 mr-8"
            alt={item.altImgProfil}
          />
        </div>
        <div className="ml-4">
          <h2 className="text-base lg:text-xl font-medium">
            {item.userPresentationTitle}
          </h2>
          <h3 className="text-xs lg:text-xl font-light">
            {item.userPresentationTitleSubtitle}
          </h3>
        </div>
      </div>
      <h3 className="text-base text-blue lg:text-xl font-semibold mb-2">
        "{item.citation}"
      </h3>
      <h3 className="text-sm lg:text-xl font-light">{item.shortDescription}</h3>
      <div className={isActive ? "container_fadeIn" : "container_fadeOut"}>
        {" "}
        <h3>{HTMLReactParser(item.longDescription)}</h3>
      </div>
      <Button
        type="grey"
        onClick={() => setIsActive(!isActive)}
        className={"w-24 self-center mt-2 mb-6"}
      >
        {isActive ? <p>Moins</p> : <p>Lire plus</p>}
      </Button>
    </>
  );
};
