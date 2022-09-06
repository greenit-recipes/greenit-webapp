import React, { useRef, useState } from "react";
import { getStep, questionnaireMenu } from "./PersonalizationHelper";
import StepSkinType from "./steps/StepSkinType";
import StepHairType from "./steps/StepHairType";
import StepMoreDetails from "./steps/StepMoreDetails";

import StepConfirm from "./steps/StepConfirm";

interface PersonalizationProps {
  parentFunction?: any;
  setModalState: any;
  hasParticularities: any;
}

export const Personalization: React.FC<PersonalizationProps> = ({
  parentFunction,
  setModalState,
  hasParticularities = false,
}) => {
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
    <div className="flex flex-col justify-center text-center -mt-8 md:-mt-6 mx-12">
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
              <StepConfirm
                options={options.current}
                hasParticularities={hasParticularities}
                setModalState={setModalState}
                parentFunction={parentFunction}
              />
            );
        }
      })()}

      {/*Stepper*/}
      <div className="flex justify-center items-center space-x-6">
        {getStep(questionnaireMenu, menu) > 0 && (
          <i
            className="bx bx-left-arrow-alt text-4xl cursor-pointer"
            onClick={() => selectStep(getStep(questionnaireMenu, menu) - 1)}
          ></i>
        )}

        {[1, 2, 3, 4].map(el => {
          return (
            <div
              className={`flex items-center justify-center cursor-pointer text-base ${
                menu === questionnaireMenu[el - 1].name
                  ? " w-8 h-8 bg-darkBlue rounded-full text-white"
                  : ""
              }`}
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
