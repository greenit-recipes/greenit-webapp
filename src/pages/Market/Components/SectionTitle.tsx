import { Container } from "components";
import React from "react";

interface SectionTitle {
  title: string;
  subtitle: string;
  isMarginNeeded?: boolean;
}

export const SectionTitle: React.FC<SectionTitle> = ({
  title,
  subtitle,
  isMarginNeeded = true,
}) => {
  return (
    <>
      {!isMarginNeeded ? (
        <Container className="grid w-full md:w-4/5 mt-0 mb-4 md:my-6">
          <div className=" justify-center md:flex md:justify-start md:gap-4 w-full">
            <h2 className="text-xl md:text-2xl text-center">{title}</h2>
            <h2 className="text-xl md:text-2xl text-center self-end | font-diy">
              {subtitle}
            </h2>
          </div>
        </Container>
      ) : (
        <Container className="grid w-full md:w-4/5 mt-10 mb-6">
          <div className=" justify-center md:flex md:justify-start md:gap-4 w-full">
            <h2 className="text-xl md:text-2xl text-center">{title}</h2>
            <h2 className="text-xl md:text-2xl text-center self-end | font-diy">
              {subtitle}
            </h2>
          </div>
        </Container>
      )}
    </>
  );
};
