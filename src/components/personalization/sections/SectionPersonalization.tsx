import ModalPersonalization from "../ModalPersonalization";
import React from "react";
import { particularities } from "../PersonalizationHelper";

export const SectionPersonalization = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-center md:space-x-24 msm:space-y-3 mx-10 mb-5">
        <div className="md:flex md:flex-col items-center">
          <h4 className="text-xl font-normal mb-2">Mon type de peau</h4>
          <div className="flex">
            <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
              {particularities.skinType}
            </span>
          </div>
        </div>
        <div className="md:flex md:flex-col items-center">
          <h4 className="text-xl font-normal mb-2">Mon type de cheveux</h4>
          <div className="flex">
            <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
              {particularities.hairType}
            </span>
          </div>
        </div>
        <div className="md:flex md:flex-col items-center">
          <h4 className="text-xl font-normal mb-2">Mes particularités</h4>
          <div className="flex flex-wrap space-x-2">
            {particularities.moreDetails.map(item => (
              <span className="text-base font-light text-white py-1 px-2 bg-green rounded-lg">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center md:flex-row">
        <ModalPersonalization
          btn={
            <div className="text-center mb-2">
              <span className="underline font-medium cursor-pointer">
                Modifier mes préférences
              </span>
            </div>
          }
        ></ModalPersonalization>
      </div>
    </div>
  );
};

export default SectionPersonalization;
