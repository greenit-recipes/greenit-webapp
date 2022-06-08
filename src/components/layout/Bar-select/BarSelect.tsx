import useIsMobile from "hooks/isMobile";
import { useState } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";

interface IBarSelect {
  className?: string;
  title: string;
  amount: string;
  componentParent: any;
}

export const BarSelect: React.FC<IBarSelect> = ({
  title,
  amount,
  componentParent,
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
        <div className="flex items-center justify-between w-1/6">
          <div className="flex items-center justify-center w-full h-12 p-5 text-center lg:p-0 rounded-l-md bg-blueL">
            {amount}
          </div>
        </div>
        <div className="w-4/6 ml-14"> {title} </div>
        <div className="w-1/6">
          <div className="flex items-center justify-end w-full">
            <HiOutlineChevronDown
              className={`w-6 h-6  mr-6 cursor-pointer ${
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
        <div className="rounded-b bg-greyL">{componentParent}</div>
      </div>
    </>
  );
};
