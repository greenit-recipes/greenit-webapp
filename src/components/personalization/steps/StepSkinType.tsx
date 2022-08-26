import {
  getRandomKey,
  getSelectedOptions,
  optionIcons,
  questionnaireMenu,
  selectOption,
  Step,
} from "../PersonalizationHelper";
import React, { useState } from "react";
import { cloneDeep } from "lodash";

export const StepSkinType: React.FC<Step> = ({ nextStep }) => {
  const [skinOptions, setSkinOptions] = useState(
    cloneDeep(questionnaireMenu[0].singleOptions),
  );

  return (
    <div className="flex flex-col items-center">
      <h4 className="md:text-lg">{questionnaireMenu[0].label}</h4>
      <div className="mt-4 mx-10 mb-6">
        <div className="grid grid-cols-2 gap-4 md:flex md:space-x-1 md:justify-center md:h-40 md:w-[500px]">
          {
            //@ts-ignore
            skinOptions.map((op: any, index) => {
              return (
                <div
                  key={getRandomKey("step-1")}
                  id={op.id}
                  className={`flex flex-col justify-center ${
                    op.isSelected
                      ? "border-green bg-greenL text-green"
                      : "border-darkBlue"
                  } hover:border-green hover:bg-greenL hover:text-green  w-20 h-20  border-2 rounded-md | cursor-pointer`}
                  onClick={() => {
                    setSkinOptions(selectOption(skinOptions, op.option));
                    nextStep(1, { tagsSkin: getSelectedOptions(skinOptions) });
                  }}
                >
                  <i className={`bx bx-${optionIcons[index]} text-xl`}></i>
                  <p>{op.option}</p>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default StepSkinType;
