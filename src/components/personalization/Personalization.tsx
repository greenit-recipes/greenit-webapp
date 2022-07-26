import React, { useRef, useState } from "react";
import { questionnaireMenu } from "./PersonalizationHelper";
import StepSkinType from "./steps/StepSkinType";
import StepHairType from "./steps/StepHairType";
import StepMoreDetails from "./steps/StepMoreDetails";

export const Personalization = () => {
  const [menu, setMenu] = useState(questionnaireMenu[0].name);
  let options: any = useRef([]);

  const selectStep = (step: number, data?: any) => {
    setTimeout(() => {
      setMenu(questionnaireMenu[step].name);
    }, 500);

    //reset previous steps when the user naviguates backwards
    if (options.current.length >= step + 1) {
      options.current.splice(step, 1);
      return;
    }
    if (data) {
      options.current.push(data);
    }
  };

  return (
    <div className="flex flex-col justify-center text-center -mt-8 mx-12">
      <div className="flex justify-center space-x-2 mb-3">
        <i className="bx bx-category-alt text-2xl"></i>
        <h3>Définir mes particularités</h3>
      </div>
      {(() => {
        switch (menu) {
          case questionnaireMenu[0].name:
            return <StepSkinType nextStep={selectStep} />;
          case questionnaireMenu[1].name:
            return <StepHairType nextStep={selectStep} />;
          case questionnaireMenu[2].name:
            return <StepMoreDetails nextStep={selectStep} />;
          case questionnaireMenu[3].name:
            return (
              <div className="flex flex-col items-center">
                <h4 className="text-base">
                  Des recettes pour la maison, ça te dit ?
                </h4>
                <p className="font-diy text-xl">
                  lessive, liquide vaiselle, nettoyant . . .
                </p>
                <div className="mt-4 mx-10 mb-6 | space-y-4">
                  <div className="flex flex-col justify-center | mt-2 space-y-3">
                    <div
                      className="w-56 py-3 hover:border-green hover:bg-greenL hover:text-green border-darkBlue border-2 rounded-md shadow-md"
                      onClick={() => {
                        console.log(options.current);
                      }}
                    >
                      Pourquoi pas !
                    </div>
                    <div className="w-56 py-3 hover:border-green hover:bg-greenL hover:text-green border-darkBlue border-2 rounded-md shadow-md">
                      Non, pas pour le moment
                    </div>
                  </div>
                </div>
              </div>
            );
        }
      })()}

      {/*Stepper*/}
      <div className="flex justify-center space-x-6">
        {[1, 2, 3, 4].map(el => {
          return (
            <div
              className={`flex items-center justify-center cursor-pointer text-base ${
                menu === questionnaireMenu[el - 1].name
                  ? " w-8 h-8 bg-darkBlue rounded-full text-white"
                  : ""
              }`}
              onClick={() => selectStep(el - 1)}
            >
              {el.toString()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Personalization;
