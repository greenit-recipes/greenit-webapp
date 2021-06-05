import React from "react";
import { Grid } from "../";
import { footerChat, footerWorld, footerValues } from "../../icons";

export const Footer: React.FC = () => {
  return (
    <div className="h-auto w-full | flex flex-col | items-center | bg-gray-200 -mb-10">
      <Grid
        type="col"
        gap="8"
        size={{
          default: 1,
          md: 3,
        }}
        className="mt-10 w-4/6"
      >
        {[
          {
            icon: footerWorld,
            title: "Multidisciplinary",
            text:
              "Greenit est une solution sociale, économique et écologique aux problèmes  de pollution et climatiques auxquels nous sommes confronté. Greenit est une solution pour remplacer la production industrielle par une production artisanale et locale.",
          },
          {
            icon: footerChat,
            title: "Collective",
            text:
              "Notre première mission ensemble est de developper une communauté qui soutient le partage des connaissances pour une consommation et une production saines.",
          },
          {
            icon: footerValues,
            title: "Transparent",
            text:
              "Ici il n’y pas de collection de données personnelles, pas de publicités et pas d’Amazon ou de Google pour héberger notre site. Greenit est aussi un projet open-source disponible sur Github. \
N’hésites pas à poser tes questions et à voter pour les prochaines functionalités Greenit.",
          },
        ].map((item) => (
          <div className="flex flex-col">
            <div className="flex">
              <img
                src={item.icon}
                className="h-20 w-20"
                alt={`${item.title} Icon`}
              />
              <h3 className="text-2xl pl-2 flex self-center">{item.title}</h3>
            </div>
            <div className="mt-5">{item.text}</div>
          </div>
        ))}
      </Grid>
      <h3 className="text-xl mt-5 mb-20">hellogreenit@gmail.com</h3>
      <p>Directeur de la Rédaction et de la Publication : Adrien Sosson</p>
      <p className="w-4/6 mt-5">
        En utilisant Greenit vous acceptez notre politique de confidentialité.
        Droit d’auteur : le contenu est disponible et protégé sous licence
        Creative Commons attribution, partage dans les mêmes conditions. Pour
        quelconque utilisation de notre contenu veuillez nous contacter au
        préalable. Voyez les conditions d’utilisation.
      </p>
      <h3 className="text-md mt-5 pb-5 ml-10 mr-10">
        © Copyright Greenit Community 2021. All rights reserved.
      </h3>
    </div>
  );
};
