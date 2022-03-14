import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";

interface ISectionIngredient {
  className?: string;
}

export const SectionIngredient: React.FC<ISectionIngredient> = ({ className }) => {
  const [isArrowDown, setArrowDown] = useState(true);

  return (
    <>
      <div className="flex items-center btn-single-page ingredient-shadow max-h-32 mt-4">
        <div className="flex justify-between items-center w-1/6">
          <div className="flex p-5 lg:p-0 items-center justify-center rounded-l-md ingredient-section w-full h-12">
            30 ml
          </div>
          <img
            className="h-12 rounded"
            src="https://img.20mn.fr/sIChN5W-TCG0VWSpGYJYLw/768x492_tous-trolls.jpg"
          ></img>
        </div>
        <div className="w-4/6 ml-14">Savon de Marseille en copeau </div>
        <div className="w-1/6">
          <div className="flex items-center justify-end w-full">
            <HiOutlineChevronDown
              className={`w-6 h-6  mr-6 cursor-pointer ${
                isArrowDown
                  ? "ingredient-section-arrow-up"
                  : "ingredient-section-arrow-down"
              }`}
              onClick={() => {
                setArrowDown(!isArrowDown);
              }}
            />
          </div>
        </div>
      </div>
      <div
        className={
          !isArrowDown ? "ingredient-fadeIn-arrow" : " ingredient-fadeOut-arrow"
        }
      >
        <div className="bg-greyL rounded-b">
          <div className="w-5/6  lg:w-4/6  ml-6">
            <div className="pt-4">
              Le savon de Marseille est utilisé comme détergent. Il est
              dégraissant et permet de donner une odeur parfumée. Il est utilisé
              pour se laver le corps et les vêtements.
            </div>
            <h2 className="pt-6 fontQSbold">Alternatives</h2>
            <div>
              Le savon noir pour ses qualités de détergent et de dégraissant.
            </div>
            <div className="flex-col lg:flex-row pt-4 items-center pb-6">
              <div className="fontQSbold">Où acheter ?</div>
              <div className="flex ml-6 items-center">
                <RiComputerLine className="w-8 h-8 mr-2" />
                <div>
                  Biocop
                  <br />
                  Supermarché
                </div>
              </div>

              <div className="flex ml-6 items-center">
                <RiComputerLine className="w-8 h-8 mr-2" />
                <div>En ligne</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
