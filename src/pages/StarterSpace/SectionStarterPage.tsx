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
          color ? color : "blueL"
        } self-top rounded-tr-full rounded-br-full | p-1 -ml-10 w-2/3 lg:w-full h-16`}
      >
        <div className="flex">
          <h3 className="text-center self-center mr-3 text-xl md:text-2xl">
            {maintitle}
          </h3>
          <h3 className="text-center self-center mr-6 text-xl md:text-2xll">
            {number}
          </h3>
        </div>
      </div>
      <div className="grid lg:col-span-2">
        <h2 className="self-center px-6 text-lg font-medium">{title}</h2>
        <p className="font-diy px-6 mt-1 text-2xl leading-6">{text}</p>
      </div>
    </div>
  );
};
