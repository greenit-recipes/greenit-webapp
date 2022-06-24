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
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center h-12 py-2 px-4 text-center rounded-l-md bg-blueL font-semibold">
            {data?.amount}
          </div>
          <img
            className="w-12 h-12 rounded"
            alt={data?.name}
            loading="lazy"
            src={getImagePath(data?.image)}
          ></img>
        </div>
        <div className="flex-grow w-1/6 ml-4"> {data?.name} </div>
        <div className="w-1/6">
          <div className="flex items-center justify-end w-full">
            <i
              className={`bx bx-chevron-down bx-md mr-6 cursor-pointer ${
                isArrowDown ? "section-arrow-up" : "section-arrow-down"
              }`}
              onClick={() => {
                setArrowDown(!isArrowDown);
              }}
            />
          </div>
        </div>
      </div>
      <div className={!isArrowDown ? "fadeIn-arrow" : " fadeOut-arrow"}>
        <div className="rounded-b bg-blueL">
          <div className="w-5/6 ml-6 lg:w-4/6">
            <div className="pt-4">
              {data?.description && HTMLReactParser(data?.description)}
            </div>
            <h4 className="pt-4 fontQSemibold">Alternatives</h4>
            <div>{data?.alternative && HTMLReactParser(data?.alternative)}</div>
            <div className="flex-col items-center pt-4 pb-6 lg:flex-row">
              <h4 className="fontQSemibold">Où acheter ?</h4>
              {data?.isSupermarket && (
                <div className="flex items-center ml-6">
                  <BsShop className="w-8 h-8 mr-2" />
                  <div>
                    Biocop
                    <br />
                    Supermarché
                  </div>
                </div>
              )}

              {data?.isOnline && (
                <div className="flex items-center ml-6">
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
