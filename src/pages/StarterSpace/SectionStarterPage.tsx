import React from "react";

interface SectionStarterPageProps {
  color?: string;
  step: boolean;
  number?: string;
  maintitle: string;
  title: string;
  text?: string;
  className?: string;
}

export const SectionStarterPage: React.FC<SectionStarterPageProps> = ({
  color,
  number,
  step,
  maintitle,
  title,
  text,
  className,
}) => {
  return (
    <div className={`${className} grid gap-2 lg:grid-cols-4 w-full mb-4`}>
      <div
        className={`grid justify-items-end bg-${
          color ? color : "blue"
        } self-top rounded-tr-full rounded-br-full shadow-lg | p-1 -ml-10 w-2/3 lg:w-full h-16`}
      >
        <div className="flex">
          <h3 className="font-semibold text-center self-center mr-3">
            {maintitle}
          </h3>
          <div
            className={
              step
                ? "grid w-10 h-10 self-center items-end bg-white rounded-full shadow-sm mr-1"
                : "hidden"
            }
          >
            <h2 className="text-center self-center font-bold">{number}</h2>
          </div>
        </div>
      </div>
      <div className="grid lg:col-span-2">
        <h3 className="self-center font-semibold px-6">{title}</h3>
        <p className="font-light px-6">{text}</p>
      </div>
    </div>
  );
};
