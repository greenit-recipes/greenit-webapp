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
            loading="lazy"
          />
        </div>
        <div className="ml-4">
          <h2 className=" lg:text-xl font-medium">
            {item.userPresentationTitle}
          </h2>
          <h4 className="text-xs lg:text-lg font-light">
            {item.userPresentationTitleSubtitle}
          </h4>
        </div>
      </div>
      <h3 className=" text-blue lg:text-xl font-semibold mb-2">
        "{item.citation}"
      </h3>
      <h3 className="text-sm lg:text-lg font-light">
        {HTMLReactParser(item.shortDescription)}
      </h3>
      <div className={isActive ? "container_fadeIn" : "container_fadeOut"}>
        {" "}
        <h3 className="text-sm lg:text-lg font-light">
          {HTMLReactParser(item.longDescription)}
        </h3>
      </div>
      <Button
        id="read_more"
        type="darkBlue"
        onClick={() => setIsActive(!isActive)}
        className={"w-24 self-center mt-2 mb-6"}
      >
        {isActive ? <p>Moins</p> : <p id="read_more">Lire plus</p>}
      </Button>
    </>
  );
};
