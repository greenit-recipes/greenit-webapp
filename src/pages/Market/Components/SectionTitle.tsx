import { Container } from "components";
import React from "react";
import { IoTerminal } from "react-icons/io5";

interface SectionTitle {
  title: string;
  subtitle: string;
}

export const SectionTitle: React.FC<SectionTitle> = ({ title, subtitle }) => {
  return (
    <Container className="grid w-full md:w-4/5 mt-10 mb-6">
      <div className=" justify-center md:flex md:justify-start md:gap-4 w-full">
        <h2 className="text-xl md:text-2xl text-center">{title}</h2>
        <h2 className="text-xl md:text-2xl text-center self-end | font-diy">
          {subtitle}
        </h2>
      </div>
    </Container>
  );
};
