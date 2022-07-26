import {
  getSelectedOptions,
  optionIcons,
  questionnaireMenu,
  selectOption,
  Step,
} from "../PersonalizationHelper";
import React, { useState } from "react";

export const StepSkinType: React.FC<Step> = ({ nextStep }) => {
  const [skinOptions, setSkinOptions] = useState(
    questionnaireMenu[0].singleOptions,
  );

  return (
    <div className="flex flex-col items-center">
      <h4>{questionnaireMenu[0].label}</h4>
      <div className="mt-4 mx-10 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {
            //@ts-ignore
            skinOptions.map((op, index) => {
              return (
                <div
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
