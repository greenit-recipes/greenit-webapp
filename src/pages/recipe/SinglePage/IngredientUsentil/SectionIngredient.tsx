import { getImagePath } from "helpers/image.helper";
import useIsMobile from "hooks/isMobile";
import HTMLReactParser from "html-react-parser";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { RiComputerLine } from "react-icons/ri";
import { BsShop } from "react-icons/bs";

interface ISectionIngredient {
  className?: string;
  data: any;
}

export const SectionIngredient: React.FC<ISectionIngredient> = ({
  data,
  className,
}) => {
  const [isArrowDown, setArrowDown] = useState(true);
  const isMobile = useIsMobile();

  return (
    <>
      <div
        className={`flex items-center btn-single-page ingredient-shadow max-h-32 mt-4 ${
          !isMobile ? "cursor-pointer" : ""
        }`}
        onClick={() => {
          if (!isMobile) setArrowDown(!isArrowDown);
        }}
      >
        <div className="flex justify-between items-center w-1/6">
          <div className="flex p-5 lg:p-0 items-center justify-center text-center rounded-l-md ingredient-section w-full h-12">
            {data?.amount}
          </div>
          <img
            className="h-12 w-12 rounded"
            alt={data?.name}
            loading="lazy"
            src={getImagePath(data?.image)}
          ></img>
        </div>
        <div className="w-4/6 ml-14"> {data?.name} </div>
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
            <div className="pt-4">{data?.description && HTMLReactParser(data?.description)}</div>
            <h2 className="pt-6 fontQSbold">Alternatives</h2>
            <div>{data?.alternative && HTMLReactParser(data?.alternative)}</div>
            <div className="flex-col lg:flex-row pt-4 items-center pb-6">
              <div className="fontQSbold">Où acheter ?</div>
              {data?.isSupermarket && (
                <div className="flex ml-6 items-center">
                  <BsShop className="w-8 h-8 mr-2" />
                  <div>
                    Biocop
                    <br />
                    Supermarché
                  </div>
                </div>
              )}

              {data?.isOnline && (
                <div className="flex ml-6 items-center">
                  <RiComputerLine className="w-8 h-8 mr-2" />
                  <div>En ligne</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
