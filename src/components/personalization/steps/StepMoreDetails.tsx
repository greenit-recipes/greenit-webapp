import {
  getSelectedOptions,
  questionnaireMenu,
  selectOption,
  Step,
} from "../PersonalizationHelper";
import React, { useEffect, useState } from "react";
import { Button } from "../../misc";

export const StepMoreDetailsType: React.FC<Step> = ({ nextStep }) => {
  const [faceOptions, setFaceOptions] = useState(
    // @ts-ignore
    questionnaireMenu[2].multipleOPtions[0].singleOptions,
  );

  const [hairOptions, setHairOptions] = useState(
    // @ts-ignore
    questionnaireMenu[2].multipleOPtions[1].singleOptions,
  );

  const [isSkipActive, setIsSkipActive] = useState(true);

  const isEmptySelection = () => {
    return !(
      faceOptions.some(op => op.isSelected) ||
      hairOptions.some(op => op.isSelected)
    );
  };

  useEffect(() => {
    !isEmptySelection() ? setIsSkipActive(false) : setIsSkipActive(true);
  }, [faceOptions, hairOptions]);

  return (
    <div className="flex flex-col items-center">
      <h4 className="md:text-lg">{questionnaireMenu[2].label}</h4>
      <div className="mt-4 mx-10 mb-6 | msm:space-y-4 md:flex md:space-x-6 md:justify-center md:h-40 md:w-[500px]">
        <div className="flex flex-col">
          <h4>
            {
              // @ts-ignore
              questionnaireMenu[2]?.multipleOPtions[0].name
            }
          </h4>
          <div className="flex flex-col justify-center | mt-2 space-y-3">
            {faceOptions.map(op => {
              return (
                <div
                  className={`w-56 py-2  ${
                    op.isSelected
                      ? "border-green bg-greenL text-green"
                      : "border-darkBlue"
                  } hover:border-green hover:bg-greenL hover:text-green border-2 rounded-md shadow-md | cursor-pointer`}
                  onClick={() => {
                    setFaceOptions(selectOption(faceOptions, op.option));
                  }}
                >
                  {op.option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h4>
            {
              // @ts-ignore
              questionnaireMenu[2]?.multipleOPtions[1].name
            }
          </h4>
          <div className="flex flex-col justify-center | mt-2 space-y-3">
            {hairOptions.map(op => {
              return (
                <div
                  className={`w-56 py-2  ${
                    op.isSelected
                      ? "border-green bg-greenL text-green"
                      : "border-darkBlue"
                  } hover:border-green hover:bg-greenL hover:text-green border-2 rounded-md shadow-md | cursor-pointer`}
                  onClick={() => {
                    setHairOptions(selectOption(hairOptions, op.option));
                  }}
                >
                  {op.option}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="md:mt-10 md:mb-4">
        {isSkipActive ? (
          <div className="text-center mb-2">
            <span className="underline text-sm font-medium cursor-pointer">
              Je passe à la question suivante
            </span>
          </div>
        ) : (
          <Button
            className="w-11/12 md:w-20 mt-2 mb-4 shadow-md"
            type="green"
            onClick={() => {
              nextStep(3, {
                tagsParticularity: getSelectedOptions(
                  faceOptions.concat(hairOptions),
                ),
              });
            }}
          >
            Valider
          </Button>
        )}
      </div>
    </div>
  );
};

export default StepMoreDetailsType;
